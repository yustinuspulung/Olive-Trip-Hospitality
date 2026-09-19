import React, { useState } from 'react';
import { Settings, Users, Moon, Building2, Bed, Car, CheckSquare, Square, ArrowRight, Shield } from 'lucide-react';
import { HOTELS } from '../data/hotels';
import { DelegationType } from '../types';

interface TripConfiguratorProps {
  delegationType: DelegationType;
  onDelegationTypeChange: (type: DelegationType) => void;
  onGenerateQuotation: (config: {
    delegationType: DelegationType;
    delegatesCount: number;
    nightsCount: number;
    hotelId: string;
    roomsCount: number;
    selectedVehicles: { vehicleId: string; name: string; quantity: number }[];
  }) => void;
  selectedHotelId?: string;
}

export const TripConfigurator: React.FC<TripConfiguratorProps> = ({
  delegationType,
  onDelegationTypeChange,
  onGenerateQuotation,
  selectedHotelId: initialHotelId
}) => {
  const [delegatesCount, setDelegatesCount] = useState<number>(12);
  const [nightsCount, setNightsCount] = useState<number>(3);
  const [hotelId, setHotelId] = useState<string>(initialHotelId || HOTELS[0].id);
  const [roomsCount, setRoomsCount] = useState<number>(6);

  // Vehicles checklist
  const [vehicles, setVehicles] = useState<Record<string, { selected: boolean; quantity: number; name: string }>>({
    'v-3': { selected: true, quantity: 1, name: 'Hiace (15 pax)' },
    'v-1': { selected: true, quantity: 1, name: 'Sedan (4 pax)' },
    'v-2': { selected: false, quantity: 1, name: 'SUV (6 pax)' },
    'v-4': { selected: false, quantity: 1, name: 'Mini Bus (20 pax)' },
    'v-5': { selected: false, quantity: 1, name: 'Medium Bus (25 pax)' },
    'v-6': { selected: false, quantity: 1, name: 'Large Bus (40 pax)' }
  });

  const selectedHotel = HOTELS.find((h) => h.id === hotelId) || HOTELS[0];

  const toggleVehicle = (id: string) => {
    setVehicles((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selected: !prev[id].selected
      }
    }));
  };

  const updateQuantity = (id: string, delta: number) => {
    setVehicles((prev) => {
      const current = prev[id].quantity;
      const next = Math.max(1, Math.min(10, current + delta));
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: next,
          selected: true
        }
      };
    });
  };

  const handleGenerate = () => {
    const activeVehicles = Object.entries(vehicles)
      .filter(([_, v]) => v.selected)
      .map(([id, v]) => ({
        vehicleId: id,
        name: v.name,
        quantity: v.quantity
      }));

    onGenerateQuotation({
      delegationType,
      delegatesCount,
      nightsCount,
      hotelId,
      roomsCount,
      selectedVehicles: activeVehicles
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm p-5 sm:p-6 max-h-[calc(100vh-8.5rem)] overflow-y-auto custom-scrollbar transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EBF7FF] flex items-center justify-center text-[#1B6FAE]">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#062846]">Trip Configuration</h3>
            <p className="text-[11px] text-[#66788A]">Sesuaikan kebutuhan kunjungan kunker delegasi</p>
          </div>
        </div>
      </div>

      {/* Segment Switcher in Configurator */}
      <div className="mt-4">
        <label className="text-[11px] font-bold text-[#66788A] uppercase tracking-wider block mb-1.5">
          Kategori Delegasi Terpilih
        </label>
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F8FBFE] rounded-lg border border-[#DCE5ED]">
          <button
            type="button"
            onClick={() => onDelegationTypeChange('B2G_GOVERNMENT')}
            className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
              delegationType === 'B2G_GOVERNMENT'
                ? 'bg-[#062846] text-white shadow-xs'
                : 'text-[#66788A] hover:text-[#062846]'
            }`}
          >
            <Shield className="w-3 h-3 text-[#E7B84B]" />
            Delegasi Pemda / B2G
          </button>
          <button
            type="button"
            onClick={() => onDelegationTypeChange('B2B_CORPORATE')}
            className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
              delegationType === 'B2B_CORPORATE'
                ? 'bg-[#062846] text-white shadow-xs'
                : 'text-[#66788A] hover:text-[#062846]'
            }`}
          >
            Korporasi / B2B
          </button>
        </div>
      </div>

      {/* Form inputs */}
      <div className="mt-4 space-y-3.5">
        {/* Jumlah Anggota Delegasi */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#24364B] mb-1">
            <Users className="w-3.5 h-3.5 text-[#1B6FAE]" />
            Jumlah Anggota Delegasi
          </label>
          <select
            value={delegatesCount}
            onChange={(e) => setDelegatesCount(Number(e.target.value))}
            className="w-full text-xs sm:text-sm font-medium border border-[#DCE5ED] rounded-lg px-3 py-2 bg-white text-[#24364B] focus:outline-none focus:border-[#1B6FAE] focus:ring-1 focus:ring-[#1B6FAE]"
          >
            <option value={2}>2 Orang (VIP Eselon I / Pimpinan)</option>
            <option value={4}>4 Orang (Tim Kecil Pimpinan)</option>
            <option value={6}>6 Orang (Tim Asistensi Khusus)</option>
            <option value={8}>8 Orang (Delegasi Komisi)</option>
            <option value={12}>12 Orang (Rombongan Kerja DPD / Dinas)</option>
            <option value={15}>15 Orang (Delegasi Paripurna 1 Unit Hiace)</option>
            <option value={20}>20 Orang (Rombongan Mini Bus)</option>
            <option value={30}>30 Orang (Rombongan Medium Bus)</option>
            <option value={50}>50 Orang (Delegasi Akbar)</option>
          </select>
        </div>

        {/* Durasi Kunjungan */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#24364B] mb-1">
            <Moon className="w-3.5 h-3.5 text-[#1B6FAE]" />
            Durasi Kunjungan Dinas
          </label>
          <select
            value={nightsCount}
            onChange={(e) => setNightsCount(Number(e.target.value))}
            className="w-full text-xs sm:text-sm font-medium border border-[#DCE5ED] rounded-lg px-3 py-2 bg-white text-[#24364B] focus:outline-none focus:border-[#1B6FAE] focus:ring-1 focus:ring-[#1B6FAE]"
          >
            <option value={1}>1 Malam (Transit Dinas)</option>
            <option value={2}>2 Malam (Pertemuan Singkat)</option>
            <option value={3}>3 Malam (Kunker Standar)</option>
            <option value={4}>4 Malam (Konsinyasi &amp; FGD)</option>
            <option value={5}>5 Malam (Sidang / Konferensi)</option>
            <option value={7}>7 Malam (1 Pekan)</option>
          </select>
        </div>

        {/* Pilihan Hotel */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#24364B] mb-1">
            <Building2 className="w-3.5 h-3.5 text-[#1B6FAE]" />
            Pilihan Hotel Rekomendasi
          </label>
          <select
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            className="w-full text-xs sm:text-sm font-medium border border-[#DCE5ED] rounded-lg px-3 py-2 bg-white text-[#24364B] focus:outline-none focus:border-[#1B6FAE] focus:ring-1 focus:ring-[#1B6FAE]"
          >
            {HOTELS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.area})
              </option>
            ))}
          </select>
        </div>

        {/* Kebutuhan Kamar */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#24364B] mb-1">
            <Bed className="w-3.5 h-3.5 text-[#1B6FAE]" />
            Kebutuhan Kamar (Twin / King)
          </label>
          <select
            value={roomsCount}
            onChange={(e) => setRoomsCount(Number(e.target.value))}
            className="w-full text-xs sm:text-sm font-medium border border-[#DCE5ED] rounded-lg px-3 py-2 bg-white text-[#24364B] focus:outline-none focus:border-[#1B6FAE] focus:ring-1 focus:ring-[#1B6FAE]"
          >
            <option value={2}>2 Kamar</option>
            <option value={4}>4 Kamar</option>
            <option value={6}>6 Kamar (Twin / King)</option>
            <option value={8}>8 Kamar</option>
            <option value={10}>10 Kamar</option>
            <option value={15}>15 Kamar</option>
            <option value={20}>20 Kamar</option>
          </select>
        </div>

        {/* Checklist Armada Penjemputan */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#24364B] mb-1.5">
            <Car className="w-3.5 h-3.5 text-[#1B6FAE]" />
            Checklist Armada Penjemputan (CGK / HLP PP)
          </label>
          <div className="space-y-1.5 border border-[#DCE5ED] rounded-lg p-2.5 bg-[#F8FBFE] max-h-44 overflow-y-auto">
            {Object.entries(vehicles).map(([id, v]) => (
              <div key={id} className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-white transition-colors">
                <div 
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={() => toggleVehicle(id)}
                >
                  {v.selected ? (
                    <CheckSquare className="w-4 h-4 text-[#1B6FAE]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#66788A]" />
                  )}
                  <span className={`text-xs font-medium ${v.selected ? 'text-[#062846] font-semibold' : 'text-[#66788A]'}`}>
                    {v.name}
                  </span>
                </div>

                {v.selected && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, -1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white border border-[#DCE5ED] text-xs font-bold text-[#24364B]"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-[#062846] w-5 text-center">
                      ×{v.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, 1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white border border-[#DCE5ED] text-xs font-bold text-[#24364B]"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ringkasan Kebutuhan Box */}
      <div className="mt-4 p-3 rounded-xl bg-[#EBF7FF] border border-[#1B6FAE]/20 text-xs text-[#24364B] space-y-1">
        <div className="font-bold text-[#062846] text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Ringkasan Kebutuhan:</span>
          <span className="text-[10px] text-[#1B6FAE] font-semibold">SBU Compliant</span>
        </div>
        <p className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B6FAE]"></span>
          {roomsCount} Kamar ({selectedHotel.name})
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B6FAE]"></span>
          {Object.entries(vehicles)
            .filter(([_, v]) => v.selected)
            .map(([_, v]) => `${v.quantity} ${v.name}`)
            .join(' & ') || 'Belum memilih armada penjemputan'}
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B6FAE]"></span>
          {nightsCount} Malam Kunjungan Dinas ({delegatesCount} Orang)
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleGenerate}
        id="configurator-generate-btn"
        className="mt-4 w-full py-3 px-4 rounded-xl bg-[#062846] hover:bg-[#16324E] active:bg-[#062846] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md"
      >
        <span>Generate Visit Plan &amp; Quotation</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="mt-2 text-[10px] text-[#66788A] text-center">
        *Proposal koordinasi resmi diterbitkan tanpa friksi biaya awal.
      </p>
    </div>
  );
};
