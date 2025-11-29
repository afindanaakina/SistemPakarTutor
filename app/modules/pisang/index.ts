/**
 * MODUL SISTEM PAKAR PISANG
 * ==============================================
 * Export point utama untuk modul sistem pakar diagnosis
 * penyakit dan hama pada tanaman pisang.
 *
 * Modul ini menyediakan:
 * - Types: Definisi tipe data TypeScript
 * - Data: Knowledge base (gejala, penyakit, aturan)
 * - Engine: Mesin inferensi untuk diagnosis
 *
 * @module modules/pisang
 */

// ============================================
// TYPES - Definisi Tipe Data
// ============================================
export type {
  PisangSymptom,
  PisangDisease,
  PisangDiagnosisRule,
  PisangDiagnosisResult,
  SymptomCategory,
  ConfidenceCategory
} from './types';

// ============================================
// DATA - Knowledge Base
// ============================================

/**
 * Data gejala (symptoms)
 * 30 gejala yang dikategorikan berdasarkan bagian tanaman:
 * - Akar (5 gejala)
 * - Batang (12 gejala)
 * - Daun (13 gejala)
 * - Buah (6 gejala)
 */
export { pisangSymptoms, symptomCategories } from './data/pisang-symptoms';

/**
 * Data penyakit dan hama (diseases)
 * 10 entitas terdiri dari:
 * - 5 Penyakit (bacterial, fungal, viral)
 * - 5 Hama (serangga, nematoda)
 */
export { pisangDiseases } from './data/pisang-diseases';

/**
 * Aturan diagnosis (rules)
 * Mapping gejala ke penyakit/hama dengan confidence level
 */
export { pisangRules } from './data/pisang-rules';

// ============================================
// ENGINE - Mesin Inferensi
// ============================================

/**
 * PisangDiagnosisEngine
 * Mesin diagnosis menggunakan metode forward chaining
 * untuk mencocokkan gejala dengan penyakit/hama
 */
export { PisangDiagnosisEngine } from './lib/pisang-diagnosis-engine';

/**
 * Instance siap pakai dari engine
 * Sudah ter-inisialisasi dengan semua data
 */
export { pisangEngine } from './lib/pisang-diagnosis-engine';
