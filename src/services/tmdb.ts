import { CastMember, MediaDetails, MediaItem, SeasonInfo, FilterState } from '../types';

const API_KEY = 'aa4f947818d885e4addb8684a408dbaf';
const BASE_URL = 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_W1280_URL = 'https://image.tmdb.org/t/p/w1280';
export const IMAGE_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original';

export function getImageUrl(path: string | null, size: 'w500' | 'w1280' | 'original' = 'w500'): string {
  if (!path) {
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80';
  }
  if (path.startsWith('http')) return path;
  const baseUrl = size === 'original' ? IMAGE_ORIGINAL_URL : size === 'w1280' ? IMAGE_W1280_URL : IMAGE_BASE_URL;
  return `${baseUrl}${path}`;
}

// Curated Sinhala & Global Cinema Spotlight items
export const CURATED_FEATURED_ITEMS: MediaItem[] = [
  {
    id: 933260,
    title: 'The Substance',
    original_title: 'The Substance',
    overview: 'A fading celebrity uses a black-market cell-replicating substance that temporarily creates a younger, better version of herself.',
    sinhalaTitle: 'ද සබ්ස්ටන්ස් (The Substance)',
    sinhalaOverview: 'වයස්ගත වන ප්‍රසිද්ධ නිළියක් තරුණ හා වඩාත් ආකර්ෂණීය ස්වරූපයක් ලබාගැනීමට රහසිගත ඖෂධයක් භාවිත කරයි. සම්පූර්ණ චිත්‍රපටිය සිංහල උපසිරැසි සමඟින්.',
    poster_path: '/lqoMzCcZY5yg5y2chAjQ44EVLgw.jpg',
    backdrop_path: '/7h6r93ooEjGQtICVgCyv4X9LCSQ.jpg',
    release_date: '2024-09-18',
    vote_average: 7.3,
    vote_count: 2450,
    media_type: 'movie',
    quality: '4K',
    duration: '2h 21m',
    imdb_id: 'tt17526714'
  },
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    original_title: 'Deadpool & Wolverine',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary behind him.',
    sinhalaTitle: 'ඩෙඩ්පූල් සහ වුල්වරින් (Deadpool & Wolverine)',
    sinhalaOverview: 'තම සුපුරුදු සටන් දිවියෙන් ඈත්ව සිටින වේඩ් විල්සන් ලෝකය බේරාගැනීම වෙනුවෙන් වුල්වරින් සමඟ අත්වැල් බැඳගනී. 1080p HD ගුණාත්මකභාවයෙන්.',
    poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: '/yDHYTjA3R0jFYba16jBB1jv82E9.jpg',
    release_date: '2024-07-24',
    vote_average: 7.7,
    vote_count: 5120,
    media_type: 'movie',
    quality: '4K',
    duration: '2h 8m',
    imdb_id: 'tt6263850'
  },
  {
    id: 945961,
    title: 'Alien: Romulus',
    original_title: 'Alien: Romulus',
    overview: 'While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
    sinhalaTitle: 'ඒලියන්: රොමියුලස් (Alien: Romulus)',
    sinhalaOverview: 'අභ්‍යවකාශ ගවේෂණ කණ්ඩායමක් පාළු අභ්‍යවකාශ මධ්‍යස්ථානයකදී විශ්වයේ අතිශය බිහිසුණුම ජීවියාට මුහුණ දෙයි.',
    poster_path: '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
    backdrop_path: '/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg',
    release_date: '2024-08-13',
    vote_average: 7.2,
    vote_count: 1800,
    media_type: 'movie',
    quality: 'HD',
    duration: '1h 59m',
    imdb_id: 'tt18412256'
  },
  {
    id: 1034541,
    title: 'Terrifier 3',
    original_title: 'Terrifier 3',
    overview: 'Art the Clown is set to unleash another round of chaos on the unsuspecting residents of Miles County.',
    sinhalaTitle: 'ටෙරිෆයර් 3 (Terrifier 3)',
    sinhalaOverview: 'නත්තල් සමයේ මයිල්ස් කවුන්ටිය භීතියට පත් කරමින් ආර්ට් ක්ලවුන් නැවත පැමිණෙයි.',
    poster_path: '/l1175hgL5doXnqeZQThqhQZ5Wq2.jpg',
    backdrop_path: '/xlkclSE40xBiiLlCPW1yAT0PVGX.jpg',
    release_date: '2024-10-09',
    vote_average: 6.9,
    vote_count: 1100,
    media_type: 'movie',
    quality: 'HD',
    duration: '2h 5m'
  },
  {
    id: 1184918,
    title: 'The Wild Robot',
    original_title: 'The Wild Robot',
    overview: 'After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island.',
    sinhalaTitle: 'ද වයිල්ඩ් රොබෝට් (The Wild Robot)',
    sinhalaOverview: 'නියමු රහිත දූපතකට ඇදවැටෙන බුද්ධිමත් රොබෝවරයෙකු වන රොස්, වන සතුන් සමඟ ඇතිකරගන්නා අපූරු බැඳීම.',
    poster_path: '/wTnV3PCVW5O92JMrFvvrRilWUK.jpg',
    backdrop_path: '/417tYZ4XUyJr6LHf3TmZu6x0eo6.jpg',
    release_date: '2024-09-12',
    vote_average: 8.4,
    vote_count: 2800,
    media_type: 'movie',
    quality: '4K',
    duration: '1h 42m'
  },
  {
    id: 912649,
    title: 'Venom: The Last Dance',
    original_title: 'Venom: The Last Dance',
    overview: 'Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision.',
    sinhalaTitle: 'වෙනම්: ද ලාස්ට් ඩාන්ස් (Venom: The Last Dance)',
    sinhalaOverview: 'එඩී සහ වෙනම් දෙදෙනාම ලෝක දෙකකින් හඹා යන සතුරන්ගෙන් බේරීමට දරන අවසන් සටන.',
    poster_path: '/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
    backdrop_path: '/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
    release_date: '2024-10-22',
    vote_average: 6.8,
    vote_count: 1950,
    media_type: 'movie',
    quality: 'HD',
    duration: '1h 49m'
  },
  {
    id: 94605,
    title: 'Arcane',
    name: 'Arcane: League of Legends',
    overview: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and convicting beliefs.',
    sinhalaTitle: 'ආර්කේන් (Arcane: Season 2)',
    sinhalaOverview: 'පිල්ටෝවර් සහ සෝන් නගර දෙක අතර මායාව හා තාක්ෂණය රැගත් සහෝදරියන් දෙදෙනාගේ ගැටුම.',
    poster_path: '/fqldf2t8ztc9aiwn397rHgYeRvy.jpg',
    backdrop_path: '/2meX1nMdScFOoV4370rqHWFDxZ2.jpg',
    first_air_date: '2021-11-06',
    vote_average: 8.7,
    vote_count: 3800,
    media_type: 'tv',
    quality: '4K',
    duration: '2 Seasons'
  },
  {
    id: 114472,
    title: 'The Penguin',
    name: 'The Penguin',
    overview: 'Follow Oswald "Oz" Cobb’s quest for control in Gotham City after Carmine Falcone’s death leaves a power vacuum.',
    sinhalaTitle: 'ද පෙන්ගුවින් (The Penguin: HBO)',
    sinhalaOverview: 'ගෝතම් නගරයේ පාතාල බලය අල්ලාගැනීමට ඔස්වල්ඩ් කොබ් දියත් කරන රහස් මෙහෙයුම.',
    poster_path: '/aX1tS8xNl7Jj2T84a8zE4856xLq.jpg',
    backdrop_path: '/9h2q1X7zS2r3Xf94xZ9z3p2x8R.jpg',
    first_air_date: '2024-09-19',
    vote_average: 8.5,
    vote_count: 1450,
    media_type: 'tv',
    quality: '4K',
    duration: '1 Season'
  },
  {
    id: 106379,
    title: 'Fallout',
    name: 'Fallout',
    overview: 'The story of haves and have-nots in a world in which there’s almost nothing left to have. 200 years after the apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape.',
    sinhalaTitle: 'ෆෝල්අවුට් (Fallout TV Series)',
    sinhalaOverview: 'න්‍යෂ්ටික යුද්ධයෙන් වසර 200 කට පසු පොළොව යට සුරක්ෂිතාගාර වලින් එළියට පැමිණෙන මිනිසුන්ගේ අරගලය.',
    poster_path: '/AnsSKR99F0gA045tG9i2pSjYq4R.jpg',
    backdrop_path: '/inJjDhCjfhh3SVgGqVq12v2dE7o.jpg',
    first_air_date: '2024-04-10',
    vote_average: 8.4,
    vote_count: 2200,
    media_type: 'tv',
    quality: '4K',
    duration: '1 Season'
  },
  {
    id: 1399,
    title: 'Game of Thrones',
    name: 'Game of Thrones',
    overview: 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.',
    sinhalaTitle: 'ගේම් ඔෆ් ත්‍රෝන්ස් (Game of Thrones)',
    sinhalaOverview: 'වෙස්ටරෝස් රාජධානියේ යකඩ සිහසුන වෙනුවෙන් රාජකීය පවුල් අතර සිදුවන මහා ලේවැකි සටන.',
    poster_path: '/1XS11n8jQngrIMW42umT45pW1v0.jpg',
    backdrop_path: '/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
    first_air_date: '2011-04-17',
    vote_average: 8.4,
    vote_count: 23400,
    media_type: 'tv',
    quality: '4K',
    duration: '8 Seasons'
  },
  {
    id: 603,
    title: 'The Matrix',
    original_title: 'The Matrix',
    overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
    sinhalaTitle: 'ද මැට්‍රික්ස් (The Matrix)',
    sinhalaOverview: 'මනුෂ්‍ය වර්ගයා පරිගණක මායාවක සිරවී ඇති බව සොයාගන්නා නියෝ සත්‍ය ලෝකය මුදාගැනීමට සටන් වදී.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop_path: '/l4QHerTSbflrqeuujPt069d121o.jpg',
    release_date: '1999-03-30',
    vote_average: 8.2,
    vote_count: 25100,
    media_type: 'movie',
    quality: '4K',
    duration: '2h 16m',
    imdb_id: 'tt0133093'
  },
  {
    id: 157336,
    title: 'Interstellar',
    original_title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    sinhalaTitle: 'ඉන්ටර්ස්ටෙලර් (Interstellar)',
    sinhalaOverview: 'මිහිමත මානව වර්ගයා වඳවී යාමේ තර්ජනයට මුහුණදෙද්දී අභ්‍යවකාශ ගවේෂකයන් පිරිසක් නව නිවහනක් සෙවීමේ අභියෝගාත්මක ගමනක යෙදෙයි.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    release_date: '2014-11-05',
    vote_average: 8.4,
    vote_count: 34500,
    media_type: 'movie',
    quality: '4K',
    duration: '2h 49m',
    imdb_id: 'tt0816692'
  }
];

// Fallback genres mapping
export const GENRE_MAP: Record<number, { en: string; si: string }> = {
  28: { en: 'Action', si: 'ක්‍රියාදාම' },
  12: { en: 'Adventure', si: 'ත්‍රාසජනක' },
  16: { en: 'Animation', si: 'සජීවිකරණ' },
  35: { en: 'Comedy', si: 'විකට' },
  80: { en: 'Crime', si: 'අපරාධ' },
  99: { en: 'Documentary', si: 'වාර්තාමය' },
  18: { en: 'Drama', si: 'නාට්‍යමය' },
  10751: { en: 'Family', si: 'පවුලේ සැමට' },
  14: { en: 'Fantasy', si: 'මායා/ෆැන්ටසි' },
  36: { en: 'History', si: 'ඓතිහාසික' },
  27: { en: 'Horror', si: 'භීෂණ' },
  10402: { en: 'Music', si: 'සංගීතමය' },
  9648: { en: 'Mystery', si: 'අභිරහස්' },
  10749: { en: 'Romance', si: 'ප්‍රේම කථා' },
  878: { en: 'Sci-Fi', si: 'විද්‍යා ප්‍රබන්ධ' },
  53: { en: 'Thriller', si: 'කුතුහල' },
  10752: { en: 'War', si: 'යුධමය' },
  37: { en: 'Western', si: 'බටහිර' }
};

async function fetchFromTMDB<T = any>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {}
): Promise<T | null> {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set('api_key', API_KEY);
    url.searchParams.set('language', 'en-US');
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.warn(`TMDB HTTP error ${res.status}: ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn('Network error reaching TMDB API, using fallback data:', err);
    return null;
  }
}

export const tmdbService = {
  fetchFromTMDB,

  async getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week', page: number = 1): Promise<MediaItem[]> {
    const data = await fetchFromTMDB<{ results: any[] }>(`/trending/${mediaType}/${timeWindow}`, { page });
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item) => this.mapTMDBItem(item, item.media_type || (mediaType === 'all' ? 'movie' : mediaType)));
    }
    // Return curated fallback
    return CURATED_FEATURED_ITEMS.filter((i) => mediaType === 'all' || i.media_type === mediaType);
  },

  async getPopular(mediaType: 'movie' | 'tv', page: number = 1): Promise<MediaItem[]> {
    const endpoint = mediaType === 'movie' ? '/movie/popular' : '/tv/popular';
    const data = await fetchFromTMDB<{ results: any[] }>(endpoint, { page });
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item) => this.mapTMDBItem(item, mediaType));
    }
    return CURATED_FEATURED_ITEMS.filter((i) => i.media_type === mediaType);
  },

  async getTopRated(mediaType: 'movie' | 'tv' = 'movie', page: number = 1): Promise<MediaItem[]> {
    const endpoint = mediaType === 'movie' ? '/movie/top_rated' : '/tv/top_rated';
    const data = await fetchFromTMDB<{ results: any[] }>(endpoint, { page });
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item) => this.mapTMDBItem(item, mediaType));
    }
    return CURATED_FEATURED_ITEMS.filter((i) => i.media_type === mediaType);
  },

  async getDetails(id: number | string, mediaType: 'movie' | 'tv'): Promise<MediaDetails> {
    const endpoint = `/${mediaType}/${id}`;
    const data = await fetchFromTMDB<any>(endpoint, { append_to_response: 'credits,videos,recommendations' });

    if (data) {
      const cast: CastMember[] = (data.credits?.cast || []).slice(0, 10).map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character || 'Cast Member',
        profile_path: c.profile_path
      }));

      const trailers = (data.videos?.results || []).filter((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

      const seasons: SeasonInfo[] = (data.seasons || []).map((s: any) => ({
        season_number: s.season_number,
        name: s.name || `Season ${s.season_number}`,
        episode_count: s.episode_count || 10,
        poster_path: s.poster_path
      }));

      const base = this.mapTMDBItem(data, mediaType);
      return {
        ...base,
        genres: (data.genres || []).map((g: any) => ({
          id: g.id,
          name: g.name,
          sinhalaName: GENRE_MAP[g.id]?.si || g.name
        })),
        runtime: data.runtime || (data.episode_run_time ? data.episode_run_time[0] : 120),
        number_of_seasons: data.number_of_seasons || seasons.length,
        number_of_episodes: data.number_of_episodes,
        status: data.status,
        tagline: data.tagline,
        imdb_id: data.imdb_id || (data.external_ids?.imdb_id),
        cast,
        trailers,
        seasons: seasons.filter(s => s.season_number > 0)
      };
    }

    // Curated fallback details
    const fallback = CURATED_FEATURED_ITEMS.find((item) => String(item.id) === String(id)) || CURATED_FEATURED_ITEMS[0];
    return {
      ...fallback,
      genres: [
        { id: 28, name: 'Action', sinhalaName: 'ක්‍රියාදාම' },
        { id: 878, name: 'Sci-Fi', sinhalaName: 'විද්‍යා ප්‍රබන්ධ' },
        { id: 53, name: 'Thriller', sinhalaName: 'කුතුහල' }
      ],
      runtime: 128,
      number_of_seasons: fallback.media_type === 'tv' ? 2 : undefined,
      cast: [
        { id: 1, name: 'Lead Performer', character: 'Protagonist', profile_path: null },
        { id: 2, name: 'Co-Star Actor', character: 'Antagonist', profile_path: null },
        { id: 3, name: 'Supporting Artist', character: 'Allied Officer', profile_path: null }
      ],
      trailers: [{ id: 'trailer1', key: 'dQw4w9WgXcQ', name: 'Official HD Trailer', site: 'YouTube', type: 'Trailer' }],
      seasons: [
        { season_number: 1, name: 'Season 1 (පළමු අදියර)', episode_count: 8 },
        { season_number: 2, name: 'Season 2 (දෙවන අදියර)', episode_count: 8 }
      ]
    };
  },

  async searchMulti(query: string, page: number = 1): Promise<MediaItem[]> {
    if (!query.trim()) return [];
    const data = await fetchFromTMDB<{ results: any[] }>('/search/multi', { query, page });
    if (data && data.results) {
      return data.results
        .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
        .map((item) => this.mapTMDBItem(item, item.media_type));
    }
    // Local filter fallback
    const q = query.toLowerCase();
    return CURATED_FEATURED_ITEMS.filter(
      (item) => item.title.toLowerCase().includes(q) || item.overview.toLowerCase().includes(q)
    );
  },

  async discoverMedia(mediaType: 'movie' | 'tv', filters: FilterState, page: number = 1): Promise<MediaItem[]> {
    const endpoint = `/discover/${mediaType}`;
    const queryParams: Record<string, any> = {
      sort_by: filters.sortBy || 'popularity.desc',
      page
    };

    if (filters.genre) queryParams.with_genres = filters.genre;
    if (filters.year) {
      if (mediaType === 'movie') queryParams.primary_release_year = filters.year;
      else queryParams.first_air_date_year = filters.year;
    }

    const data = await fetchFromTMDB<{ results: any[] }>(endpoint, queryParams);
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item) => this.mapTMDBItem(item, mediaType));
    }

    // Local filter fallback
    let items = CURATED_FEATURED_ITEMS.filter((i) => i.media_type === mediaType);
    if (filters.genre) {
      const gId = Number(filters.genre);
      items = items.filter((i) => i.genre_ids && i.genre_ids.includes(gId));
    }
    if (filters.year) {
      items = items.filter((i) => {
        const y = (i.release_date || i.first_air_date || '').split('-')[0];
        return y === filters.year;
      });
    }
    return items.length > 0 ? items : CURATED_FEATURED_ITEMS.filter((i) => i.media_type === mediaType);
  },

  async discover(mediaType: 'movie' | 'tv', params: Record<string, any> = {}): Promise<MediaItem[]> {
    const endpoint = `/discover/${mediaType}`;
    const queryParams: Record<string, any> = {
      sort_by: params.sort_by || 'popularity.desc',
      page: params.page || 1
    };

    if (params.with_genres) queryParams.with_genres = params.with_genres;
    if (params.year) {
      if (mediaType === 'movie') queryParams.primary_release_year = params.year;
      else queryParams.first_air_date_year = params.year;
    }

    const data = await fetchFromTMDB<{ results: any[] }>(endpoint, queryParams);
    if (data && data.results && data.results.length > 0) {
      return data.results.map((item) => this.mapTMDBItem(item, mediaType));
    }
    return CURATED_FEATURED_ITEMS.filter((i) => i.media_type === mediaType);
  },

  mapTMDBItem(item: any, mediaType: 'movie' | 'tv'): MediaItem {
    const title = item.title || item.name || 'Untitled';
    const releaseDate = item.release_date || item.first_air_date || '';
    const year = releaseDate ? releaseDate.split('-')[0] : '2024';

    return {
      id: item.id,
      title,
      name: item.name,
      original_title: item.original_title,
      original_name: item.original_name,
      overview: item.overview || 'විස්තරය ළඟදීම බලාපොරොත්තු වන්න...',
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      vote_average: Number((item.vote_average || 7.5).toFixed(1)),
      vote_count: item.vote_count || 120,
      media_type: mediaType,
      genre_ids: item.genre_ids || [],
      popularity: item.popularity || 100,
      quality: item.vote_average > 7.5 ? '4K' : 'HD',
      duration: `${year} • ${mediaType === 'movie' ? 'Movie' : 'TV Show'}`
    };
  }
};
