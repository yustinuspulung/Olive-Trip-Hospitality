import React from 'react';
import { Hotel } from '../types';
import { 
  Search, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall,
  AlertCircle,
  Building2,
  Info,
  ArrowDown
} from 'lucide-react';

interface RateCheckComparisonProps {
  hotel: Hotel;
  onApplyRateToRequest?: (providerName: string, ratePerNight: number) => void;
}

interface ProviderOption {
  id: string;
  name: string;
  tagline: string;
  logoUrl?: string;
  iconBg?: string;
  iconColor?: string;
  iconLetter?: string;
  getUrl: (query: string, officialUrl: string) => string;
}

const PROVIDERS: ProviderOption[] = [
  {
    id: 'traveloka',
    name: 'Traveloka.com',
    tagline: 'Ketersediaan Realtime • Bebas Pembatalan • Points Reward',
    logoUrl: 'https://www.google.com/s2/favicons?domain=traveloka.com&sz=128',
    getUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent('Traveloka ' + decodeURIComponent(q))}`,
  },
  {
    id: 'agoda',
    name: 'Agoda',
    tagline: 'Kamar Deluxe & Suite • Agoda VIP Member Rate',
    logoUrl: 'https://www.google.com/s2/favicons?domain=agoda.com&sz=128',
    getUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent('Agoda ' + decodeURIComponent(q))}`,
  },
  {
    id: 'trip',
    name: 'Trip.com',
    tagline: 'Konfirmasi Instan • Layanan Pelanggan 24/7',
    logoUrl: 'https://www.google.com/s2/favicons?domain=trip.com&sz=128',
    getUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent('Trip.com ' + decodeURIComponent(q))}`,
  },
  {
    id: 'tiket',
    name: 'Tiket.com',
    tagline: 'Diskon Domestik • Jaminan Ketersediaan',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tiket.com&sz=128',
    getUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent('Tiket.com ' + decodeURIComponent(q))}`,
  },
  {
    id: 'booking',
    name: 'Booking.com',
    tagline: 'Opsi Otorisasi Pembayaran Fleksibel • Genius Rate',
    logoUrl: 'https://www.google.com/s2/favicons?domain=booking.com&sz=128',
    getUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent('Booking.com ' + decodeURIComponent(q))}`,
  },
  {
    id: 'official',
    name: 'Website Resmi Hotel',
    tagline: 'Jaminan Tarif Direct Booking & Poin Loyalitas Brand',
    iconBg: 'bg-[#062846]',
    iconColor: 'text-amber-400',
    iconLetter: '★',
    getUrl: (_, officialUrl) => officialUrl,
  }
];

export const RateCheckComparison: React.FC<RateCheckComparisonProps> = ({
  hotel
}) => {
  const hotelSearchQuery = encodeURIComponent(hotel.name);

  const handleScrollToGuarantee = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('b2b-b2g-guarantee-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm overflow-hidden font-sans" id="rate-check-comparison">
      {/* Header Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#062846] via-[#09355C] to-[#062846] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-[#E7B84B]" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Bandingkan Harga &amp; Kanal Reservasi
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Pilih platform di bawah untuk memverifikasi ketersediaan dan tarif langsung pada kanal resmi masing-masing penyedia.
            </p>
          </div>
          
          <div className="self-start sm:self-auto shrink-0">
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verifikasi Langsung</span>
            </span>
          </div>
        </div>

        {/* Search Target Context Sub-bar */}
        <div className="mt-4 bg-[#041E34]/80 rounded-xl p-3 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5 text-slate-200">
            <Search className="w-4 h-4 text-[#E7B84B] shrink-0" />
            <span className="font-semibold text-white">
              Cek Halaman Resmi: {hotel.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{hotel.address}</span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Pemberitahuan Kuota Pemesanan OTA (Maks 5 Kamar) */}
        <div className="p-4 rounded-xl bg-[#FFFBEB] border border-amber-200 text-[#78350F] text-xs flex items-start gap-3 leading-relaxed shadow-2xs">
          <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-900 text-xs sm:text-sm">
              Pemberitahuan Kuota Pemesanan OTA (Maksimal 5 Kamar):
            </div>
            <p className="text-[#92400E] text-[12px] leading-relaxed">
              Tarif kamar pada platform OTA di bawah ini berlaku khusus untuk pemesanan retail individual (<span className="font-semibold underline">maksimal 5 kamar</span>), sehingga <strong className="text-amber-950">tidak dapat mengakomodasi kuota alokasi perjalanan dinas instansi pemerintah (B2G) maupun korporasi (B2B)</strong> dengan jumlah delegasi di atas 10 orang.
            </p>
          </div>
        </div>

        {/* 1. Olive Trip & Hospitality Official Channel Banner (Top Priority Highlight) */}
        <a
          href="#b2b-b2g-guarantee-section"
          onClick={handleScrollToGuarantee}
          className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#062846] via-[#093A66] to-[#042B1F] border-2 border-[#1B6FAE]/40 hover:border-[#E7B84B] shadow-md hover:shadow-lg transition-all duration-200 gap-4 cursor-pointer"
        >
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white p-1 shadow-sm border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1789747795/2_g29rak.svg" 
                alt="Olive Trip & Hospitality Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-white group-hover:text-[#E7B84B] transition-colors">
                  Best Price from Olive Trip &amp; Hospitality
                </span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E7B84B] text-slate-950 uppercase tracking-wide shadow-2xs">
                  Solusi Rombongan &gt;10 Orang
                </span>
              </div>
              <div className="text-xs text-slate-200 mt-1 leading-relaxed">
                Tarif khusus rombongan dinas instansi (SBU Kemenkeu) &amp; BUMN • Kuota alokasi kamar • Faktur Pajak Resmi &amp; SPK
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#E7B84B]">
                Tarif Khusus Rombongan
              </div>
              <div className="text-sm font-extrabold text-white flex items-center sm:justify-end gap-1">
                <span>Pilih Skema B2B / B2G</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#E7B84B]" />
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-lg bg-[#E7B84B] hover:bg-[#D9A738] text-slate-950 text-xs font-extrabold shadow-sm transition-colors shrink-0 flex items-center gap-1.5">
              <span>Pilih Skema</span>
              <ArrowDown className="w-3.5 h-3.5 text-slate-950" />
            </div>
          </div>
        </a>

        {/* 2. OTA & Official Channels List */}
        <div className="space-y-2.5 pt-1">
          {PROVIDERS.map((provider) => {
            const url = provider.getUrl(hotelSearchQuery, hotel.officialUrl);
            const logo = provider.id === 'official' ? (hotel.logoUrl || provider.logoUrl) : provider.logoUrl;

            return (
              <a
                key={provider.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#94A3B8] hover:shadow-xs transition-all duration-200 gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {logo ? (
                    <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs border border-slate-200 overflow-hidden">
                      <img src={logo} alt={provider.name} className="w-full h-full object-contain rounded" />
                    </div>
                  ) : (
                    <div className={`w-9 h-9 rounded-lg ${provider.iconBg || 'bg-[#062846]'} ${provider.iconColor || 'text-white'} flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs`}>
                      {provider.iconLetter}
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-[#062846] group-hover:text-[#1B6FAE] transition-colors">
                      {provider.name}
                    </span>
                    <div className="text-xs text-[#66788A] truncate mt-0.5">
                      {provider.tagline}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0 sm:ml-4">
                  <div className="w-full sm:w-[130px] px-4 py-2 rounded-lg bg-white group-hover:bg-[#062846] text-[#062846] group-hover:text-white border border-[#CBD5E1] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs">
                    <span>Cek Harga</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Informational Footnote */}
        <div className="mt-2 p-3.5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] text-[#475569] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#1B6FAE] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#062846]">Verifikasi Halaman Spesifik OTA:</strong> Menekan tombol <strong>"Cek Harga ↗"</strong> akan membuka secara langsung hasil pencarian spesifik properti ini di kanal resmi masing-masing penyedia untuk mempermudah Anda melakukan perbandingan harga realtime secara transparan.
          </div>
        </div>

      </div>
    </div>
  );
};
