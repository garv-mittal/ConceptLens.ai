import React, { useState } from 'react';
import { DOMAINS, HR_CATEGORIES } from '../constants';
import { ExperienceLevel, AppMode, RevisionMode, TimeConstraint } from '../types';
import { Sparkles, Zap, BookOpen, MessageSquare, Users, Clock, ChevronDown, Check, Box, Fingerprint } from 'lucide-react';

interface Props {
  mode: AppMode;
  onStart: (
    domain: string, 
    level: ExperienceLevel, 
    mode: AppMode, 
    revisionMode?: RevisionMode,
    timeConstraint?: TimeConstraint,
    focusArea?: string
  ) => void;
}

const SetupForm: React.FC<Props> = ({ mode, onStart }) => {
  // Common State
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [customDomain, setCustomDomain] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>(ExperienceLevel.Intermediate);
  
  // Revision Specific State
  const [revMode, setRevMode] = useState<RevisionMode>(RevisionMode.CONCEPTS);
  const [time, setTime] = useState<TimeConstraint>(TimeConstraint.MIN_30);
  const [hrCategory, setHrCategory] = useState(HR_CATEGORIES[0]);
  const [focusArea, setFocusArea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For HR mode, the "domain" argument acts as the Category
    const finalDomain = mode === AppMode.REVISION && revMode === RevisionMode.HR 
      ? hrCategory 
      : (domain === "Other" ? customDomain : domain);

    if (finalDomain) {
      onStart(finalDomain, level, mode, revMode, time, focusArea);
    }
  };

  const isRevision = mode === AppMode.REVISION;
  const isDiagnosis = mode === AppMode.DIAGNOSIS;

  // Visual Theme Configuration
  const themeColor = isDiagnosis ? 'cyan' : 'amber';
  const glowColor = isDiagnosis ? 'shadow-cyan-500/20' : 'shadow-amber-500/20';
  const borderColor = isDiagnosis ? 'border-cyan-500/30' : 'border-amber-500/30';

  return (
    <div className="max-w-xl mx-auto relative">
        
      {/* Decorative Blur behind card */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-${themeColor}-500/10 blur-[80px] rounded-full pointer-events-none`}></div>

      {/* Floating Abstract Tech Icons */}
      <div className="absolute -top-10 -right-12 text-slate-200 dark:text-slate-800 animate-float" style={{ animationDelay: '1s' }}>
        <Box className="w-32 h-32 opacity-20 rotate-12" />
      </div>
      <div className="absolute -bottom-5 -left-12 text-slate-200 dark:text-slate-800 animate-float" style={{ animationDelay: '2s' }}>
        <Fingerprint className="w-24 h-24 opacity-20 -rotate-12" />
      </div>

      <div className={`relative bg-white/80 dark:bg-[#1E293B]/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl animate-fade-in ${glowColor} overflow-hidden`}>
        
        {/* Header Section */}
        <div className="text-center mb-10 relative z-10">
           <div className="relative inline-block mb-6 group">
             <div className={`absolute inset-0 bg-${themeColor}-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
             <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 border ${borderColor} shadow-lg animate-float`}>
               {isDiagnosis ? (
                  <Sparkles className="w-10 h-10 text-cyan-500 dark:text-cyan-400" />
               ) : (
                  <Zap className="w-10 h-10 text-amber-500 dark:text-amber-400" />
               )}
             </div>
           </div>
           
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
             {isDiagnosis ? 'Skill Diagnosis' : 'Rapid Revision'}
           </h1>
           <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
             {isDiagnosis 
               ? 'Uncover hidden gaps in your mental models with AI-driven inquiry.'
               : 'Targeted preparation for your upcoming technical interview.'}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* --- REVISION MODE SELECTOR --- */}
          {isRevision && (
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Prep Mode</label>
               <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800/50">
                {[
                  { m: RevisionMode.CONCEPTS, icon: BookOpen, label: "Concepts" },
                  { m: RevisionMode.QUESTIONS, icon: MessageSquare, label: "Questions" },
                  { m: RevisionMode.HR, icon: Users, label: "HR / Soft" }
                ].map((item) => {
                  const isActive = revMode === item.m;
                  return (
                    <button
                      key={item.m}
                      type="button"
                      onClick={() => setRevMode(item.m)}
                      className={`relative flex flex-col items-center justify-center py-3 rounded-xl text-xs font-bold transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'text-amber-600 dark:text-amber-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-all duration-300"></div>
                      )}
                      <div className="relative z-10 flex flex-col items-center">
                        <item.icon className={`w-5 h-5 mb-1.5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                        {item.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* --- DOMAIN SELECTION --- */}
          {(!isRevision || revMode !== RevisionMode.HR) ? (
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Technical Domain</label>
              <div className="relative group">
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500/50 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all cursor-pointer font-medium"
                >
                  {DOMAINS.map(d => <option key={d} value={d} className="bg-white dark:bg-slate-800 py-2">{d}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-cyan-500 transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              
              {domain === "Other" && (
                <div className="mt-3 animate-scale-in">
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="e.g. Embedded Systems, Rust, etc."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
                    required
                  />
                </div>
              )}
            </div>
          ) : (
             /* --- HR CATEGORY SELECTION --- */
             <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">HR Category</label>
                <div className="relative group">
                  <select
                    value={hrCategory}
                    onChange={(e) => setHrCategory(e.target.value)}
                    className="w-full appearance-none bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all cursor-pointer font-medium"
                  >
                    {HR_CATEGORIES.map(c => <option key={c} value={c} className="bg-white dark:bg-slate-800">{c}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-amber-500 transition-colors">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
             </div>
          )}

          {/* --- LEVEL SELECTION --- */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">
              {isDiagnosis ? 'Current Proficiency' : 'Target Level'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(ExperienceLevel).map((lvl) => {
                 const isActive = level === lvl;
                 const activeClass = isDiagnosis 
                   ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 text-cyan-700 dark:text-cyan-400 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]' 
                   : 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-700 dark:text-amber-400 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]';
                 
                 return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`relative py-3 px-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      isActive
                        ? activeClass + ' border-2'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {lvl}
                    {isActive && <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${isDiagnosis ? 'bg-cyan-500' : 'bg-amber-500'}`}></div>}
                  </button>
                 );
              })}
            </div>
          </div>

          {/* --- REVISION EXTRAS (Time & Focus) --- */}
          {isRevision && (
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Time Limit</label>
                <div className="flex gap-3">
                  {Object.values(TimeConstraint).map((t) => {
                    const isActive = time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                          isActive
                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-500'
                            : 'bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <Clock className={`w-4 h-4 mb-1 ${isActive ? 'text-amber-500' : 'opacity-50'}`} />
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {revMode !== RevisionMode.HR && (
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Focus Area (Optional)</label>
                   <input
                     type="text"
                     value={focusArea}
                     onChange={(e) => setFocusArea(e.target.value)}
                     placeholder="e.g. Async/Await, Joins, Memory Mgmt..."
                     className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-colors"
                   />
                </div>
              )}
            </div>
          )}

          {/* --- SUBMIT BUTTON --- */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: isRevision ? '300ms' : '250ms' }}>
            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group ${
                isDiagnosis
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/20'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-900/20'
              }`}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
              
              <span className="relative z-20 flex items-center justify-center gap-2">
                {isDiagnosis ? (
                   <>Start Assessment <Sparkles className="w-5 h-5" /></>
                ) : (
                   <>Generate Notes <Zap className="w-5 h-5" /></>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupForm;