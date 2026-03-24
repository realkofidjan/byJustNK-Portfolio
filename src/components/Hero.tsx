import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Instagram, Mail, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen relative flex flex-col md:flex-row w-full">
      {/* Image Section (Now on the left on Desktop) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group order-1 md:order-1 border-b md:border-b-0 md:border-r border-black/10">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src="/profile.jpg"
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback just in case the user hasn't added the image yet
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/designer/800/1200";
          }}
        />
      </div>

      {/* Text Section (Now on the right on Desktop) */}
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 w-full md:w-1/2 min-h-[50vh] md:min-h-screen order-2 md:order-2">
        <div className="max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-sm uppercase tracking-widest text-black/40 mb-4">Just NK</p>
            <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tight mb-6 leading-[0.9]">
              Graphic Designer <br />
              <span className="text-black/40 italic font-serif">Visual Storyteller</span>
            </h1>

            <p className="text-xl md:text-2xl text-black/60 max-w-xl font-sans leading-relaxed mb-8">
              I create minimalistic, impactful visual identities and digital experiences.
              Focused on clarity, purpose, and the intersection of art and function.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex gap-4">
                <SocialLink href="https://www.instagram.com/by.justnk?igsh=MTQ5ZTA1ZXd1NHFxcw%3D%3D&utm_source=qr" icon={<Instagram size={20} />} label="Instagram" />
                <SocialLink href="https://github.com" icon={<Github size={20} />} label="GitHub" />
              </div>
              <div className="h-px w-12 bg-black/10 hidden md:block" />
              <a
                href="mailto:realkofidjan.public@gmail.com"
                className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-black/40 transition-colors"
              >
                <Mail size={16} />
                realkofidjan.public@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 right-6 md:right-12 lg:right-24 z-10 hidden md:block"
        >
          <div className="animate-bounce">
            <ArrowDown size={24} className="text-black/20" />
          </div>
        </motion.div>
      </div>
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
