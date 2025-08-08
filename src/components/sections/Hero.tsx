
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../ParticleBackground';

const typewriterTexts = [
  "Frontend Developer",
  "Freelancer",
  "UI/UX Enthusiast", 
  "Full-Stack Developer",
  "Video Editor",
  "Content Creator",
  "Open Source Contributor",
  "AI/ML Engineer"
];

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typeSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 800;

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      const targetText = typewriterTexts[currentTextIndex];
      if (currentText.length < targetText.length) {
        timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, eraseSpeed);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentTextIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Name badge */}
          <motion.div
            className="inline-block relative mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass rounded-2xl px-8 py-6 backdrop-blur-xl border border-cyan-500/20">
              <h1 className="text-5xl md:text-7xl font-greatVibes text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 font-bold">
                &lt;Papini Abhinav /&gt;
              </h1>
            </div>
            
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-70"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-70"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Typewriter animation */}
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-cyan-400">
              {currentText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting beautiful, responsive, and user-friendly digital experiences 
            with modern technologies and creative problem-solving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <motion.button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.a
              href="#contact"
              className="group inline-flex items-center px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 rounded-full font-medium text-lg hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
