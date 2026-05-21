/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Wrench, Settings as SettingsIcon, Scan, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Pages - to be implemented
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import SettingsPage from './pages/SettingsPage';
import PremiumPage from './pages/PremiumPage';
import OcrPage from './pages/OcrPage';
import MergePage from './pages/MergePage';
import ScannerPage from './pages/ScannerPage';

function BottomNav() {
  const location = useLocation();
  const hideNav = ['/scan'].includes(location.pathname);

  if (hideNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-safe-area shadow-lg z-50">
      <div className="flex justify-between items-center max-w-md mx-auto relative">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              isActive ? "text-primary font-medium" : "text-gray-400"
            )
          }
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px]">Home</span>
        </NavLink>

        <NavLink
          to="/tools"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              isActive ? "text-primary font-medium" : "text-gray-400"
            )
          }
        >
          <Wrench className="w-6 h-6" />
          <span className="text-[10px]">Tools</span>
        </NavLink>

        {/* Center Scanner FAB */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <NavLink
            to="/scan"
            className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 border-4 border-white active:scale-95 transition-transform"
          >
            <Scan className="w-7 h-7" />
            <span className="sr-only">Scan</span>
          </NavLink>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-primary font-medium">Scan</span>
        </div>
        <div className="w-14" /> {/* Spacer for FAB */}

        <NavLink
          to="/premium"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              isActive ? "text-premium font-medium" : "text-gray-400"
            )
          }
        >
          <Crown className="w-6 h-6" />
          <span className="text-[10px]">PRO</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-1 transition-colors duration-200",
              isActive ? "text-primary font-medium" : "text-gray-400"
            )
          }
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-[10px]">Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans max-w-md mx-auto relative overflow-hidden shadow-2xl">
        <main className="flex-1 pb-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/premium" element={<PremiumPage />} />
              <Route path="/ocr" element={<OcrPage />} />
              <Route path="/merge" element={<MergePage />} />
              <Route path="/scan" element={<ScannerPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}
