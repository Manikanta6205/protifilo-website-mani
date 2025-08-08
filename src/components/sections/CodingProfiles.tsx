import React from 'react';
import { motion } from 'framer-motion';
import { Code, Award, BarChart } from "lucide-react";

const platformsData = [
  {
    name: "LeetCode",
    username: "pendelamanikanta",
    profileUrl: "https://leetcode.com/u/pendelamanikanta/",
    stats: [
      { label: "Problems Solved", value: "100+" },
      { label: "Contest Rating", value: "1600+" },
      { label: "Global Rank", value: "Top 10%" }
    ],
    badges: ["Dynamic Programming", "Graphs", "Binary Search"],
    color: "#FFA116",
    icon: <Code className="h-5 w-5" />
  },
  {
    name: "CodeChef",
    username: "pendelamanikanta",
    profileUrl: "https://www.codechef.com/users/pendelamanikanta",
    stats: [
      { label: "Max Rating", value: "1550+" },
      { label: "Division", value: "Div 2" },
      { label: "Global Rank", value: "Top 15%" }
    ],
    badges: ["3⭐ Coder", "DSA", "Algorithms"],
    color: "#5B4638",
    icon: <Award className="h-5 w-5" />
  },
  {
    name: "Codeforces",
    username: "manikantapendela",
    profileUrl: "https://codeforces.com/profile/manikantapendela",
    stats: [
      { label: "Max Rating", value: "1200+" },
      { label: "Rank", value: "Specialist" },
      { label: "Contests", value: "20+" }
    ],
    badges: ["Greedy", "Implementation", "Math"],
    color: "#1F8ACB",
    icon: <BarChart className="h-5 w-5" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function CodingProfiles() {
  return (
    <section id="coding-profiles" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Coding Profiles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My competitive programming journey across different platforms
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {platformsData.map((platform, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="h-full rounded-2xl glass backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover-glow overflow-hidden relative group">
                <div 
                  className="absolute top-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" 
                  style={{ backgroundColor: platform.color }}
                />
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-lg text-white">
                        {platform.icon}
                      </span>
                      {platform.name}
                    </h3>
                    <motion.a
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-sm text-cyan-400 hover:underline"
                    >
                      @{platform.username}
                    </motion.a>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {platform.stats.map((stat, statIndex) => (
                      <div 
                        key={statIndex} 
                        className="text-center p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-200"
                      >
                        <div className="font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {platform.badges.map((badge, badgeIndex) => (
                      <div key={badgeIndex} className="group/badge relative">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                          {badge}
                        </motion.div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover/badge:block z-50 bg-background/80 border border-cyan-500/30 rounded-lg p-2 text-sm whitespace-nowrap">
                          Skilled in {badge}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}