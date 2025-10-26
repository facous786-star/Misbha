
import React from 'react';

interface ExamplePromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  'Bioluminescent forest at night',
  'A cat astronaut in a nebula',
  'Cyberpunk city alley in the rain',
  'Minimalist serene mountain landscape',
];

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onPromptClick }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">
        Or try an example
      </h4>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className="px-3 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 hover:text-white transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
