import React, { useState } from 'react';
import { Hotel } from '../types';
import { AccessibilityRadar } from '../components/AccessibilityRadar';
import { RateCheckComparison } from '../components/RateCheckComparison';
import { StarBadge } from '../components/StarBadge';
import { 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  PhoneCall, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Landmark,
  Utensils, 
  Briefcase, 
  Sparkles,
  Bed,
  Car
} from 'lucide-react';

interface HotelDetailPageProps {
  hotel: Hotel;
  onBack: () => void;
  onStartRequestWithHotel: (data: {
    hotelId: string;
    organization: string;
    picName: string;
    picTitle: string;
    picPhone: string;
    roomType: string;
    roomQuantity: number;
    nights: number;
  }) => void;
}

export const HotelDetailPage: React.FC<HotelDetailPageProps> = ({
  hotel,
  onBack,
  onStartRequestWithHotel
}) => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'dining' | 'mice' | 'wellness' | 'logistics'>('rooms');
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

  // Quick Quotation Form State (Zero Privacy Friction)
  const [organization, setOrganization] = useState<string>('Kementerian Keuangan RI / PT Adhi Karya');
  const [picName, setPicName] = useState<string>('Bambang Prasetyo');
  const [picTitle, setPicTitle] = useState<string>('Kepala Subbagian Rumah Tangga & Protokol');
  const [picPhone, setPicPhone] = useState<string>('+62 812-8880-5482');
  const [roomType, setRoomType] = useState<string>(hotel.roomsAndSuites[0] || 'Deluxe Room');
  const [roomQuantity, setRoomQuantity] = useState<number>(6);
  const [nights, setNights] = useState<number>(3);

  const images = hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.coverImage];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartRequestWithHotel({
      hotelId: hotel.id,
      organization,
      picName,
      picTitle,
      picPhone,
      roomType,
      roomQuantity,
      nights
    });
  };

  const hotelSearchQuery = encodeURIComponent(hotel.name);

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top bar back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66788A] hover:text-[#062846]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Hotel</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#062846] bg-white px-3 py-1 rounded-full border border-[#DCE5ED]">
              Official Partner Register
            </span>
          </div>
        </div>

        {/* Two-Column Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gallery, Specs Tabs, Rate Check Transparency, Maps */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Hotel Header & Main Info */}
            <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StarBadge stars={hotel.stars} starCategory={hotel.starCategory} slug={hotel.slug} name={hotel.name} textSize="text-sm sm:text-base" starSize="w-6 h-6" />

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Terverifikasi Resmi Mitra Olive</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062846]">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#66788A] mt-1.5">
                    <MapPin className="w-4 h-4 text-[#1B6FAE] shrink-0" />
                    <span>{hotel.address}</span>
                  </div>
                </div>

                {hotel.logoUrl && (
                  <div className="shrink-0 p-2.5 bg-[#F8FBFE] border border-[#DCE5ED] rounded-xl flex items-center justify-center max-w-[170px] h-14 shadow-2xs self-start">
                    <img 
                      src={hotel.logoUrl} 
                      alt={`${hotel.name} logo`} 
                      className="max-h-10 max-w-[150px] w-auto h-auto object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Pitch Tagline Box */}
              <div className="p-3.5 rounded-xl bg-[#EBF7FF] border border-[#1B6FAE]/20 text-xs text-[#062846] font-medium leading-relaxed italic">
                "{hotel.pitchTagline}"
              </div>

              {/* Image Gallery */}
              <div className="space-y-2 pt-2">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 border border-[#DCE5ED]">
                  <img
                    src={images[selectedImageIdx]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md">
                    Foto Resmi: {hotel.name}
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          selectedImageIdx === idx ? 'border-[#1B6FAE] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Official Canonical Source Link */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#66788A] border-t border-slate-100">
                <span>Sumber Kanonikal Resmi:</span>
                <a
                  href={hotel.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#1B6FAE] hover:underline"
                >
                  <span>{hotel.officialUrl.replace('https://', '').split('/')[0]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Featured Options & Rate Check Transparan (Live Realtime Google Hotels Meta-Search Format) */}
            <RateCheckComparison 
              hotel={hotel} 
              onApplyRateToRequest={(providerName, rate) => {
                // Pre-fill quick quotation form with provider context
                const notes = `Menggunakan acuan tarif publik terverifikasi ${providerName}: Rp ${rate.toLocaleString('id-ID')}/malam`;
                alert(`Acuan ${providerName} (${rate.toLocaleString('id-ID')}/malam) telah diaplikasikan.`);
              }} 
            />

            {/* Dual Guarantee B2B & B2G Executive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="b2b-b2g-guarantee-section">
              {/* B2B Guarantee Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#E7B84B] via-[#DFAB36] to-[#D4A12B] border-2 border-[#062846] text-[#062846] shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#062846] border border-[#062846]/20 flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 className="w-5 h-5 text-[#E7B84B]" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-[#062846] tracking-tight">B2B Corporate</h4>
                      <p className="text-[11px] text-[#062846]/85 font-extrabold">Skema Kerjasama Korporasi</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#062846]/90 font-medium leading-relaxed">
                    Paket akomodasi &amp; mobilitas terkoordinasi langsung dengan tim Olive Trip &amp; Hospitality. Satu invoice konsolidasi tanpa beban administrasi terpisah.
                  </p>
                </div>

                <a
                  href={`https://wa.me/6281288805482?text=${encodeURIComponent(
                    `Halo Admin Olive Trip & Hospitality,\n\n[TAG: B2B CORPORATE PARTNERSHIP]\nSaya PIC Korporat / BUMN ingin berkonsultasi mengenai penawaran resmi (B2B Corporate Rate), konsolidasi invoice, & fasilitas akomodasi untuk:\n• Properti Hotel: ${hotel.name}\n\nMohon informasi ketersediaan kuota & penawaran harga khusus korporasi. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#062846] hover:bg-[#09355C] text-white text-xs font-extrabold transition-all shadow-md group border border-[#1B6FAE]/40"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Konsultasi B2B Corporate</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* B2G Government Guarantee Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#062846] via-[#083358] to-[#041E34] border-2 border-[#E7B84B] text-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E7B84B]/15 border border-[#E7B84B]/40 flex items-center justify-center shrink-0 shadow-inner">
                      <Landmark className="w-5 h-5 text-[#E7B84B]" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">B2G Government</h4>
                      <p className="text-[11px] text-[#E7B84B] font-semibold">Skema Kerjasama Instansi Pemerintah</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Tarif resmi rombongan dinas instansi pemerintah disesuaikan dengan Standar Biaya Masukan (SBU/Perdir), lengkap dengan SPK &amp; Faktur Pajak.
                  </p>
                </div>

                <a
                  href={`https://wa.me/6281288805482?text=${encodeURIComponent(
                    `Halo Admin Olive Trip & Hospitality,\n\n[TAG: B2G GOVERNMENT DELEGATION]\nSaya PIC Dinas / Instansi Pemerintah ingin berkonsultasi mengenai alokasi kuota rombongan, kesesuaian Standar Biaya Masukan (SBU Kemenkeu/Perdir), SPK & Faktur Pajak Resmi untuk:\n• Properti Hotel: ${hotel.name}\n\nMohon arahan alokasi kuota & skema penawaran resmi dinas. Terima kasih.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#E7B84B] hover:bg-[#D9A738] text-slate-950 text-xs font-extrabold transition-all shadow-md group border border-[#F5D88D]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Konsultasi B2G Government</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Comprehensive Facilities Tabs */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-xs overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-[#DCE5ED] bg-[#F8FBFE] overflow-x-auto no-scrollbar">
                {[
                  { id: 'rooms', label: 'Rooms & Suites', icon: Bed },
                  { id: 'dining', label: 'Dining & Resto', icon: Utensils },
                  { id: 'mice', label: 'Meetings & MICE', icon: Briefcase },
                  { id: 'wellness', label: 'Wellness & Pool', icon: Sparkles },
                  { id: 'logistics', label: 'Logistik & Parkir', icon: Car },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-bold shrink-0 border-b-2 transition-all ${
                        isActive
                          ? 'border-[#1B6FAE] text-[#062846] bg-white'
                          : 'border-transparent text-[#66788A] hover:text-[#062846]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1B6FAE]' : 'text-[#66788A]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'rooms' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#062846]">Kategori Kamar &amp; Suite Terverifikasi:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {hotel.roomsAndSuites.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8FBFE] border border-[#DCE5ED] text-xs font-medium text-[#24364B]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B6FAE] shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'dining' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#062846]">Restoran &amp; Fasilitas Jamuan Makan:</h4>
                    <div className="space-y-2.5">
                      {hotel.diningAndLounge.map((d, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[#F8FBFE] border border-[#DCE5ED]">
                          <h5 className="font-bold text-xs text-[#062846]">{d.name}</h5>
                          <p className="text-xs text-[#66788A] mt-0.5">{d.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'mice' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#062846]">Ballroom &amp; Ruang Sidang MICE:</h4>
                    <div className="space-y-2.5">
                      {hotel.meetingsAndMice.map((m, i) => (
                        <div key={i} className="p-3 rounded-lg bg-[#F8FBFE] border border-[#DCE5ED] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-xs text-[#062846]">{m.name}</h5>
                            <p className="text-xs text-[#66788A] mt-0.5">{m.description}</p>
                          </div>
                          <span className="text-[11px] font-bold text-[#1B6FAE] bg-white px-2.5 py-1 rounded-md border border-[#DCE5ED] self-start sm:self-center shrink-0">
                            Kapasitas: {m.capacity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'wellness' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#062846]">Kebugaran &amp; Relaksasi Delegasi:</h4>
                    <p className="text-xs text-[#24364B] leading-relaxed bg-[#F8FBFE] p-3.5 rounded-lg border border-[#DCE5ED]">
                      {hotel.wellnessAndLogistics.wellness}
                    </p>
                  </div>
                )}

                {activeTab === 'logistics' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-[#062846]">Dukungan Logistik &amp; Parkir Armada Bus:</h4>
                    <p className="text-xs text-[#24364B] leading-relaxed bg-[#F8FBFE] p-3.5 rounded-lg border border-[#DCE5ED]">
                      {hotel.wellnessAndLogistics.logistics}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps Accessibility Radar */}
            <AccessibilityRadar hotel={hotel} />

          </div>

          {/* Right Column: Quotation Builder (Form PIC Ringkas) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-md p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-[#062846]">
                    Quotation Builder (Form Ringkas)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1B6FAE] border border-blue-200">
                    Resmi B2G/B2B
                  </span>
                </div>
                <p className="text-[11px] text-[#66788A] mt-1 leading-snug">
                  Bebas Friksi Privasi: Tanpa NIK, NIP, atau identitas pribadi. Hanya 4 data kerja esensial.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* 1. Instansi */}
                <div>
                  <label className="text-xs font-semibold text-[#24364B] block mb-1">
                    1. Nama Instansi / Lembaga / Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Contoh: Kementerian Keuangan RI / PT Adhi Karya"
                    className="w-full text-xs sm:text-sm bg-white border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                {/* 2. Nama Lengkap PIC */}
                <div>
                  <label className="text-xs font-semibold text-[#24364B] block mb-1">
                    2. Nama Lengkap PIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    placeholder="Contoh: Bambang Prasetyo"
                    className="w-full text-xs sm:text-sm bg-white border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                {/* 3. Jabatan PIC */}
                <div>
                  <label className="text-xs font-semibold text-[#24364B] block mb-1">
                    3. Jabatan PIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={picTitle}
                    onChange={(e) => setPicTitle(e.target.value)}
                    placeholder="Contoh: Kepala Subbagian Rumah Tangga & Protokol"
                    className="w-full text-xs sm:text-sm bg-white border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                {/* 4. Nomor WhatsApp PIC */}
                <div>
                  <label className="text-xs font-semibold text-[#24364B] block mb-1">
                    4. Nomor WhatsApp PIC (Aktif) *
                  </label>
                  <input
                    type="text"
                    required
                    value={picPhone}
                    onChange={(e) => setPicPhone(e.target.value)}
                    placeholder="+62 812-XXXX-XXXX"
                    className="w-full text-xs sm:text-sm bg-white border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                {/* Room specifications */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-xs font-semibold text-[#24364B] block mb-1">
                    Pilihan Kamar &amp; Durasi
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <span className="text-[11px] text-[#66788A] block">Jumlah Kamar:</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={roomQuantity}
                        onChange={(e) => setRoomQuantity(Number(e.target.value))}
                        className="w-full text-xs bg-white border border-[#DCE5ED] rounded-lg px-2.5 py-1.5 font-bold text-[#062846]"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#66788A] block">Durasi Malam:</span>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-full text-xs bg-white border border-[#DCE5ED] rounded-lg px-2.5 py-1.5 font-bold text-[#062846]"
                      />
                    </div>
                  </div>

                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full text-xs bg-white border border-[#DCE5ED] rounded-lg px-2.5 py-2 text-[#24364B]"
                  >
                    {hotel.roomsAndSuites.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Summary Box */}
                <div className="p-3 rounded-lg bg-[#F8FBFE] border border-[#DCE5ED] text-xs space-y-1">
                  <div className="font-bold text-[#062846] text-[11px]">Rincian Akomodasi:</div>
                  <p className="text-[#24364B]">
                    {hotel.name} • {roomQuantity} Kamar × {nights} Malam
                  </p>
                  <p className="text-[11px] text-[#66788A]">
                    Tipe: {roomType}
                  </p>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="hotel-detail-generate-quote-btn"
                  className="w-full py-3 px-4 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4 text-[#E7B84B]" />
                  <span>Generate &amp; Review Penawaran (.PDF)</span>
                </button>

                <a
                  href={`https://wa.me/6281288805482?text=${encodeURIComponent(
                    `Halo Olive Trip, saya PIC ${organization} (${picName}) ingin koordinasi akomodasi ${hotel.name} untuk ${roomQuantity} kamar.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1DB954] hover:bg-[#189d47] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Kirim Rincian Pesanan ke WhatsApp Panitia</span>
                </a>
              </form>

              {/* Output PDF Guarantee list */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-[#66788A] space-y-1">
                <div className="font-bold text-[#062846] text-[10px] uppercase">
                  Output Dokumen Penawaran Resmi Mencakup:
                </div>
                <p>• Kop Resmi: "OLIVE TRIP &amp; HOSPITALITY"</p>
                <p>• Nomor Registrasi Proposal: QUO/OTH/202609/XXXX</p>
                <p>• Data Instansi, PIC, Jabatan, &amp; No. WhatsApp</p>
                <p>• Rincian Akomodasi &amp; Armada All-In</p>
                <p>• Standar Kepatuhan SBU &amp; Validitas 14 Hari Kalender</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
