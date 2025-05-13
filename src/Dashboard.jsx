import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import './Dashboard.css';
import logo from './pic/logo.png';
import pizza from './pic/pizza.png';
import chicken from './pic/chicken.png';
import fries from './pic/fries.png';
import burger from './pic/burger.png';
import icecream from './pic/icecream.png';
import steak from './pic/steak.png';
import spag from './pic/spag.png';
import sushi from './pic/sushi.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="user-info">
          <p>{user?.displayName || 'User'}</p>
          <p>{user?.email || 'Email@gmail.com'}</p>
        </div>
        <ul className="nav-links">
          <li>📋 Dashboard</li>
          <li onClick={() => navigate('/reservation')} style={{ cursor: 'pointer' }}>📅 Reservation</li>
          <li onClick={() => navigate('/waitlist')} style={{ cursor: 'pointer' }}>⏳ Waitlist</li>
          <li onClick={() => navigate('/notification')} style={{ cursor: 'pointer' }}>🔔 Notification</li>
          <li onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>🛒 Order</li>
          <li onClick={() => navigate('/order status')} style={{ cursor: 'pointer' }}>📄 Order Status</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="main-content">
        <img src={logo} alt="Luxury Palette Logo" className="dashboard-logo" />
        <h1>Welcome</h1>
        <p>Book your next meal with ease!</p>

        {/* Row 1 */}
        <div className="food-images">
          <img src={pizza} alt="Pizza" className="food-image" />
          <img src={chicken} alt="Chicken" className="food-image" />
          <img src={fries} alt="Fries" className="food-image" />
          <img src={burger} alt="Burger" className="food-image" />
        </div>

        {/* Row 2 */}
        <div className="food-images">
          <img src={icecream} alt="Ice Cream" className="food-image" />
          <img src={steak} alt="Steak" className="food-image" />
          <img src={spag} alt="Spaghetti" className="food-image" />
          <img src={sushi} alt="Sushi" className="food-image" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
