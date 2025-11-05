
import React from 'react';
import { AspectRatio } from '../types';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onSubmit,
  isLoading,
}) => {
  const aspectRatios: AspectRatio[] = ["9:16", "16:9", "1:1", "4:3", "3:4"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'serene japanese garden at dawn'"
        className="w-full h-24 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 focus:outline-none transition-colors duration-200 resize-none"
        disabled={isLoading}
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
            <label htmlFor="aspect-ratio" className="absolute -top-2 left-3 px-1 text-xs text-gray-400 bg-gray-800">Aspect Ratio</label>
            <select
                id="aspect-ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 focus:outline-none transition-colors duration-200"
                disabled={isLoading}
            >
                {aspectRatios.map(ratio => (
                    <option key={ratio} value={ratio}>{ratio} {ratio === "9:16" && "(Phone)"}</option>
                ))}
            </select>
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto flex-1 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-fuchsia-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </form>
  );
};
