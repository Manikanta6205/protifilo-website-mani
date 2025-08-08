import React, { useState, memo } from 'react';

interface SkillChipProps {
  skill: { name: string, icon: string };
  index: number;
  gradient: string;
}

const SkillChip = memo(({ skill, index, gradient }: SkillChipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="skill-chip"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        background: `linear-gradient(135deg, ${gradient})`
      }}
    >
      <span className="skill-icon">{skill.icon}</span>
      <span className="skill-name">{skill.name}</span>
      
      {isHovered && (
        <div className="skill-ripple"></div>
      )}
    </div>
  );
});

export default SkillChip;