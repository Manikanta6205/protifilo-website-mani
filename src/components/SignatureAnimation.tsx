import React, { useState, useEffect } from 'react';

interface SignatureAnimationProps {
  onComplete: () => void;
}

export default function SignatureAnimation({ onComplete }: SignatureAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(-1);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const name = "Manikanta";
  const loadingTexts = [
    "Brewing digital magic...",
    "Crafting pixel perfection..."
  ]; 

  useEffect(() => {
    // Phase 0: Initial state with brackets together
    const timer1 = setTimeout(() => setCurrentPhase(1), 800); // Brackets move apart
    const timer2 = setTimeout(() => {
      setCurrentPhase(2); // Start name animation
      setCurrentLetter(0); // Start with first letter
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Letter animation effect
  useEffect(() => {
    if (currentPhase === 2 && currentLetter >= 0) {
      if (currentLetter < name.length - 1) {
        const timer = setTimeout(() => {
          setCurrentLetter(prev => prev + 1);
        }, 150);
        return () => clearTimeout(timer);
      } else {
        // All letters are shown, wait then move to loading phase
        const timer = setTimeout(() => {
          setCurrentPhase(3);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentPhase, currentLetter, name.length]);

  // Loading text rotation effect
  useEffect(() => {
    if (currentPhase === 3) {
      const textInterval = setInterval(() => {
        setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
      }, 1200);

      // Complete loading after showing all texts
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => {
        clearInterval(textInterval);
        clearTimeout(completeTimer);
      };
    }
  }, [currentPhase, loadingTexts.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden px-4">
      <div className="text-center relative w-full max-w-6xl">
        
        {/* Main Animation Container */}
        <div className={`relative flex items-center justify-center mb-8 w-full transition-all duration-1000 ease-out ${
          currentPhase === 3 ? 'transform -translate-y-12 scale-90' : ''
        }`}>
          
          {/* Left Bracket */}
          <div
            className={`text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] font-mono text-cyan-400 font-bold transition-all duration-1000 ease-out`}
            style={{
              textShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
              transform: currentPhase >= 1 ? 'translateX(-8rem)' : 'translateX(0)',
            }}
          >
            &lt;
          </div>
          
          {/* Name Container */}
          <div className="flex items-center justify-center absolute">
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cyan-400 whitespace-nowrap"
              style={{ 
                fontFamily: 'cursive',
                textShadow: '0 0 30px rgba(34, 211, 238, 0.8)',
              }}
            >
              {currentPhase >= 2 && (
                <span className="inline-flex">
                  {name.split('').map((letter, index) => (
                    <span
                      key={index}
                      className={`transition-all duration-300 ${
                        index <= currentLetter 
                          ? 'opacity-100 transform scale-100' 
                          : 'opacity-0 transform scale-50'
                      }`}
                      style={{
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
            className={`text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] font-mono text-cyan-400 font-bold transition-all duration-1000 ease-out`}
            style={{
              textShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
              transform: currentPhase >= 1 ? 'translateX(8rem)' : 'translateX(0)',
            }}
          >
            /&gt;
          </div>
        </div>
        
        {/* Loading Section */}
        {currentPhase === 3 && (
          <div className="flex flex-col items-center justify-center mt-12 animate-fade-in">
            {/* Loading Spinner */}
            <div className="relative mb-8">
              <div className="w-12 h-12 border-3 border-cyan-400/20 rounded-full animate-spin border-t-cyan-400 border-r-cyan-400"></div>
              <div className="absolute inset-0 w-12 h-12 border-3 border-cyan-400/10 rounded-full animate-ping"></div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center">
              <p className="text-lg text-cyan-400 font-medium">
                {loadingTexts[currentTextIndex]}
              </p>
            </div>
            
            {/* Progress dots */}
            <div className="flex space-x-2 mt-6">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentTextIndex ? 'bg-cyan-400' : 'bg-cyan-400/30'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}
        
      </div>
      
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}