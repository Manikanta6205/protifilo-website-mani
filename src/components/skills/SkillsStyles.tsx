import React from 'react';

const SkillsStyles = () => {
  return (
    <style>{`
      .gradient-text {
        background: linear-gradient(135deg, #60a5fa, #a855f7, #ec4899);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% 200%;
        animation: gradientShift 4s ease-in-out infinite;
      }

      .sections-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        gap: 2.5rem;
        margin-bottom: 4rem;
      }

      .skills-sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3rem;
        margin-bottom: 4rem;
      }

      .skill-section {
        animation: fadeInScale 0.6s ease-out both;
        max-width: 1400px;
        width: 100%;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        width: 100%;
        justify-content: center;
      }

      .section-icon {
        font-size: 2.5rem;
        animation: bounce 2s infinite;
      }

      .section-title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }

      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1.2rem;
        justify-content: center;
        width: 100%;
        padding: 0 2rem;
      }

      .skill-chip {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.85rem 1.5rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        animation: slideInUp 0.5s ease-out both;
        text-align: center;
        min-width: fit-content;
      }

      .skill-chip:hover {
        transform: translateY(-3px) scale(1.05);
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.12);
        box-shadow: 
          0 10px 25px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .skill-chip::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
        transition: left 0.5s ease;
        pointer-events: none;
      }

      .skill-chip:hover::before {
        left: 100%;
      }

      .skill-icon {
        font-size: 1.25rem;
        transition: transform 0.3s ease;
        flex-shrink: 0;
      }

      .skill-chip:hover .skill-icon {
        transform: scale(1.2) rotate(10deg);
      }

      .skill-name {
        font-weight: 600;
        color: #f1f5f9;
        font-size: 0.95rem;
        white-space: nowrap;
        position: relative;
        z-index: 2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        letter-spacing: 0.02em;
      }

      .skill-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      }

      .education-card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .education-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(59, 130, 246, 0.15);
      }

      .glass {
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }

      .hover-glow:hover {
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.3);
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes gradientShift {
        0%, 100% { 
          background-position: 0% 50%;
        }
        25% { 
          background-position: 100% 50%;
        }
        50% { 
          background-position: 100% 100%;
        }
        75% { 
          background-position: 0% 100%;
        }
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
        60% { transform: translateY(-4px); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes ripple {
        0% {
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          width: 100px;
          height: 100px;
          opacity: 0;
        }
      }

      @media (max-width: 1024px) {
        .sections-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }

      @media (max-width: 768px) {
        .sections-grid {
          grid-template-columns: 1fr;
        }
        
        .education-display {
          flex-direction: column;
          text-align: center;
          gap: 1.5rem;
        }
        
        .skill-chip {
          font-size: 0.85rem;
          padding: 0.6rem 0.9rem;
        }
      }

      @media (max-width: 480px) {
        .sections-grid {
          grid-template-columns: 1fr;
        }
        
        .skills-container {
          gap: 0.5rem;
        }
        
        .skill-chip {
          padding: 0.5rem 0.8rem;
          font-size: 0.8rem;
        }
      }
    `}</style>
  );
};

export default SkillsStyles;