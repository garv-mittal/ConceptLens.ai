
import React, { useState } from 'react';
import { BugChallenge, BugAnalysisResult } from '../types';
import { 
  Bug, Terminal, Play, AlertTriangle, CheckCircle2, 
  XCircle, RefreshCw, BookOpen, Layers,
  Maximize2, MoreHorizontal, Copy
} from 'lucide-react';

interface Props {
  challenge: BugChallenge;
  result: BugAnalysisResult | null;
  onAnalyze: (userSolution: string) => void;
  onReset: () => void;
  isAnalyzing: boolean;
}

// --- SYNTAX HIGHLIGHTER COMPONENT ---
// A lightweight tokenizer to make code look like code without heavy libraries
const SyntaxHighlighter = ({ code }: { code: string }) => {
  const keywords = new Set(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'while', 'for', 'async', 'await', 'import', 'from', 'export', 'class', 'interface', 'type', 'new', 'try', 'catch', 'throw', 'switch', 'case', 'break', 'continue', 'default', 'extends', 'implements', 'public', 'private', 'protected', 'static']);
  const builtins = new Set(['console', 'Math', 'JSON', 'Promise', 'Array', 'Object', 'document', 'window', 'localStorage', 'setTimeout', 'setInterval', 'map', 'filter', 'reduce', 'forEach', 'push', 'pop', 'length', 'toString']);

  return (
    <>
      {code.split('\n').map((line, i) => (
        <div key={i} className="table-row">
          <span className="table-cell text-right select-none text-slate-600 dark:text-slate-600 pr-4 w-8 border-r border-slate-700/30 dark:border-slate-700/50 mr-4 bg-slate-100 dark:bg-slate-800/50">{i + 1}</span>
          <span className="table-cell pl-4 whitespace-pre font-mono text-sm leading-6">
            {line.split(/(\/\/.*$|'.*?'|".*?"|`.*?`|\b\w+\b|[(){}[\].,;])/g).map((token, j) => {
              if (!token) return null;
              if (token.startsWith('//')) return <span key={j} className="text-slate-400 italic">{token}</span>;
              if (/^['"`]/.test(token)) return <span key={j} className="text-green-600 dark:text-green-400">{token}</span>;
              if (keywords.has(token)) return <span key={j} className="text-purple-600 dark:text-purple-400 font-semibold">{token}</span>;
              if (builtins.has(token)) return <span key={j} className="text-yellow-600 dark:text-yellow-300">{token}</span>;
              if (/^[A-Z]/.test(token)) return <span key={j} className="text-yellow-600 dark:text-yellow-300">{token}</span>; // Roughly types/classes
              if (/^[0-9]+$/.test(token)) return <span key={j} className="text-orange-500 dark:text-orange-400">{token}</span>;
              if (['true', 'false', 'null', 'undefined'].includes(token)) return <span key={j} className="text-orange-500 dark:text-orange-400">{token}</span>;
              if (['(', ')', '{', '}', '[', ']', '.', ',', ';'].includes(token)) return <span key={j} className="text-slate-500 dark:text-slate-500">{token}</span>;
              return <span key={j} className="text-slate-800 dark:text-slate-300">{token}</span>;
            })}
          </span>
        </div>
      ))}
    </>
  );
};

// --- CODE WINDOW COMPONENT ---
const CodeWindow = ({ 
  code, 
  title, 
  borderColor = "border-slate-200 dark:border-slate-700", 
  bgColor = "bg-white dark:bg-[#0F172A]",
  headerColor = "bg-slate-100 dark:bg-[#1E293B]",
  isDiff = false,
  diffType = 'neutral' // 'neutral' | 'bad' | 'good'
}: any) => {
  
  let glowClass = '';
  if (diffType === 'bad') glowClass = 'shadow-[0_0_30px_-10px_rgba(239,68,68,0.2)] border-red-200 dark:border-red-900/50';
  if (diffType === 'good') glowClass = 'shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] border-emerald-200 dark:border-emerald-900/50';

  return (
    <div className={`rounded-xl border ${borderColor} ${glowClass} shadow-xl overflow-hidden flex flex-col h-full font-mono text-sm transition-all duration-300`}>
      {/* Window Title Bar */}
      <div className={`${headerColor} px-4 py-3 border-b ${borderColor} flex items-center justify-between`}>
         <div className="flex items-center gap-2">
            <div className="flex gap-1.5 group">
               <div className="w-3 h-3 rounded-full bg-red-400/80 group-hover:bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400/80 group-hover:bg-amber-500"></div>
               <div className="w-3 h-3 rounded-full bg-emerald-400/80 group-hover:bg-emerald-500"></div>
            </div>
            <div className="ml-4 text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1.5 opacity-80">
               {diffType === 'bad' && <XCircle className="w-3.5 h-3.5 text-red-500" />}
               {diffType === 'good' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
               {title}
            </div>
         </div>
         <div className="flex gap-3 text-slate-400">
            <Copy className="w-4 h-4 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors" />
            <MoreHorizontal className="w-4 h-4 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors" />
         </div>
      </div>
      
      {/* Code Area */}
      <div className={`flex-grow p-4 overflow-auto ${bgColor} relative`}>
         {/* Subtle watermark/icon background */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            {diffType === 'bad' ? <Bug className="w-32 h-32" /> : <Terminal className="w-32 h-32" />}
         </div>
         <div className="relative z-10">
            <SyntaxHighlighter code={code} />
         </div>
      </div>
    </div>
  );
};

const BugHunterDashboard: React.FC<Props> = ({ challenge, result, onAnalyze, onReset, isAnalyzing }) => {
  const [userSolution, setUserSolution] = useState("");

  const handleSubmit = () => {
    if (userSolution.trim().length > 5) {
      onAnalyze(userSolution);
    }
  };

  // --- RENDER: CHALLENGE MODE ---
  if (!result) {
    return (
      <div className="max-w-7xl mx-auto pb-20 animate-fade-in px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
                 <Bug className="w-8 h-8" />
              </div>
              <div>
                 <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Bug Hunter <span className="text-emerald-500">Protocol</span></h1>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Review the codebase. Isolate the anomaly.</p>
              </div>
           </div>
           <div className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              Session ID: {challenge.id}
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:h-[650px]">
           
           {/* LEFT: Code Editor (Takes up more space now) */}
           <div className="lg:col-span-7 h-[500px] lg:h-auto">
              <CodeWindow 
                code={challenge.buggyCode} 
                title={challenge.title} 
                borderColor="border-slate-300 dark:border-slate-700"
              />
           </div>

           {/* RIGHT: Scenario & Input */}
           <div className="lg:col-span-5 flex flex-col gap-6 h-full">
              {/* Scenario Card */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg flex-shrink-0 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-[80px] transition-transform group-hover:scale-110"></div>
                 
                 <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Maximize2 className="w-3.5 h-3.5" /> Mission Brief
                 </h3>
                 <p className="text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                   "{challenge.scenario}"
                 </p>
                 
                 <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block mb-0.5">Intel Hint</span>
                      <span className="text-sm text-amber-800 dark:text-amber-200 leading-snug">{challenge.hint}</span>
                    </div>
                 </div>
              </div>

              {/* Input Area */}
              <div className="flex-grow flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden relative">
                 <div className="bg-slate-50 dark:bg-slate-900/80 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Patch Notes</h3>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    </div>
                 </div>
                 <textarea
                    value={userSolution}
                    onChange={(e) => setUserSolution(e.target.value)}
                    placeholder="// Describe the bug location and your fix strategy..."
                    className="flex-grow w-full p-6 bg-transparent resize-none focus:outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 font-mono text-sm"
                 />
                 <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 flex justify-between items-center">
                    <div className="text-xs text-slate-400">
                       {userSolution.length < 5 ? 'Minimum 5 chars required' : 'Ready to deploy'}
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={isAnalyzing || userSolution.length < 5}
                      className={`px-6 py-2.5 rounded-lg font-bold text-white text-sm flex items-center gap-2 transition-all transform active:scale-95 ${
                         isAnalyzing || userSolution.length < 5 
                           ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-500' 
                           : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20'
                      }`}
                    >
                      {isAnalyzing ? 'Running Tests...' : 'Deploy Patch'} <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- RENDER: RESULTS MODE ---
  return (
    <div className="max-w-7xl mx-auto pb-24 animate-fade-in px-4">
       
       {/* 1. STATUS BANNER */}
       <div className={`rounded-3xl p-8 mb-12 text-white shadow-2xl relative overflow-hidden ${
          result.success 
            ? 'bg-gradient-to-br from-emerald-600 to-teal-700 shadow-emerald-900/20' 
            : 'bg-gradient-to-br from-orange-600 to-red-700 shadow-orange-900/20'
       }`}>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
             <div className="p-4 bg-white/20 backdrop-blur-md rounded-[2rem] shadow-inner border border-white/20 shrink-0">
                {result.success ? <CheckCircle2 className="w-16 h-16 text-white drop-shadow-md" /> : <XCircle className="w-16 h-16 text-white drop-shadow-md" />}
             </div>
             <div>
                <div className="inline-block px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-white/10">
                   {result.success ? 'System Status: Secure' : 'System Status: Critical'}
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tight">{result.success ? 'Bug Successfully Squashed!' : 'Vulnerability Remains'}</h2>
                <div className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <p className="text-lg text-white/90 font-medium leading-relaxed font-mono">
                     `{result.userFeedback}`
                  </p>
                </div>
             </div>
          </div>
          {/* Background Decor */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
       </div>

       {/* 2. THE FIX (Side-by-Side Diff) */}
       <div className="mb-16">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white mb-6">
             <Layers className="w-6 h-6 text-blue-500" /> Codebase Diff
          </h3>
          <div className="grid lg:grid-cols-2 gap-6">
             {/* Buggy Code Highlighted */}
             <div className="flex flex-col">
                <div className="mb-2 text-xs font-bold text-red-500 uppercase tracking-widest pl-1">Original Source</div>
                <CodeWindow 
                  code={challenge.buggyCode} 
                  title={`${challenge.title} (Vulnerable)`}
                  borderColor="border-red-200 dark:border-red-900/50"
                  bgColor="bg-red-50/50 dark:bg-red-950/10"
                  headerColor="bg-red-100 dark:bg-red-900/20"
                  diffType="bad"
                />
             </div>

             {/* Corrected Code Highlighted */}
             <div className="flex flex-col">
                <div className="mb-2 text-xs font-bold text-emerald-500 uppercase tracking-widest pl-1">Patched Source</div>
                <CodeWindow 
                  code={result.correctedCode} 
                  title={`${challenge.title} (Fixed)`}
                  borderColor="border-emerald-200 dark:border-emerald-900/50"
                  bgColor="bg-emerald-50/50 dark:bg-emerald-950/10"
                  headerColor="bg-emerald-100 dark:bg-emerald-900/20"
                  diffType="good"
                />
             </div>
          </div>
       </div>

       {/* 3. DEEP DIVE REVISION */}
       <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-slate-700 shadow-2xl mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10 border-b border-slate-100 dark:border-slate-700 pb-6">
             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10">
                <BookOpen className="w-8 h-8" />
             </div>
             <div>
               <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Knowledge Base Update</div>
               <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{result.conceptRevision.name}</h3>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 relative z-10">
             <div className="prose dark:prose-invert">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Theoretical Foundation</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                   {result.conceptRevision.theory}
                </p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 relative">
                <div className="absolute -left-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rotate-45"></div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Production Reality</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic text-lg font-serif">
                   "{result.conceptRevision.practicality}"
                </p>
             </div>
          </div>
       </div>

       {/* 4. PATTERN RECOGNITION (2 Extra Examples) */}
       <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
               <Layers className="w-6 h-6 text-purple-500" /> Pattern Recognition
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900">
               Related Incidents
            </span>
          </div>
          
          <div className="space-y-12">
             {result.relatedPatterns.map((pattern, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                   <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-6 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-3 mb-2">
                         <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                         <h4 className="font-bold text-slate-900 dark:text-white text-xl">{pattern.title}</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm pl-5">{pattern.explanation}</p>
                   </div>
                   
                   <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                      {/* Bad Code */}
                      <div className="p-0">
                         <div className="px-6 py-3 bg-red-50/50 dark:bg-red-900/10 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                            <XCircle className="w-4 h-4" /> Vulnerable
                         </div>
                         <div className="p-6 overflow-auto bg-white dark:bg-[#0F172A] h-full">
                            <SyntaxHighlighter code={pattern.badCode} />
                         </div>
                      </div>
                      
                      {/* Good Code */}
                      <div className="p-0">
                         <div className="px-6 py-3 bg-emerald-50/50 dark:bg-emerald-900/10 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4" /> Secure
                         </div>
                         <div className="p-6 overflow-auto bg-white dark:bg-[#0F172A] h-full">
                            <SyntaxHighlighter code={pattern.goodCode} />
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="flex justify-center pt-16">
          <button 
             onClick={onReset}
             className="group px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/20 flex items-center gap-3"
          >
             <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> 
             Hunt Another Bug
          </button>
       </div>

    </div>
  );
};

export default BugHunterDashboard;
