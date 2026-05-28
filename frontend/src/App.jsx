import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, History, X, ArrowLeftRight } from "lucide-react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("fr");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const languages = [
    { code: "auto", name: "Auto Detect", flag: "🌍" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "tr", name: "Turkish", flag: "🇹🇷" },
    { code: "nl", name: "Dutch", flag: "🇳🇱" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "th", name: "Thai", flag: "🇹🇭" },
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
  ];

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported.");
    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang === "auto" ? "en-US" : sourceLang;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => setText(event.results[0][0].transcript);
    recognition.start();
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/translate", {
        text,
        source_language: sourceLang,
        target_language: targetLang,
      });
      setTranslated(res.data.translated_text);
      setHistory(prev => [...prev, { 
        original: text, 
        translated: res.data.translated_text, 
        source: sourceLang, 
        target: targetLang 
      }]);
    } catch (err) {
      alert("Backend not running!");
    } finally {
      setLoading(false);
    }
  };

  const speakTranslation = () => {
    if (!translated) return;
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = targetLang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const swapLanguages = () => {
    if (sourceLang === "auto") return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    if (translated) {
      setText(translated);
      setTranslated("");
    }
  };

  return (
    <div className="min-h-screen bg-[#05040f] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#4f46e530_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#22d3ee20_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.015]" />

      <div className="w-full max-w-[1100px] relative z-10">
        
        {/* Updated Title - VoxLingo AI */}
        <div className="text-center mb-12">
          <h1 className="text-7xl md:text-8xl font-bold leading-[1.2] pb-2 tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
  VoxLingo AI
</h1>
          <p className="text-cyan-400 text-2xl mt-3 flex items-center justify-center gap-3 font-medium">
            🌐 Real-Time Multilingual Communication ✨
          </p>
        </div>

        <div className="bg-zinc-950/95 border border-zinc-700/80 rounded-3xl p-10 shadow-2xl backdrop-blur-2xl">
          
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1">
              <p className="text-lg font-semibold text-white mb-3 tracking-widest">SOURCE LANGUAGE</p>
              <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-lg text-white outline-none focus:border-cyan-400 transition">
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={swapLanguages} className="mt-10 p-4 bg-zinc-900 border border-zinc-700 rounded-2xl hover:border-cyan-400 hover:scale-110 transition">
              <ArrowLeftRight size={28} className="text-cyan-400" />
            </button>

            <div className="flex-1">
              <p className="text-lg font-semibold text-white mb-3 tracking-widest">TARGET LANGUAGE</p>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-lg text-white outline-none focus:border-purple-400 transition">
                {languages.filter(l => l.code !== "auto").map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-cyan-400 text-2xl">✦</span>
                <p className="text-xl font-semibold text-white">ORIGINAL TEXT</p>
              </div>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full h-64 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 text-lg text-white outline-none resize-none focus:border-cyan-400 placeholder-zinc-500"
                />
                <button
                  onClick={startListening}
                  className={`absolute bottom-6 right-6 p-4 rounded-2xl transition-all shadow-lg border ${isListening 
                    ? 'bg-red-500 animate-pulse shadow-red-500/50 border-red-400' 
                    : 'bg-gradient-to-br from-violet-500 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 border-violet-400/50'}`}
                >
                  {isListening ? <MicOff size={26} /> : <Mic size={26} />}
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400 text-2xl">✦</span>
                <p className="text-xl font-semibold text-white">AI TRANSLATION</p>
              </div>
              <div className="relative h-64 bg-zinc-900 border border-zinc-700 rounded-3xl p-6 overflow-auto">
                {translated ? (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-lg leading-relaxed text-white"
                  >
                    {translated}
                  </motion.p>
                ) : (
                  <p className="text-zinc-500 italic">Translation will appear here...</p>
                )}

                {translated && (
                  <button
                    onClick={speakTranslation}
                    className="absolute bottom-6 right-6 p-4 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-teal-500 hover:to-cyan-600 rounded-2xl transition-all shadow-lg shadow-emerald-500/50 border border-emerald-400/30"
                  >
                    <Volume2 size={26} className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="mt-10 w-full py-6 text-xl font-semibold rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 active:scale-[0.985] transition-all disabled:opacity-70 text-white shadow-lg shadow-purple-500/30"
          >
            {loading ? "TRANSLATING..." : "Translate with AI"}
          </button>

          <button onClick={() => setShowHistory(true)} className="mt-6 mx-auto flex items-center gap-2 text-zinc-400 hover:text-white transition">
            <History size={20} /> View Translation History
          </button>
        </div>
      </div>

      {/* History Modal with Cross Symbol */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6"
          >
            <div className="bg-zinc-950 border border-zinc-700 rounded-3xl p-10 max-w-2xl w-full max-h-[85vh] overflow-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-white">Translation History</h2>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-zinc-400 hover:text-white transition"
                >
                  <X size={32} />
                </button>
              </div>

              {history.length === 0 ? (
                <p className="text-zinc-400 text-center py-20 text-lg">No translations yet.</p>
              ) : (
                history.map((item, i) => (
                  <div key={i} className="mb-8 p-7 bg-zinc-900/90 rounded-3xl border border-zinc-700">
                    <div className="text-cyan-400 text-sm mb-5 font-medium">
                      {item.source} → {item.target}
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">ORIGINAL</p>
                        <p className="text-[17px] leading-relaxed text-white">{item.original}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">TRANSLATED</p>
                        <p className="text-[17px] leading-relaxed text-cyan-300">{item.translated}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}