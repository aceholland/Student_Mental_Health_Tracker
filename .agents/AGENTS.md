# AGENTS.md

Welcome to the project repository guide for AI agents and developer reference.

---

## 📌 Project Overview
- **Name**: ZenPulse
- **Type**: React Web Application (Vite + TypeScript + Tailwind CSS)
- **Port**: Runs on `http://localhost:3000` (`0.0.0.0:3000`)

---

## 🛠️ Stack & Technologies
- **Frontend Framework**: React 19 (`react`, `react-dom`)
- **Build Tool / Bundler**: Vite 6 (`vite`)
- **Language**: TypeScript (`~5.8.2`)
- **Styling**: Tailwind CSS (`@tailwindcss/vite`, `tailwindcss` v4)
- **Icons & Animations**: Lucide React (`lucide-react`), Motion (`motion`), Canvas Confetti (`canvas-confetti`)
- **Backend / AI Integration**: Express (`express`), `@google/genai`

---

## ⚙️ Development Commands
```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Type check / Linting
npm run lint

# Production build
npm run build
```

---

## 💡 Learnings & Technical Notes

### Server & Ports
- The development server command is set in `package.json` as `vite --port=3000 --host=0.0.0.0`.
- Access the app locally at: **`http://localhost:3000`**

### Dependencies & Setup
- Always ensure `npm install` has been run before executing `npm run dev` in fresh environments.

---

## 📝 Guidelines for AI Agents
1. **State Preservation**: Preserve existing components and clean modular structure in `src/`.
2. **Styling**: Tailor UI design according to standard CSS / Tailwind conventions established in the project.
3. **Execution**: When running dev servers locally, monitor for missing `node_modules` or missing binaries before executing scripts.
