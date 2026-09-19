import React, { useState, useMemo } from 'react';
import { HOTELS } from '../data/hotels';
import { HotelCard } from '../components/HotelCard';
import { Hotel } from '../types';
import { Search, Building2, SlidersHorizontal, ArrowLeft } from 'lucide-react';

interface HotelsPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onNavigateHome: () => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ onSelectHotel, onNavigateHome }) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedFacility, setSelectedFacility] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['All', 'Central Jakarta', 'South Jakarta', 'West Jakarta', 'Bekasi', 'BSD Serpong'];
  const facilities = ['All', 'Grand Ballroom', 'LRT Access', 'Olympic Outdoor Pool', 'Executive Club Lounge', 'Meeting Rooms'];

  const filteredHotels = useMemo(() => {
    return HOTELS.filter((h) => {
      const matchesZone = selectedZone === 'All' || h.cityZone === selectedZone;
      const matchesFacility =
        selectedFacility === 'All' ||
        h.facilities.some((f) => f.toLowerCase().includes(selectedFacility.toLowerCase()));
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.area.toLowerCase().includes(q) ||
        h.pitchTagline.toLowerCase().includes(q);

      return matchesZone && matchesFacility && matchesSearch;
    });
  }, [selectedZone, selectedFacility, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66788A] hover:text-[#062846]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <span className="text-xs font-bold text-[#062846] bg-white px-3 py-1 rounded-full border border-[#DCE5ED]">
            15 Hotel Partners Terverifikasi
          </span>
        </div>

        {/* Header Title */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B6FAE] uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              Katalog Hotel Resmi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062846]">
              Pilihan Hotel Partner Jakarta &amp; Penyangga
            </h1>
            <p className="text-xs sm:text-sm text-[#66788A] mt-1 max-w-2xl">
              15 hotel bintang 3 hingga 5 terakreditasi resmi dengan fasilitas MICE terlengkap, ballroom megah, dan aksesibilitas strategis untuk delegasi Anda.
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-2xl font-black text-[#062846]">{filteredHotels.length}</div>
            <div className="text-xs text-[#66788A]">Hotel Ditampilkan</div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#66788A] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama hotel, area, atau fasilitas MICE..."
                className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg pl-9 pr-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
              />
            </div>

            {/* Quick facility dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#66788A]" />
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
              >
                {facilities.map((fac) => (
                  <option key={fac} value={fac}>
                    {fac === 'All' ? 'Semua Fasilitas' : fac}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location filter chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
            <span className="text-xs font-semibold text-[#66788A] mr-1 shrink-0">Area:</span>
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  selectedZone === zone
                    ? 'bg-[#062846] text-white shadow-xs'
                    : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
                }`}
              >
                {zone === 'All' ? 'Semua Area (15)' : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-[#DCE5ED] space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-base text-[#062846]">Hotel tidak ditemukan untuk filter ini.</h4>
            <p className="text-xs text-[#66788A]">Silakan ubah filter area atau kata kunci pencarian Anda.</p>
            <button
              onClick={() => {
                setSelectedZone('All');
                setSelectedFacility('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#062846] text-white text-xs font-bold hover:bg-[#16324E]"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onSelect={onSelectHotel}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
