
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/ThemeProvider';
import SignatureAnimation from '@/components/SignatureAnimation';
import Navigation from '@/components/Navigation';
import GoToTopButton from '@/components/GoToTopButton';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import CodingProfiles from '@/components/sections/CodingProfiles';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';

const Index = () => {
  const [showSignature, setShowSignature] = useState(true);
  const [showNavigation, setShowNavigation] = useState(false);

  const handleSignatureComplete = () => {
    console.log('Signature animation completed');
    setShowSignature(false);
    setTimeout(() => {
      setShowNavigation(true);
    }, 500);
  };

  // Fallback to show content after 5 seconds regardless
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback timer triggered');
      setShowSignature(false);
      setShowNavigation(true);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden cursor-none">
        <CustomCursor />
        
        <AnimatePresence mode="wait">
          {showSignature && (
            <SignatureAnimation key="signature" onComplete={handleSignatureComplete} />
          )}
        </AnimatePresence>
        
        <Navigation showLogo={showNavigation} />
        
        <main className={showSignature ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <CodingProfiles />
          <Achievements />
          <Contact />
        </main>
        
        <GoToTopButton />
      </div>
    </ThemeProvider>
  );
};

export default Index;
