import React, { useState, useEffect } from 'react';
import { 
  Wind, Bike, Footprints, Timer, Flag, 
  User, Phone, MapPin, Calendar, ChevronDown, ArrowRight,
  Users, CalendarDays, CheckCircle2, Trophy, Fingerprint, Eye, EyeOff, X,
  AlertCircle, ShieldCheck, Mountain, Activity, Mail 
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
    email: '',
    gender: '',
    phone: '',
    city: '',
    age: '',
    activityType: '', 
    activityCode: ''  
  });

  const [errors, setErrors] = useState({
    fullName: '', email: '', gender: '', phone: '', city: '', age: '', agreed: ''
  });

  const categories = [
    { id: 1, name: 'PARA TRAILS\n& HEATS', code: 'PARA-TRAILS', icon: Wind, color: 'text-sky-500', logo: '/src/assets/logo-para-trails.png' },
    { id: 2, name: 'MTB RACE\n(PARA STDBY)', code: 'MTB', icon: Bike, color: 'text-orange-500', logo: '/src/assets/logo-mtb.png' },
    { id: 3, name: 'TRAIL RUNNING\n(MTB STDBY)', code: 'TRAIL', icon: Footprints, color: 'text-green-500', logo: '/src/assets/logo-trail.png' },
    { id: 4, name: 'HALF MARATHON &\nPARA FINALS', code: 'MARATHON', icon: Timer, color: 'text-red-500', logo: '/src/assets/logo-marathon.png' },
    { id: 5, name: 'PARA DISPLAY\n(FINALS STDBY)', code: 'DISPLAY', icon: Flag, color: 'text-purple-500', logo: '/src/assets/logo-display.png' },
  ];

  const activityGuidelines = {
    1: { 
      detailed: ["1. Eligibility: Open to certified paragliding pilots only.", "2. Safety: Reserve parachutes mandatory.", "3. Briefing: Attendance compulsory.", "4. Equipment: Technical inspection required.", "5. Weather: Subject to wind conditions."],
      overview: [{ icon: ShieldCheck, text: 'Valid license required.' }, { icon: AlertCircle, text: 'Safety gear mandatory.' }, { icon: CalendarDays, text: 'Compulsory briefing.' }, { icon: Wind, text: 'Subject to weather.' }]
    },
    2: { 
      detailed: ["1. Bike: MTBs only. No e-bikes.", "2. Gear: Helmets mandatory.", "3. Course: Stay on marked trails.", "4. Standby: Schedule may shift."],
      overview: [{ icon: Bike, text: 'MTB strictly required.' }, { icon: ShieldCheck, text: 'Helmets are mandatory.' }, { icon: Mountain, text: 'Stay on marked trails.' }, { icon: Trophy, text: 'Time-trial awards.' }]
    },
    3: { 
      detailed: ["1. Fitness: High-altitude fitness required.", "2. Gear: Trail shoes mandatory.", "3. Environment: Leave no trace.", "4. Medical: Pre-race check conducted."],
      overview: [{ icon: Footprints, text: 'Trail shoes required.' }, { icon: AlertCircle, text: 'Carry hydration pack.' }, { icon: CheckCircle2, text: 'Leave no trace policy.' }, { icon: Trophy, text: 'Medals for finishers.' }]
    },
    4: { 
      detailed: ["1. Route: 21.1 KM mountain terrain.", "2. Checkpoints: Digital cross required.", "3. Para Finals: Top qualifiers only.", "4. Hydration: Stations every 3 KM."],
      overview: [{ icon: Timer, text: 'Strict cutoff times.' }, { icon: MapPin, text: '21.1 KM mountain route.' }, { icon: Users, text: 'Top qualifiers only (Para).' }, { icon: Trophy, text: 'Grand prizes awarded.' }]
    },
    5: { 
      detailed: ["1. Participation: Invited professionals only.", "2. Flight Plan: Pre-approved maneuvers.", "3. Standby: Timing depends on Finals.", "4. Airspace: Strict designated limits."],
      overview: [{ icon: Users, text: 'Invited professionals.' }, { icon: CheckCircle2, text: 'Pre-approved maneuvers.' }, { icon: MapPin, text: 'Strict airspace limits.' }, { icon: Flag, text: 'Festival closing event.' }]
    }
  };

  const currentRules = activityGuidelines[activeTab] || { detailed: [], overview: [] };

  useEffect(() => {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    const dateStr = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
    const timeStr = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    const activeCategory = categories.find(c => c.id === activeTab);
    const activityCode = activeCategory ? activeCategory.code : 'EVENT';
    const activityName = activeCategory ? activeCategory.name.replace('\n', ' ') : 'General Event';

    setUniqueId(`JATRA-${activityCode}-${dateStr}-${timeStr}`);
    
    setFormData(prev => ({ 
      ...prev, 
      activityType: activityName, 
      activityCode: activityCode 
    }));

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
    if (!isAgreed) { newErrors.agreed = 'You must agree to the guidelines.'; hasErrors = true; }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://jatrafestival.in/api/adventure_register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, registrationId: uniqueId })
      });
      const result = await response.json();
      if (result.success) {
        alert(`Registration Successful!\nActivity: ${formData.activityType}\nID: ${uniqueId}`);
        setFormData({ fullName: '', email: '', gender: '', phone: '', city: '', age: '', activityType: formData.activityType, activityCode: formData.activityCode });
        setIsAgreed(false);
      } else {
        alert('Registration failed. ' + (result.message || 'Please try again.'));
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategory = categories.find(c => c.id === activeTab);
  const currentLogo = currentCategory ? currentCategory.logo : '/src/assets/jatra-logo.png';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header - Mobile Optimized and Borderless */}
      <div className="w-full bg-[#0f172a]">
        <header className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8">
          
          {/* Partner Logo - Removed container and border */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <img 
              src="src/assets/devasthaliXkartavyakarma.png" 
              alt="Devasthali Logo" 
              width={80}
              height={80}
              loading="lazy"
              className="h-16 md:h-20 w-auto object-contain" 
            />
          </div>
          
          {/* Title Section */}
          <div className="text-center md:flex-grow">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
              Adventure <span className="text-amber-500">Activities</span>
            </h1>
            <div className="h-1.5 w-32 bg-amber-500 mx-auto mt-3 rounded-full shadow-lg shadow-amber-500/20"></div>
          </div>

          {/* Jatra Wordmark - Removed container and border */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <img 
              src="/src/assets/jatra-logo.png" 
              alt="Jatra Wordmark" 
              width={100}
              height={100}
              className="h-22 md:h-28 w-auto object-contain" 
            />
          </div>
        </header>
      </div>

      {/* Guidelines Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative flex flex-col max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-wide">Rules & Guidelines</h3>
            <p className="text-amber-500 font-bold text-sm mb-4 pb-4 border-b border-gray-100">{formData.activityType}</p>
            <div className="text-gray-600 text-sm space-y-4 mb-6 overflow-y-auto pr-2 flex-grow">
              {currentRules.detailed.map((rule, index) => <p key={index}>{rule}</p>)}
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
                className="w-5 h-5 text-amber-500 border-gray-300 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="modal-checkbox" className="ml-3 font-bold text-sm text-gray-800 cursor-pointer">
                I have read and agree to follow the rules and guidelines for this activity.
              </label>
            </div>
            <button onClick={() => setIsModalOpen(false)} className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold py-3.5 rounded-xl uppercase tracking-wide">
              Continue to Form
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        
        {/* Activity Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex flex-col items-center justify-center p-4 h-32 rounded-xl border transition-all ${isActive ? 'border-amber-500 ring-1 ring-amber-500 shadow-md' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <Icon className={`w-8 h-8 mb-2 ${cat.color}`} strokeWidth={1.5} />
                <span className="text-gray-900 font-bold text-sm mb-1">{cat.id}</span>
                <span className="text-[10px] font-bold text-gray-800 text-center uppercase tracking-wider whitespace-pre-line leading-tight">
                  {cat.name}
                </span>
                {isActive && <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-amber-500 rotate-45"></div>}
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-8 md:p-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide">Registration Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-bold text-gray-800 uppercase tracking-tighter">Selected Activity</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    value={formData.activityType}
                    readOnly
                    className="block w-full pl-10 py-3 bg-amber-50 border border-amber-200 rounded-lg text-sm font-bold text-amber-700 outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Full Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className={`block w-full pl-10 py-3 border rounded-lg text-sm outline-none transition-all ${errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`} placeholder="Enter email address" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Gender *</label>
                <div className="relative">
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className={`block w-full pl-4 pr-10 py-3 border rounded-lg text-sm appearance-none outline-none ${errors.gender ? 'border-red-500' : 'border-gray-200'}`}>
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Phone Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Phone className="h-5 w-5 text-gray-400" /></div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" className={`block w-full pl-10 py-3 border rounded-lg text-sm outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">City *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-gray-400" /></div>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className={`block w-full pl-10 py-3 border rounded-lg text-sm outline-none ${errors.city ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">Age *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className={`block w-full pl-10 py-3 border rounded-lg text-sm outline-none ${errors.age ? 'border-red-500' : 'border-gray-200 focus:border-amber-500'}`} />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-bold text-gray-800">User Unique ID</label>
                <div className="relative">
                  <Fingerprint className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input type={showId ? "text" : "password"} value={uniqueId} readOnly className="block w-full pl-10 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-mono text-gray-600" />
                  <button type="button" onClick={() => setShowId(!showId)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                    {showId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border transition-colors ${isAgreed ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  {isAgreed ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-300" />}
                  <span className={`font-bold text-sm ${isAgreed ? 'text-green-700' : 'text-gray-600'}`}>
                    {isAgreed ? 'Rules & Guidelines Accepted' : 'Please read and accept the guidelines'} <span className="text-red-500">*</span>
                  </span>
                </div>
                <button type="button" onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-gray-900 text-white text-xs font-bold py-2.5 px-5 rounded-lg uppercase">Read Rules</button>
              </div>
              {errors.agreed && <p className="text-red-500 text-xs font-semibold mt-2 px-1">{errors.agreed}</p>}
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center uppercase transition-all disabled:opacity-50">
              {isSubmitting ? 'Registering...' : 'Register Now'} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Dynamic Overview Section */}
        <div className="mt-20">
          <div className="mb-8 flex items-end gap-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-amber-500 pb-1">Guidelines Overview</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currentRules.overview.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="bg-[#0f172a] py-8 border-t border-gray-800 flex flex-col items-center justify-center">
        <p className="text-[#fbab18] text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center">Celebrate. Participate. Preserve.</p>
        <div className="flex justify-center w-full">
          <img src={currentLogo} width={80} height={80} className="h-16 md:h-20 object-contain" alt="Current Activity Logo" />
        </div>
      </footer>
    </div>
  );
};

export default EventRegistration;