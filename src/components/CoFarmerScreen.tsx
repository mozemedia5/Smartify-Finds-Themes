import React, { useState } from 'react';
import { DiseaseDiagnosis, UserRole } from '../types';
import { SAMPLE_DISEASES } from '../data/mockData';
import {
  Send,
  Stethoscope,
  Calculator,
  Upload,
  ShieldAlert,
  CheckCircle,
  Sprout,
  RefreshCw,
  X,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface CoFarmerScreenProps {
  currentUserRole?: UserRole;
  setCurrentUserRole?: (role: UserRole) => void;
}

export const CoFarmerScreen: React.FC<CoFarmerScreenProps> = ({
  currentUserRole = 'farmer',
  setCurrentUserRole
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'crop_doctor' | 'calculators'>('chat');
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  // Gemini Style Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am CoFarmer, your agricultural assistant for Uganda. How can I assist with your crops, soil health, fertilizer calculations, or pest protection today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Crop Doctor Diagnosis state
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiseaseDiagnosis | null>(SAMPLE_DISEASES[0]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // Calculator states
  const [farmAcres, setFarmAcres] = useState<number>(2);
  const [selectedCropCalc, setSelectedCropCalc] = useState<'Maize' | 'Beans' | 'Coffee' | 'Tomatoes'>('Maize');

  // Restrict feature if user is strictly buyer
  if (currentUserRole === 'buyer') {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl mx-auto my-10 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <Sprout className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">CoFarmer is for Farmers, Experts & Sellers</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          You are currently in <strong>Buyer Mode</strong>. CoFarmer AI tools, crop disease diagnostics, and farm calculators are reserved for sellers, farmers, and agronomy experts.
        </p>
        <button
          onClick={() => setCurrentUserRole && setCurrentUserRole('farmer')}
          className="px-6 py-3 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-800 transition-all"
        >
          Switch to Farmer / Seller Mode
        </button>
      </div>
    );
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    // First time user sends a prompt, automatically hide onboarding divs
    if (showOnboarding) setShowOnboarding(false);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQ = inputQuery;
    setInputQuery('');
    setIsAiThinking(true);

    setTimeout(() => {
      let responseText = '';
      const qLower = currentQ.toLowerCase();

      if (qLower.includes('armyworm') || qLower.includes('worm') || qLower.includes('caterpillar')) {
        responseText = 'For Fall Armyworm in Maize: Apply Emamectin Benzoate (5% SG) at 10g/20L water sprayer into plant whorls. Alternatively, for organic farming, apply clean wood ash mixed with crushed chili into plant whorls early in the morning.';
      } else if (qLower.includes('fertilizer') || qLower.includes('npk') || qLower.includes('urea')) {
        responseText = 'For Uganda soils, recommended baseline for Maize is 50kg/acre of DAP/NPK at planting, followed by 50kg/acre Urea top-dressing at 4 weeks after emergence. Ensure soil moisture is adequate.';
      } else if (qLower.includes('coffee') || qLower.includes('wilt') || qLower.includes('rust')) {
        responseText = 'For Coffee Leaf Rust or Coffee Wilt Disease: Remove and burn infected branches immediately. Apply Copper Hydroxide (50% WP) preventative spray during rainy season transition.';
      } else {
        responseText = `Regarding "${currentQ}": Based on agricultural practices in Uganda, ensure proper crop spacing, early weeding within the first 3 weeks, and inspect leaf undersides for early pest activity. You can also consult our verified experts directory in AgriConnect!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 1000);
  };

  const handleSimulateDiagnosisUpload = (sampleIndex: number) => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setSelectedDiagnosis(SAMPLE_DISEASES[sampleIndex]);
      setIsDiagnosing(false);
    }, 900);
  };

  // Farm Calculations
  const calculateFertilizer = () => {
    switch (selectedCropCalc) {
      case 'Maize':
        return { dapBags: (farmAcres * 1).toFixed(1), ureaBags: (farmAcres * 1).toFixed(1), yieldEstimate: (farmAcres * 18).toFixed(0) };
      case 'Beans':
        return { dapBags: (farmAcres * 0.75).toFixed(1), ureaBags: (farmAcres * 0.5).toFixed(1), yieldEstimate: (farmAcres * 8).toFixed(0) };
      case 'Coffee':
        return { dapBags: (farmAcres * 1.5).toFixed(1), ureaBags: (farmAcres * 1.25).toFixed(1), yieldEstimate: (farmAcres * 12).toFixed(0) };
      case 'Tomatoes':
        return { dapBags: (farmAcres * 2).toFixed(1), ureaBags: (farmAcres * 1.5).toFixed(1), yieldEstimate: (farmAcres * 120).toFixed(0) };
    }
  };

  const calcResult = calculateFertilizer();

  return (
    <div className="space-y-6 pb-20">
      {/* Cool, Clean Google Gemini App-Styled Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center space-x-3">
          {/* Minimal CoFarmer Icon (Good & Minimal, Not Big) */}
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">CoFarmer</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Agricultural intelligence, crop diagnostics & farm input calculators for Uganda.
            </p>
          </div>
        </div>

        {/* Clean Pill Sub Navigation Tabs */}
        <div className="flex items-center bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'chat' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Assistant</span>
          </button>

          <button
            onClick={() => setActiveSubTab('crop_doctor')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'crop_doctor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Crop Doctor</span>
          </button>

          <button
            onClick={() => setActiveSubTab('calculators')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'calculators' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculators</span>
          </button>
        </div>
      </div>

      {/* SUB TAB 1: GEMINI THEMED ASSISTANT CHAT */}
      {activeSubTab === 'chat' && (
        <div className="space-y-4">
          {/* First-Time User Onboarding Guidance Div (Removable/Dismissible) */}
          {showOnboarding && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-start justify-between gap-3 text-xs text-emerald-900 relative">
              <div className="flex items-start space-x-3">
                <Sprout className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-emerald-900">Welcome to CoFarmer</h4>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">
                    Ask questions about crop diseases, recommended fertilizers for Uganda soils, planting schedules, or weather advisories.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOnboarding(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                title="Dismiss Onboarding"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Gemini Style Chat Window - Spacious, Big Page Area */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[580px]">
            {/* Message Feed Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 max-w-2xl ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-slate-700 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {msg.sender === 'user' ? 'You' : <Sprout className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className={`block text-[10px] mt-2 text-right ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center space-x-2 text-xs text-emerald-400 italic">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                  <span>CoFarmer is generating answer...</span>
                </div>
              )}
            </div>

            {/* BIG PROMPT SUGGESTION PILLS (Gemini Style) */}
            <div className="bg-slate-900 border-t border-slate-800 p-3.5 px-6 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Popular Prompt Suggestions:</span>
              <div className="flex items-center space-x-2 pb-1 scrollbar-none">
                {[
                  'How to treat Fall Armyworm in Maize?',
                  'Best fertilizer rate for 2 acres Beans in Uganda?',
                  'How to prevent Coffee Wilt & Leaf Rust disease?',
                  'What is the ideal spacing for grafted orange seedlings?'
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInputQuery(q); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-emerald-950/80 text-slate-200 border border-slate-700 hover:border-emerald-600 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1"
                  >
                    <span>{q}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Spacious Gemini Input Field */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask CoFarmer anything about crops, soil health, fertilizers, livestock..."
                className="flex-1 p-3.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-2xl shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUB TAB 2: CROP DOCTOR DIAGNOSTICS */}
      {activeSubTab === 'crop_doctor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Upload & Sample Selector Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-rose-500" />
                <span>Crop Disease Image Diagnosis</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload or select an affected crop leaf photo to analyze symptoms.
              </p>
            </div>

            {/* Drag Drop Box */}
            <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Upload affected plant leaf image</p>
                <p className="text-[10px] text-slate-500">Supports JPG, PNG up to 10MB</p>
              </div>
              <button className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm">
                Browse Photos
              </button>
            </div>

            {/* Preloaded Sample Leaf Images for Instant Test */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Or test with preloaded crop samples:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSimulateDiagnosisUpload(0)}
                  className="p-2 border border-slate-200 rounded-xl hover:border-emerald-500 flex items-center space-x-2 text-left bg-slate-50"
                >
                  <img src={SAMPLE_DISEASES[0].sampleImage} alt="Maize" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Maize Sample</p>
                    <p className="text-[10px] text-slate-500">Armyworm damage</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSimulateDiagnosisUpload(1)}
                  className="p-2 border border-slate-200 rounded-xl hover:border-emerald-500 flex items-center space-x-2 text-left bg-slate-50"
                >
                  <img src={SAMPLE_DISEASES[1].sampleImage} alt="Tomato" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Tomato Sample</p>
                    <p className="text-[10px] text-slate-500">Early Blight</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Diagnosis Results Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            {isDiagnosing ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-xs font-bold text-slate-700">Analyzing plant image...</p>
              </div>
            ) : selectedDiagnosis ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                      Severity: {selectedDiagnosis.severity}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedDiagnosis.diseaseName}</h3>
                    <p className="text-xs text-slate-500">Target Crop: {selectedDiagnosis.cropName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-semibold">Match Rate</span>
                    <p className="text-base font-black text-emerald-700">{selectedDiagnosis.confidence}%</p>
                  </div>
                </div>

                {/* Organic Treatment */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-emerald-900 flex items-center space-x-1">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    <span>Organic & Natural Treatments</span>
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {selectedDiagnosis.organicTreatment.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Treatment */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>Recommended Agrochemicals (Uganda Approved)</span>
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {selectedDiagnosis.chemicalTreatment.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Prevention Steps */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-slate-600" />
                    <span>Prevention Protocol</span>
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                    {selectedDiagnosis.prevention.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* SUB TAB 3: FARM CALCULATOR TOOLS */}
      {activeSubTab === 'calculators' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm max-w-2xl mx-auto space-y-5">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-emerald-700" />
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Uganda Smart Farm Input Estimator</h2>
              <p className="text-xs text-slate-500">Calculate exact fertilizer bags and expected crop yields for your land size.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Crop</label>
              <select
                value={selectedCropCalc}
                onChange={(e) => setSelectedCropCalc(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
              >
                <option value="Maize">Maize (Corn)</option>
                <option value="Beans">Beans (Nambale / Yellow)</option>
                <option value="Coffee">Coffee (Robusta / Arabica)</option>
                <option value="Tomatoes">Tomatoes (Greenhouse/Field)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Farm Size (Acres)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={farmAcres}
                onChange={(e) => setFarmAcres(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Output Estimation Cards */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border border-emerald-200/60 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">DAP / NPK Fertilizer</span>
              <p className="text-xl font-black text-emerald-900 mt-1">{calcResult?.dapBags} <span className="text-xs font-normal">Bags (50kg)</span></p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200/60 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">Urea Top-Dress</span>
              <p className="text-xl font-black text-emerald-900 mt-1">{calcResult?.ureaBags} <span className="text-xs font-normal">Bags (50kg)</span></p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200/60 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500">Estimated Yield</span>
              <p className="text-xl font-black text-emerald-900 mt-1">{calcResult?.yieldEstimate} <span className="text-xs font-normal">Bags</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
