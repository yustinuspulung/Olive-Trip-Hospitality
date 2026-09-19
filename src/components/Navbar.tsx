import React, { useState } from 'react';
import { Menu, X, Shield, PhoneCall, FileText, Building2, Car, Home } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Hotels', path: '/hotels', icon: Building2 },
    { label: 'Transport', path: '/transport', icon: Car },
    { label: 'My Requests', path: '/dashboard', icon: FileText },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DCE5ED] shadow-xs no-print">
      {/* Top utility bar */}
      <div className="bg-[#062846] text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#DCE5ED]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#E7B84B]" />
              Platform Koordinasi Resmi B2G & B2B Jabodetabek
            </span>
            <span className="text-[#66788A]">|</span>
            <span className="text-[#E7B84B] font-medium">Standar Biaya Masukan (SBU) & SOP Protokoler</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-300">Comfortable Stay</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Safe Journey</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Productive Visit</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => handleNavClick('/')}
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#062846] to-[#1B6FAE] flex items-center justify-center text-white shadow-sm border border-[#062846]/10 group-hover:scale-105 transition-transform">
              {/* Elegant olive leaf emblem */}
              <svg className="w-6 h-6 text-[#E7B84B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-[#062846] tracking-tight">
                  Olive Trip &amp; Hospitality
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#66788A] font-medium tracking-wide">
                Accommodation &amp; Mobility Solutions
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-[#062846] bg-[#F8FBFE] border-b-2 border-[#1B6FAE]'
                      : 'text-[#24364B] hover:text-[#062846] hover:bg-[#F8FBFE]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1B6FAE]' : 'text-[#66788A]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/concierge')}
              id="nav-concierge-btn"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#062846] bg-[#EBF7FF] hover:bg-[#d8efff] rounded-lg border border-[#1B6FAE]/30 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1B6FAE]" />
              Executive Concierge Desk
            </button>

            <button
              onClick={() => handleNavClick('/request/new')}
              id="nav-request-quote-btn"
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#062846] hover:bg-[#16324E] active:bg-[#062846] rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              Request Quotation
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/request/new')}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#062846] rounded-md"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#24364B] hover:text-[#062846] hover:bg-[#F8FBFE] rounded-lg border border-[#DCE5ED]"
              aria-label="Toggle navigation"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE5ED] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="text-xs font-semibold text-[#66788A] uppercase tracking-wider px-3 pb-1 border-b border-[#DCE5ED]">
            Menu Navigasi
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  isActive ? 'bg-[#EBF7FF] text-[#062846] font-bold' : 'text-[#24364B] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#1B6FAE]' : 'text-[#66788A]'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-[#DCE5ED] space-y-2">
            <button
              onClick={() => handleNavClick('/concierge')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#EBF7FF] text-[#062846] border border-[#1B6FAE]/30"
            >
              <PhoneCall className="w-4 h-4 text-[#1B6FAE]" />
              Executive Concierge Desk
            </button>

            <button
              onClick={() => handleNavClick('/request/new')}
              className="w-full py-3 rounded-lg text-sm font-bold text-center text-white bg-[#062846] shadow-sm"
            >
              Request Quotation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
