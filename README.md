# 🤖 AI Teaching Platform

An AI-powered teaching assistant designed to enhance learning through intelligent explanations, interactive responses, and personalized support.

---

## 🚀 Overview

The AI Teaching Platform helps students learn concepts more effectively by providing real-time explanations, answering questions, and assisting with educational content using AI.

It acts as a **smart tutor** that is available anytime to guide learners.

---

## ✨ Features

### 📚 Intelligent Teaching Assistant
- Ask questions and get instant answers
- Concept-based explanations
- Simplified learning support

### 🧠 AI-Powered Responses
- Uses advanced AI models for accurate answers
- Context-aware responses
- Supports multiple topics (CS, AI, etc.)

### 💬 Interactive Learning
- Chat-based interface
- Continuous conversation flow
- Helps in doubt solving

### ⚡ Fast & User-Friendly UI
- Clean interface
- Easy navigation
- Real-time interaction

---

## 🛠️ Tech Stack

### Frontend
- React.js / Next.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### AI Integration
- OpenAI / Gemini API (if used)

### Database
- SQLite / Prisma

---

## 📂 Project Structure
AITeaching/
│── frontend/
│── backend/
│── components/
│── utils/
│── public/
│── README.md


---

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/prajwalpg/AITeaching.git
cd AITeaching

2️⃣Install Dependencies
npm install

3️⃣ Setup Environment Variables
Create a .env file:

DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your_key"
GEMINI_API_KEY="your_key"
4️⃣ Run the Project
npm run dev
