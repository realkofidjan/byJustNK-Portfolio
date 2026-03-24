import * as pdfjsLib from 'pdfjs-dist';

// Use a direct path to the worker file copied to the public folder
// This prevents Vite/Rollup from minifying the worker and breaking it in production
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

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

export async function getPDFNumPages(url: string): Promise<{ pdf: any, numPages: number } | null> {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    return { pdf, numPages: pdf.numPages };
  } catch (error) {
    console.error('Error getting PDF doc:', error);
    return null;
  }
}

export async function renderPDFPageToDataUrl(pdf: any, pageNumber: number): Promise<{ dataUrl: string, width: number, height: number } | null> {
  try {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) return null;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await (page as any).render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    return {
      dataUrl: canvas.toDataURL('image/jpeg', 0.9),
      width: viewport.width,
      height: viewport.height
    };
  } catch (error) {
    console.error(`Error rendering page ${pageNumber}:`, error);
    return null;
  }
}

export async function getPDFPages(url: string): Promise<PDFPageData[]> {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const pages: PDFPageData[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const pageResult = await renderPDFPageToDataUrl(pdf, i);
      if (pageResult) {
        pages.push({
          pageNumber: i,
          dataUrl: pageResult.dataUrl,
          width: pageResult.width,
          height: pageResult.height
        });
      }
    }
    
    return pages;
  } catch (error) {
    console.error('Error extracting PDF pages:', error);
    return [];
  }
}
