import React from 'react';
import { 
  Shield, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Building2, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gradient-to-b from-[#041A2F] via-[#062846] to-[#031527] text-white border-t border-[#13385B] relative overflow-hidden font-sans no-print">
      {/* Top Metallic Gold/Blue Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1B6FAE] via-[#E7B84B] to-[#1DB954]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1 (Span 4): Brand Info, Office Address & Legal Compliance */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-1 shadow-md border border-white/20 flex items-center justify-center shrink-0">
                <img 
                  src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1789747795/2_g29rak.svg"
                  alt="Olive Trip & Hospitality Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight block">
                  Olive Trip &amp; Hospitality
                </span>
                <p className="text-[11px] text-slate-300 font-medium">
                  Accommodation &amp; Mobility Solutions for Jakarta Executive Visits
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Platform koordinasi akomodasi hotel bintang dan transportasi penjemputan bandara untuk delegasi pemerintahan (B2G) dan korporasi (B2B). Mengutamakan kepatuhan Standar Biaya Masukan (SBU), ketepatan protokol, serta kenyamanan kunjungan dinas di Jabodetabek.
            </p>

            {/* Office Address Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-200">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#E7B84B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold text-[11px] uppercase tracking-wider">Kantor Operasional Pusat:</strong>
                  <span className="text-slate-300 text-[11px] leading-snug block mt-0.5">
                    Jl. Taman Malaka Selatan Blok K1 No.11-12, Pondok Kelapa, DKI Jakarta 13450
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#E7B84B] font-medium">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Bebas Friksi Transaksi • Dokumen Penawaran Resmi B2G/B2B</span>
            </div>
          </div>

          {/* Col 2 (Span 3): Navigasi Layanan Utama */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#E7B84B] uppercase tracking-widest flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#1B6FAE]" />
              <span>Navigasi Portal</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('/')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> Home Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/hotels')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> Pilihan 15 Hotel Partner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/transport')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> 6 Pilihan Armada Penjemputan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/request/new')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> Request Quotation Builder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/dashboard')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> Workspace PIC (My Requests)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/concierge')} 
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5 text-slate-300"
                >
                  <span className="text-slate-500">›</span> Executive Concierge Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (Span 2.5): Kepatuhan B2G & B2B */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#E7B84B] uppercase tracking-widest flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kepatuhan B2G &amp; B2B</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SBU Kemenkeu Verified</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SOP Driver Jas / Batik</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Paging Board Kedatangan</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>SPK &amp; Faktur Pajak Resmi</span>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('/admin')} 
                  className="text-[#E7B84B] hover:text-white transition-colors font-bold text-xs inline-flex items-center gap-1.5 bg-white/5 border border-[#E7B84B]/40 px-3 py-1.5 rounded-lg"
                >
                  <span>Admin Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (Span 3): Hotline Operasional & Kontak */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#E7B84B] uppercase tracking-widest flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#1DB954]" />
              <span>Dukungan Operasional</span>
            </h4>

            <div className="space-y-3">
              <a 
                href="https://wa.me/6281288805482?text=Halo%20Admin%20Olive%20Trip%20%26%20Hospitality,%20saya%20ingin%20konsultasi%20layanan%20akomodasi%20%26%20mobilitas." 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#053B29] to-[#0A4D35] hover:from-[#084D36] hover:to-[#0E5E41] border border-emerald-500/40 transition-all shadow-md"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1DB954] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Hotline WA:</div>
                  <div className="text-sm text-white font-extrabold">0812-8880-5482</div>
                </div>
              </a>

              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#1B6FAE]" />
                  <a href="mailto:mgmtolive22@gmail.com" className="hover:text-white transition-colors">mgmtolive22@gmail.com</a>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>SLA Respons Direct Desk: &lt; 15 Menit</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Olive Trip &amp; Hospitality. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="hover:text-slate-300">Platform Koordinasi B2G &amp; B2B</span>
            <span>•</span>
            <span className="hover:text-slate-300">Non-OTA / Non-Marketplace</span>
            <span>•</span>
            <span className="hover:text-slate-300">DKI Jakarta, Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

