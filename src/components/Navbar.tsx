import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bookmark,
  Download,
  Film,
  Tv,
  Home as HomeIcon,
  Crown,
  X,
  Menu,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick, UI_TRANSLATIONS } from '../data/constants';
import { MediaItem } from '../types';
import { tmdbService, getImageUrl } from '../services/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import { AdsterraBanner } from './AdsterraBanner';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMedia: (item: MediaItem) => void;
  onOpenDownloadModal: () => void;
  onOpenQueenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMedia,
  onOpenDownloadModal,
  onOpenQueenModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MediaItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { watchlist } = useWatchlist();

  // Scroll listener for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autocomplete search debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await tmdbService.searchMulti(searchQuery);
      setSuggestions(results.slice(0, 6));
      setIsSearching(false);
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item: MediaItem) => {
    setShowSuggestions(false);
    setSearchQuery('');
    onOpenMedia(item);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0]);
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10 flex items-center transition-all duration-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="nav-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <img
                src="/logo.png"
                alt="කුසුමාසන දේවි Cinema Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(234,179,8,0.45)] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-wide text-[#3b82f6] font-sinhala group-hover:text-blue-400 transition-colors">
                  කුසුමාසන දේවි
                </span>
              </div>
              <span className="text-[11px] text-[#a0a0b0] font-sans tracking-tight hidden md:inline">
                Kusumasana Devi Cinema
              </span>
            </div>
          </button>

          {/* Queen Tribute Badge */}
          <button
            id="nav-queen-history-btn"
            onClick={onOpenQueenModal}
            className="hidden xl:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-amber-300 text-xs font-medium transition-all"
            title="දෝන කැතරිනා රැජිණගේ ඓතිහාසික තොරතුරු කියවන්න"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-sinhala">දෝන කැතරිනා රැජිණ</span>
          </button>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <button
            id="nav-link-home"
            onClick={() => setActiveTab('home')}
            className={`text-[14px] font-sinhala transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'text-white font-semibold border-b-2 border-[#3b82f6] pb-1'
                : 'text-[#a0a0b0] hover:text-white pb-1 border-b-2 border-transparent'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.home}</span>
          </button>

          <button
            id="nav-link-movies"
            onClick={() => setActiveTab('movies')}
            className={`text-[14px] font-sinhala transition-all flex items-center gap-1.5 ${
              activeTab === 'movies'
                ? 'text-white font-semibold border-b-2 border-[#3b82f6] pb-1'
                : 'text-[#a0a0b0] hover:text-white pb-1 border-b-2 border-transparent'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.movies}</span>
          </button>

          <button
            id="nav-link-tv"
            onClick={() => setActiveTab('tv')}
            className={`text-[14px] font-sinhala transition-all flex items-center gap-1.5 ${
              activeTab === 'tv'
                ? 'text-white font-semibold border-b-2 border-[#3b82f6] pb-1'
                : 'text-[#a0a0b0] hover:text-white pb-1 border-b-2 border-transparent'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.tvShows}</span>
          </button>

          <button
            id="nav-link-mylist"
            onClick={() => setActiveTab('mylist')}
            className={`text-[14px] font-sinhala transition-all flex items-center gap-1.5 ${
              activeTab === 'mylist'
                ? 'text-white font-semibold border-b-2 border-[#3b82f6] pb-1'
                : 'text-[#a0a0b0] hover:text-white pb-1 border-b-2 border-transparent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.myList}</span>
            {watchlist.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-[#22c55e] text-black rounded-full">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* High Intent CTA: HD ඩවුන්ලෝඩ් */}
          <button
            id="nav-cta-download"
            onClick={onOpenDownloadModal}
            className="bg-[#3b82f6] hover:bg-blue-600 text-white px-4 py-2 rounded-[6px] font-bold text-[13px] font-sinhala shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.downloadHD}</span>
          </button>
        </nav>

        {/* Real-time Search Input with Autocomplete */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              placeholder={UI_TRANSLATIONS.searchPlaceholder}
              className="w-full pl-9 pr-8 py-1.5 rounded-full bg-[#16213e] text-[13px] text-white placeholder-[#a0a0b0] border border-white/10 focus:outline-none focus:border-[#3b82f6] transition-all font-sinhala"
            />
            <Search className="w-3.5 h-3.5 text-[#a0a0b0] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0a0b0] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-[#16213e] border border-white/10 rounded-lg shadow-2xl shadow-black overflow-hidden z-50 max-h-96 overflow-y-auto">
              <div className="p-2 border-b border-white/5 text-[11px] font-semibold text-[#3b82f6] uppercase tracking-wider flex justify-between items-center">
                <span>සර්ච් ප්‍රතිඵල ({suggestions.length})</span>
                <span className="text-[#a0a0b0] text-[10px]">TMDB Fast Index</span>
              </div>
              <div className="divide-y divide-white/5">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    id={`search-item-${item.id}`}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full p-2.5 flex items-center gap-3 hover:bg-[#1f2d52] transition-colors text-left group"
                  >
                    <img
                      src={getImageUrl(item.poster_path, 'w500')}
                      alt={item.title}
                      className="w-10 h-14 object-cover rounded shadow flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 truncate font-sinhala">
                        {item.sinhalaTitle || item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#a0a0b0]">
                        <span className="text-amber-400 font-bold">★ {item.vote_average.toFixed(1)}</span>
                        <span>•</span>
                        <span className="capitalize">{item.media_type === 'movie' ? 'චිත්‍රපටි' : 'ටීවී ෂෝ'}</span>
                        <span>•</span>
                        <span className="text-[#22c55e] font-bold">{item.quality || 'HD'}</span>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Point #13: Sponsored Search Autocomplete Entry */}
                <button
                  id="search-item-sponsored"
                  onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                  className="w-full p-2.5 flex items-center gap-3 bg-blue-950/40 hover:bg-blue-900/50 transition-colors text-left group border-t border-blue-500/20"
                >
                  <div className="w-10 h-14 bg-gradient-to-br from-amber-500 to-red-600 rounded shadow flex items-center justify-center text-black font-black text-xs flex-shrink-0">
                    VIP
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-semibold text-amber-300 group-hover:text-amber-200 truncate font-sinhala">
                        VIP High-Speed 4K Cloud Streaming Node
                      </h4>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-black font-bold uppercase">
                        Ad
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-blue-200">
                      <span className="text-emerald-400 font-bold">★ 9.9</span>
                      <span>•</span>
                      <span>Zero Buffering</span>
                      <span>•</span>
                      <span className="text-[#22c55e] font-bold">1080p/4K</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Point #13: Search Dropdown Footer Ad */}
              <div className="p-2 bg-[#0d1424] border-t border-white/5 flex flex-col items-center justify-center">
                <AdsterraBanner format="320x50" showLabel={false} className="p-0 border-0 bg-transparent shadow-none" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#16213e] text-gray-300 hover:text-white border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 right-0 lg:hidden bg-[#0a0a1a] border-b border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sinhala ${
              activeTab === 'home' ? 'bg-[#3b82f6] text-white' : 'text-[#a0a0b0] hover:bg-[#16213e] hover:text-white'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.home}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('movies');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sinhala ${
              activeTab === 'movies' ? 'bg-[#3b82f6] text-white' : 'text-[#a0a0b0] hover:bg-[#16213e] hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.movies}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tv');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium font-sinhala ${
              activeTab === 'tv' ? 'bg-[#3b82f6] text-white' : 'text-[#a0a0b0] hover:bg-[#16213e] hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{UI_TRANSLATIONS.tvShows}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('mylist');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium font-sinhala ${
              activeTab === 'mylist' ? 'bg-[#3b82f6] text-white' : 'text-[#a0a0b0] hover:bg-[#16213e] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4" />
              <span>{UI_TRANSLATIONS.myList}</span>
            </div>
            {watchlist.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold bg-[#22c55e] text-black rounded-full">
                {watchlist.length}
              </span>
            )}
          </button>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 font-sinhala">
            <button
              onClick={() => {
                onOpenDownloadModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#3b82f6] text-white text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>{UI_TRANSLATIONS.downloadHD}</span>
            </button>
            <button
              onClick={() => {
                onOpenQueenModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#16213e] text-amber-300 border border-white/10 text-xs font-bold"
            >
              <Crown className="w-4 h-4" />
              <span>දෝන කැතරිනා</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
