// Aturan diagnosis penyakit pisang (Forward Chaining)
export interface PisangRule {
  id: string;
  disease_id: string;
  symptoms: string[]; // ID gejala yang harus ada
  confidence: number; // Tingkat kepercayaan diagnosis (0-1)
  min_symptoms: number; // Minimal gejala yang harus cocok
}

export const pisangRules: PisangRule[] = [
  // P001: Penyakit Layu Moko
  {
    id: 'R001',
    disease_id: 'P001',
    symptoms: ['G013', 'G011', 'G008', 'G025', 'G028'],
    confidence: 0.95,
    min_symptoms: 3
  },
  {
    id: 'R002',
    disease_id: 'P001',
    symptoms: ['G006', 'G008', 'G010', 'G023'],
    confidence: 0.85,
    min_symptoms: 3
  },

  // P002: Penyakit Layu Panama
  {
    id: 'R003',
    disease_id: 'P002',
    symptoms: ['G013', 'G015', 'G018', 'G001', 'G028'],
    confidence: 0.90,
    min_symptoms: 3
  },
  {
    id: 'R004',
    disease_id: 'P002',
    symptoms: ['G006', 'G010', 'G001', 'G027'],
    confidence: 0.80,
    min_symptoms: 3
  },

  // P003: Penyakit Bercak Daun (Sigatoka)
  {
    id: 'R005',
    disease_id: 'P003',
    symptoms: ['G014', 'G015', 'G018', 'G022'],
    confidence: 0.90,
    min_symptoms: 2
  },
  {
    id: 'R006',
    disease_id: 'P003',
    symptoms: ['G014', 'G013', 'G015'],
    confidence: 0.75,
    min_symptoms: 2
  },

  // P004: Penyakit Virus Bunchy Top
  {
    id: 'R007',
    disease_id: 'P004',
    symptoms: ['G019', 'G020', 'G021', 'G027'],
    confidence: 0.95,
    min_symptoms: 3
  },
  {
    id: 'R008',
    disease_id: 'P004',
    symptoms: ['G019', 'G017', 'G027', 'G030'],
    confidence: 0.85,
    min_symptoms: 3
  },

  // P005: Penyakit Busuk Bonggol
  {
    id: 'R009',
    disease_id: 'P005',
    symptoms: ['G002', 'G003', 'G010', 'G013', 'G028'],
    confidence: 0.90,
    min_symptoms: 3
  },
  {
    id: 'R010',
    disease_id: 'P005',
    symptoms: ['G001', 'G002', 'G006', 'G012'],
    confidence: 0.80,
    min_symptoms: 3
  },

  // H001: Penggerek Batang
  {
    id: 'R011',
    disease_id: 'H001',
    symptoms: ['G009', 'G008', 'G012', 'G027'],
    confidence: 0.90,
    min_symptoms: 2
  },
  {
    id: 'R012',
    disease_id: 'H001',
    symptoms: ['G007', 'G009', 'G010'],
    confidence: 0.75,
    min_symptoms: 2
  },

  // H002: Kutu Daun
  {
    id: 'R013',
    disease_id: 'H002',
    symptoms: ['G017', 'G019', 'G013', 'G030'],
    confidence: 0.85,
    min_symptoms: 2
  },
  {
    id: 'R014',
    disease_id: 'H002',
    symptoms: ['G017', 'G013', 'G027'],
    confidence: 0.70,
    min_symptoms: 2
  },

  // H003: Ulat Daun
  {
    id: 'R015',
    disease_id: 'H003',
    symptoms: ['G016', 'G015', 'G018', 'G030'],
    confidence: 0.90,
    min_symptoms: 2
  },
  {
    id: 'R016',
    disease_id: 'H003',
    symptoms: ['G016', 'G014', 'G030'],
    confidence: 0.80,
    min_symptoms: 2
  },

  // H004: Kumbang Daun
  {
    id: 'R017',
    disease_id: 'H004',
    symptoms: ['G016', 'G014', 'G015', 'G030'],
    confidence: 0.85,
    min_symptoms: 3
  },
  {
    id: 'R018',
    disease_id: 'H004',
    symptoms: ['G016', 'G013', 'G030'],
    confidence: 0.75,
    min_symptoms: 2
  },

  // H005: Nematoda
  {
    id: 'R019',
    disease_id: 'H005',
    symptoms: ['G003', 'G005', 'G013', 'G027', 'G010'],
    confidence: 0.85,
    min_symptoms: 3
  },
  {
    id: 'R020',
    disease_id: 'H005',
    symptoms: ['G001', 'G003', 'G013', 'G027'],
    confidence: 0.75,
    min_symptoms: 3
  },
];
