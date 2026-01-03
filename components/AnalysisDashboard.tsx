import React from 'react';
import { AnalysisResult } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  AlertTriangle, CheckCircle, Brain, Target, Calendar, ArrowRight, Lightbulb, Share2, Download
} from 'lucide-react';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisDashboard: React.FC<Props> = ({ result, onReset }) => {
  const { 
    assessment, 
    strongAreas, 
    identifiedGaps, 
    rootCauseAnalysis, 
    learningRoadmap, 
    crossDomainTransfer, 
    dailyFocusPlan,
    reflectionPrompts
  } = result;

  const scoreData = [
    { name: 'Depth', score: assessment.skillScore },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-all duration-1000"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 h-full">
            <div>
               <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                 Analysis Complete
               </div>
               <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{assessment.detectedDomain}</h1>
               <div className="flex items-center gap-3 text-slate-300">
                 <span>Estimated Level:</span>
                 <span className="text-white font-semibold bg-white/10 px-2 py-0.5 rounded">{assessment.estimatedRealLevel}</span>
               </div>
            </div>

            <div className="w-full md:w-auto flex items-center gap-6">
               <div className="text-right">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-500">
                    {assessment.skillScore}
                  </div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Depth Score</div>
               </div>
               <div className="w-2 h-16 bg-slate-700/50 rounded-full overflow-hidden">
                 <div 
                   className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 transition-all duration-1000 ease-out"
                   style={{ height: `${assessment.skillScore}%` }}
                 ></div>
               </div>
            </div>
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-center">
           <Brain className="w-8 h-8 text-amber-500 mb-4" />
           <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">AI Observation</h3>
           <p className="text-slate-800 dark:text-slate-200 text-lg font-medium italic leading-relaxed">
             "{assessment.confidenceVsDepthAssessment}"
           </p>
        </div>
      </div>

      {/* --- DIAGNOSIS GRID --- */}
      <div className="grid md:grid-cols-2 gap-8">
         {/* Root Cause */}
         <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-500">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Root Cause Analysis</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-md">
              {rootCauseAnalysis}
            </p>
         </div>

         {/* Strong Areas */}
         <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-500">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Solid Foundations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {strongAreas.map((area, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md text-sm font-medium">
                  {area}
                </span>
              ))}
            </div>
         </div>
      </div>

      {/* --- GAPS SECTION --- */}
      <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
         <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6">
           <AlertTriangle className="w-6 h-6 text-red-500" />
           Critical Conceptual Gaps
         </h3>
         <div className="grid gap-4">
            {identifiedGaps.map((gap, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-all border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-red-500 transition-colors">{gap.conceptName}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-wide mb-3">{gap.reason}</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                       <div className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                          <strong className="text-slate-900 dark:text-white block mb-1">Evidence:</strong> "{gap.evidence}"
                       </div>
                       <div className="text-sm text-slate-600 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg">
                          <strong className="text-red-700 dark:text-red-400 block mb-1">Consequence:</strong> {gap.consequences}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* --- ROADMAP VISUALIZATION --- */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
         <div className="flex items-center gap-3 mb-10">
           <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg text-cyan-600 dark:text-cyan-400">
             <Target className="w-6 h-6" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Recovery Roadmap</h3>
             <p className="text-slate-500 text-sm">Follow this dependency chain to fix gaps.</p>
           </div>
         </div>

         <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 to-slate-300 dark:to-slate-700"></div>

            <div className="space-y-10">
               {learningRoadmap.map((step, idx) => (
                 <div key={idx} className="relative pl-16 group">
                    {/* Node */}
                    <div className="absolute left-0 top-0 w-12 h-12 bg-white dark:bg-slate-800 border-2 border-cyan-500 rounded-full flex items-center justify-center font-bold text-cyan-600 dark:text-cyan-400 z-10 shadow-lg group-hover:scale-110 transition-transform">
                      {step.stepNumber}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all hover:border-cyan-300 dark:hover:border-cyan-700">
                       <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{step.conceptName}</h4>
                       <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-4">{step.reason}</p>
                       
                       <div className="flex flex-col sm:flex-row gap-4 text-sm">
                          <div className="flex-1">
                             <span className="text-xs font-bold text-slate-400 uppercase">Goal</span>
                             <p className="text-slate-700 dark:text-slate-300 mt-1">{step.learningGoal}</p>
                          </div>
                          <div className="sm:text-right">
                             <span className="text-xs font-bold text-slate-400 uppercase">Action</span>
                             <p className="text-slate-900 dark:text-white font-medium mt-1 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded inline-block">
                               {step.practiceType}
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- DAILY PLAN --- */}
      <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
         <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" /> 7-Day Micro-Focus
            </h3>
            <div className="space-y-3">
              {dailyFocusPlan.map((plan, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-default group">
                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                       D{plan.day}
                    </div>
                    <div>
                       <div className="font-medium text-slate-900 dark:text-white text-sm">{plan.focus}</div>
                       <div className="text-xs text-slate-500">{plan.duration}</div>
                    </div>
                 </div>
              ))}
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-slate-700">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                 <ArrowRight className="w-5 h-5 text-blue-500" /> Cross-Domain Value
               </h3>
               <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                 {crossDomainTransfer}
               </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex-1">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Reflection</h3>
               <ul className="space-y-4">
                 {reflectionPrompts.map((prompt, idx) => (
                   <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 italic">
                     <span className="text-2xl text-slate-300 leading-none">"</span>
                     {prompt}
                   </li>
                 ))}
               </ul>
            </div>
         </div>
      </div>

      <div className="flex justify-center pt-8 pb-12">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" /> Start New Diagnosis
        </button>
      </div>

    </div>
  );
};

export default AnalysisDashboard;