import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { FilterState } from '../types';
import { GENRE_MAP } from '../services/tmdb';
import { UI_TRANSLATIONS } from '../data/constants';

interface FilterBarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  title?: string;
  count?: number;
}

const POPULAR_GENRES = [
  { id: '', label: 'සියල්ල' },
  { id: '28', label: 'ක්‍රියාදාම (Action)' },
  { id: '35', label: 'හාස්‍ය (Comedy)' },
  { id: '53', label: 'ත්‍රාසජනක (Thriller)' },
  { id: '10749', label: 'ආදර කතා (Romance)' },
  { id: '878', label: 'විද්‍යා ප්‍රබන්ධ (Sci-Fi)' },
  { id: '16', label: 'සජීවිකරණ (Animation)' },
];

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015', '2010', '2000'];

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: UI_TRANSLATIONS.mostPopular },
  { value: 'vote_average.desc', label: UI_TRANSLATIONS.highestRated },
  { value: 'primary_release_date.desc', label: UI_TRANSLATIONS.newest },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  title,
  count
}) => {
  const isFiltered = filters.genre !== '' || filters.year !== '' || filters.sortBy !== 'popularity.desc';

  return (
    <div id="media-filter-bar" className="mb-6 space-y-3">
      {/* Quick Filter Pill Bar as per Professional Polish theme */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
        {POPULAR_GENRES.map((g) => {
          const isActive = filters.genre === g.id;
          return (
            <button
              key={g.id}
              onClick={() => onChange({ ...filters, genre: g.id })}
              className={`px-4 py-1.5 rounded-full text-[13px] font-sinhala whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#3b82f6] text-white border-[#3b82f6] font-semibold shadow-sm'
                  : 'bg-[#16213e] text-[#a0a0b0] hover:text-white border-white/5 hover:border-white/20'
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Filter Options Bar */}
      <div className="bg-[#16213e] p-3 sm:p-4 rounded-lg border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        {/* Title and Result Count */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-[#3b82f6]/20 text-[#3b82f6]">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-sinhala">
              {title || 'පෙරහන් තීරුව (Filters)'}
            </h2>
            {count !== undefined && (
              <p className="text-[11px] text-[#a0a0b0]">
                ප්‍රතිඵල {count} ක් හමුවිය
              </p>
            )}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Genre select */}
          <div className="relative min-w-[130px] flex-1 sm:flex-initial">
            <select
              id="filter-genre-select"
              value={filters.genre}
              onChange={(e) => onChange({ ...filters, genre: e.target.value })}
              aria-label="සියලුම වර්ග"
              className="w-full appearance-none bg-[#0a0a1a] text-xs text-gray-200 px-3 py-2 rounded-md border border-white/10 hover:border-[#3b82f6] focus:outline-none focus:border-[#3b82f6] cursor-pointer pr-7 font-sinhala"
            >
              <option value="">{UI_TRANSLATIONS.allGenres}</option>
              {Object.entries(GENRE_MAP).map(([id, { en, si }]) => (
                <option key={id} value={id}>
                  {si} ({en})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Year select */}
          <div className="relative min-w-[110px] flex-1 sm:flex-initial">
            <select
              id="filter-year-select"
              value={filters.year}
              onChange={(e) => onChange({ ...filters, year: e.target.value })}
              aria-label="සියලුම අවුරුදු"
              className="w-full appearance-none bg-[#0a0a1a] text-xs text-gray-200 px-3 py-2 rounded-md border border-white/10 hover:border-[#3b82f6] focus:outline-none focus:border-[#3b82f6] cursor-pointer pr-7 font-sinhala"
            >
              <option value="">{UI_TRANSLATIONS.allYears}</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y} වසර
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Sort select */}
          <div className="relative min-w-[140px] flex-1 sm:flex-initial">
            <select
              id="filter-sort-select"
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
              aria-label="වඩාත්ම ජනප්‍රිය"
              className="w-full appearance-none bg-[#0a0a1a] text-xs text-gray-200 px-3 py-2 rounded-md border border-white/10 hover:border-[#3b82f6] focus:outline-none focus:border-[#3b82f6] cursor-pointer pr-7 font-sinhala"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              id="filter-reset-btn"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#0a0a1a] hover:bg-gray-900 border border-white/10 text-xs text-[#a0a0b0] hover:text-white transition-colors font-sinhala"
              title="පෙරහන් යළි සකසන්න"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>යළි සකසන්න</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
