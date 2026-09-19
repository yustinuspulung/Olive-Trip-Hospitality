import React, { useState } from 'react';
import { HOTELS } from '../data/hotels';
import { VEHICLES } from '../data/vehicles';
import { StorageService } from '../data/mockStorage';
import { DelegationType, ServiceRequest, TransferDirection } from '../types';
import { 
  Building2, 
  Car, 
  User, 
  Calendar, 
  Plane, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Info,
  Clock,
  Briefcase
} from 'lucide-react';

interface RequestBuilderPageProps {
  initialConfig?: any;
  onSuccess: (requestId: string, quoteId: string) => void;
  onCancel: () => void;
}

export const RequestBuilderPage: React.FC<RequestBuilderPageProps> = ({
  initialConfig,
  onSuccess,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Client Info
  const [delegationType, setDelegationType] = useState<DelegationType>(
    initialConfig?.delegationType || 'B2G_GOVERNMENT'
  );
  const [organization, setOrganization] = useState<string>(
    initialConfig?.organization || 'Pemerintah Provinsi Kalimantan Timur / Dinas ESDM'
  );
  const [picName, setPicName] = useState<string>(initialConfig?.picName || 'Ir. Agus Wijaya');
  const [picTitle, setPicTitle] = useState<string>(
    initialConfig?.picTitle || 'Kepala Bidang Koordinasi & Kunjungan Kerja'
  );
  const [picPhone, setPicPhone] = useState<string>(initialConfig?.picPhone || '+62 812-8880-5482');
  const [picEmail, setPicEmail] = useState<string>(initialConfig?.picEmail || 'agus.wijaya@kaltimprov.go.id');
  const [eventReference, setEventReference] = useState<string>(
    'Kunjungan Kerja Konsultasi Anggaran Kementerian ESDM Jakarta'
  );

  // Step 2: Accommodation
  const [hotelId, setHotelId] = useState<string>(initialConfig?.hotelId || HOTELS[0].id);
  const [checkInDate, setCheckInDate] = useState<string>('2026-09-22');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-09-25');
  const [roomType, setRoomType] = useState<string>(initialConfig?.roomType || 'Deluxe Twin Bed');
  const [roomQuantity, setRoomQuantity] = useState<number>(initialConfig?.roomsCount || initialConfig?.roomQuantity || 6);
  const [guestCount, setGuestCount] = useState<number>(initialConfig?.delegatesCount || 12);
  const [specialRequests, setSpecialRequests] = useState<string>(
    'Kamar di lantai yang sama, non-smoking, sarapan pagi buffet delegasi.'
  );

  // Step 3: Transportation
  const [includeTransport, setIncludeTransport] = useState<boolean>(true);
  const [direction, setDirection] = useState<TransferDirection>('ROUND_TRIP');
  const [airport, setAirport] = useState<'CGK' | 'HLP'>('CGK');
  const [flightNumber, setFlightNumber] = useState<string>('GA-412 (Garuda Indonesia)');
  const [pickupDateTime, setPickupDateTime] = useState<string>('2026-09-22T10:30');
  const [luggageEstimate, setLuggageEstimate] = useState<number>(12);
  const [vehicleSelections, setVehicleSelections] = useState<Record<string, number>>({
    'v-3': 1, // Hiace 15 pax
    'v-1': 1  // Sedan 4 pax
  });

  const selectedHotel = HOTELS.find((h) => h.id === hotelId) || HOTELS[0];

  const toggleVehicleCount = (vId: string, delta: number) => {
    setVehicleSelections((prev) => {
      const cur = prev[vId] || 0;
      const next = Math.max(0, cur + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[vId];
        return copy;
      }
      return { ...prev, [vId]: next };
    });
  };

  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 3;
    }
  };

  const handleSubmit = () => {
    const selectedVehiclesList = Object.entries(vehicleSelections).map(([id, qty]) => {
      const v = VEHICLES.find((item) => item.id === id);
      return {
        vehicleId: id,
        vehicleName: v?.name || 'Executive Fleet',
        quantity: qty
      };
    });

    // 1. Create Service Request
    const newRequest = StorageService.createServiceRequest({
      delegationType,
      organization,
      picName,
      picTitle,
      picPhone,
      picEmail,
      eventReference,
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      checkInDate,
      checkOutDate,
      nightsCount: calculateNights(),
      roomType,
      roomQuantity,
      guestCount,
      specialRequests,
      transportIncluded: includeTransport,
      transferDirection: includeTransport ? direction : undefined,
      airport: includeTransport ? airport : undefined,
      flightNumber: includeTransport ? flightNumber : undefined,
      pickupDateTime: includeTransport ? pickupDateTime : undefined,
      selectedVehicles: includeTransport ? selectedVehiclesList : [],
      luggageEstimate: includeTransport ? luggageEstimate : undefined,
      notes: 'Permintaan dibuat via Request Builder resmi Olive Trip & Hospitality.'
    });

    // 2. Generate Official Formal Quote
    const newQuote = StorageService.createQuote(newRequest.id, {
      hotelSpec: {
        hotelName: selectedHotel.name,
        roomType,
        roomQuantity,
        nightsCount: calculateNights(),
        guestCount,
        notes: specialRequests
      },
      transportSpec: includeTransport
        ? {
            direction,
            airport,
            flightNumber,
            pickupDateTime,
            vehicles: selectedVehiclesList,
            luggageCount: luggageEstimate,
            slaCommitment: [
              'Driver profesional berbusana batik / jas rapi',
              'Paging board nama delegasi resmi di terminal kedatangan',
              'All-in Bahan Bakar, Tol Dalam Kota, dan Parkir Bandara',
              'Air mineral & permen eksekutif tersedia di setiap unit'
            ]
          }
        : undefined,
      termsAndConditions: [
        'Proposal koordinasi resmi diterbitkan untuk perencanaan delegasi pemerintah & korporasi.',
        'Seluruh armada telah memenuhi SOP keamanan dan keprotokolan dinas Jabodetabek.',
        'Fasilitas hotel mengikuti ketersediaan konfirmasi alokasi kamar saat approval dilakukan.',
        'Bebas biaya pembatalan atau perubahan tanggal hingga H-2 jadwal kunjungan dinas.'
      ]
    });

    onSuccess(newRequest.id, newQuote.id);
  };

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top bar back */}
        <div className="flex items-center justify-between">
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66788A] hover:text-[#062846]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Batalkan &amp; Kembali</span>
          </button>

          <span className="text-xs font-bold text-[#062846] bg-white px-3 py-1 rounded-full border border-[#DCE5ED]">
            Proposal Registration Engine
          </span>
        </div>

        {/* Step Indicator Header */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#DCE5ED]">
            <div>
              <span className="text-xs font-bold text-[#1B6FAE] uppercase tracking-wider">
                Layanan Terpadu B2G / B2B
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#062846] mt-0.5">
                Quotation &amp; Visit Plan Builder
              </h1>
              <p className="text-xs text-[#66788A] mt-1">
                Lengkapi kebutuhan kunjungan dinas untuk menerbitkan Proposal Koordinasi Resmi (.PDF)
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#062846] bg-[#F8FBFE] px-3 py-1.5 rounded-lg border border-[#DCE5ED] self-start sm:self-center">
              <span>Langkah {currentStep} dari 4</span>
            </div>
          </div>

          {/* Stepper Wizard */}
          <div className="grid grid-cols-4 gap-2 pt-4">
            {[
              { step: 1, label: 'Data Instansi', icon: User },
              { step: 2, label: 'Akomodasi', icon: Building2 },
              { step: 3, label: 'Armada Bandara', icon: Car },
              { step: 4, label: 'Review & Terbitkan', icon: FileText },
            ].map((s) => {
              const Icon = s.icon;
              const isCompleted = currentStep > s.step;
              const isCurrent = currentStep === s.step;
              return (
                <div
                  key={s.step}
                  onClick={() => s.step < currentStep && setCurrentStep(s.step)}
                  className={`flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl text-center sm:text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#062846] text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-50 text-[#66788A]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isCurrent
                        ? 'bg-[#E7B84B] text-[#062846]'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[11px] font-bold leading-tight">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Client Information */}
        {currentStep === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-[#DCE5ED] pb-4">
              <h3 className="text-base font-bold text-[#062846]">1. Data Instansi &amp; PIC Perjalanan</h3>
              <p className="text-xs text-[#66788A] mt-1">
                Bebas friksi privasi: Tanpa nomor KTP/NIK/NIP pribadi. Hanya identitas kerja resmi untuk pencantuman pada surat penawaran dinas.
              </p>
            </div>

            <div className="space-y-4">
              {/* Segment switch */}
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1.5">
                  Kategori Delegasi *
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setDelegationType('B2G_GOVERNMENT')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      delegationType === 'B2G_GOVERNMENT'
                        ? 'border-[#062846] bg-[#062846] text-white'
                        : 'border-[#DCE5ED] bg-white text-[#24364B] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#E7B84B]" />
                      <span>🏛 B2G / Pemerintah</span>
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5">Standar Biaya Masukan (SBU)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDelegationType('B2B_CORPORATE')}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      delegationType === 'B2B_CORPORATE'
                        ? 'border-[#062846] bg-[#062846] text-white'
                        : 'border-[#DCE5ED] bg-white text-[#24364B] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#1B6FAE]" />
                      <span>🏢 B2B / Korporasi</span>
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5">Executive &amp; Corporate Visit</div>
                  </button>
                </div>
              </div>

              {/* Instansi */}
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Nama Instansi / Lembaga / Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Contoh: Kementerian Keuangan RI / PT Adhi Karya Tbk"
                  className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                />
              </div>

              {/* Grid 2 cols for PIC Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Nama Lengkap PIC Delegasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    placeholder="Contoh: Ir. Agus Wijaya"
                    className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Jabatan PIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={picTitle}
                    onChange={(e) => setPicTitle(e.target.value)}
                    placeholder="Contoh: Kepala Subbagian Rumah Tangga & Protokol"
                    className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>
              </div>

              {/* Grid 2 cols for WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Nomor WhatsApp PIC (Aktif) *
                  </label>
                  <input
                    type="text"
                    required
                    value={picPhone}
                    onChange={(e) => setPicPhone(e.target.value)}
                    placeholder="+62 812-XXXX-XXXX"
                    className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Alamat Email Kerja PIC
                  </label>
                  <input
                    type="email"
                    value={picEmail}
                    onChange={(e) => setPicEmail(e.target.value)}
                    placeholder="nama@instansi.go.id / nama@corporate.com"
                    className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                  />
                </div>
              </div>

              {/* Event Reference */}
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Nama Agenda / Acara Kunjungan Dinas *
                </label>
                <input
                  type="text"
                  required
                  value={eventReference}
                  onChange={(e) => setEventReference(e.target.value)}
                  placeholder="Contoh: Rapat Koordinasi Nasional & Kunker Komisi di Jakarta"
                  className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#DCE5ED]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Lanjut ke Kebutuhan Akomodasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Accommodation */}
        {currentStep === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-[#DCE5ED] pb-4">
              <h3 className="text-base font-bold text-[#062846]">2. Kebutuhan Hotel &amp; Akomodasi</h3>
              <p className="text-xs text-[#66788A] mt-1">
                Pilih hotel mitra resmi dan tentukan jumlah kamar serta tanggal menginap delegasi.
              </p>
            </div>

            <div className="space-y-4">
              {/* Hotel selector */}
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Pilihan Hotel Mitra Resmi *
                </label>
                <select
                  value={hotelId}
                  onChange={(e) => setHotelId(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-semibold"
                >
                  {HOTELS.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.area}, {h.cityZone}) • Bintang {h.stars}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Hotel Quick Preview */}
              <div className="p-3.5 rounded-xl bg-[#EBF7FF] border border-[#1B6FAE]/20 flex items-center gap-4">
                <img
                  src={selectedHotel.coverImage}
                  alt={selectedHotel.name}
                  className="w-20 h-14 rounded-lg object-cover border border-[#DCE5ED] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-[#062846]">{selectedHotel.name}</div>
                  <div className="text-[11px] text-[#66788A]">{selectedHotel.address}</div>
                  <div className="text-[11px] font-semibold text-[#1B6FAE] mt-0.5">
                    {selectedHotel.pitchTagline}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Tanggal Check-in *
                  </label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Tanggal Check-out *
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Durasi Menginap
                  </label>
                  <div className="p-2.5 rounded-lg bg-slate-100 text-xs font-bold text-[#062846] text-center">
                    {calculateNights()} Malam Kunjungan
                  </div>
                </div>
              </div>

              {/* Room Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Tipe Kamar Pilihan
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                  >
                    {selectedHotel.roomsAndSuites.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Jumlah Kamar
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={roomQuantity}
                    onChange={(e) => setRoomQuantity(Number(e.target.value))}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Estimasi Jumlah Tamu
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-bold"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Catatan Khusus Akomodasi
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Contoh: Kamar VIP Eselon I satu lantai terpisah, twin bed untuk staf asistensi."
                  className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg p-3 text-[#24364B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#DCE5ED]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A] hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Lanjut ke Mobilitas Bandara</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Transportation */}
        {currentStep === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#DCE5ED] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#062846]">3. Armada &amp; Penjemputan Bandara</h3>
                <p className="text-xs text-[#66788A] mt-1">
                  Layanan penjemputan resmi CGK &amp; HLP All-In (BBM, Tol, Parkir, dan Driver Seragam).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#24364B] cursor-pointer">
                  Sertakan Transportasi:
                </label>
                <input
                  type="checkbox"
                  checked={includeTransport}
                  onChange={(e) => setIncludeTransport(e.target.checked)}
                  className="w-4 h-4 text-[#1B6FAE] rounded"
                />
              </div>
            </div>

            {includeTransport ? (
              <div className="space-y-4">
                {/* Direction and Airport */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#24364B] block mb-1">
                      Arah Rute Penjemputan *
                    </label>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value as TransferDirection)}
                      className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-semibold"
                    >
                      <option value="ROUND_TRIP">Pulang-Pergi (Bandara ⇄ Hotel PP)</option>
                      <option value="AIRPORT_TO_HOTEL">Kedatangan Saja (Bandara → Hotel)</option>
                      <option value="HOTEL_TO_AIRPORT">Kepulangan Saja (Hotel → Bandara)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#24364B] block mb-1">
                      Terminal Bandara Kedatangan *
                    </label>
                    <select
                      value={airport}
                      onChange={(e) => setAirport(e.target.value as any)}
                      className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-semibold"
                    >
                      <option value="CGK">Bandara Internasional Soekarno-Hatta (CGK)</option>
                      <option value="HLP">Bandara Halim Perdanakusuma (HLP)</option>
                    </select>
                  </div>
                </div>

                {/* Flight Number & Pickup Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#24364B] block mb-1">
                      Nomor Penerbangan (Flight No.)
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="Contoh: GA-412"
                      className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#24364B] block mb-1">
                      Waktu Mendarat / Penjemputan
                    </label>
                    <input
                      type="datetime-local"
                      value={pickupDateTime}
                      onChange={(e) => setPickupDateTime(e.target.value)}
                      className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#24364B] block mb-1">
                      Estimasi Jumlah Koper Bagasi
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={luggageEstimate}
                      onChange={(e) => setLuggageEstimate(Number(e.target.value))}
                      className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B]"
                    />
                  </div>
                </div>

                {/* Vehicle Selection Matrix */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-[#24364B] block mb-2">
                    Pilih Jenis &amp; Kuantitas Armada yang Dibutuhkan:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VEHICLES.map((v) => {
                      const count = vehicleSelections[v.id] || 0;
                      return (
                        <div
                          key={v.id}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                            count > 0 ? 'bg-[#EBF7FF] border-[#1B6FAE]' : 'bg-[#F8FBFE] border-[#DCE5ED]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={v.imageUrl}
                              alt={v.name}
                              className="w-14 h-10 object-contain bg-white rounded-md border border-[#DCE5ED] p-0.5"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-xs text-[#062846]">{v.name}</div>
                              <div className="text-[10px] text-[#66788A]">
                                Kapasitas: {v.capacityPax} Orang • {v.capacityLuggage} Koper
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleVehicleCount(v.id, -1)}
                              className="w-6 h-6 rounded bg-white border border-[#DCE5ED] text-xs font-bold flex items-center justify-center text-[#24364B]"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-5 text-center text-[#062846]">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleVehicleCount(v.id, 1)}
                              className="w-6 h-6 rounded bg-white border border-[#DCE5ED] text-xs font-bold flex items-center justify-center text-[#24364B]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F8FBFE] rounded-xl border border-[#DCE5ED] text-xs text-[#66788A]">
                Transportasi bandara tidak disertakan dalam permohonan ini.
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#DCE5ED]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A] hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <span>Lanjut ke Review &amp; Terbitkan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-[#DCE5ED] pb-4">
              <h3 className="text-base font-bold text-[#062846]">4. Review Kebutuhan &amp; Terbitkan Proposal</h3>
              <p className="text-xs text-[#66788A] mt-1">
                Periksa kelengkapan spesifikasi sebelum menerbitkan Proposal Koordinasi Resmi Olive Trip &amp; Hospitality.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              {/* Client Info Card */}
              <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#1B6FAE]" />
                    <span className="font-bold text-xs text-[#062846] uppercase tracking-wide">
                      Identitas Instansi &amp; PIC
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] font-bold text-[#1B6FAE] hover:underline"
                  >
                    Ubah
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#24364B]">
                  <div>Instansi: <strong>{organization}</strong></div>
                  <div>Kategori: <strong>{delegationType === 'B2G_GOVERNMENT' ? 'B2G Government' : 'B2B Corporate'}</strong></div>
                  <div>PIC: <strong>{picName}</strong> ({picTitle})</div>
                  <div>WhatsApp: <strong>{picPhone}</strong></div>
                  <div className="sm:col-span-2 text-[#66788A]">
                    Agenda: {eventReference}
                  </div>
                </div>
              </div>

              {/* Accommodation Card */}
              <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#1B6FAE]" />
                    <span className="font-bold text-xs text-[#062846] uppercase tracking-wide">
                      Spesifikasi Akomodasi
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-[11px] font-bold text-[#1B6FAE] hover:underline"
                  >
                    Ubah
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#24364B]">
                  <div>Hotel: <strong>{selectedHotel.name}</strong></div>
                  <div>Tipe Kamar: <strong>{roomType}</strong></div>
                  <div>Kuantitas: <strong>{roomQuantity} Kamar</strong> ({guestCount} Tamu)</div>
                  <div>Periode: <strong>{checkInDate} s/d {checkOutDate}</strong> ({calculateNights()} Malam)</div>
                  {specialRequests && (
                    <div className="sm:col-span-2 text-[#66788A]">
                      Catatan: {specialRequests}
                    </div>
                  )}
                </div>
              </div>

              {/* Transport Card */}
              {includeTransport && (
                <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#1B6FAE]" />
                      <span className="font-bold text-xs text-[#062846] uppercase tracking-wide">
                        Spesifikasi Transportasi Bandara (All-In)
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-[11px] font-bold text-[#1B6FAE] hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#24364B]">
                    <div>Rute: <strong>{direction === 'ROUND_TRIP' ? 'Bandara ⇄ Hotel PP' : direction}</strong></div>
                    <div>Bandara: <strong>{airport}</strong> (Flight: {flightNumber})</div>
                    <div>Jadwal Penjemputan: <strong>{pickupDateTime.replace('T', ' ')}</strong></div>
                    <div>Estimasi Koper: <strong>{luggageEstimate} Koper</strong></div>
                    <div className="sm:col-span-2">
                      Armada: <strong>
                        {Object.entries(vehicleSelections)
                          .map(([id, q]) => {
                            const v = VEHICLES.find((x) => x.id === id);
                            return `${q}x ${v?.name || 'Unit'}`;
                          })
                          .join(', ') || 'Belum memilih armada'}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reassurance Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Kepatuhan Regulasi &amp; Privasi Terjamin:</strong> Surat penawaran yang diterbitkan merupakan dokumen koordinasi resmi berstandar SBU. Tidak ada penagihan atau pembayaran online pada tahapan ini.
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#DCE5ED]">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2.5 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A] hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                id="submit-request-builder-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                <FileText className="w-4 h-4 text-[#E7B84B]" />
                <span>Terbitkan Proposal Koordinasi Resmi</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
