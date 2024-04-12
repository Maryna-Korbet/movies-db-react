import configuration from '../configuration';

async function get<TBody>(relativeURL: string): Promise<TBody> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`,
        },
    };

    const response = await fetch(`${configuration.apiUrl}/3${relativeURL}`, options);
    const json: TBody = await response.json();
    return json;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    backdrop_path?: string | null;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
    total_pages: number;
}

interface PageDetails<T> {
    page: number;
    results: T[];
    totalPages: number;
}

interface Configuration {
    images: {
        base_url: string;
    }
}

interface ITmbdClient {
    getConfiguration: () => Promise<Configuration>;
    getNowPlaying: (page: number) => Promise<PageDetails<MovieDetails>>;
    getMovies: (page: number, filters: MoviesFilters) => Promise<PageDetails<MovieDetails>>;
    getKeywords: (query: string) => Promise<KeywordItem[]>
}
export interface KeywordItem {
    id: number
    name: string
};

export interface MoviesFilters {
    keywords?: number[]
};

export const client: ITmbdClient = {
    getConfiguration: async () => {
        const response = await get<Configuration>("/configuration");
        return response;
    },

    getNowPlaying: async (page: number = 1) => {
        const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=${page}`);
        return {
            results: response.results,
            totalPages: response.total_pages,
            page: response.page,
        };
    },

    getMovies: async (page: number, filters: MoviesFilters) => {
        const params = new URLSearchParams({page: page.toString(),});

        if (filters.keywords?.length) {
            params.append("with_keywords",filters.keywords.join("|"));
        }

        const qwery = params.toString();
        const response = await get<PageResponse<MovieDetails>>(`/discover/movie?${qwery}`);
        
        return {
            results: response.results,
            totalPages: response.total_pages,
            page: response.page,
        };
    },

    getKeywords: async (query: string) => {
        const response = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`);
        return response.results;
    },
}


