import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar
} from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MediaCard } from './components/MediaCard';
import { FilterBar } from './components/FilterBar';
import { WatchView } from './components/WatchView';
import { DownloadModal } from './components/DownloadModal';
import { RoyalQueenModal } from './components/RoyalQueenModal';
import { AdBanner } from './components/AdBanner';
import { AdsterraBanner, AdsterraResponsiveLeaderboard, AdsterraNativeBanner } from './components/AdsterraBanner';
import { FakeButtonsBar } from './components/FakeButtonsBar';
import { Footer } from './components/Footer';
import { PaginationControls } from './components/PaginationControls';
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext';
import { MediaItem, FilterState } from './types';
import { tmdbService } from './services/tmdb';
import { UI_TRANSLATIONS, DIRECT_MONETIZATION_LINK, handleFakeButtonClick } from './data/constants';
import { parseUrlState, buildWatchUrl, buildTabUrl, syncUrlHistory } from './utils/urlRouter';
import {
  Flame,
  Film,
  Tv,
  Star,
  Bookmark,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Download,
  AlertCircle
} from 'lucide-react';

const initialFilters: FilterState = {
  genre: '',
  year: '',
  sortBy: 'popularity.desc'
};

const MainContent: React.FC = () => {
  // Read initial deep-linked URL parameters on startup
  const initialUrl = useRef(parseUrlState()).current;
  const [activeTab, setActiveTab] = useState(initialUrl.tab || 'home');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [initialSeason, setInitialSeason] = useState(initialUrl.season || 1);
  const [initialEpisode, setInitialEpisode] = useState(initialUrl.episode || 1);
  const [heroItem, setHeroItem] = useState<MediaItem | null>(null);

  // Lists
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
  const [popularTv, setPopularTv] = useState<MediaItem[]>([]);
  const [topRated, setTopRated] = useState<MediaItem[]>([]);

  // Browse state & Pagination
  const [browseItems, setBrowseItems] = useState<MediaItem[]>([]);
  const [browseFilters, setBrowseFilters] = useState<FilterState>(initialFilters);
  const [loadingBrowse, setLoadingBrowse] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialUrl.page || 1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Modals
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isQueenModalOpen, setIsQueenModalOpen] = useState(false);

  const { watchlist } = useWatchlist();

  // 1. Initial URL deep-link handling: if URL has ?watch=123, immediately load it
  useEffect(() => {
    if (initialUrl.watchId) {
      const type = initialUrl.mediaType || 'movie';
      const id = initialUrl.watchId;
      const initialItem: MediaItem = {
        id,
        title: initialUrl.title || (type === 'tv' ? 'TV Series' : 'Movie'),
        media_type: type,
        overview: '',
        poster_path: null,
        backdrop_path: null,
        vote_average: 8.0,
        release_date: '',
        genre_ids: []
      };
      setSelectedMedia(initialItem);
      setInitialSeason(initialUrl.season || 1);
      setInitialEpisode(initialUrl.episode || 1);

      // Fetch TMDB full item to enrich
      tmdbService.getDetails(id, type).then((details) => {
        if (details) {
          setSelectedMedia({
            id: details.id,
            title: details.sinhalaTitle || details.title || details.name || initialUrl.title,
            name: details.name,
            media_type: type,
            overview: details.overview,
            poster_path: details.poster_path,
            backdrop_path: details.backdrop_path,
            vote_average: details.vote_average,
            release_date: details.release_date,
            first_air_date: details.first_air_date,
            genre_ids: details.genres?.map((g) => g.id) || []
          });
        }
      });
    }
  }, []);

  // 2. Browser Back / Forward button navigation (popstate)
  useEffect(() => {
    const handlePopState = async () => {
      const state = parseUrlState();
      if (state.watchId) {
        setInitialSeason(state.season || 1);
        setInitialEpisode(state.episode || 1);
        const type = state.mediaType || 'movie';
        const item: MediaItem = {
          id: state.watchId,
          title: state.title || '',
          media_type: type,
          overview: '',
          poster_path: null,
          backdrop_path: null,
          vote_average: 8.0,
          release_date: '',
          genre_ids: []
        };
        setSelectedMedia(item);
        const details = await tmdbService.getDetails(state.watchId, type);
        if (details) {
          setSelectedMedia({
            id: details.id,
            title: details.sinhalaTitle || details.title || details.name || state.title,
            name: details.name,
            media_type: type,
            overview: details.overview,
            poster_path: details.poster_path,
            backdrop_path: details.backdrop_path,
            vote_average: details.vote_average,
            release_date: details.release_date,
            first_air_date: details.first_air_date,
            genre_ids: details.genres?.map((g) => g.id) || []
          });
        }
      } else {
        setSelectedMedia(null);
        setActiveTab(state.tab || 'home');
        setCurrentPage(state.page || 1);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load initial home data
  useEffect(() => {
    async function loadInitialData() {
      const [tr, pm, pt, trated] = await Promise.all([
        tmdbService.getTrending('all', 'week'),
        tmdbService.getPopular('movie'),
        tmdbService.getPopular('tv'),
        tmdbService.getTopRated('movie')
      ]);

      setTrending(tr);
      setPopularMovies(pm);
      setPopularTv(pt);
      setTopRated(trated);

      if (tr.length > 0) {
        setHeroItem(tr[0]);
      }
    }
    loadInitialData();
  }, []);

  // Handle Tab change and load browse data
  useEffect(() => {
    if (activeTab === 'movies') {
      loadFilteredMedia('movie', browseFilters, currentPage, false);
    } else if (activeTab === 'tv') {
      loadFilteredMedia('tv', browseFilters, currentPage, false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, browseFilters]);

  const loadFilteredMedia = async (
    type: 'movie' | 'tv',
    filters: FilterState,
    page: number = 1,
    append: boolean = false
  ) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoadingBrowse(true);
    }

    const results = await tmdbService.discoverMedia(type, filters, page);

    if (append) {
      setBrowseItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const filteredNew = results.filter((item) => !existingIds.has(item.id));
        return [...prev, ...filteredNew];
      });
      setLoadingMore(false);
    } else {
      setBrowseItems(results);
      setLoadingBrowse(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
    const tabUrl = buildTabUrl(activeTab, newPage);
    syncUrlHistory(tabUrl, false);
    loadFilteredMedia(activeTab === 'tv' ? 'tv' : 'movie', browseFilters, newPage, false);
    const targetElem = document.getElementById(activeTab === 'tv' ? 'tv-tab-content' : 'movies-tab-content');
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const tabUrl = buildTabUrl(activeTab, nextPage);
    syncUrlHistory(tabUrl, true);
    loadFilteredMedia(activeTab === 'tv' ? 'tv' : 'movie', browseFilters, nextPage, true);
  };

  const handleSelectMedia = (item: MediaItem, season: number = 1, episode: number = 1) => {
    setSelectedMedia(item);
    setInitialSeason(season);
    setInitialEpisode(episode);
    const watchUrl = buildWatchUrl(item, season, episode);
    syncUrlHistory(watchUrl, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBrowse = () => {
    setSelectedMedia(null);
    const tabUrl = buildTabUrl(activeTab, currentPage);
    syncUrlHistory(tabUrl, false);
  };

  const handleTabChange = (tab: string) => {
    setSelectedMedia(null);
    setActiveTab(tab);
    setCurrentPage(1);
    const tabUrl = buildTabUrl(tab, 1);
    syncUrlHistory(tabUrl, false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenMedia={handleSelectMedia}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onOpenQueenModal={() => setIsQueenModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedMedia ? (
          /* Watch / Player View */
          <WatchView
            mediaItem={selectedMedia}
            initialSeason={initialSeason}
            initialEpisode={initialEpisode}
            onSelectMedia={handleSelectMedia}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            onBack={handleBackToBrowse}
          />
        ) : (
          /* Tabbed Views */
          <div>
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <div id="home-tab-content">
                {/* Hero Banner with Trending Now item */}
                {heroItem && (
                  <HeroBanner
                    item={heroItem}
                    onWatch={handleSelectMedia}
                    onMoreInfo={handleSelectMedia}
                  />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
                  {/* High-CTR Monetization Hub with 20 Ideas */}
                  <FakeButtonsBar onOpenDownloadModal={() => setIsDownloadModalOpen(true)} />

                  {/* Top Responsive Adsterra Leaderboard (728x90 Desktop, 320x50 Mobile) */}
                  <AdsterraResponsiveLeaderboard label="Sponsored High-Speed Stream" />

                  {/* Section 1: දැන් ට්‍රෙන්ඩින් (Trending Now) */}
                  <section id="trending-section" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-red-600/20 text-red-500">
                          <Flame className="w-5 h-5 fill-current" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-sinhala">
                          {UI_TRANSLATIONS.trendingNow}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleTabChange('movies')}
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        <span>තව බලන්න</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {trending.slice(0, 12).map((item, idx) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectMedia}
                          priority={idx < 4}
                        />
                      ))}
                    </div>
                  </section>

                  {/* In-feed Adsterra 468x60 Banner */}
                  <div className="flex justify-center my-4">
                    <AdsterraBanner format="468x60" label="Sponsored HD Streaming" />
                  </div>

                  {/* Section 2: ජනප්‍රිය චිත්‍රපටි (Popular Movies) */}
                  <section id="popular-movies-section" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                          <Film className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-sinhala">
                          {UI_TRANSLATIONS.popularMovies}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleTabChange('movies')}
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        <span>සියල්ල ({popularMovies.length})</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {popularMovies.slice(0, 12).map((item) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectMedia}
                        />
                      ))}
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => {
                          handleTabChange('movies');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-xs sm:text-sm font-bold text-blue-400 hover:text-white transition-all shadow-md group"
                      >
                        <span className="font-sinhala">තවත් චිත්‍රපටි පෙන්වන්න (View More Movies)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </section>

                  {/* Adsterra Native Sponsored Recommendations */}
                  <AdsterraNativeBanner />

                  {/* Section 3: ජනප්‍රිය ටීවී ෂෝ (Popular TV Shows) */}
                  <section id="popular-tv-section" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
                          <Tv className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-sinhala">
                          {UI_TRANSLATIONS.popularTVShows}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleTabChange('tv')}
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        <span>සියල්ල ({popularTv.length})</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {popularTv.slice(0, 12).map((item) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectMedia}
                        />
                      ))}
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => {
                          handleTabChange('tv');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-xs sm:text-sm font-bold text-purple-400 hover:text-white transition-all shadow-md group"
                      >
                        <span className="font-sinhala">තවත් ටීවී ෂෝ පෙන්වන්න (View More TV Shows)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </section>

                  {/* Mid Responsive Leaderboard (728x90 Desktop, 320x50 Mobile) */}
                  <AdsterraResponsiveLeaderboard label="Sponsored Entertainment Network" />

                  {/* Section 4: ඉහළම ඇගයීම් (Top Rated) */}
                  <section id="top-rated-section" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                          <Star className="w-5 h-5 fill-current" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white font-sinhala">
                          {UI_TRANSLATIONS.topRated}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {topRated.slice(0, 12).map((item) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          onSelect={handleSelectMedia}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* 2. MOVIES TAB */}
            {activeTab === 'movies' && (
              <div id="movies-tab-content" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-extrabold text-white font-sinhala mb-1">
                    {UI_TRANSLATIONS.movies} (HD Movies)
                  </h1>
                  <p className="text-sm text-gray-400">
                    නවතම සිනමා නිර්මාණ, සිංහල උපසිරැසි සහ 1080p BluRay ගුණාත්මකභාවයෙන්
                  </p>
                </div>

                {/* 3-Select Dropdown FilterBar */}
                <FilterBar
                  filters={browseFilters}
                  onChange={setBrowseFilters}
                  onReset={() => setBrowseFilters(initialFilters)}
                  title="චිත්‍රපටි පෙරහන් කරන්න"
                  count={browseItems.length}
                />

                <AdBanner type="compact" slotName="Movies Filter Bar Top" />

                {loadingBrowse ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-400">චිත්‍රපටි පූරණය වෙමින් පවතී...</span>
                  </div>
                ) : browseItems.length === 0 ? (
                  <div className="py-16 text-center bg-[#16213e] rounded-2xl border border-gray-800 p-8 space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">පෙරහනට ගැළපෙන චිත්‍රපටි හමු නොවීය</h3>
                    <p className="text-xs text-gray-400">වෙනත් වර්ෂයක් හෝ වර්ගයක් තෝරා නැවත උත්සාහ කරන්න.</p>
                    <button
                      onClick={() => setBrowseFilters(initialFilters)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                    >
                      පෙරහන් ඉවත් කරන්න
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {browseItems.map((item) => (
                        <MediaCard key={item.id} item={item} onSelect={handleSelectMedia} />
                      ))}
                    </div>

                    <AdsterraResponsiveLeaderboard label="Sponsored HD Movies Network" />

                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={50}
                      onPageChange={handlePageChange}
                      onLoadMore={handleLoadMore}
                      isLoadingMore={loadingMore}
                      hasMore={true}
                    />
                  </>
                )}
              </div>
            )}

            {/* 3. TV SHOWS TAB */}
            {activeTab === 'tv' && (
              <div id="tv-tab-content" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-extrabold text-white font-sinhala mb-1">
                    {UI_TRANSLATIONS.tvShows} (TV Series)
                  </h1>
                  <p className="text-sm text-gray-400">
                    සියලුම කතා මාලා, සීසන් සහ කොටස් සම්පූර්ණයෙන් නැරඹිය හැක
                  </p>
                </div>

                {/* 3-Select Dropdown FilterBar */}
                <FilterBar
                  filters={browseFilters}
                  onChange={setBrowseFilters}
                  onReset={() => setBrowseFilters(initialFilters)}
                  title="ටීවී ෂෝ පෙරහන් කරන්න"
                  count={browseItems.length}
                />

                <AdBanner type="compact" slotName="TV Filter Bar Top" />

                {loadingBrowse ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-400">ටීවී ෂෝ පූරණය වෙමින් පවතී...</span>
                  </div>
                ) : browseItems.length === 0 ? (
                  <div className="py-16 text-center bg-[#16213e] rounded-2xl border border-gray-800 p-8 space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                    <h3 className="text-base font-bold text-white">පෙරහනට ගැළපෙන ටීවී ෂෝ හමු නොවීය</h3>
                    <p className="text-xs text-gray-400">වෙනත් වර්ෂයක් හෝ වර්ගයක් තෝරා නැවත උත්සාහ කරන්න.</p>
                    <button
                      onClick={() => setBrowseFilters(initialFilters)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                    >
                      පෙරහන් ඉවත් කරන්න
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {browseItems.map((item) => (
                        <MediaCard key={item.id} item={item} onSelect={handleSelectMedia} />
                      ))}
                    </div>

                    <AdsterraResponsiveLeaderboard label="Sponsored TV Series Network" />

                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={50}
                      onPageChange={handlePageChange}
                      onLoadMore={handleLoadMore}
                      isLoadingMore={loadingMore}
                      hasMore={true}
                    />
                  </>
                )}
              </div>
            )}

            {/* 4. MY LIST TAB */}
            {activeTab === 'mylist' && (
              <div id="mylist-tab-content" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white font-sinhala mb-1">
                      {UI_TRANSLATIONS.myList}
                    </h1>
                    <p className="text-sm text-gray-400">
                      ඔබ විසින් සුරකින ලද චිත්‍රපටි සහ ටීවී ෂෝ එකතුව ({watchlist.length})
                    </p>
                  </div>
                </div>

                {watchlist.length === 0 ? (
                  <div className="py-20 text-center bg-[#16213e] rounded-3xl border border-blue-900/30 p-8 space-y-4 max-w-lg mx-auto shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                      <Bookmark className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-sinhala">
                      ඔබගේ ලිස්ට් එක හිස්ව පවතී
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      ඔබ නැරඹීමට කැමති ඕනෑම චිත්‍රපටියක හෝ ටීවී ෂෝ එකක ඇති '+' අයිකනය ක්ලික් කිරීමෙන් මෙහි සුරැකිය හැක.
                    </p>
                    <button
                      onClick={() => handleTabChange('home')}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/40 transition-all"
                    >
                      මුල් පිටුවට ගොස් තෝරන්න
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                      {watchlist.map((item) => (
                        <MediaCard key={item.id} item={item} onSelect={handleSelectMedia} />
                      ))}
                    </div>
                    <AdsterraResponsiveLeaderboard label="Sponsored Watchlist Network" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* High-CTR Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        mediaTitle={selectedMedia ? selectedMedia.sinhalaTitle || selectedMedia.title : undefined}
      />

      {/* Historical Queen Kusumasana Devi Tribute Modal */}
      <RoyalQueenModal
        isOpen={isQueenModalOpen}
        onClose={() => setIsQueenModalOpen(false)}
      />

      {/* Global Above-Footer Adsterra Responsive Leaderboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
        <AdsterraResponsiveLeaderboard label="Sponsored Global Network (Kusumasana Cinema)" />
      </div>

      {/* Global Footer */}
      <Footer
        onOpenQueenModal={() => setIsQueenModalOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onSelectTab={handleTabChange}
      />
    </div>
  );
};

export default function App() {
  return (
    <WatchlistProvider>
      <MainContent />
    </WatchlistProvider>
  );
}
