import React, { useState, useEffect } from 'react';
import { StorageService } from '../data/mockStorage';
import { HOTELS } from '../data/hotels';
import { VEHICLES } from '../data/vehicles';
import { ServiceRequest, Quote, AuditLog, RequestStatus } from '../types';
import { 
  Shield, 
  Building2, 
  Car, 
  FileText, 
  Bot, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Send, 
  RotateCcw,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface AdminPageProps {
  onNavigateHome: () => void;
  onViewQuote: (quoteId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome, onViewQuote }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'hotels' | 'vehicles' | 'ai' | 'logs'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiTask, setAiTask] = useState<'DRAFT_NOTE' | 'SUMMARIZE' | 'CUSTOM'>('DRAFT_NOTE');

  const refreshData = () => {
    setRequests(StorageService.getRequests());
    setQuotes(StorageService.getQuotes());
    setLogs(StorageService.getAuditLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdateStatus = (requestId: string, newStatus: RequestStatus) => {
    StorageService.updateRequestStatus(requestId, newStatus);
    refreshData();
  };

  const handleRunAiAssist = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResponse('');

    try {
      const res = await fetch('/api/gemini/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskType: aiTask,
          prompt: aiPrompt,
          context: {
            app: 'Olive Trip & Hospitality',
            role: 'Operations Desk Jakarta'
          }
        })
      });

      const data = await res.json();
      if (data.reply) {
        setAiResponse(data.reply);
      } else {
        setAiResponse('Gagal mendapatkan respons AI. Mohon periksa koneksi server.');
      }
    } catch (err: any) {
      setAiResponse(`Error: ${err.message || 'Tidak dapat menghubungi server API'}`);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFE] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66788A] hover:text-[#062846]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Publik</span>
          </button>

          <span className="text-xs font-bold text-[#062846] bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full">
            Operations &amp; Command Center
          </span>
        </div>

        {/* Header Title */}
        <div className="bg-[#062846] text-white p-6 sm:p-8 rounded-2xl border border-[#16324E] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E7B84B] text-xs font-bold uppercase">
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
              Operations Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Manajemen alur permohonan delegasi, katalog master 15 hotel partner, armada transportasi, asisten AI protokoler, dan audit log operasional.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refreshData}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#DCE5ED] bg-white rounded-xl shadow-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'requests', label: `Permohonan & Pipeline (${requests.length})`, icon: FileText },
            { id: 'hotels', label: `Master Hotel (${HOTELS.length})`, icon: Building2 },
            { id: 'vehicles', label: `Master Armada (${VEHICLES.length})`, icon: Car },
            { id: 'ai', label: 'AI Protocol Assistant (Gemini)', icon: Bot },
            { id: 'logs', label: `Audit Log (${logs.length})`, icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold shrink-0 border-b-2 transition-all ${
                  isActive
                    ? 'border-[#1B6FAE] text-[#062846] bg-[#F8FBFE]'
                    : 'border-transparent text-[#66788A] hover:text-[#062846]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#1B6FAE]' : 'text-[#66788A]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Requests & Quotes Pipeline */}
        {activeTab === 'requests' && (
          <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <h3 className="font-bold text-base text-[#062846]">Pipeline Permohonan Layanan</h3>
              <span className="text-xs text-[#66788A]">Klik tombol untuk memperbarui status operasional</span>
            </div>

            {requests.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#66788A]">
                Belum ada permohonan yang tercatat.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {requests.map((req) => {
                  const quote = quotes.find((q) => q.requestId === req.id);
                  return (
                    <div key={req.id} className="py-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-[#062846]">{req.organization}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF7FF] text-[#1B6FAE]">
                              {req.delegationType}
                            </span>
                          </div>
                          <p className="text-xs text-[#66788A]">
                            PIC: {req.picName} ({req.picTitle}) • WhatsApp: {req.picPhone}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-[#062846] border border-[#DCE5ED]">
                            Status: {req.status}
                          </span>
                          {quote && (
                            <button
                              onClick={() => onViewQuote(quote.id)}
                              className="text-xs font-bold text-[#1B6FAE] hover:underline"
                            >
                              Proposal ({quote.proposalNumber})
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-[#24364B] bg-[#F8FBFE] p-3 rounded-lg border border-[#DCE5ED] flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <strong>{req.hotelName}</strong> • {req.roomQuantity} Kamar ({req.checkInDate} s/d {req.checkOutDate})
                        </div>
                        {req.transportIncluded && (
                          <div className="text-[#1B6FAE] font-medium">
                            Armada: {req.selectedVehicles?.map((v: any) => `${v.quantity}x ${v.vehicleName}`).join(', ') || 'Sesuai Request'}
                          </div>
                        )}
                      </div>

                      {/* Status Update Quick Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] text-[#66788A] mr-1">Ubah Status:</span>
                        {(['IN_REVIEW', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as RequestStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(req.id, st)}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-md border transition-all ${
                              req.status === st
                                ? 'bg-[#062846] text-white border-[#062846]'
                                : 'bg-white text-[#24364B] border-[#DCE5ED] hover:bg-slate-50'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Master Hotels */}
        {activeTab === 'hotels' && (
          <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <h3 className="font-bold text-base text-[#062846]">15 Master Hotel Partner Terverifikasi</h3>
              <span className="text-xs text-[#66788A]">Verifikasi koordinat, bintang, dan URL kanonikal resmi</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8FBFE] text-[11px] uppercase text-[#66788A] border-b border-[#DCE5ED]">
                  <tr>
                    <th className="py-2.5 px-3">Hotel &amp; Area</th>
                    <th className="py-2.5 px-3">Bintang</th>
                    <th className="py-2.5 px-3">Koordinat (Lat, Lng)</th>
                    <th className="py-2.5 px-3">Akses POI Sekitar</th>
                    <th className="py-2.5 px-3">Website Resmi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {HOTELS.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-[#062846]">{h.name}</div>
                        <div className="text-[11px] text-[#66788A]">{h.area}, {h.cityZone}</div>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-amber-600">
                        ★ {h.stars} Bintang
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-[#66788A]">
                        {h.lat.toFixed(4)}, {h.lng.toFixed(4)}
                      </td>
                      <td className="py-2.5 px-3 text-[#1B6FAE] font-bold">
                        {h.nearbyPlaces.length} Titik (6 Kategori)
                      </td>
                      <td className="py-2.5 px-3">
                        <a
                          href={h.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#1B6FAE] hover:underline"
                        >
                          <span>Kunjungi</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Master Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <h3 className="font-bold text-base text-[#062846]">6 Master Kelas Armada Transportasi</h3>
              <span className="text-xs text-[#66788A]">SLA protokoler dan kapasitas kursi/bagasi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VEHICLES.map((v) => (
                <div key={v.id} className="p-4 rounded-xl border border-[#DCE5ED] bg-[#F8FBFE] space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={v.imageUrl} alt={v.name} className="w-16 h-12 rounded-lg object-contain bg-white p-0.5 border border-[#DCE5ED]" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-[10px] font-bold text-[#1B6FAE] uppercase">{v.categoryName}</span>
                      <h4 className="font-bold text-xs text-[#062846]">{v.name}</h4>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#66788A]">
                    Kapasitas: <strong className="text-[#062846]">{v.capacityPax} Kursi</strong> • Bagasi: <strong className="text-[#062846]">{v.capacityLuggage} Koper</strong>
                  </div>
                  <div className="text-[11px] text-[#24364B] line-clamp-2">
                    {v.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Gemini AI Protocol Assistant */}
        {activeTab === 'ai' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#DCE5ED]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7FF] text-[#1B6FAE] text-xs font-bold uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#E7B84B]" />
                  Gemini Server-Side Intelligence
                </div>
                <h3 className="font-extrabold text-lg text-[#062846]">
                  AI Protocol &amp; Hospitality Assistant
                </h3>
                <p className="text-xs text-[#66788A] mt-0.5">
                  Membantu tim operasional menyusun catatan keprotokolan resmi, ringkasan logistik delegasi, serta konsultasi kesesuaian fasilitas dinas. (Diproses aman via server.ts tanpa data finansial).
                </p>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                Non-Pricing Enforced
              </span>
            </div>

            {/* Quick Task Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'DRAFT_NOTE', label: 'Draft Catatan Koordinasi PIC', defaultPrompt: 'Susun draf catatan koordinasi penjemputan Bandara CGK dan akomodasi di Hotel JS Luwansa untuk rombongan 12 orang komisi dinas.' },
                { id: 'SUMMARIZE', label: 'Ringkas Kebutuhan Rombongan', defaultPrompt: 'Ringkas kebutuhan logistik delegasi kementerian yang membutuhkan 8 kamar dan 2 unit Hiace selama 3 hari kunker di Jakarta.' },
                { id: 'CUSTOM', label: 'Konsultasi Protokol Bebas', defaultPrompt: 'Bagaimana etika penjemputan protokoler pejabat setingkat Eselon I dengan iring-iringan di wilayah Jakarta?' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setAiTask(t.id as any);
                    setAiPrompt(t.defaultPrompt);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    aiTask === t.id
                      ? 'bg-[#062846] text-white border-[#062846]'
                      : 'bg-[#F8FBFE] text-[#24364B] border-[#DCE5ED] hover:bg-slate-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#24364B] block">
                Instruksi Kerja AI:
              </label>
              <textarea
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Tulis instruksi protokoler atau asistensi penyusunan dokumen penawaran..."
                className="w-full text-xs sm:text-sm bg-[#F8FBFE] border border-[#DCE5ED] rounded-xl p-3 text-[#24364B] focus:outline-none focus:border-[#1B6FAE]"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleRunAiAssist}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#062846] hover:bg-[#16324E] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin text-[#E7B84B]" />
                      <span>Sedang Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#E7B84B]" />
                      <span>Jalankan Asistensi Gemini</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Response Display Box */}
            {aiResponse && (
              <div className="p-5 rounded-xl bg-[#F8FBFE] border border-[#DCE5ED] space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-xs font-bold text-[#062846]">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#1B6FAE]" />
                    Hasil Asistensi Protokoler:
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(aiResponse)}
                    className="text-[11px] text-[#1B6FAE] hover:underline"
                  >
                    Salin Teks
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-[#24364B] whitespace-pre-line leading-relaxed">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Audit Logs */}
        {activeTab === 'logs' && (
          <div className="bg-white p-6 rounded-2xl border border-[#DCE5ED] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <h3 className="font-bold text-base text-[#062846]">Log Aktivitas &amp; Audit Trail</h3>
              <span className="text-xs text-[#66788A]">Merekam seluruh pembuatan request, revisi, dan perubahan status</span>
            </div>

            {logs.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#66788A]">
                Belum ada log tercatat.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 font-mono text-xs">
                {logs.map((log) => (
                  <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[#66788A] mr-2">[{log.timestamp}]</span>
                      <strong className="text-[#062846]">{log.action}:</strong>{' '}
                      <span className="text-[#24364B]">{log.details}</span>
                    </div>
                    <span className="text-[10px] text-[#1B6FAE] bg-slate-50 px-2 py-0.5 rounded shrink-0">
                      by {log.actor}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
