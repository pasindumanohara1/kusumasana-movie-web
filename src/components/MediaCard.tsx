import React from 'react';
import { Play, Plus, Check, Star, Sparkles } from 'lucide-react';
import { MediaItem } from '../types';
import { getImageUrl } from '../services/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

interface MediaCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  priority?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect, priority = false }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inList = isInWatchlist(item.id);

  const releaseYear = (item.release_date || item.first_air_date || '2024').split('-')[0];
  const isMovie = item.media_type === 'movie';
  const displayTitle = item.sinhalaTitle || item.title || item.name || 'Untitled';

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(item);
  };

  return (
    <div
      id={`media-card-${item.id}`}
      onClick={() => onSelect(item)}
      className="group relative cursor-pointer flex flex-col bg-[#16213e] rounded-[8px] overflow-hidden border border-white/5 transition-transform duration-300 hover:-translate-y-1 focus:outline-none shadow-md"
    >
      {/* 2:3 Vertical Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#2a3a5a]">
        {/* Poster Image */}
        <img
          src={getImageUrl(item.poster_path, 'w500')}
          alt={displayTitle}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Card Overlay Badge (Top Right as in design) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold">
            {item.quality || 'HD'}
          </span>
        </div>

        {/* Rating Badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold text-amber-400">
          <Star className="w-2.5 h-2.5 fill-amber-400" />
          <span>{item.vote_average.toFixed(1)}</span>
        </div>

        {/* Hover Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-20">
          {/* Top bookmark button */}
          <div className="flex justify-end">
            <button
              id={`bookmark-btn-${item.id}`}
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                inList
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-black/60 text-white hover:bg-[#3b82f6]'
              }`}
              title={inList ? 'මගේ ලිස්ට් එකෙන් ඉවත් කරන්න' : 'මගේ ලිස්ට් එකට එක් කරන්න'}
            >
              {inList ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
          </div>

          {/* Center Play Button */}
          <div className="flex justify-center items-center my-auto">
            <div className="w-10 h-10 rounded-full bg-[#3b82f6] group-hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
          </div>

          {/* Hover Bottom Snippet */}
          <div className="text-center">
            <span className="text-[10px] font-semibold text-blue-200 bg-[#0a0a1a]/80 px-2 py-0.5 rounded border border-white/10 font-sinhala">
              දැන් බලන්න
            </span>
          </div>
        </div>
      </div>

      {/* Card Body below poster */}
      <div className="p-2.5">
        <h3
          title={displayTitle}
          className="text-[13px] font-semibold text-white font-sinhala truncate mb-1 group-hover:text-[#3b82f6] transition-colors"
        >
          {displayTitle}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-[#a0a0b0]">
          <span>{releaseYear}</span>
          <span className="text-[#22c55e] font-semibold">
            {isMovie ? 'Movie' : 'TV Show'}
          </span>
        </div>
      </div>
    </div>
  );
};
