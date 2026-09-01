import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating = 5,
  count,
  size = 'sm',
  className,
  showText = true,
}) => {
  const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 5;
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center text-gold">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSizes[size],
              star <= Math.round(safeRating)
                ? 'fill-gold text-gold'
                : 'text-earth-300'
            )}
          />
        ))}
      </div>
      {showText && (
        <span className="font-sans text-xs font-medium text-earth-700 tracking-wide">
          {safeRating.toFixed(1)} {count !== undefined && <span className="text-earth-500 font-normal">({count})</span>}
        </span>
      )}
    </div>
  );
};
