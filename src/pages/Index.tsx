
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
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
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden cursor-none">
        <CustomCursor />
        
        <Navigation showLogo={true} />
        
        <main>
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
