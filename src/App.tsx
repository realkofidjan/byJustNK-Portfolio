import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';

export default function App() {
  return (
    <main className="relative">
      <Hero />
      <ProjectGrid />
      
      <footer className="px-6 md:px-12 lg:px-24 py-20 border-t border-black/5 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-black/40">© 2026 Graphic Design Studio</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-mono uppercase tracking-widest hover:text-black/40 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-mono uppercase tracking-widest hover:text-black/40 transition-colors">Terms</a>
            <a href="mailto:hello@example.com" className="text-xs font-mono uppercase tracking-widest hover:text-black/40 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
