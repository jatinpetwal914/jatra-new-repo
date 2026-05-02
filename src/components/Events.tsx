import React from 'react';
import { Landmark, Mountain, Handshake, ArrowRight } from 'lucide-react';

// Import local background images from assets
// Make sure you add 'Volunteer_activity.png' to your assets folder!
import volunteerBg from "@/assets/Community.png";
import culturalBg from "@/assets/Curtural_activity.png";
import adventureBg from "@/assets/Adventure_activity.png";

const ExperienceSelector = () => {
  return (
    // 'justify-center' added to ensure it vertically centers and fits perfectly in the window frame
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative z-0 overflow-hidden">
      
      {/* Header Section */}
      <div className="text-center mb-8 z-10 flex flex-col items-center">
        {/* Logo Area */}
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-widest text-white mb-2 font-serif">
            {/* If you prefer text logo instead of image, you can revert this to the text 'जात्रा' */}
            <img src="/src/assets/bg_exp.png" width={350} height={310} loading="lazy" decoding="async" alt="Jatra Wordmark" />
          </h2>
        </div>

        {/* Title Area */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 rotate-45"></div>
            <div className="w-8 h-px bg-gray-600"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-sans">
            Choose Your <span className="text-[#fca311]">Experience</span>
          </h2>
          
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-px bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 rotate-45"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 rotate-45"></div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm md:text-base max-w-2xl">
          Be a part of Jatra 2026. Celebrate culture, embrace adventure.
        </p>
      </div>

      {/* Cards Section - Increased max-w-7xl to fit 3 cards comfortably */}
      <div className="relative w-full max-w-7xl flex flex-col md:flex-row gap-6 md:gap-8 z-10">
        
        {/* 1. Volunteering Activities Card */}
        <div className="flex-1 relative rounded-xl border border-[#8b5cf6] overflow-hidden group h-[450px] md:h-[480px] flex flex-col items-center justify-end text-center p-8 transition-transform duration-300 hover:scale-[1.02] shadow-lg shadow-[#8b5cf6]/10">
          
          {/* Background Image: using imported local asset */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${volunteerBg})` }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-0"></div>

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full border border-[#8b5cf6] flex items-center justify-center mb-4 bg-[#0d1117]/50 backdrop-blur-sm">
              <Handshake className="w-8 h-8 text-[#8b5cf6]" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 leading-tight">
              Registration For<br />Volunteering
            </h3>
            
            <div className="w-2.5 h-2.5 border border-[#8b5cf6] rotate-45 mb-4"></div>
            
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-8 max-w-[260px]">
              Be the change. Join our team of<br />
              dedicated volunteers and help make<br />
              Jatra 2026 a memorable experience.
            </p>
            
            <a 
              href="/register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-colors uppercase text-xs w-full max-w-[260px] justify-center cursor-pointer"
            >
              Register For Volunteering
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* First OR Divider (Between Volunteer and Cultural) */}
        <div className="hidden md:flex absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0d1117] items-center justify-center font-bold text-sm border-2 shadow-lg"
             style={{ borderLeftColor: '#8b5cf6', borderBottomColor: '#8b5cf6', borderRightColor: '#fca311', borderTopColor: '#fca311'}}>
          OR
        </div>

        {/* 2. Cultural Activities Card */}
        <div className="flex-1 relative rounded-xl border border-[#fca311] overflow-hidden group h-[450px] md:h-[480px] flex flex-col items-center justify-end text-center p-8 transition-transform duration-300 hover:scale-[1.02] shadow-lg shadow-[#fca311]/10">
          
          <div 
            className="absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${culturalBg})` }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-0"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full border border-[#fca311] flex items-center justify-center mb-4 bg-[#0d1117]/50 backdrop-blur-sm">
              <Landmark className="w-8 h-8 text-[#fca311]" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 leading-tight">
              Cultural<br />Activities
            </h3>
            
            <div className="w-2.5 h-2.5 border border-[#fca311] rotate-45 mb-4"></div>
            
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-8 max-w-[260px]">
              Dive into the rich heritage of Uttarakhand.<br />
              Experience folk music, dances, stories,<br />
              traditional crafts, and more.
            </p>
            
            <a 
              href="/cultural-register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#fca311] hover:bg-[#e08e0b] text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-colors uppercase text-xs w-full max-w-[260px] justify-center cursor-pointer"
            >
              Register For Cultural Activities
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Second OR Divider (Between Cultural and Adventure) */}
        <div className="hidden md:flex absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0d1117] items-center justify-center font-bold text-sm border-2 shadow-lg"
             style={{ borderLeftColor: '#fca311', borderBottomColor: '#fca311', borderRightColor: '#52b755', borderTopColor: '#52b755'}}>
          OR
        </div>

        {/* 3. Adventure Activities Card */}
        <div className="flex-1 relative rounded-xl border border-[#52b755] overflow-hidden group h-[450px] md:h-[480px] flex flex-col items-center justify-end text-center p-8 transition-transform duration-300 hover:scale-[1.02] shadow-lg shadow-[#52b755]/10">
          
          <div 
            className="absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${adventureBg})` }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-0"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="w-16 h-16 rounded-full border border-[#52b755] flex items-center justify-center mb-4 bg-[#0d1117]/50 backdrop-blur-sm">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-4 leading-tight">
              Adventure<br />Activities
            </h3>
            
            <div className="w-2.5 h-2.5 border border-[#52b755] rotate-45 mb-4"></div>
            
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-8 max-w-[260px]">
              Fuel your spirit with adventure.<br />
              From trekking and paragliding to cycling<br />
              and camping – the mountains await!
            </p>
            
            <a 
              href="/adventure-register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#52b755] hover:bg-[#439946] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-colors uppercase text-xs w-full max-w-[260px] justify-center cursor-pointer"
            >
              Register For Adventure Activities
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExperienceSelector;