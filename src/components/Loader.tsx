import { useEffect, useState } from "react";
import logo from "@/assets/jatra-wordmark.png";
import bg from "@/assets/hero-mountains.jpg";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 15;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);
      }

      setProgress(Math.floor(value));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* 🔥 BACKGROUND IMAGE */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-white">

        {/* LOGO */}
        <img
          src={logo}
          alt="Jatra Logo"
          className="h-24 md:h-28 w-auto object-contain mb-6"
        />

        <p className="text-sm tracking-[0.4em] text-white/70 mb-8">
          KASAR FESTIVAL 2026
        </p>

        {/* PROGRESS BAR */}
        <div className="w-[260px] h-[6px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 via-green-400 to-red-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TEXT */}
        <p className="mt-6 text-sm tracking-widest text-yellow-400">
          LOADING UTTARAKHAND’S SPIRIT...
        </p>

        <p className="mt-2 text-xs text-white/60">
          {progress}%
        </p>

      </div>
    </div>
  );
};

export default Loader;