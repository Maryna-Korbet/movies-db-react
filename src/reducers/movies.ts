import {createReduser, ActionWithPayload} from "../redux/utils";

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
};

const initialState: MovieState = {
    top: [],
    loading: false,
};

export const moviesLoaded = (movies: Movie[]) => ({
    type: "movies/loaded",
    payload: movies,
});

export const moviesLoading = () => ({
    type: "movies/loading",
})

const moviesReducer = createReduser<MovieState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
            return {
                ...state,
                top: action.payload,
                loading: false,
            };
        },
        "movies/loading": (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
    }
);

export default moviesReducer;