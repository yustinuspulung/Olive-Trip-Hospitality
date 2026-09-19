import React, { useState } from 'react';
import { StorageService } from '../data/mockStorage';
import { 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  Building2, 
  Car,
  Utensils
} from 'lucide-react';

interface ConciergePageProps {
  onNavigateHome: () => void;
}

export const ConciergePage: React.FC<ConciergePageProps> = ({ onNavigateHome }) => {
  const [requestType, setRequestType] = useState<string>('VIP_ESCORT');
  const [organization, setOrganization] = useState<string>('Badan Pemeriksa Keuangan / Komisi Yudisial');
  const [picName, setPicName] = useState<string>('Drs. Hendra Gunawan');
  const [picPhone, setPicPhone] = useState<string>('+62 812-8880-5482');
  const [description, setDescription] = useState<string>(
    'Permohonan asistensi penjemputan VIP Menteri & pengawalan protokoler dari Bandara Halim Perdanakusuma (HLP) menuju Hotel Indonesia Kempinski.'
  );
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.createConciergeRequest({
      organization,
      picName,
      phone: picPhone,
      travelDate: new Date().toISOString().split('T')[0],
      pickupLocation: 'Jakarta',
      destination: 'Jakarta VIP Area',
      passengerCount: 4,
      vehiclePreference: 'Executive Fleet',
      purpose: (requestType === 'VIP_ESCORT' ? 'Diplomatic / VIP Meeting' : 'Other') as any,
      notes: description
    });
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `*EXECUTIVE CONCIERGE REQUEST - OLIVE TRIP & HOSPITALITY*\n\n` +
    `Instansi: *${organization}*\n` +
    `PIC: *${picName}* (${picPhone})\n` +
    `Jenis Layanan: *${requestType}*\n` +
    `Uraian Kebutuhan:\n${description}\n\n` +
    `Mohon koordinasi segera dengan tim Concierge Desk Olive Trip Jakarta.`
  );

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7FF] text-[#1B6FAE] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E7B84B]" />
              Executive Concierge Desk
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062846]">
              Layanan Khusus Protokoler &amp; Delegasi VIP
            </h1>
            <p className="text-xs sm:text-sm text-[#66788A] max-w-2xl leading-relaxed">
              Dukungan asistensi khusus untuk kebutuhan penjemputan VIP tingkat tinggi, pengawalan protokoler, reservasi jamuan makan privat, serta asistensi darurat kunjungan dinas di Jakarta.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#062846] text-white text-center shrink-0">
            <div className="text-xs text-[#E7B84B] font-bold uppercase">Standby Operasional</div>
            <div className="text-xl font-black mt-0.5">24 Jam / 7 Hari</div>
            <div className="text-[11px] text-slate-300">Respon Cepat PIC</div>
          </div>
        </div>

        {/* 3 Pillars of Concierge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#EBF7FF] flex items-center justify-center text-[#1B6FAE]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#062846]">VIP Diplomatic &amp; Protokoler</h4>
            <p className="text-xs text-[#66788A]">
              Koordinasi jalur cepat bandara, asistensi ruang tunggu VVIP / VIP Lounge, dan pengawalan keprotokolan.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#EBF7FF] flex items-center justify-center text-[#1B6FAE]">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#062846]">Jamuan Makan Privat (Private Dining)</h4>
            <p className="text-xs text-[#66788A]">
              Reservasi ruang privat di restoran representatif di kawasan SCBD, Menteng, dan Kuningan untuk delegasi.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#EBF7FF] flex items-center justify-center text-[#1B6FAE]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-[#062846]">Asistensi Medis &amp; Logistik</h4>
            <p className="text-xs text-[#66788A]">
              Rujukan dokter dan rumah sakit darurat terdekat, kebutuhan perlengkapan khusus rapat, dan staf liaison.
            </p>
          </div>
        </div>

        {/* Form or Success State */}
        {submitted ? (
          <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-md text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#062846]">Permohonan Concierge Terkirim</h3>
            <p className="text-xs sm:text-sm text-[#66788A] max-w-md mx-auto">
              Tim Executive Desk Olive Trip &amp; Hospitality telah menerima permintaan Anda dan akan segera menghubungi PIC via WhatsApp.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href={`https://wa.me/6281288805482?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1DB954] text-white text-xs font-bold shadow-xs hover:bg-[#189d47]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Teruskan ke WhatsApp Hotline (+62 812-8880-5482)</span>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2.5 rounded-lg border border-[#DCE5ED] text-xs font-semibold text-[#24364B]"
              >
                Kirim Permohonan Lain
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6">
            <div className="border-b border-[#DCE5ED] pb-4">
              <h3 className="text-base font-bold text-[#062846]">Formulir Permohonan Layanan Khusus</h3>
              <p className="text-xs text-[#66788A] mt-0.5">
                Kirimkan uraian kebutuhan VIP Anda untuk mendapatkan asistensi langsung dari tim operasional.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Kategori Layanan Khusus *
                </label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2.5 text-[#24364B] font-semibold"
                >
                  <option value="VIP_ESCORT">Pengawalan &amp; Keprotokolan VIP / Diplomatik</option>
                  <option value="SPECIAL_TRANSPORT">Kebutuhan Armada Tambahan di Luar Jadwal</option>
                  <option value="MEETING_ROOM">Reservasi Ruang Rapat &amp; Ballroom Tambahan</option>
                  <option value="PRIVATE_DINING">Jamuan Makan Privat &amp; Reservasi Restoran</option>
                  <option value="MEDICAL_SUPPORT">Asistensi Medis Rujukan Rumah Sakit 24 Jam</option>
                  <option value="OTHER">Kebutuhan Operasional Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Nama Instansi / Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#24364B] block mb-1">
                    Nama Lengkap PIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Nomor WhatsApp PIC (Aktif) *
                </label>
                <input
                  type="text"
                  required
                  value={picPhone}
                  onChange={(e) => setPicPhone(e.target.value)}
                  className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg px-3 py-2 text-[#24364B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#24364B] block mb-1">
                  Uraian Detail Kebutuhan Khusus *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan tanggal, rute, jumlah pejabat VIP, dan instruksi khusus lainnya..."
                  className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg p-3 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#DCE5ED]">
                <a
                  href={`https://wa.me/6281288805482?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Atau langsung chat WhatsApp Panitia</span>
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Send className="w-4 h-4 text-[#E7B84B]" />
                  <span>Kirim ke Tim Concierge Desk</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
