import React from 'react';
import { Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicle: Vehicle) => void;
  onViewDetails?: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect, onViewDetails }) => {
  return (
    <div 
      className="group bg-white rounded-xl border border-[#DCE5ED] hover:border-[#1B6FAE]/40 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden"
      id={`vehicle-card-${vehicle.slug}`}
    >
      {/* Vehicle image with Capacity badge */}
      <div className="relative aspect-[16/10] bg-white border-b border-[#F0F4F8] overflow-hidden flex items-center justify-center p-3">
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Capacity badge */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#062846] text-white text-xs font-extrabold shadow-sm">
          <Users className="w-3.5 h-3.5 text-[#E7B84B]" />
          <span>{vehicle.capacityPax} Orang</span>
        </div>

        {/* Luggage badge */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#24364B] text-[11px] font-semibold shadow-xs">
          <Briefcase className="w-3 h-3 text-[#1B6FAE]" />
          <span>{vehicle.capacityLuggage} Koper</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#1B6FAE] tracking-wide uppercase">
              {vehicle.categoryName} Class
            </span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
              SLA Terpadu
            </span>
          </div>

          <h4 className="font-bold text-base text-[#062846]">
            {vehicle.name}
          </h4>

          <p className="text-xs text-[#66788A] mt-1 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>

          <div className="mt-2.5 space-y-1">
            {vehicle.sla.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#24364B]">
                <CheckCircle2 className="w-3 h-3 text-[#1B6FAE] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#DCE5ED] flex items-center justify-between">
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(vehicle)}
              className="text-xs font-semibold text-[#66788A] hover:text-[#062846]"
            >
              Lihat Detail Armada
            </button>
          )}

          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(vehicle)}
              className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EBF7FF] hover:bg-[#1B6FAE] text-[#062846] hover:text-white text-xs font-bold transition-colors"
            >
              <span>Pilih Armada</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
