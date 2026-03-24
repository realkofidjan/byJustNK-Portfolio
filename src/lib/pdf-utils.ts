import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for pdfjs
// Using a CDN version that matches the installed version is often more reliable in these environments
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFPageData {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

export async function getPDFThumbnail(url: string): Promise<string> {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    
    const viewport = page.getViewport({ scale: 0.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) throw new Error('Could not get canvas context');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await (page as any).render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return '';
  }
}

export async function getPDFPages(url: string): Promise<PDFPageData[]> {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const pages: PDFPageData[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) continue;
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await (page as any).render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      pages.push({
        pageNumber: i,
        dataUrl: canvas.toDataURL('image/jpeg', 0.9),
        width: viewport.width,
        height: viewport.height
      });
    }
    
    return pages;
  } catch (error) {
    console.error('Error extracting PDF pages:', error);
    return [];
  }
}
