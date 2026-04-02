import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface NavbarProps {
  onDownload: (title?: string) => void;
}

export const Navbar = ({ onDownload }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Reports', 'Insights', 'News', 'Ecosystem'];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled || !isHome ? "bg-white/80 backdrop-blur-lg border-b border-slate-200 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="https://appcdn.goqii.com/storeimg/7857_1774949045.png" 
            alt="IndiaFit Logo" 
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`} 
              className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => onDownload("India Fit Report 2026")}
            className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-brand-blue/20 hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
          >
            Download Report <Download className="w-4 h-4" />
          </button>
        </div>

        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navItems.map((item) => (
              <a 
                key={item} 
                href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`} 
                className="text-lg font-medium text-slate-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                onDownload("India Fit Report 2026");
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-blue text-white px-5 py-3 rounded-xl text-base font-semibold w-full"
            >
              Download Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
