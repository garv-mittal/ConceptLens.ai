
import React from 'react';
import { Home, Sparkles, Zap, Bug } from 'lucide-react';
import { AppStep, AppMode } from '../types';

interface Props {
  currentStep: AppStep;
  currentMode: AppMode;
  onNavigateHome: () => void;
  onNavigateMode: (mode: AppMode) => void;
}

const BottomNav: React.FC<Props> = ({ currentStep, currentMode, onNavigateHome, onNavigateMode }) => {
  const isHome = currentStep === AppStep.HOME;
  const isDiagnosis = !isHome && currentMode === AppMode.DIAGNOSIS;
  const isRevision = !isHome && currentMode === AppMode.REVISION;
  const isBugHunter = !isHome && currentMode === AppMode.BUG_HUNTER;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 pb-safe transition-colors">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        
        <button 
          onClick={onNavigateHome}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isHome ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <Home className={`w-6 h-6 ${isHome ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-medium uppercase tracking-wide">Home</span>
        </button>

        <button 
          onClick={() => onNavigateMode(AppMode.DIAGNOSIS)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isDiagnosis ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <Sparkles className={`w-6 h-6 ${isDiagnosis ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-medium uppercase tracking-wide">Diagnosis</span>
        </button>

        <button 
          onClick={() => onNavigateMode(AppMode.REVISION)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isRevision ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <Zap className={`w-6 h-6 ${isRevision ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-medium uppercase tracking-wide">Revision</span>
        </button>

        <button 
          onClick={() => onNavigateMode(AppMode.BUG_HUNTER)}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isBugHunter ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          <Bug className={`w-6 h-6 ${isBugHunter ? 'fill-current opacity-20' : ''}`} />
          <span className="text-[10px] font-medium uppercase tracking-wide">Hunter</span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;
