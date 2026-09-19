import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { HOTEL_PARTNERS } from '../data/hotelPartners';
import { HotelPartner } from '../types';

export const HotelPartnersMarquee: React.FC = () => {
  // Duplicate the list twice to create a seamless infinite loop
  const marqueeList: HotelPartner[] = [...HOTEL_PARTNERS, ...HOTEL_PARTNERS];

  return (
    <section 
      id="hotel-partners-section" 
      aria-label="Hotel Partners"
      className="py-8 bg-gradient-to-b from-[#F8FBFE] via-[#FFFFFF] to-[#FFFFFF] border-b border-[#DCE5ED] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FA] border border-[#D0E2F2] text-[#1B6FAE] text-xs font-bold tracking-wide uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1B6FAE]" />
            <span>Official Hospitality Network</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#062846] tracking-tight">
            Hotel Partners Resmi
          </h2>
          
          <p className="text-xs sm:text-sm text-[#66788A] mt-1 max-w-2xl">
            Bekerja sama langsung dengan jaringan hotel terkemuka di Jakarta, Bekasi, dan BSD Serpong untuk penugasan delegasi Government (B2G) dan Corporate (B2B).
          </p>
        </div>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden py-4 pointer-events-none select-none">
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
        <div className="animate-marquee-track flex items-center gap-4 sm:gap-6 px-4">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 aspect-square rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-6 flex items-center justify-center shadow-xs"
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-24 sm:max-h-28 max-w-full w-auto h-auto object-contain filter drop-shadow-2xs"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
