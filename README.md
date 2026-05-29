🌐 VoxLingo AI Translator
An intelligent full-stack AI-powered language translation web application built using FastAPI (backend) and React (frontend).
VoxLingo enables real-time text translation between multiple languages with a clean, modern UI.

📸 Screenshot
<img width="1780" height="949" alt="image" src="https://github.com/user-attachments/assets/e895dbcf-be00-4259-bafe-afadf16b545f" />

🚀 Features
⚡ Real-time text translation
🌍 Supports multiple languages
🎙️ Voice input support (if implemented)
🔊 Text-to-speech output (if implemented)
🔄 Instant language switching
📜 Translation history (optional feature)
🎨 Clean and responsive UI
⚡ Fast API-based backend processing
🔐 Secure and lightweight architecture

🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Vite / Next.js (if used), Tailwind CSS (if used)
Backend	FastAPI, Python
API	Google Translate API / googletrans
Others	CORS Middleware, Uvicorn

📁 Project Structure
voxlingo-ai/
│
├── backend/
│   ├── main.py              # FastAPI backend entry
│   ├── requirements.txt     # Python dependencies
│   └── venv/                # Virtual environment (not pushed to GitHub)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main UI
│   │   └── components/
│   ├── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/voxlingo-ai.git
cd voxlingo-ai

2️⃣ Backend Setup (FastAPI)
cd backend

# create virtual environment (optional)
python -m venv venv
venv\Scripts\activate   # Windows

# install dependencies
pip install -r requirements.txt

# run server
uvicorn main:app --reload

Backend runs at:
👉 http://127.0.0.1:8000

3️⃣ Frontend Setup (React)
cd frontend

npm install
npm run dev

Frontend runs at:
👉 http://localhost:5173

🔌 API Endpoint
Translate Text
POST /translate

Request Body:

{
  "text": "Hello",
  "source_lang": "en",
  "target_lang": "hi"
}

Response:

{
  "translated_text": "नमस्ते"
}

🧠 Key Concepts Used
REST API design using FastAPI
CORS handling for frontend-backend communication
Language translation via Google Translate API / googletrans
React state management for live UI updates
JSON-based request/response system

📌 Future Improvements
🌐 Speech-to-speech translation
📱 Mobile responsive PWA version
🤖 AI-powered contextual translation (LLM-based)
💾 Save translation history in database
🔐 User authentication system
👨‍💻 Author

Aarya Damera
B.Tech Student | AI & Full Stack Developer
Passionate about AI, LLMs & real-world applications

⭐ If you like this project
Give it a ⭐ on GitHub and feel free to contribute!
