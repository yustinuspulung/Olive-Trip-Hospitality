import React, { useState, useEffect } from 'react';
import { StorageService } from '../data/mockStorage';
import { ServiceRequest, RequestStatus } from '../types';
import { 
  FileText, 
  Building2, 
  Calendar, 
  Car, 
  PhoneCall, 
  Plus, 
  Clock, 
  CheckCircle2, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';

interface DashboardPageProps {
  onNewRequest: () => void;
  onViewQuote: (quoteId: string) => void;
  onNavigateHome: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNewRequest,
  onViewQuote,
  onNavigateHome
}) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    setRequests(StorageService.getRequests());
  }, []);

  const statuses = [
    { key: 'ALL', label: 'Semua Status' },
    { key: 'SUBMITTED', label: 'Terkirim' },
    { key: 'QUOTED', label: 'Proposal Terbit' },
    { key: 'APPROVED', label: 'Disetujui' },
    { key: 'REVISION_REQUESTED', label: 'Dalam Revisi' },
    { key: 'CONFIRMED', label: 'Terkonfirmasi' },
  ];

  const filteredRequests = requests.filter((r) => {
    if (statusFilter === 'ALL') return true;
    return r.status === statusFilter;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'QUOTED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'REVISION_REQUESTED':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'CONFIRMED':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B6FAE] uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              Workspace PIC &amp; Delegasi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062846]">
              My Requests &amp; Dokumen Proposal
            </h1>
            <p className="text-xs sm:text-sm text-[#66788A] mt-1">
              Pantau status permohonan koordinasi hotel dan armada bandara untuk rombongan kerja Anda.
            </p>
          </div>

          <button
            onClick={onNewRequest}
            id="dashboard-new-request-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white text-xs sm:text-sm font-bold shadow-sm transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4 text-[#E7B84B]" />
            <span>Buat Request Baru</span>
          </button>
        </div>

        {/* Status Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {statuses.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStatusFilter(s.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                statusFilter === s.key
                  ? 'bg-[#062846] text-white shadow-xs'
                  : 'bg-white text-[#66788A] border border-[#DCE5ED] hover:bg-slate-50'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-[#DCE5ED] space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-base text-[#062846]">Belum ada permohonan koordinasi.</h4>
            <p className="text-xs text-[#66788A] max-w-sm mx-auto">
              Silakan buat request akomodasi atau transportasi baru untuk menerbitkan surat penawaran resmi pertama Anda.
            </p>
            <button
              onClick={onNewRequest}
              className="px-5 py-2.5 rounded-lg bg-[#062846] text-white text-xs font-bold hover:bg-[#16324E] transition-colors"
            >
              Buat Request Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => {
              const quote = StorageService.getQuotesByRequestId(req.id)[0];
              return (
                <div
                  key={req.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DCE5ED] hover:border-[#1B6FAE]/40 shadow-xs transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#062846]">{req.organization}</span>
                        <span className="text-[10px] text-[#66788A] bg-slate-100 px-2 py-0.5 rounded">
                          {req.delegationType === 'B2G_GOVERNMENT' ? 'B2G Government' : 'B2B Corporate'}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#062846] mt-0.5">
                        {req.eventReference}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(req.status)}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#24364B]">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-[#1B6FAE] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#062846]">{req.hotelName}</div>
                        <div className="text-[#66788A] text-[11px]">
                          {req.roomQuantity} Kamar ({req.roomType}) • {req.nightsCount} Malam
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#1B6FAE] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#062846]">
                          {req.checkInDate} s/d {req.checkOutDate}
                        </div>
                        <div className="text-[#66788A] text-[11px]">
                          PIC: {req.picName} ({req.picPhone})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Car className="w-4 h-4 text-[#1B6FAE] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-[#062846]">
                          {req.transportIncluded ? 'Transportasi Terjadwal' : 'Tanpa Transportasi'}
                        </div>
                        <div className="text-[#66788A] text-[11px]">
                          {req.selectedVehicles?.map((v: any) => `${v.quantity}x ${v.vehicleName}`).join(', ') || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer actions on card */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-[#66788A]">
                      ID Permohonan: <code className="font-mono text-[#062846]">{req.id}</code>
                    </span>

                    <div className="flex items-center gap-2">
                      {quote && (
                        <button
                          onClick={() => onViewQuote(quote.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#062846] hover:bg-[#16324E] text-white text-xs font-bold transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#E7B84B]" />
                          <span>Buka Proposal ({quote.proposalNumber})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <a
                        href={`https://wa.me/6281288805482?text=Halo%20Olive%20Trip,%20saya%20PIC%20${encodeURIComponent(req.organization || req.client?.organization || '')}%20ingin%20cek%20status%20request%20${req.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#DCE5ED] bg-white hover:bg-slate-50 text-emerald-600 text-xs font-bold transition-colors"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Chat Panitia</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
