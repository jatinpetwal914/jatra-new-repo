import React from 'react';
import { Landmark, Mountain, ArrowRight } from 'lucide-react';

// Import local background images from assets
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
            <img src="/src/assets/jatra-wordmark.png" width={350} height={310} alt="Jatra Wordmark" />
          </h2>
        </div>

        {/* Title Area */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="hidden sm:flex items-center gap-2">
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
          </div>
        </div>
        
        <p className="text-gray-300 text-sm md:text-base max-w-2xl">
          Be a part of Jatra 2026. Celebrate culture, embrace adventure.
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row gap-6 md:gap-8 z-10">
        
        {/* Cultural Activities Card */}
        <div className="flex-1 relative rounded-xl border border-[#fca311] overflow-hidden group h-[450px] md:h-[480px] flex flex-col items-center justify-end text-center p-8 transition-transform duration-300 hover:scale-[1.02] shadow-lg shadow-[#fca311]/10">
          
          {/* Background Image: using imported local asset */}
          <div 
            className="absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${culturalBg})` }}
          ></div>
          
          {/* Overlay: Dark at bottom, transparent at top to show image perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-0"></div>

          {/* Card Content */}
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
            
            {/* UPDATED: Converted button to anchor tag for new tab redirection. Update href to your actual route */}
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

        {/* OR Divider */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0d1117] items-center justify-center font-bold text-sm border-2 shadow-lg"
             style={{ borderLeftColor: '#fca311', borderBottomColor: '#fca311', borderRightColor: '#52b755', borderTopColor: '#52b755'}}>
          OR
        </div>

        {/* Adventure Activities Card */}
        <div className="flex-1 relative rounded-xl border border-[#52b755] overflow-hidden group h-[450px] md:h-[480px] flex flex-col items-center justify-end text-center p-8 transition-transform duration-300 hover:scale-[1.02] shadow-lg shadow-[#52b755]/10">
          
          {/* Background Image: using imported local asset */}
          <div 
            className="absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${adventureBg})` }}
          ></div>
          
          {/* Overlay: Dark at bottom, transparent at top to show image perfectly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/90 to-transparent z-0"></div>

          {/* Card Content */}
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
            
            {/* UPDATED: Converted button to anchor tag for new tab redirection. Update href to your actual route */}
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