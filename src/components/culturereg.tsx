import React, { useState, useEffect } from 'react';
import { 
  Shirt, Mic, Palette, ChefHat, Paintbrush, Camera, 
  User, Phone, Mail, Layers, X, CheckCircle2, 
  ArrowRight, Video, Brush, Info
} from 'lucide-react';

const EventRegistration = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [uniqueId, setUniqueId] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    phone: '',
    city: '',
    age: '',
    activityType: 'FASHION SHOW' 
  });

  const [errors, setErrors] = useState({
    fullName: '', email: '', gender: '', phone: '', city: '', age: '', agreed: ''
  });

  const categories = [
    { id: 1, name: 'FASHION SHOW', icon: Shirt, color: 'text-amber-500' },
    { id: 2, name: 'OPEN STAGE', icon: Mic, color: 'text-green-500' },
    { id: 3, name: 'ECO ART UTSAV', icon: Palette, color: 'text-blue-500' },
    { id: 4, name: 'NYOT BHOJ COOKING', icon: ChefHat, color: 'text-red-500' },
    { id: 5, name: 'AIPAN RAIBAR', icon: Brush, color: 'text-orange-600' },
    { id: 6, name: 'REEL MAKING', icon: Video, color: 'text-purple-500' },
  ];

  const activityGuidelines = {
    1: { detailed: ["1. Eligibility: 16+.", "2. Theme: Sustainable/Traditional.", "3. No vulgarity.", "4. Props allowed.", "5. Judged on creativity."] },
    2: { detailed: ["🔹 OPEN TO ALL TALENTS", "🔹 FORMAT: Group participation only", "🏆 PRIZES: 1st: ₹11,000 | 2nd: ₹7,500 | 3rd: ₹4,500"] },
    3: { detailed: ["🔹 SUSTAINABLE CRAFT", "🔹 FORMAT: Participants bring own materials", "🏆 PRIZES: 1st: ₹11,000 | 2nd: ₹7,500 | 3rd: ₹4,500"] },
    4: { detailed: ["🔹 ELIGIBILITY: 18+", "🔹 FORMAT: Mystery Box Challenge", "🏆 PRIZES: 1st: ₹7,500 + Hamper"] },
    5: { detailed: ["🔹 THEME: Kumaoni Culture", "🔹 MEDIUM: White & Red ONLY", "🏆 PRIZES: 1st: ₹7,500"] },
    6: { detailed: ["🔹 DURATION: Max 60 seconds.", "🔹 THEME: Jatra Festival 2026", "🏆 PRIZES: Mentioned at venue"] }
  };

  const currentRules = activityGuidelines[activeTab] || { detailed: [] };

  useEffect(() => {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    setUniqueId(`JATRA-CULTURAL-${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}-${pad(now.getHours())}${pad(now.getMinutes())}`);
    
    const currentCategory = categories.find(c => c.id === activeTab);
    if (currentCategory) setFormData(prev => ({ ...prev, activityType: currentCategory.name }));
    setIsAgreed(false); 
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submission logic from original code...
    alert("This page is currently under maintenance.");
  };

  return (
    
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans relative overflow-hidden">
      
      {/* PROFESSIONAL OVERLAY  */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-xl">
        {/* Header Section from Image */}
        <div className="text-center mb-12 animate-in fade-in zoom-in duration-700">
           <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              </div>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
           </div>
           
           <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
              CULTURAL <span className="text-amber-500">ACTIVITY</span>
           </h2>
           

        </div>

        {/* Notice Card */}
        <div className="bg-[#0f172a]/80 border border-white/10 rounded-3xl p-8 md:p-16 max-w-2xl w-full text-center shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 blur-[80px]"></div>
          
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-widest">
            COMING SOON
          </h3>
          
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-amber-500 to-green-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Currently, the <span className="text-amber-500 font-bold">Volunteer</span> page is open for registration. 
            Stay tuned as we unveil our Adventure Activities!
          </p>

          <button 
            onClick={() => window.location.href='/Register'} 
            className="mt-10 bg-white hover:bg-amber-500 hover:text-white text-black font-black py-4 px-10 rounded-full uppercase transition-all duration-300 text-sm tracking-widest shadow-xl"
          >
            Go to Volunteer Page
          </button>
        </div>
      </div>

      {/* BACKGROUND CONTENT (Blurred) */}
      <div className="opacity-40 pointer-events-none select-none">
        {/* Header */}
        <div className="w-full bg-[#0f172a]">
          <header className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col items-center md:flex-row md:justify-between">
            <img src="/src/assets/devasthaliXkartavyakarma.png" alt="Logos" className="h-16 w-auto" />
            <h1 className="text-3xl font-black text-white uppercase">Cultural <span className="text-amber-500">Activities</span></h1>
            <img src="/src/assets/jatra-logo.png" alt="Jatra" className="h-20 w-auto" />
          </header>
        </div>
        

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto w-full px-4 pt-12 pb-24">
           {/* Category Grid */}
           <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-12">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-xl border border-gray-800 bg-slate-900 flex flex-col items-center">
                <cat.icon className={`w-8 h-8 mb-2 ${cat.color}`} />
                <span className="text-[10px] font-bold text-gray-400">{cat.name}</span>
              </div>
            ))}
          </div>

            
          {/* Form UI */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
            <div className="h-8 w-48 bg-slate-800 rounded mb-6"></div>
            <div className="grid grid-cols-2 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="h-12 bg-slate-800 rounded-xl"></div>)}
            </div>
            <div className="h-16 w-full bg-amber-500/20 rounded-2xl mt-8"></div>
          </div>
        </div>
      </div>

      

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.8s ease-out forwards; }
      `}} />
    </div>
  );
};

export default EventRegistration;