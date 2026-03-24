import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Instagram, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-500 border border-black/10">
            <img 
              src="https://picsum.photos/seed/designer/400/400" 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tight mb-6 leading-[0.9]">
            Graphic Designer <br />
            <span className="text-black/40 italic font-serif">Visual Storyteller</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black/60 max-w-2xl font-sans leading-relaxed mb-8">
            I create minimalistic, impactful visual identities and digital experiences. 
            Focused on clarity, purpose, and the intersection of art and function.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex gap-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="https://github.com" icon={<Github size={20} />} label="GitHub" />
            </div>
            <div className="h-px w-12 bg-black/10 hidden md:block" />
            <a 
              href="mailto:hello@example.com" 
              className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-black/40 transition-colors"
            >
              <Mail size={16} />
              hello@example.com
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-auto flex justify-center pb-10"
      >
        <div className="animate-bounce">
          <ArrowDown size={24} className="text-black/20" />
        </div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
