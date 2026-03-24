import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getPDFThumbnail } from '@/src/lib/pdf-utils';
import ProjectModal from './ProjectModal';

interface Project {
  path: string;
  name: string;
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Use Vite's glob import to find all PDFs in the assets folder
    // Note: In a real environment, these would be in public/assets/projects/
    // For this demo, we'll look in /projects/ or similar
    const pdfFiles = (import.meta as any).glob('/public/projects/*.pdf');
    
    const projectList = Object.keys(pdfFiles).map(path => {
      // Extract filename without extension
      const name = path.split('/').pop()?.replace('.pdf', '') || 'Untitled Project';
      // Convert public path to accessible URL
      const url = path.replace('/public', '');
      return { path: url, name };
    });

    setProjects(projectList);
  }, []);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 bg-white" id="projects">
      <div className="mb-16">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-black/40 mb-4">Selected Works</h2>
        <div className="h-px w-full bg-black/5" />
      </div>

      {projects.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-xl">
          <p className="text-black/40 font-serif italic text-xl">
            No projects found. Add PDF files to <code className="bg-black/5 px-2 py-1 rounded text-sm not-italic">public/projects/</code> to showcase your work.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.path} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      <ProjectModal 
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        pdfUrl={selectedProject?.path || ''}
        title={selectedProject?.name || ''}
      />
    </section>
  );
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void; key?: string }) {
  const [thumbnail, setThumbnail] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPDFThumbnail(project.path).then(url => {
      setThumbnail(url);
      setLoading(false);
    });
  }, [project.path]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5 mb-6 rounded-sm border border-black/5">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
          </div>
        ) : (
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            src={thumbnail || 'https://picsum.photos/seed/placeholder/800/600'} 
            alt={project.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-sans font-medium tracking-tight group-hover:underline underline-offset-4 decoration-black/20 transition-all">
            {project.name}
          </h3>
          <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest mt-1">
            View Case Study
          </p>
        </div>
        <span className="text-[10px] font-mono text-black/20">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
