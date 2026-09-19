import React from 'react';
import { Shield, PhoneCall, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#062846] text-white border-t border-[#16324E] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16324E] to-[#1B6FAE] flex items-center justify-center text-white border border-white/20">
                <svg className="w-5 h-5 text-[#E7B84B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Olive Trip &amp; Hospitality
                </span>
                <p className="text-xs text-slate-300">
                  Accommodation &amp; Mobility Solutions for Jakarta Executive Visits
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Platform koordinasi akomodasi hotel bintang dan transportasi penjemputan bandara untuk delegasi pemerintahan (B2G) dan korporasi (B2B). Mengutamakan kepatuhan Standar Biaya Masukan (SBU), ketepatan protokol, serta kenyamanan kunjungan dinas di wilayah Jakarta dan sekitarnya.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#E7B84B]">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Bebas Friksi Transaksi Finansial • Dokumen Penawaran Resmi (Non-Pricing)</span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigasi Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/hotels')} className="hover:text-white transition-colors">
                  Pilihan 15 Hotel Partner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/transport')} className="hover:text-white transition-colors">
                  6 Pilihan Armada Bandara
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/request/new')} className="hover:text-white transition-colors">
                  Request Quotation Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard')} className="hover:text-white transition-colors">
                  My Requests (Workspace PIC)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/concierge')} className="hover:text-white transition-colors">
                  Executive Concierge Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kebijakan & Sumber */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Kepatuhan &amp; Sumber
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <span className="text-slate-400">Canonical Hotel URLs</span>
              </li>
              <li>
                <span className="text-slate-400">Google Places API Verified</span>
              </li>
              <li>
                <span className="text-slate-400">SOP Driver Jas / Batik</span>
              </li>
              <li>
                <span className="text-slate-400">Paging Board Kedatangan</span>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="text-[#E7B84B] hover:underline font-semibold flex items-center gap-1">
                  <span>Admin &amp; Operations Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hubungi Kami */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Dukungan Operasional
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <a 
                href="https://wa.me/6281288805482" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-emerald-400 font-semibold"
              >
                <PhoneCall className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-300">Hotline Operasional WhatsApp:</div>
                  <div className="text-xs text-white font-bold">+62 812-8880-5482</div>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-[#1B6FAE]" />
                <span>halo@olivetrip.id</span>
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                Layanan koordinasi 24 jam untuk delegasi kementerian &amp; korporasi di wilayah Jabodetabek.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Olive Trip &amp; Hospitality. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Platform Koordinasi B2G/B2B</span>
            <span>•</span>
            <span>Non-OTA / Non-Marketplace</span>
            <span>•</span>
            <span>DKI Jakarta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
