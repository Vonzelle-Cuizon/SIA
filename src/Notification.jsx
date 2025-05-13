import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './Notification.css';

const Notification = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="notification-page">
      <div className="dashboard-container">
        <div className="sidebar">
          <div className="user-info">
            <p>{user?.displayName || 'User'}</p>
            <p>{user?.email || 'Email not available'}</p>
          </div>
          <ul className="nav-links">
            <li onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>📋 Dashboard</li>
            <li onClick={() => navigate('/reservation')} style={{ cursor: 'pointer' }}>📅 Reservation</li>
            <li onClick={() => navigate('/waitlist')} style={{ cursor: 'pointer' }}>⏳ Waitlist</li>
            <li onClick={() => navigate('/notification')} style={{ cursor: 'pointer' }}>🔔 Notification</li>
            <li onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>🛒 Order</li>
            <li onClick={() => navigate('/order status')} style={{ cursor: 'pointer' }}>📄 Order Status</li>
          </ul>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>

        <div className="notification-container">
          <p className="back-link" onClick={handleBack} style={{ cursor: 'pointer' }}>← Back</p>
          <h2 className="notification-title">🔔 Notifications</h2>
          <ul className="notification-list">
            <li>You have a new reservation confirmation.</li>
            <li>Your waitlist position has been updated.</li>
            <li>New seasonal menu now available!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
