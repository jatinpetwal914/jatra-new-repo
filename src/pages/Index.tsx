import { useRef } from "react";
import Navbar from "@/components/Navbar";
import PatternStrip from "@/components/PatternStrip";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Guests from "@/components/Guests";
import Register from "@/components/Register";
import Sponsor from "@/components/Sponsor";
import Footer from "@/components/Footer";

const Index = () => {
  const registerRef = useRef<HTMLDivElement | null>(null);

  const handleRegisterClick = () => {
    registerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50">
        <PatternStrip />
      </div>
      <Navbar />
      <main>
        <Hero onRegisterClick={handleRegisterClick} />
        <About />
        <Events />
        <Guests />
        <div ref={registerRef} id="register" className="scroll-mt-[100px]">
          <Register />
        </div>
        <div id="sponsors" className="scroll-mt-[100px]">
          <Sponsor />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
