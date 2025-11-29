/**
 * TYPES - Sistem Pakar Tebu
 * ==============================================
 * File ini mendefinisikan semua tipe data TypeScript
 * untuk sistem pakar diagnosis penyakit dan hama tebu
 */

/**
 * Interface untuk data gejala pada tanaman tebu
 * Digunakan untuk menampilkan pilihan gejala kepada user
 */
export interface Symptom {
  /** ID unik gejala (contoh: G001, G002) */
  id: string;

  /** Kode gejala (sama dengan ID) */
  code: string;

  /** Nama gejala dalam bahasa Indonesia */
  name: string;

  /** Kategori bagian tanaman yang terkena */
  category: 'akar' | 'batang' | 'daun';

  /** Deskripsi lengkap gejala untuk membantu identifikasi (opsional) */
  description?: string;
}

/**
 * Interface untuk data penyakit/hama pada tanaman tebu
 * Berisi informasi lengkap tentang penyakit atau hama
 */
export interface Disease {
  /** ID unik penyakit/hama (contoh: P001 untuk penyakit, H001 untuk hama) */
  id: string;

  /** Kode penyakit/hama (sama dengan ID) */
  code: string;

  /** Nama penyakit/hama dalam bahasa Indonesia */
  name: string;

  /** Jenis: hama atau penyakit */
  type: 'hama' | 'penyakit';

  /** Nama latin/ilmiah penyakit atau hama (opsional) */
  latinName?: string;

  /** Deskripsi umum penyakit/hama */
  description: string;

  /** Penyebab penyakit/hama (bakteri, jamur, virus, serangga, dll) */
  causes: string;

  /** Daftar ID gejala yang ditimbulkan */
  symptoms: string[];

  /** Cara-cara pengendalian/solusi */
  solutions: string[];

  /** Cara-cara pencegahan */
  prevention: string[];

  /** Tingkat keparahan serangan */
  severity: 'ringan' | 'sedang' | 'berat';

  /** URL gambar penyakit/hama (opsional) */
  imageUrl?: string;
}

/**
 * Interface untuk aturan diagnosis (rules)
 * Mapping antara kombinasi gejala dengan penyakit/hama
 */
export interface DiagnosisRule {
  /** ID unik aturan */
  id: string;

  /** ID penyakit/hama yang didiagnosis */
  diseaseId: string;

  /** Daftar ID gejala yang menjadi indikator */
  symptoms: string[];

  /** Jumlah minimum gejala yang harus cocok (opsional, default: 1) */
  minSymptoms?: number;

  /** Tingkat kepercayaan diagnosis (0-100) */
  confidence: number;
}

/**
 * Interface untuk hasil diagnosis
 * Output dari proses diagnosis berdasarkan gejala yang dipilih
 */
export interface DiagnosisResult {
  /** Data lengkap penyakit/hama yang terdiagnosis */
  disease: Disease;

  /** Daftar ID gejala yang cocok dengan aturan */
  matchedSymptoms: string[];

  /** Tingkat kepercayaan hasil diagnosis (0-100) */
  confidence: number;

  /** Apakah semua gejala cocok sempurna */
  allSymptomsMatched: boolean;
}

/**
 * Interface untuk riwayat konsultasi
 * Menyimpan data konsultasi user (untuk admin/history)
 */
export interface ConsultationHistory {
  /** ID unik konsultasi */
  id: string;

  /** Tanggal konsultasi */
  date: Date;

  /** Daftar ID gejala yang dipilih user */
  selectedSymptoms: string[];

  /** Hasil diagnosis yang diperoleh */
  diagnosis: DiagnosisResult[];

  /** Informasi user (opsional) */
  userInfo?: {
    name?: string;
    location?: string;
    phone?: string;
  };
}

/**
 * Interface untuk sesi konsultasi
 * Menyimpan state sementara saat konsultasi berlangsung
 */
export interface ConsultationSession {
  /** Daftar ID gejala yang sudah dipilih */
  symptoms: string[];

  /** Step/langkah saat ini dalam wizard */
  currentStep: number;

  /** Hasil diagnosis sementara */
  results: DiagnosisResult[];
}
