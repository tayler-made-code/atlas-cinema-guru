import './components.css';
import React from 'react';

export default function Activity({ activity }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options)
  };

  const formatActivity = (activity) => {
    const userName = activity.user ? activity.user.username : 'Unknown user';
    const title = activity.title ? activity.title.title : 'Unknown title';
    const date = formatDate(activity.createdAt);

    switch(activity.activityType) {
      case 'watchLater':
        return (
          <>
            <span className="red">{userName}</span> added <span className="red">{title}</span> to watch later - <span className="italics">{date}</span>
          </>
        );
      case 'favorite':
        return (
          <>
            <span className="red">{userName}</span> added <span className="red">{title}</span> to favorites - <span className="italics">{date}</span>
          </>
        );
      case 'removeFavorited':
        return (
          <>
            <span className="red">{userName}</span> removed <span className="red">{title}</span> from favorites - <span className="italics">{date}</span>
          </>
        );
      case 'removeWatchLater':
        return (
          <>
            <span className="red">{userName}</span> removed <span className="red">{title}</span> from watch later - <span className="italics">{date}</span>
          </>
        );
      default:
        console.log('Unknown activity:', activity);
        return `Unknown activity: ${activity.activityType} - ${userName}, ${title}, ${date}`;
    }
  };

  return (
    <li className="activity-item">
      <p>{formatActivity(activity)}</p>
    </li>
  );
}