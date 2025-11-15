
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl shadow-fuchsia-500/20 p-6 md:p-8 border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-fuchsia-500 transition-colors border-2 border-gray-700"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
            How It Works
          </span>
        </h2>
        
        <ol className="space-y-4 text-gray-300">
          <li className="flex items-start">
            <span className="text-fuchsia-400 font-bold text-xl mr-4">1.</span>
            <div>
              <h3 className="font-semibold text-white">Describe Your Vibe</h3>
              <p>In the text box, type a description of the wallpaper you want. Be creative! Think about colors, subjects, and styles. For example, "A neon-lit cyberpunk city in the rain" or "A peaceful, misty forest at sunrise".</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-fuchsia-400 font-bold text-xl mr-4">2.</span>
            <div>
              <h3 className="font-semibold text-white">Choose an Aspect Ratio</h3>
              <p>Select the best size for your device. "9:16" is perfect for most phones.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-fuchsia-400 font-bold text-xl mr-4">3.</span>
            <div>
              <h3 className="font-semibold text-white">Generate!</h3>
              <p>Hit the "Generate" button and watch the AI create four unique variations of your wallpaper concept.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-fuchsia-400 font-bold text-xl mr-4">4.</span>
            <div>
              <h3 className="font-semibold text-white">Preview, Download & Remix</h3>
              <p>Click on any image to see it fullscreen. From there, you can download it to your device or click "Remix" to generate a new set of images inspired by the one you selected.</p>
            </div>
          </li>
        </ol>

        <div className="text-center mt-8">
            <button
                onClick={onClose}
                className="px-6 py-2 bg-fuchsia-600 text-white font-semibold rounded-full hover:bg-fuchsia-500 transition-colors"
            >
                Got it!
            </button>
        </div>

      </div>
    </div>
  );
};
