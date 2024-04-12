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
}

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
}


