import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'Vivitsu 2025 - GRIET National Hackathon',
    award: '2nd Prize Winner',
    description:
      'Won 2nd place in the national-level hackathon organized by GRIET as part of Vivitsu 2025 for developing "DharmaSetu", an AI-powered legal assistant platform under the domain of Legal Awareness and Civic Governance.',
    date: 'March 2025',
    icon: '🥈',
    gradient: 'from-purple-500 to-pink-500',
    fileLink: '/vivtsu.pdf',
  },
  {
    title: 'ICCMA 2025 - NIT Silchar',
    award: 'Research Paper Presentation',
    description:
      'Presented "Efficient Decision-Making: Deep Q-Networks for Reinforcement Learning" at the International Conference on Computational Mathematics and Applications (ICCMA 2025), organized by the Department of Mathematics, NIT Silchar.',
    date: 'Jan 2025',
    icon: '📘',
    gradient: 'from-cyan-500 to-blue-500',
    fileLink: '/nit.pdf',
  },
  {
    title: 'TechnoVista 2024 - 24Hr Hackathon',
    award: 'Finalist',
    description:
      'Selected as a finalist in the 24-hour hackathon conducted as part of the DS-CyS Carnival "TechnoVista 2024" hosted by VNRVJIET, showcasing problem-solving under pressure and teamwork in real-time development.',
    date: 'June 2024',
    icon: '⏱️',
    gradient: 'from-yellow-500 to-pink-500',
    fileLink: '/technovista.pdf',
  },
  {
    title: 'Swecha Summer Program',
    award: 'Cohort 1 Participant',
    description:
      'Completed Swecha’s Summer Program (SOAIC1) as part of Cohort 1, focusing on free and open-source software contributions, community-driven development, and collaborative tech leadership.',
    date: 'May 2024',
    icon: '🌱',
    gradient: 'from-green-400 to-emerald-500',
    fileLink: '/swecha.pdf',
  },
  {
    title: 'NPTEL - Joy of Computing using Python',
    award: 'Elite Certification',
    description:
      'Successfully completed a 12-week NPTEL course titled "The Joy of Computing using Python" with a final score of 77/100, covering foundational concepts in programming and problem-solving through Python.',
    date: 'April 2024',
    icon: '🐍',
    gradient: 'from-green-400 to-blue-500',
    fileLink: '/python.pdf',
  },
  {
    title: 'Internshala Tableau Course',
    award: 'Certificate of Completion',
    description:
      'Completed a 6-week certified training program on Tableau offered by Internshala, gaining hands-on experience in creating dashboards, visual analytics, filters, sets, and data preparation techniques.',
    date: 'April 2024',
    icon: '📊',
    gradient: 'from-blue-400 to-cyan-500',
    fileLink: '/tableau.pdf',
  }
];


export default function Achievements() {
	const [visibleCards, setVisibleCards] = useState(new Set());
	const [hoveredCard, setHoveredCard] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			achievements.forEach((_, index) => {
				setTimeout(() => {
					setVisibleCards(prev => new Set([...prev, index]));
				}, index * 150);
			});
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="gradient-text">Achievements</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Milestones and recognitions that mark my journey
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{achievements.map((achievement, index) => (
						<div
							key={index}
							className={`group relative transform transition-all duration-700 ${
								visibleCards.has(index) 
									? 'opacity-100 translate-y-0 scale-100' 
									: 'opacity-0 translate-y-12 scale-95'
							} ${
								hoveredCard === index ? '-translate-y-3 scale-105' : ''
							}`}
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div className="glass rounded-xl p-6 backdrop-blur-xl border border-white/10 hover-glow transition-all duration-300 h-full relative overflow-hidden">
								{/* Hover glow effect */}
								<div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
								
								<div className="text-center mb-4 relative z-10">
									<div
										className={`text-5xl mb-4 inline-block p-4 rounded-xl bg-gradient-to-r ${achievement.gradient} bg-opacity-20 transform transition-all duration-300 ${
											hoveredCard === index ? 'scale-110 rotate-12' : ''
										}`}
									>
										{achievement.icon}
									</div>
								</div>

								<div className="text-center relative z-10">
									<h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-cyan-400 transition-colors duration-300">
										{achievement.title}
									</h3>
									<a
										href={achievement.fileLink}
										target="_blank"
										rel="noopener noreferrer"
										className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${achievement.gradient} text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg mb-3`}
									>
										View Certificate
									</a>
									<p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
										{achievement.description}
									</p>
									<div className="flex flex-col items-center justify-center gap-3">
										<span
											className={`text-xs font-semibold bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}
										>
											{achievement.date}
										</span>
									</div>
								</div>

								{/* Animated border */}
								<div 
									className={`absolute inset-0 rounded-xl bg-gradient-to-r ${achievement.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} 
									style={{ 
										background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
										backgroundSize: '200% 200%',
										animation: hoveredCard === index ? 'shimmer 2s ease-in-out infinite' : 'none'
									}} 
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			<style dangerouslySetInnerHTML={{
				__html: `
					@keyframes shimmer {
						0% { background-position: -200% -200%; }
						50% { background-position: 200% 200%; }
						100% { background-position: -200% -200%; }
					}
				`
			}} />
		</section>
	);
}
