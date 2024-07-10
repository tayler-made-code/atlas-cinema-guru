import './navigation.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Activity from '../components/Activity'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'


export default function SideBar() {
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        const response = await axios.get('http://localhost:8000/api/activity/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });

        if (response.status !== 200) {
          throw new Error(`LATESTS ACTIVITY ISSUE: ${response.status}`);
        }

        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
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
        <li className={location.pathname === '/home' ? 'selected' : ''}>
          <Link to="/home">
            <FontAwesomeIcon icon = {faFolder} />
            {!small && <span>Home</span>}
            {!small && location.pathname === '/home' && <FontAwesomeIcon icon = {faArrowRight} />}
          </Link>
        </li>
        <li className={location.pathname === '/favorites' ? 'selected' : ''}>
          <Link to="/favorites">
            <FontAwesomeIcon icon = {faStar} />
            {!small && <span>Favorites</span>}
            {!small && location.pathname === '/favorites' && <FontAwesomeIcon icon = {faArrowRight} />}
          </Link>
        </li>
        <li className={location.pathname === '/watchlater' ? 'selected' : ''}>
          <Link to="/watchlater">
            <FontAwesomeIcon icon = {faClock} />
            {!small && <span>Watch Later</span>}
            {!small && location.pathname === '/watchlater' && <FontAwesomeIcon icon = {faArrowRight} />}
          </Link>
        </li>
      </ul>
      {!small && (
        <div className="activities-section">
          <h3>Latest Activities</h3>
          {showActivities && (
            <ul className="activities">
              {activities.slice(0, 10).map((activity, index) => (
                <Activity key={activity.id || index} activity={activity} />
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}