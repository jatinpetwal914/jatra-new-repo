import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Asset Paths
import video from "@/assets/vid1.mp4";
import jatraLogo from "@/assets/jatra-logo.png";
import jatraWordmark from "@/assets/jatra-wordmark.png";

const HeroSection = ({ onRegisterClick }: { onRegisterClick?: () => void }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [logoIndex, setLogoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col justify-end scroll-mt-[100px]">

      {/* VIDEO */}
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

      {/* CONTENT */}
      <div className="relative z-20 ml-6 md:ml-12 mb-16 md:mb-10 flex flex-col items-start gap-2 md:gap-0">

        <div className="w-84 md:w-[450px] flex items-start justify-start pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={logoIndex}
              src={logos[logoIndex]}
              alt="Jatra Logo"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              transition={{ duration: 0.8 }}
              className="max-w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 text-white ml-2 mt-[-10px] md:mt-[-30px] mb-4"
        >
          <motion.span variants={bellShake} animate="ring" className="text-2xl md:text-3xl origin-top">
            🔔
          </motion.span>
          <span className="text-lg md:text-2xl font-black uppercase tracking-widest italic drop-shadow-lg">
            Slots available for volunteers
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRegisterClick}
          className="px-7 py-5 md:px-14 md:py-3 bg-[#FFB800] rounded-[2rem] shadow-2xl"
        >
          <span className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">
            Register Now
          </span>
        </motion.button>
      </div>

      {/* 🔊 MUTE BUTTON (FIXED) */}
      <div className="absolute top-32 right-6 md:right-10 z-10">
        {/* ⬆️ CHANGED z-50 → z-10 */}

        <button
          type="button"
          onClick={toggleSound}
          className="group relative flex items-center gap-3 bg-black/50 border border-white/20 p-3 md:p-4 rounded-full backdrop-blur-xl"
        >
          <AnimatePresence>
            {isMuted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full bg-[#ff3600]/40 animate-ping"
              />
            )}
          </AnimatePresence>

          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: isMuted ? "#ff3600" : "rgba(255,255,255,0.2)" }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              {isMuted ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              )}
            </svg>
          </div>

          <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest pr-2">
            {isMuted ? "Tap for Sound" : "Mute"}
          </span>
        </button>
      </div>

    </section>
  );
};

export default HeroSection;