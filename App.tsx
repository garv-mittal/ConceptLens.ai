import React, { useState, useEffect, useRef } from 'react';
import { AppStep, ExperienceLevel, Question, AnalysisResult, AppMode, RevisionResult, RevisionMode, TimeConstraint } from './types';
import { APP_NAME } from './constants';
import { generateConceptualQuestions, analyzeUserGaps, generateRevisionContent } from './services/geminiService';
import LandingPage from './components/LandingPage';
import BottomNav from './components/BottomNav';
import SetupForm from './components/SetupForm';
import Questionnaire from './components/Questionnaire';
import AnalysisDashboard from './components/AnalysisDashboard';
import RevisionDashboard from './components/RevisionDashboard';
import LoadingScreen from './components/LoadingScreen';
import { ScanSearch, Sun, Moon, Code2, Database, Cpu, Globe, Server, Terminal, Braces } from 'lucide-react';

const BackgroundDoodles = () => {
  const icons = [
    { Icon: Code2, top: '10%', left: '5%', delay: '0s' },
    { Icon: Database, top: '20%', right: '10%', delay: '2s' },
    { Icon: Cpu, bottom: '15%', left: '10%', delay: '4s' },
    { Icon: Globe, bottom: '20%', right: '5%', delay: '1s' },
    { Icon: Server, top: '40%', left: '15%', delay: '3s' },
    { Icon: Terminal, top: '60%', right: '15%', delay: '5s' },
    { Icon: Braces, bottom: '40%', left: '50%', delay: '2.5s' }
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-5">
      {icons.map(({ Icon, top, left, right, bottom, delay }, i) => (
        <div key={i} className="absolute animate-float" style={{ top, left, right, bottom, animationDelay: delay }}>
          <Icon className="w-16 h-16 text-slate-500 dark:text-slate-400" />
        </div>
      ))}
    </div>
  )
}

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DIAGNOSIS);
  const [step, setStep] = useState<AppStep>(AppStep.HOME);
  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>(ExperienceLevel.Beginner);
  
  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Navbar Scroll State
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Diagnosis State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Revision State
  const [revisionResult, setRevisionResult] = useState<RevisionResult | null>(null);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll Listener for Smart Navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      // Always show at very top (e.g. < 50px)
      // Show if scrolling UP
      if (currentScrollY < 50 || isScrollingUp) {
        setIsNavVisible(true);
      } 
      // Hide if scrolling DOWN and not at top
      else if (isScrollingDown && currentScrollY > 50) {
        setIsNavVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handlers
  const handleNavigateHome = () => {
    setStep(AppStep.HOME);
    setAnalysisResult(null);
    setRevisionResult(null);
    setQuestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateMode = (selectedMode: AppMode) => {
    setMode(selectedMode);
    setStep(AppStep.SETUP);
    setAnalysisResult(null);
    setRevisionResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = async (
    selectedDomain: string, 
    selectedLevel: ExperienceLevel, 
    selectedMode: AppMode, 
    revMode: RevisionMode = RevisionMode.CONCEPTS,
    time: TimeConstraint = TimeConstraint.MIN_30,
    focusArea?: string
  ) => {
    setDomain(selectedDomain);
    setLevel(selectedLevel);
    setMode(selectedMode);
    
    if (selectedMode === AppMode.DIAGNOSIS) {
      setStep(AppStep.GENERATING_QUESTIONS);
      try {
        const generatedQuestions = await generateConceptualQuestions(selectedDomain, selectedLevel);
        setQuestions(generatedQuestions);
        setStep(AppStep.QUESTIONNAIRE);
      } catch (error) {
        console.error("Failed to generate questions", error);
        setStep(AppStep.SETUP);
      }
    } else {
      // Revision Mode
      setStep(AppStep.GENERATING_REVISION);
      try {
        const content = await generateRevisionContent(selectedDomain, selectedLevel, revMode, time, focusArea);
        if (content) {
          setRevisionResult(content);
          setStep(AppStep.REVISION_RESULTS);
        } else {
          throw new Error("Failed to generate revision content");
        }
      } catch (error) {
        console.error("Revision Error", error);
        setStep(AppStep.SETUP);
      }
    }
  };

  const handleAnalysis = async (answers: { question: string; answer: string }[]) => {
    setStep(AppStep.ANALYZING);
    try {
      const result = await analyzeUserGaps(domain, level, answers);
      if (result) {
        setAnalysisResult(result);
        setStep(AppStep.RESULTS);
      } else {
        throw new Error("Analysis failed");
      }
    } catch (error) {
      console.error("Analysis Error", error);
      setStep(AppStep.QUESTIONNAIRE);
    }
  };

  return (
    <div className={theme}>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* Global Background Elements */}
        <BackgroundDoodles />

        {/* Background Ambience for App Screens */}
        {step !== AppStep.HOME && (
          <div className="fixed inset-0 pointer-events-none z-0">
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-900/20 blur-[100px] rounded-full"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-900/20 blur-[100px] rounded-full"></div>
          </div>
        )}

        {/* Header - Fixed & Floating Smart Navbar */}
        <header 
          className={`fixed top-6 left-0 right-0 z-50 px-6 flex justify-center transition-transform duration-300 ease-out ${
            isNavVisible ? 'translate-y-0' : '-translate-y-[200%]'
          }`}
        >
          <div className={`w-full max-w-5xl h-16 rounded-full flex items-center justify-between px-6 transition-all duration-300 backdrop-blur-xl border ${
             step === AppStep.HOME 
               ? 'bg-white/60 dark:bg-slate-900/60 border-white/30 dark:border-white/10 shadow-lg shadow-cyan-900/5' 
               : 'bg-white/80 dark:bg-[#0B1120]/80 border-slate-200 dark:border-slate-700/50 shadow-xl'
          }`}>
            <div className="flex items-center gap-2 cursor-pointer group" onClick={handleNavigateHome}>
              <div className="p-1.5 bg-cyan-100 dark:bg-cyan-500/10 rounded-full group-hover:bg-cyan-200 dark:group-hover:bg-cyan-500/20 transition-colors">
                <ScanSearch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{APP_NAME}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hidden md:block border border-slate-200 dark:border-slate-800/50 px-3 py-1 rounded-full bg-slate-50/50 dark:bg-slate-800/50">
                v1.3.0
              </div>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col relative z-10">
          {step === AppStep.HOME ? (
            <LandingPage onNavigate={handleNavigateMode} />
          ) : (
            <div className="flex-grow p-4 md:p-8 pb-20 pt-28 md:pt-32">
              <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                {step === AppStep.SETUP && (
                  <SetupForm mode={mode} onStart={handleStart} />
                )}

                {step === AppStep.GENERATING_QUESTIONS && (
                  <LoadingScreen text={`Generating tailored challenges for ${domain}...`} />
                )}
                
                {step === AppStep.GENERATING_REVISION && (
                  <LoadingScreen text={`Compiling rapid revision notes for ${domain}...`} />
                )}

                {step === AppStep.QUESTIONNAIRE && (
                  <Questionnaire questions={questions} onSubmit={handleAnalysis} />
                )}

                {step === AppStep.ANALYZING && (
                  <LoadingScreen text="Diagnosing conceptual gaps and mapping knowledge graph..." />
                )}

                {step === AppStep.RESULTS && analysisResult && (
                  <AnalysisDashboard result={analysisResult} onReset={() => setStep(AppStep.SETUP)} />
                )}

                {step === AppStep.REVISION_RESULTS && revisionResult && (
                   <RevisionDashboard result={revisionResult} onReset={() => setStep(AppStep.SETUP)} />
                )}
              </div>
            </div>
          )}
        </main>

        {/* Footer Nav */}
        <BottomNav 
          currentStep={step}
          currentMode={mode}
          onNavigateHome={handleNavigateHome}
          onNavigateMode={handleNavigateMode}
        />
      </div>
    </div>
  );
};

export default App;