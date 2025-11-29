/**
 * TYPES - Sistem Pakar Pisang
 * ==============================================
 * File ini mendefinisikan semua tipe data TypeScript
 * untuk sistem pakar diagnosis penyakit dan hama pisang
 */

/**
 * Interface untuk data gejala pada tanaman pisang
 * Digunakan untuk menampilkan pilihan gejala kepada user
 */
export interface PisangSymptom {
  /** ID unik gejala (contoh: G001, G002) */
  id: string;

  /** Nama gejala dalam bahasa Indonesia */
  name: string;

  /** Kategori bagian tanaman yang terkena */
  category: 'akar' | 'batang' | 'daun' | 'buah';

  /** URL link ke gambar referensi gejala (opsional) */
  imageUrl?: string;

  /** Deskripsi lengkap gejala untuk membantu identifikasi (opsional) */
  description?: string;
}

/**
 * Interface untuk data penyakit/hama pada tanaman pisang
 * Berisi informasi lengkap tentang penyakit atau hama
 */
export interface PisangDisease {
  /** ID unik penyakit/hama (contoh: P001 untuk penyakit, H001 untuk hama) */
  id: string;

  /** Nama penyakit/hama dalam bahasa Indonesia */
  name: string;

  /** Jenis: penyakit atau hama */
  type: 'penyakit' | 'hama';

  /** Deskripsi umum penyakit/hama */
  description: string;

  /** Penyebab penyakit/hama (bakteri, jamur, virus, serangga, dll) */
  cause: string;

  /** Daftar gejala-gejala yang ditimbulkan */
  symptoms: string[];

  /** Cara-cara pencegahan */
  prevention: string[];

  /** Cara pengendalian secara fisik/mekanis tanpa pestisida */
  control_physical: string[];

  /** Cara pengendalian dengan pestisida kimia */
  control_chemical: string[];

  /** URL gambar penyakit/hama (opsional) */
  image?: string;
}

/**
 * Interface untuk aturan diagnosis (rules)
 * Mapping antara kombinasi gejala dengan penyakit/hama
 */
export interface PisangDiagnosisRule {
  /** ID unik aturan */
  id: string;

  /** ID penyakit/hama yang didiagnosis */
  disease_id: string;

  /** Daftar ID gejala yang menjadi indikator */
  symptoms: string[];

  /** Jumlah minimum gejala yang harus cocok */
  min_symptoms: number;

  /** Tingkat kepercayaan diagnosis (0-100) */
  confidence: number;
}

/**
 * Interface untuk hasil diagnosis
 * Output dari proses diagnosis berdasarkan gejala yang dipilih
 */
export interface PisangDiagnosisResult {
  /** ID penyakit/hama yang terdiagnosis */
  disease_id: string;

  /** Nama penyakit/hama */
  disease_name: string;

  /** Jenis: penyakit atau hama */
  disease_type: 'penyakit' | 'hama';

  /** Daftar ID gejala yang cocok dengan aturan */
  matched_symptoms: string[];

  /** Jumlah total gejala untuk penyakit/hama ini */
  total_symptoms: number;

  /** Tingkat kepercayaan hasil diagnosis (0-100) */
  confidence: number;
}

/**
 * Interface untuk kategori gejala
 * Mengelompokkan gejala berdasarkan bagian tanaman
 */
export interface SymptomCategory {
  /** ID kategori */
  id: 'akar' | 'batang' | 'daun' | 'buah';

  /** Nama kategori untuk ditampilkan */
  name: string;

  /** Warna tema untuk UI */
  color: string;
}

/**
 * Interface untuk kategori tingkat kepercayaan
 * Memberikan label pada tingkat confidence hasil diagnosis
 */
export interface ConfidenceCategory {
  /** Label kategori (Rendah, Sedang, Tinggi, Sangat Tinggi) */
  label: string;

  /** Warna untuk indikator visual */
  color: string;

  /** Deskripsi makna tingkat confidence */
  description: string;
}
