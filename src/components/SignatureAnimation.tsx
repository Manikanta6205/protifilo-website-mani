import React, { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

interface SignatureAnimationProps {
  onComplete: () => void;
}

export default function SignatureAnimation({ onComplete }: SignatureAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const name = "Abhinav";
  const loadingTexts = [
    "Collecting pixels of brilliance…",
    "Polishing portfolio… please hold your applause!"
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentPhase(1), 800); // Brackets move apart
    const timer2 = setTimeout(() => setCurrentPhase(2), 1500); // Start name animation
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Separate effect for letter animation
  useEffect(() => {
    if (currentPhase === 2) {
      const interval = setInterval(() => {
        setCurrentLetter(prev => {
          if (prev >= name.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentPhase(3); // Move up and show loading
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [currentPhase, name.length, onComplete]);

  // Loading text rotation effect
  useEffect(() => {
    if (currentPhase === 3) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
      }, 2000);

      // Complete loading after 4 seconds
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => {
        clearInterval(textInterval);
        clearTimeout(completeTimer);
      };
    }
  }, [currentPhase, loadingTexts.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden px-4">
      <CustomCursor />
      <div className="text-center relative w-full max-w-4xl">
        
        {/* Brackets Animation */}
        <div className={`relative h-48 sm:h-56 md:h-64 flex items-center justify-center mb-8 w-full transition-all duration-1000 ease-out ${
          currentPhase === 3 ? 'transform -translate-y-20' : ''
        }`}>
          {/* Left Bracket */}
          <div
            className={`text-8xl sm:text-9xl md:text-[8rem] font-mono text-cyan-400 font-bold transition-all duration-1000 ease-out ${
              currentPhase >= 1 ? 'transform -translate-x-28 sm:-translate-x-34 md:-translate-x-40' : 'transform translate-x-0'
            }`}
            style={{
              textShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
            }}
          >
            &lt;
          </div>
          
          {/* Name Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-7xl sm:text-8xl md:text-[7rem] text-cyan-400 whitespace-nowrap mx-2" style={{ fontFamily: 'cursive' }}>
              {currentPhase >= 2 && (
                <span className="inline-flex">
                  {name.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`transition-all duration-300 ${
                        index <= currentLetter ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-50'
                      }`}
                      style={{
                        textShadow: '0 0 30px rgba(34, 211, 238, 0.8)',
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
          
          {/* Right Bracket with Forward Slash */}
          <div
            className={`text-8xl sm:text-9xl md:text-[8rem] font-mono text-cyan-400 font-bold transition-all duration-1000 ease-out ${
              currentPhase >= 1 ? 'transform translate-x-44 sm:translate-x-52 md:translate-x-60' : 'transform translate-x-0'
            }`}
            style={{
              textShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
            }}
          >
            /&gt;
          </div>
        </div>
        
        {/* Loading Circle - appears below the letters */}
        {currentPhase === 3 && (
          <div className="flex flex-col items-center justify-center mt-8 animate-fade-in">
            {/* Loading Circle */}
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-cyan-400/30 rounded-full animate-spin border-t-cyan-400"></div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center">
              <p className="text-lg text-cyan-400 font-medium transition-all duration-500 ease-in-out">
                {loadingTexts[currentTextIndex]}
              </p>
            </div>
          </div>
        )}
        
      </div>
      
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
