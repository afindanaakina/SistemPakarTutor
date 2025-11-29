import { Symptom } from '../types/tebu';

export const tebuSymptoms: Symptom[] = [
  // Gejala Akar
  { id: 'G001', code: 'G001', name: 'Akar membusuk', category: 'akar', description: 'Akar tanaman tebu membusuk dan berwarna coklat kehitaman' },
  { id: 'G002', code: 'G002', name: 'Akar kering', category: 'akar', description: 'Akar mengering dan mudah patah' },
  { id: 'G003', code: 'G003', name: 'Pertumbuhan akar terhambat', category: 'akar', description: 'Akar tidak berkembang dengan baik' },
  { id: 'G004', code: 'G004', name: 'Akar berwarna kemerahan', category: 'akar', description: 'Warna akar berubah menjadi kemerahan' },
  { id: 'G005', code: 'G005', name: 'Akar berlubang', category: 'akar', description: 'Terdapat lubang-lubang pada akar' },
  
  // Gejala Batang
  { id: 'G006', code: 'G006', name: 'Batang berlubang', category: 'batang', description: 'Terdapat lubang pada batang tebu' },
  { id: 'G007', code: 'G007', name: 'Batang membusuk', category: 'batang', description: 'Batang tebu membusuk dari dalam' },
  { id: 'G008', code: 'G008', name: 'Batang menguning', category: 'batang', description: 'Warna batang berubah menjadi kuning' },
  { id: 'G009', code: 'G009', name: 'Batang kerdil', category: 'batang', description: 'Batang tidak tumbuh optimal, lebih pendek dari normal' },
  { id: 'G010', code: 'G010', name: 'Batang retak', category: 'batang', description: 'Terdapat retakan pada batang' },
  { id: 'G011', code: 'G011', name: 'Batang berlendir', category: 'batang', description: 'Keluar cairan lengket dari batang' },
  { id: 'G012', code: 'G012', name: 'Bintik merah pada batang', category: 'batang', description: 'Muncul bintik-bintik merah pada permukaan batang' },
  { id: 'G013', code: 'G013', name: 'Batang mudah patah', category: 'batang', description: 'Batang rapuh dan mudah patah' },
  { id: 'G014', code: 'G014', name: 'Tunas mati', category: 'batang', description: 'Tunas tanaman mati sebelum berkembang' },
  { id: 'G015', code: 'G015', name: 'Batang berongga', category: 'batang', description: 'Bagian dalam batang kosong/berongga' },
  
  // Gejala Daun
  { id: 'G016', code: 'G016', name: 'Daun menguning', category: 'daun', description: 'Daun berubah warna menjadi kuning' },
  { id: 'G017', code: 'G017', name: 'Daun mengering', category: 'daun', description: 'Daun mengering dan mati' },
  { id: 'G018', code: 'G018', name: 'Bercak coklat pada daun', category: 'daun', description: 'Muncul bercak berwarna coklat pada daun' },
  { id: 'G019', code: 'G019', name: 'Bercak merah pada daun', category: 'daun', description: 'Muncul bercak berwarna merah pada daun' },
  { id: 'G020', code: 'G020', name: 'Daun berlubang', category: 'daun', description: 'Terdapat lubang-lubang pada daun' },
  { id: 'G021', code: 'G021', name: 'Daun menggulung', category: 'daun', description: 'Daun menggulung ke dalam' },
  { id: 'G022', code: 'G022', name: 'Daun layu', category: 'daun', description: 'Daun terlihat layu dan tidak segar' },
  { id: 'G023', code: 'G023', name: 'Daun berbintik putih', category: 'daun', description: 'Muncul bintik-bintik putih pada permukaan daun' },
  { id: 'G024', code: 'G024', name: 'Daun sobek-sobek', category: 'daun', description: 'Daun sobek tidak beraturan' },
  { id: 'G025', code: 'G025', name: 'Daun berlendir', category: 'daun', description: 'Permukaan daun terasa lengket' },
  { id: 'G026', code: 'G026', name: 'Ujung daun mengering', category: 'daun', description: 'Ujung daun mengering dan berwarna coklat' },
  { id: 'G027', code: 'G027', name: 'Daun keriput', category: 'daun', description: 'Permukaan daun tidak rata dan keriput' },
  { id: 'G028', code: 'G028', name: 'Daun terlihat terbakar', category: 'daun', description: 'Daun terlihat seperti terbakar, berwarna coklat kehitaman' },
  { id: 'G029', code: 'G029', name: 'Daun bergaris kuning', category: 'daun', description: 'Muncul garis-garis kuning pada daun' },
  { id: 'G030', code: 'G030', name: 'Daun pucat', category: 'daun', description: 'Warna daun pucat tidak segar' },
  
  // Gejala Tambahan
  { id: 'G031', code: 'G031', name: 'Pertumbuhan terhambat', category: 'batang', description: 'Pertumbuhan tanaman sangat lambat' },
  { id: 'G032', code: 'G032', name: 'Munculnya jamur', category: 'batang', description: 'Terlihat jamur tumbuh pada tanaman' },
  { id: 'G033', code: 'G033', name: 'Bau busuk', category: 'batang', description: 'Tercium bau busuk dari tanaman' },
  { id: 'G034', code: 'G034', name: 'Cairan merah keluar', category: 'batang', description: 'Keluar cairan berwarna merah dari batang' },
  { id: 'G035', code: 'G035', name: 'Ada ulat/larva', category: 'daun', description: 'Terlihat ulat atau larva pada tanaman' },
  { id: 'G036', code: 'G036', name: 'Ada kutu', category: 'daun', description: 'Terlihat kutu-kutu kecil pada daun' },
  { id: 'G037', code: 'G037', name: 'Tanaman mudah rebah', category: 'akar', description: 'Tanaman mudah roboh atau rebah' },
  { id: 'G038', code: 'G038', name: 'Ruas batang memendek', category: 'batang', description: 'Jarak antar ruas batang lebih pendek dari normal' },
];
