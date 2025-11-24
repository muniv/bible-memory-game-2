import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-200">
      <div
        className="h-full bg-gradient-to-r from-sky-300 to-sky-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};