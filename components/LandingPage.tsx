
import React from 'react';
import { 
  Sparkles, Zap, Brain, Target, ChevronRight, 
  Code2, Database, Layout, Smartphone, GitBranch, Terminal,
  ArrowRight, CheckCircle2, Search, Layers, FileJson,
  Lightbulb, Puzzle, Box, Bug
} from 'lucide-react';
import { AppMode } from '../types';
import { APP_NAME } from '../constants';

interface Props {
  onNavigate: (mode: AppMode) => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full relative overflow-hidden bg-slate-50 dark:bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors duration-300">
      
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Deep glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/40 dark:bg-indigo-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-200/40 dark:bg-cyan-900/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[12000ms]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Badge */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur-md text-cyan-700 dark:text-cyan-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl shadow-cyan-900/10 dark:shadow-cyan-900/20 hover:border-cyan-500/50 transition-colors cursor-default">
              <Sparkles className="w-3 h-3 animate-pulse" />
              AI Technical Mentor v1.3
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight max-w-4xl opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Mental Models</span><br /> 
            Behind the Code.
          </h1>
          
          {/* Subtext */}
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            Don't just memorize syntax. Detect hidden learning gaps, visualize your knowledge graph, and prepare for senior-level interviews with deep diagnostic AI.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <button
              onClick={() => onNavigate(AppMode.DIAGNOSIS)}
              className="group relative px-8 py-4 bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-xl font-bold shadow-xl shadow-cyan-900/20 hover:shadow-cyan-500/30 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                <Brain className="w-5 h-5" />
                Diagnose My Skills
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              onClick={() => onNavigate(AppMode.REVISION)}
              className="group px-8 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              Rapid Revision
            </button>
            
            <button
              onClick={() => onNavigate(AppMode.BUG_HUNTER)}
              className="group px-8 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-3 backdrop-blur-sm"
            >
              <Bug className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              Bug Hunter
            </button>
          </div>
        </div>
      </section>

      {/* --- DOMAINS SUPPORTED (ENHANCED) --- */}
      <section className="py-24 relative z-10 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-slate-200/50 dark:bg-slate-800/30 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 rounded-full mb-4 inline-block">
              Ecosystem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              Supported Knowledge Bases
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              Our AI is trained on senior-level mental models across the entire technical stack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Layout, label: "Frontend Architecture", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", border: "group-hover:border-blue-500/50" },
              { icon: Database, label: "Backend & SQL", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "group-hover:border-emerald-500/50" },
              { icon: GitBranch, label: "DSA & Algorithms", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", border: "group-hover:border-purple-500/50" },
              { icon: Brain, label: "AI & Machine Learning", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", border: "group-hover:border-amber-500/50" },
              { icon: Smartphone, label: "Mobile Development", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/20", border: "group-hover:border-rose-500/50" },
              { icon: Terminal, label: "DevOps & Cloud", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-900/20", border: "group-hover:border-cyan-500/50" },
              { icon: Code2, label: "System Design", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "group-hover:border-indigo-500/50" },
              { icon: Layers, label: "CS Fundamentals", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800", border: "group-hover:border-slate-500/50" },
            ].map((domain, idx) => (
              <div key={idx} className={`group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:shadow-xl transition-all duration-300 cursor-default relative overflow-hidden ${domain.border}`}>
                <div className={`absolute top-0 right-0 w-24 h-24 ${domain.bg} rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 opacity-50`}></div>
                
                <div className="relative z-10">
                  <div className={`p-3 rounded-xl ${domain.bg} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <domain.icon className={`w-6 h-6 ${domain.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:translate-x-1 transition-transform">
                    {domain.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DIFFERENTIATION (Why ConceptLens?) --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto relative z-10 border-t border-slate-200 dark:border-slate-800">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Why use AI Diagnosis instead of tutorials?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                Tutorials teach you the "How". We diagnose the "Why". ConceptLens acts like a Staff Engineer reviewing your mental models, not your syntax.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Deep Gap Detection", desc: "Finds hidden prerequisites you missed (e.g., Recursion → Call Stack)." },
                  { title: "Root Cause Analysis", desc: "Identifies if you are struggling due to logic, memory, or false confidence." },
                  { title: "Interview Simulation", desc: "Questions designed to mimic high-stakes technical interviews." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center border border-cyan-200 dark:border-cyan-500/30 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Abstract Representation - IMPROVED CODE BOX */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              
              <div className="relative bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
                 {/* Window Title Bar */}
                 <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-slate-700">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                       <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                       <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-slate-400 bg-slate-800/50 px-3 py-0.5 rounded text-xs">
                       <FileJson className="w-3 h-3" />
                       <span>analysis_report.json</span>
                    </div>
                 </div>

                 {/* Code Content */}
                 <div className="p-6 text-slate-300 leading-relaxed overflow-x-auto">
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">1</span>
                       <span><span className="text-purple-400">const</span> <span className="text-blue-400">diagnosis</span> <span className="text-slate-400">=</span> <span className="text-yellow-300">{'{'}</span></span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">2</span>
                       <span className="pl-4">gapDetected: <span className="text-emerald-400">"Event Loop"</span>,</span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">3</span>
                       <span className="pl-4">rootCause: <span className="text-amber-400">"Blocking Behavior"</span>,</span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">4</span>
                       <span className="pl-4">confidence: <span className="text-cyan-400">0.92</span>,</span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">5</span>
                       <span className="pl-4">recommendation: <span className="text-yellow-300">{'{'}</span></span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">6</span>
                       <span className="pl-8">action: <span className="text-orange-400">"Review Microtasks"</span>,</span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">7</span>
                       <span className="pl-8">priority: <span className="text-red-400">"HIGH"</span></span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">8</span>
                       <span className="pl-4"><span className="text-yellow-300">{'}'}</span></span>
                    </div>
                    <div className="flex">
                       <span className="text-slate-600 w-6 select-none">9</span>
                       <span><span className="text-yellow-300">{'}'}</span>;</span>
                    </div>
                    <div className="flex mt-2">
                       <span className="text-slate-600 w-6 select-none">10</span>
                       <span className="text-slate-500">// AI analyzing next step...</span>
                       <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-cyan-500"></span>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Intelligent Diagnosis Flow</h2>
            <p className="text-slate-600 dark:text-slate-400">From confusion to clarity in three steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Connecting Line */}
             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-cyan-500/30 to-slate-200 dark:from-slate-800 dark:via-cyan-900/50 dark:to-slate-800"></div>

             {[
               { icon: Search, title: "1. Context Aware", desc: "Select your domain and experience level. The AI adapts its persona." },
               { icon: Brain, title: "2. Deep Inquiry", desc: "Answer conceptual questions designed to expose your mental models." },
               { icon: Target, title: "3. Action Plan", desc: "Receive a graph-based roadmap and a 7-day micro-focus schedule." }
             ].map((step, idx) => (
               <div key={idx} className="relative flex flex-col items-center text-center group">
                 <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:border-cyan-500/50 flex items-center justify-center mb-6 relative z-10 transition-colors shadow-xl">
                   <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                     <step.icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                   </div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA (ENHANCED) --- */}
      <section className="py-24 px-4 md:px-6 relative z-10 bg-white dark:bg-slate-950">
         <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1120] text-center shadow-2xl animate-fade-in-up">
               {/* Decorative Gradient Mesh */}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-900 to-slate-950"></div>
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

               {/* --- ANIMATED DOODLES (Added) --- */}
               <div className="absolute inset-0 pointer-events-none">
                 <Brain className="absolute top-12 left-12 w-24 h-24 text-cyan-500/10 animate-float" style={{ animationDelay: '0s' }} />
                 <Zap className="absolute bottom-16 right-16 w-28 h-28 text-blue-500/10 animate-float" style={{ animationDelay: '1.5s' }} />
                 <Code2 className="absolute top-20 right-24 w-16 h-16 text-indigo-500/10 animate-float" style={{ animationDelay: '3s' }} />
                 <Lightbulb className="absolute bottom-24 left-32 w-20 h-20 text-yellow-500/10 animate-float" style={{ animationDelay: '2s' }} />
                 <Puzzle className="absolute top-1/2 left-10 w-12 h-12 text-pink-500/10 animate-float" style={{ animationDelay: '4s' }} />
                 <Box className="absolute top-10 right-1/3 w-14 h-14 text-emerald-500/10 animate-float" style={{ animationDelay: '1s' }} />
               </div>

               <div className="relative z-10 py-16 px-6 md:py-24 md:px-12">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8 leading-tight">
                    Stop guessing <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-300">
                      what you don't know.
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
                    Join thousands of developers using ConceptLens to build unshakeable technical foundations.
                  </p>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={() => onNavigate(AppMode.DIAGNOSIS)}
                      className="group relative px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Analyze My Learning Gaps <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- MINIMALIST FOOTER --- */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/50 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Sparkles className="w-4 h-4" />
                 </div>
                 <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">{APP_NAME}</span>
              </div>

              <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                 <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacy</a>
                 <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Terms</a>
                 <a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
              </div>

              {/* Removed Social Icons as requested */}

           </div>
           
           <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              <p>&copy; {new Date().getFullYear()} ConceptLens AI. All rights reserved.</p>
              <p className="flex items-center gap-1">
                 Powered by <span className="font-semibold text-slate-600 dark:text-slate-300">Google Gemini</span>
              </p>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
