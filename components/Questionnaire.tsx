import React, { useState } from 'react';
import { Question } from '../types';
import { Send, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  questions: Question[];
  onSubmit: (answers: { question: string; answer: string }[]) => void;
}

const Questionnaire: React.FC<Props> = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const handleChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isFormValid = questions.every(q => (answers[q.id] || '').trim().length > 10);
  const completedCount = questions.filter(q => (answers[q.id] || '').trim().length > 10).length;
  const progress = (completedCount / questions.length) * 100;

  const handleSubmit = () => {
    const formattedAnswers = questions.map(q => ({
      question: q.text,
      answer: answers[q.id] || "No answer provided."
    }));
    onSubmit(formattedAnswers);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Progress & Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex justify-between items-end mb-4">
           <div>
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Diagnostic Questions</h2>
             <p className="text-slate-500 dark:text-slate-400 text-sm">Answer thoughtfully. We analyze your reasoning, not just the solution.</p>
           </div>
           <div className="text-right">
             <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{completedCount}</span>
             <span className="text-slate-400 text-lg">/{questions.length}</span>
           </div>
        </div>
        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
           <div 
             className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
      </div>

      {/* Mentor Note */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-900 border border-indigo-100 dark:border-indigo-500/20 p-5 rounded-xl flex gap-4 shadow-sm">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg h-fit">
             <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm mb-1">Before you start</h4>
            <p className="text-sm text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
              Don't worry about perfect syntax. If you're unsure, write down your thought process or what you <em>think</em> happens. The AI needs to see your mental model to find gaps.
            </p>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, index) => {
          const isFocused = focusedId === q.id;
          const hasAnswer = (answers[q.id] || '').length > 0;
          
          return (
            <div 
              key={q.id} 
              className={`group relative bg-white dark:bg-slate-900 rounded-2xl p-1 transition-all duration-300 animate-fade-in-up ${
                isFocused 
                  ? 'ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                  : 'ring-1 ring-slate-200 dark:ring-slate-800 hover:ring-slate-300 dark:hover:ring-slate-700'
              }`}
              style={{ animationDelay: `${150 + (index * 100)}ms` }}
            >
              <div className="bg-slate-50/50 dark:bg-slate-950/50 rounded-xl p-6">
                <div className="flex gap-4 mb-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold transition-colors ${
                    hasAnswer ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 leading-snug pt-0.5">
                    {q.text}
                  </h3>
                </div>

                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  onFocus={() => setFocusedId(q.id)}
                  onBlur={() => setFocusedId(null)}
                  placeholder="Explain your approach..."
                  className="w-full h-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-900/80 transition-all resize-none text-base leading-relaxed"
                />
                
                <div className="mt-3 flex justify-end">
                   {hasAnswer && (
                     <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-scale-in">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Answer recorded
                     </div>
                   )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      <div className="sticky bottom-6 mt-12 flex justify-end animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent h-32 -top-20 pointer-events-none"></div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1 ${
            isFormValid 
            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-900/20 hover:shadow-cyan-900/40' 
            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          {isFormValid ? 'Analyze My Gaps' : 'Complete All Questions'} 
          <Send className={`w-5 h-5 ${isFormValid ? 'animate-pulse' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;