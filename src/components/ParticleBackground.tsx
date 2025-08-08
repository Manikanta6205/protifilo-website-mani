
import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'circle' | 'square' | 'triangle';
    }> = [];

    const createParticle = () => {
      const types: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
      };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 80; i++) {
        particles.push(createParticle());
      }
    };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'circle' | 'square' | 'triangle';
    };

    const drawParticle = (particle: Particle) => {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const color = isDark ? '6, 182, 212' : '59, 130, 246'; // cyan for dark, blue for light
      
      ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
      ctx.strokeStyle = `rgba(${color}, ${particle.opacity * 0.8})`;
      ctx.lineWidth = 1;

      switch (particle.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, particle.size, particle.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y - particle.size);
          ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
          ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
          ctx.closePath();
          ctx.fill();
          break;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawParticle(particle);

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              const color = isDark ? '6, 182, 212' : '59, 130, 246';
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(${color}, ${0.25 * (1 - distance / 120)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-40"
      style={{ zIndex: 1 }}
    />
  );
}
