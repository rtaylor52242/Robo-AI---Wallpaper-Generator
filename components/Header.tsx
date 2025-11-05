import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
            Robo AI - Wallpaper Generator
          </span>
        </h1>
      </div>
    </header>
  );
};