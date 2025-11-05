
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageGrid } from './components/ImageGrid';
import { FullScreenModal } from './components/FullScreenModal';
import { Spinner } from './components/Spinner';
import { generateWallpapers, generateRemixPrompt } from './services/geminiService';
import { AspectRatio } from './types';

function App() {
  const [prompt, setPrompt] = useState<string>('Rainy cyberpunk lo-fi');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemixing, setIsRemixing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const executeGeneration = useCallback(async (generationPrompt: string) => {
    if (!generationPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
        const generatedImages = await generateWallpapers(generationPrompt, aspectRatio);
        setImages(generatedImages);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error(e);
        setError(`Failed to generate images. ${errorMessage}`);
        setImages([]);
    } finally {
        setIsLoading(false);
        setIsRemixing(false);
    }
  }, [aspectRatio, isLoading]);

  const handleRemix = useCallback(async () => {
    if (!selectedImage || isLoading) return;

    setIsRemixing(true);
    const imageToRemix = selectedImage; // copy to avoid stale closure issue
    setSelectedImage(null); // Close modal
    
    try {
        // We use the prompt from the text field as context for the remix.
        const newPrompt = await generateRemixPrompt(prompt, imageToRemix);
        setPrompt(newPrompt); // Update the UI with the new prompt
        await executeGeneration(newPrompt);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error(e);
        setError(`Failed to remix images. ${errorMessage}`);
        setImages([]); // Clear images on remix failure
        setIsLoading(false); // Reset loading state
        setIsRemixing(false);
    }
  }, [selectedImage, prompt, isLoading, executeGeneration]);
  
  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = () => {
    if (!selectedImage) return;
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `${prompt.slice(0, 20).replace(/\s/g, '_')}_wallpaper.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-400 mb-6">
            Describe the vibe for your perfect phone wallpaper. The more descriptive, the better!
          </p>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onSubmit={() => executeGeneration(prompt)}
            isLoading={isLoading}
          />
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center my-16">
              <Spinner />
              <p className="mt-4 text-lg text-fuchsia-400 animate-pulse">
                {isRemixing ? 'Remixing your vibe...' : 'Generating your vibe...'}
              </p>
            </div>
          )}

          {error && (
            <div className="text-center my-8 p-4 bg-red-900/50 border border-red-500 rounded-lg">
              <p className="font-bold text-lg text-red-300">Image Generation Failed</p>
              <p className="text-red-400 mt-1">{error}</p>
              {error.includes("Quota exceeded") && (
                <div className="mt-4 text-sm text-gray-300 text-left bg-gray-800 p-4 rounded-md shadow-inner">
                  <p className="font-semibold text-white">This is likely due to API quota limits.</p>
                  <p className="mt-2">
                    This usually happens when billing is not enabled for the underlying Google Cloud project.
                  </p>
                  <div className="mt-3 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a 
                      href="https://ai.google.dev/gemini-api/docs/billing" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto text-center px-4 py-2 bg-fuchsia-600 text-white font-semibold rounded-lg hover:bg-fuchsia-500 transition-colors"
                    >
                      Learn about Billing
                    </a>
                    <a 
                      href="https://ai.dev/usage?tab=rate-limit" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto text-center px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Monitor Usage
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!isLoading && images.length > 0 && (
             <ImageGrid images={images} onImageClick={handleSelectImage} />
          )}

          {!isLoading && images.length === 0 && !error && (
            <div className="text-center my-16 text-gray-500">
                <p>Your generated wallpapers will appear here.</p>
            </div>
          )}

        </div>
      </main>
      
      {selectedImage && (
        <FullScreenModal
          imageUrl={selectedImage}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          onRemix={handleRemix}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
