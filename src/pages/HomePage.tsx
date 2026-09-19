import React, { useState, useMemo } from 'react';
import { Hero } from '../components/Hero';
import { HotelPartnersMarquee } from '../components/HotelPartnersMarquee';
import { TripConfigurator } from '../components/TripConfigurator';
import { HotelCard } from '../components/HotelCard';
import { VehicleCard } from '../components/VehicleCard';
import { HOTELS } from '../data/hotels';
import { VEHICLES } from '../data/vehicles';
import { DelegationType, Hotel, Vehicle } from '../types';
import { 
  Building2, 
  Car, 
  Search, 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Train, 
  Hospital, 
  Utensils, 
  Wine, 
  Briefcase
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectHotel: (hotel: Hotel) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onStartConfiguredRequest: (config: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectHotel,
  onSelectVehicle,
  onStartConfiguredRequest
}) => {
  const [delegationType, setDelegationType] = useState<DelegationType>('B2G_GOVERNMENT');
  const [activeZone, setActiveZone] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['All', 'Central Jakarta', 'South Jakarta', 'West Jakarta', 'Bekasi', 'BSD Serpong'];

  const filteredHotels = useMemo(() => {
    return HOTELS.filter((h) => {
      const matchesZone = activeZone === 'All' || h.cityZone === activeZone;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q || 
        h.name.toLowerCase().includes(q) || 
        h.area.toLowerCase().includes(q) || 
        h.pitchTagline.toLowerCase().includes(q);
      return matchesZone && matchesQuery;
    });
  }, [activeZone, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      {/* Hero Section */}
      <Hero
        onExploreHotels={() => {
          const el = document.getElementById('hotel-inventory-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreTransport={() => {
          const el = document.getElementById('transport-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Section Logo Hotel Partners (Auto Moving List Logo - Kanan ke Kiri) */}
      <HotelPartnersMarquee />


      {/* Delegation Segment Switcher Bar */}
      <div className="bg-[#F8FBFE] border-y border-[#DCE5ED] py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#24364B]">
            <span className="text-[#66788A]">Filter Kategori Delegasi:</span>
            <span className="text-[#062846] hidden sm:inline">Pilih jenis instansi untuk penyesuaian kepatuhan dinas:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDelegationType('B2G_GOVERNMENT')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                delegationType === 'B2G_GOVERNMENT'
                  ? 'bg-[#062846] text-white shadow-xs'
                  : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#E7B84B]" />
              <span>🏛 Delegasi Pemerintah (B2G) • Standar SBU</span>
            </button>

            <button
              type="button"
              onClick={() => setDelegationType('B2B_CORPORATE')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                delegationType === 'B2B_CORPORATE'
                  ? 'bg-[#062846] text-white shadow-xs'
                  : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#1B6FAE]" />
              <span>🏢 Korporasi / Swasta (B2B)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Portal Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Section 01 Hotel Inventory & Section 02 Transport */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 01: Hotel Inventory */}
            <section id="hotel-inventory-section" className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#062846] text-white text-xs font-extrabold flex items-center justify-center">
                      01
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#062846]">
                      Hotel Inventory
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66788A] mt-1 pl-9">
                    Pilih hotel sesuai kebutuhan dan lokasi yang paling strategis untuk rombongan Anda.
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('/hotels')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1B6FAE] hover:text-[#062846] transition-colors self-start sm:self-end"
                >
                  <span>Lihat Semua 15 Hotel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F8FBFE] p-3 rounded-xl border border-[#DCE5ED]">
                {/* Zone chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  {zones.map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setActiveZone(zone)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                        activeZone === zone
                          ? 'bg-[#1B6FAE] text-white shadow-xs'
                          : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
                      }`}
                    >
                      {zone === 'All' ? 'All (15)' : zone}
                    </button>
                  ))}
                </div>

                {/* Search input */}
                <div className="relative min-w-[200px] sm:w-64">
                  <Search className="w-4 h-4 text-[#66788A] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari hotel, PIC, area..."
                    className="w-full text-xs bg-white border border-[#DCE5ED] rounded-lg pl-9 pr-3 py-2 text-[#24364B] placeholder-[#66788A] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>
              </div>

              {/* Hotels Grid - 3 Columns on Website Mode, Displaying All 15 Hotels */}
              {filteredHotels.length === 0 ? (
                <div className="py-12 text-center bg-[#F8FBFE] rounded-xl border border-dashed border-[#DCE5ED]">
                  <p className="text-sm font-semibold text-[#062846]">Hotel tidak ditemukan untuk filter ini.</p>
                  <p className="text-xs text-[#66788A] mt-1">Silakan pilih zona lain atau bersihkan kata kunci pencarian.</p>
                  <button
                    onClick={() => {
                      setActiveZone('All');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs font-bold text-[#1B6FAE] hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={onSelectHotel}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Section 02: Transportasi & Mobilitas Bandara */}
            <section id="transport-section" className="space-y-5 pt-4 border-t border-[#DCE5ED]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#062846] text-white text-xs font-extrabold flex items-center justify-center">
                      02
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#062846]">
                      Transportasi &amp; Mobilitas Bandara
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66788A] mt-1 pl-9">
                    Pilih kendaraan yang sesuai dengan jumlah peserta dan kebutuhan perjalanan dinas CGK / HLP PP.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#062846] bg-slate-50 px-2.5 py-1 rounded-md border border-[#DCE5ED] self-start sm:self-end">
                  <span>6 Pilihan Armada</span>
                  <span className="text-[#66788A]">|</span>
                  <span className="text-[#1B6FAE]">All-in Operasional</span>
                </div>
              </div>

              {/* 6 Vehicle Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {VEHICLES.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onSelect={onSelectVehicle}
                  />
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Trip Configurator Rail */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 self-start z-30">
            <TripConfigurator
              delegationType={delegationType}
              onDelegationTypeChange={setDelegationType}
              onGenerateQuotation={onStartConfiguredRequest}
            />
          </aside>

        </div>
      </main>

      {/* 3 Pillars & Trust Banner */}
      <section className="bg-[#062846] text-white py-10 border-t border-[#16324E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#1B6FAE] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#E7B84B]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Pilihan Hotel Terpercaya</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Bekerja sama dengan hotel-hotel terbaik di Jakarta, Bekasi dan sekitarnya dengan jaminan transparansi resmi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#1B6FAE] flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-sky-200" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Transportasi Aman &amp; Nyaman</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Armada terawat dengan driver profesional berbusana batik/jas dan berpengalaman dalam keprotokolan dinas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#1B6FAE] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Layanan Profesional</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Tim kami siap memastikan setiap detail perjalanan berjalan lancar tanpa friksi administrasi dan biaya tersembunyi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Accessibility Categories Showcase Section (Decision Support - Not Itinerary) */}
      <section className="py-14 bg-[#F8FBFE] border-b border-[#DCE5ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7FF] text-[#1B6FAE] text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              6+ Kategori Aksesibilitas
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#062846]">
              Aksesibilitas di Sekitar Hotel
            </h2>
            <p className="text-xs sm:text-sm text-[#66788A] mt-2">
              Lihat akses ke pusat bisnis, pemerintahan, kuliner, pusat perbelanjaan, transportasi publik, rumah sakit, dan area hiburan. Informasi ini membantu PIC memilih hotel yang tepat bagi rombongan kerja.
            </p>
            <div className="mt-2 inline-block px-3 py-0.5 rounded text-[11px] font-semibold text-[#062846] bg-white border border-[#DCE5ED]">
              Catatan: Fitur ini adalah informasi pendukung pemilihan lokasi, bukan pembentuk itinerary perjalanan dinas.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { title: 'Shopping Mall', desc: 'Akses retail & lifestyle terdekat', icon: Building2, color: 'text-blue-600 bg-blue-50 border-blue-200' },
              { title: 'Restaurant & Kuliner', desc: 'Sentra jamuan makan delegasi', icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { title: 'Wisata & Landmark', desc: 'Monas, Kota Tua & cagar budaya', icon: Compass, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { title: 'MRT/LRT/Transjakarta', desc: 'Mobilitas bebas macet dinas', icon: Train, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
              { title: 'Rumah Sakit', desc: 'Fasilitas rujukan darurat 24 jam', icon: Hospital, color: 'text-rose-600 bg-rose-50 border-rose-200' },
              { title: 'Bar/Lounge/Club', desc: 'Relaksasi eksekutif malam hari', icon: Wine, color: 'text-purple-600 bg-purple-50 border-purple-200' },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs text-center space-y-2 hover:border-[#1B6FAE]/40 transition-colors">
                  <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#062846]">{cat.title}</h4>
                  <p className="text-[11px] text-[#66788A] leading-tight">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Olive Trip Works (Section 47) */}
      <section className="py-14 bg-white border-b border-[#DCE5ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#1B6FAE] uppercase tracking-wider">
              Workflow B2G / B2B Terpadu
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#062846] mt-1">
              Cara Kerja Olive Trip &amp; Hospitality
            </h2>
            <p className="text-xs sm:text-sm text-[#66788A] mt-2">
              Empat langkah mudah tanpa repot koordinasi manual terpisah untuk akomodasi dan transportasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Pilih Hotel', desc: 'Tentukan hotel dari 15 partner terverifikasi di Jakarta, Bekasi, atau BSD sesuai lokasi instansi.' },
              { step: '02', title: 'Atur Transportasi', desc: 'Pilih 6 kategori armada bandara (CGK/HLP) lengkap dengan rute, jam mendarat, dan kapasitas bagasi.' },
              { step: '03', title: 'Submit & Generate Quotation', desc: 'Kirim formulir ringkas tanpa NIK/NIP pribadi. Dapatkan Proposal Koordinasi resmi (PDF) secara instan.' },
              { step: '04', title: 'Koordinasikan Perjalanan', desc: 'Ajukan revisi atau setujui proposal langsung. Tim operasional Olive standby 24 jam mengawal kunjungan.' },
            ].map((item, idx) => (
              <div key={idx} className="relative p-5 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-3">
                <span className="text-3xl font-black text-[#062846]/20 font-mono block">
                  {item.step}
                </span>
                <h4 className="font-bold text-base text-[#062846]">{item.title}</h4>
                <p className="text-xs text-[#66788A] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government & Corporate Use Cases (Section 48) */}
      <section className="py-14 bg-[#F8FBFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Government Card */}
            <div className="bg-white p-7 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#062846] text-[#E7B84B] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1B6FAE] tracking-wide uppercase">Delegasi Pemerintah (B2G)</span>
                <h3 className="text-xl font-bold text-[#062846] mt-1">
                  Koordinasi Akomodasi &amp; Mobilitas Delegasi Lebih Terstruktur
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#66788A] leading-relaxed">
                Dirancang khusus untuk PIC kementerian, lembaga negara, pemerintah daerah, dan komisi legislatif. Memudahkan penyusunan paket hotel dan transfer bandara yang selaras dengan Standar Biaya Masukan (SBU/Perdir) dengan dokumen legal resmi.
              </p>
              <button
                onClick={() => {
                  setDelegationType('B2G_GOVERNMENT');
                  onNavigate('/request/new');
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#062846] hover:text-[#1B6FAE] transition-colors"
              >
                <span>Mulai Request Delegasi Pemerintah</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Corporate Card */}
            <div className="bg-white p-7 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B6FAE] text-white flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1B6FAE] tracking-wide uppercase">Korporasi &amp; Swasta (B2B)</span>
                <h3 className="text-xl font-bold text-[#062846] mt-1">
                  Permudah Pengaturan Perjalanan Dinas untuk Executive &amp; Bisnis
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#66788A] leading-relaxed">
                Solusi bagi Executive Assistant (EA), Travel Coordinator, dan HR Corporate. Menjamin armada eksekutif standby tepat waktu di bandara serta kamar hotel bintang representatif dengan akses cepat ke distrik SCBD, Kuningan, dan Thamrin.
              </p>
              <button
                onClick={() => {
                  setDelegationType('B2B_CORPORATE');
                  onNavigate('/request/new');
                }}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#062846] hover:text-[#1B6FAE] transition-colors"
              >
                <span>Mulai Request Korporasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Quotation CTA Banner */}
      <section className="bg-gradient-to-r from-[#062846] to-[#16324E] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E7B84B] text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Layanan Bebas Repot Koordinasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            Siap Mengatur Kunjungan Dinas Delegasi Anda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Kirimkan kebutuhan akomodasi dan penjemputan bandara Anda. Tim operasional Olive Trip &amp; Hospitality akan segera menerbitkan Surat Proposal Layanan resmi.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/request/new')}
              id="bottom-request-quote-cta"
              className="px-6 py-3.5 rounded-lg bg-[#1B6FAE] hover:bg-[#155a8e] text-white font-bold text-sm shadow-md transition-all"
            >
              Request Quotation Sekarang
            </button>
            <button
              onClick={() => onNavigate('/concierge')}
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              Konsultasi Layanan Khusus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
