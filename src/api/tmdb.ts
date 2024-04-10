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
    backdrop_path?: string;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
    total_pages: number;
    total_results: number;
}

interface Configuration {
    base_url: string;
}

export const client = {
    
    async getConfiguration() {
        console.log('START getConfiguration');
        return await get<Configuration>(`/configuration`);
    },

    async getNowPlaying(): Promise<MovieDetails[]> {
        console.log('START getNowPlaying');
        const response = await get<PageResponse<MovieDetails>>(
            `/movie/now_playing?page=1`
        );

        return response.results;
    },
}


