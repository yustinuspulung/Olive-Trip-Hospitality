import React from 'react';
import { Building2, Car, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreHotels: () => void;
  onExploreTransport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreHotels, onExploreTransport }) => {
  return (
    <section className="relative overflow-hidden bg-[#062846] text-white">
      {/* Photographic Jakarta Skyline with Monas & High-Rise Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=2000&q=85')`
        }}
        aria-hidden="true"
      />

      {/* Corporate Deep Navy Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062846] via-[#062846]/95 to-[#16324E]/90" />

      {/* Subtle Pattern Grid Accent */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Title, Subtitle, Supporting text, CTAs */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-[#E7B84B] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E7B84B] animate-pulse"></span>
              WELCOME TO
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Olive Trip &amp; Hospitality
            </h1>

            <div className="text-lg sm:text-xl font-semibold text-blue-100 border-l-3 border-[#E7B84B] pl-3 py-0.5">
              Accommodation &amp; Mobility Solutions for Jakarta Executive Visits
            </div>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
              Kami siap mendukung kunjungan kerja delegasi pemerintahan dan korporasi dengan pilihan hotel terbaik dan transportasi yang aman, nyaman, dan representatif.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExploreHotels}
                id="hero-explore-hotels-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1B6FAE] hover:bg-[#155a8e] active:bg-[#104771] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Jelajahi Hotel
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreTransport}
                id="hero-explore-transport-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold text-sm border border-white/25 backdrop-blur-xs transition-all"
              >
                Lihat Armada
              </button>
            </div>

            {/* Small reassurance tagline */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#E7B84B]" />
              <span>Dukungan Standar Biaya Masukan (SBU) &amp; Bebas Friksi Administrasi Koordinasi</span>
            </div>
          </div>

          {/* Right Column: Hero KPI Card (15 Hotel Partners / 6 Pilihan Armada / 6+ Kategori Aksesibilitas) */}
          <div className="lg:col-span-4">
            <div 
              id="hero-kpi-card"
              className="bg-[#16324E]/95 border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle gold glow corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E7B84B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                <div className="text-xs font-bold text-[#E7B84B] tracking-wider uppercase">
                  Executive KPI Overview
                </div>
                <div className="text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  Terverifikasi 2026
                </div>
              </div>

              <div className="space-y-4">
                {/* KPI 1 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-[#E7B84B] shadow-inner shrink-0 border border-white/10">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      15
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Hotel Partners
                    </div>
                    <div className="text-[11px] text-slate-400">Ring-1 &amp; Koridor Bisnis Utama</div>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-[#1B6FAE] shadow-inner shrink-0 border border-white/10">
                    <Car className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      6
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Pilihan Armada
                    </div>
                    <div className="text-[11px] text-slate-400">Sedan, SUV, Hiace s/d Big Bus</div>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-emerald-400 shadow-inner shrink-0 border border-white/10">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      6+
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Kategori Aksesibilitas
                    </div>
                    <div className="text-[11px] text-slate-400">MRT/LRT, RS, Mall, Kuliner, dll.</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-slate-300 text-center">
                Solusi Terpusat Kunjungan Eksekutif DKI Jakarta
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
