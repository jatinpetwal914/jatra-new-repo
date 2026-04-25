import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, FileSignature, X } from 'lucide-react';

// === IMPORT LOCAL IMAGES FROM ASSETS ===
import festivalBg from '../assets/pera.png'; 

// === COLOR PALETTE DEFINITIONS ===
const COLORS = {
  blue: '#00A6E6',   
  yellow: '#FFC700', 
  green: '#2C9646',  
  red: '#D21F3C',    
};

const contributionAreas = [
  'Management & Coordination',
  'Content / Creative',
  'Social Media / Promotion',
  'Logistics / Ground Work',
  'Sponsorship / Outreach',
  'Technical'
];

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: '', 
    contact: '', 
    email: '', 
    occupation: '',
    jatraTeam: 'Yes',
    priorExperience: '',
    responsibility: '',
    meaning: '',
    areas: [] as string[],
    poc: '',
    contribution: ''
  });

  // Modal & Undertaking State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [undertaking, setUndertaking] = useState({
    level: 0,
    agree1: false,
    agree2: false
  });

  const isUndertakingComplete = undertaking.level > 0 && undertaking.agree1 && undertaking.agree2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArea = (area: string) => {
    setFormData((prev) => {
      const current = prev.areas;
      if (current.includes(area)) {
        return { ...prev, areas: current.filter(a => a !== area) };
      } else {
        return { ...prev, areas: [...current, area] };
      }
    });
  };

  // === UPDATED HANDLESUBMIT FOR API INTEGRATION ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUndertakingComplete) {
      alert("Please complete the Undertaking form first!");
      return;
    }

    // Combine form data and the commitment level from the undertaking
    const submissionData = {
      ...formData,
      level: undertaking.level 
    };

    try {
      // CHANGE THIS URL to your actual live cPanel domain where register.php is hosted
      const response = await fetch('https://jatrafestival.in/api/register.php', {
        method: 'POST',
        // ... rest of the code stays the same
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert(`Registration Complete!\nWelcome to the team, ${formData.name}.`);
        
        // Clear the form after success
        setFormData({ name: '', contact: '', email: '', occupation: '', jatraTeam: 'Yes', priorExperience: '', responsibility: '', meaning: '', areas: [], poc: '', contribution: '' });
        setUndertaking({ level: 0, agree1: false, agree2: false });
        
      } else {
        alert("Server Error: " + result.message);
      }
    } catch (error) {
      alert("Network Error: Could not connect to the server. Make sure your PHP file is uploaded to cPanel and the URL is correct.");
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 py-12">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${festivalBg})` }}
      />

      <div className="absolute inset-0 z-10 bg-black/10 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-2xl bg-gray-900/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Sticky Header */}
        <div className="text-center p-6 sm:p-8 pb-4 border-b border-white/10 bg-white/5 shrink-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 drop-shadow-md tracking-tight">
            Volunteer Registration
          </h2>
          <p className="text-white/80 text-sm font-medium">
            Join the Kasar Jatra 2026 organizing team
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-4">
              <h3 className="text-white font-bold border-b border-white/20 pb-1 mb-3 text-sm uppercase tracking-wider text-opacity-80">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold shadow-sm" />
                <input name="contact" type="tel" placeholder="Contact Number" value={formData.contact} onChange={handleInputChange} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold shadow-sm" />
                <input name="email" type="email" placeholder="Email ID" value={formData.email} onChange={handleInputChange} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold shadow-sm" />
                <input name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleInputChange} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold shadow-sm" />
              </div>
            </div>

            {/* Section 2: Experience & Mindset */}
            <div className="space-y-4">
              <h3 className="text-white font-bold border-b border-white/20 pb-1 mb-3 text-sm uppercase tracking-wider text-opacity-80">Experience & Mindset</h3>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 ml-1">Have you been part of any event/team before? If yes, describe your role.</label>
                <textarea name="priorExperience" value={formData.priorExperience} onChange={handleInputChange} rows={2} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold resize-none shadow-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 ml-1">How do you usually handle responsibility and deadlines?</label>
                <textarea name="responsibility" value={formData.responsibility} onChange={handleInputChange} rows={2} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold resize-none shadow-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 ml-1">What does Jatra mean to you?</label>
                <textarea name="meaning" value={formData.meaning} onChange={handleInputChange} rows={2} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold resize-none shadow-sm" />
              </div>
            </div>

            {/* Section 3: Roles & Contribution */}
            <div className="space-y-5">
              <h3 className="text-white font-bold border-b border-white/20 pb-1 mb-3 text-sm uppercase tracking-wider text-opacity-80">Roles & Contribution</h3>
              
              {/* Jatra Team Question */}
              <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                <label className="text-sm font-bold text-white mb-3 block text-center">Do you wish to be part of the core Jatra Team?</label>
                <div className="flex justify-center gap-4">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} type="button" onClick={() => handleRadioChange('jatraTeam', opt)} className={`px-8 py-2 rounded-xl font-bold transition-all border ${formData.jatraTeam === opt ? 'bg-[#00A6E6] text-white border-[#00A6E6] shadow-md' : 'bg-white/10 text-white border-white/30 hover:bg-white/20'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Area of Contribution */}
              <div>
                <label className="text-xs font-bold text-white/90 ml-1 mb-2 block">Preferred Area of Contribution (Select multiple)</label>
                <div className="flex flex-wrap gap-2">
                  {contributionAreas.map(area => {
                    const isSelected = formData.areas.includes(area);
                    return (
                      <button key={area} type="button" onClick={() => toggleArea(area)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isSelected ? 'bg-[#FFC700] text-gray-900 border-[#FFC700] shadow-md' : 'bg-white/20 text-white border-white/20 hover:bg-white/30'}`}>{area}</button>
                    );
                  })}
                </div>
              </div>

              {/* POC Question */}
              <div>
                <label className="text-xs font-bold text-white/90 ml-1 mb-2 block">Are you willing to take responsibility as a POC (Point of Contact) if required?</label>
                <div className="flex gap-3">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} type="button" onClick={() => handleRadioChange('poc', opt)} className={`px-6 py-1.5 rounded-lg text-sm font-bold transition-all border ${formData.poc === opt ? 'bg-[#00A6E6] text-white border-[#00A6E6]' : 'bg-white/10 text-white border-white/30'}`}>{opt}</button>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/90 ml-1">How will you contribute to the team? (Your strengths/skills)</label>
                <textarea name="contribution" value={formData.contribution} onChange={handleInputChange} rows={2} required className="w-full p-3.5 bg-white/80 border border-white/30 rounded-xl text-gray-900 placeholder-gray-700 focus:bg-white focus:ring-2 focus:ring-[#00A6E6] outline-none transition-all text-sm font-semibold resize-none shadow-sm" />
              </div>
            </div>

            {/* Glowing Undertaking Button */}
            <div className="pt-6 pb-2 border-t border-white/20">
              <motion.button
                type="button"
                onClick={() => setIsModalOpen(true)}
                animate={!isUndertakingComplete ? { boxShadow: ['0 0 0px #D21F3C', '0 0 20px #D21F3C', '0 0 0px #D21F3C'] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all ${
                  isUndertakingComplete 
                    ? 'bg-[#2C9646]/90 border-[#2C9646] text-white border-2 backdrop-blur-md' 
                    : 'bg-gray-900/80 border border-[#D21F3C]/50 text-white hover:bg-gray-900'
                }`}
              >
                {isUndertakingComplete ? (
                  <><Check className="text-white" /> Undertaking Completed</>
                ) : (
                  <><FileSignature className="text-[#D21F3C]" /> Read & Sign Undertaking (Required)</>
                )}
              </motion.button>
            </div>

            {/* Final Submit */}
            <button
              type="submit"
              disabled={!isUndertakingComplete}
              className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest transition-all duration-300 ${
                isUndertakingComplete 
                  ? 'bg-[#D21F3C] text-white shadow-lg hover:shadow-xl hover:bg-[#b01830] transform hover:-translate-y-1' 
                  : 'bg-gray-500/50 text-gray-300 cursor-not-allowed border border-gray-400/30'
              }`}
            >
              Confirm Registration
            </button>
            
          </form>
        </div>
      </motion.div>

      {/* MODAL: Undertaking Form */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-50 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#D21F3C] p-5 flex justify-between items-center text-white">
                <h3 className="font-extrabold text-xl flex items-center gap-2"><AlertCircle size={22}/> Undertaking Form</h3>
                <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={24}/></button>
              </div>

              <div className="p-6 space-y-8">
                {/* Scale 1-5 */}
                <div>
                  <label className="font-bold text-gray-900 block mb-3 text-center">Commitment Level (1 = Not sure, 5 = Fully committed)</label>
                  <div className="flex justify-between max-w-xs mx-auto">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button 
                        key={num} onClick={() => setUndertaking(p => ({ ...p, level: num }))}
                        className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center transition-all ${
                          undertaking.level === num ? 'bg-[#00A6E6] text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkbox 1 */}
                <div 
                  onClick={() => setUndertaking(p => ({ ...p, agree1: !p.agree1 }))}
                  className={`p-4 rounded-xl border-2 flex gap-4 cursor-pointer transition-all ${undertaking.agree1 ? 'border-[#2C9646] bg-[#2C9646]/10' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                >
                  <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border-2 mt-0.5 ${undertaking.agree1 ? 'bg-[#2C9646] border-[#2C9646]' : 'border-gray-400'}`}>
                    {undertaking.agree1 && <Check size={16} className="text-white" />}
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    "I understand that being a part of Jatra means taking full responsibility. I will stay committed throughout the process and will not back off once assigned a role. I will communicate properly, respect deadlines, and work as a team."
                  </p>
                </div>

                {/* Checkbox 2 */}
                <div 
                  onClick={() => setUndertaking(p => ({ ...p, agree2: !p.agree2 }))}
                  className={`p-4 rounded-xl border-2 flex gap-4 cursor-pointer transition-all ${undertaking.agree2 ? 'border-[#2C9646] bg-[#2C9646]/10' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                >
                  <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border-2 mt-0.5 ${undertaking.agree2 ? 'bg-[#2C9646] border-[#2C9646]' : 'border-gray-400'}`}>
                    {undertaking.agree2 && <Check size={16} className="text-white" />}
                  </div>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">
                    "I confirm that my parents/guardians are aware of my involvement in this event, and I take full responsibility for managing my time and commitment."
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-gray-200 bg-gray-100 flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                >
                  Save & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Style for scrollbar to keep it pretty inside the glassmorphism */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}