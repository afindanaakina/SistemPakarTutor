/**
 * SISTEM PAKAR TEBU - Main Export Point
 * ===============================================
 *
 * File ini adalah titik masuk utama untuk modul sistem pakar tebu.
 * Mengekspor semua komponen yang diperlukan untuk diagnosis penyakit
 * dan hama pada tanaman tebu.
 *
 * @example
 * ```typescript
 * // Import semua yang diperlukan
 * import { tebuEngine, tebuSymptoms, tebuDiseases } from '@/app/modules/tebu';
 *
 * // Jalankan diagnosis
 * const results = tebuEngine.diagnose(['G001', 'G007', 'G033']);
 *
 * // Tampilkan hasil
 * results.forEach(result => {
 *   console.log(result.disease.name);
 *   console.log(result.confidence + '%');
 * });
 * ```
 */

// ============================================
// TYPES - Interface dan Type Definitions
// ============================================
export type {
  Symptom,
  Disease,
  DiagnosisRule,
  DiagnosisResult,
  ConsultationHistory,
  ConsultationSession
} from './types';

// ============================================
// DATA - Knowledge Base
// ============================================

/**
 * Data gejala tanaman tebu (38 gejala)
 * Dikategorikan berdasarkan bagian tanaman: akar, batang, daun
 */
export { tebuSymptoms } from './data/tebu-symptoms';

/**
 * Data penyakit dan hama tebu
 * - 12 Penyakit (P001-P012)
 * - 16 Hama (H001-H016)
 * Total: 28 entitas
 */
export { tebuDiseases } from './data/tebu-diseases';

/**
 * Aturan diagnosis (31 rules)
 * Mapping gejala ke penyakit/hama dengan confidence level
 */
export { tebuRules } from './data/tebu-rules';

// ============================================
// DIAGNOSIS ENGINE
// ============================================

/**
 * Class TebuDiagnosisEngine
 * Mesin inferensi untuk diagnosis penyakit dan hama tebu
 */
export { TebuDiagnosisEngine } from './lib/tebu-diagnosis-engine';

/**
 * Instance engine siap pakai
 * Sudah diinisialisasi dengan knowledge base lengkap
 *
 * @example
 * ```typescript
 * import { tebuEngine } from '@/app/modules/tebu';
 *
 * const results = tebuEngine.diagnose(['G001', 'G007']);
 * ```
 */
import { TebuDiagnosisEngine } from './lib/tebu-diagnosis-engine';
import { tebuDiseases } from './data/tebu-diseases';
import { tebuSymptoms } from './data/tebu-symptoms';
import { tebuRules } from './data/tebu-rules';

export const tebuEngine = new TebuDiagnosisEngine(
  tebuDiseases,
  tebuSymptoms,
  tebuRules
);
