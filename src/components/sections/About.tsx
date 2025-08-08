
import React from 'react';
import { motion } from 'framer-motion';

const reflectiveAnswers = [
  {
    question: "Who I Am",
    answer: "A curious mind with a coder's brain and a designer’s eye — blending creativity, community, and clean code to make ideas come alive.",
    icon: "🧠",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    question: "What I Do", 
    answer: "Craft stunning web experiences, lead teams with vision, and build projects that fuse tech with storytelling — from hackathons to real-world impact.",
    icon: "🚀",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    question: "Why Me",
    answer: "Because I don't just build websites — I create experiences. With every pixel and line of code, I bring passion, leadership, and purpose to the table.",
    icon: "🔥",
    gradient: "from-purple-500 to-pink-500"
  }
];


export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                className="w-80 h-80 mx-auto relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl animate-pulse opacity-75" />
                <div className="absolute inset-2 bg-background rounded-3xl overflow-hidden">
                  <img
                    src="abhinav.webp"
                    alt="Papini Abhinav"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating code icon */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg"
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  &lt;/&gt;
                </motion.div>
              </motion.div>
            </div>

            {/* Bio content below image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Who am I?</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                I'm Abhinav — a developer, designer, storyteller, and tech community enthusiast from VNRVJIET. 
                I'm currently pursuing B.Tech in CSE (2023-2027), and I spend my days shaping digital experiences that are as visually striking as they are technically sound.
                </p>
                <p>
                  From leading college hackathons to crafting AI-powered platforms and community-driven designathons, I live for moments where innovation meets impact. 
                  I love turning blank screens into meaningful user journeys — backed by clean code, framer-motion flair, and just a dash of ✨ chaos.
                </p>
                <p className="text-sm text-muted-foreground/70 italic">
                  Tech stacks change, but creativity, curiosity, and consistency are my constants.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Reflective Questions Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {reflectiveAnswers.map((item, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl p-6 backdrop-blur-xl border border-white/10 hover-glow"
                whileHover={{ scale: 1.02, x: 10 }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className={`text-3xl p-3 rounded-xl bg-gradient-to-r ${item.gradient} bg-opacity-20 flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
