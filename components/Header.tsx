
import React from 'react';
import { HelpIcon } from './icons/HelpIcon';

interface HeaderProps {
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="w-10"></div> {/* Spacer to help center the title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
            Robo AI - Wallpaper Generator
          </span>
        </h1>
        <button
          onClick={onOpenHelp}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Open help dialog"
        >
          <HelpIcon />
        </button>
      </div>
    </header>
  );
};
