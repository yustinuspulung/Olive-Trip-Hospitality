import { Hotel } from '../types';
import { HOTEL_PARTNERS } from './hotelPartners';

const RAW_HOTELS: Hotel[] = [
  {
    id: 'h-1',
    slug: 'js-luwansa-hotel-jakarta',
    name: 'JS Luwansa Hotel Jakarta',
    area: 'Kuningan, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Jl. H. R. Rasuna Said Kav. C-22, Karet Kuningan, Setiabudi, Jakarta Selatan 12940',
    stars: 4,
    starCategory: 'Upscale Hotel',
    verified: true,
    officialUrl: 'https://www.jsluwansa.com/',
    sourceUrl: 'https://www.jsluwansa.com/',
    coverImage: 'https://www.jsluwansa.com/wp-content/uploads/sites/76/2026/09/Website-Landing-Page-2026-Rev-FACADE.jpg',
    gallery: [
      'https://www.jsluwansa.com/wp-content/uploads/sites/76/2026/09/Website-Landing-Page-2026-Rev-FACADE.jpg',
      'https://www.jsluwansa.com/wp-content/uploads/sites/76/2026/09/Website-Landing-Page-2026-Rev-GBR.jpg',
      'https://www.jsluwansa.com/wp-content/uploads/sites/76/2026/09/Website-Landing-Page-2026-Rev-Ambassador-Room.jpg',
      'https://www.jsluwansa.com/wp-content/uploads/sites/76/2026/09/Website-Landing-Page-2026-Rev-Pool.jpg'
    ],
    pitchTagline: 'Hub diplomatik & MICE prestisius di Rasuna Said; akses stasiun LRT dan ballroom megah tanpa macet.',
    description: 'JS Luwansa Hotel & Convention Center berlokasi sangat strategis di jantung kawasan diplomatik dan pusat bisnis Kuningan Jakarta Selatan. Dirancang secara komprehensif untuk melayani delegasi kenegaraan, pertemuan kementerian, serta konferensi korporat internasional.',
    facilities: ['Grand Ballroom', '14 Breakout Rooms', 'Olam All Day Dining', 'Chill In Lounge', 'Outdoor Pool', 'Spa & Whirlpool', 'Basement Bus Parking', 'LRT Access'],
    lat: -6.220194,
    lng: 106.832778,
    placeId: 'ChIJL0v-vVnxaS4R24uM86YkQ1U',
    roomsAndSuites: [
      'Deluxe Room (Twin / King)',
      'King Deluxe Room',
      'Grand Deluxe Room (Corner Room)',
      'Premier Room',
      'Ambassador Room',
      'The Suite'
    ],
    diningAndLounge: [
      { name: 'Olam All Day Dining', description: 'Prasmanan internasional & lokal dengan kapasitas luas untuk delegasi.' },
      { name: 'Chill In Lounge', description: 'Jamuan santai teh/kopi eksekutif dan ruang temu informal lobi.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom (1.500 pax)', capacity: '1.500 Orang', description: 'Ballroom megah tanpa pilar, plafon tinggi dengan fasilitas audio visual terintegrasi.' },
      { name: '14 Breakout Rooms', capacity: '20 - 150 Orang', description: 'Ruang sidang komisi dan rapat bilateral pejabat kementerian.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang outdoor, Fitness center lengkap, Spa & Whirlpool.',
      logistics: 'Ambassador Club Lounge khusus C-level/pimpinan delegasi, parkir basement luas untuk bus dinas dan kendaraan pengawalan.'
    },
    nearbyPlaces: [
      { id: 'p-1', name: 'LRT Jabodebek Rasuna Said', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.35, walkingOrDriving: '5 menit jalan kaki', address: 'Jl. HR Rasuna Said', lat: -6.2198, lng: 106.8322 },
      { id: 'p-2', name: 'RS MMC Kuningan', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.3, walkingOrDriving: '4 menit jalan kaki', address: 'Jl. HR Rasuna Said Kav. C-21', lat: -6.2192, lng: 106.8335 },
      { id: 'p-3', name: 'Kuningan City Mall', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.1, walkingOrDriving: '4 menit berkendara', address: 'Jl. Prof. DR. Satrio Kav. 18', lat: -6.2248, lng: 106.8294 },
      { id: 'p-4', name: 'Plaza Festival & Epiwalk', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.8, walkingOrDriving: '3 menit berkendara', address: 'Rasuna Epicentrum', lat: -6.2165, lng: 106.8339 },
      { id: 'p-5', name: 'Monumen Nasional (Monas)', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 5.2, walkingOrDriving: '15 menit berkendara', address: 'Gambir, Jakarta Pusat', lat: -6.1754, lng: 106.8272 },
      { id: 'p-6', name: 'Basque Bar de Tapas', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 1.4, walkingOrDriving: '5 menit berkendara', address: 'Noble House Kuningan', lat: -6.2281, lng: 106.8286 }
    ]
  },
  {
    id: 'h-2',
    slug: 'hotel-santika-premiere-hayam-wuruk-jakarta',
    name: 'Hotel Santika Premiere Hayam Wuruk',
    area: 'Hayam Wuruk, Jakarta Barat',
    cityZone: 'West Jakarta',
    address: 'Jl. Hayam Wuruk No. 125, Mangga Besar, Taman Sari, Jakarta Barat 11180',
    stars: 4,
    verified: true,
    officialUrl: 'https://www.mysantika.com/indonesia/jakarta/hotel-santika-premiere-hayam-wuruk',
    sourceUrl: 'https://www.mysantika.com/indonesia/jakarta/hotel-santika-premiere-hayam-wuruk',
    coverImage: 'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-hayam-wuruk-jakarta/mobile-apps/hotel-gallery/hotel-gallery-cover.jpg',
    gallery: [
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-hayam-wuruk-jakarta/mobile-apps/hotel-gallery/hotel-gallery-cover.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-hayam-wuruk-jakarta/mobile-apps/hotel-gallery/hotel-gallery-4.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-hayam-wuruk-jakarta/mobile-apps/hotel-gallery/hotel-gallery-6.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/f1b15bd8-8ea4-4fce-ba81-c182e7f536c7.png'
    ],
    pitchTagline: 'Gerbang dinas strategis instansi pemerintah kota & heritage Pecenongan; efisiensi mobilitas dinas pusat.',
    description: 'Hotel bintang 4 representatif dengan keramahtamahan khas Indonesia di jalur arteri Hayam Wuruk. Sangat memudahkan koordinasi instansi Balai Kota Pemprov DKI, Kementerian Koordinator, dan pusat perdagangan Glodok.',
    facilities: ['Grand Ballroom', 'Betawi Meeting Rooms', 'Kicir-Kicir Restaurant', '22nd Sky Lounge', 'Covered Pool', 'Gym', 'Transjakarta Access'],
    lat: -6.149528,
    lng: 106.817528,
    placeId: 'ChIJz2q44b7zaS4RD009-L7L_qU',
    roomsAndSuites: ['Deluxe Room', 'Executive Room', 'Premiere Room', 'Santika Suite'],
    diningAndLounge: [
      { name: 'Kicir-Kicir Restaurant', description: 'All-day dining autentik kuliner Betawi & sajian nusantara terfavorit.' },
      { name: '22nd Sky Lounge', description: 'Lounge panorama cakrawala Batavia dan sunset Jakarta dari lantai 22.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom (1.000 pax)', capacity: '1.000 Orang', description: 'Ballroom luas untuk rapat akbar dinas dan pelantikan delegasi.' },
      { name: 'Ruang Rapat Betawi 1–6', capacity: '30 - 120 Orang', description: 'Ruang rapat modular siap proyektor laser dan sound audio-video.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang semi-outdoor beratap, Gym dengan pemandangan kota, In-room massage.',
      logistics: 'Premiere Club Lounge, parkir aman 24 jam dengan akses cepat ke halte Transjakarta Mangga Besar.'
    },
    nearbyPlaces: [
      { id: 'p-201', name: 'Halte Transjakarta Mangga Besar', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.15, walkingOrDriving: '2 menit jalan kaki', address: 'Jl. Hayam Wuruk', lat: -6.1491, lng: 106.8172 },
      { id: 'p-202', name: 'Sentra Kuliner Pecenongan', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 1.2, walkingOrDriving: '5 menit berkendara', address: 'Jl. Pecenongan, Jakarta Pusat', lat: -6.1625, lng: 106.8251 },
      { id: 'p-203', name: 'RS Husada Mangga Besar', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.8, walkingOrDriving: '3 menit berkendara', address: 'Jl. Raya Mangga Besar No. 137', lat: -6.1482, lng: 106.8262 },
      { id: 'p-204', name: 'Gajah Mada Plaza', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.9, walkingOrDriving: '4 menit berkendara', address: 'Jl. Gajah Mada No. 19-26', lat: -6.1582, lng: 106.8184 },
      { id: 'p-205', name: 'Kota Tua Jakarta & Museum Fatahillah', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.8, walkingOrDriving: '7 menit berkendara', address: 'Pinangsia, Tamansari', lat: -6.1352, lng: 106.8133 },
      { id: 'p-206', name: '22nd Sky Bar & Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Di area hotel (Lt. 22)', address: 'Hotel Santika Hayam Wuruk', lat: -6.1495, lng: 106.8175 }
    ]
  },
  {
    id: 'h-3',
    slug: 'hotel-santika-premiere-kota-harapan-indah-bekasi',
    name: 'Hotel Santika Premiere Kota Harapan Indah',
    area: 'Medan Satria, Kota Bekasi',
    cityZone: 'Bekasi',
    address: 'Jl. Harapan Indah Bulevar No. 10-12, Medan Satria, Kota Bekasi 17131',
    stars: 4,
    verified: true,
    officialUrl: 'https://www.mysantika.com/indonesia/bekasi/hotel-santika-premiere-kota-harapan-indah',
    sourceUrl: 'https://www.mysantika.com/indonesia/bekasi/hotel-santika-premiere-kota-harapan-indah',
    coverImage: 'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/75e01cc6-bdae-4eca-8fdb-7513b5db48d0.jpg',
    gallery: [
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/75e01cc6-bdae-4eca-8fdb-7513b5db48d0.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-khi/mobile-apps/hotel-gallery/hotel-gallery-10.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-khi/mobile-apps/hotel-gallery/hotel-gallery-2.jpg',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel-santika-premiere/hotel-santika-premiere-khi/mobile-apps/hotel-gallery/hotel-gallery-11.jpg'
    ],
    pitchTagline: 'Sentra konferensi BUMN & industri terluas di koridor Bekasi; lahan parkir armada bus delegasi masif.',
    description: 'Menghadirkan fasilitas MICE dan ballroom terbesar di Bekasi berpadu dengan suasana resort asri. Sangat diandalkan oleh instansi industri, konsinyasi draft kementerian, dan rapat koordinasi regional Jawa Barat - Jakarta.',
    facilities: ['Santika Ballroom (2.000 pax)', 'Olympic Outdoor Pool', 'Gendis Restaurant', 'Aksara Lounge', 'Tennis Court', 'Big Bus Parking Yard', 'Jogging Track'],
    lat: -6.182444,
    lng: 106.974917,
    placeId: 'ChIJPx1X8g7-aS4Rh1Ew7p4cO48',
    roomsAndSuites: ['Deluxe Room', 'Club Premiere Room', 'Junior Suite', 'Premiere Suite'],
    diningAndLounge: [
      { name: 'Gendis Restaurant', description: 'Prasmanan lokal nusantara andalan dan aneka hidangan Barat berkelas.' },
      { name: 'Aksara Lounge & Sanghyang Bar', description: 'Ruang ramah tamah santai mitra bisnis dan tim kerja dinas.' }
    ],
    meetingsAndMice: [
      { name: 'Santika Ballroom (2.000 pax)', capacity: '2.000 Orang', description: 'Ballroom terbesar di Bekasi untuk wisuda kedinasan dan konsolidasi BUMN.' },
      { name: '6 Boardrooms & Ruang Sidang', capacity: '25 - 150 Orang', description: 'Konektivitas proyektor ganda dan layout fleksibel U-Shape/Classroom.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang semi-olimpiade luar ruangan, Lapangan tenis, Gym, Jogging track rimbun.',
      logistics: 'Lahan parkir masif khusus konvoi bus besar (Big Bus) dan pengawalan patwal kementerian.'
    },
    nearbyPlaces: [
      { id: 'p-301', name: 'Transera Waterpark', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 2.1, walkingOrDriving: '6 menit berkendara', address: 'Kota Harapan Indah', lat: -6.1738, lng: 106.9852 },
      { id: 'p-302', name: 'RS Citra Harapan', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.9, walkingOrDriving: '3 menit berkendara', address: 'Komplek Sentra Niaga Harapan Indah', lat: -6.1852, lng: 106.9721 },
      { id: 'p-303', name: 'Meli Melo Sentra Kuliner', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.6, walkingOrDriving: '2 menit berkendara', address: 'Bulevar Hijau Harapan Indah', lat: -6.1812, lng: 106.9774 },
      { id: 'p-304', name: 'Living Plaza Harapan Indah', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.2, walkingOrDriving: '4 menit berkendara', address: 'Jl. Harapan Indah Raya', lat: -6.1889, lng: 106.9698 },
      { id: 'p-305', name: 'Terminal Pulo Gebang Jakarta Timur', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 4.8, walkingOrDriving: '12 menit berkendara', address: 'Pulo Gebang', lat: -6.2112, lng: 106.9531 },
      { id: 'p-306', name: 'Sanghyang Executive Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Area Lobby Hotel', address: 'Hotel Santika Harapan Indah', lat: -6.1824, lng: 106.9749 }
    ]
  },
  {
    id: 'h-4',
    slug: 'hotel-santika-bsd-city-serpong',
    name: 'Hotel Santika BSD City - Serpong',
    area: 'Serpong, Tangerang Selatan',
    cityZone: 'BSD Serpong',
    address: 'Teraskota Mall, CBD Lot VII B, Jl. Pahlawan Seribu, Lengkong Gudang, Serpong, Tangsel 15322',
    stars: 3,
    verified: true,
    officialUrl: 'https://www.mysantika.com/indonesia/tangerang-selatan/hotel-santika-bsd-city-serpong',
    sourceUrl: 'https://www.mysantika.com/indonesia/tangerang-selatan/hotel-santika-bsd-city-serpong',
    coverImage: 'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/f4631145-bba7-45fe-89f5-2d9decc202d4.png',
    gallery: [
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/f4631145-bba7-45fe-89f5-2d9decc202d4.png',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/e5ce1559-0c86-4936-aa68-52f40e32a8f2.png',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/d364402b-e9c7-45ae-a98f-1c08fd499222.png',
      'https://mysantika-production.s3.ap-southeast-1.amazonaws.com/media/images/hotel/5f66e264-82c7-4088-9ab9-c3deba15e354.png'
    ],
    pitchTagline: 'Akses terpadu ke Teraskota Mall & ICE BSD; solusi akomodasi praktis eksibisi kementerian di BSD.',
    description: 'Terletak di sentra bisnis BSD City dan menempel langsung dengan mall Teraskota. Lokasi favorit untuk delegasi exhibitor pameran di Indonesia Convention Exhibition (ICE) BSD dan institusi riset Puspiptek.',
    facilities: ['Meeting Rooms (150 pax)', 'Kafe Karinda', 'Gym Corner', 'Teraskota Direct Access', 'Integrated Parking', 'Near ICE BSD'],
    lat: -6.299111,
    lng: 106.669861,
    placeId: 'ChIJVXk_kO33aS4R5V5y1iT192Y',
    roomsAndSuites: ['Superior Room', 'Deluxe Room', 'Executive Suite'],
    diningAndLounge: [
      { name: 'Kafe Karinda', description: 'Prasmanan sarapan nusantara hangat dan sajian à la carte harian bergizi.' }
    ],
    meetingsAndMice: [
      { name: 'Ruang Rapat Modular (20–150 pax)', capacity: '150 Orang', description: 'Ruang pertemuan efisien untuk panitia pameran kedinasan dekat ICE BSD.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Ruang gym kebugaran esensial.',
      logistics: 'Akses koridor langsung ke Teraskota Mall, parkir terpadu ratusan kendaraan rombongan, akses cepat Tol Jakarta-Serpong.'
    },
    nearbyPlaces: [
      { id: 'p-401', name: 'Teraskota Mall BSD', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.1, walkingOrDriving: 'Akses langsung mall', address: 'Jl. Pahlawan Seribu', lat: -6.2995, lng: 106.6695 },
      { id: 'p-402', name: 'Indonesia Convention Exhibition (ICE BSD)', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 4.2, walkingOrDriving: '9 menit berkendara', address: 'Jl. BSD Grand Boulevard No. 1', lat: -6.3025, lng: 106.6369 },
      { id: 'p-403', name: 'RS Eka Hospital BSD', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.5, walkingOrDriving: '2 menit berkendara', address: 'Central Business District Lot IX', lat: -6.2974, lng: 106.6738 },
      { id: 'p-404', name: 'The Breeze BSD City Kuliner', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 2.1, walkingOrDriving: '5 menit berkendara', address: 'BSD Green Office Park', lat: -6.3021, lng: 106.6542 },
      { id: 'p-405', name: 'Stasiun KRL Rawa Buntu', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 2.3, walkingOrDriving: '6 menit berkendara', address: 'Rawa Buntu, Serpong', lat: -6.3211, lng: 106.6749 },
      { id: 'p-406', name: 'Chupacabras Speakeasy & Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 2.8, walkingOrDriving: '7 menit berkendara', address: 'The Breeze BSD', lat: -6.3028, lng: 106.6539 }
    ]
  },
  {
    id: 'h-5',
    slug: 'royal-kuningan-hotel-jakarta',
    name: 'Royal Kuningan Hotel',
    area: 'Kuningan, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Jl. Kuningan Mulia Kav. 9B, Setiabudi, Jakarta Selatan 12980',
    stars: 4,
    verified: true,
    officialUrl: 'https://www.royalkuningan.com/',
    sourceUrl: 'https://www.royalkuningan.com/',
    coverImage: 'https://www.royalkuningan.com/wp-content/uploads/2017/11/facade-2-1024x681.jpg',
    gallery: [
      'https://www.royalkuningan.com/wp-content/uploads/2017/11/facade-2-1024x681.jpg',
      'https://www.royalkuningan.com/wp-content/uploads/2017/11/facade-683x1024.jpg',
      'https://www.royalkuningan.com/wp-content/uploads/2017/11/facade-2-681x681.jpg',
      'https://www.royalkuningan.com/wp-content/uploads/2017/11/footer-frontpage3.jpg'
    ],
    pitchTagline: 'Dekat sentra KPK & Kedutaan Besar; 16 ruang rapat pendukung audio-visual dan drop-off kanopi luas.',
    description: 'Berdiri kokoh di kawasan Kuningan Mulia, persis di belakang koridor HR Rasuna Said. Pilihan utama untuk rapat kerja delegasi dinas yang membutuhkan privasi lobi tinggi dan fleksibilitas 16 ruang breakout rapat.',
    facilities: ['Grand Ballroom (800 pax)', '16 Meeting Rooms', 'The Kinar Restaurant', 'Semilir Lounge', 'Podium Pool', 'Spa & Aromatherapy', 'Basement Parking'],
    lat: -6.213278,
    lng: 106.832389,
    placeId: 'ChIJEwt17_PxaS4ROJ_W34k1c6I',
    roomsAndSuites: ['Superior Room', 'Deluxe Room', 'Grand Deluxe', 'Executive Room', 'Royal Suite'],
    diningAndLounge: [
      { name: 'The Kinar Restaurant', description: 'Kapasitas prasmanan besar hidangan nusantara untuk delegasi dinas.' },
      { name: 'Semilir Lounge', description: 'Area koordinasi dan meja registrasi panitia kunker.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom (800 pax)', capacity: '800 Orang', description: 'Ballroom elegan dengan panggung dan proyektor resolusi tinggi.' },
      { name: '16 Ruang Rapat Pendukung', capacity: '15 - 120 Orang', description: 'Dilengkapi sistem audio visual lengkap dan jaringan internet dedicated.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang outdoor podium, Gym & Pijat aromaterapi.',
      logistics: 'Drop-off lobi kanopi luas anti-hujan untuk rombongan VIP, parkir basement bertingkat aman.'
    },
    nearbyPlaces: [
      { id: 'p-501', name: 'Gedung Merah Putih KPK RI', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 0.4, walkingOrDriving: '5 menit jalan kaki', address: 'Jl. Kuningan Persada Kav. 4', lat: -6.2119, lng: 106.8315 },
      { id: 'p-502', name: 'LRT Setiabudi', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.6, walkingOrDriving: '7 menit jalan kaki', address: 'Jl. HR Rasuna Said', lat: -6.2125, lng: 106.8301 },
      { id: 'p-503', name: 'Epicentrum Walk Mall', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.7, walkingOrDriving: '3 menit berkendara', address: 'Kompleks Rasuna Epicentrum', lat: -6.2185, lng: 106.8341 },
      { id: 'p-504', name: 'Kaum Jakarta Fine Dining', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 2.8, walkingOrDriving: '8 menit berkendara', address: 'Menteng, Jakarta Pusat', lat: -6.1965, lng: 106.8351 },
      { id: 'p-505', name: 'RS Mayapada Hospital Kuningan', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.2, walkingOrDriving: '4 menit berkendara', address: 'Jl. HR Rasuna Said Kav. C-17', lat: -6.2231, lng: 106.8318 },
      { id: 'p-506', name: 'Dragonfly Club Jakarta', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 2.6, walkingOrDriving: '7 menit berkendara', address: 'Graha BIP, Gatot Subroto', lat: -6.2295, lng: 106.8182 }
    ]
  },
  {
    id: 'h-6',
    slug: 'park-hotel-cawang-jakarta',
    name: 'PARK HOTEL Cawang - Jakarta',
    area: 'Cawang, Jakarta Timur',
    cityZone: 'East Jakarta',
    address: 'Jl. D.I. Panjaitan Kav. 5, Cawang, Jatinegara, Jakarta Timur 13340',
    stars: 3,
    verified: true,
    officialUrl: 'https://parkhotel.co.id/',
    sourceUrl: 'https://parkhotel.co.id/',
    coverImage: 'https://parkhotel.co.id/wp-content/uploads/2024/08/Hotel_Facade_01.jpg',
    gallery: [
      'https://parkhotel.co.id/wp-content/uploads/2024/08/Hotel_Facade_01.jpg',
      'https://parkhotel.co.id/wp-content/uploads/2024/08/TerraceCafe_Indoor_01.jpg',
      'https://parkhotel.co.id/wp-content/uploads/2024/08/Meranti_01-1.jpg',
      'https://parkhotel.co.id/wp-content/uploads/2024/08/Suite.jpeg'
    ],
    pitchTagline: 'Akses tercepat ke Bandara Halim (HLP) & simpang Cawang; ideal transit delegasi kementerian lintas provinsi.',
    description: 'Hotel bisnis terkemuka di simpul transportasi Cawang. Hanya 10 menit menuju Bandara Halim Perdanakusuma (HLP) dan bersisian langsung dengan interchange Tol Jagorawi, Tol Cikampek, dan Tol Dalam Kota.',
    facilities: ['Cendrawasih & Merak Rooms', 'Terrace Cafe', 'Outdoor Tropical Pool', 'Fitness & Spa', 'Direct Highway Access', 'Dedicated Bus Parking'],
    lat: -6.242944,
    lng: 106.872889,
    placeId: 'ChIJj70dO1bvaS4R6O4x8k1_7Bw',
    roomsAndSuites: ['Standard Room', 'Superior Room', 'Deluxe Room', 'Business Room', 'Suite Room'],
    diningAndLounge: [
      { name: 'Terrace Cafe', description: 'Kafe semi-terbuka dengan suasana tropis di tepi kolam renang.' }
    ],
    meetingsAndMice: [
      { name: 'Cendrawasih & Merak Rooms (30–300 pax)', capacity: '300 Orang', description: 'Solusi ruang rapat transit delegasi bandara dengan coffee break premium.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang outdoor tropis, Fitness center & Spa dinas.',
      logistics: 'Akses langsung Tol Dalam Kota & Tol Jagorawi, lahan parkir bus mandiri dan akses kilat ke Bandara HLP.'
    },
    nearbyPlaces: [
      { id: 'p-601', name: 'Bandara Internasional Halim Perdanakusuma (HLP)', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 4.5, walkingOrDriving: '10 menit berkendara', address: 'Makasar, Jakarta Timur', lat: -6.2666, lng: 106.8911 },
      { id: 'p-602', name: 'LRT Cawang Interchange', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.8, walkingOrDriving: '4 menit berkendara', address: 'Simpang Cawang', lat: -6.2442, lng: 106.8682 },
      { id: 'p-603', name: 'RS UKI Cawang', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.7, walkingOrDriving: '3 menit berkendara', address: 'Jl. Mayjen Sutoyo No. 2', lat: -6.2512, lng: 106.8702 },
      { id: 'p-604', name: 'Pusat Grosir Cililitan (PGC)', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.9, walkingOrDriving: '6 menit berkendara', address: 'Jl. Mayjen Sutoyo No. 76', lat: -6.2612, lng: 106.8688 },
      { id: 'p-605', name: 'Taman Mini Indonesia Indah (TMII)', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 6.8, walkingOrDriving: '14 menit berkendara', address: 'Cipayung, Jakarta Timur', lat: -6.3024, lng: 106.8951 },
      { id: 'p-606', name: 'Terrace Poolside Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Area Hotel Lt. 2', address: 'PARK HOTEL Cawang', lat: -6.2429, lng: 106.8728 }
    ]
  },
  {
    id: 'h-7',
    slug: 'hotel-casa-amaroossa-jakarta',
    name: 'Hotel Casa Amaroossa Jakarta',
    area: 'TB Simatupang / Cipete, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Jl. Cipete Raya No. 9-10, Cipete Selatan, Cilandak, Jakarta Selatan 12410',
    stars: 4,
    verified: true,
    officialUrl: 'https://amaroossahotel.com/',
    sourceUrl: 'https://amaroossahotel.com/',
    coverImage: 'https://amaroossahotel.com/images/hotels/casa/hero-1.jpg',
    gallery: [
      'https://amaroossahotel.com/images/hotels/casa/hero-1.jpg',
      'https://amaroossahotel.com/images/hotels/casa/diamond-ballroom-1.jpg',
      'https://amaroossahotel.com/images/hotels/casa/deluxe-1.jpg',
      'https://amaroossahotel.com/images/hotels/casa/swimming-pool-1.jpg'
    ],
    pitchTagline: 'Suasana butik kontemporer privat; lokasi hening dekat koridor oil & gas TB Simatupang.',
    description: 'Hotel butik eksklusif dengan arsitektur elegan di Cipete Raya. Menawarkan kenyamanan dan privasi tinggi untuk rapat privat jajaran direksi BUMN serta pimpinan instansi.',
    facilities: ['Ruang Simatupang & Cipete', 'The Bellini Restaurant', 'Intimate Pool', 'Fitness Corner', 'Valet Parking', 'Near MRT Fatmawati'],
    lat: -6.278972,
    lng: 106.797806,
    placeId: 'ChIJV4-z9a_zaS4RH2o_B0319m4',
    roomsAndSuites: ['Deluxe Room', 'Executive Room', 'Suite Room butik kontemporer'],
    diningAndLounge: [
      { name: 'The Bellini Restaurant', description: 'Interior klasik jamuan bisnis makan siang delegasi dan kopi artisan.' }
    ],
    meetingsAndMice: [
      { name: 'Ruang Simatupang & Cipete (20–80 pax)', capacity: '80 Orang', description: 'Rapat privat direksi dan konsolidasi tertutup berkursi ergonomis.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang intim, Fitness corner, Lingkungan tenang anti-bising.',
      logistics: 'Valet parking kendaraan pejabat dinas, dekat stasiun MRT Fatmawati & gerbang Tol JORR.'
    },
    nearbyPlaces: [
      { id: 'p-701', name: 'Stasiun MRT Fatmawati', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 1.4, walkingOrDriving: '4 menit berkendara', address: 'Jl. TB Simatupang', lat: -6.2921, lng: 106.7932 },
      { id: 'p-702', name: 'RS Fatmawati Jakarta', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.6, walkingOrDriving: '5 menit berkendara', address: 'Jl. RS Fatmawati Raya', lat: -6.2952, lng: 106.7941 },
      { id: 'p-703', name: 'Cilandak Town Square (CITOS)', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.8, walkingOrDriving: '6 menit berkendara', address: 'Jl. TB Simatupang Kav. 17', lat: -6.2911, lng: 106.8015 },
      { id: 'p-704', name: 'Pagi Sore Cipete Kuliner Minang', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.4, walkingOrDriving: '5 menit jalan kaki', address: 'Jl. Cipete Raya No. 2', lat: -6.2798, lng: 106.7995 },
      { id: 'p-705', name: 'Taman Margasatwa Ragunan', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 4.9, walkingOrDriving: '12 menit berkendara', address: 'Pasar Minggu', lat: -6.3124, lng: 106.8201 },
      { id: 'p-706', name: 'Toodz House & Coffee Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.3, walkingOrDriving: '4 menit jalan kaki', address: 'Jl. Cipete Raya No. 79', lat: -6.2778, lng: 106.7962 }
    ]
  },
  {
    id: 'h-8',
    slug: 'hotel-cosmo-amaroossa-jakarta',
    name: 'Hotel Cosmo Amaroossa Jakarta',
    area: 'Antasari / Kemang, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Jl. Pangeran Antasari No. 9A-B, Cipete Selatan, Cilandak, Jakarta Selatan 12410',
    stars: 4,
    verified: true,
    officialUrl: 'https://amaroossahotel.com/jakarta-cosmo/',
    sourceUrl: 'https://amaroossahotel.com/jakarta-cosmo/',
    coverImage: 'https://amaroossahotel.com/images/hotels/jakarta-cosmo/hero-1.jpg',
    gallery: [
      'https://amaroossahotel.com/images/hotels/jakarta-cosmo/hero-1.jpg',
      'https://amaroossahotel.com/images/hotels/jakarta-cosmo/conference-meeting.jpg',
      'https://amaroossahotel.com/images/hotels/jakarta-cosmo/deluxe-king.jpg',
      'https://amaroossahotel.com/images/hotels/jakarta-cosmo/swimming-pool.jpg'
    ],
    pitchTagline: 'Kemewahan klasik kontemporer di koridor Antasari; kolam renang indoor segala cuaca & ballroom 350 pax.',
    description: 'Hotel butik bernuansa megah dengan pilar dan interior mewah di Jl. Pangeran Antasari. Memiliki fasilitas kolam renang beratap indoor yang estetik dan ballroom untuk konsinyasi rapat teknis.',
    facilities: ['Cosmo Ballroom (350 pax)', 'Indoor All-Weather Pool', 'Andromeda Restaurant', 'Amour Bar & Lounge', 'Gym & Spa', '24h Private Lobby'],
    lat: -6.272167,
    lng: 106.809417,
    placeId: 'ChIJj71bOq3zaS4R9E66P8B77cE',
    roomsAndSuites: ['Deluxe Room', 'Executive Room', 'Cosmo Suite interior mewah'],
    diningAndLounge: [
      { name: 'Andromeda Restaurant', description: 'Menu prasmanan lokal dan internasional premium.' },
      { name: 'Amour Bar & Lounge', description: 'Kudapan santai, teh sore, dan mocktail segar.' }
    ],
    meetingsAndMice: [
      { name: 'Cosmo Ballroom & Ruang Sesi (50–350 pax)', capacity: '350 Orang', description: 'Ruang rapat konsinyasi penyusunan draft naskah dan peraturan perundangan.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang indoor berornamen mewah aman segala cuaca, Gym & Spa.',
      logistics: 'Drop-off lobi privat 24 jam, flyover Antasari bebas lampu merah ke Blok M & TB Simatupang.'
    },
    nearbyPlaces: [
      { id: 'p-801', name: 'Stasiun MRT Blok A', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 1.5, walkingOrDriving: '5 menit berkendara', address: 'Jl. Panglima Polim', lat: -6.2552, lng: 106.7972 },
      { id: 'p-802', name: 'RS Brawijaya Antasari', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.1, walkingOrDriving: '4 menit berkendara', address: 'Jl. Taman Brawijaya No. 1', lat: -6.2621, lng: 106.8098 },
      { id: 'p-803', name: 'Lippo Mall Kemang', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.6, walkingOrDriving: '5 menit berkendara', address: 'Jl. Pangeran Antasari No. 36', lat: -6.2608, lng: 106.8142 },
      { id: 'p-804', name: 'Sentra Kuliner Kemang Raya', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 1.2, walkingOrDriving: '4 menit berkendara', address: 'Kemang, Bangka', lat: -6.2681, lng: 106.8155 },
      { id: 'p-805', name: 'Museum Di Tengah Kebun', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 2.1, walkingOrDriving: '7 menit berkendara', address: 'Kemang Timur No. 66', lat: -6.2731, lng: 106.8211 },
      { id: 'p-806', name: 'Amour Executive Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Di area hotel', address: 'Cosmo Amaroossa', lat: -6.2721, lng: 106.8094 }
    ]
  },
  {
    id: 'h-9',
    slug: 'hotel-amaroossa-grande-bekasi',
    name: 'Hotel Amaroossa Grande Bekasi',
    area: 'Ahmad Yani, Bekasi Selatan',
    cityZone: 'Bekasi',
    address: 'Jl. Jend. Ahmad Yani No. 88, Marga Jaya, Bekasi Selatan, Kota Bekasi 17141',
    stars: 4,
    verified: true,
    officialUrl: 'https://amaroossahotel.com/bekasi-grande/',
    sourceUrl: 'https://amaroossahotel.com/bekasi-grande/',
    coverImage: 'https://amaroossahotel.com/images/hotels/bekasi-grande/hero-1.webp',
    gallery: [
      'https://amaroossahotel.com/images/hotels/bekasi-grande/hero-1.webp',
      'https://amaroossahotel.com/images/hotels/bekasi-grande/conference-meeting.jpg',
      'https://amaroossahotel.com/images/hotels/bekasi-grande/deluxe-king.jpg',
      'https://amaroossahotel.com/images/hotels/bekasi-grande/swimming-pool.jpg'
    ],
    pitchTagline: 'Terhubung langsung LRT Bekasi Barat & Tol Becakayu; ballroom modern 800 pax untuk Pemda/BUMN.',
    description: 'Terletak di urat nadi Jl. Jend. Ahmad Yani pusat kota Bekasi. Sangat dekat dengan pusat perkantoran Pemkot Bekasi, Mal Metropolitan, dan terhubung langsung dengan stasiun LRT Jabodebek Bekasi Barat.',
    facilities: ['Grande Ballroom (800 pax)', 'LRT Bekasi Barat Link', 'Astoria Restaurant', 'Semi-Outdoor Pool', 'Sauna & Spa', 'Delegation Bus Parking'],
    lat: -6.248361,
    lng: 106.993417,
    placeId: 'ChIJX99bK-f-aS4RKf8aQ_w32lM',
    roomsAndSuites: ['Deluxe Room', 'Executive Room', 'Grande Suite'],
    diningAndLounge: [
      { name: 'Astoria Restaurant', description: 'Pilihan bersantap formal rombongan Pemda/BUMN dengan menu nusantara pilihan.' }
    ],
    meetingsAndMice: [
      { name: 'Grande Ballroom (800 pax)', capacity: '800 Orang', description: 'Ballroom luas bergaya modern dengan sistem akustik peredam suara prima.' },
      { name: 'Ruang Rapat Komisi', capacity: '20 - 90 Orang', description: 'Cocok untuk rapat koordinasi lintas SKPD dan pimpinan dinas.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang semi-outdoor panorama kota, Fitness center, Sauna & Spa.',
      logistics: 'Terhubung LRT Bekasi Barat & Tol Becakayu, gedung parkir bus delegasi memadai.'
    },
    nearbyPlaces: [
      { id: 'p-901', name: 'Stasiun LRT Bekasi Barat', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.3, walkingOrDriving: '4 menit jalan kaki', address: 'Jl. Jend. Ahmad Yani', lat: -6.2471, lng: 106.9928 },
      { id: 'p-902', name: 'Mal Metropolitan Bekasi', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.4, walkingOrDriving: '5 menit jalan kaki', address: 'Jl. KH. Noer Ali', lat: -6.2492, lng: 106.9912 },
      { id: 'p-903', name: 'RS Mitra Keluarga Bekasi Barat', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.8, walkingOrDriving: '3 menit berkendara', address: 'Jl. Jend. Ahmad Yani', lat: -6.2428, lng: 106.9942 },
      { id: 'p-904', name: 'Bebek Kaleyo Ahmad Yani', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.6, walkingOrDriving: '2 menit berkendara', address: 'Jl. Jend. Ahmad Yani No. 8', lat: -6.2452, lng: 106.9939 },
      { id: 'p-905', name: 'Hutan Kota Patriot Bina Bangsa', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.5, walkingOrDriving: '5 menit berkendara', address: 'Kayuringin Jaya', lat: -6.2361, lng: 106.9902 },
      { id: 'p-906', name: 'Sky Lounge Amaroossa', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Lantai Atas Hotel', address: 'Amaroossa Grande', lat: -6.2483, lng: 106.9934 }
    ]
  },
  {
    id: 'h-10',
    slug: 'grand-mercure-harmoni-jakarta',
    name: 'Grand Mercure Harmoni - Jakarta',
    area: 'Hayam Wuruk / Harmoni, Jakarta Pusat',
    cityZone: 'Central Jakarta',
    address: 'Jl. Hayam Wuruk No. 36-37, Kebon Kelapa, Gambir, Jakarta Pusat 10120',
    stars: 5,
    verified: true,
    officialUrl: 'https://all.accor.com/hotel/8535/index.id.shtml',
    sourceUrl: 'https://all.accor.com/hotel/8535/index.id.shtml',
    coverImage: 'https://www.ahstatic.com/photos/8535_ho_00_p_1024x768.jpg',
    gallery: [
      'https://www.ahstatic.com/photos/8535_ho_00_p_1024x768.jpg',
      'https://www.ahstatic.com/photos/8535_bab003_00_p_1024x768.jpg',
      'https://www.ahstatic.com/photos/8535_ro_00_p_1024x768.jpg',
      'https://www.ahstatic.com/photos/8535_sw_00_p_1024x768.jpg'
    ],
    pitchTagline: 'Ring-1 Istana Presiden & Kementerian; ballroom megah 1.200 pax dan Sky Lounge eksklusif.',
    description: 'Hotel bintang 5 internasional terkemuka di gerbang Ring-1 Harmoni. Berseberangan dengan Istana Kepresidenan RI, Mahkamah Agung, dan Markas Besar Angkatan Darat, menjadikannya pilihan strategis kunker pimpinan tertinggi.',
    facilities: ['Grand Ballroom (1.200 pax)', '12 Meeting Rooms', 'Harmoni Square Restaurant', 'Sky Lounge & City Bar', 'Outdoor Pool & Hot Jacuzzi', 'Executive Club Lounge', 'Secure Parking'],
    lat: -6.162778,
    lng: 106.820278,
    placeId: 'ChIJV4r3gV7zaS4RA18B2xQ4U9I',
    roomsAndSuites: ['Superior Room', 'Deluxe Room', 'Executive Room', 'Junior Suite', 'Grand Suite'],
    diningAndLounge: [
      { name: 'Harmoni Square Restaurant', description: 'All-day dining live cooking internasional dan santapan nusantara kenegaraan.' },
      { name: 'Sky Lounge & City Bar', description: 'Area eksklusif sarapan eksekutif dan mocktail santai lantai atas.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom (1.200 pax)', capacity: '1.200 Orang', description: 'Ballroom plafon megah tanpa tiang, sangat representatif untuk simposium kenegaraan.' },
      { name: '12 Ruang Sidang Pejabat', capacity: '20 - 150 Orang', description: 'Tersedia koneksi konferensi video terenkripsi dan fasilitas sekretariat.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang outdoor, Jacuzzi air panas, Kolam anak, Spa & Steam room.',
      logistics: 'Executive Club Lounge, akses Ring-1 Istana/Kementerian, sistem parkir bertingkat terproteksi.'
    },
    nearbyPlaces: [
      { id: 'p-1001', name: 'Istana Merdeka & Kepresidenan RI', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.1, walkingOrDriving: '4 menit berkendara', address: 'Jl. Medan Merdeka Utara', lat: -6.1702, lng: 106.8242 },
      { id: 'p-1002', name: 'Halte Transjakarta Harmoni Central', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.3, walkingOrDriving: '4 menit jalan kaki', address: 'Harmoni', lat: -6.1642, lng: 106.8201 },
      { id: 'p-1003', name: 'RSUD Tarakan Jakarta Pusat', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.5, walkingOrDriving: '5 menit berkendara', address: 'Jl. Kyai Caringin No. 7', lat: -6.1711, lng: 106.8105 },
      { id: 'p-1004', name: 'Plaza Indonesia & Grand Indonesia', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 3.2, walkingOrDriving: '10 menit berkendara', address: 'Bundaran HI', lat: -6.1932, lng: 106.8225 },
      { id: 'p-1005', name: 'Sate Khas Senayan Hayam Wuruk', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.2, walkingOrDriving: '3 menit jalan kaki', address: 'Jl. Hayam Wuruk No. 40', lat: -6.1621, lng: 106.8205 },
      { id: 'p-1006', name: 'Sky City Lounge Bar', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Area Hotel Lt. 19', address: 'Grand Mercure Harmoni', lat: -6.1627, lng: 106.8202 }
    ]
  },
  {
    id: 'h-11',
    slug: 'hotel-bidakara-jakarta',
    name: 'Hotel Bidakara Jakarta',
    area: 'Pancoran, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Komp. Bidakara, Jl. Gatot Subroto Kav. 71-73, Pancoran, Jakarta Selatan 12870',
    stars: 4,
    verified: true,
    officialUrl: 'https://www.bidakarahotel.com/',
    sourceUrl: 'https://www.bidakarahotel.com/',
    coverImage: 'https://www.bidakarahotel.com/wp-content/uploads/sites/198/2025/09/2-1200x750.jpg',
    gallery: [
      'https://www.bidakarahotel.com/wp-content/uploads/sites/198/2025/09/2-1200x750.jpg',
      'https://www.bidakarahotel.com/wp-content/uploads/sites/198/2026/09/048A0987.jpg',
      'https://www.bidakarahotel.com/wp-content/uploads/sites/198/2025/04/kenanga-1-1200x750.jpg',
      'https://www.bidakarahotel.com/wp-content/uploads/sites/198/2026/09/Honeymoon-suite-1-1024x684.jpg'
    ],
    pitchTagline: 'Birawa Assembly Hall legendaris 3.000 pax; kompleks MICE dinas terlengkap terhubung gedung perkantoran.',
    description: 'Pusat konvensi dan hotel dinas legendaris di Gatot Subroto / Pancoran. Sering menjadi lokasi debat kenegaraan, musrenbang nasional, dan konsolidasi akbar antar instansi pemerintah.',
    facilities: ['Birawa Assembly Hall (3.000 pax)', 'Binakarna Hall', 'Kenanga Restaurant', 'Mawar Lounge', 'Olympic Pool', 'Sport Club', 'Bus Convoy Yard'],
    lat: -6.241278,
    lng: 106.845889,
    placeId: 'ChIJDV-5-wzxaS4Rk40Q8x859v4',
    roomsAndSuites: ['Deluxe Room', 'Executive Room', 'Junior Suite', 'Family Suite'],
    diningAndLounge: [
      { name: 'Kenanga Restaurant', description: 'Prasmanan masif khas nusantara & Barat dengan rotasi menu harian.' },
      { name: 'Mawar Lounge', description: 'Titik kumpul registrasi tanda pengenal panitia kunker.' }
    ],
    meetingsAndMice: [
      { name: 'Birawa Assembly Hall (3.000 pax)', capacity: '3.000 Orang', description: 'Auditorium kenegaraan legendaris tanpa pilar untuk konvensi nasional.' },
      { name: 'Binakarna Hall & Ruang Komisi', capacity: '100 - 800 Orang', description: 'Ruang sidang paripurna kementerian dan rapat panel.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang semi-olimpiade, Sport club luas, Sauna & Pijat refleksi.',
      logistics: 'Kapasitas parkir raksasa terhubung kompleks perkantoran Bidakara Tower, jalur konvoi kementerian.'
    },
    nearbyPlaces: [
      { id: 'p-1101', name: 'LRT Pancoran Station', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.5, walkingOrDriving: '6 menit jalan kaki', address: 'Jl. Gatot Subroto', lat: -6.2421, lng: 106.8465 },
      { id: 'p-1102', name: 'RS Medistra Gatot Subroto', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.1, walkingOrDriving: '4 menit berkendara', address: 'Jl. Gatot Subroto Kav. 59', lat: -6.2392, lng: 106.8365 },
      { id: 'p-1103', name: 'Kota Kasablanka Mall (Kokas)', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 2.3, walkingOrDriving: '7 menit berkendara', address: 'Jl. Casablanca Raya No. 88', lat: -6.2241, lng: 106.8431 },
      { id: 'p-1104', name: 'Tugu Pancoran & Monumen Dirgantara', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 0.4, walkingOrDriving: '5 menit jalan kaki', address: 'Simpang Pancoran', lat: -6.2435, lng: 106.8438 },
      { id: 'p-1105', name: 'Restoran Ikan Bakar Cianjur Pancoran', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.7, walkingOrDriving: '3 menit berkendara', address: 'Jl. Pasar Minggu Raya', lat: -6.2482, lng: 106.8441 },
      { id: 'p-1106', name: 'Mawar Executive Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Area Lobby Bidakara', address: 'Komp. Bidakara', lat: -6.2412, lng: 106.8458 }
    ]
  },
  {
    id: 'h-12',
    slug: 'menara-peninsula-hotel-jakarta',
    name: 'Menara Peninsula Hotel Jakarta',
    area: 'Slipi / Palmerah, Jakarta Barat',
    cityZone: 'West Jakarta',
    address: 'Jl. Letjen S. Parman Kav. 78, Slipi, Palmerah, Jakarta Barat 11410',
    stars: 4,
    verified: true,
    officialUrl: 'https://www.menarapeninsula.com/',
    sourceUrl: 'https://www.menarapeninsula.com/',
    coverImage: 'https://www.menarapeninsula.com/wp-content/uploads/sites/29/2026/03/menara-peninsula-hotel-2200x1200.jpg',
    gallery: [
      'https://www.menarapeninsula.com/wp-content/uploads/sites/29/2026/03/menara-peninsula-hotel-2200x1200.jpg',
      'https://www.menarapeninsula.com/wp-content/uploads/sites/29/2026/05/MPH-BUILDING-NIGHT.jpg-1-1366x768.jpeg',
      'https://www.menarapeninsula.com/wp-content/uploads/sites/29/2025/04/Banner_5160-2200x1200.jpg',
      'https://www.menarapeninsula.com/wp-content/uploads/sites/29/2023/12/11-Peninsula-Suite-10.jpg'
    ],
    pitchTagline: '5 menit ke Kompleks DPR/MPR-RI & BPK-RI; pilihan delegasi parlemen & auditor keuangan negara.',
    description: 'Hotel bisnis empat bintang prestisius di persimpangan Slipi. Sangat dekat dengan Gedung DPR/MPR RI Senayan, BPK RI, dan kantor pusat BUMN di koridor S. Parman.',
    facilities: ['Cengkeh & Peppercorn Ballrooms', 'Kafe Coleman', 'Poolside Bar', 'Peninsula Club Lounge', 'Health Club', 'Near DPR/MPR RI'],
    lat: -6.196944,
    lng: 106.799722,
    placeId: 'ChIJi7b2lM_vaS4R_e036-7n0iY',
    roomsAndSuites: ['Superior Room', 'Deluxe Room', 'Club Room', 'Junior Suite', 'Executive Suite'],
    diningAndLounge: [
      { name: 'Kafe Coleman', description: 'Sarapan prasmanan harian lengkap dan sajian internasional.' },
      { name: 'Poolside Bar', description: 'Relaksasi sore semi-outdoor selepas dinas.' }
    ],
    meetingsAndMice: [
      { name: 'Cengkeh & Peppercorn Ballrooms (200–600 pax)', capacity: '600 Orang', description: 'Ballroom terakreditasi kedap suara untuk rapat dengar pendapat atau koordinasi komisi.' },
      { name: 'Boardrooms Kedap Suara', capacity: '15 - 50 Orang', description: 'Sangat aman untuk pembahasan audit dan anggaran negara.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang outdoor tropis, Health Club, Studio senam, Sauna.',
      logistics: 'Peninsula Club Lounge, 5 menit menuju DPR/MPR-RI & BPK-RI, parkir gedung aman.'
    },
    nearbyPlaces: [
      { id: 'p-1201', name: 'Kompleks Parlemen DPR/MPR-RI', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.8, walkingOrDriving: '5 menit berkendara', address: 'Jl. Gatot Subroto No. 1', lat: -6.2081, lng: 106.7998 },
      { id: 'p-1202', name: 'Kantor BPK-RI Pusat', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.2, walkingOrDriving: '4 menit berkendara', address: 'Jl. Gatot Subroto Kav. 31', lat: -6.2112, lng: 106.8041 },
      { id: 'p-1203', name: 'RS Pelni Petamburan', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 0.6, walkingOrDriving: '3 menit berkendara', address: 'Jl. KS Tubun No. 92-94', lat: -6.1921, lng: 106.8032 },
      { id: 'p-1204', name: 'Mall Taman Anggrek & Central Park', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 2.1, walkingOrDriving: '6 menit berkendara', address: 'Jl. Letjen S. Parman', lat: -6.1782, lng: 106.7921 },
      { id: 'p-1205', name: 'Stasiun Slipi Transjakarta', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.2, walkingOrDriving: '3 menit jalan kaki', address: 'Jl. Letjen S. Parman', lat: -6.1962, lng: 106.8001 },
      { id: 'p-1206', name: 'The Peninsula Pool Bar', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Area Pool Hotel', address: 'Menara Peninsula', lat: -6.1969, lng: 106.7997 }
    ]
  },
  {
    id: 'h-13',
    slug: 'the-ritz-carlton-jakarta-mega-kuningan',
    name: 'The Ritz-Carlton Jakarta, Mega Kuningan',
    area: 'Mega Kuningan, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Jl. DR. Ide Anak Agung Gde Agung Kav. E.1.1 No. 1, Mega Kuningan, Jakarta Selatan 12950',
    stars: 5,
    verified: true,
    officialUrl: 'https://www.ritzcarlton.com/id/hotels/jktrz-the-ritz-carlton-jakarta-mega-kuningan/club/',
    sourceUrl: 'https://www.ritzcarlton.com/id/hotels/jktrz-the-ritz-carlton-jakarta-mega-kuningan/club/',
    coverImage: 'https://cache.marriott.com/content/dam/marriott-renditions/JKTRZ/jktrz-grand-lobby-3002-hor-wide.jpg',
    gallery: [
      'https://cache.marriott.com/content/dam/marriott-renditions/JKTRZ/jktrz-grand-lobby-3002-hor-wide.jpg',
      'https://cache.marriott.com/content/dam/marriott-renditions/JKTRZ/jktrz-ballroom-3553-hor-wide.jpg',
      'https://cache.marriott.com/content/dam/marriott-renditions/JKTRZ/jktrz-guestroom-0010-hor-clsc.jpg',
      'https://cache.marriott.com/content/dam/marriott-renditions/JKTRZ/jktrz-presidential-family-7251-hor-wide.jpg'
    ],
    pitchTagline: 'Pilihan utama delegasi internasional & C-Level; standar keamanan terpadu di jantung distrik bisnis.',
    description: 'Puncak kemewahan VVIP kenegaraan di distrik diplomatik Mega Kuningan. Dilengkapi proteksi keamanan diplomatik level tinggi, The Club Lounge eksklusif dengan 5x sajian privat per hari, dan Grand Ballroom spektakuler.',
    facilities: ['Grand Ballroom (2.500 pax)', '23 VVIP Meeting Rooms', 'Asia Restaurant', 'Lobo & Pastis Steakhouse', 'The Club Lounge', 'Lagoon Pool & Cabana', 'Diplomatic Security Screening'],
    lat: -6.228611,
    lng: 106.827222,
    placeId: 'ChIJhS5699_xaS4RFj9r27H9B20',
    roomsAndSuites: ['Grand Room', 'Grand Club', 'Mayfair Suite', 'Executive Suite', 'The Ritz-Carlton Suite'],
    diningAndLounge: [
      { name: 'Asia Restaurant', description: 'Prasmanan mewah multi-sajian dunia dengan chef internasional.' },
      { name: 'Lobo & Pastis', description: 'Gastrobar Italia & dry-aged steakhouse untuk jamuan makan malam resmi C-level.' },
      { name: 'The Club Lounge', description: 'Perjamuan privat eksklusif 5 kali sehari dengan butler service.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom termewah (2.500 pax)', capacity: '2.500 Orang', description: 'Ballroom prestisius berskala internasional dengan chandelier kristal impor.' },
      { name: '23 Meeting Rooms VVIP', capacity: '10 - 200 Orang', description: 'Ruang rapat bilateral kepala negara dan pimpinan korporasi multinasional.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Lagoon pool luar ruangan, Cabana privat, Ritz-Carlton Spa kelas dunia, Gym 24 jam.',
      logistics: 'Pengamanan diplomatik X-ray bawah kendaraan, jalur VIP steril, ruang tunggu protokol kenegaraan.'
    },
    nearbyPlaces: [
      { id: 'p-1301', name: 'Kedutaan Besar Australia & Singapura', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 0.6, walkingOrDriving: '3 menit berkendara', address: 'Jl. Patra Kuningan & HR Rasuna Said', lat: -6.2291, lng: 106.8315 },
      { id: 'p-1302', name: 'Lotte Shopping Avenue', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.8, walkingOrDriving: '3 menit berkendara', address: 'Jl. Prof. DR. Satrio Kav. 3-5', lat: -6.2238, lng: 106.8228 },
      { id: 'p-1303', name: 'RS Siloam Semanggi / MRCCC', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 2.1, walkingOrDriving: '6 menit berkendara', address: 'Jl. Garnisun No. 2-3 Semanggi', lat: -6.2201, lng: 106.8175 },
      { id: 'p-1304', name: 'Henshin Rooftop Bar & Fine Dining', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 1.3, walkingOrDriving: '5 menit berkendara', address: 'The Westin Jakarta Lt. 67', lat: -6.2235, lng: 106.8322 },
      { id: 'p-1305', name: 'Stasiun MRT Bendungan Hilir', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 2.2, walkingOrDriving: '7 menit berkendara', address: 'Jl. Jend. Sudirman', lat: -6.2162, lng: 106.8198 },
      { id: 'p-1306', name: 'Bistecca Jakarta Steakhouse', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 1.5, walkingOrDriving: '5 menit berkendara', address: '18 Parc Place SCBD', lat: -6.2268, lng: 106.8089 }
    ]
  },
  {
    id: 'h-14',
    slug: 'four-seasons-hotel-jakarta',
    name: 'Four Seasons Hotel Jakarta',
    area: 'Gatot Subroto / Kuningan Barat, Jakarta Selatan',
    cityZone: 'South Jakarta',
    address: 'Capital Place, Jl. Jend. Gatot Subroto Kav. 18, Kuningan Barat, Mampang Prapatan, Jakarta Selatan 12710',
    stars: 5,
    verified: true,
    officialUrl: 'https://www.fourseasons.com/jakarta/',
    sourceUrl: 'https://www.fourseasons.com/jakarta/',
    coverImage: 'https://www.fourseasons.com/content/dam/fourseasons/images/web/JKR/JKR_083_original.jpg',
    gallery: [
      'https://www.fourseasons.com/content/dam/fourseasons/images/web/JKR/JKR_083_original.jpg',
      'https://www.fourseasons.com/content/dam/fourseasons/images/web/JKR/JKR_095_aspect16x9.jpg',
      'https://www.fourseasons.com/content/dam/fourseasons/images/web/JKR/JKR_017_original.jpg',
      'https://www.fourseasons.com/content/dam/fourseasons/images/web/JKR/JKR_113_original.jpg'
    ],
    pitchTagline: 'Konsep All-Suite mewah karya Cesar Pelli & Bill Bensley; lift privat & fasilitas konvoi kenegaraan.',
    description: 'Menempati kompleks prestisius Capital Place di koridor segitiga emas Gatot Subroto. Seluruh kamar berkonsep suite mewah yang dirancang oleh arsitek dunia, dilengkapi jalur lobi privat bebas hambatan.',
    facilities: ['All-Suite Accommodations', 'Grand Ballroom dengan Private Lift', 'Alto Rooftop Restaurant', 'Palm Court', 'Nautilus Bar', 'Bill Bensley Pool', 'EV Charging & VIP Convoy'],
    lat: -6.233889,
    lng: 106.822778,
    placeId: 'ChIJS2J1JODxaS4R24bZ5098dYk',
    roomsAndSuites: ['Executive Suite', 'Deluxe Suite', 'Premier Club Suite', 'Ambassador Suite', 'Presidential Suite'],
    diningAndLounge: [
      { name: 'Alto Restaurant', description: 'Rooftop dining Italia otentik lantai 20 dengan teras pemandangan kota.' },
      { name: 'Palm Court', description: 'Jamuan sarapan elegan dan tradisi teh sore di bawah lampu kristal Lasvit.' },
      { name: 'Nautilus Bar', description: 'Bar koktail klasik bertaraf dunia dengan atmosfer maritim rempah Nusantara.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom dengan Lift Privat (1.000 pax)', capacity: '1.000 Orang', description: 'Ballroom bergaya arsitektur neoklasik dengan akses lift privat langsung dari lobi.' },
      { name: 'Garden Terrace & Boardrooms', capacity: '15 - 80 Orang', description: 'Area pertemuan semi-terbuka yang asri untuk coffee break bilateral pimpinan.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang karya arsitek Bill Bensley dengan hanging daybeds, The Spa & Fitness 24 jam.',
      logistics: 'Jalur lobi privat bebas hambatan, fasilitas pengisian daya mobil listrik (EV), pelataran konvoi terpisah.'
    },
    nearbyPlaces: [
      { id: 'p-1401', name: 'Halte Transjakarta Gatot Subroto Jamsostek', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 0.2, walkingOrDriving: '3 menit jalan kaki', address: 'Jl. Gatot Subroto', lat: -6.2335, lng: 106.8219 },
      { id: 'p-1402', name: 'Pacific Place Mall SCBD', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 1.9, walkingOrDriving: '6 menit berkendara', address: 'SCBD, Senayan', lat: -6.2242, lng: 106.8095 },
      { id: 'p-1403', name: 'RS Siloam TB Simatupang & Semanggi', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 1.8, walkingOrDriving: '5 menit berkendara', address: 'Semanggi', lat: -6.2205, lng: 106.8172 },
      { id: 'p-1404', name: 'Alto Rooftop Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Lantai 20 Hotel', address: 'Four Seasons Jakarta', lat: -6.2338, lng: 106.8227 },
      { id: 'p-1405', name: 'Gelora Bung Karno (GBK)', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 2.8, walkingOrDriving: '8 menit berkendara', address: 'Senayan, Jakarta Pusat', lat: -6.2182, lng: 106.8021 },
      { id: 'p-1406', name: 'Nautilus Cocktail Lounge', category: 'restaurant', categoryLabel: 'Restaurant & Kuliner', distanceKm: 0.05, walkingOrDriving: 'Area Lobby Hotel', address: 'Four Seasons Hotel', lat: -6.2338, lng: 106.8227 }
    ]
  },
  {
    id: 'h-15',
    slug: 'hotel-mulia-senayan-jakarta',
    name: 'Hotel Mulia Senayan Jakarta',
    area: 'Senayan, Jakarta Pusat',
    cityZone: 'Central Jakarta',
    address: 'Jl. Asia Afrika, Senayan, Tanah Abang, Jakarta Pusat 10270',
    stars: 5,
    verified: true,
    officialUrl: 'https://www.themulia.com/jakarta',
    sourceUrl: 'https://www.themulia.com/jakarta',
    coverImage: 'https://cdn.prod.website-files.com/6624ff6a5db57a668993dd4c/66a08a4242de5b6f0fb9d099_523f8f1d7eef52b9399a19ebc2e1e736_Hotel%20Mulia%20Senayan%2C%20Jakarta%20-%20Exterior2.webp',
    gallery: [
      'https://cdn.prod.website-files.com/6624ff6a5db57a668993dd4c/66a08a4242de5b6f0fb9d099_523f8f1d7eef52b9399a19ebc2e1e736_Hotel%20Mulia%20Senayan%2C%20Jakarta%20-%20Exterior2.webp',
      'https://cdn.prod.website-files.com/6624ff6a5db57a668993dd5e/66a089b619ffc49973b93670_Lobby%2001.webp',
      'https://cdn.prod.website-files.com/6624ff6a5db57a668993dd5e/66a0800568773b1c93e6294c_Grandeur%20Deluxe%2001.webp',
      'https://cdn.prod.website-files.com/6624ff6a5db57a668993dd5e/66a080429954d12a00173b65_Royal%20Suite%20-%20Bedroom%20(New).webp'
    ],
    pitchTagline: 'Kemewahan VVIP terdepan di ring-1 DPR-RI & Senayan; privasi tingkat tinggi bagi pimpinan lembaga negara.',
    description: 'Ikon perhotelan mewah kenegaraan yang menghadap lapangan golf Senayan dan Kompleks Parlemen. Menyajikan standar pelayanan butler kenegaraan, multi-buffet kelas dunia The Cafe, serta Grand Ballroom termegah di kawasan Senayan.',
    facilities: ['Grand Ballroom Kenegaraan', 'Mulia Executive Lounge & Butler', 'The Cafe Multi-Buffet', 'Table8 Cantonese', 'Orient8 & Edogin', 'Senayan Golf View Pool', 'State Convoy Parking'],
    lat: -6.215556,
    lng: 106.797222,
    placeId: 'ChIJV4q1983vaS4Rw24q91O02lA',
    roomsAndSuites: ['Mulia Signature', 'Grandeur Deluxe', 'Junior Suite', 'Executive Suite', 'Royal Suite', 'The Mulia Suite'],
    diningAndLounge: [
      { name: 'The Cafe', description: 'Multi-buffet dunia legendaris favorit jamuan delegasi internasional.' },
      { name: 'Table8', description: 'Sajian Kanton & Szechuan otentik bercita rasa tinggi.' },
      { name: 'Orient8 & Edogin', description: 'Sajian Perancis klasik & teppanyaki Jepang segar.' },
      { name: 'Cascade Lounge & CJ\'s Club', description: 'Suasana rileks santai teh sore & live music eksekutif.' }
    ],
    meetingsAndMice: [
      { name: 'Grand Ballroom Kenegaraan (4.000 pax)', capacity: '4.000 Orang', description: 'Ballroom raksasa termegah di Jakarta untuk konferensi tingkat tinggi dan jamuan kenegaraan.' },
      { name: 'Vanda, Lotus & Jasmine Rooms', capacity: '30 - 300 Orang', description: 'Ruang rapat VIP dengan standar privasi ketat untuk menteri dan pimpinan lembaga.' }
    ],
    wellnessAndLogistics: {
      wellness: 'Kolam renang panorama lapangan golf Senayan, The Mulia Spa & Fitness Club terlengkap.',
      logistics: 'Mulia Executive Lounge & Butler service pribadi, pelataran parkir konvoi kenegaraan terproteksi khusus.'
    },
    nearbyPlaces: [
      { id: 'p-1501', name: 'Kompleks Parlemen DPR/MPR RI', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 0.9, walkingOrDriving: '3 menit berkendara', address: 'Jl. Gatot Subroto', lat: -6.2085, lng: 106.7995 },
      { id: 'p-1502', name: 'Stasiun MRT Istora Mandiri', category: 'transit_station', categoryLabel: 'MRT/LRT/Transjakarta', distanceKm: 1.3, walkingOrDriving: '5 menit berkendara', address: 'Jl. Jend. Sudirman', lat: -6.2222, lng: 106.8081 },
      { id: 'p-1503', name: 'Senayan City & Plaza Senayan', category: 'shopping_mall', categoryLabel: 'Shopping Mall', distanceKm: 0.8, walkingOrDriving: '3 menit berkendara', address: 'Jl. Asia Afrika', lat: -6.2255, lng: 106.7991 },
      { id: 'p-1504', name: 'RS Pusat Pertamina (RSPP)', category: 'hospital', categoryLabel: 'Rumah Sakit', distanceKm: 2.4, walkingOrDriving: '7 menit berkendara', address: 'Jl. Kyai Maja No. 43 Kebayoran Baru', lat: -6.2392, lng: 106.7932 },
      { id: 'p-1505', name: 'Hutan Kota GBK Senayan', category: 'tourist_attraction', categoryLabel: 'Wisata', distanceKm: 1.1, walkingOrDriving: '4 menit berkendara', address: 'Pintu Tujuh GBK', lat: -6.2201, lng: 106.8048 },
      { id: 'p-1506', name: 'CJ\'s Club & Lounge', category: 'bar_nightclub', categoryLabel: 'Bar/Lounge/Club', distanceKm: 0.05, walkingOrDriving: 'Di area hotel', address: 'Hotel Mulia Senayan', lat: -6.2155, lng: 106.7972 }
    ]
  }
];

const PARTNER_LOGO_MAP = new Map(HOTEL_PARTNERS.map((p) => [p.slug, p.logoUrl]));

export const HOTELS: Hotel[] = RAW_HOTELS.map((hotel) => ({
  ...hotel,
  logoUrl: PARTNER_LOGO_MAP.get(hotel.slug)
}));

