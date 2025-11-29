// Data gejala penyakit tanaman pisang
export interface PisangSymptom {
  id: string;
  name: string;
  category: 'akar' | 'batang' | 'daun' | 'buah';
  imageUrl?: string;
  description?: string;
}

export const pisangSymptoms: PisangSymptom[] = [
  // Gejala pada Akar
  {
    id: 'G001',
    name: 'Akar berwarna coklat kemerahan',
    category: 'akar',
    description: 'Akar berubah warna menjadi coklat kemerahan akibat infeksi nematoda atau penyakit lain',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/banana_burrowing_nematode_257.htm'
  },
  {
    id: 'G002',
    name: 'Akar membusuk dan berbau',
    category: 'akar',
    description: 'Akar membusuk dengan bau busuk yang khas, biasanya karena infeksi bakteri',
    imageUrl: 'https://plantix.net/en/library/plant-diseases/100195/bacterial-soft-rot-of-banana/'
  },
  {
    id: 'G003',
    name: 'Akar menghitam',
    category: 'akar',
    description: 'Akar berubah warna menjadi hitam akibat pembusukan lanjut',
    imageUrl: 'https://cafeplanta.com/blogs/resources/banana-plant-root-rot'
  },
  {
    id: 'G004',
    name: 'Keluar cairan merah dari akar',
    category: 'akar',
    description: 'Cairan berwarna merah keluar dari akar yang terinfeksi blood disease',
    imageUrl: 'https://www.agriculture.gov.au/biosecurity-trade/pests-diseases-weeds/plant/identify/blood-and-moko-diseases-banana'
  },
  {
    id: 'G005',
    name: 'Akar mudah patah',
    category: 'akar',
    description: 'Akar menjadi rapuh dan mudah patah karena kerusakan jaringan',
    imageUrl: 'https://entnemdept.ufl.edu/creatures/NEMATODE/Radopholus_similis.htm'
  },

  // Gejala pada Batang
  {
    id: 'G006',
    name: 'Batang menguning dari bawah',
    category: 'batang',
    description: 'Batang semu menguning dimulai dari bagian bawah, gejala panama disease',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_fusarium_wilt_176.htm'
  },
  {
    id: 'G007',
    name: 'Batang retak dan kering',
    category: 'batang',
    description: 'Batang mengalami retakan longitudinal dan mengering',
    imageUrl: 'https://www.promusa.org/Fusarium+wilt'
  },
  {
    id: 'G008',
    name: 'Keluar cairan lengket dari batang',
    category: 'batang',
    description: 'Cairan lengket berwarna kuning atau krem keluar dari batang yang terinfeksi bakteri',
    imageUrl: 'https://www.promusa.org/Xanthomonas+wilt'
  },
  {
    id: 'G009',
    name: 'Batang berlubang',
    category: 'batang',
    description: 'Terdapat lubang-lubang pada batang akibat serangan penggerek batang',
    imageUrl: 'https://agritech.tnau.ac.in/crop_protection/banana_pest/banana_2.html'
  },
  {
    id: 'G010',
    name: 'Batang layu dan roboh',
    category: 'batang',
    description: 'Batang menjadi layu dan tanaman mudah roboh',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_moko_disease_525.htm'
  },
  {
    id: 'G011',
    name: 'Batang berwarna coklat kehitaman',
    category: 'batang',
    description: 'Jaringan vaskular batang berubah warna coklat kehitaman',
    imageUrl: 'https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2017.01290/full'
  },
  {
    id: 'G012',
    name: 'Batang mudah patah',
    category: 'batang',
    description: 'Batang menjadi lemah dan mudah patah karena kerusakan internal',
    imageUrl: 'https://plantix.net/en/library/plant-diseases/600032/pseudostem-weevil/'
  },

  // Gejala pada Daun
  {
    id: 'G013',
    name: 'Daun menguning dan layu',
    category: 'daun',
    description: 'Daun berubah warna kuning dan layu, gejala umum banyak penyakit',
    imageUrl: 'https://www.ukhouseplants.com/plants/banana-palms'
  },
  {
    id: 'G014',
    name: 'Daun berbercak coklat',
    category: 'daun',
    description: 'Muncul bercak-bercak coklat pada permukaan daun (sigatoka)',
    imageUrl: 'https://www.promusa.org/Sigatoka+leaf+spot'
  },
  {
    id: 'G015',
    name: 'Daun kering dari tepi',
    category: 'daun',
    description: 'Tepi daun mengering dan berubah warna coklat',
    imageUrl: 'https://greg.app/banana-yellow-leaves/'
  },
  {
    id: 'G016',
    name: 'Daun berlubang-lubang',
    category: 'daun',
    description: 'Terdapat lubang-lubang pada daun akibat dimakan ulat atau serangga',
    imageUrl: 'https://apps.lucidcentral.org/ppp/text/web_full/entities/banana_skipper_181.htm'
  },
  {
    id: 'G017',
    name: 'Daun menggulung',
    category: 'daun',
    description: 'Daun menggulung ke dalam, bisa karena serangan kutu atau virus',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v10/text/web_full/entities/banana_aphid_103.htm'
  },
  {
    id: 'G018',
    name: 'Daun rontok sebelum waktunya',
    category: 'daun',
    description: 'Daun gugur prematur sebelum waktunya',
    imageUrl: 'https://www.koppert.com/plant-diseases/black-sigatoka-disease/'
  },
  {
    id: 'G019',
    name: 'Daun berkerut dan kerdil',
    category: 'daun',
    description: 'Daun baru tumbuh berkerut dan ukuran kerdil, gejala bunchy top',
    imageUrl: 'https://www.biisc.org/pest/banana-bunchy-top-virus/'
  },
  {
    id: 'G020',
    name: 'Daun bergaris kuning (mosaik)',
    category: 'daun',
    description: 'Daun menunjukkan garis-garis kuning seperti morse code (BBTV)',
    imageUrl: 'https://www.ctahr.hawaii.edu/bbtd/downloads/bbtv-details.pdf'
  },

  // Gejala pada Buah
  {
    id: 'G021',
    name: 'Tidak berbuah sama sekali',
    category: 'buah',
    description: 'Tanaman tidak menghasilkan buah atau tandan sama sekali',
    imageUrl: 'https://www.cabi.org/isc/datasheet/8161'
  },
  {
    id: 'G022',
    name: 'Buah kecil dan kerdil',
    category: 'buah',
    description: 'Ukuran buah lebih kecil dari normal',
    imageUrl: 'https://www.khethari.com/blogs/news/major-banana-diseases-and-their-management-practices'
  },
  {
    id: 'G023',
    name: 'Buah busuk sebelum matang',
    category: 'buah',
    description: 'Buah membusuk sebelum matang dengan diskolorasi internal',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_moko_disease_525.htm'
  },
  {
    id: 'G024',
    name: 'Buah berbercak hitam',
    category: 'buah',
    description: 'Muncul bercak-bercak hitam pada kulit buah (anthracnose)',
    imageUrl: 'https://plantix.net/en/library/plant-diseases/100078/anthracnose-of-banana/'
  },
  {
    id: 'G025',
    name: 'Buah tidak berkembang',
    category: 'buah',
    description: 'Buah gagal berkembang dengan sempurna',
    imageUrl: 'https://vikaspedia.in/agriculture/crop-production/integrated-pest-managment/ipm-for-fruit-crops/ipm-strategies-for-banana/diseases-and-symptoms'
  },
  {
    id: 'G026',
    name: 'Buah mudah rontok',
    category: 'buah',
    description: 'Buah mudah gugur dari tangkai sebelum waktunya',
    imageUrl: 'https://apps.lucidcentral.org/pppw_v11/text/web_full/entities/banana_moko_disease_525.htm'
  },

  // Gejala Umum
  {
    id: 'G027',
    name: 'Pertumbuhan terhambat',
    category: 'batang',
    description: 'Pertumbuhan tanaman terhambat dan tumbuh kerdil',
    imageUrl: 'https://www.ctahr.hawaii.edu/bbtd/downloads/bbtv-details.pdf'
  },
  {
    id: 'G028',
    name: 'Tanaman mati secara perlahan',
    category: 'batang',
    description: 'Tanaman mengalami kematian progresif secara bertahap',
    imageUrl: 'https://openknowledge.fao.org/server/api/core/bitstreams/00f9d62c-68c4-46f2-bcc6-b2a32090150a/content'
  },
  {
    id: 'G029',
    name: 'Muncul tunas baru yang tidak normal',
    category: 'batang',
    description: 'Tunas atau anakan tumbuh dengan bentuk tidak normal',
    imageUrl: 'https://www.promusa.org/Bunchy+top'
  },
  {
    id: 'G030',
    name: 'Ada serangga atau ulat di tanaman',
    category: 'daun',
    description: 'Terlihat serangga hama atau ulat pada tanaman',
    imageUrl: 'https://bioprotectionportal.com/resources/banana-pests-guide/'
  },
];

export const symptomCategories = [
  { id: 'akar', name: 'Gejala pada Akar', color: 'brown' },
  { id: 'batang', name: 'Gejala pada Batang', color: 'green' },
  { id: 'daun', name: 'Gejala pada Daun', color: 'emerald' },
  { id: 'buah', name: 'Gejala pada Buah', color: 'yellow' },
];
