# 🌐 VoxLingo AI Translator

A full-stack AI-powered real-time language translation web application built using **FastAPI (Python)** and **React.js** with a modern and responsive UI.

---

## 📸 Preview
<img width="1780" height="949" alt="voxlingo" src="https://github.com/user-attachments/assets/00367ea8-1afe-48cc-a6ef-9672c4cb1762" />


---

## 🚀 Features

- ⚡ Real-time text translation  
- 🌍 Multi-language support  
- 🔄 Instant language switching  
- 🎯 Fast and lightweight FastAPI backend  
- 🎨 Clean and responsive UI  
- 🔗 Seamless frontend–backend communication  
- 📡 API-based architecture  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Vite  
- CSS / Tailwind (if used)

### Backend
- FastAPI  
- Python  
- Uvicorn  

### API
- Google Translate API / googletrans  

---

## 📁 Project Structure

```bash
voxlingo-ai/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/ (ignored)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   ├── package.json
│
└── README.md
``` 
## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
``` bash 
git clone https://github.com/your-username/voxlingo-ai.git
cd voxlingo-ai
```
### 2️⃣ Backend Setup
``` bash
cd backend

python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt

uvicorn main:app --reload
```
Backend runs at: http://127.0.0.1:8000

### 3️⃣ Frontend setup
``` bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

## 🔌 API Endpoint
Translate Text
POST /translate

Request
{
  "text": "Hello",
  "source_lang": "en",
  "target_lang": "hi"
}
Response
{
  "translated_text": "नमस्ते"
}

## 🧠 Key Learnings
- FastAPI backend development
- React state management
- API integration (frontend ↔ backend)
- CORS handling
- Real-time UI updates
- Full-stack project architecture

## 📌 Future Improvements
- 🎙️ Voice input & output support
- 🤖 AI-powered contextual translation
- 💾 Save translation history
- 📱 Mobile PWA version
- 🔐 Authentication system
- 🌐 Live deployment


## 👨‍💻 Author
Aarya Damera
B.Tech Student | AI & Full Stack Developer
Passionate about AI, LLMs, and real-world applications

## ⭐ Support
If you like this project, consider giving it a ⭐ on GitHub.
