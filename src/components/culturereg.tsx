import React, { useState, useEffect } from 'react';
import { 
  Shirt, Mic, Palette, ChefHat, Paintbrush, Camera, 
  User, Phone, MapPin, Calendar, ChevronDown, ArrowRight,
  Users, CalendarDays, CheckCircle2, Trophy, Fingerprint, Eye, EyeOff, X, AlertCircle
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

  // ==========================================
  // 🛠️ FUTURE CHANGES: ACTIVITIES CONFIGURATION
  // ==========================================
  // To add, remove, or edit activities (tabs), modify this array.
  // Make sure the 'id' matches the keys in the 'activityGuidelines' object below.
  const categories = [
    { id: 1, name: 'FASHION SHOW', icon: Shirt, color: 'text-amber-500' },
    { id: 2, name: 'OPEN STAGE', icon: Mic, color: 'text-green-500' },
    { id: 3, name: 'SUSTAINABLE ART &\nCRAFT COMPETITION', icon: Palette, color: 'text-blue-500' },
    { id: 4, name: 'COOKING', icon: ChefHat, color: 'text-red-500' },
    { id: 5, name: 'PAINTING', icon: Paintbrush, color: 'text-green-600' },
    { id: 6, name: 'PHOTOGRAPHY', icon: Camera, color: 'text-indigo-500' },
  ];

  // ==========================================
  // 🛠️ FUTURE CHANGES: GUIDELINES CONFIGURATION
  // ==========================================
  // This object holds the specific rules for EACH activity.
  // The numbers (1, 2, 3...) correspond to the category 'id' above.
  // You can easily change the detailed modal text and the bottom overview icons here.
  const activityGuidelines: Record<number, any> = {
    1: { // FASHION SHOW
      detailed: [
        "1. Eligibility: Open to participants aged 16 and above. Valid ID required.",
        "2. Theme: Outfits must highlight sustainable or traditional Uttarakhand cultural elements.",
        "3. Decorum: Outfits must be culturally appropriate. Vulgarity will lead to disqualification.",
        "4. Props: Permitted, provided they do not pose a danger to others or the stage.",
        "5. Judging: Based on creativity, theme representation, and stage presence."
      ],
      overview: [
        { icon: Users, text: 'Ages 16 and above.' },
        { icon: Shirt, text: 'Cultural/Sustainable theme.' },
        { icon: CalendarDays, text: 'Register before deadline.' },
        { icon: Trophy, text: 'Top 3 will be awarded.' },
      ]
    },
    2: { // OPEN MIC
      detailed: [
        "1. Eligibility: Open to all age groups.",
        "2. Time Limit: Maximum of 5 minutes per performer.",
        "3. Content: No use of explicit language, hate speech, or offensive material.",
        "4. Equipment: Basic sound system provided. Bring your own specific instruments.",
        "5. Slots: Allocated on a first-come, first-served basis upon arrival."
      ],
      overview: [
        { icon: Users, text: 'Open to all ages.' },
        { icon: Mic, text: '5-minute limit per act.' },
        { icon: AlertCircle, text: 'No explicit content.' },
        { icon: Trophy, text: 'Audience choice awards.' },
      ]
    },
    3: { // SUSTAINABLE ART & CRAFT
      detailed: [
        "1. Materials: Only recycled, upcycled, or 100% biodegradable materials permitted.",
        "2. Pre-work: Art pieces must be created LIVE at the venue. Pre-made pieces are rejected.",
        "3. Time Limit: 3 hours total working time.",
        "4. Cleanliness: Participants must clean their workspace after completion."
      ],
      overview: [
        { icon: Palette, text: 'Use eco-friendly materials.' },
        { icon: CalendarDays, text: 'Live creation at venue.' },
        { icon: CheckCircle2, text: '3-hour time limit.' },
        { icon: Trophy, text: 'Best innovation awarded.' },
      ]
    },
    4: { // COOKING
      detailed: [
        "1. Theme: Authentic local Pahadi/Uttarakhand cuisine.",
        "2. Ingredients: Bring your own ingredients. Only basic stoves/firewood provided.",
        "3. Hygiene: Strict adherence to food safety and cleanliness is mandatory.",
        "4. Plating: Judging includes taste, authenticity, and presentation."
      ],
      overview: [
        { icon: ChefHat, text: 'Pahadi cuisine theme.' },
        { icon: CheckCircle2, text: 'Bring your own ingredients.' },
        { icon: AlertCircle, text: 'Strict hygiene rules.' },
        { icon: Trophy, text: 'Judged on taste & plating.' },
      ]
    },
    5: { // PAINTING
      detailed: [
        "1. Canvas: Standard A3 sheets will be provided. Bring your own colors/brushes.",
        "2. Theme: 'The Spirit of the Himalayas' - interpretation is open to the artist.",
        "3. Time Limit: 2.5 hours.",
        "4. Originality: Plagiarized artworks will be instantly disqualified."
      ],
      overview: [
        { icon: Paintbrush, text: 'Bring your own colors.' },
        { icon: CheckCircle2, text: 'Himalayan theme.' },
        { icon: CalendarDays, text: '2.5 hour time limit.' },
        { icon: Trophy, text: 'Art displayed in gallery.' },
      ]
    },
    6: { // PHOTOGRAPHY
      detailed: [
        "1. Submission: Maximum 3 photo submissions per registered participant.",
        "2. Editing: Basic color correction allowed. No heavy manipulation or AI generation.",
        "3. Timeline: Photos must be taken during the festival dates only.",
        "4. Rights: Organizers reserve the right to use submitted photos for promotion (with credit)."
      ],
      overview: [
        { icon: Camera, text: 'Max 3 submissions.' },
        { icon: AlertCircle, text: 'No heavy editing or AI.' },
        { icon: CalendarDays, text: 'Taken during festival.' },
        { icon: Trophy, text: 'Exhibition & Prizes.' },
      ]
    }
  };

  // Get the rules for the currently selected tab (fallback to empty arrays if undefined)
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
    
    // When changing tabs, uncheck the agreement box to force them to read the new rules
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
    alert(`Registration Successful!\nCategory: ${categoryName}\nYour ID: ${uniqueId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      
      {/* Guidelines Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative flex flex-col max-h-[90vh]">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-black text-gray-900 mb-1 uppercase tracking-wide">
              Rules & Guidelines
            </h3>
            <p className="text-amber-500 font-bold text-sm mb-4 pb-4 border-b border-gray-100">
              {categories.find(c => c.id === activeTab)?.name.replace('\n', ' ')}
            </p>
            
            {/* 🛠️ Dynamic Scrollable Rules Content */}
            <div className="text-gray-600 text-sm space-y-4 mb-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {currentRules.detailed.map((rule: string, index: number) => (
                <p key={index}>{rule}</p>
              ))}
            </div>

            {/* Checkbox Section Inside Modal */}
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

      {/* Main Content Container */}
      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
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
                className={`relative flex flex-col items-center justify-center p-4 h-32 rounded-xl border bg-white transition-all shadow-sm
                  ${isActive 
                    ? 'border-amber-500 shadow-md ring-1 ring-amber-500 z-10' 
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${cat.color}`} strokeWidth={1.5} />
                <span className="text-gray-900 font-bold text-sm mb-1">{cat.id}</span>
                <span className="text-[10px] font-bold text-gray-800 text-center uppercase tracking-wide whitespace-pre-line leading-tight">
                  {cat.name}
                </span>

                {isActive && (
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-amber-500 rotate-45 z-20"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Registration Form Box */}
        <div className="bg-[#fcfaf8] border border-gray-100 rounded-xl p-8 md:p-10 shadow-sm relative z-0">
          <h2 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
            Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Form Inputs */}
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
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs font-semibold">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-800">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`block w-full pl-4 pr-10 py-3 bg-white border rounded-lg text-sm text-gray-600 appearance-none outline-none transition-all ${errors.gender ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`}
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
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${errors.phone ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-semibold">{errors.phone}</p>}
              </div>

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
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${errors.city ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`}
                    placeholder="Enter your city"
                  />
                </div>
                {errors.city && <p className="text-red-500 text-xs font-semibold">{errors.city}</p>}
              </div>

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
                    className={`block w-full pl-10 py-3 bg-white border rounded-lg text-sm outline-none transition-all ${errors.age ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500'}`}
                    placeholder="Enter your age"
                  />
                </div>
                {errors.age && <p className="text-red-500 text-xs font-semibold">{errors.age}</p>}
              </div>

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

        {/* 🛠️ Dynamic Guidelines Overview (Visual Icons at Bottom) */}
        <div className="mt-20">
          <div className="mb-8 flex items-end gap-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest inline-block border-b-2 border-amber-500 pb-1">
              Guidelines Overview
            </h3>
            <span className="text-xs text-gray-400 uppercase font-semibold mb-1 hidden sm:inline-block">
              // {categories.find(c => c.id === activeTab)?.name.replace('\n', ' ')}
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

      {/* Footer */}
      <footer className="bg-[#0f172a] py-8 border-t border-gray-800 flex flex-col items-center justify-center">
        <p className="text-[#fbab18] text-xs font-bold uppercase tracking-[0.2em] mb-4 text-center">
          Celebrate. Participate. Preserve.
        </p>
        
        <div className="flex justify-center w-full">
          <img 
            src='/src/assets/jatra-logo.png' 
            className="h-16 md:h-20 w-auto object-contain" 
            alt="Jatra 2026 Logo" 
          />
        </div>
      </footer>

    </div>
  );
};

export default EventRegistration;