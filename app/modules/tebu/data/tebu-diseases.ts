import { Disease } from '../types';

export const tebuDiseases: Disease[] = [
  // PENYAKIT
  {
    id: 'P001',
    code: 'P001',
    name: 'Penyakit Busuk Pangkal Batang',
    type: 'penyakit',
    latinName: 'Pythium spp.',
    description: 'Penyakit yang menyerang pangkal batang tebu menyebabkan pembusukan',
    causes: 'Disebabkan oleh jamur Pythium yang berkembang di kondisi lembab',
    symptoms: ['G001', 'G007', 'G033', 'G037'],
    solutions: [
      'Cabut dan musnahkan tanaman yang terinfeksi',
      'Perbaiki drainase lahan',
      'Gunakan fungisida berbahan aktif Metalaxyl',
      'Lakukan sanitasi lahan'
    ],
    prevention: [
      'Gunakan bibit sehat',
      'Atur jarak tanam yang baik',
      'Pastikan drainase lahan bagus',
      'Rotasi tanaman'
    ],
    severity: 'berat',
    imageUrl: 'https://images.unsplash.com/photo-1584965503019-d4d2f4e08b7d?w=600&h=400&fit=crop'
  },
  {
    id: 'P002',
    code: 'P002',
    name: 'Penyakit Mosaik',
    type: 'penyakit',
    latinName: 'Sugarcane Mosaic Virus',
    description: 'Penyakit virus yang menyebabkan garis-garis kuning pada daun',
    causes: 'Disebabkan oleh virus mosaik yang ditularkan kutu daun',
    symptoms: ['G029', 'G016', 'G031', 'G009'],
    solutions: [
      'Cabut tanaman yang terinfeksi',
      'Kendalikan populasi kutu daun',
      'Gunakan insektisida sistemik',
      'Tanam varietas tahan'
    ],
    prevention: [
      'Gunakan bibit bebas virus',
      'Kendalikan vektor (kutu daun)',
      'Tanam varietas tahan virus',
      'Isolasi tanaman terinfeksi'
    ],
    severity: 'sedang',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop'
  },
  {
    id: 'P003',
    code: 'P003',
    name: 'Penyakit Pokahbung',
    type: 'penyakit',
    latinName: 'Fusarium moniliforme',
    description: 'Penyakit yang menyebabkan batang memanjang abnormal dengan ruas pendek',
    causes: 'Disebabkan oleh jamur Fusarium moniliforme',
    symptoms: ['G038', 'G013', 'G016', 'G031'],
    solutions: [
      'Cabut dan bakar tanaman sakit',
      'Gunakan fungisida Benomyl',
      'Sanitasi kebun',
      'Perbaiki drainase'
    ],
    prevention: [
      'Tanam bibit sehat',
      'Hindari luka mekanis',
      'Rotasi tanaman',
      'Gunakan varietas tahan'
    ],
    severity: 'sedang',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop'
  },
  {
    id: 'P004',
    code: 'P004',
    name: 'Penyakit Luka Api',
    type: 'penyakit',
    latinName: 'Xanthomonas albilineans',
    description: 'Penyakit bakteri yang menyebabkan garis putih memanjang pada daun',
    causes: 'Disebabkan oleh bakteri Xanthomonas albilineans',
    symptoms: ['G023', 'G026', 'G016', 'G014'],
    solutions: [
      'Cabut tanaman terinfeksi',
      'Semprotkan bakterisida',
      'Sterilisasi peralatan',
      'Gunakan bibit sehat'
    ],
    prevention: [
      'Gunakan bibit bebas penyakit',
      'Sterilisasi alat potong',
      'Hindari penyebaran air irigasi',
      'Tanam varietas tahan'
    ],
    severity: 'berat',
    imageUrl: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600&h=400&fit=crop'
  },
  {
    id: 'P005',
    code: 'P005',
    name: 'Penyakit Busuk Merah',
    type: 'penyakit',
    latinName: 'Colletotrichum falcatum',
    description: 'Penyakit jamur yang menyebabkan batang busuk berwarna merah',
    causes: 'Disebabkan oleh jamur Colletotrichum falcatum',
    symptoms: ['G012', 'G034', 'G007', 'G013'],
    solutions: [
      'Cabut dan bakar tanaman sakit',
      'Aplikasi fungisida Mankozeb',
      'Perbaiki drainase',
      'Sanitasi lahan'
    ],
    prevention: [
      'Tanam varietas tahan',
      'Gunakan bibit sehat',
      'Hindari luka pada batang',
      'Atur drainase yang baik'
    ],
    severity: 'berat'
  },
  {
    id: 'P006',
    code: 'P006',
    name: 'Penyakit Bercak Cincin',
    type: 'penyakit',
    latinName: 'Leptosphaeria sacchari',
    description: 'Penyakit yang menyebabkan bercak cincin pada daun',
    causes: 'Disebabkan oleh jamur Leptosphaeria sacchari',
    symptoms: ['G018', 'G026', 'G017'],
    solutions: [
      'Semprot fungisida',
      'Buang daun terinfeksi',
      'Perbaiki sanitasi',
      'Tingkatkan sirkulasi udara'
    ],
    prevention: [
      'Jaga jarak tanam',
      'Hindari kelembaban berlebih',
      'Pemupukan berimbang',
      'Gunakan varietas tahan'
    ],
    severity: 'ringan'
  },
  {
    id: 'P007',
    code: 'P007',
    name: 'Penyakit Karat',
    type: 'penyakit',
    latinName: 'Puccinia melanocephala',
    description: 'Penyakit karat yang menyebabkan bercak coklat kemerahan pada daun',
    causes: 'Disebabkan oleh jamur karat Puccinia melanocephala',
    symptoms: ['G019', 'G026', 'G017', 'G028'],
    solutions: [
      'Aplikasi fungisida Propikonazol',
      'Buang daun terinfeksi',
      'Tingkatkan sirkulasi udara',
      'Kurangi kelembaban'
    ],
    prevention: [
      'Tanam varietas tahan karat',
      'Jaga jarak tanam',
      'Pemantauan rutin',
      'Hindari pemupukan N berlebih'
    ],
    severity: 'sedang'
  },
  {
    id: 'P008',
    code: 'P008',
    name: 'Penyakit Noda Kuning',
    type: 'penyakit',
    latinName: 'Mycovellosiella koepkei',
    description: 'Penyakit yang menyebabkan bercak kuning pada daun',
    causes: 'Disebabkan oleh jamur Mycovellosiella koepkei',
    symptoms: ['G016', 'G018', 'G030'],
    solutions: [
      'Semprot fungisida sistemik',
      'Buang daun terinfeksi',
      'Perbaiki nutrisi tanaman',
      'Tingkatkan drainase'
    ],
    prevention: [
      'Pemupukan berimbang',
      'Jaga kelembaban optimal',
      'Monitoring rutin',
      'Sanitasi kebun'
    ],
    severity: 'ringan'
  },

  // HAMA
  {
    id: 'H001',
    code: 'H001',
    name: 'Penggerek Batang Bergaris',
    type: 'hama',
    latinName: 'Chilo sacchariphagus',
    description: 'Hama ulat yang menggerek batang tebu',
    causes: 'Larva ngengat Chilo yang menyerang batang tebu',
    symptoms: ['G006', 'G015', 'G013', 'G035'],
    solutions: [
      'Aplikasi insektisida Karbofuran',
      'Lepas musuh alami Trichogramma',
      'Bersihkan sisa tanaman',
      'Tanam serentak'
    ],
    prevention: [
      'Sanitasi kebun',
      'Tanam serempak',
      'Lepas parasitoid Trichogramma',
      'Monitoring rutin'
    ],
    severity: 'berat',
    imageUrl: 'https://images.unsplash.com/photo-1547407139-3ab0c7e51d75?w=600&h=400&fit=crop'
  },
  {
    id: 'H002',
    code: 'H002',
    name: 'Penggerek Pucuk',
    type: 'hama',
    latinName: 'Scirpophaga excerptalis',
    description: 'Hama yang menyerang pucuk tanaman tebu',
    causes: 'Larva penggerek pucuk yang memakan titik tumbuh',
    symptoms: ['G014', 'G031', 'G035', 'G021'],
    solutions: [
      'Potong dan musnahkan pucuk terserang',
      'Aplikasi insektisida sistemik',
      'Lepas predator alami',
      'Monitoring intensif'
    ],
    prevention: [
      'Tanam serempak',
      'Sanitasi kebun',
      'Gunakan perangkap feromon',
      'Lepas musuh alami'
    ],
    severity: 'berat',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'
  },
  {
    id: 'H003',
    code: 'H003',
    name: 'Kutu Daun',
    type: 'hama',
    latinName: 'Melanaphis sacchari',
    description: 'Kutu yang menghisap cairan daun dan menularkan virus',
    causes: 'Populasi kutu daun yang berkembang pesat',
    symptoms: ['G036', 'G021', 'G030', 'G025'],
    solutions: [
      'Semprot insektisida Imidakloprid',
      'Lepas predator Coccinellidae',
      'Cuci tanaman dengan air',
      'Gunakan sabun insektisida'
    ],
    prevention: [
      'Monitoring populasi',
      'Konservasi musuh alami',
      'Hindari pemupukan N berlebih',
      'Tanam tanaman refugia'
    ],
    severity: 'sedang',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=400&fit=crop'
  },
  {
    id: 'H004',
    code: 'H004',
    name: 'Tikus',
    type: 'hama',
    latinName: 'Rattus argentiventer',
    description: 'Tikus yang memakan batang tebu muda',
    causes: 'Populasi tikus yang tinggi di sekitar kebun',
    symptoms: ['G006', 'G010', 'G013', 'G037'],
    solutions: [
      'Pasang perangkap tikus',
      'Gunakan rodentisida',
      'Buru masal (gropyokan)',
      'Pelihara predator alami'
    ],
    prevention: [
      'Sanitasi lingkungan',
      'Buat TBS (Trap Barrier System)',
      'Tanam serempak',
      'Pelihara burung hantu/ular'
    ],
    severity: 'berat'
  },
  {
    id: 'H005',
    code: 'H005',
    name: 'Uret',
    type: 'hama',
    latinName: 'Lepidiota stigma',
    description: 'Larva kumbang yang memakan akar tebu',
    causes: 'Larva kumbang tanah yang menyerang sistem perakaran',
    symptoms: ['G001', 'G003', 'G005', 'G037'],
    solutions: [
      'Aplikasi insektisida Fipronil ke tanah',
      'Biarkan burung memakan uret',
      'Bajak tanah untuk ekspos uret',
      'Gunakan Beauveria bassiana'
    ],
    prevention: [
      'Olah tanah sempurna',
      'Rotasi tanaman',
      'Konservasi burung pemakan uret',
      'Aplikasi agens hayati'
    ],
    severity: 'berat'
  },
  {
    id: 'H006',
    code: 'H006',
    name: 'Ulat Grayak',
    type: 'hama',
    latinName: 'Spodoptera litura',
    description: 'Ulat yang memakan daun tebu',
    causes: 'Larva ngengat Spodoptera yang rakus memakan daun',
    symptoms: ['G020', 'G024', 'G035', 'G017'],
    solutions: [
      'Kumpulkan dan musnahkan telur/larva',
      'Semprot insektisida Klorpirifos',
      'Gunakan Bacillus thuringiensis',
      'Lepas parasitoid'
    ],
    prevention: [
      'Monitoring telur dan larva',
      'Gunakan perangkap feromon',
      'Konservasi musuh alami',
      'Sanitasi kebun'
    ],
    severity: 'sedang'
  },
  {
    id: 'H007',
    code: 'H007',
    name: 'Belalang',
    type: 'hama',
    latinName: 'Valanga nigricornis',
    description: 'Belalang yang memakan daun tebu muda',
    causes: 'Serangan belalang dalam jumlah besar',
    symptoms: ['G020', 'G024', 'G017'],
    solutions: [
      'Tangkap belalang secara manual',
      'Gunakan insektisida kontak',
      'Buat suara keras untuk mengusir',
      'Pasang jaring penghalang'
    ],
    prevention: [
      'Bersihkan gulma sekitar',
      'Monitoring populasi',
      'Pelihara predator alami',
      'Koordinasi pengendalian wilayah'
    ],
    severity: 'ringan'
  },
  {
    id: 'H008',
    code: 'H008',
    name: 'Kepinding Tanah',
    type: 'hama',
    latinName: 'Leptocorisa acuta',
    description: 'Serangga penghisap yang merusak batang muda',
    causes: 'Kepinding yang menghisap cairan batang',
    symptoms: ['G008', 'G013', 'G031', 'G027'],
    solutions: [
      'Semprot insektisida sistemik',
      'Bersihkan gulma',
      'Gunakan perangkap',
      'Lepas predator alami'
    ],
    prevention: [
      'Sanitasi kebun',
      'Hindari genangan air',
      'Monitoring rutin',
      'Konservasi musuh alami'
    ],
    severity: 'sedang'
  },
  
  // Penyakit Tambahan
  {
    id: 'P006',
    code: 'P006',
    name: 'Penyakit Noda Kuning',
    type: 'penyakit',
    latinName: 'Mycovellosiella koepkei',
    description: 'Penyakit yang menyebabkan bercak kuning pada daun',
    causes: 'Disebabkan oleh jamur Mycovellosiella koepkei',
    symptoms: ['G016', 'G018', 'G030'],
    solutions: [
      'Semprot fungisida sistemik',
      'Buang daun terinfeksi',
      'Perbaiki nutrisi tanaman',
      'Tingkatkan drainase'
    ],
    prevention: [
      'Pemupukan berimbang',
      'Jaga kelembaban optimal',
      'Monitoring rutin',
      'Sanitasi kebun'
    ],
    severity: 'ringan',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop'
  },
  {
    id: 'P007',
    code: 'P007',
    name: 'Penyakit Karat',
    type: 'penyakit',
    latinName: 'Puccinia melanocephala',
    description: 'Penyakit karat yang menyebabkan bercak coklat kemerahan pada daun',
    causes: 'Disebabkan oleh jamur karat Puccinia melanocephala',
    symptoms: ['G019', 'G026', 'G017', 'G028'],
    solutions: [
      'Aplikasi fungisida Propikonazol',
      'Buang daun terinfeksi',
      'Tingkatkan sirkulasi udara',
      'Kurangi kelembaban'
    ],
    prevention: [
      'Tanam varietas tahan karat',
      'Jaga jarak tanam',
      'Pemantauan rutin',
      'Hindari pemupukan N berlebih'
    ],
    severity: 'sedang',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop'
  },
  {
    id: 'P008',
    code: 'P008',
    name: 'Penyakit Hawar Daun',
    type: 'penyakit',
    latinName: 'Helminthosporium sacchari',
    description: 'Penyakit hawar yang menyebabkan daun mengering cepat',
    causes: 'Jamur Helminthosporium yang menyerang daun',
    symptoms: ['G017', 'G028', 'G026'],
    solutions: [
      'Aplikasi fungisida berbahan Mancozeb',
      'Pangkas dan bakar daun sakit',
      'Perbaiki drainase lahan',
      'Kurangi kelembaban'
    ],
    prevention: [
      'Gunakan varietas tahan',
      'Jaga jarak tanam optimal',
      'Pemupukan seimbang',
      'Rotasi tanaman'
    ],
    severity: 'sedang',
    imageUrl: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=600&h=400&fit=crop'
  },
  {
    id: 'P009',
    code: 'P009',
    name: 'Penyakit Antraknosa',
    type: 'penyakit',
    latinName: 'Colletotrichum gloeosporioides',
    description: 'Penyakit yang menyebabkan bercak nekrotik pada daun dan batang',
    causes: 'Jamur Colletotrichum yang berkembang di kondisi lembab',
    symptoms: ['G018', 'G012', 'G026'],
    solutions: [
      'Semprot fungisida berbasis tembaga',
      'Buang bagian tanaman terinfeksi',
      'Perbaiki sirkulasi udara',
      'Kurangi irigasi berlebih'
    ],
    prevention: [
      'Sanitasi lahan yang baik',
      'Gunakan bibit sehat',
      'Hindari luka mekanis',
      'Atur jarak tanam'
    ],
    severity: 'sedang'
  },
  {
    id: 'P010',
    code: 'P010',
    name: 'Penyakit Akar Merah',
    type: 'penyakit',
    latinName: 'Physalospora tucumanensis',
    description: 'Penyakit yang menyebabkan akar dan pangkal batang berwarna merah',
    causes: 'Jamur Physalospora yang menyerang sistem perakaran',
    symptoms: ['G004', 'G001', 'G037', 'G022'],
    solutions: [
      'Cabut dan musnahkan tanaman terinfeksi',
      'Aplikasi fungisida sistemik ke tanah',
      'Perbaiki drainase',
      'Rotasi dengan tanaman non-tebu'
    ],
    prevention: [
      'Gunakan bibit bebas penyakit',
      'Hindari genangan air',
      'Olah tanah yang baik',
      'Sterilisasi peralatan'
    ],
    severity: 'berat'
  },
  {
    id: 'P011',
    code: 'P011',
    name: 'Penyakit Gomosis',
    type: 'penyakit',
    latinName: 'Xanthomonas campestris',
    description: 'Penyakit bakteri yang menyebabkan keluarnya getah dari batang',
    causes: 'Bakteri Xanthomonas yang menginfeksi jaringan batang',
    symptoms: ['G011', 'G007', 'G013'],
    solutions: [
      'Aplikasi bakterisida',
      'Potong bagian terinfeksi',
      'Sterilisasi luka dengan fungisida',
      'Perbaiki nutrisi tanaman'
    ],
    prevention: [
      'Hindari luka pada batang',
      'Sterilisasi alat pemotong',
      'Gunakan varietas tahan',
      'Sanitasi kebun'
    ],
    severity: 'sedang'
  },
  {
    id: 'P012',
    code: 'P012',
    name: 'Penyakit Layu Bakteri',
    type: 'penyakit',
    latinName: 'Pseudomonas solanacearum',
    description: 'Penyakit bakteri yang menyebabkan tanaman layu mendadak',
    causes: 'Bakteri Pseudomonas yang menyumbat pembuluh air',
    symptoms: ['G022', 'G016', 'G037', 'G033'],
    solutions: [
      'Cabut dan bakar tanaman sakit',
      'Aplikasi bakterisida preventif',
      'Perbaiki drainase lahan',
      'Sterilisasi tanah'
    ],
    prevention: [
      'Gunakan bibit sehat bersertifikat',
      'Rotasi tanaman 3-4 tahun',
      'Hindari luka akar',
      'Drainase yang baik'
    ],
    severity: 'berat'
  },

  // Hama Tambahan
  {
    id: 'H009',
    code: 'H009',
    name: 'Wereng Tebu',
    type: 'hama',
    latinName: 'Perkinsiella saccharicida',
    description: 'Serangga kecil yang menghisap cairan daun',
    causes: 'Populasi wereng yang menghisap cairan tanaman',
    symptoms: ['G030', 'G027', 'G031'],
    solutions: [
      'Semprot insektisida sistemik',
      'Lepas predator alami',
      'Pasang perangkap kuning',
      'Bersihkan gulma'
    ],
    prevention: [
      'Monitoring populasi rutin',
      'Konservasi musuh alami',
      'Tanam serempak',
      'Hindari pemupukan N berlebih'
    ],
    severity: 'sedang'
  },
  {
    id: 'H010',
    code: 'H010',
    name: 'Kumbang Lundi',
    type: 'hama',
    latinName: 'Cosmopolites sordidus',
    description: 'Kumbang yang merusak batang bagian bawah',
    causes: 'Larva kumbang yang menggerek batang',
    symptoms: ['G006', 'G010', 'G015'],
    solutions: [
      'Aplikasi insektisida granular',
      'Perangkap dengan potongan batang',
      'Sanitasi kebun',
      'Gunakan nematoda entomopatogen'
    ],
    prevention: [
      'Gunakan bibit sehat',
      'Bersihkan sisa tanaman',
      'Rotasi tanaman',
      'Tanam serempak'
    ],
    severity: 'berat'
  },
  {
    id: 'H011',
    code: 'H011',
    name: 'Lalat Bibit',
    type: 'hama',
    latinName: 'Atherigona soccata',
    description: 'Lalat yang menyerang tunas muda tebu',
    causes: 'Larva lalat yang memakan titik tumbuh',
    symptoms: ['G014', 'G031', 'G009'],
    solutions: [
      'Aplikasi insektisida pada bibit',
      'Rendam bibit dalam larutan insektisida',
      'Buang tunas mati',
      'Gunakan bibit tahan'
    ],
    prevention: [
      'Perlakuan bibit sebelum tanam',
      'Tanam pada musim yang tepat',
      'Monitoring intensif',
      'Sanitasi area pembibitan'
    ],
    severity: 'sedang'
  },
  {
    id: 'H012',
    code: 'H012',
    name: 'Rayap',
    type: 'hama',
    latinName: 'Coptotermes curvignathus',
    description: 'Rayap yang merusak batang dan akar tebu',
    causes: 'Koloni rayap yang menyerang bagian bawah tanaman',
    symptoms: ['G006', 'G015', 'G037', 'G001'],
    solutions: [
      'Aplikasi insektisida anti rayap',
      'Gunakan umpan rayap',
      'Perbaiki drainase',
      'Buang batang terinfeksi'
    ],
    prevention: [
      'Bersihkan sisa tanaman',
      'Hindari mulsa berlebih',
      'Olah tanah yang baik',
      'Monitoring koloni rayap'
    ],
    severity: 'berat'
  },
  {
    id: 'H013',
    code: 'H013',
    name: 'Kutu Perisai',
    type: 'hama',
    latinName: 'Aspidiotus destructor',
    description: 'Kutu berpelindung yang menghisap cairan batang',
    causes: 'Kutu perisai yang menempel di batang',
    symptoms: ['G008', 'G013', 'G027'],
    solutions: [
      'Semprot minyak mineral',
      'Aplikasi insektisida sistemik',
      'Kuas bagian terinfeksi',
      'Lepas predator alami'
    ],
    prevention: [
      'Monitoring rutin',
      'Sanitasi kebun',
      'Hindari kekeringan',
      'Konservasi predator'
    ],
    severity: 'ringan'
  },
  {
    id: 'H014',
    code: 'H014',
    name: 'Penggerek Akar',
    type: 'hama',
    latinName: 'Emmalocera depressella',
    description: 'Ulat yang menggerek dan merusak akar tebu',
    causes: 'Larva ngengat yang menyerang sistem perakaran',
    symptoms: ['G005', 'G003', 'G037', 'G002'],
    solutions: [
      'Aplikasi insektisida ke tanah',
      'Bajak tanah dalam',
      'Gunakan agens hayati',
      'Bersihkan sisa tanaman'
    ],
    prevention: [
      'Olah tanah sempurna',
      'Rotasi tanaman',
      'Sanitasi lahan',
      'Tanam serempak'
    ],
    severity: 'berat'
  },
  {
    id: 'H015',
    code: 'H015',
    name: 'Trips',
    type: 'hama',
    latinName: 'Thrips saccharoni',
    description: 'Serangga kecil yang merusak daun muda',
    causes: 'Trips yang menghisap cairan daun',
    symptoms: ['G027', 'G030', 'G026'],
    solutions: [
      'Semprot insektisida kontak',
      'Gunakan perangkap biru',
      'Lepas predator alami',
      'Tingkatkan kelembaban'
    ],
    prevention: [
      'Monitoring populasi',
      'Sanitasi gulma',
      'Konservasi musuh alami',
      'Hindari kekeringan'
    ],
    severity: 'ringan'
  },
  {
    id: 'H016',
    code: 'H016',
    name: 'Ngengat Batang',
    type: 'hama',
    latinName: 'Diatraea saccharalis',
    description: 'Ngengat yang larvanya menggerek batang tebu',
    causes: 'Larva ngengat yang merusak bagian dalam batang',
    symptoms: ['G006', 'G015', 'G013', 'G035'],
    solutions: [
      'Aplikasi insektisida sistemik',
      'Lepas parasitoid Trichogramma',
      'Potong dan bakar batang terinfeksi',
      'Monitoring intensif'
    ],
    prevention: [
      'Tanam serempak',
      'Sanitasi kebun',
      'Gunakan perangkap feromon',
      'Lepas musuh alami'
    ],
    severity: 'berat'
  }
];
