import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';
import './Waitlist.css';
import logo from './pic/logo.png';

const Waitlist = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);

    // Fetch reservations
    const fetchReservations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reservation"));
        const data = snapshot.docs.map(doc => {
          const item = doc.data();
          const dateObj = item.reservationDateTime?.toDate(); // convert Firestore Timestamp

          return {
            id: doc.id,
            name: item.name,
            partySize: item.peopleCount,
            date: dateObj?.toLocaleDateString() || '',
            time: dateObj?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '',
            status: 'Waiting' // or fetch from DB if status is stored
          };
        });

        setWaitlist(data);
      } catch (error) {
        console.error("Error fetching waitlist:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleLogout = () => {
    alert("Logged out!");
    navigate('/login');
  };

  return (
    <div className="waitlist-container">
      <div className="sidebar">
        <div className="user-info">
          <p>{user?.displayName || 'User'}</p>
          <p>{user?.email || 'Email not available'}</p>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate('/dashboard')}>📋 Dashboard</li>
          <li onClick={() => navigate('/reservation')}>📅 Reservation</li>
          <li onClick={() => navigate('/waitlist')}>⏳ Waitlist</li>
          <li onClick={() => navigate('/notification')}>🔔 Notification</li>
          <li onClick={() => navigate('/order')}>🛒 Order</li>
          <li onClick={() => navigate('/order status')}>📄 Order Status</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="main-content">
        <img src={logo} alt="Logo" className="dashboard-logo" />
        <h1>Waitlist</h1>
        <p>Here are the customers currently in the queue:</p>

        <table className="waitlist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Party Size</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {waitlist.length > 0 ? (
              waitlist.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.partySize}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No reservations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Waitlist;
