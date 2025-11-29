import { DiagnosisRule } from '../types';

export const tebuRules: DiagnosisRule[] = [
  // Penyakit Busuk Pangkal Batang
  {
    id: 'R001',
    diseaseId: 'P001',
    symptoms: ['G001', 'G007', 'G033', 'G037'],
    minSymptoms: 3,
    confidence: 95
  },
  
  // Penyakit Mosaik
  {
    id: 'R002',
    diseaseId: 'P002',
    symptoms: ['G029', 'G016', 'G031', 'G009'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Penyakit Pokahbung
  {
    id: 'R003',
    diseaseId: 'P003',
    symptoms: ['G038', 'G013', 'G016', 'G031'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Penyakit Luka Api
  {
    id: 'R004',
    diseaseId: 'P004',
    symptoms: ['G023', 'G026', 'G016', 'G014'],
    minSymptoms: 3,
    confidence: 92
  },
  
  // Penyakit Busuk Merah
  {
    id: 'R005',
    diseaseId: 'P005',
    symptoms: ['G012', 'G034', 'G007', 'G013'],
    minSymptoms: 3,
    confidence: 95
  },
  
  // Penyakit Bercak Cincin
  {
    id: 'R006',
    diseaseId: 'P006',
    symptoms: ['G018', 'G026', 'G017'],
    minSymptoms: 2,
    confidence: 85
  },
  
  // Penyakit Karat
  {
    id: 'R007',
    diseaseId: 'P007',
    symptoms: ['G019', 'G026', 'G017', 'G028'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Penyakit Noda Kuning
  {
    id: 'R008',
    diseaseId: 'P008',
    symptoms: ['G016', 'G018', 'G030'],
    minSymptoms: 2,
    confidence: 85
  },
  
  // Penggerek Batang Bergaris
  {
    id: 'R009',
    diseaseId: 'H001',
    symptoms: ['G006', 'G015', 'G013', 'G035'],
    minSymptoms: 3,
    confidence: 95
  },
  
  // Penggerek Pucuk
  {
    id: 'R010',
    diseaseId: 'H002',
    symptoms: ['G014', 'G031', 'G035', 'G021'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Kutu Daun
  {
    id: 'R011',
    diseaseId: 'H003',
    symptoms: ['G036', 'G021', 'G030', 'G025'],
    minSymptoms: 2,
    confidence: 92
  },
  
  // Tikus
  {
    id: 'R012',
    diseaseId: 'H004',
    symptoms: ['G006', 'G010', 'G013', 'G037'],
    minSymptoms: 2,
    confidence: 88
  },
  
  // Uret
  {
    id: 'R013',
    diseaseId: 'H005',
    symptoms: ['G001', 'G003', 'G005', 'G037'],
    minSymptoms: 3,
    confidence: 93
  },
  
  // Ulat Grayak
  {
    id: 'R014',
    diseaseId: 'H006',
    symptoms: ['G020', 'G024', 'G035', 'G017'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Belalang
  {
    id: 'R015',
    diseaseId: 'H007',
    symptoms: ['G020', 'G024', 'G017'],
    minSymptoms: 2,
    confidence: 85
  },
  
  // Kepinding Tanah
  {
    id: 'R016',
    diseaseId: 'H008',
    symptoms: ['G008', 'G013', 'G031', 'G027'],
    minSymptoms: 2,
    confidence: 87
  },
  
  // Penyakit Noda Kuning
  {
    id: 'R017',
    diseaseId: 'P006',
    symptoms: ['G016', 'G018', 'G030'],
    minSymptoms: 2,
    confidence: 85
  },
  
  // Penyakit Karat
  {
    id: 'R018',
    diseaseId: 'P007',
    symptoms: ['G019', 'G026', 'G017', 'G028'],
    minSymptoms: 3,
    confidence: 90
  },
  
  // Penyakit Hawar Daun
  {
    id: 'R019',
    diseaseId: 'P008',
    symptoms: ['G017', 'G028', 'G026'],
    minSymptoms: 2,
    confidence: 88
  },
  
  // Penyakit Antraknosa
  {
    id: 'R020',
    diseaseId: 'P009',
    symptoms: ['G018', 'G012', 'G026'],
    minSymptoms: 2,
    confidence: 86
  },
  
  // Penyakit Akar Merah
  {
    id: 'R021',
    diseaseId: 'P010',
    symptoms: ['G004', 'G001', 'G037', 'G022'],
    minSymptoms: 3,
    confidence: 92
  },
  
  // Penyakit Gomosis
  {
    id: 'R022',
    diseaseId: 'P011',
    symptoms: ['G011', 'G007', 'G013'],
    minSymptoms: 2,
    confidence: 89
  },
  
  // Penyakit Layu Bakteri
  {
    id: 'R023',
    diseaseId: 'P012',
    symptoms: ['G022', 'G016', 'G037', 'G033'],
    minSymptoms: 3,
    confidence: 94
  },
  
  // Wereng Tebu
  {
    id: 'R024',
    diseaseId: 'H009',
    symptoms: ['G030', 'G027', 'G031'],
    minSymptoms: 2,
    confidence: 86
  },
  
  // Kumbang Lundi
  {
    id: 'R025',
    diseaseId: 'H010',
    symptoms: ['G006', 'G010', 'G015'],
    minSymptoms: 2,
    confidence: 91
  },
  
  // Lalat Bibit
  {
    id: 'R026',
    diseaseId: 'H011',
    symptoms: ['G014', 'G031', 'G009'],
    minSymptoms: 2,
    confidence: 87
  },
  
  // Rayap
  {
    id: 'R027',
    diseaseId: 'H012',
    symptoms: ['G006', 'G015', 'G037', 'G001'],
    minSymptoms: 3,
    confidence: 93
  },
  
  // Kutu Perisai
  {
    id: 'R028',
    diseaseId: 'H013',
    symptoms: ['G008', 'G013', 'G027'],
    minSymptoms: 2,
    confidence: 84
  },
  
  // Penggerek Akar
  {
    id: 'R029',
    diseaseId: 'H014',
    symptoms: ['G005', 'G003', 'G037', 'G002'],
    minSymptoms: 3,
    confidence: 92
  },
  
  // Trips
  {
    id: 'R030',
    diseaseId: 'H015',
    symptoms: ['G027', 'G030', 'G026'],
    minSymptoms: 2,
    confidence: 83
  },
  
  // Ngengat Batang
  {
    id: 'R031',
    diseaseId: 'H016',
    symptoms: ['G006', 'G015', 'G013', 'G035'],
    minSymptoms: 3,
    confidence: 94
  },
];
