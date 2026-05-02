import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Asset Paths
import video from "@/assets/vid1.mp4";
import jatraLogo from "@/assets/jatra-logo.png";
import jatraWordmark from "@/assets/jatra-wordmark.png";
import borderBottom from "@/assets/Border1.png";

const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [logoIndex, setLogoIndex] = useState(0);
  const videoRef = useRef(null);

  const logos = [jatraLogo, jatraWordmark];

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      const newState = !isMuted;
      videoRef.current.muted = newState;
      setIsMuted(newState);
    }
  };

  const bellShake = {
    ring: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black flex flex-col justify-end pb-24 md:pb-32 scroll-mt-[100px]"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT WRAPPER - FIXED: Added pt-20 to push everything below the Navbar */}
      <div className="relative z-20 w-full px-6 md:px-12 flex flex-col items-center md:items-start gap-2 mb-8 md:mb-12 pt-24 md:pt-32">
        
        {/* LOGO CONTAINER - FIXED: Slightly smaller size (w-56) and shifted down with mt-10 */}
        <div className="w-56 md:w-[380px] mt-10 md:mt-12 flex items-center md:items-start justify-center md:justify-start pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={logoIndex}
              src={logos[logoIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="max-w-full h-auto object-contain drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>

        {/* ANNOUNCEMENT */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-row items-center justify-center md:justify-start gap-3 text-white mt-4 md:mt-[-15px] mb-6 text-center md:text-left"
        >
          <motion.span variants={bellShake} animate="ring" className="text-2xl md:text-3xl origin-top">
            🔔
          </motion.span>
          <span className="text-lg md:text-2xl font-black uppercase tracking-widest leading-tight">
            Slots available for volunteers
          </span>
        </motion.div>

        {/* BUTTON */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/register"
          className="px-7 py-4 md:px-14 md:py-3 bg-[#FFB800] rounded-[2rem] shadow-2xl inline-block"
        >
          <span className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">
            Register Now
          </span>
        </motion.a>
      </div>

      {/* SOUND BUTTON */}
      <div className="absolute bottom-16 right-6 md:bottom-24 md:right-10 z-50">
        <button
          onClick={toggleSound}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-black/40 backdrop-blur-xl flex items-center justify-center overflow-hidden"
        >
          <div
            className="w-full h-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: isMuted ? "#ff3600" : "transparent" }}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
               {isMuted ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              )}
            </svg>
          </div>
        </button>
      </div>

      {/* MOBILE ONLY BORDER */}
      <div 
        className="md:hidden absolute bottom-0 left-0 w-full h-8 z-40 pointer-events-none"
        style={{ 
          backgroundImage: `url(${borderBottom})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom center'
        }}
      />
    </section>
  );
};

export default HeroSection;