import { TollItem } from './types';

export const TOOLS: TollItem[] = [
  // Organize PDF
  {
    id: 'merge',
    title: 'Merge PDF',
    description: 'Combine multiple files into one document',
    icon: 'Merge',
    category: 'Organize PDF'
  },
  {
    id: 'split',
    title: 'Split PDF',
    description: 'Split PDF into smaller files',
    icon: 'Split',
    category: 'Organize PDF'
  },
  {
    id: 'extract-pages',
    title: 'Extract PDF Pages',
    description: 'Extract pages into a new PDF',
    icon: 'FileText',
    category: 'Organize PDF'
  },
  {
    id: 'reorder',
    title: 'Reorder Pages',
    description: 'Change the order of pages in your PDF',
    icon: 'ArrowDownUp',
    category: 'Organize PDF'
  },
  {
    id: 'delete-pages',
    title: 'Delete Pages',
    description: 'Delete unwanted pages from your PDF',
    icon: 'Trash2',
    category: 'Organize PDF'
  },
  {
    id: 'rotate',
    title: 'Rotate Pages',
    description: 'Rotate your PDF pages to desired orientation',
    icon: 'RotateCw',
    category: 'Organize PDF'
  },
  
  // Convert
  {
    id: 'pdf-to-images',
    title: 'PDF to Images',
    description: 'Convert PDF pages into high-quality images',
    icon: 'Image',
    category: 'Convert'
  },
  {
    id: 'images-to-pdf',
    title: 'Images to PDF',
    description: 'Combine multiple images into a single PDF',
    icon: 'GalleryHorizontal',
    category: 'Convert'
  },
  {
    id: 'ocr',
    title: 'Images to Text (OCR)',
    description: 'Extract and copy text from images using OCR.',
    icon: 'ScanText',
    category: 'Convert',
    isPro: true
  },
  
  // Extract & Optimize
  {
    id: 'extract-images',
    title: 'Extract Images',
    description: 'Extract all embedded images from your PDF',
    icon: 'Image',
    category: 'Extract & Optimize'
  },
  {
    id: 'extract-text',
    title: 'Extract Text',
    description: 'Convert your PDF content into editable text',
    icon: 'Type',
    category: 'Extract & Optimize'
  },
  {
    id: 'compress',
    title: 'Compress PDF',
    description: 'Reduce your PDF file size while keeping good quality.',
    icon: 'Maximize',
    category: 'Extract & Optimize',
    isPro: true
  }
];
