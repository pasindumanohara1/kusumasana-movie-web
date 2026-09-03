import type React from 'react';
import { FakeButtonIdea, StreamServer } from '../types';

export const DIRECT_MONETIZATION_LINK =
  'https://www.profitableratecpmnetwork.com/etgx4q8yi?key=842d286abb0aa3932f0e0ca01c3b3e8f';

// Modern Sinhala UI Translation Dictionary
export const UI_TRANSLATIONS = {
  // Navigation
  home: 'මුල් පිටුව',
  movies: 'චිත්‍රපටි',
  tvShows: 'ටීවී ෂෝ',
  myList: 'මගේ ලිස්ට් එක',
  downloadHD: 'HD ඩවුන්ලෝඩ්',
  searchPlaceholder: 'චිත්‍රපටි, ටීවී ෂෝ සර්ච් කරන්න...',
  
  // Hero Section
  trendingNow: 'දැන් ට්‍රෙන්ඩින්',
  watchNow: 'දැන් බලන්න',
  moreInfo: 'තව විස්තර',
  
  // Section Headers
  popularMovies: 'ජනප්‍රිය චිත්‍රපටි',
  popularTvShows: 'ජනප්‍රිය ටීවී ෂෝ',
  popularTVShows: 'ජනප්‍රිය ටීවී ෂෝ',
  topRated: 'ඉහළම ඇගයුම්',
  trendingThisWeek: 'මේ සතියේ ට්‍රෙන්ඩින්',
  viewAll: 'සියල්ල බලන්න',
  
  // Filters & Sorting
  allGenres: 'සියලුම වර්ග',
  allYears: 'සියලුම අවුරුදු',
  mostPopular: 'වඩාත්ම ජනප්‍රිය',
  highestRated: 'ඉහළම ඇගයුම්',
  newest: 'අලුත්ම නිකුත් කිරීම්',
  
  // Empty State (My List)
  emptyListTitle: 'ඔයාගේ ලිස්ට් එක හිස්',
  emptyListSubtitle: 'ඔයා බලන්න ආස චිත්‍රපටි සහ ටීවී ෂෝ පසුව බලන්න මෙතැන සේව් කරගන්න.',
  emptyListInstruction: 'චිත්‍රපටියක හෝ ටීවී ෂෝ එකක ඇති + බටන් එක ඔබා එකතු කරගන්න.',
  
  // Watch & Player
  serverNotice: 'වීඩියෝව වාදනය නොවන්නේ නම් වෙනත් සර්වර් එකක් තෝරන්න.',
  castAndCrew: 'ප්‍රධාන නළු නිළියන්',
  recommended: 'ඔයා කැමති විය හැකි වෙනත් චිත්‍රපටි',
  trailer: 'ට්‍රේලර් එක',
  like: 'ලයික්',
  share: 'ෂෙයාර්',
  seasons: 'කාලයන් (Seasons)',
  episodes: 'කොටස් (Episodes)',
  nextEpisode: 'ඊළඟ කොටස',
  theaterMode: 'තීටර් මොඩ්',
  
  // Footer & Royal
  copyright: '© 2026 කුසුමාසන දේවි Cinema (Vidbanda/SFlix Engine). සියලුම හිමිකම් ඇවිරිණි.',
  disclaimer: 'TMDB API මගින් සබඳතාවය ලබාගෙන ඇත. අපි කිසිදු වීඩියෝ ගොනුවක් අපගේ සර්වර් වල තබා නොගනිමු.',
  queenTributeTitle: 'කුසුමාසන දේවිය (දෝන කැතරිනා රැජිණ)',
  queenSubtitle: 'උඩරට රාජධානියේ පිරිසිදු රාජකීය ලේ උරුමය - සිරි සඟබෝ රාජ වංශය'
};

// 14 Iframe Stream Providers with URL generation rules
export const STREAM_SERVERS: StreamServer[] = [
  { id: 'vidsrc-me', name: 'VidSrc.me', label: 'Server 1 (VidSrc Cloud)', quality: '1080p', speed: 'Ultra Fast' },
  { id: 'vidlink', name: 'VidLink Pro', label: 'Server 2 (VidLink HLS)', quality: '4K', speed: 'Fastest' },
  { id: 'superembed', name: 'SuperEmbed', label: 'Server 3 (MultiEmbed)', quality: '1080p', speed: 'Ultra' },
  { id: 'vidsrc-to', name: 'VidSrc.to', label: 'Server 4 (VidSrc Official)', quality: '1080p', speed: 'Fast' },
  { id: 'embed-su', name: 'Embed.su', label: 'Server 5 (Embed SU Multi)', quality: '1080p', speed: 'Ultra' },
  { id: 'vidbinge', name: 'VidBinge', label: 'Server 6 (VidBinge Core)', quality: '1080p', speed: 'Stable' },
  { id: 'two-embed', name: '2Embed', label: 'Server 7 (2Embed CDN)', quality: '720p', speed: 'Fast' },
  { id: 'vidsrc-cc', name: 'VidSrc.cc', label: 'Server 8 (VidSrc V2)', quality: '1080p', speed: 'Fast' },
  { id: 'vidsrc-in', name: 'VidSrc.in', label: 'Server 9 (VidSrc India/Asia)', quality: '1080p', speed: 'Fast' },
  { id: 'vidsrc-xyz', name: 'VidSrc.xyz', label: 'Server 10 (VidSrc XYZ)', quality: '1080p', speed: 'Good' },
  { id: 'vidsrc-net', name: 'VidSrc.net', label: 'Server 11 (VidSrc Net Mirror)', quality: '1080p', speed: 'Good' },
  { id: 'vidsrc-pro', name: 'VidSrc.pro', label: 'Server 12 (Pro VIP Node)', quality: '4K', speed: 'VIP Ultra', isVip: true },
  { id: 'vidsrc-pm', name: 'VidSrc.pm', label: 'Server 13 (VidSrc PM)', quality: '1080p', speed: 'Good' },
  { id: 'frembed', name: 'Frembed', label: 'Server 14 (Global Stream)', quality: '720p', speed: 'Standard' },
];

export function getStreamUrl(
  serverId: string,
  mediaType: 'movie' | 'tv',
  id: number | string,
  season: number = 1,
  episode: number = 1
): string {
  switch (serverId) {
    case 'vidlink':
      return mediaType === 'movie'
        ? `https://vidlink.pro/movie/${id}?primaryColor=3b82f6`
        : `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=3b82f6`;
    case 'superembed':
      return mediaType === 'movie'
        ? `https://multiembed.mov/?video_id=${id}&tmdb=1`
        : `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
    case 'embed-su':
      return mediaType === 'movie'
        ? `https://embed.su/embed/movie/${id}`
        : `https://embed.su/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-to':
      return mediaType === 'movie'
        ? `https://vidsrc.to/embed/movie/${id}`
        : `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
    case 'vidbinge':
      return mediaType === 'movie'
        ? `https://vidbinge.dev/embed/movie/${id}`
        : `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`;
    case 'two-embed':
      return mediaType === 'movie'
        ? `https://www.2embed.cc/embed/${id}`
        : `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
    case 'vidsrc-cc':
      return mediaType === 'movie'
        ? `https://vidsrc.cc/v2/embed/movie/${id}`
        : `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-in':
      return mediaType === 'movie'
        ? `https://vidsrc.in/embed/movie/${id}`
        : `https://vidsrc.in/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-xyz':
      return mediaType === 'movie'
        ? `https://vidsrc.xyz/embed/movie/${id}`
        : `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-net':
      return mediaType === 'movie'
        ? `https://vidsrc.net/embed/movie/${id}`
        : `https://vidsrc.net/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-pro':
      return mediaType === 'movie'
        ? `https://vidsrc.pro/embed/movie/${id}`
        : `https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`;
    case 'vidsrc-pm':
      return mediaType === 'movie'
        ? `https://vidsrc.pm/embed/movie/${id}`
        : `https://vidsrc.pm/embed/tv/${id}/${season}/${episode}`;
    case 'frembed':
      return mediaType === 'movie'
        ? `https://frembed.top/api/film.php?id=${id}`
        : `https://frembed.top/api/serie.php?id=${id}&sa=${season}&epi=${episode}`;
    case 'vidsrc-me':
    default:
      return mediaType === 'movie'
        ? `https://vidsrc.me/embed/movie?tmdb=${id}`
        : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  }
}

// 20 High-CTR Fake Buttons Ideas matching the specification
export const FAKE_BUTTONS_20: FakeButtonIdea[] = [
  {
    id: 'download-1080p',
    title: 'Download 1080p HD / 4K',
    sinhalaTitle: '4K / 1080p HD ඩවුන්ලෝඩ්',
    category: 'download',
    description: 'High-intent placement right below the hero video player.',
    iconName: 'Download',
    badge: '1080p Ultra',
    colorClass: 'bg-emerald-600 hover:bg-emerald-500 text-white'
  },
  {
    id: 'fast-server-no-ads',
    title: 'Fast Server 1 (No Ads)',
    sinhalaTitle: 'වේගවත් සර්වර් 1 (දැන්වීම් රහිත)',
    category: 'player',
    description: 'Fake server selector tab above the video container.',
    iconName: 'Zap',
    badge: 'No Ads',
    colorClass: 'bg-blue-600 hover:bg-blue-500 text-white'
  },
  {
    id: 'unlock-sinhala-subs',
    title: 'Unlock Sinhala Subtitles',
    sinhalaTitle: 'සිංහල උපසිරැසි ලබාගන්න',
    category: 'subtitles',
    description: 'Button directly below the video screen.',
    iconName: 'Subtitles',
    badge: 'සිංහල SRT',
    colorClass: 'bg-amber-600 hover:bg-amber-500 text-white'
  },
  {
    id: 'play-official-trailer',
    title: 'Play Official Trailer',
    sinhalaTitle: 'නිල ට්‍රේලර් පටය නරඹන්න',
    category: 'media',
    description: 'Overlay button sitting over the thumbnail preview.',
    iconName: 'Film',
    badge: 'Trailer',
    colorClass: 'bg-indigo-600 hover:bg-indigo-500 text-white'
  },
  {
    id: 'click-to-unmute',
    title: 'Click to Unmute Audio',
    sinhalaTitle: 'ශබ්දය සක්‍රීය කරන්න (Unmute)',
    category: 'overlay',
    description: 'Transparent overlay covering video frame with speaker icon.',
    iconName: 'Volume2',
    badge: 'HD Audio',
    colorClass: 'bg-slate-800/90 text-white border border-slate-700'
  },
  {
    id: 'hd-stream-boost',
    title: 'Instant 1080p Stream Booster',
    sinhalaTitle: 'වේගවත් HD ප්‍රවාහය (Instant Booster)',
    category: 'player',
    description: 'Direct bufferless high-speed video server stream.',
    iconName: 'Zap',
    badge: 'Fast HD',
    colorClass: 'bg-[#16213e] text-blue-400 border border-blue-500/30'
  },
  {
    id: 'vip-mirror',
    title: 'High-Speed VIP Mirror',
    sinhalaTitle: 'අධිවේගී VIP සර්වර් කැඩපත',
    category: 'player',
    description: 'Alternate server option styled in gold or red.',
    iconName: 'Crown',
    badge: 'VIP Server',
    colorClass: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-950 font-bold'
  },
  {
    id: 'torrent-download',
    title: 'Download Torrent File (.torrent)',
    sinhalaTitle: 'ටොරන්ට් ගොනුව බාගන්න (.torrent)',
    category: 'download',
    description: 'Secondary download section link with high peer seed count.',
    iconName: 'FileArchive',
    badge: '1.4k Seeds',
    colorClass: 'bg-teal-700 hover:bg-teal-600 text-white'
  },
  {
    id: 'stream-60fps',
    title: 'Stream at 60 FPS',
    sinhalaTitle: '60 FPS වලින් සුමටව බලන්න',
    category: 'player',
    description: 'Video quality setting button near player bar.',
    iconName: 'Sliders',
    badge: '60 FPS Pro',
    colorClass: 'bg-sky-600 hover:bg-sky-500 text-white'
  },
  {
    id: 'gdrive-link',
    title: 'Direct Google Drive Link',
    sinhalaTitle: 'Google Drive සෘජු ලින්ක් එක',
    category: 'download',
    description: 'Highly clicked cloud mirror button.',
    iconName: 'HardDrive',
    badge: 'Google Drive',
    colorClass: 'bg-blue-700 hover:bg-blue-600 text-white'
  },
  {
    id: 'age-verify-18',
    title: 'Verify Age (18+) to Continue',
    sinhalaTitle: 'වීඩියෝව බැලීමට වයස තහවුරු කරන්න (18+)',
    category: 'gate',
    description: 'Gatekeeper button shown before loading video.',
    iconName: 'ShieldAlert',
    badge: 'Age 18+',
    colorClass: 'bg-rose-700 hover:bg-rose-600 text-white'
  },
  {
    id: 'download-srt-sub',
    title: 'Download Sinhala Subtitle (.SRT)',
    sinhalaTitle: 'සිංහල උපසිරැසි (.SRT) බාගන්න',
    category: 'subtitles',
    description: 'Separate file download button for media players.',
    iconName: 'FileText',
    badge: 'Baiscope/Cinesubz',
    colorClass: 'bg-amber-700 hover:bg-amber-600 text-white'
  },
  {
    id: 'report-buffering',
    title: 'Report Buffering / Fix Server',
    sinhalaTitle: 'වීඩියෝව හිරවෙයි නම් සර්වර් එක සකසන්න',
    category: 'support',
    description: 'Technical support button near playback controls.',
    iconName: 'Wrench',
    badge: 'Fix Buffer',
    colorClass: 'bg-slate-700 hover:bg-slate-600 text-slate-200'
  },
  {
    id: 'watch-fullscreen',
    title: 'Watch in Full Screen Mode',
    sinhalaTitle: 'සම්පූර්ණ තිරයෙන් නරඹන්න (Full Screen)',
    category: 'player',
    description: 'Player control button that redirects upon click.',
    iconName: 'Maximize2',
    badge: 'Theater',
    colorClass: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
  },
  {
    id: 'close-ad-x',
    title: 'Close Ad [X]',
    sinhalaTitle: 'දැන්වීම වසන්න [X]',
    category: 'ad',
    description: 'Floating banner close icon positioned on top of media card.',
    iconName: 'X',
    badge: 'Ad',
    colorClass: 'bg-black/80 text-white hover:bg-red-600'
  },
  {
    id: 'resume-playback',
    title: 'Resume Playback from 00:15:20',
    sinhalaTitle: 'නතර කළ තැනින් නැවත බලන්න (00:15:20)',
    category: 'overlay',
    description: 'Fake playback state overlay banner.',
    iconName: 'RotateCcw',
    badge: 'Resume',
    colorClass: 'bg-indigo-900/90 text-white border border-indigo-500'
  },
  {
    id: 'watch-no-registration',
    title: 'Watch Without Registration',
    sinhalaTitle: 'ලියාපදිංචි නොවී සෘජුවම බලන්න',
    category: 'cta',
    description: 'CTA badge targeting guest visitors.',
    iconName: 'Unlock',
    badge: 'Free Access',
    colorClass: 'bg-emerald-700 hover:bg-emerald-600 text-white'
  },
  {
    id: 'stream-app-mobile',
    title: 'Stream on Android / iOS App',
    sinhalaTitle: 'Android / iOS App එකෙන් බලන්න',
    category: 'mobile',
    description: 'Mobile-specific download/stream banner.',
    iconName: 'Smartphone',
    badge: 'APK / IPA',
    colorClass: 'bg-violet-700 hover:bg-violet-600 text-white'
  },
  {
    id: 'dolby-audio-51',
    title: '4K Audio Track 5.1 Dolby Atmos',
    sinhalaTitle: 'Dolby Atmos 5.1 හඬ පටය තෝරන්න',
    category: 'audio',
    description: 'Audio selection option inside media settings.',
    iconName: 'Headphones',
    badge: 'Dolby 5.1',
    colorClass: 'bg-purple-800 hover:bg-purple-700 text-white'
  },
  {
    id: 'next-episode-btn',
    title: 'Next Episode / ඊළඟ කොටස',
    sinhalaTitle: 'ඊළඟ කොටස වෙත යන්න (Next Episode)',
    category: 'player',
    description: 'Pagination-style button on TV show detail pages.',
    iconName: 'SkipForward',
    badge: 'Next Ep',
    colorClass: 'bg-blue-600 hover:bg-blue-500 text-white'
  }
];

/**
 * Tabunder redirection logic:
 * Opens the user's exact current media or browse content in a new tab
 * using deep-linked search parameters (?watch=... or ?tab=...),
 * while redirecting the parent tab to the target monetized smartlink.
 */
export function handleFakeButtonClick(
  event?: React.MouseEvent | Event,
  directLinkUrl: string = DIRECT_MONETIZATION_LINK,
  actualContentUrl?: string
) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const currentUrl = actualContentUrl || (typeof window !== 'undefined' ? window.location.href : '/');

  try {
    // 1. Open the exact current movie/browse page in a new tab
    const newTab = window.open(currentUrl, '_blank');
    if (newTab) {
      newTab.focus();
    }
  } catch (err) {
    console.debug('Popup blocker prevented tab creation', err);
  }

  // 2. Redirect the current tab to the direct smartlink / monetized ad link
  if (typeof window !== 'undefined') {
    window.location.href = directLinkUrl;
  }
}

// Historical details of Queen Kusumasana Devi (දෝන කැතරිනා රැජිණ)
export const QUEEN_KUSUMASANA_DEVI_HISTORY = {
  name: 'කුසුම් අස්ථාන දෝන කතරිනා ලෝකනාථා මහා බිසෝ බණ්ඩාර',
  title: 'උඩරට රැජිණ / මහනුවර රැජින (Queen of Kandy)',
  reign: '1581 - 1592',
  dynasty: 'සිරි සඟබෝ රාජ වංශය (Siri Sangabo Dynasty)',
  father: 'කරලියැද්දේ බණ්ඩාර රජ (King Karaliyadde Bandara)',
  mother: 'ගලඋඩ අස්ථාන දේවීය',
  spouse: 'දොන් පිලිප් කුමාරයා හෙවත් යමසිංහ බණ්ඩාර, පළමුවන විමලධර්ම සූරිය රජු, සෙනරත් රජු',
  children: [
    'මහඅස්ථාන කුමරු (මරණය 1612 අගෝස්තු 23)',
    'සූරිය දේවි (මරණය 1617)',
    'සාම දේවී',
    'කුමාරසිංහ හස්තානේ (ඌව)',
    'විජයපාල (මාතලේ අධිකාරී)',
    'දේව අස්ථාන කුමරු'
  ],
  burial: 'අස්ගිරිය සුසාන භූමිය, වර්තමාන අස්ගිරි මහා විහාරය',
  tribute:
    'මහනුවර රාජධානියේ විසූ එකම පිරිසිදු සිංහල රාජකීය ලේ උරුමය සහිත එකම බිසව වූයේ කුසුමාසන දේවිය හෙවත් දෝන කැතරිනා රැජිනයි. කුඩා කල සිට රාජ්‍යත්වයට තිබූ උරුමය නිසා බොහෝ දුක් ගැහැට වලට මුහුණ දුන් බැවින්, කුසුමාසන දේවිය සිංහල රාජාවලියේ "කඳුළු බිංදුව" ලෙසින් ඉතිහාසයට එක්ව ඇත.',
  historySummary:
    'සීතාවක පළමුවන රාජසිංහ රජු උඩරට ආක්‍රමණය කළ පසු, කරලියැද්දේ බණ්ඩාර රජුගේ දියණිය වූ කුසුමාසන දේවිය රැකවරණ පතා පෘතුගීසීන් වෙත ගොස් දෝන කැතරිනා ලෙස නම් ලැබුවාය. පසුව උඩරට සිහසුනට පත් පළමුවන විමලධර්මසූරිය රජු ඇයව සරණපාවා ගනිමින් උඩරට රාජ්‍යයේ සිංහල රාජකීය උරුමය තහවුරු කළේය.'
};
