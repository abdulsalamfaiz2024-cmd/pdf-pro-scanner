import { motion } from 'motion/react';
import { Search, List, MoreHorizontal, FileQuestion } from 'lucide-react';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Files</h1>
        <div className="flex gap-4 text-gray-400">
          <Search className="w-6 h-6" />
          <List className="w-6 h-6" />
          <MoreHorizontal className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-primary-light rounded-2xl flex items-center justify-center">
            <div className="border-[3px] border-primary w-16 h-20 rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 right-0 w-6 h-6 border-b-[3px] border-l-[3px] border-primary origin-top-right rotate-45 -translate-y-3 translate-x-3 bg-primary-light" />
              <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1">
                <FileQuestion className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Files Yet</h2>
        <p className="text-gray-500 mb-8 max-w-[280px]">
          You don't have any files here. Use the scanner or tools to create or import files - they'll show up once added.
        </p>

        <button className="w-full max-w-xs py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors active:scale-95">
          Import Files
        </button>
      </div>
    </motion.div>
  );
}
