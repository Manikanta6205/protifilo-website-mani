import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Update social links to include correct icons
const socialLinks = [
	{
		name: 'GitHub',
		url: 'https://github.com/Manikanta6205',
		icon: '🐙',
		gradient: 'from-gray-400 to-gray-600',
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/pendela-manikanta/',
		icon: '💼',
		gradient: 'from-blue-500 to-blue-700',
	},
	{
		name: 'Email: pendelamanikanta@gmail.com',
		url: 'mailto:pendelamanikanta@gmail.com',
		icon: '📧',
		gradient: 'from-red-400 to-pink-500',
	},
	{
		name: 'Phone: 9640729920',
		url: 'tel:+919640729920',
		icon: '📱',
		gradient: 'from-green-400 to-green-600',
	},
];

export default function Contact() {
	const { toast } = useToast();

	const downloadResume = () => {
		// Create a link to download the resume
		const link = document.createElement('a');
		link.href = '/Pendela Manikanta.pdf';
		link.download = 'Pendela Manikanta.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast({
			title: 'Resume download started!',
			description: 'The resume is being downloaded to your device.',
		});
	};

	return (
		<section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						<span className="gradient-text">Contact Me</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Let&apos;s connect and collaborate on amazing projects
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Info & Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="glass rounded-xl p-8 backdrop-blur-xl border border-white/10"
					>
						<h3 className="text-2xl font-semibold mb-6 gradient-text">
							My Contact Information
						</h3>

						<div className="space-y-4 mb-8">
							{/* Social Links */}
							<div className="space-y-3">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.name}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										whileHover={{ scale: 1.05, x: 5 }}
										whileTap={{ scale: 0.95 }}
										className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${social.gradient} bg-opacity-20 hover:bg-opacity-30 rounded-lg border border-current/30 hover:border-current/50 transition-all duration-300 group`}
									>
										<span className="text-lg">{social.icon}</span>
										<span className="font-medium group-hover:text-white transition-colors">
											{social.name}
										</span>
										<div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
											→
										</div>
									</motion.a>
								))}
							</div>
						</div>
					</motion.div>

					{/* Resume Download */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="glass rounded-xl p-8 backdrop-blur-xl border border-white/10 flex flex-col"
					>
						<h3 className="text-2xl font-semibold mb-6 gradient-text">
							Resume
						</h3>
						<p className="text-muted-foreground mb-8 flex-grow">
							Download my resume to learn more about my experience, skills, and
							educational background.
						</p>
						
						<motion.button
							onClick={downloadResume}
							className="py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover-glow text-lg"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							📄 Download Resume
						</motion.button>
					</motion.div>
				</div>

				{/* Footer */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="mt-20 text-center border-t border-border/50 pt-8"
				>
					<p className="text-muted-foreground">
						© 2024 Pendela Manikanta. Built with ❤️ using React, TypeScript, and Tailwind
						CSS.
					</p>
					<motion.div className="mt-4" whileHover={{ scale: 1.05 }}>
						<span className="text-2xl font-greatVibes gradient-text font-bold">
							&lt;Pendela Manikanta /&gt;
						</span>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
