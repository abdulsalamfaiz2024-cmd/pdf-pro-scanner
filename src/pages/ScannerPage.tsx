import { motion } from 'motion/react';
import { Camera, X, Zap, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ScannerPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[100] flex flex-col font-sans"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6 pt-12 relative z-10">
        <button onClick={() => navigate(-1)} className="text-white hover:text-white/80 transition-colors">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div className="flex gap-6 text-white">
          <Zap className="w-6 h-6" />
          <button onClick={() => navigate(-1)} className="bg-white/10 p-1.5 rounded-full backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Camera Viewport (Simulated) */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
        <img 
          src="https://picsum.photos/seed/desk/1000/1500" 
          alt="Camera View" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        
        {/* Detection Grid */}
        <div className="relative w-full max-w-[85%] aspect-[3/4] border-2 border-primary/40 rounded-3xl overflow-hidden backdrop-blur-[1px]">
          {/* Border Corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-primary rounded-tl-3xl shadow-[0_0_15px_rgba(0,176,115,0.5)]" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-primary rounded-tr-3xl shadow-[0_0_15px_rgba(0,176,115,0.5)]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-primary rounded-bl-3xl shadow-[0_0_15px_rgba(0,176,115,0.5)]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-primary rounded-br-3xl shadow-[0_0_15px_rgba(0,176,115,0.5)]" />
          
          {/* Grid Lines */}
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full opacity-30">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/40" />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white/40 font-bold uppercase tracking-[4px] text-xs">
              Scanning...
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white/10 backdrop-blur-3xl p-8 pb-12 rounded-t-[40px] relative z-10 border-t border-white/10">
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md flex gap-1">
            <button className="px-6 py-2 rounded-full bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20">Auto</button>
            <button className="px-6 py-2 rounded-full text-white/60 text-sm font-bold">Manual</button>
          </div>
        </div>

        <div className="flex justify-between items-center px-4">
          <button className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform">
            <img 
              src="https://picsum.photos/seed/prev/100/100" 
              className="w-10 h-10 rounded-lg object-cover" 
              alt="Thumbnail"
              referrerPolicy="no-referrer"
            />
          </button>
          
          <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform p-1">
            <div className="w-full h-full border-4 border-primary rounded-full flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
            </div>
          </button>

          <button className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md active:scale-90 transition-transform">
            <ImageIcon className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
