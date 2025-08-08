import React from 'react';
import { motion } from 'framer-motion';
import SkillSection from '../skills/SkillSection';
import Education from '../skills/Education';
import SkillsStyles from '../skills/SkillsStyles';
import { 
  programmingLanguages, 
  frameworks, 
  aiMlTech, 
  tools, 
  design 
} from '../skills/skillsData';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technical Arsenal</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of technologies I use to craft exceptional digital experiences
          </p>
        </motion.div>

        <div className="skills-sections">
          {/* Programming Languages */}
          <SkillSection 
            title="Programming Languages"
            skills={programmingLanguages}
            gradient="#3b82f6, #9333ea"
            icon="💻"
          />
          
          {/* Frameworks */}
          <SkillSection 
            title="Frameworks & Libraries"
            skills={frameworks}
            gradient="#9333ea, #ec4899"
            icon="🚀"
          />
          
          {/* AI & ML Section */}
          <SkillSection 
            title="AI & ML Technologies"
            skills={aiMlTech}
            gradient="#10b981, #06b6d4"
            icon="🤖"
          />
          
          {/* Tools */}
          <SkillSection 
            title="Tools & Platforms"
            skills={tools}
            gradient="#f97316, #ef4444"
            icon="🛠️"
          />
          
          {/* Design Section */}
          <SkillSection 
            title="Design & Multimedia"
            skills={design}
            gradient="#ec4899, #f43f5e"
            icon="🎨"
          />
        </div>

        {/* Education Section */}
        <Education />
      </div>

      <SkillsStyles />
    </section>
  );
}
