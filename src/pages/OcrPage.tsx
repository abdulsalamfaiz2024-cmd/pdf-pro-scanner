import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Copy, FileDown, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OcrPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 bg-gray-50/50 min-h-screen"
    >
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Oqba OCR Extract Text</h1>
      </header>

      <div className="relative rounded-3xl overflow-hidden mb-6 shadow-xl aspect-[4/3]">
        <img 
          src="https://picsum.photos/seed/document/800/600" 
          alt="Scanned Document" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {!isDone && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
             <Loader2 className="w-12 h-12 animate-spin mb-4 text-white/80" />
             <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                <motion.div 
                  className="h-full bg-white" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
             </div>
             <p className="text-lg font-bold">Processing... {progress}%</p>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 min-h-[200px]">
        {isDone ? (
          <div className="space-y-2 text-gray-700 font-medium">
            <p>Invoice #12345</p>
            <p>Date: 2024-01-15</p>
            <p>Item 1: $10.00</p>
            <p>Item 2: $25.50</p>
            <p className="border-t pt-2 mt-2">Total: $35.50</p>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse" />
             <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse" />
             <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
          <Copy className="w-5 h-5" />
          Copy Text
        </button>
        <button className="flex items-center justify-center gap-2 w-full py-4 bg-white text-primary border-2 border-primary font-bold rounded-2xl active:scale-[0.98] transition-all">
          <FileDown className="w-5 h-5" />
          Export as PDF
        </button>
      </div>
    </motion.div>
  );
}
