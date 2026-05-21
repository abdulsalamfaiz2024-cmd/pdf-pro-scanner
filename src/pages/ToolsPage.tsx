import { motion } from 'motion/react';
import { TOOLS } from '../constants';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function ToolsPage() {
  const navigate = useNavigate();
  const categories = Array.from(new Set(TOOLS.map(t => t.category)));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="pb-safe-area"
    >
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 border-b border-gray-100 flex justify-center items-center">
        <h1 className="text-xl font-bold text-gray-800">Oqba PDF Tools Suite</h1>
      </header>

      <div className="p-4 space-y-8">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-primary font-bold text-lg mb-4 px-2">{category}</h2>
            <div className="grid grid-cols-2 gap-3">
              {TOOLS.filter(t => t.category === category).map((tool) => {
                const IconComponent = (Icons as any)[tool.icon] || Icons.File;
                return (
                  <button
                    key={tool.id}
                    onClick={() => tool.id === 'ocr' ? navigate('/ocr') : tool.id === 'merge' ? navigate('/merge') : null}
                    className="flex flex-col text-left bg-gray-100/50 p-4 rounded-2xl hover:bg-gray-100 transition-colors relative group active:scale-95"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {tool.isPro && (
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          PRO
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-[15px] mb-1 leading-tight">{tool.title}</h3>
                    <p className="text-gray-500 text-[11px] leading-tight line-clamp-2">{tool.description}</p>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}
