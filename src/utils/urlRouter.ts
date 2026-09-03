import { MediaItem } from '../types';

export interface ParsedUrlState {
  watchId: number | null;
  mediaType: 'movie' | 'tv';
  title: string;
  season: number;
  episode: number;
  tab: string;
  page: number;
}

/**
 * Parses current window.location.search into typed application state
 */
export function parseUrlState(): ParsedUrlState {
  if (typeof window === 'undefined') {
    return {
      watchId: null,
      mediaType: 'movie',
      title: '',
      season: 1,
      episode: 1,
      tab: 'home',
      page: 1
    };
  }

  const params = new URLSearchParams(window.location.search);
  const watchParam = params.get('watch');
  const watchId = watchParam ? parseInt(watchParam, 10) : null;
  const mediaType = params.get('type') === 'tv' ? 'tv' : 'movie';
  const title = params.get('title') || '';
  const season = parseInt(params.get('s') || '1', 10) || 1;
  const episode = parseInt(params.get('e') || '1', 10) || 1;
  const tab = params.get('tab') || 'home';
  const page = parseInt(params.get('page') || '1', 10) || 1;

  return {
    watchId: isNaN(watchId as number) ? null : watchId,
    mediaType,
    title,
    season,
    episode,
    tab,
    page
  };
}

/**
 * Builds an absolute deep-link URL for watching a movie or TV show
 */
export function buildWatchUrl(
  item: { id: number; media_type?: string; title?: string; name?: string },
  season?: number,
  episode?: number
): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('watch', String(item.id));
  url.searchParams.set('type', item.media_type || 'movie');
  
  const title = item.title || item.name;
  if (title) {
    url.searchParams.set('title', title);
  }

  if (item.media_type === 'tv') {
    if (season && season > 0) url.searchParams.set('s', String(season));
    if (episode && episode > 0) url.searchParams.set('e', String(episode));
  }

  return url.toString();
}

/**
 * Builds an absolute deep-link URL for browsing tabs and pagination
 */
export function buildTabUrl(tab: string = 'home', page: number = 1): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  if (tab && tab !== 'home') {
    url.searchParams.set('tab', tab);
    if (page > 1) {
      url.searchParams.set('page', String(page));
    }
  }
  return url.toString();
}

/**
 * Pushes updated URL to browser history
 */
export function syncUrlHistory(newUrl: string, replace: boolean = false) {
  if (typeof window === 'undefined') return;
  try {
    if (replace) {
      window.history.replaceState({ url: newUrl }, '', newUrl);
    } else {
      window.history.pushState({ url: newUrl }, '', newUrl);
    }
  } catch (err) {
    console.debug('Error updating history state:', err);
  }
}
