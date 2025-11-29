// Types for Sugarcane Disease Expert System

export interface Symptom {
  id: string;
  code: string;
  name: string;
  category: 'akar' | 'batang' | 'daun';
  description?: string;
}

export interface Disease {
  id: string;
  code: string;
  name: string;
  type: 'hama' | 'penyakit';
  latinName?: string;
  description: string;
  causes: string;
  symptoms: string[];
  solutions: string[];
  prevention: string[];
  severity: 'ringan' | 'sedang' | 'berat';
  imageUrl?: string;
}

export interface DiagnosisRule {
  id: string;
  diseaseId: string;
  symptoms: string[]; // symptom IDs
  minSymptoms?: number; // minimum symptoms needed for diagnosis
  confidence: number; // 0-100
}

export interface DiagnosisResult {
  disease: Disease;
  matchedSymptoms: string[];
  confidence: number;
  allSymptomsMatched: boolean;
}

export interface ConsultationHistory {
  id: string;
  date: Date;
  selectedSymptoms: string[];
  diagnosis: DiagnosisResult[];
  userInfo?: {
    name?: string;
    location?: string;
    phone?: string;
  };
}

export interface ConsultationSession {
  symptoms: string[];
  currentStep: number;
  results: DiagnosisResult[];
}
