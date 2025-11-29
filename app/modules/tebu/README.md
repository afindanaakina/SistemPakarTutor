# 🌾 Modul Sistem Pakar Tebu

Modul sistem pakar untuk diagnosis penyakit dan hama pada tanaman tebu (sugarcane) menggunakan metode **Forward Chaining**.

---

## 📁 Struktur Folder

```
app/modules/tebu/
│
├── README.md                        # File dokumentasi ini
├── index.ts                         # Main export point
│
├── types/                           # Type definitions
│   └── index.ts                     # Interface TypeScript
│
├── data/                            # Knowledge base
│   ├── tebu-symptoms.ts             # 38 gejala penyakit/hama
│   ├── tebu-diseases.ts             # 12 penyakit + 16 hama (28 total)
│   └── tebu-rules.ts                # 31 aturan diagnosis
│
└── lib/                             # Business logic
    └── tebu-diagnosis-engine.ts     # Mesin inferensi forward chaining
```

---

## 📝 Penjelasan Setiap File

### 1. `index.ts` - Main Export Point

**Tujuan**: Titik masuk utama untuk modul tebu. Mengekspor semua komponen yang diperlukan.

**Isi**:
- Export semua types (Symptom, Disease, DiagnosisRule, dll)
- Export data gejala, penyakit, dan aturan
- Export class `TebuDiagnosisEngine`
- Instance `tebuEngine` yang sudah diinisialisasi dan siap pakai

**Contoh penggunaan**:
```typescript
import { tebuEngine, tebuSymptoms, tebuDiseases } from '@/app/modules/tebu';

// Langsung gunakan engine yang sudah siap
const results = tebuEngine.diagnose(['G001', 'G007', 'G033']);
```

---

### 2. `types/index.ts` - Type Definitions

**Tujuan**: Mendefinisikan semua interface TypeScript untuk sistem pakar tebu.

**Interface yang didefinisikan**:

#### `Symptom`
Interface untuk data gejala tanaman tebu.

```typescript
interface Symptom {
  id: string;           // G001-G038
  code: string;         // Kode gejala (sama dengan id)
  name: string;         // Nama gejala
  category: 'akar' | 'batang' | 'daun';
  description?: string; // Deskripsi lengkap
}
```

**Kategori gejala**:
- `akar`: Gejala pada akar (5 gejala)
- `batang`: Gejala pada batang (18 gejala)
- `daun`: Gejala pada daun (15 gejala)

#### `Disease`
Interface untuk data penyakit atau hama.

```typescript
interface Disease {
  id: string;           // P001-P012 (penyakit), H001-H016 (hama)
  code: string;         // Kode penyakit/hama
  name: string;         // Nama penyakit/hama
  type: 'hama' | 'penyakit';
  latinName?: string;   // Nama ilmiah
  description: string;  // Deskripsi
  causes: string;       // Penyebab
  symptoms: string[];   // Daftar ID gejala
  solutions: string[];  // Cara pengendalian
  prevention: string[]; // Cara pencegahan
  severity: 'ringan' | 'sedang' | 'berat';
  imageUrl?: string;    // URL gambar
}
```

**Tingkat severity**:
- `ringan`: Tidak terlalu berbahaya, mudah dikendalikan
- `sedang`: Perlu perhatian, bisa menyebar
- `berat`: Sangat berbahaya, bisa merusak seluruh tanaman

#### `DiagnosisRule`
Interface untuk aturan diagnosis.

```typescript
interface DiagnosisRule {
  id: string;           // R001-R031
  diseaseId: string;    // ID penyakit/hama yang didiagnosis
  symptoms: string[];   // Daftar gejala indikator
  minSymptoms?: number; // Minimum gejala yang harus cocok
  confidence: number;   // Tingkat kepercayaan (0-100)
}
```

#### `DiagnosisResult`
Interface untuk hasil diagnosis.

```typescript
interface DiagnosisResult {
  disease: Disease;            // Data penyakit/hama
  matchedSymptoms: string[];   // Gejala yang cocok
  confidence: number;          // Confidence hasil (0-100)
  allSymptomsMatched: boolean; // Apakah semua gejala cocok
}
```

#### `ConsultationHistory`
Interface untuk riwayat konsultasi (admin/history).

```typescript
interface ConsultationHistory {
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
```

#### `ConsultationSession`
Interface untuk sesi konsultasi sementara.

```typescript
interface ConsultationSession {
  symptoms: string[];      // Gejala yang dipilih
  currentStep: number;     // Step wizard saat ini
  results: DiagnosisResult[];
}
```

---

### 3. `data/tebu-symptoms.ts` - Data Gejala

**Tujuan**: Knowledge base berisi 38 gejala penyakit dan hama tebu.

**Statistik**:
- **Total gejala**: 38
- **Gejala akar**: 5 (G001-G005)
- **Gejala batang**: 18 (G006-G015, G031-G034, G038)
- **Gejala daun**: 15 (G016-G030, G035-G036)

**Contoh data**:
```typescript
{
  id: 'G001',
  code: 'G001',
  name: 'Akar membusuk',
  category: 'akar',
  description: 'Akar tanaman tebu membusuk dan berwarna coklat kehitaman'
}
```

**Kategori gejala**:
1. **Akar** (5):
   - G001: Akar membusuk
   - G002: Akar kering
   - G003: Pertumbuhan akar terhambat
   - G004: Akar berwarna kemerahan
   - G005: Akar berlubang

2. **Batang** (18):
   - G006: Batang berlubang
   - G007: Batang membusuk
   - G008: Batang menguning
   - G009: Batang kerdil
   - G010: Batang retak
   - G011: Batang berlendir
   - G012: Bintik merah pada batang
   - G013: Batang mudah patah
   - G014: Tunas mati
   - G015: Batang berongga
   - G031: Pertumbuhan terhambat
   - G032: Munculnya jamur
   - G033: Bau busuk
   - G034: Cairan merah keluar
   - G037: Tanaman mudah rebah
   - G038: Ruas batang memendek

3. **Daun** (15):
   - G016: Daun menguning
   - G017: Daun mengering
   - G018: Bercak coklat pada daun
   - G019: Bercak merah pada daun
   - G020: Daun berlubang
   - G021: Daun menggulung
   - G022: Daun layu
   - G023: Daun berbintik putih
   - G024: Daun sobek-sobek
   - G025: Daun berlendir
   - G026: Ujung daun mengering
   - G027: Daun keriput
   - G028: Daun terlihat terbakar
   - G029: Daun bergaris kuning
   - G030: Daun pucat
   - G035: Ada ulat/larva
   - G036: Ada kutu

---

### 4. `data/tebu-diseases.ts` - Data Penyakit & Hama

**Tujuan**: Knowledge base berisi informasi lengkap penyakit dan hama tebu.

**Statistik**:
- **Total entitas**: 28
- **Penyakit**: 12 (P001-P012)
- **Hama**: 16 (H001-H016)

#### PENYAKIT (12)

1. **P001 - Penyakit Busuk Pangkal Batang** (*Pythium spp.*)
   - Severity: Berat
   - Gejala: G001, G007, G033, G037

2. **P002 - Penyakit Mosaik** (*Sugarcane Mosaic Virus*)
   - Severity: Sedang
   - Gejala: G029, G016, G031, G009

3. **P003 - Penyakit Pokahbung** (*Fusarium moniliforme*)
   - Severity: Sedang
   - Gejala: G038, G013, G016, G031

4. **P004 - Penyakit Luka Api** (*Xanthomonas albilineans*)
   - Severity: Berat
   - Gejala: G023, G026, G016, G014

5. **P005 - Penyakit Busuk Merah** (*Colletotrichum falcatum*)
   - Severity: Berat
   - Gejala: G012, G034, G007, G013

6. **P006 - Penyakit Bercak Cincin** (*Leptosphaeria sacchari*)
   - Severity: Ringan
   - Gejala: G018, G026, G017

7. **P007 - Penyakit Karat** (*Puccinia melanocephala*)
   - Severity: Sedang
   - Gejala: G019, G026, G017, G028

8. **P008 - Penyakit Hawar Daun** (*Helminthosporium sacchari*)
   - Severity: Sedang
   - Gejala: G017, G028, G026

9. **P009 - Penyakit Antraknosa** (*Colletotrichum gloeosporioides*)
   - Severity: Sedang
   - Gejala: G018, G012, G026

10. **P010 - Penyakit Akar Merah** (*Physalospora tucumanensis*)
    - Severity: Berat
    - Gejala: G004, G001, G037, G022

11. **P011 - Penyakit Gomosis** (*Xanthomonas campestris*)
    - Severity: Sedang
    - Gejala: G011, G007, G013

12. **P012 - Penyakit Layu Bakteri** (*Pseudomonas solanacearum*)
    - Severity: Berat
    - Gejala: G022, G016, G037, G033

#### HAMA (16)

1. **H001 - Penggerek Batang Bergaris** (*Chilo sacchariphagus*)
   - Severity: Berat
   - Gejala: G006, G015, G013, G035

2. **H002 - Penggerek Pucuk** (*Scirpophaga excerptalis*)
   - Severity: Berat
   - Gejala: G014, G031, G035, G021

3. **H003 - Kutu Daun** (*Melanaphis sacchari*)
   - Severity: Sedang
   - Gejala: G036, G021, G030, G025

4. **H004 - Tikus** (*Rattus argentiventer*)
   - Severity: Berat
   - Gejala: G006, G010, G013, G037

5. **H005 - Uret** (*Lepidiota stigma*)
   - Severity: Berat
   - Gejala: G001, G003, G005, G037

6. **H006 - Ulat Grayak** (*Spodoptera litura*)
   - Severity: Sedang
   - Gejala: G020, G024, G035, G017

7. **H007 - Belalang** (*Valanga nigricornis*)
   - Severity: Ringan
   - Gejala: G020, G024, G017

8. **H008 - Kepinding Tanah** (*Leptocorisa acuta*)
   - Severity: Sedang
   - Gejala: G008, G013, G031, G027

9. **H009 - Wereng Tebu** (*Perkinsiella saccharicida*)
   - Severity: Sedang
   - Gejala: G030, G027, G031

10. **H010 - Kumbang Lundi** (*Cosmopolites sordidus*)
    - Severity: Berat
    - Gejala: G006, G010, G015

11. **H011 - Lalat Bibit** (*Atherigona soccata*)
    - Severity: Sedang
    - Gejala: G014, G031, G009

12. **H012 - Rayap** (*Coptotermes curvignathus*)
    - Severity: Berat
    - Gejala: G006, G015, G037, G001

13. **H013 - Kutu Perisai** (*Aspidiotus destructor*)
    - Severity: Ringan
    - Gejala: G008, G013, G027

14. **H014 - Penggerek Akar** (*Emmalocera depressella*)
    - Severity: Berat
    - Gejala: G005, G003, G037, G002

15. **H015 - Trips** (*Thrips saccharoni*)
    - Severity: Ringan
    - Gejala: G027, G030, G026

16. **H016 - Ngengat Batang** (*Diatraea saccharalis*)
    - Severity: Berat
    - Gejala: G006, G015, G013, G035

---

### 5. `data/tebu-rules.ts` - Aturan Diagnosis

**Tujuan**: Aturan inferensi yang memetakan gejala ke penyakit/hama.

**Statistik**:
- **Total aturan**: 31
- **Confidence range**: 83-95%
- **Min symptoms range**: 2-3 gejala

**Struktur aturan**:
```typescript
{
  id: 'R001',
  diseaseId: 'P001',           // Penyakit Busuk Pangkal Batang
  symptoms: ['G001', 'G007', 'G033', 'G037'],
  minSymptoms: 3,              // Minimal 3 gejala harus cocok
  confidence: 95               // Base confidence 95%
}
```

**Cara kerja**:
1. User memilih gejala yang dialami tanaman
2. Engine mencocokkan dengan aturan
3. Jika cocok ≥ `minSymptoms`, diagnosis dimasukkan
4. Confidence dihitung: `baseConfidence × (matchedCount / totalSymptoms)`
5. Hasil diurutkan berdasarkan confidence tertinggi

**Contoh**:
```typescript
// User pilih: G001, G007, G033
// Rule R001 memiliki symptoms: [G001, G007, G033, G037]
// Matched: 3 dari 4 gejala (75%)
// minSymptoms: 3 ✓ (terpenuhi)
// Calculated confidence: 95 × 0.75 = 71.25%
```

---

### 6. `lib/tebu-diagnosis-engine.ts` - Mesin Inferensi

**Tujuan**: Implementasi algoritma forward chaining untuk diagnosis.

**Class**: `TebuDiagnosisEngine`

**Constructor**:
```typescript
constructor(
  diseases: Disease[],
  symptoms: Symptom[],
  rules: DiagnosisRule[]
)
```

**Method utama**:

#### `diagnose(selectedSymptomIds: string[]): DiagnosisResult[]`
Melakukan diagnosis berdasarkan gejala yang dipilih.

**Algoritma**:
1. Iterate semua aturan diagnosis
2. Hitung berapa gejala yang cocok dengan aturan
3. Hitung confidence = baseConfidence × (matched / total)
4. Jika ≥ minSymptoms dan confidence > 0, tambahkan ke hasil
5. Urutkan hasil berdasarkan confidence (tertinggi dulu)

**Contoh**:
```typescript
const engine = new TebuDiagnosisEngine(diseases, symptoms, rules);
const results = engine.diagnose(['G001', 'G007', 'G033', 'G037']);

// Output:
// [
//   {
//     disease: { id: 'P001', name: 'Penyakit Busuk Pangkal Batang', ... },
//     matchedSymptoms: ['G001', 'G007', 'G033', 'G037'],
//     confidence: 95,
//     allSymptomsMatched: true
//   }
// ]
```

#### Method lainnya:

**`getSymptomsByIds(symptomIds: string[]): Symptom[]`**
Mendapatkan detail gejala berdasarkan ID.

**`getDiseaseById(diseaseId: string): Disease | undefined`**
Mendapatkan detail penyakit/hama berdasarkan ID.

**`getSymptomsByCategory(): Record<string, Symptom[]>`**
Mendapatkan gejala yang dikelompokkan per kategori.

**`validateSymptoms(symptomIds: string[])`**
Validasi apakah gejala yang dipilih cukup untuk diagnosis.

**`getRelatedDiseases(symptomId: string): Disease[]`**
Mendapatkan penyakit/hama terkait dengan gejala tertentu.

---

## 🔧 Cara Menggunakan

### Import dari Main Export

```typescript
import {
  // Instance siap pakai
  tebuEngine,

  // Data
  tebuSymptoms,
  tebuDiseases,
  tebuRules,

  // Class
  TebuDiagnosisEngine,

  // Types
  type Symptom,
  type Disease,
  type DiagnosisResult
} from '@/app/modules/tebu';
```

### Contoh Diagnosis Sederhana

```typescript
import { tebuEngine } from '@/app/modules/tebu';

// User memilih gejala
const selectedSymptoms = ['G001', 'G007', 'G033', 'G037'];

// Jalankan diagnosis
const results = tebuEngine.diagnose(selectedSymptoms);

// Tampilkan hasil
results.forEach(result => {
  console.log('Penyakit/Hama:', result.disease.name);
  console.log('Confidence:', result.confidence + '%');
  console.log('Severity:', result.disease.severity);
  console.log('Gejala cocok:', result.matchedSymptoms.length);
  console.log('---');
});
```

### Contoh Validasi Gejala

```typescript
import { tebuEngine } from '@/app/modules/tebu';

const symptoms = ['G001'];
const validation = tebuEngine.validateSymptoms(symptoms);

if (!validation.valid) {
  console.error(validation.message);
  // "Pilih minimal 1 gejala untuk diagnosis"
} else {
  console.log(validation.message);
  // "Hasil diagnosis mungkin kurang akurat..."
}
```

### Contoh Mendapatkan Gejala per Kategori

```typescript
import { tebuEngine } from '@/app/modules/tebu';

const byCategory = tebuEngine.getSymptomsByCategory();

console.log('Gejala Akar:', byCategory.akar.length);   // 5
console.log('Gejala Batang:', byCategory.batang.length); // 18
console.log('Gejala Daun:', byCategory.daun.length);   // 15
```

---

## 📊 Statistik Knowledge Base

| Item | Jumlah |
|------|--------|
| **Total Gejala** | 38 |
| - Gejala Akar | 5 |
| - Gejala Batang | 18 |
| - Gejala Daun | 15 |
| **Total Penyakit** | 12 |
| - Severity Berat | 5 |
| - Severity Sedang | 6 |
| - Severity Ringan | 1 |
| **Total Hama** | 16 |
| - Severity Berat | 7 |
| - Severity Sedang | 7 |
| - Severity Ringan | 2 |
| **Total Aturan** | 31 |
| **Confidence Range** | 83-95% |

---

## 🔗 Integrasi dengan Pages

### Halaman Terkait

```
app/
├── tebu/                   # Landing page sistem pakar tebu
├── tebu-konsultasi/        # Konsultasi step-by-step wizard
└── tebu-daftar/           # Browse semua penyakit & hama
```

### Pola Penggunaan di Pages

```typescript
// app/tebu-konsultasi/page.tsx
'use client';

import { useState } from 'react';
import { tebuEngine, tebuSymptoms } from '@/app/modules/tebu';

export default function TebuKonsultasiPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  const handleDiagnose = () => {
    const diagnosisResults = tebuEngine.diagnose(selected);
    setResults(diagnosisResults);
  };

  return (
    <div>
      {/* Tampilkan gejala per kategori */}
      {Object.entries(tebuEngine.getSymptomsByCategory()).map(([category, symptoms]) => (
        <div key={category}>
          <h3>{category.toUpperCase()}</h3>
          {symptoms.map(symptom => (
            <label key={symptom.id}>
              <input
                type="checkbox"
                checked={selected.includes(symptom.id)}
                onChange={() => {/* toggle */}}
              />
              {symptom.name}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleDiagnose}>Diagnosis</button>

      {/* Tampilkan hasil */}
      {results.map(result => (
        <div key={result.disease.id}>
          <h4>{result.disease.name}</h4>
          <p>Confidence: {result.confidence}%</p>
          <p>Penyebab: {result.disease.causes}</p>
          <ul>
            {result.disease.solutions.map((solution, idx) => (
              <li key={idx}>{solution}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

## 🧪 Testing

Contoh unit test untuk engine:

```typescript
// tebu/lib/__tests__/tebu-diagnosis-engine.test.ts

import { tebuEngine } from '../index';

describe('TebuDiagnosisEngine', () => {
  it('should diagnose Busuk Pangkal Batang correctly', () => {
    const results = tebuEngine.diagnose(['G001', 'G007', 'G033', 'G037']);

    expect(results).toHaveLength(1);
    expect(results[0].disease.id).toBe('P001');
    expect(results[0].confidence).toBe(95);
    expect(results[0].allSymptomsMatched).toBe(true);
  });

  it('should return multiple diagnoses sorted by confidence', () => {
    const results = tebuEngine.diagnose(['G016', 'G017', 'G026']);

    expect(results.length).toBeGreaterThan(1);
    // Pastikan diurutkan confidence tinggi ke rendah
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].confidence).toBeGreaterThanOrEqual(results[i + 1].confidence);
    }
  });

  it('should validate symptoms correctly', () => {
    const validation1 = tebuEngine.validateSymptoms([]);
    expect(validation1.valid).toBe(false);

    const validation2 = tebuEngine.validateSymptoms(['G001']);
    expect(validation2.valid).toBe(true);
  });
});
```

---

## 📐 Best Practices

### 1. Type Safety
Selalu gunakan TypeScript types yang sudah didefinisikan:

```typescript
// GOOD ✓
const symptoms: Symptom[] = tebuSymptoms;
const results: DiagnosisResult[] = tebuEngine.diagnose(ids);

// BAD ✗
const symptoms: any = tebuSymptoms;
const results = tebuEngine.diagnose(ids);
```

### 2. Immutability
Jangan mutasi data knowledge base:

```typescript
// GOOD ✓
const filtered = tebuSymptoms.filter(s => s.category === 'akar');

// BAD ✗
tebuSymptoms.push(newSymptom); // ❌ Mutation
```

### 3. Validation
Selalu validasi input sebelum diagnosis:

```typescript
// GOOD ✓
const validation = tebuEngine.validateSymptoms(selected);
if (validation.valid) {
  const results = tebuEngine.diagnose(selected);
}

// BAD ✗
const results = tebuEngine.diagnose(selected); // Tanpa validasi
```

### 4. Error Handling
Handle edge cases:

```typescript
// GOOD ✓
const results = tebuEngine.diagnose(selected);
if (results.length === 0) {
  console.log('Tidak ada diagnosis yang cocok');
} else {
  // Tampilkan hasil
}

// BAD ✗
const results = tebuEngine.diagnose(selected);
console.log(results[0].disease.name); // ❌ Bisa error jika results kosong
```

---

## 🚀 Roadmap

**Future enhancements**:
- [ ] Tambah confidence threshold configuration
- [ ] Implementasi backward chaining
- [ ] Tambah metadata: umur tanaman, musim, lokasi geografis
- [ ] Support multi-language (English)
- [ ] Export diagnosis ke PDF
- [ ] Integration dengan database real-time
- [ ] Machine learning untuk optimasi confidence scoring

---

**Terakhir diupdate**: 2025-01-29
**Versi**: 1.0.0
**Maintainer**: Sistem Pakar Tutorial Project
