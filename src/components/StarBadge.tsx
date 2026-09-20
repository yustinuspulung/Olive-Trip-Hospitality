import React from 'react';
import { Star } from 'lucide-react';

interface StarBadgeProps {
  stars: number;
  starCategory?: string;
  slug?: string;
  name?: string;
  className?: string;
  starSize?: string; // e.g. "w-5.5 h-5.5" or "w-6 h-6"
  textSize?: string; // e.g. "text-xs" or "text-sm"
}

export const StarBadge: React.FC<StarBadgeProps> = ({
  stars,
  starCategory,
  slug,
  name,
  className = '',
  starSize = 'w-[18px] h-[18px]',
  textSize = 'text-xs',
}) => {
  const categoryLabel = starCategory || 'Hotel';

  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      title={`${stars} Bintang (${categoryLabel})`}
    >
      <div className={`relative inline-flex items-center justify-center ${starSize} shrink-0`}>
        <Star className={`${starSize} text-amber-400 fill-amber-400`} />
        <span className="absolute inset-0 flex items-center justify-center text-[8.5px] font-black text-[#062846] leading-none select-none pt-[0.5px]">
          {stars}
        </span>
      </div>
      <span className={`${textSize} font-bold text-[#062846] tracking-tight`}>
        {categoryLabel}
      </span>
    </div>
  );
};
