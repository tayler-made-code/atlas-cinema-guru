import './components.css';
import React from 'react';

export default function Activity({ activity }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options)
  };

  const formatActivity = (activity) => {
    const userName = activity.user.username;
    const title = activity.title.title;
    const date = formatDate(activity.createdAt);

    switch(activity.type) {
      case 'watchLater':
        return `${userName} added ${title} to watch later - ${date}`;
      case 'favorite':
        return `${userName} added ${title} to favorites - ${date}`;
      case 'removeFavorited':
        return `${userName} removed ${title} from favorites - ${date}`;
      case 'removeWatchLater':
        return `${userName} removed ${title} from watch later - ${date}`;
      default:
        return 'Unknown activity';
    }
  };

  return (
    <li className="activity-item">
      <p>{formatActivity(activity)}</p>
    </li>
  );
}