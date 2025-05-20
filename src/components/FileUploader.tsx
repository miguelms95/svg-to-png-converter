import React, { useCallback, useState } from 'react';
import { UploadCloud, FileImage } from 'lucide-react';
import { SvgFile } from '../types/file';

interface FileUploaderProps {
  onFileChange: (files: SvgFile[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = useCallback((file: File) => {
    return new Promise<SvgFile>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: result,
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;

    const files = Array.from(fileList).filter(file => 
      file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')
    );

    if (files.length === 0) {
      alert('Please select valid SVG files.');
      return;
    }

    const svgFiles = await Promise.all(files.map(handleFileRead));
    onFileChange(svgFiles);
  }, [handleFileRead, onFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".svg,image/svg+xml"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center py-6"
      >
        <div className="mb-4 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400">
          <UploadCloud className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          Drop your SVG files here
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          or click to browse your files
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FileImage className="h-4 w-4" />
          <span>Accepted format: SVG</span>
        </div>
      </label>
    </div>
  );
};

export default FileUploader;