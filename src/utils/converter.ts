export const convertSvgToPng = (
  svgDataUrl: string,
  width: number,
  height: number,
  quality: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas 2D context not available'));
      return;
    }
    
    // Set canvas size with quality factor
    canvas.width = width * quality;
    canvas.height = height * quality;
    
    // Apply scaling if quality is not 1
    if (quality !== 1) {
      ctx.scale(quality, quality);
    }
    
    // Create image from SVG
    const img = new Image();
    img.onload = () => {
      // Clear canvas and draw the image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to PNG'));
          }
        },
        'image/png'
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };
    
    img.src = svgDataUrl;
  });
};

// Helper function to get file size in human-readable format
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to detect if browser supports required APIs
export const checkBrowserSupport = (): { supported: boolean; message?: string } => {
  if (!window.FileReader) {
    return { supported: false, message: 'FileReader API not supported' };
  }
  
  if (!window.Blob) {
    return { supported: false, message: 'Blob API not supported' };
  }
  
  if (!document.createElement('canvas').getContext('2d')) {
    return { supported: false, message: 'Canvas API not supported' };
  }
  
  return { supported: true };
};