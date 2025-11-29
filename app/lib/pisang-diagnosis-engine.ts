// Forward Chaining Engine untuk Diagnosis Penyakit Pisang
import { pisangDiseases } from '../data/pisang-diseases';
import { pisangRules } from '../data/pisang-rules';

export interface DiagnosisResult {
  disease_id: string;
  disease_name: string;
  type: 'penyakit' | 'hama';
  confidence: number;
  matched_symptoms: string[];
  total_symptoms: number;
}

export class PisangDiagnosisEngine {
  /**
   * Melakukan diagnosis berdasarkan gejala yang dipilih
   * Menggunakan metode Forward Chaining:
   * 1. Mulai dari gejala yang terlihat
   * 2. Cari aturan yang cocok dengan gejala
   * 3. Temukan penyakit berdasarkan aturan
   */
  diagnose(selectedSymptoms: string[]): DiagnosisResult[] {
    if (selectedSymptoms.length === 0) {
      return [];
    }

    const results: DiagnosisResult[] = [];

    // Cek setiap aturan diagnosis
    for (const rule of pisangRules) {
      // Hitung berapa gejala yang cocok
      const matchedSymptoms = rule.symptoms.filter(s => 
        selectedSymptoms.includes(s)
      );

      // Jika gejala cocok mencukupi syarat minimum
      if (matchedSymptoms.length >= rule.min_symptoms) {
        // Hitung confidence berdasarkan jumlah gejala yang cocok
        const matchRatio = matchedSymptoms.length / rule.symptoms.length;
        const finalConfidence = rule.confidence * matchRatio;

        // Cari data penyakit
        const disease = pisangDiseases.find(d => d.id === rule.disease_id);
        if (!disease) continue;

        // Cek apakah penyakit ini sudah ada di hasil
        const existingIndex = results.findIndex(r => r.disease_id === disease.id);

        if (existingIndex >= 0) {
          // Update jika confidence lebih tinggi
          if (finalConfidence > results[existingIndex].confidence) {
            results[existingIndex] = {
              disease_id: disease.id,
              disease_name: disease.name,
              type: disease.type,
              confidence: finalConfidence,
              matched_symptoms: matchedSymptoms,
              total_symptoms: rule.symptoms.length
            };
          }
        } else {
          // Tambah hasil diagnosis baru
          results.push({
            disease_id: disease.id,
            disease_name: disease.name,
            type: disease.type,
            confidence: finalConfidence,
            matched_symptoms: matchedSymptoms,
            total_symptoms: rule.symptoms.length
          });
        }
      }
    }

    // Urutkan berdasarkan confidence (tertinggi ke terendah)
    return results.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Mendapatkan detail penyakit berdasarkan ID
   */
  getDiseaseDetail(diseaseId: string) {
    return pisangDiseases.find(d => d.id === diseaseId);
  }

  /**
   * Mendapatkan semua penyakit
   */
  getAllDiseases() {
    return pisangDiseases;
  }

  /**
   * Format confidence menjadi persentase
   */
  formatConfidence(confidence: number): string {
    return `${Math.round(confidence * 100)}%`;
  }

  /**
   * Mendapatkan kategori berdasarkan confidence
   */
  getConfidenceCategory(confidence: number): {
    label: string;
    color: string;
  } {
    if (confidence >= 0.8) {
      return { label: 'Sangat Mungkin', color: 'red' };
    } else if (confidence >= 0.6) {
      return { label: 'Kemungkinan Besar', color: 'orange' };
    } else if (confidence >= 0.4) {
      return { label: 'Mungkin', color: 'yellow' };
    } else {
      return { label: 'Kemungkinan Kecil', color: 'gray' };
    }
  }
}

// Export singleton instance
export const pisangEngine = new PisangDiagnosisEngine();
