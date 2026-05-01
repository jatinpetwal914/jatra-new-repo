import React, { useState, useEffect } from 'react';
import { 
  Wind, Bike, Footprints, Timer, Flag, 
  User, Phone, MapPin, Calendar, ChevronDown, ArrowRight,
  Users, CalendarDays, CheckCircle2, Trophy, Fingerprint, Eye, EyeOff, X,
  AlertCircle, ShieldCheck, Mountain // Added a few extra icons for the dynamic overviews
} from 'lucide-react';

const EventRegistration = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [uniqueId, setUniqueId] = useState('');
  const [showId, setShowId] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    city: '',
    age: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    gender: '',
    phone: '',
    city: '',
    age: '',
    agreed: ''
  });

  // Updated Activities with specific Codes and Logo paths
  const categories = [
    { id: 1, name: 'PARA TRAILS\n& HEATS', code: 'PARA-TRAILS', icon: Wind, color: 'text-sky-500', logo: '/src/assets/logo-para-trails.png' },
    { id: 2, name: 'MTB RACE\n(PARA STDBY)', code: 'MTB', icon: Bike, color: 'text-orange-500', logo: '/src/assets/logo-mtb.png' },
    { id: 3, name: 'TRAIL RUNNING\n(MTB STDBY)', code: 'TRAIL', icon: Footprints, color: 'text-green-500', logo: '/src/assets/logo-trail.png' },
    { id: 4, name: 'HALF MARATHON &\nPARA FINALS', code: 'MARATHON', icon: Timer, color: 'text-red-500', logo: '/src/assets/logo-marathon.png' },
    { id: 5, name: 'PARA DISPLAY\n(FINALS STDBY)', code: 'DISPLAY', icon: Flag, color: 'text-purple-500', logo: '/src/assets/logo-display.png' },
  ];

  // ==========================================
  // 🛠️ FUTURE CHANGES: GUIDELINES CONFIGURATION
  // ==========================================
  // To update the rules for any activity, modify the object below.
  // The keys (1, 2, 3, 4, 5) match the 'id' of the categories defined above.
  // 'detailed' -> Sentences shown inside the popup modal.
  // 'overview' -> Icons and short text shown at the bottom of the page.
  const activityGuidelines: Record<number, any> = {
    1: { // PARA TRAILS & HEATS
      detailed: [
        "1. Eligibility: Open to certified paragliding pilots only. Valid license must be presented.",
        "2. Safety: Reserve parachutes, radios, and certified helmets are strictly mandatory.",
        "3. Briefing: Attendance at the morning safety and weather briefing is compulsory.",
        "4. Equipment Check: All gliders must pass the technical inspection before taking flight.",
        "5. Weather: Organizers reserve the absolute right to delay or cancel heats based on wind conditions."
      ],
      overview: [
        { icon: ShieldCheck, text: 'Valid license required.' },
        { icon: AlertCircle, text: 'Safety gear mandatory.' },
        { icon: CalendarDays, text: 'Compulsory briefing.' },
        { icon: Wind, text: 'Subject to weather.' },
      ]
    },
    2: { // MTB RACE (PARA STDBY)
      detailed: [
        "1. Bike Requirements: Only well-maintained mountain bikes (MTBs) are permitted. No e-bikes.",
        "2. Safety Gear: Helmets are mandatory. Knee and elbow pads are highly recommended.",
        "3. Course: Riders must stick strictly to the marked trail. Deviation leads to disqualification.",
        "4. Standby Note: This event acts as a standby for Para events and schedule may shift slightly."
      ],
      overview: [
        { icon: Bike, text: 'MTB strictly required.' },
        { icon: ShieldCheck, text: 'Helmets are mandatory.' },
        { icon: Mountain, text: 'Stay on marked trails.' },
        { icon: Trophy, text: 'Time-trial awards.' },
      ]
    },
    3: { // TRAIL RUNNING (MTB STDBY)
      detailed: [
        "1. Fitness: Participants must be physically fit for high-altitude running.",
        "2. Gear: Proper trail running shoes and hydration packs are mandatory.",
        "3. Environment: Leave no trace. Littering on the trail results in instant disqualification.",
        "4. Medical: A basic medical check will be conducted before the race begins."
      ],
      overview: [
        { icon: Footprints, text: 'Trail shoes required.' },
        { icon: AlertCircle, text: 'Carry hydration pack.' },
        { icon: CheckCircle2, text: 'Leave no trace policy.' },
        { icon: Trophy, text: 'Medals for finishers.' },
      ]
    },
    4: { // HALF MARATHON & PARA FINALS
      detailed: [
        "1. Marathon Route: The route covers 21.1 KM of varied mountain terrain.",
        "2. Checkpoints: Runners must cross all digital checkpoints within the cutoff times.",
        "3. Para Finals: Only top qualifiers from heats will participate in the Para Finals.",
        "4. Hydration: Water stations are provided every 3 KM along the marathon route."
      ],
      overview: [
        { icon: Timer, text: 'Strict cutoff times.' },
        { icon: MapPin, text: '21.1 KM mountain route.' },
        { icon: Users, text: 'Top qualifiers only (Para).' },
        { icon: Trophy, text: 'Grand prizes awarded.' },
      ]
    },
    5: { // PARA DISPLAY (FINALS STDBY)
      detailed: [
        "1. Participation: Open to invited professional pilots for acrobatic/display flights.",
        "2. Flight Plan: Display maneuvers must be pre-approved by the safety committee.",
        "3. Standby Note: Display timing depends on the conclusion of the Finals.",
        "4. Airspace: Strict adherence to designated display airspace is required."
      ],
      overview: [
        { icon: Users, text: 'Invited professionals.' },
        { icon: CheckCircle2, text: 'Pre-approved maneuvers.' },
        { icon: MapPin, text: 'Strict airspace limits.' },
        { icon: Flag, text: 'Festival closing event.' },
      ]
    }
  };

  // Extract the rules for the currently selected tab
  const currentRules = activityGuidelines[activeTab] || { detailed: [], overview: [] };

  // Generate Unique ID dynamically based on selected Activity
  useEffect(() => {
    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1);
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const ss = pad(now.getSeconds());

    const activeCategory = categories.find(c => c.id === activeTab);
    const activityCode = activeCategory ? activeCategory.code : 'EVENT';

    // Format: JATRA-{ACTIVITY_CODE}-DDMMYYYY-HHMMSS
    setUniqueId(`JATRA-${activityCode}-${dd}${mm}${yyyy}-${hh}${min}${ss}`);
    
    // Uncheck the agreement box when switching tabs so users must read the new rules
    setIsAgreed(false);
  }, [activeTab]); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { fullName: '', gender: '', phone: '', city: '', age: '', agreed: '' };

    if (!formData.fullName.trim()) { newErrors.fullName = 'Full Name is required.'; hasErrors = true; }
    if (!formData.gender) { newErrors.gender = 'Please select a gender.'; hasErrors = true; }
    if (!formData.phone.trim()) { newErrors.phone = 'Phone number is required.'; hasErrors = true; }
    if (!formData.city.trim()) { newErrors.city = 'City is required.'; hasErrors = true; }
    if (!formData.age.trim()) { newErrors.age = 'Age is required.'; hasErrors = true; }
    if (!isAgreed) { newErrors.agreed = 'You must read and agree to the guidelines to register.'; hasErrors = true; }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const categoryName = categories.find(c => c.id === activeTab)?.name.replace('\n', ' ');
    alert(`Registration Successful!\nActivity: ${categoryName}\nYour ID: ${uniqueId}`);
  };

  // Determine which logo to show currently
  const currentCategory = categories.find(c => c.id === activeTab);
  const currentLogo = currentCategory ? currentCategory.logo : '/src/assets/jatra-logo.png';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      
      {/* Guidelines Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-1 uppercase tracking-wide">
              Rules & Guidelines
            </h3>
            <p className="text-amber-500 font-bold text-sm mb-4 pb-4 border-b border-gray-100">
              {currentCategory?.name.replace('\n', ' ')}
            </p>
            
            {/* 🛠️ Dynamic Scrollable Rules Content */}
            <div className="text-gray-600 text-sm space-y-4 mb-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {currentRules.detailed.map((rule: string, index: number) => (
                <p key={index}>{rule}</p>
              ))}
            </div>

            <div className="flex items-start mb-6 bg-[#fcfaf8] p-4 rounded-xl border border-gray-200">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  id="modal-checkbox"
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => {
                    setIsAgreed(e.target.checked);
                    if (errors.agreed) setErrors(prev => ({ ...prev, agreed: '' }));
                  }}
                  className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="modal-checkbox" className="font-bold text-gray-800 cursor-pointer">
                  I have read and agree to follow the rules and guidelines for this activity.
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold py-3.5 px-4 rounded-xl transition-colors uppercase tracking-wide flex justify-center items-center"
            >
              Continue to Form
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        {/* Activity Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex flex-col items-center justify-center p-4 h-32 rounded-xl border bg-white transition-all shadow-sm
                  ${isActive 
                    ? 'border-amber-500 shadow-md ring-1 ring-amber-500 z-10' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${cat.color}`} strokeWidth={1.5} />
                <span className="text-gray-900 font-bold text-sm mb-1">{cat.id}</span>
                <span className="text-[10px] font-bold text-gray-800 text-center uppercase tracking-wider whitespace-pre-line leading-tight">
                  {cat.name}
                </span>
                {isActive && (
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-amber-500 rotate-45 z-20"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-8 md:p-10 shadow-sm relative z-0">
          <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
            Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${
                      errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs font-semibold">{errors.fullName}</p>}
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`block w-full pl-4 pr-10 py-3 bg-white border rounded-lg text-sm text-gray-600 appearance-none outline-none transition-all ${
                      errors.gender ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                    }`}
                  >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                </div>
                {errors.gender && <p className="text-red-500 text-xs font-semibold">{errors.gender}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>}
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${
                      errors.city ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                    }`}
                    placeholder="Enter your city"
                  />
                </div>
                {errors.city && <p className="text-red-500 text-xs font-semibold">{errors.city}</p>}
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  Age <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${
                      errors.age ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
                    }`}
                    placeholder="Enter your age"
                  />
                </div>
                {errors.age && <p className="text-red-500 text-xs font-semibold">{errors.age}</p>}
              </div>

              {/* User Unique ID */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  User Unique ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type={showId ? "text" : "password"}
                    value={uniqueId}
                    readOnly
                    className="block w-full pl-10 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono outline-none cursor-not-allowed select-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowId(!showId)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Guidelines Button Block */}
            <div className="pt-4">
              <div className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border transition-colors ${isAgreed ? 'bg-green-50/50 border-green-200' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  {isAgreed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  )}
                  <span className={`font-bold text-sm ${isAgreed ? 'text-green-700' : 'text-gray-600'}`}>
                    {isAgreed ? 'Rules & Guidelines Accepted' : 'Please read and accept the guidelines'} <span className="text-red-500">*</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold py-2.5 px-5 rounded-lg transition-colors uppercase tracking-wide"
                >
                  Read Rules
                </button>
              </div>
              {errors.agreed && <p className="text-red-500 text-xs font-semibold mt-2 px-1">{errors.agreed}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#fbab18] hover:bg-[#e59b15] text-gray-900 font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center transition-colors uppercase tracking-wide"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>

        {/* 🛠️ Dynamic Guidelines Overview */}
        <div className="mt-20">
          <div className="mb-8 flex items-end gap-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest inline-block border-b-2 border-amber-500 pb-1">
              Guidelines Overview
            </h3>
            <span className="text-xs text-gray-400 uppercase font-semibold mb-1 hidden sm:inline-block">
              // {currentCategory?.name.replace('\n', ' ')}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currentRules.overview.map((item: any, index: number) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Footer */}
      <footer className="bg-[#0f172a] py-8 border-t border-gray-800 flex flex-col items-center justify-center">
        <p className="text-[#fbab18] text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center">
          Celebrate. Participate. Preserve.
        </p>
        
        {/* Logo changes dynamically based on active tab */}
        <div className="flex justify-center w-full">
          <img 
            src={currentLogo} 
            className="h-16 md:h-20 w-auto object-contain transition-opacity duration-300" 
            alt={`${currentCategory?.name} Logo`} 
          />
        </div>
      </footer>
    </div>
  );
};

export default EventRegistration;