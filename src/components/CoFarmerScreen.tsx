import React, { useState } from 'react';
import { UserRole, DiseaseDiagnosis, FarmContext } from '../types';
import { CoFarmerService } from '../services/coFarmerService';
import {
  Bot,
  Send,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sprout,
  HelpCircle,
  FileText,
  RotateCcw
} from 'lucide-react';

interface CoFarmerScreenProps {
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
}

interface MessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  imageUrl?: string;
  diagnosis?: DiseaseDiagnosis;
}

export const CoFarmerScreen: React.FC<CoFarmerScreenProps> = ({
  currentUserRole,
  setCurrentUserRole
}) => {
  const [farmContext, setFarmContext] = useState<FarmContext>({
    cropType: 'Maize & Coffee',
    acreage: '2 Acres',
    location: 'Central Agricultural Zone',
    farmingMethod: 'Mixed'
  });

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello! I am CoFarmer AI, your agricultural advisory assistant. Upload an image of an unhealthy leaf, pest, or crop, or ask any question about soil nutrition, planting schedules, or disease management.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMsg: MessageItem = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: inputText,
      imageUrl: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setIsAnalyzing(true);

    if (currentImg) {
      const diag = await CoFarmerService.analyzeImage(currentImg, farmContext);
      const aiResponse: MessageItem = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: `Based on computer vision analysis of the uploaded crop image, I have identified a probable diagnosis:`,
        diagnosis: diag,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiResponse]);
    } else {
      const textResponse = await CoFarmerService.askQuestion(userMsg.text, farmContext);
      const aiResponse: MessageItem = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: textResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiResponse]);
    }

    setIsAnalyzing(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/50 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black">CoFarmer AI Assistant</h1>
            <p className="text-xs text-emerald-200">
              Conversational intelligence, leaf diagnostic computer vision & agronomic advice
            </p>
          </div>
        </div>

        {/* Farm Context Bar */}
        <div className="bg-emerald-800/60 border border-emerald-600/40 p-3 rounded-2xl text-xs space-y-1">
          <span className="font-bold text-amber-300 flex items-center space-x-1">
            <Sprout className="w-3.5 h-3.5" />
            <span>Farm Context Configured</span>
          </span>
          <p className="text-emerald-100">
            {farmContext.cropType} • {farmContext.acreage} • {farmContext.location}
          </p>
        </div>
      </div>

      {/* Main Conversational Layout */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Messages Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl rounded-2xl p-4 space-y-2 ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-slate-50 text-slate-900 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] opacity-70">
                  <span className="font-bold">{m.sender === 'user' ? 'You' : 'CoFarmer AI'}</span>
                  <span>{m.timestamp}</span>
                </div>

                {m.imageUrl && (
                  <img src={m.imageUrl} alt="Uploaded crop" className="w-48 h-36 object-cover rounded-xl bg-slate-200" />
                )}

                {m.text && <p className="leading-relaxed whitespace-pre-line">{m.text}</p>}

                {/* Structured Diagnosis Output */}
                {m.diagnosis && (
                  <div className="bg-white text-slate-800 p-4 rounded-xl border border-emerald-200 space-y-3 mt-2 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">{m.diagnosis.cropName}</span>
                        <h4 className="font-bold text-sm text-slate-900">{m.diagnosis.diseaseName}</h4>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full text-[10px]">
                        {m.diagnosis.confidence}% Confidence
                      </span>
                    </div>

                    {/* Uncertainty warning if confidence is lower */}
                    {m.diagnosis.uncertaintyWarning && (
                      <div className="bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200 text-[10px] flex items-start space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{m.diagnosis.uncertaintyWarning}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <strong className="font-bold text-slate-900 block text-[11px]">Observed Symptoms:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {m.diagnosis.symptoms.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <strong className="font-bold text-emerald-800 block text-[11px]">Organic & Biological Remedies:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {m.diagnosis.organicTreatment.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <strong className="font-bold text-indigo-800 block text-[11px]">Chemical Controls:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {m.diagnosis.chemicalTreatment.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-slate-500 text-xs flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>CoFarmer AI is analyzing image and agronomic dataset...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col space-y-2">
          {selectedImage && (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-500">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] p-0.5"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="p-2.5 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 cursor-pointer">
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about fertilizer ratios, leaf spots, pest control, or weather guidance..."
              className="flex-1 p-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
            />

            <button
              onClick={handleSendMessage}
              className="bg-emerald-700 hover:bg-emerald-800 text-white p-2.5 rounded-xl shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
