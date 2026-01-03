# ConceptLens AI 🧠

**ConceptLens AI** is an advanced learning gap diagnosis and skill-mapping assistant. Unlike standard tutors or chatbots, ConceptLens acts as a senior technical mentor. It analyzes user responses to conceptual questions to detect hidden prerequisite gaps, misconceptions, and weak foundations, generating personalized learning roadmaps.

![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## 🚀 Features

### 1. 🔍 Deep Skill Diagnosis
*   **Conceptual Analysis:** Goes beyond syntax to test underlying mental models.
*   **Gap Detection:** Identifies missing prerequisites, incorrect assumptions, and false confidence.
*   **Root Cause Analysis:** Explains *why* you are struggling (e.g., memorization without understanding).
*   **Knowledge Graph Inference:** Maps how gaps in one area affect advanced topics.

### 2. ⚡ Rapid Revision
*   **Last-Minute Prep:** Condensed, high-impact notes tailored for interview preparation in minutes.
*   **Level-wise Content:** Adjusts depth for Basic (Definitions), Intermediate (Trade-offs), or Expert (System Design) levels.
*   **Common Pitfalls:** Highlights specific mistakes developers make at your specific seniority level.
*   **"Think Like an Interviewer":** Provides deep reasoning challenges to sharpen your intuition.

### 3. 🗺️ Personalized Roadmaps
*   **Step-by-Step Learning:** Prioritized list of concepts to learn based on dependencies.
*   **7-Day Micro-Focus Plan:** Actionable daily tasks to fix identified gaps.
*   **Cross-Domain Transfer:** Explains how fixing a gap in one domain helps you in others.

## 🛠️ Tech Stack

*   **Frontend:** React (v19), TypeScript
*   **Styling:** Tailwind CSS
*   **AI Engine:** Google Gemini API (`@google/genai`)
*   **Visualization:** Recharts
*   **Icons:** Lucide React
*   **Tooling:** ES Modules / ESM.sh (No-build capable)

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   A Google Cloud Project with the **Gemini API** enabled.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/conceptlens-ai.git
    cd conceptlens-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```bash
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the Application**
    ```bash
    npm start
    # or
    npm run dev
    ```

## 📂 Project Structure

```
/
├── components/          # UI Components
│   ├── AnalysisDashboard.tsx  # Visualization of diagnosis results
│   ├── LandingPage.tsx        # Main Home screen
│   ├── Questionnaire.tsx      # Chat/Input interface
│   ├── RevisionDashboard.tsx  # Revision notes display
│   └── ...
├── services/            # API integrations
│   └── geminiService.ts       # Google GenAI interaction logic
├── types.ts             # TypeScript interfaces and enums
├── constants.ts         # System prompts and configuration
├── App.tsx              # Main application controller
└── index.tsx            # Entry point
```

## 🧠 System Prompts

ConceptLens uses specialized system instructions to ensure the AI behaves like a mentor, not a generic LLM.
*   **Diagnosis Prompt:** Focuses on inferring what the user *doesn't* know based on what they *do* say.
*   **Revision Prompt:** Focuses on conciseness, trade-offs, and interview relevance.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

**Note:** This application relies on the `process.env.API_KEY` being available. Ensure your execution environment handles secret injection securely.
