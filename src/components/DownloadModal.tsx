import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
}

export const DownloadModal = ({ isOpen, onClose, reportTitle }: DownloadModalProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reportTitle }),
      });

      if (response.ok) {
        setStatus('success');
        // Trigger PDF download
        const link = document.createElement('a');
        link.href = 'https://appcdn.goqii.com/storeimg/66106_1775132967.pdf';
        link.download = `${reportTitle.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending report:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <Download className="text-brand-blue w-8 h-8" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-2">Get the Report</h3>
              <p className="text-slate-600">Enter your email to receive the <span className="font-bold text-slate-900">{reportTitle}</span> directly in your inbox.</p>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-green/10 border border-brand-green/20 p-6 rounded-2xl text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Success!</h4>
                <p className="text-slate-600 mb-6">The report has been sent to your email and your download should start automatically.</p>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2",
                    status === 'loading' ? "bg-slate-400 cursor-not-allowed" : "bg-brand-blue hover:bg-brand-blue/90 hover:shadow-brand-blue/20"
                  )}
                >
                  {status === 'loading' ? "Sending..." : "Download Now"}
                  <Download className="w-5 h-5" />
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center font-medium">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
            
            <p className="mt-8 text-center text-xs text-slate-400">
              By downloading, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
