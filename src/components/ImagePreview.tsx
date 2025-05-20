import React from 'react';
import { X } from 'lucide-react';
import { SvgFile } from '../types/file';

interface ImagePreviewProps {
  files: SvgFile[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700 dark:text-gray-200">Preview</h3>
      
      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="relative group">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-square flex items-center justify-center p-4">
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={`Preview of ${file.name}`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No preview available</div>
              )}
            </div>
            
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 truncate">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;