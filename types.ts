export enum ExperienceLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export enum AppMode {
  DIAGNOSIS = "DIAGNOSIS",
  REVISION = "REVISION"
}

export enum RevisionMode {
  CONCEPTS = "Technical Concepts",
  QUESTIONS = "Technical Interview Questions",
  HR = "HR & Soft Skills"
}

export enum TimeConstraint {
  MIN_15 = "15 minutes",
  MIN_30 = "30 minutes",
  MIN_60 = "60 minutes"
}

export interface Question {
  id: number;
  text: string;
}

export interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
}

export interface Gap {
  conceptName: string;
  reason: string;
  evidence: string;
  consequences: string;
}

export interface RoadmapStep {
  stepNumber: number;
  conceptName: string;
  reason: string;
  learningGoal: string;
  practiceType: string;
}

export interface DailyFocus {
  day: number;
  focus: string;
  duration: string;
}

export interface AnalysisResult {
  assessment: {
    detectedDomain: string;
    estimatedRealLevel: string;
    confidenceVsDepthAssessment: string;
    skillScore: number; // 0-100 for visualization
  };
  strongAreas: string[];
  identifiedGaps: Gap[];
  rootCauseAnalysis: string;
  learningRoadmap: RoadmapStep[];
  crossDomainTransfer: string;
  dailyFocusPlan: DailyFocus[];
  reflectionPrompts: string[];
}

// --- Revision Specific Types ---

export interface RevisionConcept {
  name: string;
  explanation: string;
  keyInsight: string;
  commonMistake: string;
}

export interface TechConceptsResult {
  type: 'CONCEPTS';
  domain: string;
  level: string;
  coreConcepts: RevisionConcept[];
  quickRecallChecklist: string[];
  typicalMistakes: string[];
  practiceQuestions: { question: string; answer: string }[];
}

export interface TechQuestionsResult {
  type: 'QUESTIONS';
  domain: string;
  level: string;
  frequentQuestions: { question: string; answer: string }[];
  scenarioQuestions: string[];
  followUpQuestions: string[];
  interviewerEvaluationLens: {
    depth: string;
    clarity: string;
    practicality: string;
  };
}

export interface HRResult {
  type: 'HR';
  category: string;
  categoryOverview: string;
  commonQuestions: string[];
  interviewerLookingFor: string[];
  strongAnswerFramework: string;
  commonMistakes: string[];
}

export type RevisionResult = TechConceptsResult | TechQuestionsResult | HRResult;

export enum AppStep {
  HOME,
  SETUP,
  GENERATING_QUESTIONS, // Used for Diagnosis
  GENERATING_REVISION,  // Used for Revision
  QUESTIONNAIRE,
  ANALYZING,
  RESULTS,
  REVISION_RESULTS // Display Revision
}