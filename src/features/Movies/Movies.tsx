import { useEffect,  useContext, useState, useCallback } from 'react';
import { Container, Grid, LinearProgress } from '@mui/material';

import MovieCard from './MovieCard';
import { fetchNextPage, resetMovies } from '../../reducers/movies';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthContext, anonymousUser } from '../../contexts/AuthContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { MoviesFilter } from './MoviesFilter';
import { Filters } from './MoviesFilter';


function Movies() {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movies.top);
    const loading = useAppSelector((state) => state.movies.loading);
    const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

    const { user } = useContext(AuthContext);
    const loggedIn = user !== anonymousUser;
    const [targetRef, entry] = useIntersectionObserver();
    const [filters, setFilters] = useState<Filters>();

    useEffect(() => {
        dispatch(resetMovies());
    }, [dispatch]);

    useEffect(() => {
        if (entry?.isIntersecting && hasMorePages) {
            const moviesFilters = filters
                ? { keywords: filters.keywords.map((k) => k.id) }
                : undefined;

            dispatch(fetchNextPage(moviesFilters));
        }
        
    }, [dispatch, entry?.isIntersecting, hasMorePages, filters]);

    const handleAddToFavorite = useCallback((id: number) => {
        alert(`Not implemented! Action: ${user.name} is adding movie ${id} to favorites`);
    }, [user.name]);

    return (
        <Grid
            container
            spacing={2}
            sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', mt: 12}}
        >
            <Grid
                item
                xs="auto"
                sx={{mt: 4}}>
                <MoviesFilter onApply={(fitrers) => {
                    dispatch(resetMovies());
                    setFilters(fitrers);
                }} />
            </Grid>
        <Grid item xs={12}>
        <Container sx={{ py: 8, maxWidth: 'lg'}}>
            <Grid container spacing={4}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            overview={movie.overview}
                            popularity={movie.popularity}
                            image={movie.image}
                            enableUserActions={loggedIn}
                            onAddToFavorite={handleAddToFavorite}
                        />
                    </Grid>
                    ))}
            </Grid>
            <div ref={targetRef}>
                { loading && <LinearProgress
                    color='primary'
                    sx={{ mt: 3}}
                />}
            </div>
            </Container>
            </Grid>
        </Grid>
    );
};

export default Movies;


