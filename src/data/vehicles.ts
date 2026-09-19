import { Vehicle } from '../types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'v-1',
    slug: 'sedan-executive',
    name: 'Sedan Executive',
    categoryName: 'Sedan',
    capacityPax: 4,
    capacityLuggage: 3,
    useCase: 'Executive / Individual & VVIP Transfer',
    description: 'Armada sedan premium (Toyota Camry / sekelas) berpendingin udara optimal, kursi kulit ergonomis, dan suspensi lembut untuk kenyamanan perjalanan VIP/Eselon I.',
    imageUrl: '/vehicles/sedan-white-bg.jpg',
    features: [
      'Kapasitas 4 Penumpang',
      'Muat 3 Koper Ukuran Sedang (24-28")',
      'Kabin Kedap & Kursi Kulit Mewah',
      'Air Mineral & Amenities Higienis'
    ],
    sla: [
      'Driver berseragam batik resmi / jas rapi',
      'Paging board nama instansi di terminal kedatangan CGK/HLP',
      'Harga All-in (Driver, BBM, Tol, dan Parkir Bandara)',
      'On-time guarantee standby 30 menit sebelum jadwal mendarat'
    ]
  },
  {
    id: 'v-2',
    slug: 'suv-premium',
    name: 'Premium SUV',
    categoryName: 'SUV',
    capacityPax: 6,
    capacityLuggage: 4,
    useCase: 'Small Executive Group & Komisioner',
    description: 'Kendaraan SUV representatif (Toyota Fortuner / Mitsubishi Pajero Sport / sekelas) dengan ground clearance tinggi, tangguh, dan sangat berwibawa untuk pejabat kementerian.',
    imageUrl: '/vehicles/suv-white-bg.jpg',
    features: [
      'Kapasitas 6 Penumpang',
      'Muat 4 Koper Rombongan',
      'Konfigurasi AC Double Blower Dingin',
      'Port Pengisian Daya Gadget Tiap Baris'
    ],
    sla: [
      'Driver berseragam batik resmi / jas rapi',
      'Paging board nama instansi di terminal kedatangan CGK/HLP',
      'Harga All-in (Driver, BBM, Tol, dan Parkir Bandara)',
      'Standby di pick-up zone VIP bandara'
    ]
  },
  {
    id: 'v-3',
    slug: 'hiace-commuter-premio',
    name: 'Toyota Hiace Premio / Commuter',
    categoryName: 'Hiace',
    capacityPax: 15,
    capacityLuggage: 8,
    useCase: 'Small Delegation & Tim Kerja Kedinasan',
    description: 'Pilihan paling populer dan andalan untuk delegasi kunker instansi pemerintah. Kabin lapang dengan ceiling tinggi, reclining seat empuk, dan bagasi belakang memadai.',
    imageUrl: '/vehicles/hiace-white-bg.jpg',
    features: [
      'Kapasitas 15 Penumpang',
      'Muat 8 - 10 Koper Ukuran Kabin/Bagasi',
      'Individual AC Louver Tiap Kursi',
      'Pintu Geser Lebar Akses Mudah Rombongan'
    ],
    sla: [
      'Driver berseragam batik resmi instansi',
      'Paging board nama instansi resmi di pintu kedatangan',
      'Harga All-in (Driver, BBM, Tol, Parkir)',
      'Bantuan penanganan koper oleh staf operasional Olive'
    ]
  },
  {
    id: 'v-4',
    slug: 'mini-bus-isuzu-elf',
    name: 'Executive Mini Bus (Long Chassis)',
    categoryName: 'Mini Bus',
    capacityPax: 20,
    capacityLuggage: 12,
    useCase: 'Medium Delegation & Tenaga Ahli',
    description: 'Mini bus berkapasitas 20 penumpang dengan sasis panjang (Isuzu Elf Giga / sekelas). Sangat efisien untuk rombongan staf pendukung dan panitia acara skala menengah.',
    imageUrl: '/vehicles/minibus-white-bg.jpg',
    features: [
      'Kapasitas 20 Penumpang',
      'Muat 12 Koper Rombongan',
      'Audio Video & Mic untuk Pengumuman Panitia',
      'Suspensi Nyaman untuk Jalur Tol Dalam Kota'
    ],
    sla: [
      'Driver profesional bersertifikat',
      'Paging board instansi di kedatangan',
      'All-in BBM, Tol, dan Parkir',
      'Koordinasi konvoi terpadu dengan PIC'
    ]
  },
  {
    id: 'v-5',
    slug: 'medium-bus-executive',
    name: 'Executive Medium Bus',
    categoryName: 'Medium Bus',
    capacityPax: 25,
    capacityLuggage: 18,
    useCase: 'Larger Delegation & Rombongan Komisi',
    description: 'Medium bus pariwisata eksekutif konfigurasi kursi 2-2 berkapasitas 25 - 29 penumpang. Cocok untuk rombongan dinas yang membawa perlengkapan seminar dan berkas dinas.',
    imageUrl: '/vehicles/medium-bus-white-bg.jpg',
    features: [
      'Kapasitas 25 Penumpang',
      'Bagasi Samping Kapasitas Besar (18 Koper)',
      'Reclining Seats Ergonomis dengan Armrest',
      'Layar LCD TV & Sound System Terpadu'
    ],
    sla: [
      'Kru pengemudi + kernet pembantu koper',
      'Papan penjemputan resmi instansi di bandara',
      'All-in operasional jalan tol & parkir',
      'Pemeriksaan kelayakan armada sebelum penjemputan'
    ]
  },
  {
    id: 'v-6',
    slug: 'large-bus-shd',
    name: 'Executive Large Bus (Super High Deck)',
    categoryName: 'Large Bus',
    capacityPax: 40,
    capacityLuggage: 35,
    useCase: 'Full Delegation & Konferensi Nasional',
    description: 'Big bus eksekutif SHD (Mercedes-Benz / Scania / Hino) kapasitas 40 - 45 penumpang. Solusi transportasi delegasi massal untuk simposium kenegaraan atau pelatihan kementerian terpusat.',
    imageUrl: '/vehicles/large-bus-white-bg.jpg',
    features: [
      'Kapasitas 40 Penumpang',
      'Bagasi Luas Tembus Bawah Muat 35+ Koper',
      'Colokan Listrik USB di Setiap Baris Kursi',
      'Emergency Exit & Standar Keselamatan Dishub Teruji'
    ],
    sla: [
      'Driver utama berpengalaman jalan raya nasional + co-driver',
      'Paging board instansi di meeting point bandara',
      'All-in BBM, Tol Trans Jawa/Dalam Kota, Parkir',
      'Dukungan koordinasi patwal kepolisian bila diperlukan'
    ]
  }
];
