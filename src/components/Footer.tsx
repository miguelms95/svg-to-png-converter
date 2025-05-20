import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
            SVG to PNG Converter | Client-side conversion - your files never leave your browser
          </div>
          
          <div className="flex items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mr-4"
              aria-label="GitHub repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by <a href="https://miguelms.es" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">miguelms.es</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;