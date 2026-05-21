import { motion } from 'motion/react';
import { Crown, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PremiumPage() {
  const navigate = useNavigate();

  const features = [
    'OCR - Scan documents to text',
    'Compress PDF - Reduce file size',
    'No Ads - Distraction-free experience'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-6 bg-black min-h-screen text-white relative"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-white/60 mb-8 absolute top-6 left-6"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <header className="py-4 text-center mt-12 mb-8">
        <h1 className="text-xl font-bold">Oqba Premium Upgrade</h1>
      </header>

      <div className="bg-gradient-to-br from-primary to-green-500 p-8 rounded-[40px] text-center mb-10 shadow-2xl shadow-primary/20">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Crown className="w-12 h-12 text-premium" fill="currentColor" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">Oqba Premium</h2>
      </div>

      <div className="space-y-4 mb-12">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="text-sm font-medium text-white/90">{feature}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white border-4 border-primary text-black p-4 rounded-3xl text-center flex flex-col justify-center gap-1 shadow-xl">
          <p className="text-lg font-bold">Monthly</p>
          <p className="text-xl font-black text-primary">$4.99/mo</p>
        </div>
        <div className="bg-primary text-white p-4 rounded-3xl text-center flex flex-col justify-center gap-1 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-premium text-[10px] font-bold px-3 py-1 rounded-bl-xl">
            Save 33%
          </div>
          <p className="text-lg font-bold mt-2">Yearly</p>
          <p className="text-xl font-black">$39.99/yr</p>
        </div>
      </div>

      <button className="w-full py-5 bg-primary text-white font-black text-xl rounded-[32px] shadow-2xl shadow-primary/40 active:scale-95 transition-transform">
        Subscribe Now
      </button>
    </motion.div>
  );
}
