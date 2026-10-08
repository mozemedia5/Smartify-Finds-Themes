import { AISession, DiseaseDiagnosis, FarmContext } from '../types';
import { SAMPLE_DISEASES } from '../data/mockData';

const STORAGE_KEY_SESSIONS = 'agrisell_cofarmer_sessions_v1';

export class CoFarmerService {
  public static getSessions(): AISession[] {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  public static createSession(farmContext?: FarmContext): AISession {
    const sessions = this.getSessions();
    const newSession: AISession = {
      id: `session_${Date.now()}`,
      createdAt: new Date().toISOString(),
      farmContext,
      messages: [
        {
          id: `msg_init_${Date.now()}`,
          sender: 'assistant',
          text: 'Hello! I am CoFarmer AI, your intelligent agricultural assistant. I can diagnose crop diseases from images, answer farming questions, and calculate input requirements. How can I support your farm today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    const updated = [newSession, ...sessions];
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(updated));
    return newSession;
  }

  public static async analyzeImage(imageFileOrUrl: string, farmContext?: FarmContext): Promise<DiseaseDiagnosis> {
    // Simulated AI computer vision analysis with realistic outcome based on sample catalog or realistic uncertainty
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate inference delay

    const sample = SAMPLE_DISEASES[Math.floor(Math.random() * SAMPLE_DISEASES.length)];
    return {
      ...sample,
      id: `diag_${Date.now()}`,
      sampleImage: typeof imageFileOrUrl === 'string' ? imageFileOrUrl : sample.sampleImage,
      uncertaintyWarning: sample.confidence < 90
        ? 'Notice: Diagnostic confidence is moderate. Consider consulting a certified agronomist via AgriConnect for on-site field verification before applying chemical treatments.'
        : undefined
    };
  }

  public static async askQuestion(question: string, farmContext?: FarmContext): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const lower = question.toLowerCase();

    if (lower.includes('fertilizer') || lower.includes('npk') || lower.includes('urea')) {
      return `For baseline fertilizer application (${farmContext?.cropType || 'general crops'}), apply recommended 50kg/acre DAP or NPK at planting, followed by top-dressing with Urea 3-4 weeks after germination. Soil moisture should be sufficient during application.`;
    }
    if (lower.includes('pest') || lower.includes('worm') || lower.includes('spray')) {
      return `Pest Management Strategy: Inspect leaf undersides early morning. Combine biopesticides like neem oil with targeted approved insecticides if infestation severity is moderate to high. Always adhere to recommended harvest waiting intervals.`;
    }
    return `Regarding "${question}": For optimal yields in ${farmContext?.location || 'your zone'}, maintain recommended row spacing, practice early weeding, and ensure balanced soil nutrients. You can also connect with certified agronomists in AgriConnect for customized farm plans.`;
  }
}
