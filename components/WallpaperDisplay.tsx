
import React from 'react';
import { AspectRatio } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface WallpaperDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
  aspectRatio: AspectRatio;
  handleDownload: () => void;
}

const getAspectRatioClass = (aspectRatio: AspectRatio): string => {
  switch (aspectRatio) {
    case '1:1': return 'aspect-square';
    case '9:16': return 'aspect-[9/16]';
    case '16:9': return 'aspect-video';
    case '4:3': return 'aspect-[4/3]';
    case '3:4': return 'aspect-[3/4]';
    default: return 'aspect-video';
  }
};

export const WallpaperDisplay: React.FC<WallpaperDisplayProps> = ({
  isLoading,
  error,
  generatedImage,
  aspectRatio,
  handleDownload,
}) => {
  const aspectRatioClass = getAspectRatioClass(aspectRatio);

  return (
    <div className={`w-full max-w-2xl mx-auto rounded-lg border-2 border-dashed border-gray-700 bg-gray-900/50 flex items-center justify-center transition-all duration-300 ${aspectRatioClass}`}>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && !generatedImage && <InitialMessage />}
        {generatedImage && (
          <>
            <img
              src={generatedImage}
              alt="Generated wallpaper"
              className="object-contain w-full h-full rounded-md"
            />
            <button
              onClick={handleDownload}
              className="absolute bottom-4 right-4 bg-gray-900/70 text-white p-3 rounded-full hover:bg-cyan-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
              aria-label="Download wallpaper"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="text-center text-gray-400">
    <svg className="animate-spin mx-auto h-12 w-12 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg">Conjuring your masterpiece...</p>
    <p className="text-sm">This can take a few moments.</p>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center text-red-400 p-4">
    <h3 className="text-lg font-semibold">Oops! Something went wrong.</h3>
    <p>{message}</p>
  </div>
);

const InitialMessage: React.FC = () => (
  <div className="text-center text-gray-500">
    <h3 className="text-2xl font-semibold">Your vision awaits</h3>
    <p className="mt-2">Describe the wallpaper you want to create and see the magic happen.</p>
  </div>
);
