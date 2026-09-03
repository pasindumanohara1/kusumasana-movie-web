import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Share2,
  Heart,
  Download,
  Server,
  Star,
  Clock,
  Calendar,
  Sparkles,
  Zap,
  Subtitles,
  Crown,
  Volume2,
  RotateCcw,
  Film,
  Sliders,
  AlertCircle,
  Check,
  ChevronDown,
  ExternalLink,
  Layers,
  Maximize,
  Minimize,
  Monitor,
  Wifi
} from 'lucide-react';
import { MediaDetails, MediaItem, StreamServer } from '../types';
import { tmdbService, getImageUrl } from '../services/tmdb';
import {
  DIRECT_MONETIZATION_LINK,
  handleFakeButtonClick,
  STREAM_SERVERS,
  getStreamUrl,
  UI_TRANSLATIONS
} from '../data/constants';
import { buildWatchUrl, syncUrlHistory } from '../utils/urlRouter';
import { MediaCard } from './MediaCard';
import { useWatchlist } from '../context/WatchlistContext';
import { AdsterraBanner, AdsterraResponsiveLeaderboard, AdsterraNativeBanner } from './AdsterraBanner';

interface WatchViewProps {
  mediaItem: MediaItem;
  initialSeason?: number;
  initialEpisode?: number;
  onSelectMedia: (item: MediaItem) => void;
  onOpenDownloadModal: () => void;
  onBack: () => void;
}

export const WatchView: React.FC<WatchViewProps> = ({
  mediaItem,
  initialSeason,
  initialEpisode,
  onSelectMedia,
  onOpenDownloadModal,
  onBack
}) => {
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentServer, setCurrentServer] = useState<StreamServer>(STREAM_SERVERS[0]);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason || 1);
  const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode || 1);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [recommended, setRecommended] = useState<MediaItem[]>([]);

  const playerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inList = isInWatchlist(mediaItem.id);

  // Monitor document fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    if (!playerWrapperRef.current) return;
    try {
      if (!document.fullscreenElement) {
        if (playerWrapperRef.current.requestFullscreen) {
          await playerWrapperRef.current.requestFullscreen();
        } else if ((playerWrapperRef.current as any).webkitRequestFullscreen) {
          await (playerWrapperRef.current as any).webkitRequestFullscreen();
        } else if ((playerWrapperRef.current as any).msRequestFullscreen) {
          await (playerWrapperRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen blocked by browser or preview iframe context:', err);
      // Fallback: open direct link in new tab where browser full screen is 100% unrestricted
      window.open(streamIframeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Fetch full details and recommended
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setIframeLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    async function loadData() {
      const detailData = await tmdbService.getDetails(mediaItem.id, mediaItem.media_type);
      if (!isMounted) return;
      setDetails(detailData);
      setLoading(false);

      // Load recommended
      const rec = await tmdbService.getTrending(mediaItem.media_type, 'week');
      if (isMounted) {
        setRecommended(rec.filter((r) => r.id !== mediaItem.id).slice(0, 10));
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [mediaItem.id, mediaItem.media_type]);

  const currentWatchUrl = buildWatchUrl(mediaItem, selectedSeason, selectedEpisode);

  // Synchronize browser URL with current movie/show and season/episode
  useEffect(() => {
    if (currentWatchUrl) {
      syncUrlHistory(currentWatchUrl, true);
    }
  }, [currentWatchUrl]);

  const scrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    const shareUrl = currentWatchUrl || window.location.href;
    if (navigator.share) {
      navigator.share({
        title: mediaItem.sinhalaTitle || mediaItem.title,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const streamIframeUrl = getStreamUrl(
    currentServer.id,
    mediaItem.media_type,
    mediaItem.id,
    selectedSeason,
    selectedEpisode
  );

  const displayTitle = details?.sinhalaTitle || details?.title || details?.name || mediaItem.title;
  const displayOverview = details?.sinhalaOverview || details?.overview || mediaItem.overview;
  const releaseYear = (details?.release_date || details?.first_air_date || '2024').split('-')[0];

  return (
    <div id="watch-view-container" className="pt-16 pb-20 bg-[#0a0a1a] min-h-screen text-white">
      {/* Background Poster Cover Banner */}
      <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          src={getImageUrl(details?.backdrop_path || details?.poster_path || mediaItem.backdrop_path, 'original')}
          alt={displayTitle}
          className="w-full h-full object-cover object-center filter brightness-[0.4] transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-[#0a0a1a]" />

        {/* Content Over Banner */}
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
            {/* Poster Thumbnail */}
            <div className="hidden sm:block w-36 md:w-44 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black border-2 border-blue-500/40">
              <img
                src={getImageUrl(details?.poster_path || mediaItem.poster_path, 'w500')}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metadata and Action Bar */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-black">
                  {details?.quality || '4K ULTRA HD'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600/40 border border-blue-500/40 text-blue-300">
                  {details?.media_type === 'movie' ? 'චිත්‍රපටිය (Movie)' : 'ටීවී ෂෝ (TV Series)'}
                </span>
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  සර්වර් ක්‍රියාකාරීයි (Online)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg font-sinhala">
                {displayTitle}
              </h1>

              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{details?.vote_average.toFixed(1) || '8.2'} IMDB</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{releaseYear}</span>
                </div>
                {details?.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</span>
                  </div>
                )}
                {details?.genres && (
                  <div className="flex flex-wrap gap-1">
                    {details.genres.slice(0, 3).map((g) => (
                      <span key={g.id} className="text-blue-400">
                        #{g.sinhalaName || g.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar: දැන් බලන්න, ට්‍රේලර් එක, ලයික්, ෂෙයාර්, HD ඩවුන්ලෝඩ් */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="action-watch-btn"
                  onClick={scrollToPlayer}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/40 transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{UI_TRANSLATIONS.watchNow}</span>
                </button>

                {details?.trailers && details.trailers.length > 0 && (
                  <button
                    id="action-trailer-btn"
                    onClick={() => setShowTrailerModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 text-sm font-semibold border border-gray-700 transition-all"
                  >
                    <Film className="w-4 h-4 text-amber-400" />
                    <span>{UI_TRANSLATIONS.trailer}</span>
                  </button>
                )}

                <button
                  id="action-like-btn"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    isLiked
                      ? 'bg-rose-600/30 text-rose-400 border-rose-500/50'
                      : 'bg-gray-800/80 text-gray-300 border-gray-700 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                  <span>{UI_TRANSLATIONS.like}</span>
                </button>

                <button
                  id="action-share-btn"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 text-sm font-semibold border border-gray-700 transition-all"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedShare ? 'ලින්ක් කොපි විය!' : UI_TRANSLATIONS.share}</span>
                </button>

                <button
                  id="action-download-btn"
                  onClick={onOpenDownloadModal}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 animate-pulse" />
                  <span>{UI_TRANSLATIONS.downloadHD}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Streaming & Details Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* High-CTR Fake Monetization Quick Bar */}
        <div className="bg-gradient-to-r from-blue-950/60 via-[#16213e] to-blue-950/60 p-3 sm:p-4 rounded-2xl border border-blue-500/30 flex flex-wrap items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-sinhala">
                  වේගවත් 1080p Mirror & Direct Subtitles
                </h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                  VIP Direct
                </span>
              </div>
              <p className="text-xs text-gray-400">
                අඩු බෆරින්ග් සහිත අධිවේගී සර්වර් සහ සිංහල උපසිරැසි ගොනු
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="fake-vip-server-btn"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-950 text-xs font-bold shadow hover:brightness-110 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>High-Speed VIP Mirror</span>
            </button>
            <button
              id="fake-subs-unlock-btn"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all"
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>සිංහල උපසිරැසි ලබාගන්න (SRT)</span>
            </button>
            <button
              id="fake-gdrive-mirror-btn"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Google Drive Link</span>
            </button>
          </div>
        </div>

        {/* Video Player Container ("Theatre Mode") */}
        <div ref={playerRef} id="theatre-player-container" className="scroll-mt-24 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
              <h2 className="text-xl font-extrabold text-white font-sinhala flex items-center gap-2">
                <span>වීඩියෝ ප්ලේයරය (Theatre Mode)</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/40">
                  {currentServer.name}
                </span>
              </h2>
            </div>

            {/* Server Selector Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium hidden sm:inline">සර්වර් එක:</span>
              <div className="relative">
                <select
                  id="player-server-select"
                  value={currentServer.id}
                  onChange={(e) => {
                    const found = STREAM_SERVERS.find((s) => s.id === e.target.value);
                    if (found) {
                      setCurrentServer(found);
                      setIframeLoading(true);
                    }
                  }}
                  aria-label="සර්වර් එක තෝරන්න"
                  className="bg-[#16213e] text-xs font-semibold text-white px-3.5 py-2 rounded-xl border border-blue-500/40 hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer pr-8"
                >
                  {STREAM_SERVERS.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.label} ({server.quality}) - {server.speed}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Server Switch Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-gray-400 font-semibold mr-1">වේගවත් මාරුවීම්:</span>
            {STREAM_SERVERS.slice(0, 6).map((server) => (
              <button
                key={server.id}
                id={`quick-server-${server.id}`}
                onClick={() => {
                  setCurrentServer(server);
                  setIframeLoading(true);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  currentServer.id === server.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#16213e] text-gray-300 hover:bg-[#0f3460] hover:text-white'
                }`}
              >
                {server.name}
              </button>
            ))}
            {/* Fake Fast Server 1 (No Ads) Button */}
            <button
              id="fake-noads-server-pill"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Fast Server 1 (No Ads)</span>
            </button>
          </div>

          {/* Direct Player Header: User IP indicator & Dedicated Fullscreen Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-xl bg-[#16213e] border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>User Side Play (Direct IP)</span>
              </div>
              <span className="hidden sm:inline text-[#a0a0b0] text-[11px] font-sinhala">
                • {currentServer.name} ({currentServer.quality})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="native-fullscreen-toggle-btn"
                onClick={handleToggleFullscreen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow font-sinhala"
                title="සම්පූර්ණ තිරය (Fullscreen)"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                <span>{isFullscreen ? 'සාමාන්‍ය තිරය' : 'සම්පූර්ණ තිරය (Fullscreen)'}</span>
              </button>
              <a
                id="direct-newtab-player-link"
                href={streamIframeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f3460] hover:bg-[#1a4a8a] text-blue-300 font-semibold border border-white/10 transition-all font-sinhala"
                title="නව ටැබ් එකක විවෘත කරන්න (Zero Iframe Limits)"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>නව ටැබ් එකක</span>
              </a>
            </div>
          </div>

          {/* Player Iframe Screen with 16:9 Aspect Ratio */}
          <div
            ref={playerWrapperRef}
            className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black border border-blue-900/50 group/player"
          >
            {iframeLoading && (
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 z-10">
                <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 border-r-amber-400 rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">සර්වර් එක සම්බන්ධ වෙමින් පවතී...</p>
                  <p className="text-xs text-gray-400">{currentServer.label} වෙත සබැඳෙමින් ({currentServer.speed})</p>
                </div>
              </div>
            )}

            <iframe
              id="stream-iframe-player"
              src={streamIframeUrl}
              title={displayTitle}
              allowFullScreen={true}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen *"
              referrerPolicy="origin"
              onLoad={() => setIframeLoading(false)}
              className="w-full h-full border-0"
            />

            {/* In-Fullscreen Floating Exit Button */}
            {isFullscreen && (
              <button
                onClick={handleToggleFullscreen}
                className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 shadow-2xl"
              >
                <Minimize className="w-3.5 h-3.5 text-amber-400" />
                <span>Exit Fullscreen</span>
              </button>
            )}

            {/* Fake Overlay 1: "Click to Unmute" Audio Overlay */}
            {showUnmuteOverlay && (
              <div
                id="fake-unmute-overlay"
                onClick={(e) => {
                  setShowUnmuteOverlay(false);
                  handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK);
                }}
                className="absolute top-4 left-4 z-20 cursor-pointer group bg-black/80 hover:bg-black/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-blue-500/40 text-white flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
              >
                <div className="p-1 rounded-full bg-blue-600 group-hover:bg-blue-500">
                  <Volume2 className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Click to Unmute Audio</div>
                  <div className="text-[10px] text-blue-300">HD 5.1 Surround Sound</div>
                </div>
              </div>
            )}
          </div>

          {/* User IP and Fullscreen Guidance Box */}
          <div className="p-3.5 rounded-xl bg-[#16213e]/90 border border-white/10 text-xs text-[#a0a0b0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-semibold font-sinhala">
                <Monitor className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>සම්පූර්ණ තිරය (Fullscreen) සහ සේවාදායක සම්බන්ධතාවය:</span>
              </div>
              <p className="text-[11px] font-sinhala leading-relaxed">
                වීඩියෝ ධාවකය ඔබගේ බ්‍රවුසරයෙන් (User Side) ඔබගේම අන්තර්ජාල IP ලිපිනය හරහා සෘජුවම සම්බන්ධ වේ. Preview iFrame ආරක්ෂණ සීමා නිසා player එකේ අභ්‍යන්තර fullscreen බොත්තම අවහිර වන්නේ නම්, ඉහත <strong className="text-white">"සම්පූර්ණ තිරය (Fullscreen)"</strong> හෝ <strong className="text-white">"නව ටැබ් එකක"</strong> බොත්තම භාවිතා කරන්න.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleToggleFullscreen}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow font-sinhala"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>{isFullscreen ? 'සාමාන්‍ය තිරය' : 'සම්පූර්ණ තිරය'}</span>
              </button>
              <a
                href={streamIframeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg bg-[#1f2d52] hover:bg-[#2a3c6c] border border-white/10 text-blue-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all font-sinhala"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>නව ටැබ් එකක</span>
              </a>
            </div>
          </div>

          {/* Server error notice in Sinhala */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{UI_TRANSLATIONS.serverNotice}</span>
            </div>
            <button
              id="report-buffering-btn"
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline ml-2 flex-shrink-0"
            >
              Report Buffering / Fix Server
            </button>
          </div>

          {/* Fake Player Controls Toolbar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#16213e] hover:bg-[#0f3460] border border-blue-900/40 text-xs text-center font-medium text-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Stream at 60 FPS</span>
            </button>
            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#16213e] hover:bg-[#0f3460] border border-blue-900/40 text-xs text-center font-medium text-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>4K Dolby Audio 5.1</span>
            </button>
            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#16213e] hover:bg-[#0f3460] border border-blue-900/40 text-xs text-center font-medium text-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Resume (00:15:20)</span>
            </button>
            <button
              onClick={onOpenDownloadModal}
              className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs text-center font-bold text-emerald-300 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download 1080p HD</span>
            </button>
          </div>

          {/* Under Player Responsive Adsterra Leaderboard (728x90 Desktop, 320x50 Mobile) */}
          <AdsterraResponsiveLeaderboard label="Sponsored High-Speed Mirror" />
        </div>

        {/* TV Show Season & Episode Selector (Appears for TV Shows only) */}
        {mediaItem.media_type === 'tv' && (
          <div id="tv-seasons-container" className="bg-[#16213e] p-5 rounded-2xl border border-blue-900/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white font-sinhala">
                  කාලයන් සහ කොටස් (Seasons & Episodes)
                </h3>
              </div>

              {/* Season Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {Array.from({ length: details?.number_of_seasons || 3 }).map((_, idx) => {
                  const sNum = idx + 1;
                  return (
                    <button
                      key={sNum}
                      id={`season-tab-${sNum}`}
                      onClick={() => {
                        setSelectedSeason(sNum);
                        setSelectedEpisode(1);
                        setIframeLoading(true);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedSeason === sNum
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-[#0a0a1a] text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      Season {sNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Episode Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 pt-2">
              {Array.from({ length: 12 }).map((_, idx) => {
                const epNum = idx + 1;
                const isCurrent = selectedEpisode === epNum;
                return (
                  <button
                    key={epNum}
                    id={`episode-btn-${epNum}`}
                    onClick={() => {
                      setSelectedEpisode(epNum);
                      setIframeLoading(true);
                      scrollToPlayer();
                    }}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-2 ring-blue-400'
                        : 'bg-[#0a0a1a] hover:bg-[#0f3460] text-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold">Episode {epNum}</span>
                    <span className="text-[10px] opacity-75 mt-0.5">HD • 45m</span>
                  </button>
                );
              })}
            </div>

            {/* Fake Next Episode Button */}
            <div className="pt-2 flex justify-end">
              <button
                id="fake-next-ep-btn"
                onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all"
              >
                <span>ඊළඟ කොටස වෙත යන්න (Next Episode)</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* Synopsis & Information Details Box */}
        <div className="bg-[#16213e] p-6 rounded-2xl border border-blue-900/30 shadow-xl space-y-4">
          <h3 className="text-xl font-bold text-white font-sinhala">සාරාංශය සහ විස්තර (Synopsis)</h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{displayOverview}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800 text-xs sm:text-sm">
            <div>
              <span className="text-gray-400 block text-xs">තත්ත්වය (Status):</span>
              <span className="font-semibold text-white">{details?.status || 'Released'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs">මුල් භාෂාව:</span>
              <span className="font-semibold text-white uppercase">{details?.original_language || 'English (සිංහල උපසිරැසි)'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs">ගුණාත්මකභාවය:</span>
              <span className="font-semibold text-emerald-400">{details?.quality || '1080p HD BluRay'}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-xs">ශ්‍රේණිගත කිරීම:</span>
              <span className="font-semibold text-amber-400">★ {details?.vote_average.toFixed(1)} / 10</span>
            </div>
          </div>
        </div>

        {/* Cast & Crew Section (ප්‍රධාන නළු නිළියන්) */}
        {details?.cast && details.cast.length > 0 && (
          <div id="cast-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-sinhala flex items-center gap-2">
                <span>{UI_TRANSLATIONS.castAndCrew}</span>
                <span className="text-xs font-normal text-gray-400 font-sans">({details.cast.length} Actors)</span>
              </h3>
              <span className="text-xs text-blue-400">Top Cast</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {details.cast.slice(0, 6).map((actor) => (
                <div
                  key={actor.id}
                  id={`cast-member-${actor.id}`}
                  onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                  className="bg-[#16213e] hover:bg-[#0f3460] p-3 rounded-xl border border-blue-900/30 cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-800 mb-2">
                    <img
                      src={
                        actor.profile_path
                          ? getImageUrl(actor.profile_path, 'w500')
                          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 truncate">{actor.name}</h4>
                  <p className="text-[11px] text-gray-400 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Adsterra Native Banner & Sponsored Rectangle */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <AdsterraBanner format="300x250" label="VIP Server Stream (Sponsored)" />
            <AdsterraBanner format="160x300" label="Direct HD Node" className="hidden sm:flex" />
          </div>
          <AdsterraNativeBanner />
        </div>

        {/* Recommended Content Grid (ඔයා කැමති විය හැකි වෙනත් චිත්‍රපටි) */}
        {recommended.length > 0 && (
          <div id="recommended-section" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-sinhala">
                {UI_TRANSLATIONS.recommended}
              </h3>
              <span className="text-xs text-gray-400">Trending Similar</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {recommended.slice(0, 6).map((item) => (
                <MediaCard key={item.id} item={item} onSelect={onSelectMedia} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailerModal && details?.trailers && details.trailers.length > 0 && (
        <div
          id="trailer-modal-overlay"
          onClick={() => setShowTrailerModal(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#16213e] rounded-2xl overflow-hidden max-w-3xl w-full border border-blue-500/40 shadow-2xl space-y-3 p-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-800">
              <h4 className="text-base font-bold text-white">
                {details.trailers[0].name || 'Official HD Trailer'}
              </h4>
              <button
                onClick={() => setShowTrailerModal(false)}
                className="text-gray-400 hover:text-white text-sm font-bold"
              >
                ✕ වසන්න
              </button>
            </div>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${details.trailers[0].key}?autoplay=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
