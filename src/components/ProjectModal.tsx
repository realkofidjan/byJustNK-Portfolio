import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getPDFNumPages, renderPDFPageToDataUrl } from '@/src/lib/pdf-utils';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

function PdfPageFrame({ pageNumber, pdf }: { pageNumber: number, pdf: any, key?: React.Key }) {
  const [dataUrl, setDataUrl] = useState<string>('');
  
  useEffect(() => {
    let active = true;
    renderPDFPageToDataUrl(pdf, pageNumber).then(res => {
      if (active && res) {
        setDataUrl(res.dataUrl);
      }
    });
    return () => { active = false; };
  }, [pdf, pageNumber]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative group w-full"
    >
      <div className="absolute -left-8 top-0 h-full flex flex-col items-center hidden lg:flex">
        <span className="text-[10px] font-mono text-black/20 rotate-90 origin-left mt-4">
          FRAME_{pageNumber.toString().padStart(2, '0')}
        </span>
        <div className="w-px flex-grow bg-black/5 mt-12" />
      </div>
      
      <div className="bg-white shadow-2xl shadow-black/5 border border-black/5 rounded-sm overflow-hidden min-h-[30vh] md:min-h-[60vh] flex items-center justify-center">
        {dataUrl ? (
          <img 
            src={dataUrl} 
            alt={`Page ${pageNumber}`}
            className="w-full h-auto"
          />
        ) : (
          <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin m-auto" />
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectModal({ isOpen, onClose, pdfUrl, title }: ProjectModalProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      setLoading(true);
      setPdfDoc(null);
      setNumPages(0);
      getPDFNumPages(pdfUrl).then(res => {
        if (res) {
          setPdfDoc(res.pdf);
          setNumPages(res.numPages);
        }
        setLoading(false);
      });
    }
  }, [isOpen, pdfUrl]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 z-10 bg-white/80 backdrop-blur-md border-b border-black/5">
            <h2 className="text-sm font-mono uppercase tracking-widest">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="w-full h-full pt-20 overflow-y-auto px-4 md:px-12 pb-20">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                <p className="font-mono text-xs uppercase tracking-widest text-black/40">Initializing PDF...</p>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-12 py-12">
                {pdfDoc && Array.from({ length: numPages }, (_, i) => (
                  <PdfPageFrame key={i + 1} pageNumber={i + 1} pdf={pdfDoc} />
                ))}
                
                {!pdfDoc && (
                   <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-xl">
                      <p className="text-black/40 font-serif italic text-xl">
                        Failed to load PDF.
                      </p>
                   </div>
                )}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center px-6 z-10 bg-white/80 backdrop-blur-md border-t border-black/5">
            <p className="text-[10px] font-mono text-black/40 uppercase tracking-widest">
              {numPages} Pages • End of Project
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
