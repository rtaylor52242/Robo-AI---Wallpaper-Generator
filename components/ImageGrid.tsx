
import React from 'react';

interface ImageGridProps {
  images: string[];
  onImageClick: (imageUrl: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-fade-in">
      {images.map((imgSrc, index) => (
        <div
          key={index}
          className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden cursor-pointer group relative transition-transform duration-300 ease-in-out transform hover:scale-105"
          onClick={() => onImageClick(imgSrc)}
        >
          <img
            src={imgSrc}
            alt={`Generated wallpaper ${index + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View</p>
          </div>
        </div>
      ))}
    </div>
  );
};
