import { motion } from 'motion/react';
import { Plus, GripVertical, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MergePage() {
  const navigate = useNavigate();

  const files = [
    { name: 'Document_A.pdf', size: '2.3 MB', color: 'bg-green-500' },
    { name: 'Report_Final.pdf', size: '4.1 MB', color: 'bg-emerald-500' },
    { name: 'Contract_Signed.pdf', size: '1.5 MB', color: 'bg-teal-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-6 bg-gray-50/50 min-h-screen"
    >
      <header className="flex flex-col items-center mb-10">
        <div className="w-full flex justify-start mb-2">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
            </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Oqba Merge PDF Tool</h1>
      </header>

      <button className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-green-500 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 mb-8 active:scale-[0.98] transition-all">
        <div className="bg-white/20 rounded-full p-1">
          <Plus className="w-5 h-5" />
        </div>
        Add More
      </button>

      <div className="space-y-4 mb-20">
        {files.map((file, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between bg-white p-4 pr-6 rounded-2xl shadow-sm border-l-8 border-primary relative overflow-hidden group active:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">{file.name}</h3>
              <p className="text-gray-400 text-sm font-medium">{file.size}</p>
            </div>
            <GripVertical className="text-gray-300 w-6 h-6 cursor-grab active:cursor-grabbing" />
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-24 left-6 right-6 max-w-[calc(448px-3rem)] mx-auto">
        <button className="w-full py-5 bg-gradient-to-r from-primary to-green-500 text-white font-black text-xl rounded-[24px] shadow-2xl shadow-primary/20 active:scale-95 transition-transform">
            Merge Files
        </button>
      </div>
    </motion.div>
  );
}
