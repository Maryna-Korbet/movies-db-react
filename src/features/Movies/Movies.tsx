import { Movie } from '../../reducers/movies';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import MovieCard  from './MovieCard';

import styles from './Movies.module.scss';
import { useEffect } from 'react';
import { client } from '../../api/tmdb';
import { moviesLoaded, moviesLoading } from '../../reducers/movies';

interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function loadData() {
            dispatch(moviesLoading());

            const config : any = await client.getConfiguration();
            const imageUrl = config.images.base_url;
            const results = await client.getNowPlaying();

            const mappedResults: Movie[] = results.map((m) => ({
                id: m.id,
                title: m.title,
                popularity: m.popularity,
                overview: m.overview,
                image: m.backdrop_path
                        ? `${imageUrl}w780${m.backdrop_path}`
                        : undefined,
            }));
            dispatch(moviesLoaded(mappedResults));
        }
        
        loadData();
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


