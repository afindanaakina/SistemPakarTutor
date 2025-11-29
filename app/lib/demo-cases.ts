import { DemoCase } from '../types/forward-chaining';

export const demoCases: DemoCase[] = [
  {
    id: 'animal-identification',
    title: 'Identifikasi Hewan',
    description: 'Sistem pakar untuk mengidentifikasi jenis hewan berdasarkan karakteristiknya',
    category: 'Biologi',
    initialFacts: [
      { id: 'has_hair', value: 'Memiliki rambut', description: 'Hewan memiliki rambut' },
      { id: 'gives_milk', value: 'Menyusui', description: 'Hewan menyusui anaknya' }
    ],
    rules: [
      {
        id: 'rule1',
        conditions: ['has_hair'],
        conclusion: 'is_mammal',
        description: 'Jika memiliki rambut maka mamalia'
      },
      {
        id: 'rule2',
        conditions: ['gives_milk'],
        conclusion: 'is_mammal',
        description: 'Jika menyusui maka mamalia'
      },
      {
        id: 'rule3',
        conditions: ['is_mammal', 'has_hooves'],
        conclusion: 'is_ungulate',
        description: 'Jika mamalia dan berkuku maka ungulata'
      },
      {
        id: 'rule4',
        conditions: ['is_mammal', 'eats_meat'],
        conclusion: 'is_carnivore',
        description: 'Jika mamalia dan makan daging maka karnivora'
      }
    ],
    goal: 'is_mammal'
  },
  {
    id: 'disease-diagnosis',
    title: 'Diagnosis Penyakit',
    description: 'Sistem pakar untuk mendiagnosis penyakit berdasarkan gejala',
    category: 'Kesehatan',
    initialFacts: [
      { id: 'fever', value: 'Demam', description: 'Pasien mengalami demam' },
      { id: 'cough', value: 'Batuk', description: 'Pasien mengalami batuk' },
      { id: 'sore_throat', value: 'Sakit tenggorokan', description: 'Pasien sakit tenggorokan' }
    ],
    rules: [
      {
        id: 'rule1',
        conditions: ['fever', 'cough'],
        conclusion: 'respiratory_infection',
        description: 'Jika demam dan batuk maka infeksi pernapasan'
      },
      {
        id: 'rule2',
        conditions: ['respiratory_infection', 'sore_throat'],
        conclusion: 'common_cold',
        description: 'Jika infeksi pernapasan dan sakit tenggorokan maka flu biasa'
      },
      {
        id: 'rule3',
        conditions: ['fever', 'headache'],
        conclusion: 'viral_infection',
        description: 'Jika demam dan sakit kepala maka infeksi virus'
      }
    ],
    goal: 'common_cold'
  },
  {
    id: 'computer-troubleshooting',
    title: 'Troubleshooting Komputer',
    description: 'Sistem pakar untuk mendiagnosis masalah komputer',
    category: 'Teknologi',
    initialFacts: [
      { id: 'no_display', value: 'Tidak ada tampilan', description: 'Monitor tidak menampilkan apa-apa' },
      { id: 'power_on', value: 'Power menyala', description: 'Lampu power komputer menyala' }
    ],
    rules: [
      {
        id: 'rule1',
        conditions: ['no_display', 'power_on'],
        conclusion: 'display_problem',
        description: 'Jika tidak ada tampilan tapi power menyala maka masalah display'
      },
      {
        id: 'rule2',
        conditions: ['display_problem', 'beep_sound'],
        conclusion: 'gpu_problem',
        description: 'Jika masalah display dan ada bunyi beep maka masalah GPU'
      },
      {
        id: 'rule3',
        conditions: ['display_problem'],
        conclusion: 'check_cable',
        description: 'Jika masalah display maka cek kabel'
      }
    ],
    goal: 'display_problem'
  },
  {
    id: 'plant-identification',
    title: 'Identifikasi Tanaman',
    description: 'Sistem pakar untuk mengidentifikasi jenis tanaman',
    category: 'Botani',
    initialFacts: [
      { id: 'has_flowers', value: 'Memiliki bunga', description: 'Tanaman memiliki bunga' },
      { id: 'has_leaves', value: 'Memiliki daun', description: 'Tanaman memiliki daun' }
    ],
    rules: [
      {
        id: 'rule1',
        conditions: ['has_flowers'],
        conclusion: 'is_flowering_plant',
        description: 'Jika memiliki bunga maka tanaman berbunga'
      },
      {
        id: 'rule2',
        conditions: ['is_flowering_plant', 'has_petals'],
        conclusion: 'is_angiosperm',
        description: 'Jika tanaman berbunga dan memiliki kelopak maka angiospermae'
      },
      {
        id: 'rule3',
        conditions: ['has_leaves', 'green_color'],
        conclusion: 'has_chlorophyll',
        description: 'Jika memiliki daun dan berwarna hijau maka mengandung klorofil'
      }
    ],
    goal: 'is_flowering_plant'
  }
];
