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
    1: { 
      detailed: [
        "1. Eligibility: 16+.", 
        "2. Theme: Sustainable/Traditional.", 
        "3. No vulgarity.", 
        "4. Props allowed.", 
        "5. Judged on creativity."
      ]
    },
    2: { 
      detailed: [
        "🔹 OPEN TO ALL TALENTS: Dance, Music, Poetry, Theatre, Fine Arts.",
        "🔹 ELIGIBILITY: All ages. Senior category: 25+.",
        "🔹 FORMAT: Group participation only (Min 5, Max 8 members).",
        "🔹 TIME LIMIT: Solo (2–4 mins), Group (4–7 mins).",
        "🔹 RULES: Music tracks must be submitted 24 hours in advance.",
        "🏆 PRIZES: 1st: ₹11,000 | 2nd: ₹7,500 | 3rd: ₹4,500"
      ]
    },
    3: { 
      detailed: [
        "🔹 INTRODUCTION: Sustainable craft promoting eco-friendly creativity.",
        "🔹 ELIGIBILITY: Ages 14+. School/College and Open categories.",
        "🔹 FORMAT: Participants bring own materials (Paper, Glue, Scissors).",
        "🔹 MANDATORY: One waste material provided on-site MUST be included.",
        "🔹 ECO-BONUS: On-spot material usage (+5), Innovation (+5), Message (+5).",
        "🏆 PRIZES: 1st: ₹11,000 | 2nd: ₹7,500 | 3rd: ₹4,500"
      ]
    },
    4: { 
      detailed: [
        "🔹 ELIGIBILITY: 18 years or older. Solo participation only.",
        "🔹 PROS: No Professional chefs allowed. Home cooks & Students only.",
        "🔹 FORMAT: Mystery Box Challenge. Use provided ingredients ONLY.",
        "🔹 RULES: No pre-preparation. Cooking must be on-spot within time limit.",
        "🔹 JUDGING: Taste, Presentation, Creativity, and Pahadi touch.",
        "🏆 PRIZES: 1st: ₹7,500 + Hamper | 2nd: ₹4,500 | 3rd: ₹2,500"
      ]
    },
    5: { 
      detailed: [
        "🔹 THEME: हरेरखा में बसी आपणी संस्कृति (Kumaoni Culture).",
        "🔹 MEDIUM: Suitable surfaces (plates, fabric, pots). Palette: White & Red ONLY.",
        "🔹 AUTHENTICITY: Designs must strictly reflect Kumaoni traditions.",
        "🔹 CRITERIA: Creativity, Neatness/Symmetry, and depth of concept.",
        "🔹 MATERIALS: Participants can bring their own materials.",
        "🏆 PRIZES: 1st: ₹7,500 | 2nd: ₹4,500 | 3rd: ₹2,500"
      ]
    },
    6: { 
      detailed: [
        "🔹 DURATION: Max 60 seconds.",
        "🔹 THEME: Capturing the essence of Jatra Festival 2026.",
        "🔹 RULES: Original content only. High-quality audio/visuals expected.",
        "🔹 RIGHTS: Organizers reserve the right to use entries for promotion.",
        "🏆 PRIZES: Mentioned at the venue."
      ]
    }
  };

  const currentRules = activityGuidelines[activeTab] || { detailed: [] };

  useEffect(() => {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1); 
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    setUniqueId(`JATRA-CULTURAL-${dd}${mm}${yyyy}-${hh}${min}${ss}`);
    
    const currentCategory = categories.find(c => c.id === activeTab);
    if (currentCategory) {
        setFormData(prev => ({ ...prev, activityType: currentCategory.name }));
    }
    setIsAgreed(false); 
  }, [activeTab]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { fullName: '', email: '', gender: '', phone: '', city: '', age: '', agreed: '' };

    if (!formData.fullName.trim()) { newErrors.fullName = 'Required.'; hasErrors = true; }
    if (!formData.email.trim()) { newErrors.email = 'Required.'; hasErrors = true; }
    if (!formData.gender) { newErrors.gender = 'Required.'; hasErrors = true; }
    if (!formData.phone.trim()) { newErrors.phone = 'Required.'; hasErrors = true; }
    if (!formData.city.trim()) { newErrors.city = 'Required.'; hasErrors = true; }
    if (!formData.age.trim()) { newErrors.age = 'Required.'; hasErrors = true; }
    if (!isAgreed) { newErrors.agreed = 'Please read guidelines first.'; hasErrors = true; }

    if (hasErrors) {
      setErrors(newErrors);
      return; 
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://jatrafestival.in/api/event_register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, uniqueId })
      });
      const result = await response.json();
      if (result.success) {
        alert(`Registration Successful! Unique ID: ${uniqueId}`);
        setFormData({ fullName: '', email: '', gender: '', phone: '', city: '', age: '', activityType: formData.activityType });
        setIsAgreed(false);
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <div className="w-full bg-[#0f172a]">
        <header className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <img 
              src="/src/assets/devasthaliXkartavyakarma.png" 
              alt="Partner Logos" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <div className="text-center md:flex-grow">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white m-0 p-0 border-0">
              Cultural <span className="text-amber-500">Activities</span>
            </h1>
            <div className="h-1.5 w-32 bg-amber-500 mx-auto mt-3 rounded-full"></div>
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <img 
              src="/src/assets/jatra-logo.png" 
              alt="Jatra Logo" 
              className="h-20 md:h-28 w-auto object-contain"
            />
          </div>
        </header>
      </div>

      {/* Guidelines Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col max-h-[85vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-black text-gray-900 mb-1 uppercase">Rules & Guidelines</h3>
            <p className="text-amber-600 font-bold text-sm mb-4 border-b pb-2">{formData.activityType}</p>
            <div className="text-gray-700 text-sm space-y-3 mb-6 overflow-y-auto pr-2 custom-scrollbar">
              {currentRules.detailed.map((rule, index) => (
                <p key={index} className="leading-relaxed border-l-2 border-amber-200 pl-3">{rule}</p>
              ))}
            </div>
            <div className="flex items-start mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <input
                id="modal-checkbox"
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (errors.agreed) setErrors(prev => ({ ...prev, agreed: '' }));
                }}
                className="w-5 h-5 text-amber-600 mt-0.5 cursor-pointer accent-amber-500"
              />
              <label htmlFor="modal-checkbox" className="ml-3 font-bold text-gray-800 text-sm cursor-pointer">
                I have read and agree to follow these rules.
              </label>
            </div>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl uppercase transition-colors">
              Accept and Continue
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pt-12 pb-24">
        
        {/* Category Tabs - SLIDING & SMALLER ICONS ON MOBILE */}
        <div className="flex flex-nowrap md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 overflow-x-auto pb-6 px-2 snap-x scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex-none w-[135px] md:w-auto flex flex-col items-center justify-center p-3 h-28 md:h-32 rounded-xl border transition-all snap-center ${
                  isActive 
                    ? 'border-amber-500 bg-amber-50 shadow-md scale-105 z-10' 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Responsive Icon: Smaller on mobile, Larger on desktop */}
                <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${cat.color}`} />
                
                <span className="text-[10px] md:text-[11px] font-black text-gray-800 text-center uppercase leading-tight px-1">
                  {cat.name}
                </span>
                
                {/* Visual Arrow Indicator for Active Tab */}
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-50 rotate-45 border-r border-b border-amber-500 z-20"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Registration Form */}
        <div className="bg-[#fcfaf8] border border-gray-100 rounded-3xl p-6 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-amber-500 p-2 rounded-lg text-white shadow-lg shadow-amber-500/30"><Layers size={18}/></div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Registration Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase mb-2">Selected Activity</label>
                <div className="flex items-center bg-amber-50 border border-amber-200/50 rounded-xl px-4 py-4 text-amber-700 font-bold">
                   <ArrowRight className="mr-3 h-4 w-4 text-amber-500" /> {formData.activityType}
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`} placeholder="Your full name" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="Email" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder="Phone" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`w-full px-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.city ? 'border-red-500' : 'border-gray-200'}`} placeholder="Your city" />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} className={`w-full px-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.age ? 'border-red-500' : 'border-gray-200'}`} placeholder="Age" />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl border transition-all ${isAgreed ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-4 sm:mb-0">
                {isAgreed ? <CheckCircle2 className="text-green-500" /> : <Info className="text-amber-500" />}
                <span className="font-bold text-sm text-gray-600">Please read guidelines to enable registration</span>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-gray-900 text-white text-xs font-bold py-3 px-6 rounded-xl uppercase hover:bg-black transition-colors shadow-md">Read Rules</button>
            </div>
            {errors.agreed && <p className="text-red-500 text-xs font-black italic">{errors.agreed}</p>}

            <button disabled={isSubmitting} type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-5 rounded-2xl flex items-center justify-center transition-all uppercase tracking-widest disabled:opacity-50 shadow-xl shadow-amber-500/30">
              {isSubmitting ? 'Processing...' : 'Submit Registration'} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-slate-900 py-12 flex flex-col items-center border-t border-white/5">
        <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Celebrate. Participate. Preserve.</p>
        <img src='/src/assets/jatra-logo.png' className="h-10 w-auto opacity-50 grayscale" alt="Jatra Logo" />
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default EventRegistration;