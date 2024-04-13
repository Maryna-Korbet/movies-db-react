import { useState, useCallback } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { MoviesFilter } from './MoviesFilter';
import { useGetConfigurationQuery, useGetMoviesQuery, MoviesQuery } from '../../services/tmdb';


const initialQuery = {
  page: 1,
  filters: {},
};

function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);
  const { isAuthenticated, user } = useAuth0();
  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results;
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration ? `${configuration.images.base_url}w780${imagePath}` : undefined;
  }

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddToFavorites = useCallback(
    (id: number): void => alert(`Not implemented! Action: ${user?.name} is adding movie ${id} to favorites.`),
    [user?.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap", mt: 12 }}>
      <Grid item xs="auto" sx={{ mt: 6}}>
        <MoviesFilter
          onApply={(filters) => {
            const moviesFilters = {
              keywords: filters?.keywords.map((k) => k.id),
              genres: filters?.genres,
            };

            setQuery({
              page: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies?.length && <Typography variant="h6">No movies were found that match your query.</Typography>}
          <Grid container spacing={4}>
            {movies?.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  popularity={movie.popularity}
                  image={formatImageUrl(movie.backdrop_path)}
                  enableUserActions={isAuthenticated}
                  onAddToFavorite={handleAddToFavorites}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>{isFetching && <LinearProgress color="primary" sx={{ mt: 3 }} />}</div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Movies;


