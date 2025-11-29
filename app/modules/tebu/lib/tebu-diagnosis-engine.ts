import { DiagnosisRule, DiagnosisResult, Disease, Symptom } from '../types';

export class TebuDiagnosisEngine {
  private diseases: Disease[];
  private symptoms: Symptom[];
  private rules: DiagnosisRule[];

  constructor(diseases: Disease[], symptoms: Symptom[], rules: DiagnosisRule[]) {
    this.diseases = diseases;
    this.symptoms = symptoms;
    this.rules = rules;
  }

  /**
   * Run forward chaining diagnosis based on selected symptoms
   * @param selectedSymptomIds Array of symptom IDs selected by user
   * @returns Array of diagnosis results sorted by confidence
   */
  public diagnose(selectedSymptomIds: string[]): DiagnosisResult[] {
    const results: DiagnosisResult[] = [];
    const selectedSet = new Set(selectedSymptomIds);

    // Iterate through each rule
    for (const rule of this.rules) {
      const matchedSymptoms: string[] = [];
      let matchCount = 0;

      // Check how many symptoms match
      for (const symptomId of rule.symptoms) {
        if (selectedSet.has(symptomId)) {
          matchedSymptoms.push(symptomId);
          matchCount++;
        }
      }

      // Calculate confidence based on match percentage
      const matchPercentage = matchCount / rule.symptoms.length;
      const calculatedConfidence = Math.round(rule.confidence * matchPercentage);

      // If at least minimum symptoms are matched, add to results
      if (matchCount >= (rule.minSymptoms || 1) && calculatedConfidence > 0) {
        const disease = this.diseases.find(d => d.id === rule.diseaseId);
        
        if (disease) {
          results.push({
            disease,
            matchedSymptoms,
            confidence: calculatedConfidence,
            allSymptomsMatched: matchCount === rule.symptoms.length
          });
        }
      }
    }

    // Sort by confidence (highest first)
    return results.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Get symptom details by IDs
   */
  public getSymptomsByIds(symptomIds: string[]): Symptom[] {
    return this.symptoms.filter(s => symptomIds.includes(s.id));
  }

  /**
   * Get disease by ID
   */
  public getDiseaseById(diseaseId: string): Disease | undefined {
    return this.diseases.find(d => d.id === diseaseId);
  }

  /**
   * Get all symptoms grouped by category
   */
  public getSymptomsByCategory(): Record<string, Symptom[]> {
    return {
      akar: this.symptoms.filter(s => s.category === 'akar'),
      batang: this.symptoms.filter(s => s.category === 'batang'),
      daun: this.symptoms.filter(s => s.category === 'daun')
    };
  }

  /**
   * Validate if symptoms are sufficient for diagnosis
   */
  public validateSymptoms(symptomIds: string[]): {
    valid: boolean;
    message: string;
  } {
    if (symptomIds.length === 0) {
      return {
        valid: false,
        message: 'Pilih minimal 1 gejala untuk diagnosis'
      };
    }

    if (symptomIds.length < 2) {
      return {
        valid: true,
        message: 'Hasil diagnosis mungkin kurang akurat. Pilih lebih banyak gejala untuk hasil lebih baik.'
      };
    }

    return {
      valid: true,
      message: 'Gejala cukup untuk diagnosis'
    };
  }

  /**
   * Get related diseases by symptom
   */
  public getRelatedDiseases(symptomId: string): Disease[] {
    const relatedDiseaseIds = this.rules
      .filter(rule => rule.symptoms.includes(symptomId))
      .map(rule => rule.diseaseId);

    return this.diseases.filter(d => relatedDiseaseIds.includes(d.id));
  }
}
