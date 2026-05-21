# Oqba — Full Production Implementation Plan

**MVP → Full Production PDF Ecosystem**

This document is the authoritative technical specification for the agent to implement the complete Oqba feature set. The MVP core (Scanner + Merge) is confirmed complete. This plan covers all remaining features, services, UI pages, shared infrastructure, routing, and validation — sequenced for maximum parallel execution.

> [!IMPORTANT]
> **Foundation Status Rule**
> The existing `scanner_service.dart`, `pdf_service.dart`, `file_service.dart`, and core app widgets are immutable infrastructure. Do not refactor, reorganize, or rename them. Integration rule: All new pages **must** use the existing `SpeedReceipt` widget, `OfflineIndicator`, and the standard `AppDocuments/Oqba/documents/` file contract.

---

## Proposed Changes

### Configuration

> [!CAUTION]
> **Build-First Rule:** Add ALL new packages to pubspec.yaml at once, run `flutter build apk --debug`, and confirm a green build **before writing a single line of feature code.** 

#### [MODIFY] pubspec.yaml
Add the following packages:
- `pdfrx: ^1.0.0`
- `google_mlkit_text_recognition: ^0.13.0`
- `flutter_image_compress: ^2.1.0`
- `image_picker: ^1.1.0`

#### [MODIFY] android/app/src/main/AndroidManifest.xml
- Add `READ_MEDIA_IMAGES` permission.
- Add `<meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="ocr"/>` for ML Kit.

### Shared Infrastructure

#### [NEW] lib/services/page_thumbnail_service.dart
Renders PDF pages to images using `pdfrx` and caches them in an LRU cache.
```dart
import 'dart:typed_data';
import 'package:pdfrx/pdfrx.dart';

class PageThumbnailService {
  final Map<String, Uint8List> _cache = {};
  static const int _maxCacheEntries = 60; // ~12 pages × 5 PDFs

  Future<Uint8List?> getThumbnail(String pdfPath, int pageIndex, {int width = 200}) async { ... }
  void evictPdf(String pdfPath) { ... }
  void clearAll() => _cache.clear();
}
```
**Architecture Rule:** Instantiate this as a singleton via a global final or an InheritedWidget at the MaterialApp root. Do NOT instantiate per-page.

#### [NEW] lib/widgets/page_selector_grid.dart
Reusable `GridView` that renders all pages of a PDF as thumbnail cards.
```dart
class PageSelectorGrid extends StatefulWidget {
  final String pdfPath;
  final int pageCount;
  final bool multiSelect;
  final void Function(List<int> selectedIndices) onSelectionChanged;
  final Map<int, int>? rotationOverrides;
  final PageThumbnailService thumbnailService;
}
```
**UX Rule:** Show a "Select All / Deselect All" button in the AppBar when `multiSelect` is true.

#### [NEW] lib/widgets/pro_gate.dart
Wraps any PRO feature widget.
```dart
class ProGate extends StatelessWidget {
  final bool isPro;
  final Widget child;
  final String featureName;
}
```
**State Override:** Hardcode `isPro = false` globally for this implementation pass.

### Organize PDF — Backend Logic

#### [MODIFY] lib/services/pdf_service.dart
Add five static isolate functions extending the existing `PdfService`:
1. `Future<List<String>> splitPdf(String pdfPath, List<List<int>> ranges, String outputName)`: Splits by range or count.
2. `Future<String> extractPages(String pdfPath, List<int> selectedIndices, String outputName)`: Isolates selected pages.
3. `Future<String> deletePages(String pdfPath, List<int> deleteIndices, String outputName)`: Create new PDF with pages removed. Guard validation explicitly.
4. `Future<String> rotatePages(String pdfPath, Map<int, int> rotations, String outputName)`: Apply 90/180/270 rotations.
5. `Future<String> reorderPages(String pdfPath, List<int> newOrder, String outputName)`: Reconfigure and output PDF based on new list order.

### New Services

#### [NEW] lib/services/convert_service.dart
```dart
class ConvertService {
  Future<List<String>> pdfToImages(String pdfPath, {String format = 'jpg', int qualityDpi = 150}) async { ... }
  Future<String> imagesToPdf(List<String> imagePaths, {String pageSize = 'FitToImage', String outputName = 'images_to_pdf'}) async { ... }
  Future<String> extractTextFromImage(String imagePath, {String languageCode = 'en'}) async { ... }
}
```

#### [NEW] lib/services/extract_service.dart
```dart
class ExtractService {
  Future<List<String>> extractImagesFromPdf(String pdfPath) async { ... }
  Future<String> extractTextFromPdf(String pdfPath) async { ... }
}
```

#### [NEW] lib/services/compress_service.dart
```dart
class CompressService {
  static const Map<String, _CompressionPreset> presets = {
    'low': _CompressionPreset(label: 'Low', jpegQuality: 85, syncLevel: PdfCompressionLevel.best),
    'medium': _CompressionPreset(label: 'Medium', jpegQuality: 65, syncLevel: PdfCompressionLevel.best),
    'high': _CompressionPreset(label: 'High', jpegQuality: 40, syncLevel: PdfCompressionLevel.best),
  };
  Future<CompressResult> compressPdf(String pdfPath, String preset) async { ... }
}
class CompressResult {
  final String outputPath;
  final int originalSizeBytes;
  final int newSizeBytes;
}
```

#### [NEW] lib/services/security_service.dart
Stub file for v2 architecture. Implementation deferred. No-op implementation using `SecurityServiceStub`.

### UI Pages - Complete Specifications
**Universal Page Pattern:** AppBar with title, back button, and `OfflineIndicator()`. Body with content. Bottom `ElevatedButton`. `setState(isProcessing)` blocks with `CircularProgressIndicator` during `compute()` and succeeds with `SpeedReceipt`.

#### Organize Pages
- `[NEW] lib/pages/organize/split_page.dart`: Range Input + Step count. Output file counts in `SpeedReceipt`. Calls `splitPdf`.
- `[NEW] lib/pages/organize/extract_pages_page.dart`: `PageSelectorGrid(multiSelect: true)`. Button label updates dynamically. Calls `extractPages`.
- `[NEW] lib/pages/organize/reorder_pages_page.dart`: `ReorderableListView`. Calls `reorderPages`. Show "Order Unchanged" message safely.
- `[NEW] lib/pages/organize/delete_pages_page.dart`: `PageSelectorGrid`. Guard: if all pages selected, show error SnackBar. Red-accented confirm dialog. Calls `deletePages`.
- `[NEW] lib/pages/organize/rotate_pages_page.dart`: `PageSelectorGrid`. Segmented options (90/180/270). Apply visual overlay. Calls `rotatePages`.

#### Convert Pages
- `[NEW] lib/pages/convert/pdf_to_images_page.dart`: Resolution presets (72, 150, 300). Shows per-page progress stream. Save to `Oqba/extracted/`. Connects to `pdfToImages`.
- `[NEW] lib/pages/convert/images_to_pdf_page.dart`: Multi-select via `image_picker`. `ReorderableListView`. Warn if >50 images. Connects to `imagesToPdf`.
- `[NEW] lib/pages/convert/ocr_page.dart`: Native ML Kit. Wrapped in `ProGate`. Provide `.txt` export functionality. Show "Process with AI" local status. Connects to `extractTextFromImage`.

#### Extract & Optimize Pages
- `[NEW] lib/pages/extract_optimize/extract_images_page.dart`: Found X images header. Empy state guides to "PDF to Images". Connects to `extractImagesFromPdf`.
- `[NEW] lib/pages/extract_optimize/extract_text_page.dart`: Word bounds. Warning for scanned images with short extracted lengths. Connects to `extractTextFromPdf`.
- `[NEW] lib/pages/extract_optimize/compress_page.dart`: Wrapped in `ProGate`. Presets available. Renders % saved layout view "4.2 MB -> 1.1 MB". Connects to `compressPdf`.

#### Security Pages
- `[NEW] lib/pages/security/security_page.dart`: Polished "Coming Soon" stub view containing planned items (Password Protect, 256-bit encryption, watermarking) visually mapped out. Do not make this sloppy.

### Wiring
#### [MODIFY] lib/main.dart
Ensure routes are safely bound:
`/organize/split`, `/organize/extract-pages`, `/organize/reorder`, `/organize/delete`, `/organize/rotate`, `/convert/pdf-to-images`, `/convert/images-to-pdf`, `/convert/ocr`, `/extract/images`, `/extract/text`, `/extract/compress`, `/security`

#### [MODIFY] lib/pages/tools_page.dart
Provide full `List<ToolCategory>` array mapping as required in brief, supporting `isPro` (adds crown badge), and `isComingSoon` (adds 60% opacity reduction).

---

## Agent Execution Order
1. Dependencies Verification
2. Shared Infrastructure (`PageThumbnailService`, `PageSelectorGrid`, `ProGate`)
3. Extend PdfService in isolate
4. Build New Services
5. Develop Organize UI
6. Develop Convert UI
7. Develop Extract & Optimize UI
8. Security Stub
9. Update `main.dart` & `tools_page.dart`
10. Final Release Build Test

---

## Verification Plan

### Automated/Acceptance Guidelines
Execute specifically following physical Android device checks. Do not validate purely on emulators due to isolates, ML Kit constraints, hardware interactions, and storage rules.

- **Split PDF**: Enter bounds `1-3, 4-7`. Ensures 3 outputs surface. Out-of-bounds yields error snackbar safely.
- **Extract Pages**: Check output order correctly matches requested bounds exactly. Button disabled on 0 select.
- **Reorder Pages**: Drag item #1 to #5. Save. "Order Unchanged" triggers if not mutated.
- **Delete Pages**: Deleting all pages forces snackbar error (handled without service layer).
- **Rotate Pages**: Ensure single page can go 90deg, distinct page can go 180deg. Render safely.
- **PDF to Images**: Track process progress visual UI with lengthy 30-page PDF at 300DPI to show isolate state.
- **Images to PDF**: Compile 3 diff-sized JPGs effectively. List reflects accurately.
- **OCR (PRO)**: Blank images safely report "no text found". Print text maps well.
- **Extract Images**: Trigger explicitly on text-only document to evaluate empty state response UX.
- **Extract Text**: Render small output string response ("Scanned PDF hint...").
- **Compress (PRO)**: Ensure mathematical presentation calculates properly.
- **Tools Grid**: Rotate screen or execute on smaller hardware width to verify zero UX overflow issues.
