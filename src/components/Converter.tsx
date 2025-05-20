import React, { useState, useRef } from 'react';
import { Upload, Settings, Download, RefreshCw, Trash2, Lock, Unlock } from 'lucide-react';
import FileUploader from './FileUploader';
import SizeAdjuster from './SizeAdjuster';
import ImagePreview from './ImagePreview';
import { convertSvgToPng } from '../utils/converter';
import { SvgFile } from '../types/file';

const Converter: React.FC = () => {
  const [svgFiles, setSvgFiles] = useState<SvgFile[]>([]);
  const [converting, setConverting] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [quality, setQuality] = useState<number>(1);
  const originalAspectRatio = useRef<number>(1);

  const handleFileChange = (files: SvgFile[]) => {
    if (files.length > 0) {
      setSvgFiles(files);
      // Update aspect ratio with the first file
      if (files[0].preview) {
        const img = new Image();
        img.onload = () => {
          const ratio = img.width / img.height;
          originalAspectRatio.current = ratio;
          setWidth(Math.round(300 * ratio));
          setHeight(300);
        };
        img.src = files[0].preview;
      }
    }
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspectRatio) {
      setHeight(Math.round(newWidth / originalAspectRatio.current));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspectRatio) {
      setWidth(Math.round(newHeight * originalAspectRatio.current));
    }
  };

  const handleConvertAndDownload = async () => {
    if (svgFiles.length === 0) return;
    
    setConverting(true);
    
    try {
      for (const file of svgFiles) {
        if (!file.preview) continue;
        
        const pngBlob = await convertSvgToPng(file.preview, width, height, quality);
        
        // Create download link
        const url = URL.createObjectURL(pngBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.replace(/\.svg$/, '') + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error converting SVG to PNG:', error);
    } finally {
      setConverting(false);
    }
  };

  const handleReset = () => {
    setSvgFiles([]);
    setWidth(300);
    setHeight(300);
    setQuality(1);
    originalAspectRatio.current = 1;
  };

  const toggleAspectRatio = () => {
    setLockAspectRatio(!lockAspectRatio);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Convert SVG to PNG
          </h2>
          
          {svgFiles.length === 0 ? (
            <FileUploader onFileChange={handleFileChange} />
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <ImagePreview 
                    files={svgFiles} 
                    onRemove={(index) => {
                      setSvgFiles(prev => prev.filter((_, i) => i !== index));
                      if (svgFiles.length === 1) handleReset();
                    }} 
                  />
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Output Settings
                      </h3>
                      <button
                        onClick={toggleAspectRatio}
                        className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                      >
                        {lockAspectRatio ? (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Locked</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Unlocked</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <SizeAdjuster
                      width={width}
                      height={height}
                      onWidthChange={handleWidthChange}
                      onHeightChange={handleHeightChange}
                      quality={quality}
                      onQualityChange={setQuality}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleConvertAndDownload}
                      disabled={converting}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-indigo-400"
                    >
                      {converting ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Download PNG
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="flex-none sm:flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How to use</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Upload your SVG file by dragging and dropping or clicking the upload area</li>
          <li>Adjust the output dimensions and quality settings as needed</li>
          <li>Click the "Download PNG" button to convert and download your file</li>
          <li>Use the "Reset" button to start over with a new SVG file</li>
        </ol>
      </div>
    </div>
  );
};

export default Converter;