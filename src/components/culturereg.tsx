import React, { useState, useEffect } from 'react';
import { 
  Shirt, Mic, Palette, ChefHat, Paintbrush, Camera, 
  User, Phone, MapPin, Calendar, ChevronDown, ArrowRight,
  Users, CalendarDays, CheckCircle2, Trophy, Fingerprint, Eye, EyeOff, X, AlertCircle,
  Layers, Mail
} from 'lucide-react';

const EventRegistration = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [uniqueId, setUniqueId] = useState('');
  const [showId, setShowId] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Added Email back
    gender: '',
    phone: '',
    city: '',
    age: '',
    activityType: 'FASHION SHOW' 
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '', // Added Email back
    gender: '',
    phone: '',
    city: '',
    age: '',
    agreed: ''
  });

  const categories = [
    { id: 1, name: 'FASHION SHOW', icon: Shirt, color: 'text-amber-500' },
    { id: 2, name: 'OPEN STAGE', icon: Mic, color: 'text-green-500' },
    { id: 3, name: 'SUSTAINABLE ART &\nCRAFT COMPETITION', icon: Palette, color: 'text-blue-500' },
    { id: 4, name: 'COOKING', icon: ChefHat, color: 'text-red-500' },
    { id: 5, name: 'PAINTING', icon: Paintbrush, color: 'text-green-600' },
    { id: 6, name: 'PHOTOGRAPHY', icon: Camera, color: 'text-indigo-500' },
  ];

  const activityGuidelines: Record<number, any> = {
    1: { 
      detailed: ["1. Eligibility: 16+.", "2. Theme: Sustainable/Traditional.", "3. No vulgarity.", "4. Props allowed.", "5. Judged on creativity."],
      overview: [{ icon: Users, text: 'Ages 16 and above.' }, { icon: Shirt, text: 'Cultural theme.' }, { icon: CalendarDays, text: 'Register early.' }, { icon: Trophy, text: 'Top 3 awarded.' }]
    },
    2: { 
        detailed: ["1. Open to all.", "2. 5 min limit.", "3. Clean content.", "4. Basic sound provided.", "5. First come basis."],
        overview: [{ icon: Users, text: 'Open to all ages.' }, { icon: Mic, text: '5-min limit.' }, { icon: AlertCircle, text: 'No explicit content.' }, { icon: Trophy, text: 'Audience choice.' }]
    },
    3: { 
        detailed: ["1. Recycled materials only.", "2. Live creation.", "3. 3-hour limit.", "4. Workspace cleanup required."],
        overview: [{ icon: Palette, text: 'Eco-friendly only.' }, { icon: CalendarDays, text: 'Live creation.' }, { icon: CheckCircle2, text: '3-hour limit.' }, { icon: Trophy, text: 'Innovation prize.' }]
    },
    4: { 
        detailed: ["1. Pahadi theme.", "2. Bring ingredients.", "3. Hygiene mandatory.", "4. Taste & presentation judging."],
        overview: [{ icon: ChefHat, text: 'Pahadi theme.' }, { icon: CheckCircle2, text: 'Own ingredients.' }, { icon: AlertCircle, text: 'Strict hygiene.' }, { icon: Trophy, text: 'Taste/Plating.' }]
    },
    5: { 
        detailed: ["1. Canvas provided.", "2. Himalayan theme.", "3. 2.5 hours.", "4. No plagiarism."],
        overview: [{ icon: Paintbrush, text: 'Bring brushes.' }, { icon: CheckCircle2, text: 'Himalayan theme.' }, { icon: CalendarDays, text: '2.5 hour limit.' }, { icon: Trophy, text: 'Gallery display.' }]
    },
    6: { 
        detailed: ["1. Max 3 photos.", "2. Basic edits only.", "3. Festival dates only.", "4. Promotional rights apply."],
        overview: [{ icon: Camera, text: 'Max 3 photos.' }, { icon: AlertCircle, text: 'No AI manipulation.' }, { icon: CalendarDays, text: 'Taken at festival.' }, { icon: Trophy, text: 'Exhibition spot.' }]
    }
  };

  const currentRules = activityGuidelines[activeTab] || { detailed: [], overview: [] };

  useEffect(() => {
    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1); 
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    setUniqueId(`JATRA-CULTURAL-${dd}${mm}${yyyy}-${hh}${min}${ss}`);
    
    const currentCategory = categories.find(c => c.id === activeTab);
    if (currentCategory) {
        setFormData(prev => ({ ...prev, activityType: currentCategory.name.replace('\n', ' ') }));
    }

    setIsAgreed(false); 
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { fullName: '', email: '', gender: '', phone: '', city: '', age: '', agreed: '' };

    if (!formData.fullName.trim()) { newErrors.fullName = 'Required.'; hasErrors = true; }
    if (!formData.email.trim()) { newErrors.email = 'Required.'; hasErrors = true; }
    if (!formData.gender) { newErrors.gender = 'Required.'; hasErrors = true; }
    if (!formData.phone.trim()) { newErrors.phone = 'Required.'; hasErrors = true; }
    if (!formData.city.trim()) { newErrors.city = 'Required.'; hasErrors = true; }
    if (!formData.age.trim()) { newErrors.age = 'Required.'; hasErrors = true; }
    if (!isAgreed) { newErrors.agreed = 'Read guidelines first.'; hasErrors = true; }

    if (hasErrors) {
      setErrors(newErrors);
      return; 
    }

    setIsSubmitting(true);

    const payload = {
        ...formData,
        uniqueId: uniqueId
    };

    try {
        const response = await fetch('https://jatrafestival.in/api/event_register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
            alert(`Registration Successful! Please check your email for the NOC and details.`);
            // Optional: Reset form after success
            setFormData({ fullName: '', email: '', gender: '', phone: '', city: '', age: '', activityType: formData.activityType });
            setIsAgreed(false);
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Submission error:', error);
        alert('Network error. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      
      {/* --- HEADER SECTION --- */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <img src="/src/assets/jatra-logo45.png" alt="Jatra Logo" className="h-40 w-auto" />
          <div className="text-center">
            <h5 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase ">
                Culuture <span className="text-amber-500">Activities</span>
            </h5>
            <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-2 rounded-full"></div>
            </div>
            <img src="/src/assets/devasthaliXkartavyakarma.png" alt="Devasthali x Kartavyakarma" className="h-20 w-auto" />
      </header>

      {/* Guidelines Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-black text-gray-900 mb-1 uppercase">Rules & Guidelines</h3>
            <p className="text-amber-500 font-bold text-sm mb-4 border-b border-gray-100 pb-4">{formData.activityType}</p>
            <div className="text-gray-600 text-sm space-y-4 mb-6 overflow-y-auto pr-2 flex-grow">
              {currentRules.detailed.map((rule: string, index: number) => <p key={index}>{rule}</p>)}
            </div>
            <div className="flex items-start mb-6 bg-[#fcfaf8] p-4 rounded-xl border border-gray-200">
              <input
                id="modal-checkbox"
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (errors.agreed) setErrors(prev => ({ ...prev, agreed: '' }));
                }}
                className="w-5 h-5 text-amber-500 mt-0.5 cursor-pointer"
              />
              <label htmlFor="modal-checkbox" className="ml-3 font-bold text-gray-800 text-sm cursor-pointer">
                I agree to follow the rules for this activity.
              </label>
            </div>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold py-3.5 rounded-xl uppercase tracking-wide">
              Continue to Form
            </button>
          </div>
        </div>
      )}

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 pt-12 pb-24">
        
        {/* Categories / Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex flex-col items-center justify-center p-4 h-32 rounded-xl border bg-white transition-all ${isActive ? 'border-amber-500 ring-1 ring-amber-500 z-10' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <Icon className={`w-8 h-8 mb-2 ${cat.color}`} strokeWidth={1.5} />
                <span className="text-[10px] font-bold text-gray-800 text-center uppercase whitespace-pre-line leading-tight">{cat.name}</span>
                {isActive && <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-amber-500 rotate-45 z-20"></div>}
              </button>
            );
          })}
        </div>

        {/* Registration Form Box */}
        <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-8 md:p-10 shadow-sm relative">
          <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide">Registration Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Activity Type */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 uppercase tracking-tighter">Selected Activity</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Layers className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    name="activityType"
                    value={formData.activityType}
                    readOnly
                    className="block w-full pl-10 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm font-bold text-amber-700 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Other Form Inputs */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`} placeholder="Enter full name" />
                </div>
              </div>

              {/* Added Email Input Here */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="Enter email address" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} className={`block w-full px-4 py-3 bg-white border rounded-lg text-sm appearance-none ${errors.gender ? 'border-red-500' : 'border-gray-200'}`}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`block w-full px-4 py-3 bg-white border rounded-lg text-sm ${errors.phone ? 'border-red-500' : 'border-gray-200'}`} placeholder="Phone number" />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={`block w-full px-4 py-3 bg-white border rounded-lg text-sm ${errors.city ? 'border-red-500' : 'border-gray-200'}`} placeholder="City" />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Age *</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} className={`block w-full px-4 py-3 bg-white border rounded-lg text-sm ${errors.age ? 'border-red-500' : 'border-gray-200'}`} placeholder="Age" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-bold text-gray-800">Unique ID</label>
                <input type="text" value={uniqueId} readOnly className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-mono cursor-not-allowed" />
              </div>
            </div>

            {/* Agreement Block */}
            <div className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border ${isAgreed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                {isAgreed ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-300" />}
                <span className="font-bold text-sm text-gray-600">Read and accept guidelines *</span>
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-gray-900 text-white text-xs font-bold py-2.5 px-5 rounded-lg uppercase">Read Rules</button>
            </div>
            {errors.agreed && <p className="text-red-500 text-xs font-semibold">{errors.agreed}</p>}

            <button disabled={isSubmitting} type="submit" className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center transition-colors uppercase tracking-wide disabled:opacity-50">
              {isSubmitting ? 'Registering...' : 'Register Now'} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-[#0f172a] py-8 border-t border-gray-800 flex flex-col items-center">
        <p className="text-[#fbab18] text-xs font-bold uppercase tracking-[0.2em] mb-4">Celebrate. Participate. Preserve.</p>
        <img src='/src/assets/jatra-logo.png' className="h-16 w-auto object-contain" alt="Jatra Logo" />
      </footer>
    </div>
  );
};

export default EventRegistration;