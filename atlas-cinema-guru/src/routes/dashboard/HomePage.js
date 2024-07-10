import './dashboard.css'
import React, { useState, useEffect, useCallback } from 'react'
import MovieCard from '../../components/movies/MovieCard'
import Filter from '../../components/movies/Filter'
import Button from '../../components/general/Button'

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = useCallback(async (pageNum) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/api/titles/advancedsearch?minYear=${minYear}&maxYear=${maxYear}&genres=${genres.join(',')}&title=${title}&sort=${sort}&page=${pageNum}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (pageNum === 1) {
        setMovies(data.titles);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.titles]);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }, [minYear, maxYear, genres, title, sort]);

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title, loadMovies]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="home-page">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        genres={genres}
        setGenres={setGenres}
        sort={sort}
        setSort={setSort}
        title={title}
        setTitle={setTitle}
      />
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
      <Button
        onClick={handleLoadMore}
        label="Load More"
      />
    </div>
  );
}