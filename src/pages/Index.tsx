import { useRef } from "react";
import Navbar from "@/components/Navbar";
import PatternStrip from "@/components/PatternStrip";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Guests from "@/components/Guests";
import SponsorsDisplay from "@/components/SponsorsDisplay";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <PatternStrip />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Guests />
        <div id="sponsors" className="scroll-mt-[100px]">
          <SponsorsDisplay />
        </div>
      </main>
      <Footer />
      <div className="w-full">
        <PatternStrip isBottom />
      </div>
    </div>
  );
};

export default Index;
