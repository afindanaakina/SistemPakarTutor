// Data penyakit dan hama tanaman pisang
export interface PisangDisease {
  id: string;
  name: string;
  type: 'penyakit' | 'hama';
  description: string;
  cause: string;
  symptoms: string[];
  prevention: string[];
  control_physical: string[];
  control_chemical: string[];
  image?: string;
}

export const pisangDiseases: PisangDisease[] = [
  // ===== PENYAKIT =====
  {
    id: 'P001',
    name: 'Penyakit Layu Moko (Moko Disease)',
    type: 'penyakit',
    description: 'Penyakit bakterial yang sangat serius pada tanaman pisang, menyebabkan layu dan kematian tanaman.',
    cause: 'Bakteri Ralstonia solanacearum (Pseudomonas solanacearum)',
    symptoms: [
      'Daun menguning dan layu dimulai dari daun muda',
      'Batang berwarna coklat kehitaman di bagian dalam',
      'Keluar cairan lengket berwarna coklat dari batang',
      'Buah tidak berkembang atau busuk sebelum matang',
      'Tanaman mati dalam waktu singkat'
    ],
    prevention: [
      'Gunakan bibit sehat bersertifikat',
      'Hindari penanaman di lahan yang pernah terserang',
      'Sterilkan alat potong dengan larutan disinfektan',
      'Rotasi tanaman dengan tanaman bukan inang',
      'Karantina tanaman baru sebelum ditanam'
    ],
    control_physical: [
      'Cabut dan musnahkan tanaman terinfeksi dengan cara dibakar',
      'Bersihkan area sekitar dari sisa-sisa tanaman',
      'Jangan tanam pisang di lahan sama minimal 2 tahun',
      'Gunakan pisau steril saat memotong tunas'
    ],
    control_chemical: [
      'Tidak ada pengobatan kimia yang efektif',
      'Fokus pada pencegahan dan sanitasi',
      'Gunakan bakterisida untuk pencegahan (konsultasi PPL)'
    ],
    image: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_moko_disease_525.htm'
  },
  {
    id: 'P002',
    name: 'Penyakit Layu Panama (Panama Disease)',
    type: 'penyakit',
    description: 'Penyakit jamur yang menyerang sistem pembuluh tanaman pisang, menyebabkan layu permanen.',
    cause: 'Jamur Fusarium oxysporum f.sp. cubense',
    symptoms: [
      'Daun menguning dimulai dari tepi daun tua',
      'Daun layu dan patah di pangkal',
      'Batang berwarna coklat kemerahan di bagian dalam',
      'Pertumbuhan terhambat',
      'Tanaman mati perlahan'
    ],
    prevention: [
      'Tanam varietas tahan penyakit',
      'Gunakan bibit kultur jaringan',
      'Hindari penanaman di tanah tercemar',
      'Drainase yang baik',
      'Jangan pindahkan tanah dari area terinfeksi'
    ],
    control_physical: [
      'Cabut tanaman sakit beserta akarnya',
      'Bakar tanaman yang terinfeksi',
      'Beri kapur pada lubang bekas tanaman sakit',
      'Istirahatkan lahan minimal 3 tahun'
    ],
    control_chemical: [
      'Aplikasi fungisida sistemik (konsultasi ahli)',
      'Perlakuan tanah dengan fumigant (untuk lahan luas)',
      'Gunakan Trichoderma sebagai bio-fungisida'
    ],
    image: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_fusarium_wilt_176.htm'
  },
  {
    id: 'P003',
    name: 'Penyakit Bercak Daun (Sigatoka)',
    type: 'penyakit',
    description: 'Penyakit jamur pada daun yang mengurangi fotosintesis dan produktivitas.',
    cause: 'Jamur Mycosphaerella musicola (Yellow Sigatoka) atau M. fijiensis (Black Sigatoka)',
    symptoms: [
      'Bercak kecil kuning atau coklat pada daun',
      'Bercak membesar dan berubah hitam',
      'Daun kering dari tepi',
      'Daun mati sebelum waktunya',
      'Buah kecil dan tidak berkualitas'
    ],
    prevention: [
      'Jarak tanam yang cukup untuk sirkulasi udara',
      'Buang daun yang terinfeksi',
      'Hindari kelembaban berlebihan',
      'Tanam varietas tahan penyakit',
      'Drainase yang baik'
    ],
    control_physical: [
      'Potong dan musnahkan daun yang terserang',
      'Atur jarak tanam untuk ventilasi',
      'Bersihkan gulma di sekitar tanaman',
      'Kurangi kelembaban dengan pemangkasan'
    ],
    control_chemical: [
      'Semprot fungisida berbahan dasar tembaga',
      'Aplikasi fungisida sistemik secara berkala',
      'Gunakan minyak mineral untuk mengurangi spora',
      'Rotasi jenis fungisida untuk hindari resistensi'
    ],
    image: 'https://www.promusa.org/Sigatoka+leaf+spot'
  },
  {
    id: 'P004',
    name: 'Penyakit Virus Bunchy Top',
    type: 'penyakit',
    description: 'Penyakit virus yang menyebabkan tanaman kerdil dengan daun berkerut.',
    cause: 'Banana Bunchy Top Virus (BBTV), disebarkan oleh kutu daun',
    symptoms: [
      'Daun baru tumbuh kerdil dan berkerut',
      'Daun berwarna hijau gelap dengan garis kuning',
      'Tanaman tidak berbuah',
      'Pertumbuhan sangat terhambat',
      'Daun tegak seperti roset'
    ],
    prevention: [
      'Gunakan bibit sehat dan bersertifikat',
      'Kontrol populasi kutu daun (vektor virus)',
      'Karantina tanaman baru',
      'Hindari pemindahan bibit dari area terinfeksi',
      'Monitoring rutin untuk deteksi dini'
    ],
    control_physical: [
      'Cabut dan musnahkan tanaman terinfeksi segera',
      'Jangan gunakan tunas dari tanaman sakit',
      'Kontrol kutu daun dengan semprotan air',
      'Bersihkan area dari tanaman sakit'
    ],
    control_chemical: [
      'Tidak ada obat untuk virus',
      'Semprot insektisida untuk kontrol kutu daun',
      'Gunakan minyak neem sebagai repelan kutu',
      'Fokus pada pencegahan penyebaran'
    ],
    image: 'https://www.ctahr.hawaii.edu/bbtd/downloads/bbtv-details.pdf'
  },
  {
    id: 'P005',
    name: 'Penyakit Busuk Bonggol',
    type: 'penyakit',
    description: 'Penyakit jamur yang menyerang bonggol dan akar menyebabkan tanaman roboh.',
    cause: 'Jamur Erwinia chrysanthemi atau Fusarium sp.',
    symptoms: [
      'Akar berwarna coklat dan membusuk',
      'Keluar bau busuk dari bonggol',
      'Batang layu dan mudah roboh',
      'Daun menguning dan layu',
      'Pertumbuhan terhambat'
    ],
    prevention: [
      'Hindari tanah yang tergenang air',
      'Drainase yang baik',
      'Gunakan bibit sehat',
      'Jangan melukai bonggol saat tanam',
      'Rotasi tanaman'
    ],
    control_physical: [
      'Perbaiki drainase lahan',
      'Cabut tanaman yang busuk',
      'Keringkan tanah dengan pengairan yang baik',
      'Buang sisa-sisa tanaman busuk'
    ],
    control_chemical: [
      'Aplikasi fungisida pada bonggol saat tanam',
      'Gunakan bakterisida untuk busuk bakteri',
      'Perlakuan benih dengan fungisida',
      'Semprot area sekitar dengan disinfektan'
    ],
    image: 'https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/banana_bacterial_erwinia_wilt_214.htm'
  },

  // ===== HAMA =====
  {
    id: 'H001',
    name: 'Penggerek Batang Pisang',
    type: 'hama',
    description: 'Larva kumbang yang menggerek batang pisang dari dalam.',
    cause: 'Larva kumbang Odoiporus longicollis',
    symptoms: [
      'Batang berlubang kecil',
      'Keluar cairan dari lubang gerek',
      'Batang mudah patah',
      'Pertumbuhan terhambat',
      'Ada bekas gigitan pada batang'
    ],
    prevention: [
      'Bersihkan sisa-sisa tanaman tua',
      'Hindari luka pada batang',
      'Tanam varietas tahan hama',
      'Monitoring rutin untuk deteksi dini',
      'Jaga kebersihan kebun'
    ],
    control_physical: [
      'Tangkap kumbang dewasa secara manual',
      'Potong bagian batang yang terserang',
      'Tusuk lubang gerek dengan kawat',
      'Bersihkan gulma sekitar tanaman'
    ],
    control_chemical: [
      'Suntik insektisida ke dalam lubang gerek',
      'Semprot batang dengan insektisida',
      'Gunakan perangkap feromon untuk kumbang',
      'Aplikasi insektisida sistemik'
    ],
    image: 'https://agritech.tnau.ac.in/crop_protection/banana_pest/banana_2.html'
  },
  {
    id: 'H002',
    name: 'Kutu Daun (Aphid)',
    type: 'hama',
    description: 'Serangga kecil yang menghisap cairan daun dan menularkan virus.',
    cause: 'Pentalonia nigronervosa (kutu daun pisang)',
    symptoms: [
      'Daun menggulung dan keriting',
      'Daun lengket karena embun madu',
      'Daun menguning',
      'Pertumbuhan terhambat',
      'Muncul semut pada tanaman'
    ],
    prevention: [
      'Tanam varietas tahan kutu',
      'Jaga kebersihan kebun',
      'Hindari penggunaan nitrogen berlebihan',
      'Monitoring rutin',
      'Tanam tanaman pengusir kutu'
    ],
    control_physical: [
      'Semprot dengan air bertekanan',
      'Pangkas bagian yang terserang',
      'Lepas kutu dengan tangan (pakai sarung tangan)',
      'Gunakan perangkap kuning lengket'
    ],
    control_chemical: [
      'Semprot insektisida berbahan imidakloprid',
      'Gunakan sabun insektisida',
      'Aplikasi minyak neem',
      'Semprot pestisida nabati (bawang putih + cabai)'
    ],
    image: 'https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/banana_aphid_103.htm'
  },
  {
    id: 'H003',
    name: 'Ulat Daun',
    type: 'hama',
    description: 'Larva kupu-kupu yang memakan daun pisang.',
    cause: 'Berbagai jenis ulat pemakan daun',
    symptoms: [
      'Daun berlubang-lubang',
      'Daun rusak di bagian tepi',
      'Terlihat ulat di permukaan daun',
      'Daun tinggal tulang daun',
      'Ada kotoran ulat pada daun'
    ],
    prevention: [
      'Monitoring rutin untuk telur dan ulat kecil',
      'Jaga kebersihan kebun',
      'Tanam tanaman refugia untuk predator alami',
      'Hindari monokultur',
      'Rotasi tanaman'
    ],
    control_physical: [
      'Ambil ulat secara manual',
      'Potong daun yang banyak telur',
      'Gunakan jaring penutup untuk tanaman muda',
      'Lepas predator alami (burung, laba-laba)'
    ],
    control_chemical: [
      'Semprot insektisida biologis (Bacillus thuringiensis)',
      'Gunakan insektisida nabati',
      'Aplikasi pestisida kimia jika serangan parah',
      'Semprot pada sore hari saat ulat aktif'
    ],
    image: 'https://apps.lucidcentral.org/ppp/text/web_full/entities/banana_skipper_181.htm'
  },
  {
    id: 'H004',
    name: 'Kumbang Daun',
    type: 'hama',
    description: 'Kumbang kecil yang memakan permukaan daun.',
    cause: 'Berbagai spesies kumbang daun',
    symptoms: [
      'Daun berlubang kecil-kecil',
      'Permukaan daun berbintik putih',
      'Terlihat kumbang kecil di daun',
      'Daun kering dan coklat',
      'Pertumbuhan daun terganggu'
    ],
    prevention: [
      'Jaga kebersihan kebun',
      'Buang gulma sekitar tanaman',
      'Monitoring rutin',
      'Tanam tanaman perangkap',
      'Mulsa untuk kurangi populasi'
    ],
    control_physical: [
      'Kocok tanaman pagi hari, kumbang jatuh',
      'Tangkap kumbang dengan jaring',
      'Gunakan perangkap kuning',
      'Semprot air sabun'
    ],
    control_chemical: [
      'Semprot insektisida kontak',
      'Gunakan pestisida nabati',
      'Aplikasi insektisida piretroid',
      'Rotasi jenis insektisida'
    ],
    image: 'https://plantix.net/en/library/plant-diseases/600172/banana-fruit-scarring-beetle/'
  },
  {
    id: 'H005',
    name: 'Nematoda',
    type: 'hama',
    description: 'Cacing mikroskopis yang menyerang akar dan bonggol pisang.',
    cause: 'Radopholus similis dan Pratylenchus sp.',
    symptoms: [
      'Akar berwarna coklat kehitaman',
      'Akar mudah patah',
      'Pertumbuhan terhambat',
      'Daun menguning',
      'Tanaman mudah roboh'
    ],
    prevention: [
      'Gunakan bibit kultur jaringan (bebas nematoda)',
      'Rotasi tanaman dengan tanaman bukan inang',
      'Hindari penanaman di lahan terinfeksi',
      'Sterilisasi alat tanam',
      'Drainase yang baik'
    ],
    control_physical: [
      'Cabut dan musnahkan tanaman terserang',
      'Solarisasi tanah (tutup plastik transparan)',
      'Istirahatkan lahan 6-12 bulan',
      'Tanam tanaman antagonis (tagetes)'
    ],
    control_chemical: [
      'Aplikasi nematisida pada lubang tanam',
      'Gunakan pestisida biologis (jamur Paecilomyces)',
      'Perlakuan bonggol dengan air panas (52°C, 20 menit)',
      'Gunakan pupuk organik yang difermentasi'
    ],
    image: 'https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/banana_burrowing_nematode_257.htm'
  },
];
