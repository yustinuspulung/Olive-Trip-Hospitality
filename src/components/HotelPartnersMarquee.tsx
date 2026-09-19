import React, { useState } from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { HOTEL_PARTNERS } from '../data/hotelPartners';
import { HotelPartner } from '../types';

interface HotelPartnersMarqueeProps {
  onSelectHotelBySlug?: (slug: string) => void;
}

export const HotelPartnersMarquee: React.FC<HotelPartnersMarqueeProps> = ({ onSelectHotelBySlug }) => {
  const [activePartnerHover, setActivePartnerHover] = useState<number | null>(null);

  // We duplicate the list twice to create a seamless infinite loop
  const marqueeList: HotelPartner[] = [...HOTEL_PARTNERS, ...HOTEL_PARTNERS];

  return (
    <section 
      id="hotel-partners-section" 
      aria-label="Hotel Partners"
      className="py-10 bg-gradient-to-b from-[#F8FBFE] via-[#FFFFFF] to-[#FFFFFF] border-b border-[#DCE5ED] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FA] border border-[#D0E2F2] text-[#1B6FAE] text-xs font-bold tracking-wide uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B6FAE]" />
            <span>Official Hospitality Network</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#062846] tracking-tight">
            Hotel Partners Resmi
          </h2>
          
          <p className="text-xs sm:text-sm text-[#66788A] mt-1 max-w-2xl">
            Bekerja sama langsung dengan 15 jaringan hotel bintang 4 &amp; 5 terkemuka di Jakarta, Bekasi, dan BSD Serpong untuk penugasan delegasi Government (B2G) dan Corporate (B2B).
          </p>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div 
        className="relative w-full overflow-hidden pt-4 pb-14 sm:pt-6 sm:pb-16"
        onMouseEnter={() => setActivePartnerHover(-1)}
        onMouseLeave={() => setActivePartnerHover(null)}
      >
        {/* Left Edge Gradient Fade */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />
        
        {/* Right Edge Gradient Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent z-10 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Continuous Auto-Moving Track (Right to Left) */}
        <div 
          className="animate-marquee-track flex items-center gap-4 sm:gap-6 px-4"
        >
          {marqueeList.map((partner, index) => {
            const isHovered = activePartnerHover === index;

            return (
              <div
                key={`${partner.id}-${index}`}
                className="relative group shrink-0"
                onMouseEnter={() => setActivePartnerHover(index)}
                onMouseLeave={() => setActivePartnerHover(null)}
              >
                <div 
                  className={`w-36 h-36 sm:w-44 sm:h-44 aspect-square rounded-2xl bg-white border p-4 sm:p-6 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs ${
                    isHovered 
                      ? 'border-[#1B6FAE] shadow-lg -translate-y-1.5 ring-2 ring-[#1B6FAE]/20' 
                      : 'border-[#E2E8F0] hover:border-[#1B6FAE]/50 hover:shadow-md'
                  }`}
                  onClick={() => {
                    if (onSelectHotelBySlug) {
                      onSelectHotelBySlug(partner.slug);
                    } else {
                      window.open(partner.website, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(partner.website, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  title={`${partner.name} - Klik untuk buka website`}
                >
                  {/* Partner Logo Only - Square Box, Large & High Legibility */}
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-24 sm:max-h-28 max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-110 filter drop-shadow-2xs"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Floating Quick Action Overlay on Hover (Properly Spaced & Not Cut Off) */}
                {isHovered && (
                  <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#062846] text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl border border-slate-700/60 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150 pointer-events-auto">
                    {/* Tooltip Arrow Pointer */}
                    <div 
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#062846] border-t border-l border-slate-700/60 rotate-45"
                      aria-hidden="true"
                    />

                    <span className="font-semibold text-slate-100 max-w-[220px] sm:max-w-xs truncate relative z-10">
                      {partner.name}
                    </span>

                    <span className="text-white/30 relative z-10">•</span>

                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#1B6FAE] hover:bg-[#155A8A] text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition-colors shadow-xs relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Web</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
