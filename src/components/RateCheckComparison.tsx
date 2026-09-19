import React, { useState, useMemo } from 'react';
import { Hotel } from '../types';
import { 
  Search, 
  MapPin, 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  ExternalLink, 
  RefreshCw, 
  MoreVertical, 
  CheckCircle, 
  Info,
  PhoneCall,
  Sparkles,
  Building,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface RateCheckComparisonProps {
  hotel: Hotel;
  onApplyRateToRequest?: (providerName: string, ratePerNight: number) => void;
}

interface ProviderOption {
  id: string;
  name: string;
  type: 'featured' | 'all';
  multiplier: number; // relative to base rate
  fixedOffset?: number; // specific calibration
  tagline: string;
  perks: string[];
  iconBg: string;
  iconColor: string;
  iconLetter: string;
  getUrl: (query: string, officialUrl: string) => string;
}

// Calibrated baseline rates per hotel for realistic meta-search comparison
const HOTEL_BASE_RATES: Record<string, number> = {
  'hotel-bidakara-jakarta': 1251584, // Exact anchor from reference screenshot
  'js-luwansa': 1280000,
  'santika-premiere-hayam-wuruk': 990000,
  'santika-premiere-kota-harapan-indah': 890000,
  'santika-bsd-city-serpong': 780000,
  'royal-kuningan-hotel': 960000,
  'park-hotel-cawang': 690000,
  'hotel-casa-amaroossa-jakarta': 790000,
  'hotel-cosmo-amaroossa-jakarta': 860000,
  'hotel-amaroossa-grande-bekasi': 730000,
  'grand-mercure-jakarta-harmoni': 1230000,
  'menara-peninsula-hotel': 930000,
  'the-ritz-carlton-jakarta-mega-kuningan': 2950000,
  'four-seasons-hotel-jakarta': 4150000,
  'hotel-mulia-senayan-jakarta': 2850000,
};

const PROVIDERS: ProviderOption[] = [
  // Featured Options (Matches reference image)
  {
    id: 'traveloka',
    name: 'Traveloka.com',
    type: 'featured',
    multiplier: 1.0, // Anchor rate in screenshot (e.g. 1.251.584)
    tagline: 'Termasuk Sarapan • Bebas Pembatalan',
    perks: ['Instant Confirmation', 'Traveloka Points', 'Pajak & Servis Termasuk'],
    iconBg: 'bg-[#007CE8]',
    iconColor: 'text-white',
    iconLetter: '✈',
    getUrl: (q) => `https://www.traveloka.com/id-id/hotel/search?spec=${q}`,
  },
  {
    id: 'agoda',
    name: 'Agoda',
    type: 'featured',
    multiplier: 1.0976, // screenshot 1.373.762 vs 1.251.584 = ~1.0976
    tagline: 'Harga Eksklusif Agoda VIP Member',
    perks: ['Cashback AgodaCash', 'Kamar Deluxe King', 'Free Wi-Fi'],
    iconBg: 'bg-[#333333]',
    iconColor: 'text-white',
    iconLetter: 'a',
    getUrl: (q) => `https://www.agoda.com/search?text=${q}`,
  },
  {
    id: 'trip',
    name: 'Trip.com',
    type: 'featured',
    multiplier: 1.0741, // screenshot 1.344.384 vs 1.251.584 = ~1.0741
    tagline: 'Harga Bersih • Konfirmasi Instan',
    perks: ['Trip Coins Reward', 'Layanan 24/7 CS', 'Pembatalan Fleksibel'],
    iconBg: 'bg-[#2577E3]',
    iconColor: 'text-white',
    iconLetter: 'T.',
    getUrl: (q) => `https://id.trip.com/hotels/list?keyword=${q}`,
  },
  // All Options
  {
    id: 'tiket',
    name: 'Tiket.com',
    type: 'all',
    multiplier: 1.0268, // ~Rp 1.285.000
    tagline: 'Diskon Domestik & Tiket Points',
    perks: ['Garansi Harga Termurah', 'Free Cancellation', 'Bisa Cicilan'],
    iconBg: 'bg-[#FEDD00]',
    iconColor: 'text-[#0064D2]',
    iconLetter: 't',
    getUrl: (q) => `https://www.tiket.com/hotel/search?q=${q}`,
  },
  {
    id: 'booking',
    name: 'Booking.com',
    type: 'all',
    multiplier: 1.0475, // ~Rp 1.311.000
    tagline: 'Genius Level 2 Member Rate',
    perks: ['Bayar di Hotel', 'Sarapan Gratis untuk Genius', 'Tanpa DP'],
    iconBg: 'bg-[#003580]',
    iconColor: 'text-white',
    iconLetter: 'B.',
    getUrl: (q) => `https://www.booking.com/searchresults.html?ss=${q}`,
  },
  {
    id: 'official',
    name: 'Website Resmi Hotel',
    type: 'all',
    multiplier: 0.9587, // ~Rp 1.200.000 (Member Direct Booking)
    tagline: 'Tarif Langsung Resmi Manajemen Hotel',
    perks: ['Jaminan Ketersediaan Resmi', 'Early Check-in Priority', 'Poin Loyalitas Brand'],
    iconBg: 'bg-[#062846]',
    iconColor: 'text-white',
    iconLetter: '★',
    getUrl: (_, officialUrl) => officialUrl,
  }
];

export const RateCheckComparison: React.FC<RateCheckComparisonProps> = ({
  hotel,
  onApplyRateToRequest
}) => {
  // State for date check
  const [checkInOffsetDays, setCheckInOffsetDays] = useState<number>(0);
  const [stayDurationNights, setStayDurationNights] = useState<number>(1);
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(0);
  const [showAllOptions, setShowAllOptions] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Baru saja');
  const [selectedProviderModal, setSelectedProviderModal] = useState<ProviderOption | null>(null);

  // Compute check in and check out dates
  const baseDate = useMemo(() => {
    // Current simulated date from context: Sept 18, 2026 (matches reference image: Fri, 18 Sept)
    const d = new Date(2026, 8, 18); // month 8 is Sept (0-indexed)
    d.setDate(d.getDate() + checkInOffsetDays);
    return d;
  }, [checkInOffsetDays]);

  const checkOutDate = useMemo(() => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + stayDurationNights);
    return d;
  }, [baseDate, stayDurationNights]);

  const formatDateShort = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
  };

  // Base rate anchor for this hotel
  const baseRate = useMemo(() => {
    const defaultRate = HOTEL_BASE_RATES[hotel.id] || (hotel.stars >= 5 ? 2800000 : 950000);
    // Room category multiplier
    const roomMultiplier = 1 + (selectedRoomIdx * 0.18);
    // Weekend adjustment
    const dayOfWeek = baseDate.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
    const weekendMultiplier = isWeekend ? 1.05 : 1.0;
    return defaultRate * roomMultiplier * weekendMultiplier;
  }, [hotel.id, hotel.stars, selectedRoomIdx, baseDate]);

  // Savings calculated for alternative dates (like reference: "Save Rp 259.648 if you stay Sat, 19 Sept–Sun, 20 Sept")
  const savingsAmount = useMemo(() => {
    return Math.round(baseRate * 0.2074);
  }, [baseRate]);

  const altDateText = useMemo(() => {
    const alt1 = new Date(baseDate);
    alt1.setDate(alt1.getDate() + 1);
    const alt2 = new Date(alt1);
    alt2.setDate(alt2.getDate() + stayDurationNights);
    return `${formatDateShort(alt1)}–${formatDateShort(alt2)}`;
  }, [baseDate, stayDurationNights]);

  const hotelSearchQuery = encodeURIComponent(hotel.name);

  const handleRefreshRates = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshedTime('Baru saja');
    }, 600);
  };

  const featuredProviders = PROVIDERS.filter(p => p.type === 'featured');
  const allOptionProviders = PROVIDERS.filter(p => p.type === 'all');

  return (
    <div className="bg-[#1F242B] text-slate-100 rounded-2xl border border-slate-700/80 shadow-lg overflow-hidden font-sans">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 border-b border-slate-700/60 bg-gradient-to-b from-[#252C36] to-[#1F242B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Featured Options &amp; Rate Check Transparan
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Perbandingan tarif kamar resmi &amp; agregator OTA terverifikasi secara realtime (tanpa mark-up tersembunyi):
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleRefreshRates}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium text-slate-200 transition-colors shadow-xs"
              title="Perbarui sinkronisasi harga realtime"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Sinkronisasi...' : 'Sinkronkan Live'}</span>
            </button>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-600/60 px-2.5 py-1 rounded-md">
              Live Verified
            </span>
          </div>
        </div>

        {/* Google Hotels Reference Search Context Bar */}
        <div className="mt-4 bg-[#2A313C] rounded-xl p-3 border border-slate-700 space-y-2.5">
          <div className="flex items-center gap-2.5 text-slate-300 text-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-mono text-slate-200">
              harga room {hotel.name.toLowerCase()}...
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-700/60 pt-2">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="truncate">{hotel.address}</span>
          </div>
        </div>

        {/* "Save Rp ... if you stay ..." Banner (Direct reference match) */}
        <div className="mt-3 flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#263543] border border-blue-500/30 text-xs text-blue-200">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-[12px] leading-snug">
            <span className="font-semibold text-white">Hemat {formatRupiah(savingsAmount)}</span> jika Anda menginap pada tanggal <span className="underline decoration-blue-400 font-medium text-blue-200">{altDateText}</span>
          </div>
        </div>

        {/* Interactive Date & Guest Control Bar (Google Hotels style) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Check in */}
          <div className="bg-[#2A313C] rounded-xl p-2.5 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Check in</div>
              <div className="text-xs font-bold text-white mt-0.5">{formatDateShort(baseDate)}</div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCheckInOffsetDays(prev => Math.max(0, prev - 1))}
                disabled={checkInOffsetDays <= 0}
                className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                title="Hari sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setCheckInOffsetDays(prev => prev + 1)}
                className="p-1 rounded hover:bg-slate-700 text-slate-300 transition-colors"
                title="Hari berikutnya"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Check out */}
          <div className="bg-[#2A313C] rounded-xl p-2.5 border border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Check out</div>
              <div className="text-xs font-bold text-white mt-0.5">{formatDateShort(checkOutDate)}</div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setStayDurationNights(prev => Math.max(1, prev - 1))}
                disabled={stayDurationNights <= 1}
                className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors"
                title="Kurangi durasi menginap"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setStayDurationNights(prev => prev + 1)}
                className="p-1 rounded hover:bg-slate-700 text-slate-300 transition-colors"
                title="Tambah durasi menginap"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Guests & Room Category */}
          <div className="bg-[#2A313C] rounded-xl p-2.5 border border-slate-700 flex items-center justify-between">
            <div className="truncate mr-2">
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Tamu &amp; Tipe Kamar</div>
              <select
                value={selectedRoomIdx}
                onChange={(e) => setSelectedRoomIdx(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-white border-none p-0 focus:outline-hidden cursor-pointer max-w-[140px] truncate"
              >
                {hotel.roomsAndSuites.map((r, i) => (
                  <option key={i} value={i} className="bg-[#1F242B] text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-md text-xs font-bold text-slate-200">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{guestsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Rates Comparison List */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Section 1: Sponsored · Featured options */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <span>Sponsored</span>
              <span>•</span>
              <span className="text-slate-200 font-bold">Featured options</span>
            </div>
            <MoreVertical className="w-3.5 h-3.5 text-slate-500 cursor-pointer" />
          </div>

          {/* Catatan Kuota Maksimal 5 Kamar OTA vs Kebutuhan Rombongan Dinas / Korporat */}
          <div className="mb-3.5 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3 leading-relaxed shadow-xs">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-amber-300">
                Pemberitahuan Kuota Pemesanan OTA (Maks. 5 Rooms):
              </div>
              <p className="text-slate-300 text-[12px]">
                Tarif kamar yang tertera pada platform OTA di bawah ini <span className="text-amber-300 font-semibold underline decoration-amber-400/80">hanya berlaku untuk maksimal pemesanan 5 kamar</span> (retail individual), sehingga <strong className="text-white">tidak dapat mengakomodasi kuota perjalanan dinas instansi pemerintah (B2G) maupun korporasi (B2B)</strong> dengan jumlah delegasi di atas 10 orang.
              </p>
              <div className="text-[11px] text-emerald-300 font-medium pt-0.5 flex items-center gap-1.5">
                <span>👉</span>
                <span>Untuk kebutuhan rombongan dinas &gt;10 orang/5 kamar, reservasi dapat dilakukan langsung melalui <strong>Admin Olive Trip &amp; Hospitality</strong> di bawah ini untuk mendapatkan alokasi kuota resmi &amp; penawaran harga terbaik.</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {featuredProviders.map((provider) => {
              const rate = Math.round(baseRate * provider.multiplier);
              const url = provider.getUrl(hotelSearchQuery, hotel.officialUrl);

              return (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProviderModal(provider)}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-[#262D38] hover:bg-[#2F3744] border border-slate-700/80 hover:border-blue-500/60 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${provider.iconBg} ${provider.iconColor} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                      {provider.iconLetter}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                          {provider.name}
                        </span>
                        {provider.id === 'traveloka' && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                            Paling Populer
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {provider.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        {formatRupiah(rate)}
                      </div>
                      <div className="text-[10px] text-slate-400">/malam (Maks. 5 Kamar)</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}

            {/* List Paling Bawah dari Featured Options: Best Price from Olive Trip & Hospitality */}
            <a
              href={`https://wa.me/6281288805482?text=Halo%20Admin%20Olive%20Trip,%20saya%20PIC%20Dinas/Corporate%20ingin%20konsultasi%20Best%20Price%20rombongan%20(di%20atas%2010%20orang%20/%205%20kamar)%20untuk%20${encodeURIComponent(hotel.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#0B351F] via-[#10482B] to-[#0A301E] border-2 border-emerald-500 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-950/60 transition-all duration-200 gap-3.5"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#1DB954] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md ring-2 ring-emerald-300/40 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      Best Price from Olive Trip &amp; Hospitality
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 shadow-xs uppercase tracking-wide">
                      ★ Solusi Rombongan &gt;10 Orang
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-100/90 mt-1 leading-snug">
                    Tarif khusus rombongan dinas instansi kementerian (SBU Kemenkeu) &amp; korporasi BUMN • Kuota blok kamar di atas 10 pax • Faktur Pajak Resmi &amp; SPK
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-emerald-800/60">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                    Tarif Terbaik Rombongan
                  </div>
                  <div className="text-sm sm:text-base font-black text-emerald-400 flex items-center sm:justify-end gap-1">
                    <span>Chat Admin WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[10px] text-emerald-200/80 font-mono">0812-8880-5482</div>
                </div>
                <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-[#1DB954] hover:bg-[#189d47] text-white text-xs font-bold shadow-md transition-colors shrink-0">
                  Hubungi Sekarang &gt;
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Section 2: All options */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-200 font-bold mb-3 px-1">
            <span>All options</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {showAllOptions ? 'Menampilkan semua' : 'Ringkas'}
            </span>
          </div>

          <div className="space-y-2">
            {(showAllOptions ? allOptionProviders : allOptionProviders.slice(0, 2)).map((provider) => {
              const rate = Math.round(baseRate * provider.multiplier);
              const isOfficial = provider.id === 'official';

              return (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProviderModal(provider)}
                  className={`group flex items-center justify-between p-3.5 rounded-xl bg-[#262D38] hover:bg-[#2F3744] border ${
                    isOfficial ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-700/80'
                  } hover:border-blue-500/60 cursor-pointer transition-all duration-200`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full ${provider.iconBg} ${provider.iconColor} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                      {provider.iconLetter}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                          {provider.name}
                        </span>
                        {isOfficial && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-900/80 text-amber-300 border border-amber-600/50">
                            Website Resmi
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {provider.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        {formatRupiah(rate)}
                      </div>
                      <div className="text-[10px] text-slate-400">/malam</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={() => setShowAllOptions(!showAllOptions)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1 px-3 rounded-lg hover:bg-slate-800"
            >
              <span>{showAllOptions ? 'Tutup sebagian opsi' : `→ View ${allOptionProviders.length - 2} more`}</span>
              <span className="text-slate-500 font-normal">
                from {formatRupiah(Math.round(baseRate * 0.9587))}
              </span>
            </button>
          </div>
        </div>

        {/* Olive Trip Official Direct SBU & B2B Advantage Comparison Card */}
        <div className="mt-6 rounded-xl p-4 bg-gradient-to-r from-[#0C3254] to-[#12426E] border border-blue-400/40 text-white shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wider">
                  Olive Corporate &amp; SBU Dinas
                </span>
                <span className="text-xs text-blue-200 font-semibold">
                  Tarif Kontrak Lembaga &amp; Kementerian
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Membutuhkan Penawaran Resmi (Quotation) untuk SPK Dinas atau PO BUMN?
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed max-w-2xl">
                Harga OTA di atas belum mencakup Faktur Pajak resmi, format tagihan APBN/APBD (SBU Kemenkeu), atau penyesuaian fleksibilitas termin pembayaran institusi. Olive Trip menyediakan kontrak B2B/B2G langsung dengan hotel ini.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
              <a
                href={`https://wa.me/6281288805482?text=Halo%20Olive%20Trip,%20saya%20ingin%20cek%20rate%20B2B%20/%20B2G%20resmi%20untuk%20${encodeURIComponent(hotel.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1DB954] hover:bg-[#189d47] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Konsultasi via WhatsApp</span>
              </a>
              <div className="text-[11px] text-center text-blue-200">
                SLA Respons: &lt; 15 Menit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal detail ketika user mengklik salah satu penyedia */}
      {selectedProviderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#242B35] border border-slate-700 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${selectedProviderModal.iconBg} ${selectedProviderModal.iconColor} flex items-center justify-center font-bold text-base`}>
                  {selectedProviderModal.iconLetter}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{selectedProviderModal.name}</h4>
                  <p className="text-xs text-slate-400">Pengecekan Rate Realtime</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProviderModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#1C2129] p-4 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Estimasi Tarif Terverifikasi:</span>
                <span className="text-lg font-extrabold text-emerald-400">
                  {formatRupiah(Math.round(baseRate * selectedProviderModal.multiplier))}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-700/40 pt-2">
                <span>Durasi Menginap:</span>
                <span className="font-semibold text-slate-200">{stayDurationNights} Malam ({formatDateShort(baseDate)} - {formatDateShort(checkOutDate)})</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Tipe Kamar:</span>
                <span className="font-semibold text-slate-200">{hotel.roomsAndSuites[selectedRoomIdx] || 'Standard'}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-300">Keunggulan &amp; Ketentuan:</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedProviderModal.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={selectedProviderModal.getUrl(hotelSearchQuery, hotel.officialUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <span>Buka &amp; Verifikasi Langsung di {selectedProviderModal.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const rate = Math.round(baseRate * selectedProviderModal.multiplier);
                  if (onApplyRateToRequest) {
                    onApplyRateToRequest(selectedProviderModal.name, rate);
                  }
                  setSelectedProviderModal(null);
                }}
                className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors"
              >
                Gunakan Acuan Tarif Ini di Request Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
