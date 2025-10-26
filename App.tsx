
import React, { useState, useCallback } from 'react';
import { generateWallpaper } from './services/geminiService';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { WallpaperDisplay } from './components/WallpaperDisplay';
import { AspectRatio } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageDataUrl = await generateWallpaper(prompt, aspectRatio);
      setGeneratedImage(imageDataUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to generate wallpaper. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);
  
  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    // Sanitize prompt for filename
    const filename = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${aspectRatio}.jpeg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [generatedImage, prompt, aspectRatio]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            handleGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-2/3 flex-grow flex items-center justify-center">
          <WallpaperDisplay
            isLoading={isLoading}
            error={error}
            generatedImage={generatedImage}
            aspectRatio={aspectRatio}
            handleDownload={handleDownload}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
