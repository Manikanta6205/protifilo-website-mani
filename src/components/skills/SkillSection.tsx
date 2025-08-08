import React, { memo } from 'react';
import SkillChip from './SkillChip';

interface SkillSectionProps {
  title: string;
  skills: Array<{ name: string, icon: string }>;
  gradient: string;
  icon?: string;
}

const SkillSection = memo(({ title, skills, gradient, icon }: SkillSectionProps) => (
  <div className="skill-section">
    <div className="section-header">
      <div className="section-icon">{icon}</div>
      <h3 className="section-title" style={{ background: `linear-gradient(135deg, ${gradient})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {title}
      </h3>
    </div>
    <div className="skills-container">
      {skills.map((skill, index) => (
        <SkillChip 
          key={skill.name} 
          skill={skill} 
          index={index}
          gradient={gradient}
        />
      ))}
    </div>
  </div>
));

export default SkillSection;