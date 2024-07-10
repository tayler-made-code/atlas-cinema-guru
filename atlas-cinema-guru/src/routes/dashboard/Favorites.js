import './dashboard.css'
import React, { useState, useEffect } from 'react'
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/titles/favorite', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };
    
    fetchFavorites();
  }, []);


  return (
    <div className="favorites-page">
      <h2 className='page-title'>Movies You Like</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}