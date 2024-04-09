import { Reducer, Action } from "redux";

export interface Movie {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    image?: string;
};

interface MovieState {top: Movie[]};

const initialState: MovieState = {
    top: [
        {
            id: 1,
            title: "Inception",
            popularity: 98,
            overview: "Inception, a thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        },
        {
            id: 2,
            title: "The Godfather",
            popularity: 98,
            overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        },
        {
            id: 3,  
            title: "The Dark Knight",
            popularity: 98,
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        },
        {
            id: 4,
            title: "The Lord of the Rings: The Return of the King",
            popularity: 98,
            overview: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
        }
    ],
};
const moviesReducer: Reducer<MovieState, Action> = (state = initialState, action) => {
    return initialState;
};
export default moviesReducer;