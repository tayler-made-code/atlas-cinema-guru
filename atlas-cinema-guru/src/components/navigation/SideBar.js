import './navigation.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Activity from '../components/Activity'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function SideBar() {
  const [selected, setSelected] = useState('Home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const navigate = useNavigate();

  const setPage = (pageName) => {
    setSelected(pageName);
    switch(pageName) {
      case 'Home':
        navigate('/home');
        break;
      case 'Favorites':
        navigate('/favorites');
        break;
      case 'Watch Later':
        navigate('/watchlater');
        break;
      default:
        navigate('/home');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/activity')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
      });
  }, []);

  const handleMouseEnterSideBar = () => {
    setSmall(false);
    setShowActivities(true);
  };

  const handleMouseLeaveSideBar = () => {
    setSmall(true);
    setShowActivities(false);
  };
  
  return (
    <nav 
      className={`sidebar ${small ? 'small' : ''}`}
      onMouseEnter={handleMouseEnterSideBar}
      onMouseLeave={handleMouseLeaveSideBar}
    >
      <ul className="navigation">
        <li onClick={() => setPage('Home')} className={selected === 'Home' ? 'selected' : ''}>
          <FontAwesomeIcon icon = {faFolder} />
          {!small && <span>Home</span>}
          {!small && selected === 'Home' && <FontAwesomeIcon icon = {faArrowRight} />}
        </li>
        <li onClick={() => setPage('Favorites')} className={selected === 'Favorites' ? 'selected' : ''}>
          <FontAwesomeIcon icon = {faStar} />
          {!small && <span>Favorites</span>}
          {!small && selected === 'Favorites' && <FontAwesomeIcon icon = {faArrowRight} />}
        </li>
        <li onClick={() => setPage('Watch Later')} className={selected === 'Watch Later' ? 'selected' : ''}>
          <FontAwesomeIcon icon = {faClock} />
          {!small && <span>Watch Later</span>}
          {!small && selected === 'Watch Later' && <FontAwesomeIcon icon = {faArrowRight} />}
        </li>
      </ul>
      {!small && (
        <div className="activities-section">
          <h3>Latest Activities</h3>
          {showActivities && (
            <ul className="activities">
              {activities.slice(0, 10).map((activity, index) => (
                <Activity key={index} activity={activity} />
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}