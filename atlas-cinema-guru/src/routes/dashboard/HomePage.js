import './dashboard.css'
import React, { useState, useEffect, useCallback } from 'react'
import MovieCard from '../../components/movies/MovieCard'
import Filter from '../../components/movies/Filter'
import Button from '../../components/general/Button'
import axios from 'axios'

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
      const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          minYear,
          maxYear,
          genres: genres.join(','),
          sort,
          title,
          page: pageNum
        }
      });

      const data = response.data;

      if (pageNum === 1) {
        setMovies(data.titles);
      } else {
        setMovies(prevMovies => [...prevMovies, ...data.titles]);
      }
    } catch (error) {
      console.error('Error loading movies:', error.response ? error.response.data : error);
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
        label="Load More.."
      />
    </div>
  );
}