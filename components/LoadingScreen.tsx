import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  text: string;
}

const LoadingScreen: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full"></div>
        <Loader2 className="w-16 h-16 text-cyan-600 dark:text-cyan-400 animate-spin relative z-10" />
      </div>
      <h2 className="mt-8 text-xl font-semibold text-slate-800 dark:text-slate-200">{text}</h2>
      <p className="mt-2 text-slate-500 text-sm">ConceptLens AI is analyzing context...</p>
    </div>
  );
};

export default LoadingScreen;