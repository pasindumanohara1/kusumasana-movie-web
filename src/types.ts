export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: number;
  title: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count?: number;
  media_type: MediaType;
  genre_ids?: number[];
  popularity?: number;
  quality?: '4K' | 'HD' | 'CAM' | 'TS';
  sinhalaTitle?: string;
  sinhalaOverview?: string;
  duration?: string;
  imdb_id?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface SeasonInfo {
  season_number: number;
  name: string;
  episode_count: number;
  poster_path?: string | null;
}

export interface EpisodeInfo {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  still_path: string | null;
  air_date?: string;
  vote_average?: number;
  runtime?: number;
}

export interface MediaDetails extends MediaItem {
  genres: { id: number; name: string; sinhalaName?: string }[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  tagline?: string;
  cast: CastMember[];
  trailers: VideoTrailer[];
  seasons?: SeasonInfo[];
}

export interface StreamServer {
  id: string;
  name: string;
  label: string;
  quality: '4K' | '1080p' | '720p' | 'Auto';
  speed: string;
  isVip?: boolean;
  isAdFree?: boolean;
}

export interface FilterState {
  genre: string;
  year: string;
  sortBy: string;
}

export interface FakeButtonIdea {
  id: string;
  title: string;
  sinhalaTitle: string;
  category: string;
  description: string;
  iconName: string;
  badge?: string;
  colorClass?: string;
}
