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
      {/* Top utility bar with continuous right-to-left marquee animation */}
      <div className="bg-[#062846] text-white text-xs py-1.5 relative overflow-hidden select-none border-b border-[#0B3A64]">
        {/* Left & Right Edge Gradient Fades for Smooth Enter/Exit */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#062846] to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#062846] to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Continuous Auto-Moving Track (Right to Left) */}
        <div className="animate-topbar-marquee flex items-center">
          {[1, 2, 3, 4].map((repeatKey) => (
            <div key={repeatKey} className="flex items-center gap-6 shrink-0 px-4 text-[#DCE5ED]">
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#E7B84B]" />
                Platform Koordinasi Akomodasi dan Transportasi B2G &amp; B2B Jabodetabek
              </span>
              <span className="text-[#1B5280] font-bold">•</span>
              <span className="text-[#E7B84B] font-semibold">Standar Biaya Masukan (SBU) &amp; SOP Protokoler</span>
              <span className="text-[#1B5280] font-bold">•</span>
              <span className="text-slate-300">Comfortable Stay</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Safe Journey</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Productive Visit</span>
              <span className="text-[#1B5280] font-bold mr-2">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Title Container */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none min-w-0 shrink"
            onClick={() => handleNavClick('/')}
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-white shadow-sm border border-[#DCE5ED] p-0.5 group-hover:scale-105 transition-all flex items-center justify-center shrink-0">
              <img 
                src="https://res.cloudinary.com/oi9u7lsq/image/upload/v1789747795/2_g29rak.svg"
                alt="Olive Trip & Hospitality Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base sm:text-xl lg:text-2xl text-[#062846] tracking-tight leading-tight truncate">
                  Olive Trip &amp; Hospitality
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#66788A] font-medium tracking-wide truncate max-w-[200px] sm:max-w-none">
                Accommodation &amp; Mobility Solutions
              </p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
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

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('/concierge')}
              id="nav-concierge-btn"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#062846] bg-[#EBF7FF] hover:bg-[#d8efff] rounded-lg border border-[#1B6FAE]/30 transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1B6FAE]" />
              Executive Concierge Desk
            </button>

            <button
              onClick={() => handleNavClick('/request/new')}
              id="nav-request-quote-btn"
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#062846] hover:bg-[#16324E] active:bg-[#062846] rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer"
            >
              Request Quotation
            </button>
          </div>

          {/* Mobile Navigation Toggle & Quick CTA */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavClick('/request/new')}
              className="hidden xs:inline-flex sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#062846] hover:bg-[#16324E] rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#24364B] hover:text-[#062846] hover:bg-[#F8FBFE] active:bg-[#EBF7FF] rounded-lg border border-[#DCE5ED] shrink-0 cursor-pointer"
              aria-label="Toggle navigation"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE5ED] px-4 pt-3 pb-5 space-y-2.5 shadow-xl animate-fadeIn">
          <div className="text-[11px] font-bold text-[#66788A] uppercase tracking-wider px-3 pb-1 border-b border-[#DCE5ED]">
            Menu Navigasi
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-colors cursor-pointer ${
                    isActive ? 'bg-[#EBF7FF] text-[#062846] font-bold border-l-4 border-[#1B6FAE]' : 'text-[#24364B] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#1B6FAE]' : 'text-[#66788A]'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DCE5ED] space-y-2">
            <button
              onClick={() => handleNavClick('/concierge')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-[#EBF7FF] text-[#062846] border border-[#1B6FAE]/30 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#1B6FAE]" />
              Executive Concierge Desk
            </button>

            <button
              onClick={() => handleNavClick('/request/new')}
              className="w-full py-3.5 rounded-xl text-sm font-extrabold text-center text-white bg-[#062846] shadow-sm hover:bg-[#16324E] cursor-pointer"
            >
              Request Quotation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

