import { DemoCase } from '../types/forward-chaining';

export const backwardDemoCases: DemoCase[] = [
  {
    id: 'medical_diagnosis',
    title: 'Diagnosis Medis',
    description: 'Sistem diagnosis untuk menentukan apakah pasien menderita flu',
    category: 'Kesehatan',
    initialFacts: [
      { id: 'fever', value: 'Pasien demam' },
      { id: 'headache', value: 'Pasien sakit kepala' },
      { id: 'cough', value: 'Pasien batuk' },
    ],
    rules: [
      {
        id: 'r1',
        conditions: ['fever', 'headache'],
        conclusion: 'flu_symptoms',
        description: 'Jika demam dan sakit kepala maka gejala flu'
      },
      {
        id: 'r2',
        conditions: ['flu_symptoms', 'cough'],
        conclusion: 'has_flu',
        description: 'Jika gejala flu dan batuk maka terdiagnosis flu'
      },
      {
        id: 'r3',
        conditions: ['fever', 'rash'],
        conclusion: 'measles_symptoms',
        description: 'Jika demam dan ruam maka gejala campak'
      },
      {
        id: 'r4',
        conditions: ['fever', 'sore_throat'],
        conclusion: 'throat_infection',
        description: 'Jika demam dan sakit tenggorokan maka infeksi tenggorokan'
      }
    ],
    goal: 'has_flu'
  },
  {
    id: 'car_troubleshooting',
    title: 'Troubleshooting Mobil',
    description: 'Mendiagnosis mengapa mobil tidak bisa menyala',
    category: 'Teknologi',
    initialFacts: [
      { id: 'no_fuel', value: 'Tidak ada bahan bakar' },
      { id: 'battery_dead', value: 'Baterai mati' },
    ],
    rules: [
      {
        id: 'r1',
        conditions: ['no_fuel'],
        conclusion: 'engine_wont_start',
        description: 'Jika tidak ada bahan bakar maka mesin tidak akan menyala'
      },
      {
        id: 'r2',
        conditions: ['battery_dead'],
        conclusion: 'no_electrical_power',
        description: 'Jika baterai mati maka tidak ada daya listrik'
      },
      {
        id: 'r3',
        conditions: ['no_electrical_power'],
        conclusion: 'engine_wont_start',
        description: 'Jika tidak ada daya listrik maka mesin tidak akan menyala'
      },
      {
        id: 'r4',
        conditions: ['engine_wont_start', 'lights_work'],
        conclusion: 'starter_problem',
        description: 'Jika mesin tidak menyala tapi lampu bekerja maka masalah di starter'
      }
    ],
    goal: 'engine_wont_start'
  },
  {
    id: 'student_eligibility',
    title: 'Kelayakan Beasiswa',
    description: 'Menentukan apakah siswa layak mendapat beasiswa',
    category: 'Pendidikan',
    initialFacts: [
      { id: 'good_grades', value: 'IPK di atas 3.5' },
      { id: 'active_student', value: 'Aktif dalam organisasi' },
      { id: 'financial_need', value: 'Membutuhkan bantuan finansial' },
    ],
    rules: [
      {
        id: 'r1',
        conditions: ['good_grades', 'active_student'],
        conclusion: 'academic_excellence',
        description: 'Jika nilai bagus dan aktif maka prestasi akademik baik'
      },
      {
        id: 'r2',
        conditions: ['academic_excellence', 'financial_need'],
        conclusion: 'eligible_scholarship',
        description: 'Jika prestasi baik dan butuh finansial maka layak beasiswa'
      },
      {
        id: 'r3',
        conditions: ['sports_achievement', 'good_grades'],
        conclusion: 'eligible_scholarship',
        description: 'Jika prestasi olahraga dan nilai bagus maka layak beasiswa'
      }
    ],
    goal: 'eligible_scholarship'
  },
  {
    id: 'network_diagnosis',
    title: 'Diagnosis Jaringan',
    description: 'Menentukan penyebab koneksi internet lambat',
    category: 'Teknologi',
    initialFacts: [
      { id: 'high_ping', value: 'Ping tinggi ke server' },
      { id: 'packet_loss', value: 'Terjadi packet loss' },
      { id: 'many_devices', value: 'Banyak perangkat terhubung' },
    ],
    rules: [
      {
        id: 'r1',
        conditions: ['high_ping', 'packet_loss'],
        conclusion: 'network_congestion',
        description: 'Jika ping tinggi dan packet loss maka jaringan padat'
      },
      {
        id: 'r2',
        conditions: ['network_congestion', 'many_devices'],
        conclusion: 'bandwidth_issue',
        description: 'Jika jaringan padat dan banyak perangkat maka masalah bandwidth'
      },
      {
        id: 'r3',
        conditions: ['bandwidth_issue'],
        conclusion: 'slow_connection',
        description: 'Jika masalah bandwidth maka koneksi lambat'
      },
      {
        id: 'r4',
        conditions: ['dns_problem'],
        conclusion: 'slow_connection',
        description: 'Jika masalah DNS maka koneksi lambat'
      }
    ],
    goal: 'slow_connection'
  }
];
