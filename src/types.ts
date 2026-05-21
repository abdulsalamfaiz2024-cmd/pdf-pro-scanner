export interface PDFFile {
  id: string;
  name: string;
  size: string;
  date: string;
  thumbnail?: string;
}

export type ToolCategory = 'Organize PDF' | 'Convert' | 'Extract & Optimize';

export interface TollItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ToolCategory;
  isPro?: boolean;
}
