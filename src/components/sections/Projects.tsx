
import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  gradient: string;
}

const featuredProjects = [
  {
    title: "DharmaSetu",
    description: "An AI-powered legal assistant platform for civic governance with chatbot features, case outcome predictor, and dispute resolution advisor.",
    image: "Dharmasetu.webp",
    technologies: ["Next.js", "Flask", "MongoDB", "Langchain"],
    githubUrl: "https://github.com/Abhinavpapini/Dharmasetu",
    liveUrl: "https://dharmasetu.vercel.app/",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    title: "ShopSizzle",
    description: "Modern e-commerce platform with authentication, product catalog management, cart functionality, and comprehensive order tracking system.",
    image: "shopsizzle.webp",
    technologies: ["React", "TypeScript", "Clerk", "Tailwind CSS"],
    githubUrl: "https://github.com/Abhinavpapini/ShopSizzle",
    liveUrl: "https://shop-sizzle-ochre.vercel.app/",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "AI Career Coach",
    description: "Comprehensive career guidance platform with AI-powered resume building, mock interviews, and personalized career advice using Google Gemini AI.",
    image: "carrer.webp",
    technologies: ["Next.js 15", "PostgreSQL", "Gemini AI", "Clerk"],
    githubUrl: "https://github.com/Abhinavpapini/AI-Career-Coach",
    liveUrl: "https://ai-career-coach-brown-five.vercel.app/",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "FixU - Home Services Platform",
    description: "Professional home services platform connecting customers with service providers across India, featuring booking system, payments, and admin dashboard.",
    image: "fixu.webp",
    technologies: ["Next.js 15", "MongoDB", "Razorpay", "JWT"],
    githubUrl: "https://github.com/Abhinavpapini/FixU",
    liveUrl: "https://fix-u-drab.vercel.app/",
    gradient: "from-pink-500 to-red-500"
  },
  {
    title: "Background Removal App",
    description: "AI-powered background removal tool with user authentication, credit-based system, and Razorpay payment integration for seamless image processing.",
    image: "bgremoval.webp",
    technologies: ["React 19", "Node.js", "MongoDB", "Clipdrop API"],
    githubUrl: "https://github.com/Abhinavpapini/BG-Removal",
    liveUrl: "https://bg-removal-client-flame.vercel.app/",
    gradient: "from-red-500 to-orange-500"
  },
  {
    title: "AI Code Reviewer",
    description: "Intelligent code analysis tool powered by AI that provides comprehensive code reviews, optimization suggestions, and multi-language code conversion.",
    image: "coderev.webp",
    technologies: ["React 19", "Node.js", "Groq SDK", "PrismJS"],
    githubUrl: "https://github.com/Abhinavpapini/Code-Visualizer",
    liveUrl: "https://ai-code-reviewer-ruddy.vercel.app/",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    title: "Zyphra Voice AI",
    description: "Advanced virtual assistant with voice recognition, AI-powered responses, text-to-speech functionality, and seamless website navigation command system.",
    image: "zpyhra.webp",
    technologies: ["React", "Gemini AI", "Web Speech API", "Vite"],
    githubUrl: "https://github.com/Abhinavpapini/Zyphra-Voice-AI",
    liveUrl: "https://zyphra-voice-ai.vercel.app/",
    gradient: "from-yellow-500 to-green-500"
  },
  {
    title: "Gym Analytics App",
    description: "A comprehensive data-driven dashboard analyzing gym member activity patterns using CSV dataset with beautiful interactive data visualizations.",
    image: "Gym.webp",
    technologies: ["React", "Pandas", "Flask", "Chart.js"],
    githubUrl: "https://github.com/Abhinavpapini/gym-pulse",
    liveUrl: "https://gym-pulse-eight.vercel.app/",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Blogosphere",
    description: "A comprehensive multi-role blogging platform with secure authentication, advanced content management system, and intuitive Markdown editor.",
    image: "Blogsphere.webp",
    technologies: ["MongoDB", "React", "Node.js", "Express"],
    githubUrl: "https://github.com/Abhinavpapini/BlogSphere",
    liveUrl: "https://blog-sphere-hazel-eta.vercel.app/",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    title: "Soil Prediction System",
    description: "Machine learning-based crop recommendation system using KNN algorithm with intuitive Tkinter GUI, trained on 100k+ soil records.",
    image: "soil.webp",
    technologies: ["Python", "Scikit-learn", "Tkinter", "KNN"],
    githubUrl: "https://github.com/Abhinavpapini/SoilPred-main",
    liveUrl: "https://github.com/Abhinavpapini/SoilPred-main",
    gradient: "from-cyan-500 to-blue-500"
  }
];

const academicProjects = [
  {
    title: "Literovia 2025",
    description: "Premium literary festival website with integrated Razorpay payments, automated registration management, and 15+ literary events across 2 days.",
    image: "stent.webp",
    technologies: ["React", "TypeScript", "Razorpay", "Google Sheets"],
    githubUrl: "https://github.com/stentroverts/literovia",
    liveUrl: "https://www.literovia.com/",
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    title: "CSI VNRVJIET Official Website",
    description: "Official website for Computer Society of India VNRVJIET chapter featuring event showcases, member management, and comprehensive information portal.",
    image: "csiweb.webp",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    githubUrl: "https://github.com/shravani2905/VNRVJIET_CSI_WEB",
    liveUrl: "https://vnrvjietcsi.com/",
    gradient: "from-teal-400 to-cyan-500"
  },
  {
    title: "Ecficio Website",
    description: "Official website for the prestigious Ecficio entrepreneurship festival, featuring  event showcase, registration system, and interactive experience.",
    image: "Ecficio.webp",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Abhinavpapini/Ecficio",
    liveUrl: "https://ecficio-vj.vercel.app/",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    title: "FlashForte 2K25",
    description: "Interactive event page for FlashForte 2025 featuring modern design, event information, and engaging user experience with responsive layout.",
    image: "flash.webp",
    technologies: ["React", "JavaScript", "CSS", "Vercel"],
    githubUrl: "https://github.com/nagasresht/flashfirte-verse-explorer-53",
    liveUrl: "https://flashforte2k25.vercel.app/",
    gradient: "from-blue-400 to-purple-500"
  }
];




export default function Projects() {
  const renderProjectCard = (project: Project, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="glass rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 hover-glow transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-2 px-4 bg-gradient-to-r ${project.gradient} bg-opacity-20 hover:bg-opacity-30 text-center rounded-lg border border-current transition-all duration-300 text-sm font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 py-2 px-4 bg-gradient-to-r ${project.gradient} text-white text-center rounded-lg transition-all duration-300 text-sm font-medium hover-glow`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Featured Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuredProjects.map((project, index) => renderProjectCard(project, index))}
        </div>

        {/* Academic Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Academic Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            College projects showcasing technical skills and collaborative development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {academicProjects.map((project, index) => renderProjectCard(project, index))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">Want to see more of my work?</p>
          <motion.a
            href="https://github.com/Abhinavpapini"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium text-lg hover-glow transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
