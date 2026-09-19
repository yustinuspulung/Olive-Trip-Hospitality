import React, { useState } from 'react';
import { VEHICLES } from '../data/vehicles';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle } from '../types';
import { 
  Car, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  FileText, 
  X,
  ArrowRight
} from 'lucide-react';

interface TransportPageProps {
  onSelectVehicleForRequest: (vehicle: Vehicle) => void;
  onNavigateHome: () => void;
}

export const TransportPage: React.FC<TransportPageProps> = ({
  onSelectVehicleForRequest,
  onNavigateHome
}) => {
  const [selectedModalVehicle, setSelectedModalVehicle] = useState<Vehicle | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7FF] text-[#1B6FAE] text-xs font-bold uppercase tracking-wider">
              <Car className="w-4 h-4" />
              Standardized Fleet Catalog
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062846]">
              Armada &amp; Mobilitas Eksekutif Jakarta
            </h1>
            <p className="text-xs sm:text-sm text-[#66788A] max-w-2xl leading-relaxed">
              Layanan transportasi penjemputan Bandara Soekarno-Hatta (CGK) dan Halim Perdanakusuma (HLP) serta mobilisasi dinas delegasi dengan armada terawat dan sopir berseragam resmi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] text-center">
              <div className="text-2xl font-black text-[#062846]">6</div>
              <div className="text-[11px] text-[#66788A]">Kelas Armada</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] text-center">
              <div className="text-2xl font-black text-emerald-600">100%</div>
              <div className="text-[11px] text-[#66788A]">All-In Operasional</div>
            </div>
          </div>
        </div>

        {/* 4 SLA Key Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Driver Berbusana Batik / Jas',
              desc: 'Pengemudi bersertifikasi, sopan, memahami etika protokoler kenegaraan.',
              icon: ShieldCheck,
              color: 'text-[#1B6FAE]'
            },
            {
              title: 'Paging Board Kedatangan',
              desc: 'Penjemputan resmi membawa papan nama delegasi di Terminal 1, 2, atau 3 CGK / HLP.',
              icon: Users,
              color: 'text-amber-500'
            },
            {
              title: 'Paket All-In Bebas Pusing',
              desc: 'Termasuk BBM, Tol Lingkar Luar & Tol Bandara, serta biaya parkir terminal.',
              icon: Clock,
              color: 'text-emerald-500'
            },
            {
              title: 'Executive Amenities',
              desc: 'Air mineral botol steril, permen, tisu basah, dan charger port selalu tersedia di armada.',
              icon: Sparkles,
              color: 'text-purple-500'
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#F8FBFE] border border-[#DCE5ED] flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#062846]">{item.title}</h4>
                <p className="text-[11px] text-[#66788A] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 6 Vehicle Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#062846]">Pilihan Kelas Kendaraan Resmi</h3>
            <span className="text-xs text-[#66788A]">Klik armada untuk melihat spesifikasi detail &amp; kapasitas</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VEHICLES.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={(v) => onSelectVehicleForRequest(v)}
                onViewDetails={(v) => setSelectedModalVehicle(v)}
              />
            ))}
          </div>
        </div>

        {/* Capacity Matrix & Luggage Guide */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
            <div>
              <h3 className="font-bold text-base text-[#062846]">
                Panduan Kapasitas Delegasi &amp; Bagasi Koper
              </h3>
              <p className="text-xs text-[#66788A] mt-0.5">
                Pastikan kenyamanan delegasi Anda dengan memilih armada yang sesuai dengan estimasi bagasi penerbangan:
              </p>
            </div>
            <span className="text-xs font-bold text-[#1B6FAE] bg-[#EBF7FF] px-3 py-1 rounded-md border border-[#1B6FAE]/20">
              SOP Protokoler
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-[#24364B]">
              <thead className="text-[11px] uppercase bg-[#F8FBFE] text-[#66788A] border-b border-[#DCE5ED]">
                <tr>
                  <th className="py-3 px-4">Kelas Kendaraan</th>
                  <th className="py-3 px-4">Model Representatif</th>
                  <th className="py-3 px-4">Kapasitas Kursi</th>
                  <th className="py-3 px-4">Kapasitas Koper Sedang</th>
                  <th className="py-3 px-4">Peruntukan Delegasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">Sedan Executive</td>
                  <td className="py-3 px-4">Toyota Camry / Altis</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">4 Orang</td>
                  <td className="py-3 px-4">2 Koper (Trunk)</td>
                  <td className="py-3 px-4 text-[#66788A]">Menteri / Eselon I / Direktur Utama</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">SUV Executive</td>
                  <td className="py-3 px-4">Toyota Fortuner / Innova Zenix</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">6 Orang</td>
                  <td className="py-3 px-4">4 Koper</td>
                  <td className="py-3 px-4 text-[#66788A]">Pimpinan Tim / Eselon II / Asistensi VIP</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">Hiace Commuter / Premio</td>
                  <td className="py-3 px-4">Toyota Hiace Premio Luxury</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">15 Orang</td>
                  <td className="py-3 px-4">8 Koper</td>
                  <td className="py-3 px-4 text-[#66788A]">Rombongan Anggota Dewan / Tim Dinas DPD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">Mini Bus Executive</td>
                  <td className="py-3 px-4">Isuzu Elf Long Microbus</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">20 Orang</td>
                  <td className="py-3 px-4">12 Koper</td>
                  <td className="py-3 px-4 text-[#66788A]">Delegasi Komisi / Kelompok Kerja Staf</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">Medium Bus Executive</td>
                  <td className="py-3 px-4">Hino / Mercedes-Benz 29-31 Seats</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">25 Orang</td>
                  <td className="py-3 px-4">18 Koper (Bagasi Bawah)</td>
                  <td className="py-3 px-4 text-[#66788A]">Rombongan Organisasi Perangkat Daerah (OPD)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#062846]">Big Bus Executive</td>
                  <td className="py-3 px-4">Mercedes-Benz / Scania 45-50 Seats</td>
                  <td className="py-3 px-4 text-[#1B6FAE] font-bold">40 Orang</td>
                  <td className="py-3 px-4">30 Koper (Bagasi Luas)</td>
                  <td className="py-3 px-4 text-[#66788A]">Kontingen Akbar / Peserta Konferensi Nasional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Vehicle Specification Modal */}
      {selectedModalVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-[16/9] bg-white p-4 border-b border-[#DCE5ED] flex items-center justify-center">
              <img
                src={selectedModalVehicle.imageUrl}
                alt={selectedModalVehicle.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setSelectedModalVehicle(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#1B6FAE] uppercase tracking-wider">
                    {selectedModalVehicle.categoryName} Class
                  </span>
                  <h3 className="text-xl font-extrabold text-[#062846]">
                    {selectedModalVehicle.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EBF7FF] text-[#062846] border border-[#1B6FAE]/30">
                    {selectedModalVehicle.capacityPax} Penumpang
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#66788A] leading-relaxed">
                {selectedModalVehicle.description}
              </p>

              {/* SLA List */}
              <div className="p-4 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-2">
                <div className="font-bold text-xs text-[#062846]">Standar Layanan Operasional (SLA):</div>
                {selectedModalVehicle.sla.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#24364B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1B6FAE] shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedModalVehicle(null)}
                  className="px-4 py-2.5 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A] hover:bg-slate-50"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const v = selectedModalVehicle;
                    setSelectedModalVehicle(null);
                    onSelectVehicleForRequest(v);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#062846] hover:bg-[#16324E] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4 text-[#E7B84B]" />
                  <span>Pilih Armada Ini untuk Quotation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
