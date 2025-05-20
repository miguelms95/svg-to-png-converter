import React from 'react';
import { SlidersHorizontal as ArrowsHorizontal, FlipVertical as ArrowsVertical, ZoomIn } from 'lucide-react';

interface SizeAdjusterProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
}

const SizeAdjuster: React.FC<SizeAdjusterProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  quality,
  onQualityChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center">
            <ArrowsHorizontal className="h-4 w-4 mr-1" />
            Width (px)
          </label>
          <input
            type="number"
            min="1"
            max="5000"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center">
            <ArrowsVertical className="h-4 w-4 mr-1" />
            Height (px)
          </label>
          <input
            type="number"
            min="1"
            max="5000"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 flex items-center">
          <ZoomIn className="h-4 w-4 mr-1" />
          Quality ({Math.round(quality * 100)}%)
        </label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={quality}
          onChange={(e) => onQualityChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};

export default SizeAdjuster;