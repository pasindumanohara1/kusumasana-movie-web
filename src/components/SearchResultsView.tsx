import React, { useState, useMemo } from 'react';
import { Search, Film, Tv, Sparkles, AlertCircle, ArrowLeft, Filter } from 'lucide-react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';
import { MediaSkeletonGrid } from './MediaCardSkeleton';
import { AdsterraResponsiveLeaderboard, SponsoredMovieCard } from './AdsterraBanner';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick } from '../data/constants';

interface SearchResultsViewProps {
  query: string;
  results: MediaItem[];
  isLoading: boolean;
  onSelectMedia: (item: MediaItem) => void;
  onSearchAgain: (newQuery: string) => void;
  onSelectTab: (tab: string) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  results,
  isLoading,
  onSelectMedia,
  onSearchAgain,
  onSelectTab
}) => {
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'tv'>('all');
  const [localQuery, setLocalQuery] = useState(query);

  // Sync local input when external query changes
  React.useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearchAgain(localQuery.trim());
    }
  };

  const moviesCount = useMemo(() => results.filter((i) => i.media_type === 'movie').length, [results]);
  const tvCount = useMemo(() => results.filter((i) => i.media_type === 'tv').length, [results]);

  const filteredResults = useMemo(() => {
    if (filterType === 'all') return results;
    return results.filter((item) => item.media_type === filterType);
  }, [results, filterType]);

  return (
    <div id="search-results-page" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Breadcrumb / Return to Home */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
        <button
          onClick={() => onSelectTab('home')}
          className="hover:text-white flex items-center gap-1 font-sinhala transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>මුල් පිටුවට (Home)</span>
        </button>
        <span>/</span>
        <span className="text-blue-400 font-semibold font-sinhala">සර්ච් ප්‍රතිඵල</span>
      </div>

      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-[#121b30] via-[#16213e] to-[#121b30] border border-blue-500/30 rounded-3xl p-5 sm:p-7 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>සර්ච් ප්‍රතිඵල (Search Results)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-sinhala flex items-center gap-2 flex-wrap">
              <span>"</span>
              <span className="text-blue-400 underline decoration-blue-500/50 underline-offset-4">{query}</span>
              <span>" සඳහා ප්‍රතිඵල</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              {isLoading
                ? 'තොරතුරු ලබා ගනිමින් පවතී...'
                : `මුළු ප්‍රතිඵල ${results.length} ක් හමු විය (${moviesCount} චිත්‍රපටි, ${tvCount} ටීවී ෂෝ)`}
            </p>
          </div>

          {/* In-page search bar to easily refine search */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="චිත්‍රපටියේ හෝ ටීවී ෂෝ එකේ නම මෙහි ලියන්න..."
              className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[#090e1a] text-white text-sm placeholder-gray-500 border border-blue-500/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-sinhala shadow-inner"
            />
            <Search className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all font-sinhala"
            >
              සොයන්න
            </button>
          </form>
        </div>

        {/* Filter Type Pills (All / Movies / TV Shows) */}
        {!isLoading && results.length > 0 && (
          <div className="flex items-center gap-2 pt-5 mt-5 border-t border-gray-800/80 overflow-x-auto">
            <span className="text-xs text-gray-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>වර්ගය:</span>
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0b1120] text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>සියල්ල (All)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                {results.length}
              </span>
            </button>
            <button
              onClick={() => setFilterType('movie')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'movie'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0b1120] text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>චිත්‍රපටි (Movies)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                {moviesCount}
              </span>
            </button>
            <button
              onClick={() => setFilterType('tv')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'tv'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[#0b1120] text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>ටීවී ෂෝ (TV Series)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                {tvCount}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-sinhala">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>"{query}" සඳහා චිත්‍රපටි සහ ටීවී ෂෝ සොයමින් පවතී...</span>
          </div>
          <MediaSkeletonGrid count={12} />
        </div>
      ) : filteredResults.length === 0 ? (
        /* Empty State */
        <div className="py-16 text-center bg-[#16213e] rounded-3xl border border-gray-800 p-8 space-y-4 max-w-lg mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-sinhala">
              "{query}" සඳහා කිසිදු ප්‍රතිඵලයක් හමු නොවීය
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              කරුණාකර චිත්‍රපටියේ හෝ නළුවාගේ නම ඉංග්‍රීසියෙන් හෝ සිංහලෙන් නිවැරදිව ටයිප් කර නැවත උත්සාහ කරන්න.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onSelectTab('movies')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition-all"
            >
              චිත්‍රපටි ගවේෂණය කරන්න
            </button>
            <button
              onClick={() => onSelectTab('home')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-gray-800 text-gray-300 text-xs font-bold border border-gray-700 transition-all"
            >
              මුල් පිටුවට යන්න
            </button>
          </div>
        </div>
      ) : (
        /* Full Grid of All Search Results */
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {/* Native Sponsored Card integrated into search results */}
            <SponsoredMovieCard
              title="VIP 4K Ultra Fast Node"
              genre="Cloud Cinema • 2025"
              rating={9.9}
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
            />

            {filteredResults.map((item) => (
              <MediaCard
                key={`${item.media_type}-${item.id}`}
                item={item}
                onSelect={onSelectMedia}
              />
            ))}
          </div>

          {/* Adsterra Leaderboard Banner */}
          <div className="my-6">
            <AdsterraResponsiveLeaderboard label="Sponsored Search Media Network" />
          </div>
        </div>
      )}
    </div>
  );
};
