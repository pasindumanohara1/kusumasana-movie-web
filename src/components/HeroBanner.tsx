import React from 'react';
import { Play, Info, Flame, Star, Clock, Download, Sparkles } from 'lucide-react';
import { MediaItem } from '../types';
import { getImageUrl } from '../services/tmdb';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick, UI_TRANSLATIONS } from '../data/constants';

interface HeroBannerProps {
  item: MediaItem;
  onWatch: (item: MediaItem) => void;
  onMoreInfo: (item: MediaItem) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ item, onWatch, onMoreInfo }) => {
  const displayTitle = item.sinhalaTitle || item.title || item.name || 'Untitled';
  const displayOverview =
    item.sinhalaOverview ||
    item.overview ||
    'කුසුමාසන දේවි සිනමා හරහා නොමිලේ 1080p HD තාක්ෂණයෙන් නරඹන්න.';
  const releaseYear = (item.release_date || item.first_air_date || '2024').split('-')[0];

  return (
    <div id="hero-banner-section" className="relative w-full min-h-[520px] md:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Poster Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={getImageUrl(item.backdrop_path || item.poster_path, 'original')}
          alt={displayTitle}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-75 transition-transform duration-1000"
        />
        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-[#0a0a1a]/70 to-[#0a0a1a]/40" />
      </div>

      {/* Floating Top Corner Ad / Smartlink Overlay Badge (Fake ad corner styled) */}
      <div className="absolute top-24 right-4 sm:right-10 z-20 hidden lg:block">
        <div
          id="hero-floating-ad-card"
          className="bg-white text-black p-3.5 rounded-lg text-xs w-[230px] shadow-2xl border-l-4 border-[#3b82f6] space-y-2 transition-transform hover:scale-[1.02]"
        >
          <div className="flex justify-between items-center">
            <strong className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-wider">Sponsored</strong>
            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="text-gray-400 hover:text-black font-bold text-xs"
            >
              ✕
            </button>
          </div>
          <p className="font-bold text-[13px] text-gray-900 leading-snug m-0">
            Unlock Sinhala Subtitles & 4K
          </p>
          <button
            onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold text-[11px] py-1.5 px-3 rounded-[4px] font-sinhala transition-colors"
          >
            සිංහල උපසිරැසි ලබාගන්න
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-24 md:py-28 w-full">
        <div className="max-w-xl space-y-4">
          {/* Category Tag: දැන් ට්‍රෙන්ඩින් */}
          <div>
            <span className="bg-[#22c55e] text-black font-extrabold text-[11px] px-2.5 py-1 rounded-[4px] inline-flex items-center gap-1.5 font-sinhala tracking-wide">
              <span>{UI_TRANSLATIONS.trendingNow}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white leading-tight font-sinhala tracking-normal">
            {displayTitle}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#a0a0b0] font-medium">
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-[#16213e] px-2 py-0.5 rounded border border-white/5">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{item.vote_average.toFixed(1)} IMDB</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#16213e] text-[#22c55e] border border-white/5 font-bold">
              {item.quality || '4K UHD'}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#a0a0b0]" />
              <span>{item.duration || '2h 15m'}</span>
            </div>
            <span>•</span>
            <span className="text-white font-semibold">{releaseYear}</span>
            <span>•</span>
            <span className="text-[#a0a0b0] uppercase">{item.media_type === 'movie' ? 'චිත්‍රපටිය' : 'ටීවී ෂෝ'}</span>
          </div>

          {/* Short Synopsis */}
          <p className="text-[15px] text-[#a0a0b0] leading-[1.6] line-clamp-3 font-sinhala">
            {displayOverview}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            {/* දැන් බලන්න (Play icon) */}
            <button
              id="hero-watch-now-btn"
              onClick={() => onWatch(item)}
              className="bg-white hover:bg-gray-100 text-black px-7 py-3 rounded-[5px] font-bold text-sm flex items-center gap-2.5 transition-colors shadow-sm font-sinhala"
            >
              <Play className="w-4 h-4 fill-black text-black" />
              <span>{UI_TRANSLATIONS.watchNow}</span>
            </button>

            {/* තව විස්තර (Info icon) */}
            <button
              id="hero-more-info-btn"
              onClick={() => onMoreInfo(item)}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md text-white px-7 py-3 rounded-[5px] font-bold text-sm flex items-center gap-2.5 border border-white/10 transition-colors font-sinhala"
            >
              <Info className="w-4 h-4 text-white" />
              <span>{UI_TRANSLATIONS.moreInfo}</span>
            </button>

            {/* Direct High-CTR Download CTA */}
            <button
              id="hero-quick-download-btn"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-[5px] bg-[#16213e] hover:bg-[#1f2d52] text-white font-semibold text-xs border border-white/10 transition-all font-sinhala"
            >
              <Download className="w-4 h-4 text-[#3b82f6]" />
              <span>1080p Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
