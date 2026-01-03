import { GoogleGenAI, Type } from "@google/genai";
import { 
  AnalysisResult, ExperienceLevel, Question, 
  RevisionResult, RevisionMode, TimeConstraint 
} from "../types";
import { CONCEPT_LENS_SYSTEM_PROMPT, REVISION_SYSTEM_PROMPT } from "../constants";

const apiKey = process.env.API_KEY || ""; 
const ai = new GoogleGenAI({ apiKey });

// Schema for Diagnosis Question Generation
const questionsSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          text: { type: Type.STRING },
        },
        required: ["id", "text"],
      },
    },
  },
  required: ["questions"],
};

// Schema for Diagnosis Analysis Result
const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    assessment: {
      type: Type.OBJECT,
      properties: {
        detectedDomain: { type: Type.STRING },
        estimatedRealLevel: { type: Type.STRING },
        confidenceVsDepthAssessment: { type: Type.STRING },
        skillScore: { type: Type.INTEGER, description: "A score from 0-100 representing depth of understanding" },
      },
      required: ["detectedDomain", "estimatedRealLevel", "confidenceVsDepthAssessment", "skillScore"],
    },
    strongAreas: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    identifiedGaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          conceptName: { type: Type.STRING },
          reason: { type: Type.STRING },
          evidence: { type: Type.STRING },
          consequences: { type: Type.STRING },
        },
        required: ["conceptName", "reason", "evidence", "consequences"],
      },
    },
    rootCauseAnalysis: { type: Type.STRING },
    learningRoadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepNumber: { type: Type.INTEGER },
          conceptName: { type: Type.STRING },
          reason: { type: Type.STRING },
          learningGoal: { type: Type.STRING },
          practiceType: { type: Type.STRING },
        },
        required: ["stepNumber", "conceptName", "reason", "learningGoal", "practiceType"],
      },
    },
    crossDomainTransfer: { type: Type.STRING },
    dailyFocusPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          focus: { type: Type.STRING },
          duration: { type: Type.STRING },
        },
        required: ["day", "focus", "duration"],
      },
    },
    reflectionPrompts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: [
    "assessment",
    "strongAreas",
    "identifiedGaps",
    "rootCauseAnalysis",
    "learningRoadmap",
    "crossDomainTransfer",
    "dailyFocusPlan",
    "reflectionPrompts",
  ],
};

// --- REVISION SCHEMAS ---

const techConceptsSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: ["CONCEPTS"] },
    domain: { type: Type.STRING },
    level: { type: Type.STRING },
    coreConcepts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          explanation: { type: Type.STRING },
          keyInsight: { type: Type.STRING },
          commonMistake: { type: Type.STRING },
        },
        required: ["name", "explanation", "keyInsight", "commonMistake"]
      }
    },
    quickRecallChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
    typicalMistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
    practiceQuestions: { 
      type: Type.ARRAY, 
      items: { 
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING }
        },
        required: ["question", "answer"]
      } 
    },
  },
  required: ["type", "domain", "level", "coreConcepts", "quickRecallChecklist", "typicalMistakes", "practiceQuestions"]
};

const techQuestionsSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: ["QUESTIONS"] },
    domain: { type: Type.STRING },
    level: { type: Type.STRING },
    frequentQuestions: { 
      type: Type.ARRAY, 
      items: { 
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING }
        },
        required: ["question", "answer"]
      } 
    },
    scenarioQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    followUpQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    interviewerEvaluationLens: {
      type: Type.OBJECT,
      properties: {
        depth: { type: Type.STRING },
        clarity: { type: Type.STRING },
        practicality: { type: Type.STRING },
      },
      required: ["depth", "clarity", "practicality"]
    }
  },
  required: ["type", "domain", "level", "frequentQuestions", "scenarioQuestions", "followUpQuestions", "interviewerEvaluationLens"]
};

const hrSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: ["HR"] },
    category: { type: Type.STRING },
    categoryOverview: { type: Type.STRING },
    commonQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    interviewerLookingFor: { type: Type.ARRAY, items: { type: Type.STRING } },
    strongAnswerFramework: { type: Type.STRING },
    commonMistakes: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["type", "category", "categoryOverview", "commonQuestions", "interviewerLookingFor", "strongAnswerFramework", "commonMistakes"]
};

// --- API CALLS ---

export const generateConceptualQuestions = async (
  domain: string,
  level: ExperienceLevel
): Promise<Question[]> => {
  try {
    const model = "gemini-3-flash-preview"; 
    const prompt = `Generate 3 deep, conceptual, non-trivial interview-style questions for a ${level} level candidate in the domain of ${domain}. 
    The questions should test underlying mental models, not syntax or memory.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionsSchema,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return parsed.questions || [];
  } catch (error) {
    console.error("Error generating questions:", error);
    return [
      { id: 1, text: "Describe a complex problem you solved in this domain and the trade-offs you made." },
      { id: 2, text: "Explain the fundamental architecture of a system you are familiar with." },
      { id: 3, text: "What happens under the hood when you execute a core operation in your preferred language?" },
    ];
  }
};

export const analyzeUserGaps = async (
  domain: string,
  level: ExperienceLevel,
  qaPairs: { question: string; answer: string }[]
): Promise<AnalysisResult | null> => {
  try {
    const model = "gemini-3-flash-preview"; 
    let qaString = "";
    qaPairs.forEach((qa, idx) => {
      qaString += `Q${idx + 1}: ${qa.question}\nA${idx + 1}: ${qa.answer}\n\n`;
    });

    const prompt = `
      User Domain: ${domain}
      User Claimed Level: ${level}
      User Responses: ${qaString}
      Perform the diagnosis as described in your system instructions.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: CONCEPT_LENS_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    if (!response.text) return null;
    return JSON.parse(response.text) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing gaps:", error);
    return null;
  }
};

export const generateRevisionContent = async (
  domain: string, // This is "Domain" for tech, "Category" for HR
  level: ExperienceLevel,
  mode: RevisionMode,
  timeConstraint: TimeConstraint,
  focusArea?: string
): Promise<RevisionResult | null> => {
  try {
    const model = "gemini-3-flash-preview";
    
    // Construct Prompt based on Mode
    let prompt = "";
    let schema: any = {};

    if (mode === RevisionMode.CONCEPTS) {
      prompt = `MODE: TECHNICAL CONCEPTS
      Domain: ${domain}
      Level: ${level}
      Time Constraint: ${timeConstraint}
      ${focusArea ? `Focus Area: ${focusArea}` : ""}
      Generate a concept revision sheet.
      IMPORTANT: Include 'practiceQuestions' - a list of 7-10 rapid-fire questions and short answers to test these concepts.`;
      schema = techConceptsSchema;

    } else if (mode === RevisionMode.QUESTIONS) {
      prompt = `MODE: TECHNICAL INTERVIEW QUESTIONS
      Domain: ${domain}
      Level: ${level}
      Time Constraint: ${timeConstraint}
      ${focusArea ? `Focus Area: ${focusArea}` : ""}
      Generate highly technical interview questions.
      IMPORTANT: For 'frequentQuestions', provide 7-10 questions with 'Senior Engineer' level model answers. 
      The answer should not be a dictionary definition. It must mention:
      1. Under-the-hood working
      2. Trade-offs or Edge cases
      3. A practical example
      Make the answers high-impact.`;
      schema = techQuestionsSchema;

    } else if (mode === RevisionMode.HR) {
      prompt = `MODE: HR & SOFT SKILLS
      Category: ${domain} 
      Time Constraint: ${timeConstraint}
      Generate HR preparation content.`;
      schema = hrSchema;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: REVISION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (!response.text) return null;
    const parsed = JSON.parse(response.text);
    
    // Inject type manually if the AI misses it (though schema enforces it)
    if (mode === RevisionMode.CONCEPTS) parsed.type = 'CONCEPTS';
    if (mode === RevisionMode.QUESTIONS) parsed.type = 'QUESTIONS';
    if (mode === RevisionMode.HR) parsed.type = 'HR';
    
    return parsed as RevisionResult;

  } catch (error) {
    console.error("Error generating revision content:", error);
    return null;
  }
};