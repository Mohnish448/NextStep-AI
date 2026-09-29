# NextStep AI

**NextStep AI + Karina AI** is a combined repository containing two applications focused on AI-assisted career planning and a personal AI assistant.

## Projects

### 1. NextStep AI

NextStep AI is a career-roadmap web application designed to help users explore career paths and generate personalized roadmaps.

**Technologies:**

* Next.js (App Router)
* JavaScript / JSX
* Firebase
* Next.js API Routes

**Features:**

* AI-powered career roadmap generation
* Interactive dashboard
* Career roadmap history
* User profile and settings
* Roadmap PDF page
* Karina AI chat interface

### 2. Karina AI

Karina is a personal AI assistant project inspired by virtual assistants such as JARVIS. It has a Python backend and is designed to support conversational AI capabilities.

**Technologies:**

* Python
* FastAPI
* Ollama (local LLM integration)
* Environment-based configuration

**Features:**

* AI assistant orchestration
* Conversational AI
* Local model integration
* Modular Python backend

## Repository Structure

```text
NextStep-AI/
│
├── .gitignore
│
├── karinaAI/
│   ├── main.py
│   ├── karina.py
│   └── requrements.txt
│
└── nextstep/
    ├── app/
    │   ├── api/
    │   ├── dashboard/
    │   ├── FreeTrial/
    │   └── ...
    │
    ├── public/
    ├── package.json
    ├── package-lock.json
    └── README.md
```

## Installation and Setup

Both applications run independently.

### Prerequisites

* Python 3.13 or compatible version
* Node.js and npm
* Git
* Ollama (if using local LLM functionality)

### 1. Clone the Repository

```bash
git clone https://github.com/Mohnish448/NextStep-AI.git
cd NextStep-AI
```

### 2. Set Up NextStep AI

```bash
cd nextstep
npm install
```

Configure the required environment variables in a local `.env.local` file.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Set Up Karina AI

Open a separate terminal and navigate to the project directory:

```bash
cd karinaAI
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install -r requrements.txt
```

Configure the required environment variables in a local `.env` file.

Start the application using the appropriate command for the FastAPI application in `main.py`.

## Environment Variables

Both applications may require environment variables for external services.

* Keep API keys and credentials in local environment files.
* Never commit real API keys, tokens, or passwords.
* Use placeholder values in `.env.example` files when documenting configuration.
* Revoke and replace any credentials that are accidentally exposed.

## Development

* `nextstep/` contains the Next.js frontend and its API routes.
* `karinaAI/` contains the Python-based AI assistant.
* Each application has its own dependencies and development workflow.
* Generated files, local secrets, and dependency folders should not be committed.

## Author

**Mohnish**

GitHub: [@Mohnish448](https://github.com/Mohnish448)

## License

No license has been specified for this repository. All rights remain with the author unless a license is added.
