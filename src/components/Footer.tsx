import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center mb-8">
              <Link to="/">
                <img 
                  src="https://appcdn.goqii.com/storeimg/7857_1774949045.png" 
                  alt="IndiaFit Logo" 
                  className="h-12 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              IndiaFit is a national health intelligence platform dedicated to transforming India's health through data, insights, and preventive movement.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Platform</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/#reports" className="hover:text-white transition-colors">Reports</a></li>
              <li><a href="/#insights" className="hover:text-white transition-colors">Insights</a></li>
              <li><a href="/#news" className="hover:text-white transition-colors">News</a></li>
              <li><a href="/#ecosystem" className="hover:text-white transition-colors">Ecosystem</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Connect</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2026 IndiaFit. All rights reserved. Powered by GOQii.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
