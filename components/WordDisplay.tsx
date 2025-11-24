import React from 'react';

interface WordDisplayProps {
  word: string;
  isHidden: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ word, isHidden }) => {
  // If hidden, create a placeholder of 'O's matching the length, or fixed length
  // Using 'O' as requested.
  const maskedText = "O".repeat(word.length);

  return (
    <span
      className={`
        inline-block text-2xl md:text-4xl font-bold transition-all duration-500 ease-in-out px-1 py-1 rounded-md
        ${isHidden 
          ? 'text-sky-200 bg-sky-50 scale-95 select-none tracking-widest' 
          : 'text-slate-700 scale-100 tracking-normal'
        }
      `}
    >
      {isHidden ? maskedText : word}
    </span>
  );
};