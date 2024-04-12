import { createReducer, ActionWithPayload } from "../redux/utils";
import { AppThunk } from "../store";
import { client } from "../api/tmdb";
import { MoviesFilters } from "../api/tmdb";


export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
};

interface MovieState {
    top: Movie[];
    loading: boolean;
    page: number;
    hasMorePages: boolean;
};

const initialState: MovieState = {
    top: [],
    loading: false,
    page: 0,
    hasMorePages: true,
};

const moviesLoaded = (movies: Movie[], page: number, hasMorePages: boolean) => ({
    type: "movies/loaded",
    payload: {movies, page, hasMorePages},
});

const moviesLoading = () => ({
    type: "movies/loading",
});

export const resetMovies = () => ({
    type: "movies/reset",
});

export function fetchNextPage(filters: MoviesFilters = {}): AppThunk<Promise<void>> {  
    return async (dispatch, getState) => {
        const state = getState();
        const nextPage = state.movies.page + 1;
        dispatch(fatchPage(nextPage, filters));
    }
}

function fatchPage(page: number, filters: MoviesFilters): AppThunk<Promise<void>> { 
    return async (dispatch) => {
        dispatch(moviesLoading());

        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const imageSize = "w780";
        const moviesResponse = await client.getMovies(page, filters);

        const mappedResults: Movie[] = moviesResponse.results.map((m: any) => ({
            id: m.id,
            title: m.title,
            popularity: m.popularity,
            overview: m.overview,
            image: m.backdrop_path
                ? `${imageUrl}${imageSize}${m.backdrop_path}`
                : undefined,
        }));

        const hasMorePages = moviesResponse.page < moviesResponse.totalPages; 

        dispatch(moviesLoaded(mappedResults, page, hasMorePages));
    }
}

const moviesReducer = createReducer<MovieState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<{ movies: Movie[], page: number, hasMorePages: boolean }>) => {
            return {
                ...state,
                top: [...state.top, ...action.payload.movies],
                page: action.payload.page,
                hasMorePages: action.payload.hasMorePages,
                loading: false,
            };
        },
        "movies/loading": (state) => {
            return {
                ...state,
                loading: true,
            };
        },
        "movies/reset": () => {
            return initialState;
        }
    }
);

export default moviesReducer;