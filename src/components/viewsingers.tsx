import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import kamla from "@/assets/guests/kamla-devi.jpg";
import digvijay from "@/assets/guests/digvijay-parihar.jpg";
import shiromani from "@/assets/guests/shiromani-pant.jpg";
import basanti from "@/assets/guests/basanti-bisht.jpg";
import lalit from "@/assets/guests/lalit-mohan-joshi.jpg";

// Expanded data to include detailed bios and schedule information
const guestsData = [
  {
    id: 1,
    img: kamla,
    name: "Kamla Devi",
    role: "Folk Singer",
    theme: "purple",
    bio: "A true guardian of Kumaoni folk traditions. Kamla Devi's rooted stage voice echoes the deep valleys of the Himalayas, preserving songs passed down through generations. Her performances are a soulful journey into the heart of Uttarakhand's musical heritage.",
    schedule: [
      { date: "June 25, 2026", time: "6:30 PM - 8:00 PM", location: "Main Cultural Stage" },
      { date: "June 27, 2026", time: "5:00 PM - 6:00 PM", location: "Acoustic Amphitheater" }
    ]
  },
  {
    id: 2,
    img: digvijay,
    name: "Digvijay Parihar",
    role: "Playback Singer",
    theme: "orange",
    bio: "Bridging the gap between tradition and modernity, Digvijay brings a contemporary live sound to the mountain stage. Known for his powerful vocals and energetic performances, he reimagines classical folk tunes for today's audience without losing their original soul.",
    schedule: [
      { date: "June 26, 2026", time: "8:30 PM - 10:00 PM", location: "Main Cultural Stage" }
    ]
  },
  {
    id: 3,
    img: shiromani,
    name: "Shiromani Pant",
    role: "Folk Narrator",
    theme: "green",
    bio: "A master storyteller who keeps Himalayan memory alive. Shiromani Pant's narrations weave local legends, myths, and historical epics with humor and deep reverence, allowing audiences to visualize the rich tapestry of Uttarakhand's past.",
    schedule: [
      { date: "June 24, 2026", time: "4:00 PM - 5:30 PM", location: "Heritage Pavilion" },
      { date: "June 28, 2026", time: "3:00 PM - 4:30 PM", location: "Storyteller's Circle" }
    ]
  },
  {
    id: 4,
    img: lalit,
    name: "Lalit Mohan Joshi",
    role: "Folk Singer",
    theme: "purple",
    bio: "A deeply familiar and beloved voice of Kumaoni music. Lalit Mohan Joshi has dedicated his life to regional traditions, bringing the festive and celebratory rhythms of the mountains to stages across the country.",
    schedule: [
      { date: "June 28, 2026", time: "7:00 PM - 9:00 PM", location: "Main Cultural Stage" }
    ]
  },
  {
    id: 5,
    img: basanti,
    name: "Dr. Basanti Bisht",
    role: "Jagar Singer",
    theme: "orange",
    bio: "The first female Jagar singer of Uttarakhand. Dr. Basanti Bisht preserves a powerful, sacred vocal tradition that was historically reserved only for men. Her commanding voice invokes the local deities and spirits of the mountains.",
    schedule: [
      { date: "June 29, 2026", time: "5:30 PM - 7:30 PM", location: "Sacred Grove Stage" }
    ]
  },
];

// Theme dictionary for dynamic styling
const themes = {
  purple: { border: "border-[#8b5cf6]", text: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]" },
  orange: { border: "border-[#fca311]", text: "text-[#fca311]", bg: "bg-[#fca311]" },
  green: { border: "border-[#52b755]", text: "text-[#52b755]", bg: "bg-[#52b755]" },
};

const AllGuestsPage = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white pt-24 pb-20 font-sans overflow-x-hidden">
      
      {/* Background Accents */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,163,17,0.05),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.05),transparent_40%)]" />

      <div className="container relative px-6 md:px-12 mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] rotate-45"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#fca311] rotate-45"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#52b755] rotate-45"></div>
              <div className="w-12 h-px bg-gray-600"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
              Voices of <span className="text-[#fca311]">Uttarakhand</span>
            </h1>
            
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-12 h-px bg-gray-600"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#52b755] rotate-45"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#fca311] rotate-45"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] rotate-45"></div>
            </div>
          </div>
          
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">
            Meet the extraordinary artists, narrators, and keepers of culture who bring the spirit and heritage of the Himalayan region to the Jatra 2026 festival stage.
          </p>
        </div>

        {/* Zig-Zag List Section */}
        <div className="flex flex-col gap-24 md:gap-32">
          {guestsData.map((guest, index) => {
            const style = themes[guest.theme as keyof typeof themes];
            const isEven = index % 2 === 0;

            return (
              <div 
                key={guest.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 lg:gap-24`}
              >
                
                {/* Artist Image Card */}
                <div className="flex-shrink-0 relative group perspective">
                  <article
                    className={`relative w-[280px] h-[400px] overflow-hidden rounded-xl border-2 ${style.border} bg-[#0d1117] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${guest.theme}-500/20`}
                  >
                    {/* Background Image (Clear, no blur) */}
                    <div 
                      className="absolute inset-0 bg-cover bg-top z-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${guest.img})` }}
                    ></div>

                    {/* Gradient Overlay for bottom text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent z-0"></div>

                    {/* Name inside card */}
                    <div className="relative z-10 flex flex-col items-center justify-end h-full w-full p-6 text-center">
                      <h3 className="text-3xl font-black uppercase mb-2 leading-tight text-white drop-shadow-lg">
                        {guest.name}
                      </h3>
                      <div className={`w-3 h-3 border-2 ${style.border} rotate-45 mb-2 bg-[#0d1117]`}></div>
                    </div>
                  </article>
                </div>

                {/* Artist Details & Schedule */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                  <div className={`text-sm font-black uppercase tracking-[0.3em] mb-3 ${style.text}`}>
                    {guest.role}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase">
                    {guest.name}
                  </h2>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                    {guest.bio}
                  </p>

                  {/* Schedule Box */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center justify-center md:justify-start gap-3">
                      <Calendar className={`w-5 h-5 ${style.text}`} />
                      Performance Schedule
                    </h4>
                    
                    <div className="space-y-5">
                      {guest.schedule.map((event, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-black/40 rounded-xl p-4 border border-white/5 transition-colors hover:border-white/20">
                          
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-white">{event.date}</span>
                          </div>
                          
                          <div className="hidden sm:block w-px h-8 bg-gray-700"></div>
                          
                          <div className="flex items-center gap-2 min-w-[160px]">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{event.time}</span>
                          </div>

                          <div className="hidden sm:block w-px h-8 bg-gray-700"></div>

                          <div className="flex items-center gap-2">
                            <MapPin className={`w-4 h-4 ${style.text}`} />
                            <span className="text-sm font-medium text-white">{event.location}</span>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AllGuestsPage;