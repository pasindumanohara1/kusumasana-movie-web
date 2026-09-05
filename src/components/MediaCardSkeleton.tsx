import React from 'react';

interface MediaCardSkeletonProps {
  className?: string;
  index?: number;
}

const TITLE_WIDTHS = ['w-3/4', 'w-4/5', 'w-2/3', 'w-5/6', 'w-1/2', 'w-4/5'];

export const MediaCardSkeleton: React.FC<MediaCardSkeletonProps> = ({ className = '', index = 0 }) => {
  const titleWidth = TITLE_WIDTHS[index % TITLE_WIDTHS.length];

  return (
    <div
      className={`relative flex flex-col bg-[#16213e] rounded-[8px] overflow-hidden border border-white/5 shadow-md ${className}`}
      aria-hidden="true"
    >
      {/* 2:3 Vertical Poster Placeholder */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#141d33]">
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 skeleton-shimmer opacity-75" />

        {/* Rating badge placeholder (top left) */}
        <div className="absolute top-2.5 left-2.5 z-10 w-11 h-4.5 rounded-[4px] bg-black/50 backdrop-blur-sm flex items-center gap-1 px-1.5 py-0.5 border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/40 animate-pulse" />
          <div className="w-4 h-2 rounded bg-white/25" />
        </div>

        {/* Quality badge placeholder (top right) */}
        <div className="absolute top-2.5 right-2.5 z-10 w-8 h-4.5 rounded-[4px] bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/5">
          <div className="w-5 h-2 rounded bg-white/25" />
        </div>

        {/* Subtle center play button watermark placeholder */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-white/20 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body below poster */}
      <div className="p-2.5 space-y-2">
        {/* Title skeleton */}
        <div className={`h-3.5 bg-white/15 rounded-[4px] ${titleWidth} skeleton-shimmer`} />

        {/* Meta row */}
        <div className="flex items-center justify-between pt-0.5">
          {/* Year */}
          <div className="h-2.5 bg-white/10 rounded w-9 skeleton-shimmer" />
          {/* Media type tag (Movie / TV) */}
          <div className="h-2.5 bg-emerald-500/20 rounded w-12 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

interface MediaSkeletonGridProps {
  count?: number;
  className?: string;
}

export const MediaSkeletonGrid: React.FC<MediaSkeletonGridProps> = ({
  count = 18,
  className = ''
}) => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 ${className}`}
      aria-label="පූරණය වෙමින් පවතී..."
      role="status"
    >
      {Array.from({ length: count }).map((_, index) => (
        <MediaCardSkeleton key={`media-skeleton-${index}`} index={index} />
      ))}
    </div>
  );
};
