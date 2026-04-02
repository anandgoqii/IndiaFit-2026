import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'motion/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Download, 
  Activity, 
  TrendingUp, 
  Users, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Heart, 
  Brain, 
  Zap,
  ExternalLink,
  Search,
  Quote
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';
import { HERO_STATS, STEP_COUNT_DATA, HYPERTENSION_DATA, LIFESTYLE_DATA, REPORTS, NEWS_ITEMS, ECOSYSTEM_LOGOS } from './constants';
import NarrativePage from './NarrativePage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[60] origin-left"
      style={{ scaleX }}
    />
  );
};

const SectionReveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CountUp = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;
    let step = end / (totalMiliseconds / incrementTime);

    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const WordReveal = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Hero = ({ onDownload }: { onDownload: (title?: string) => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </motion.div>

      <motion.div 
        style={{ scale }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            National Health Intelligence 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 text-slate-900">
            India's Health, <br />
            <span className="text-gradient">Decoded by Data.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            The India Fit Report is a movement towards a healthier nation. We analyze trillions of data points to bring you the most comprehensive study on India's wellness.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-brand-blue text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand-blue/30 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 group">
              Explore Insights <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onDownload("India Fit Report 2026")}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 transition-all"
            >
              Download Report
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 glass rounded-[2rem] p-8 aspect-square flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-tighter">Daily Activity Index</p>
                <h3 className="text-3xl font-display font-bold"><CountUp value="7400" /> <span className="text-sm text-brand-green font-sans">+12%</span></h3>
              </div>
              <div className="w-12 h-12 bg-brand-green/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="text-brand-green w-6 h-6" />
              </div>
            </div>
            
            <div className="h-48 w-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={STEP_COUNT_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Urban</p>
                <p className="text-xl font-display font-bold"><CountUp value="7850" /></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1">Rural</p>
                <p className="text-xl font-display font-bold"><CountUp value="6120" /></p>
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-20 glass p-6 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                <Users className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold"><CountUp value="50M+" /></p>
                <p className="text-xs text-slate-500 font-medium">Active Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-10 z-20 glass p-6 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <MapPin className="text-white w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold"><CountUp value="500+" /></p>
                <p className="text-xs text-slate-500 font-medium">Cities Tracked</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const DataStory = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="insights" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Story of India's Health</h2>
          <p className="text-lg text-slate-600">We've transformed trillion data points into actionable insights. See how India is moving, eating, and living.</p>
        </SectionReveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Card 1: Steps */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-8">
              <Activity className="text-brand-blue w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Step Count Surge</h3>
            <p className="text-slate-600 mb-8 flex-grow">Average daily steps in India have increased by 12% year-over-year, signaling a massive shift towards active lifestyles.</p>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STEP_COUNT_DATA}>
                  <Bar dataKey="value" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 2: Hypertension */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-8">
              <Heart className="text-red-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Hypertension Risk</h3>
            <p className="text-slate-600 mb-8 flex-grow">28% of urban Indians are at high risk of hypertension. Data shows a direct correlation with sedentary work patterns.</p>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HYPERTENSION_DATA} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="#EF4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 3: Lifestyle */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-8">
              <Brain className="text-brand-green w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Lifestyle Insights</h3>
            <p className="text-slate-600 mb-8 flex-grow">Mental wellness is becoming a priority. 45% of users now track sleep and stress levels regularly.</p>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LIFESTYLE_DATA}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {LIFESTYLE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#00D166', '#0066FF', '#F59E0B'][index % 3]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const CrisisNarrative = () => {
  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/urban/1920/1080?grayscale')] bg-cover bg-center mix-blend-overlay" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-display font-extrabold mb-12 leading-tight"
          >
            Beyond the <span className="text-brand-blue">Brink.</span>
          </motion.h2>
          <div className="space-y-8 text-xl md:text-3xl font-light text-slate-300 leading-relaxed">
            <WordReveal text="India is facing a silent crisis. While we grow economically, our health is at a tipping point. Lifestyle diseases are no longer just for the elderly." />
            
            <WordReveal text="Our data reveals that the youth are the most affected by urban stress, poor nutrition, and lack of activity. It's time to move from reactive treatment to preventive intelligence." />
          </div>
          
          <Link 
            to="/narrative"
            className="mt-16 bg-white text-slate-900 px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform active:scale-95"
          >
            Read the Full Narrative <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ReportModules = ({ onDownload }: { onDownload: (title?: string) => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="reports" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold mb-4">Intelligence Reports</h2>
            <p className="text-slate-600 max-w-xl">Download our deep-dive research papers on specific health domains across the Indian population.</p>
          </div>
          <button className="text-brand-blue font-bold flex items-center gap-2 hover:underline group">
            View All Reports <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </SectionReveal>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {REPORTS.map((report) => (
            <motion.div 
              key={report.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={report.image} 
                  alt={report.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {report.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-blue transition-colors">{report.title}</h3>
                <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed">{report.description}</p>
                <button 
                  onClick={() => onDownload(report.title)}
                  className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold flex items-center justify-center gap-2 group-hover:bg-brand-blue group-hover:text-white transition-all"
                >
                  Download PDF <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const InsightsDashboard = () => {
  const [activeTab, setActiveTab] = useState('Activity');
  
  const tabs = [
    { name: 'Activity', icon: Activity, color: 'text-brand-blue' },
    { name: 'Chronic', icon: Heart, color: 'text-red-500' },
    { name: 'Mental', icon: Brain, color: 'text-purple-500' },
    { name: 'Lifestyle', icon: Zap, color: 'text-brand-green' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass rounded-[3rem] p-8 md:p-12 border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Dynamic Health Dashboard</h2>
                <p className="text-slate-500">Real-time data visualization of India's health metrics.</p>
              </div>
              
              <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto hide-scrollbar max-w-full relative">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={cn(
                      "relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap z-10",
                      activeTab === tab.name 
                        ? "text-slate-900" 
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {activeTab === tab.name && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <tab.icon className={cn("w-4 h-4", activeTab === tab.name ? tab.color : "text-slate-400")} />
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 bg-slate-50 rounded-[2rem] p-8 border border-slate-100 h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STEP_COUNT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0066FF" 
                      strokeWidth={4} 
                      fill="url(#dashboardGradient)" 
                    />
                    <defs>
                      <linearGradient id="dashboardGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Key Insight</h4>
                  <p className="text-lg font-medium text-slate-900 leading-relaxed">
                    {activeTab === 'Activity' && "Urban areas show a 22% higher activity rate compared to rural regions, primarily driven by the rise of fitness communities."}
                    {activeTab === 'Chronic' && "Early detection rates for diabetes have improved by 15% due to increased awareness and digital screening tools."}
                    {activeTab === 'Mental' && "Stress-related queries have spiked by 40% in the last 12 months, highlighting a critical need for mental health infrastructure."}
                    {activeTab === 'Lifestyle' && "Sleep quality among working professionals has declined by 10%, directly impacting productivity and long-term health."}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-brand-blue/5 rounded-3xl border border-brand-blue/10">
                    <p className="text-xs font-bold text-brand-blue uppercase mb-1">Growth</p>
                    <p className="text-3xl font-display font-bold">+18.5%</p>
                  </div>
                  <div className="p-6 bg-brand-green/5 rounded-3xl border border-brand-green/10">
                    <p className="text-xs font-bold text-brand-green uppercase mb-1">Impact</p>
                    <p className="text-3xl font-display font-bold">12.4M</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors">
                  Explore Full Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsCarousel = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="news" className="py-24 bg-white overflow-hidden">
      <SectionReveal className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl font-display font-bold">In The News</h2>
      </SectionReveal>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex overflow-x-auto gap-8 px-6 pb-12 hide-scrollbar snap-x snap-mandatory"
      >
        {NEWS_ITEMS.map((news) => (
          <motion.div 
            key={news.id}
            variants={itemVariants}
            className="min-w-[320px] md:min-w-[400px] snap-start"
          >
            <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 group cursor-pointer h-full flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-blue uppercase">{news.source}</span>
                  <span className="text-xs text-slate-400">{news.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-6 group-hover:text-brand-blue transition-colors line-clamp-2">{news.title}</h3>
                <div className="mt-auto">
                  <button className="text-slate-900 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const DownloadSection = ({ onDownload }: { onDownload: (title?: string) => void }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-brand-blue to-brand-green rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Get the Full <br />
                <span className="text-white/80">India Fit Report 2026</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-lg">
                Join thousands of healthcare professionals, policymakers, and wellness enthusiasts who are using our data to shape the future of India.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onDownload("India Fit Report 2026")}
                  className="bg-white text-brand-blue px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                >
                  Download Now <Download className="w-6 h-6" />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all">
                  Partner With Us
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <motion.div 
                initial={{ rotate: 10, y: 50 }}
                whileInView={{ rotate: -5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="w-64 md:w-80 aspect-[3/4] bg-white rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative group"
              >
                <img 
                  src="https://picsum.photos/seed/report-cover/800/1200" 
                  alt="Report Cover" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                  <p className="text-white font-display font-bold text-2xl">India Fit Report</p>
                  <p className="text-white/70 text-sm">Edition 2026</p>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-neon/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReportArchive = ({ onDownload }: { onDownload: (title?: string) => void }) => {
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const [activeYear, setActiveYear] = useState(2026);

  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center">
              <Download className="text-brand-blue w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900">Download Previous India Fit Reports</h3>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar max-w-full">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => {
                  setActiveYear(year);
                  onDownload(`India Fit Report ${year}`);
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,102,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2",
                  activeYear === year 
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
                )}
              >
                {year}
                {activeYear === year && <Download className="w-3 h-3" />}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Foreword = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-16 items-center">
          <SectionReveal className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-brand-blue" />
              <span className="text-sm font-bold text-brand-blue uppercase tracking-widest">Foreword</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 leading-tight text-slate-900">
              Confronting India's <br />
              <span className="text-brand-blue">Healthcare Affordability.</span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                As we stand at the cusp of transformational changes in the Indian healthcare landscape, we must reflect on the strides we have made and confront the formidable challenges that lie ahead. The rising healthcare costs in India present a critical hurdle, affecting the very fabric of our society.
              </p>
              
              <div className="relative p-8 bg-white rounded-3xl border border-slate-200 shadow-sm my-10">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-brand-blue/20 fill-brand-blue/10" />
                <p className="text-xl font-medium text-slate-800 italic">
                  "This report is not just a call to awareness but a call to action. It urges all stakeholders to rethink our approaches and harness innovative technologies like AI to build a more equitable healthcare system."
                </p>
              </div>

              <p>
                As the Founder & CEO of GOQii, focusing on preventive healthcare, I recognize the urgent need to address healthcare affordability. The report reveals how escalating costs not only exacerbate the disparity among economic groups but also make basic healthcare inaccessible for many.
              </p>

              <p>
                Furthermore, the report explores the exciting potential of Artificial Intelligence (AI) in revolutionizing both healthcare and insurance sectors. AI has the capacity to drastically improve diagnosis, personalize treatment options, enhance patient care, and streamline administrative processes.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-blue/20">
                <img 
                  src="https://picsum.photos/seed/ceo/200/200" 
                  alt="Vishal Gondal" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <p className="text-xl font-display font-bold text-slate-900">Vishal Gondal</p>
                <p className="text-sm text-slate-500 font-medium">Founder & CEO, GOQii</p>
              </div>
            </div>
          </SectionReveal>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img 
                src="https://appcdn.goqii.com/storeimg/91895_1712295357.jpg" 
                alt="Healthcare Future" 
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 glass p-6 rounded-2xl shadow-xl hidden md:block"
            >
              <p className="text-xs font-bold text-brand-blue uppercase mb-1">AI Impact</p>
              <p className="text-2xl font-display font-bold">+45% Efficiency</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Ecosystem = () => {
  return (
    <section id="ecosystem" className="py-24 bg-white">
      <SectionReveal className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-400 uppercase tracking-widest mb-4">Our Ecosystem</h2>
          <p className="text-slate-500">Collaborating with the leaders in preventive healthcare.</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {ECOSYSTEM_LOGOS.map((logo, i) => (
            <motion.img 
              key={logo.name} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              src={logo.logo} 
              alt={logo.name} 
              className="h-12 md:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("India Fit Report 2026");

  const handleDownload = (title?: string) => {
    if (title) setSelectedReport(title);
    setIsDownloadModalOpen(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen selection:bg-brand-blue selection:text-white">
            <ScrollProgress />
            <Navbar onDownload={handleDownload} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <main>
                <Hero onDownload={handleDownload} />
                <Foreword />
                <DataStory />
                <CrisisNarrative />
                <ReportModules onDownload={handleDownload} />
                <ReportArchive onDownload={handleDownload} />
                <InsightsDashboard />
                <NewsCarousel />
                <DownloadSection onDownload={handleDownload} />
                <Ecosystem />
              </main>
              <Footer />
            </motion.div>

            <DownloadModal 
              isOpen={isDownloadModalOpen} 
              onClose={() => setIsDownloadModalOpen(false)} 
              reportTitle={selectedReport}
            />
          </div>
        } />
        <Route path="/narrative" element={<NarrativePage />} />
      </Routes>
    </BrowserRouter>
  );
}
