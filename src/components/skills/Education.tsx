import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20"
    >
      <h3 className="text-3xl font-semibold text-center mb-12 gradient-text">
        Education
      </h3>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover-glow"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <motion.div
              className="text-6xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <div className="text-center md:text-left flex-1">
              <h4 className="text-2xl font-semibold mb-2 gradient-text">
                Bachelor of Technology in Computer Science Engineering
              </h4>
              <p className="text-lg text-cyan-400 mb-2">
                VNR VJIET (Vignana Jyothi Institute of Engineering and Technology)
              </p>
              <p className="text-muted-foreground mb-4">
                2023 - 2027
              </p>
              <motion.div
                className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full border border-cyan-500/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold">CGPA: 9.5</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Education;