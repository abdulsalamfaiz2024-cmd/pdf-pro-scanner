import { motion } from 'motion/react';
import { Moon, Palette, Globe, Send, Mail, Radio, ChevronRight, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4"
    >
      <header className="py-4 text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Oqba Settings</h1>
      </header>

      {/* Premium Banner */}
      <button 
        onClick={() => navigate('/premium')}
        className="w-full bg-gradient-to-r from-primary to-green-400 p-6 rounded-3xl text-left text-white mb-8 relative overflow-hidden shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-5 h-5 text-premium" fill="currentColor" />
              <h2 className="text-lg font-bold">Subscription</h2>
            </div>
            <p className="text-white/80 text-sm">Upgrade to unlock premium features</p>
          </div>
          <div className="bg-premium px-4 py-1.5 rounded-full flex items-center gap-1 font-bold text-xs shadow-lg">
            <Crown className="w-3 h-3" fill="currentColor" />
            PRO
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10" />
      </button>

      {/* Settings Sections */}
      <div className="space-y-8 pb-12">
        <section>
          <h3 className="text-gray-800 font-bold mb-3 px-2">Theme</h3>
          <div className="bg-gray-100/50 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200/50">
              <div className="flex items-center gap-4">
                <Moon className="w-5 h-5 text-gray-800" />
                <span className="text-[15px] font-medium">Theme Mode</span>
              </div>
              <span className="text-gray-400 text-sm">System</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <Palette className="w-5 h-5 text-gray-800" />
                <span className="text-[15px] font-medium">Use dynamic theme</span>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                <div className="absolute right-1 top-1 bottom-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-200/50">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-gray-800" />
                <span className="text-[15px] font-medium">Language</span>
              </div>
              <span className="text-gray-400 text-sm">English</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-gray-800 font-bold mb-3 px-2">Contact</h3>
          <div className="bg-gray-100/50 rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 border-b border-gray-200/50 active:bg-gray-200/50 transition-colors text-left">
              <Send className="w-5 h-5 text-gray-800" />
              <div>
                <p className="text-[15px] font-medium leading-tight">Telegram</p>
                <p className="text-[12px] text-gray-400">Contact Oqba directly on Telegram</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 active:bg-gray-200/50 transition-colors text-left">
              <Mail className="w-5 h-5 text-gray-800" />
              <div>
                <p className="text-[15px] font-medium leading-tight">Email</p>
                <p className="text-[12px] text-gray-400">Send feedback or report a bug to Oqba</p>
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-gray-800 font-bold mb-3 px-2">Follow Us</h3>
          <div className="bg-gray-100/50 rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-4 p-4 active:bg-gray-200/50 transition-colors text-left">
              <Radio className="w-5 h-5 text-gray-800" />
              <div>
                <p className="text-[15px] font-medium leading-tight">Telegram Channel</p>
                <p className="text-[12px] text-gray-400">Get the latest Oqba updates and news</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
