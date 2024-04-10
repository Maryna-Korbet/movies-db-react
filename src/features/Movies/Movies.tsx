import { Movie, fetchMovies } from '../../reducers/movies';
import { RootState } from '../../store';
import MovieCard from './MovieCard';
import { useAppDispatch } from '../../hooks';

import styles from './Movies.module.scss';

import { useEffect } from 'react';
import { connect } from 'react-redux';


interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        <section>
            <div className={styles.list}>
                {loading
                    ? (<p>Loading...</p>) 
                    : (movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            overview={movie.overview}
                            popularity={movie.popularity}
                            image={movie.image}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

const mapStateToProps = (state: RootState) => ({
    movies: state.movies.top,
    loading: state.movies.loading,
})

const connector = connect(mapStateToProps);

export default connector(Movies);


