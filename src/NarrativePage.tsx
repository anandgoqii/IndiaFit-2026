import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

const NarrativePage = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("India Fit Report 2026");

  const handleDownload = (title?: string) => {
    if (title) setSelectedReport(title);
    setIsDownloadModalOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const narrativeText = `
## Beyond the **Brink.**

India is facing a **silent health crisis.**

Even as the nation grows economically, our collective health is steadily declining. What was once considered a concern of aging populations has now become a reality for younger generations.

Lifestyle diseases—**diabetes, hypertension, obesity**—are no longer confined to the elderly. They are rising rapidly among India’s youth.

---

Urban stress, sedentary behavior, poor nutrition, and digital overload are reshaping how India lives—and how India falls sick.

This is not just a healthcare issue.  
**It is a societal shift.**

---

### 📊 What the Data Reveals

Our data reveals a troubling pattern:

- Young Indians are more **inactive**
- More **stressed**
- And increasingly **at risk**

Preventable conditions are becoming normalized.  
Early warning signs are being ignored.  
Healthcare remains largely **reactive**—stepping in only after the damage is done.

---

## ⚠️ A Nation at a Tipping Point

We are standing at a **critical inflection point.**

If this trajectory continues, India risks facing an unprecedented burden:
- On individuals  
- On families  
- On healthcare systems  
- On the economy  

---

## 🚀 A Moment of Opportunity

But this is also a moment to act.

A chance to:
- Rethink how we approach health  
- Move from **treatment → prevention**  
- Shift from **episodic care → continuous health intelligence**

---

## 🧠 The Future of Healthcare

Preventive healthcare is no longer optional—it is **essential.**

By leveraging:
- Real-time data  
- Behavioral insights  
- AI-driven intelligence  

We can:
- Predict risks earlier  
- Personalize interventions  
- Empower individuals to take control of their health  

---

> This is the future of healthcare.  
> And it must begin now.

---

## 📣 A Call to Action

**Beyond the Brink** is not just a report.  
It is a **wake-up call.**

- For individuals → to take ownership  
- For organizations → to build healthier ecosystems  
- For policymakers → to prioritize prevention at scale  

---

Because the cost of inaction is too high.

## **And the time to act is now.**
`;

  return (
    <div className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      <Navbar onDownload={handleDownload} />

      {/* Hero Header */}
      <header className="pt-40 pb-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 text-brand-blue text-sm font-bold uppercase tracking-widest mb-6">
              <span>Special Report</span>
              <span className="w-1 h-1 bg-slate-500 rounded-full" />
              <span>Narrative</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-tight">
              Beyond the <span className="text-brand-blue">Brink.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>April 2, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-display prose-headings:font-bold 
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-hr:my-16 prose-hr:border-slate-200
            prose-blockquote:border-l-4 prose-blockquote:border-brand-blue prose-blockquote:bg-brand-blue/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:text-slate-800 prose-blockquote:my-16
            prose-li:text-slate-600 prose-li:mb-4
          "
        >
          <ReactMarkdown>{narrativeText}</ReactMarkdown>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-200 text-center">
          <h3 className="text-3xl font-display font-bold mb-6">Ready to take action?</h3>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto">
            Download the full India Fit Report 2026 for detailed data, regional insights, and actionable recommendations.
          </p>
          <button 
            onClick={() => handleDownload("India Fit Report 2026")}
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand-blue/20 hover:scale-105 transition-transform"
          >
            Download Full Report
          </button>
        </div>
      </main>

      <Footer />

      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
        reportTitle={selectedReport}
      />
    </div>
  );
};

export default NarrativePage;
