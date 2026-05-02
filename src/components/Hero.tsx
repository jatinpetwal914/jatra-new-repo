import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Asset Paths
import video from "@/assets/vid1.mp4";
import jatraLogo from "@/assets/jatra-logo.png";
import jatraWordmark from "@/assets/jatra-wordmark.png";

const HeroSection = () => {
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
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 ml-6 md:ml-12 mb-16 md:mb-10 flex flex-col items-start gap-2 md:gap-0">

        {/* UPPER TEXT */}
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-sm md:text-base font-medium tracking-widest mb-1 md:mb-2 drop-shadow-md">
        </motion.h3>

        {/* LOGO CONTAINER */}
        <div className="w-64 -ml-2 md:w-[450px] md:ml-0 flex items-start justify-start pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={logoIndex}
              src={logos[logoIndex]}
              alt="Jatra Logo"
              width={420}
              height={140}
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
          <span className="text-lg md:text-2xl font-black uppercase tracking-widest drop-shadow-lg">
            Slots available for volunteers
          </span>
        </motion.div>

        {/* BUTTONS CONTAINER (Register Button Only) */}
        <div className="flex items-center gap-4 md:gap-6 mt-2">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/register"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 md:px-14 md:py-3 bg-[#FFB800] rounded-[2rem] shadow-2xl inline-block"
          >
            <span className="text-white text-lg md:text-2xl font-black uppercase tracking-tight">
              Register Now
            </span>
          </motion.a>
        </div>
      </div>

      {/* 🔊 UPDATED: SMALL CIRCULAR SOUND BUTTON (Shifted to Bottom Right Side) */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          type="button"
          onClick={toggleSound}
          className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 bg-black/40 hover:bg-black/60 backdrop-blur-xl shadow-2xl transition-all"
        >
          <AnimatePresence>
            {isMuted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full bg-[#ff3600]/50 animate-ping"
              />
            )}
          </AnimatePresence>

          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300"
            style={{ backgroundColor: isMuted ? "#ff3600" : "transparent" }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              {isMuted ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              )}
            </svg>
          </div>
        </motion.button>
      </div>

    </section>
  );
};

export default HeroSection;