import React, { useState } from 'react';
import { StorageService } from '../data/mockStorage';
import { Quote, ServiceRequest } from '../types';
import { 
  Printer, 
  Share2, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  PhoneCall, 
  Building2, 
  Car, 
  ShieldCheck, 
  FileText, 
  ArrowLeft,
  X,
  Send,
  AlertCircle
} from 'lucide-react';

interface QuoteDetailPageProps {
  quoteId: string;
  onBack: () => void;
  onViewDashboard: () => void;
}

export const QuoteDetailPage: React.FC<QuoteDetailPageProps> = ({
  quoteId,
  onBack,
  onViewDashboard
}) => {
  const [quote, setQuote] = useState<Quote | undefined>(() => StorageService.getQuoteById(quoteId));
  const [request, setRequest] = useState<ServiceRequest | undefined>(() => {
    if (!quote) return undefined;
    return StorageService.getRequestById(quote.requestId);
  });

  // Revision modal state
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);

  if (!quote || !request) {
    return (
      <div className="min-h-screen bg-[#F8FBFE] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-[#DCE5ED] shadow-sm text-center max-w-md space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-[#062846]">Dokumen Proposal Tidak Ditemukan</h3>
          <p className="text-xs text-[#66788A]">
            ID Proposal atau Request tidak valid atau telah dihapus dari sesi lokal.
          </p>
          <button
            onClick={onViewDashboard}
            className="px-4 py-2 bg-[#062846] text-white text-xs font-bold rounded-lg"
          >
            Buka Workspace PIC
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    const updated = StorageService.updateQuoteStatus(quote.id, 'APPROVED');
    if (updated) {
      setQuote(updated);
      StorageService.updateRequestStatus(request.id, 'APPROVED');
      setApprovalModalOpen(false);
    }
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim()) return;

    const updated = StorageService.requestQuoteRevision(quote.id, revisionNotes);
    if (updated) {
      setQuote(updated);
      StorageService.updateRequestStatus(request.id, 'REVISION_REQUESTED');
      setRevisionModalOpen(false);
      setRevisionNotes('');
    }
  };

  const panitiaWhatsAppMessage = encodeURIComponent(
    `*KOP SURAT OLIVE TRIP & HOSPITALITY*\n` +
    `_Official B2B/B2G Service Coordination Proposal_\n\n` +
    `Nomor Proposal: *${quote.proposalNumber || quote.quoteNumber}* (v${(quote.version || quote.currentVersion || 1.0).toFixed(1)})\n` +
    `Instansi: *${request.organization || request.client?.organization}*\n` +
    `PIC: *${request.picName || request.client?.picName}* (${request.picTitle || request.client?.picTitle})\n` +
    `Hotel: *${quote.hotelSpec?.hotelName || request.hotelName || request.accommodation?.hotelName}* (${quote.hotelSpec?.roomQuantity || request.roomQuantity || 1} Kamar)\n` +
    (quote.transportSpec ? `Armada Bandara: *${quote.transportSpec.vehicles?.map((v) => `${v.quantity}x ${v.vehicleName}`).join(', ')}*\n` : '') +
    `Status Dokumen: *${quote.status}*\n\n` +
    `Mohon asistensi tim operasional Olive Trip & Hospitality untuk tindak lanjut keprotokolan.`
  );

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Control Bar (Hidden when Printing) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#DCE5ED] shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66788A] hover:text-[#062846]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={onViewDashboard}
              className="text-xs font-semibold text-[#1B6FAE] hover:underline"
            >
              Dashboard PIC
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-proposal-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE5ED] bg-white hover:bg-slate-50 text-[#062846] text-xs font-bold transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#1B6FAE]" />
              <span>Cetak / Simpan PDF (A4)</span>
            </button>

            <a
              href={`https://wa.me/6281288805482?text=${panitiaWhatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1DB954] hover:bg-[#189d47] text-white text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Kirim ke WhatsApp Panitia</span>
            </a>

            {quote.status !== 'APPROVED' && (
              <>
                <button
                  onClick={() => setRevisionModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ajukan Revisi</span>
                </button>

                <button
                  onClick={() => setApprovalModalOpen(true)}
                  id="approve-proposal-btn"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#062846] hover:bg-[#16324E] text-white text-xs font-extrabold transition-all shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E7B84B]" />
                  <span>Setujui Proposal</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL LETTERHEAD & PROPOSAL DOCUMENT (PRINTABLE A4 FORMAT) */}
        {/* ========================================================================= */}
        <div 
          id="official-proposal-document"
          className="print-page bg-white p-8 sm:p-12 rounded-2xl border border-[#DCE5ED] shadow-md space-y-6"
        >
          {/* Header Kop Surat */}
          <div className="border-b-2 border-[#062846] pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-white border border-[#DCE5ED] shadow-xs p-0.5 flex items-center justify-center shrink-0">
                  <img 
                    src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1789747795/2_g29rak.svg"
                    alt="Olive Trip & Hospitality Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#062846] tracking-tight uppercase">
                    Olive Trip &amp; Hospitality
                  </h2>
                  <p className="text-xs font-semibold text-[#1B6FAE]">
                    Accommodation &amp; Mobility Solutions for Jakarta Executive Visits
                  </p>
                  <p className="text-[11px] text-[#66788A] mt-0.5">
                    Jl. Gatot Subroto Kav. 52, Jakarta Selatan • Hotline: +62 812-8880-5482 • halo@olivetrip.id
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right shrink-0">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  quote.status === 'APPROVED' 
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : quote.status === 'REVISION_REQUESTED'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-300'
                }`}>
                  {quote.status}
                </div>
                <div className="text-[10px] text-[#66788A] mt-1">Versi Dokumen: v{(quote.version || quote.currentVersion || 1.0).toFixed(1)}</div>
              </div>
            </div>

            <div className="mt-5 text-center bg-[#F8FBFE] py-2 px-4 rounded-lg border border-[#DCE5ED]">
              <h3 className="text-sm font-extrabold text-[#062846] uppercase tracking-wider">
                Official B2B / B2G Service Coordination Proposal
              </h3>
              <p className="text-[11px] text-[#66788A]">
                Surat Pengajuan &amp; Konfirmasi Rencana Layanan Kunjungan Dinas Delegasi
              </p>
            </div>
          </div>

          {/* Proposal Meta Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FBFE] p-4 rounded-xl border border-[#DCE5ED] text-xs">
            <div>
              <span className="text-[10px] text-[#66788A] uppercase font-bold block">Nomor Registrasi:</span>
              <span className="font-mono font-bold text-[#062846]">{quote.proposalNumber || quote.quoteNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#66788A] uppercase font-bold block">Tanggal Terbit:</span>
              <span className="font-bold text-[#062846]">{quote.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#66788A] uppercase font-bold block">Masa Berlaku:</span>
              <span className="font-bold text-[#062846]">{quote.validUntil} (14 Hari)</span>
            </div>
            <div>
              <span className="text-[10px] text-[#66788A] uppercase font-bold block">Kategori Kepatuhan:</span>
              <span className="font-bold text-[#1B6FAE]">
                {(request.delegationType || request.client?.delegationType) === 'B2G_GOVERNMENT' ? 'B2G (Standar SBU)' : 'B2B (Corporate)'}
              </span>
            </div>
          </div>

          {/* Section A: Identitas Pemohon */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#062846] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <span>A. Identitas Instansi &amp; PIC Delegasi</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs text-[#24364B]">
              <div>
                <span className="text-[#66788A] block text-[11px]">Nama Instansi / Badan:</span>
                <span className="font-bold text-sm text-[#062846]">{request.organization || request.client?.organization}</span>
              </div>
              <div>
                <span className="text-[#66788A] block text-[11px]">Agenda Kunjungan Dinas:</span>
                <span className="font-semibold text-[#062846]">{request.eventReference || request.client?.referenceName}</span>
              </div>
              <div>
                <span className="text-[#66788A] block text-[11px]">Nama Lengkap PIC:</span>
                <span className="font-semibold text-[#062846]">{request.picName || request.client?.picName}</span> ({request.picTitle || request.client?.picTitle})
              </div>
              <div>
                <span className="text-[#66788A] block text-[11px]">Kontak WhatsApp PIC:</span>
                <span className="font-semibold text-[#062846]">{request.picPhone || request.client?.picPhone}</span> {(request.picEmail || request.client?.picEmail) && `• ${request.picEmail || request.client?.picEmail}`}
              </div>
            </div>
          </div>

          {/* Section B: Spesifikasi Akomodasi */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#062846] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Building2 className="w-4 h-4 text-[#1B6FAE]" />
              <span>B. Spesifikasi Hotel &amp; Alokasi Kamar</span>
            </h4>
            
            <div className="border border-[#DCE5ED] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8FBFE] text-[11px] text-[#66788A] border-b border-[#DCE5ED]">
                  <tr>
                    <th className="py-2.5 px-3">Nama Hotel Partner</th>
                    <th className="py-2.5 px-3">Tipe Kamar</th>
                    <th className="py-2.5 px-3 text-center">Jumlah Kamar</th>
                    <th className="py-2.5 px-3 text-center">Durasi Menginap</th>
                    <th className="py-2.5 px-3 text-center">Tamu Delegasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#062846]">
                      {quote.hotelSpec?.hotelName || request.hotelName || request.accommodation?.hotelName}
                    </td>
                    <td className="py-3 px-3 text-[#24364B]">
                      {quote.hotelSpec?.roomType || request.roomType || request.accommodation?.roomType || 'Standard'}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-[#062846]">
                      {quote.hotelSpec?.roomQuantity || request.roomQuantity || request.accommodation?.roomQuantity || 1} Kamar
                    </td>
                    <td className="py-3 px-3 text-center text-[#24364B]">
                      {quote.hotelSpec?.nightsCount || request.nightsCount || request.accommodation?.nights || 1} Malam ({request.checkInDate || request.accommodation?.checkInDate} s/d {request.checkOutDate || request.accommodation?.checkOutDate})
                    </td>
                    <td className="py-3 px-3 text-center text-[#24364B]">
                      {quote.hotelSpec?.guestCount || request.guestCount || request.accommodation?.guestQuantity || 1} Orang
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {quote.hotelSpec?.notes && (
              <p className="text-[11px] text-[#66788A] italic">
                *Permintaan Khusus: {quote.hotelSpec.notes}
              </p>
            )}
          </div>


          {/* Section C: Transportasi Bandara (All-In) */}
          {quote.transportSpec && (
            <div className="space-y-3">
              <h4 className="text-xs font-black text-[#062846] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
                <Car className="w-4 h-4 text-[#1B6FAE]" />
                <span>C. Spesifikasi Transportasi &amp; Mobilitas Bandara</span>
              </h4>

              <div className="border border-[#DCE5ED] rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F8FBFE] text-[11px] text-[#66788A] border-b border-[#DCE5ED]">
                    <tr>
                      <th className="py-2.5 px-3">Jenis Rute</th>
                      <th className="py-2.5 px-3">Bandara &amp; No. Flight</th>
                      <th className="py-2.5 px-3">Waktu Penjemputan</th>
                      <th className="py-2.5 px-3">Armada Ditugaskan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="py-3 px-3 font-bold text-[#062846]">
                        {quote.transportSpec.direction === 'ROUND_TRIP' ? 'Pulang-Pergi (PP)' : quote.transportSpec.direction}
                      </td>
                      <td className="py-3 px-3 text-[#24364B]">
                        {quote.transportSpec.airport} ({quote.transportSpec.flightNumber || 'Sesuai Jadwal'})
                      </td>
                      <td className="py-3 px-3 text-[#24364B]">
                        {quote.transportSpec.pickupDateTime ? quote.transportSpec.pickupDateTime.replace('T', ' ') : 'Standby 24 Jam'}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#1B6FAE]">
                        {quote.transportSpec.vehicles.map((v) => `${v.quantity}x ${v.vehicleName}`).join(', ')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SLA Highlights */}
              <div className="bg-[#F8FBFE] p-3 rounded-lg border border-[#DCE5ED] space-y-1 text-[11px]">
                <span className="font-bold text-[#062846] block">Standar Layanan Operasional (SLA):</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[#24364B]">
                  {quote.transportSpec.slaCommitment.map((sla, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#1B6FAE] shrink-0" />
                      <span>{sla}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section D: Ketentuan & Standar Legal */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-black text-[#062846] uppercase tracking-wider border-b border-slate-200 pb-1.5">
              D. Ketentuan &amp; Regulasi Layanan
            </h4>
            <ul className="space-y-1 text-[11px] text-[#66788A] list-disc list-inside leading-relaxed">
              {(quote.termsAndConditions || []).map((tc, idx) => (
                <li key={idx}>{tc}</li>
              ))}
              <li>Dokumen ini adalah Proposal Perencanaan Layanan Resmi tanpa penagihan langsung (Non-Pricing).</li>
            </ul>
          </div>

          {/* Signature / Validation Box */}
          <div className="pt-6 border-t border-[#DCE5ED] grid grid-cols-2 gap-6 text-xs text-center">
            <div className="space-y-12">
              <p className="text-[11px] text-[#66788A]">Dikoordinasikan Oleh,</p>
              <div>
                <p className="font-extrabold text-[#062846]">Olive Trip &amp; Hospitality</p>
                <p className="text-[10px] text-[#66788A]">Executive Desk Operations Jakarta</p>
              </div>
            </div>

            <div className="space-y-12">
              <p className="text-[11px] text-[#66788A]">Pemohon / PIC Delegasi,</p>
              <div>
                <p className="font-extrabold text-[#062846]">{request.picName || request.client?.picName}</p>
                <p className="text-[10px] text-[#66788A]">{request.organization || request.client?.organization}</p>
              </div>
            </div>
          </div>

          {/* Version History Log (Internal) */}
          {quote.revisionHistory && quote.revisionHistory.length > 0 && (
            <div className="no-print pt-6 border-t border-slate-100 text-[11px] text-[#66788A] space-y-1">
              <span className="font-bold text-[#062846]">Riwayat Catatan Revisi Proposal:</span>
              {quote.revisionHistory.map((h, i) => (
                <div key={i} className="p-2 rounded bg-slate-50 border border-[#DCE5ED]">
                  <strong>v{h.version.toFixed(1)}</strong> ({h.timestamp}): {h.changeSummary}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Revision Modal */}
      {revisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <h3 className="font-bold text-base text-[#062846]">Ajukan Perubahan / Catatan Revisi</h3>
              <button
                onClick={() => setRevisionModalOpen(false)}
                className="text-[#66788A] hover:text-[#062846]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestRevision} className="space-y-3">
              <p className="text-xs text-[#66788A]">
                Tuliskan perubahan jumlah kamar, armada, atau penyesuaian jadwal dinas. Versi proposal akan diperbarui ke v{((quote.version || quote.currentVersion || 1.0) + 0.1).toFixed(1)}.
              </p>

              <textarea
                required
                rows={4}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="Contoh: Mohon tambah 1 unit Hiace dan ubah tanggal check-in menjadi 24 September."
                className="w-full text-xs bg-[#F8FBFE] border border-[#DCE5ED] rounded-lg p-3 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRevisionModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#062846] text-white text-xs font-bold hover:bg-[#16324E]"
                >
                  Kirim Revisi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {approvalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-[#062846]">Konfirmasi Persetujuan Proposal</h3>
              <p className="text-xs text-[#66788A]">
                Anda akan menyetujui Proposal No. <strong>{quote.proposalNumber}</strong> untuk instansi <strong>{request.organization}</strong>.
              </p>
            </div>

            <div className="p-3 bg-[#F8FBFE] rounded-lg border border-[#DCE5ED] text-[11px] text-[#66788A] space-y-1">
              <p>• Tim operasional Olive Trip &amp; Hospitality akan mengunci alokasi kamar hotel dan jadwal armada bandara.</p>
              <p>• Tidak ada pembayaran online di sistem ini.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#DCE5ED] text-xs font-bold text-[#66788A]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Ya, Setujui Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
