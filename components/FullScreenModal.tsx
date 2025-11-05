
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { RemixIcon } from './icons/RemixIcon';

interface FullScreenModalProps {
  imageUrl: string;
  onClose: () => void;
  onDownload: () => void;
  onRemix: () => void;
  isLoading: boolean;
}

export const FullScreenModal: React.FC<FullScreenModalProps> = ({
  imageUrl,
  onClose,
  onDownload,
  onRemix,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="relative w-full h-full max-w-md max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageUrl}
          alt="Selected wallpaper"
          className="w-full h-full object-contain rounded-lg shadow-2xl shadow-fuchsia-500/20"
        />

        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-fuchsia-500 transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-4 rounded-b-lg">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-full hover:bg-white transition-colors"
          >
            <DownloadIcon />
            Download
          </button>
          <button
            onClick={onRemix}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 text-white font-semibold rounded-full hover:bg-fuchsia-500 transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            <RemixIcon />
            {isLoading ? 'Remixing...' : 'Remix'}
          </button>
        </div>
      </div>
    </div>
  );
};
