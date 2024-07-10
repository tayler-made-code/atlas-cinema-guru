import './dashboard.css'
import React, { useState, useEffect } from 'react'
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

export default function WatchLater() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchLater = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/titles/watchlater', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching watch later movies:', error);
      }
    };

    fetchWatchLater();
  }, []);

  return (
    <div className="watchlater-page">
      <h2 className='page-title'>Movies To Watch Later</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}