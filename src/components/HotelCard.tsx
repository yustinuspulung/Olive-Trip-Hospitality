import React from 'react';
import { Star, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  onQuickAdd?: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  return (
    <div 
      className="group bg-white rounded-xl border border-[#DCE5ED] hover:border-[#1B6FAE]/40 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
      id={`hotel-card-${hotel.slug}`}
    >
      {/* Hotel Image with 16:10 Aspect Ratio & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={hotel.coverImage}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        

        {/* City Zone Tag */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/95 text-[#062846] text-[10px] font-bold shadow-xs z-20">
          {hotel.cityZone}
        </div>

        {/* Simplified Hover Overlay - Direct Transparent Logo over Faint Photo Backdrop */}
        {hotel.logoUrl && (
          <div className="absolute inset-0 bg-[#062846]/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10 pointer-events-none">
            <img
              src={hotel.logoUrl}
              alt={`${hotel.name} logo`}
              className="max-h-20 sm:max-h-24 max-w-[85%] w-auto h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transform scale-95 group-hover:scale-100 transition-transform duration-300"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      {/* Hotel Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Stars & Area */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-0.5" title={`${hotel.stars} Bintang`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < hotel.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs text-[#66788A] truncate">
              <MapPin className="w-3 h-3 text-[#1B6FAE] shrink-0" />
              <span className="truncate">{hotel.area}</span>
            </span>
          </div>

          {/* Hotel Name */}
          <h4 
            onClick={() => onSelect(hotel)}
            className="font-bold text-base text-[#062846] group-hover:text-[#1B6FAE] transition-colors line-clamp-1 cursor-pointer"
          >
            {hotel.name}
          </h4>

          {/* Pitch Tagline */}
          <p className="text-xs text-[#66788A] line-clamp-2 mt-1 italic leading-relaxed">
            "{hotel.pitchTagline}"
          </p>

          {/* Facility Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.facilities.slice(0, 3).map((fac, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-[#F8FBFE] border border-[#DCE5ED] text-[#24364B] text-[10px] font-medium"
              >
                {fac}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-50 text-[#66788A] text-[10px]">
                +{hotel.facilities.length - 3} lagi
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#DCE5ED] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#1B6FAE]">
            {hotel.nearbyPlaces?.length || 6}+ Akses Sekitar
          </span>

          <button
            type="button"
            onClick={() => onSelect(hotel)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#062846] group-hover:text-[#1B6FAE] hover:underline"
          >
            <span>Lihat Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
