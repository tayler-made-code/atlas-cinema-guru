import './movies.css'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons'
import Tag from './Tag'
import axios from 'axios'
import unavailable from './images/unavailable.png'


export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  const placeHolderImage = unavailable;

  useEffect(() => {
    const fetchUsersLists = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const [favoritesResponse, watchLaterResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/titles/favorite', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          }),
          axios.get('http://localhost:8000/api/titles/watchlater', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })
        ]);
        
        setIsFavorite(favoritesResponse.data.some(item => item.imdbId === movie.imdbId));
        setIsWatchLater(watchLaterResponse.data.some(item => item.imdbId === movie.imdbId));
      } catch (error) {
        console.error('Error fetching user lists:', error);
      }
    };

    fetchUsersLists();
  }, [movie.imdbId]);

  const handleClick = async (type) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const isCurrentlySelected = type === 'favorite' ? isFavorite : isWatchLater;
      const method = isCurrentlySelected ? 'delete' : 'post';
      const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;

      await axios({
        method: method,
        url: url,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },

        data: { imdbId: movie.imdbId }
      });

      if (type === 'favorite') {
        setIsFavorite(!isFavorite);
      } else {
        setIsWatchLater(!isWatchLater);
      }
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const truncateText = (text, maxLength) => {
    if(!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <li className="movie-card">
      <FontAwesomeIcon
        icon = {faStar}
        className={`star-icon ${isFavorite ? 'active' : ''}`}
        onClick={() => handleClick('favorite')}
      />
      <FontAwesomeIcon
        icon = {faClock}
        className={`clock-icon ${isWatchLater ? 'active' : ''}`}
        onClick={() => handleClick('watchlater')}
      />
      <div className = "movie-card-info">
        <img src={imageLoaded ? movie.imageurls : placeHolderImage} alt={movie.title} onError={handleImageError} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{truncateText(movie.synopsis, 100)}</p>
          <ul className="tags">
            {movie.genres.map((genre) => (
              <Tag
                key={genre}
                genre={genre}
              />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}