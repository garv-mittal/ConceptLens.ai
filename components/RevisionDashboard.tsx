import React, { useState } from 'react';
import { 
  RevisionResult, TechConceptsResult, TechQuestionsResult, HRResult 
} from '../types';
import { 
  BookOpen, AlertCircle, HelpCircle, Key, Layers, Zap, 
  MessageSquare, Users, CheckSquare, Target, Eye, Quote, Star,
  ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';

interface Props {
  result: RevisionResult;
  onReset: () => void;
}

const RevisionDashboard: React.FC<Props> = ({ result, onReset }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);
  const [expandedPracticeQ, setExpandedPracticeQ] = useState<number | null>(null);

  const toggleQuestion = (idx: number) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  const togglePracticeQ = (idx: number) => {
    setExpandedPracticeQ(expandedPracticeQ === idx ? null : idx);
  };
  
  // --- SUB-COMPONENTS ---
  
  const HeaderCard = ({ 
    icon: Icon, 
    badge, 
    title, 
    subtitle, 
    bgGradient 
  }: any) => (
    <div className={`rounded-2xl p-8 relative overflow-hidden shadow-2xl mb-8 ${bgGradient} text-white animate-fade-in group`}>
      {/* Abstract Background Shapes for Header */}
      <div className="absolute -right-6 -top-10 opacity-10 rotate-12 transition-transform duration-1000 group-hover:rotate-6">
        <Icon className="w-64 h-64" />
      </div>
      <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/10 shadow-lg">
          {badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">{title}</h2>
        <p className="text-white/90 text-lg font-medium max-w-2xl leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );

  // --- RENDERERS ---

  const renderConcepts = (data: TechConceptsResult) => (
    <div className="space-y-8 relative">
       {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <HeaderCard 
        icon={Layers}
        badge={`${data.level} Revision`}
        title={data.domain}
        subtitle="Core mental models, key insights, and rapid recall checklist."
        bgGradient="bg-gradient-to-br from-amber-600 to-orange-700"
      />

      <div className="grid md:grid-cols-12 gap-8 relative z-10">
        {/* Core Concepts Column */}
        <div className="md:col-span-8 space-y-6">
           <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-2">
             <BookOpen className="w-6 h-6 text-amber-500" /> Core Concepts
           </h3>
           <div className="space-y-5">
             {data.coreConcepts.map((concept, idx) => (
               <div key={idx} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-amber-500/30 transition-all animate-slide-in-right" style={{ animationDelay: `${idx * 100}ms` }}>
                 <div className="flex justify-between items-start mb-3">
                   <h4 className="text-xl font-bold text-slate-900 dark:text-white">{concept.name}</h4>
                 </div>
                 <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-5 border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                   {concept.explanation}
                 </p>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 dark:text-amber-500 uppercase tracking-wide mb-1.5">
                        <Key className="w-3.5 h-3.5" /> Key Insight
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{concept.keyInsight}</p>
                   </div>
                   <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-red-700 dark:text-red-500 uppercase tracking-wide mb-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Common Trap
                      </div>
                      <p className="text-sm text-slate-800 dark:text-slate-200">{concept.commonMistake}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>

           {/* --- BONUS RAPID FIRE QUESTIONS --- */}
           {data.practiceQuestions && data.practiceQuestions.length > 0 && (
             <div className="pt-8">
               <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-6">
                 <Zap className="w-6 h-6 text-amber-500 fill-amber-500" /> Rapid Fire Drill
               </h3>
               <div className="space-y-3">
                 {data.practiceQuestions.map((q, idx) => {
                   const isExpanded = expandedPracticeQ === idx;
                   return (
                     <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                       <button 
                         onClick={() => togglePracticeQ(idx)}
                         className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                       >
                         <span className="font-semibold text-slate-800 dark:text-slate-200 pr-4">{q.question}</span>
                         {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                       </button>
                       {isExpanded && (
                         <div className="px-4 pb-4 bg-amber-50/50 dark:bg-amber-900/10 border-t border-slate-100 dark:border-slate-700">
                           <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                             <span className="font-bold text-amber-600 dark:text-amber-500 mr-2">Answer:</span>
                             {q.answer}
                           </p>
                         </div>
                       )}
                     </div>
                   )
                 })}
               </div>
             </div>
           )}
        </div>

        {/* Sidebar Column */}
        <div className="md:col-span-4 space-y-6">
          {/* Recall Checklist */}
          <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
             <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-600 dark:text-emerald-500 mb-4">
               <CheckSquare className="w-5 h-5" /> Quick Recall
             </h3>
             <ul className="space-y-3">
               {data.quickRecallChecklist.map((item, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                   <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                   </div>
                   <span className="leading-snug">{item}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Mistakes */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-red-100 dark:border-red-900/30 shadow-sm">
             <h3 className="flex items-center gap-2 text-lg font-bold text-red-600 dark:text-red-500 mb-4">
               <AlertCircle className="w-5 h-5" /> Level Pitfalls
             </h3>
             <ul className="space-y-3">
               {data.typicalMistakes.map((item, idx) => (
                 <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 pl-3 border-l-2 border-red-200 dark:border-red-900">
                   {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestions = (data: TechQuestionsResult) => (
    <div className="space-y-8 relative">
      {/* Background Decoration */}
      <div className="absolute -top-10 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <HeaderCard 
        icon={MessageSquare}
        badge={`${data.level} Questions`}
        title={data.domain}
        subtitle="Real-world interview scenarios and evaluation criteria."
        bgGradient="bg-gradient-to-br from-indigo-600 to-violet-800"
      />

      <div className="grid md:grid-cols-12 gap-8 relative z-10">
        {/* Frequent Questions with Answers */}
        <div className="md:col-span-8 space-y-6">
           <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
             <HelpCircle className="w-6 h-6 text-indigo-500" /> Frequent Questions & Answers
           </h3>
           <div className="space-y-4">
             {data.frequentQuestions.map((item, idx) => {
               const isExpanded = expandedQuestion === idx;
               return (
                 <div 
                    key={idx} 
                    className={`bg-white dark:bg-slate-800 rounded-xl border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'border-indigo-500 dark:border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[1.01]' 
                        : 'border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                 >
                   <button 
                     onClick={() => toggleQuestion(idx)}
                     className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none"
                   >
                      <div className="flex gap-4">
                        <span className={`font-mono text-lg font-bold transition-colors ${isExpanded ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                          Q{idx + 1}
                        </span>
                        <span className={`font-semibold text-lg transition-colors ${isExpanded ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {item.question}
                        </span>
                      </div>
                      <div className={`p-1 rounded-full transition-colors ${isExpanded ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600' : 'text-slate-400'}`}>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                   </button>
                   
                   <div 
                      className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                        isExpanded ? 'max-h-[800px]' : 'max-h-0'
                      }`}
                   >
                      <div className="p-6 pt-0">
                        <div className="bg-indigo-50 dark:bg-[#1E293B] rounded-xl p-5 border border-indigo-100 dark:border-slate-700 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                           
                           <div className="flex items-center gap-2 mb-3">
                             <Sparkles className="w-4 h-4 text-indigo-500" />
                             <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Model Answer</span>
                           </div>
                           
                           <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                             {item.answer}
                           </p>
                        </div>
                      </div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Scenarios & Eval Side Column */}
        <div className="md:col-span-4 space-y-6">
           <div className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-6">
                <Target className="w-5 h-5 text-indigo-500" /> Scenario Challenges
              </h3>
              <div className="space-y-6">
                {data.scenarioQuestions.map((q, idx) => (
                  <div key={idx} className="relative pl-6">
                    <Quote className="absolute left-0 top-0 w-4 h-4 text-indigo-300 dark:text-indigo-800" />
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      {q}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-6">
                  <Eye className="w-5 h-5" /> Evaluation Lens
                </h3>
                <div className="space-y-3">
                   <div className="group p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-transparent hover:border-indigo-500/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs uppercase text-slate-500 font-bold">Depth</span>
                        <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[85%]"></div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{data.interviewerEvaluationLens.depth}</p>
                   </div>
                   
                   <div className="group p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-transparent hover:border-indigo-500/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs uppercase text-slate-500 font-bold">Clarity</span>
                        <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 w-[90%]"></div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{data.interviewerEvaluationLens.clarity}</p>
                   </div>
                   
                   <div className="group p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-transparent hover:border-indigo-500/30 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs uppercase text-slate-500 font-bold">Practical</span>
                        <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[95%]"></div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{data.interviewerEvaluationLens.practicality}</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderHR = (data: HRResult) => (
    <div className="space-y-8 relative">
       {/* Background Decoration */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <HeaderCard 
        icon={Users}
        badge="HR & Soft Skills"
        title={data.category}
        subtitle={data.categoryOverview}
        bgGradient="bg-gradient-to-br from-pink-600 to-rose-700"
      />

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
         <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Common Questions</h3>
            <ul className="space-y-6">
              {data.commonQuestions.map((q, idx) => (
                <li key={idx} className="relative pl-6 animate-fade-in-up group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="absolute left-0 top-2 w-2 h-2 bg-pink-300 group-hover:bg-pink-500 transition-colors rounded-full"></div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-lg group-hover:translate-x-1 transition-transform">{q}</p>
                </li>
              ))}
            </ul>
         </div>

         <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-50 to-pink-50 dark:from-slate-900 dark:to-pink-900/20 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
               <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest">Winning Framework</h3>
               <p className="text-slate-800 dark:text-slate-200 italic leading-relaxed text-lg font-serif">
                 "{data.strongAnswerFramework}"
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" /> Green Flags
                  </h4>
                  <ul className="space-y-2">
                    {data.interviewerLookingFor.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">• {item}</li>
                    ))}
                  </ul>
               </div>
               <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Red Flags
                  </h4>
                  <ul className="space-y-2">
                    {data.commonMistakes.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400">• {item}</li>
                    ))}
                  </ul>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 relative">
      {result.type === 'CONCEPTS' && renderConcepts(result as TechConceptsResult)}
      {result.type === 'QUESTIONS' && renderQuestions(result as TechQuestionsResult)}
      {result.type === 'HR' && renderHR(result as HRResult)}

      <div className="flex justify-center pt-16">
        <button 
          onClick={onReset}
          className="group px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2"
        >
          <Zap className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" /> Start New Session
        </button>
      </div>
    </div>
  );
};

export default RevisionDashboard;