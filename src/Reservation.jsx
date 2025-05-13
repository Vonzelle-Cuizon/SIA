import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "./firebase";
import './Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    setUser(auth.currentUser);
  }, []);

  const handleReservation = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const phone = e.target[1].value;
    const peopleCount = parseInt(e.target[2].value);
    const date = e.target[3].value; // YYYY-MM-DD
    const time = e.target[4].value; // HH:MM
    const tableNumber = e.target[5].value;

    const combinedDateTime = new Date(`${date}T${time}`);
    const timestamp = Timestamp.fromDate(combinedDateTime);

    try {
      await addDoc(collection(db, "reservation"), {
        name,
        phone,
        peopleCount,
        reservationDateTime: timestamp,
        tableNumber,
        userId: user?.uid || null
      });

      alert("Thank you for your reservation!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving reservation:", err);
      alert("Reservation failed.");
    }
  };

  const handleLogout = () => {
    alert("Logged out!");
    navigate('/login'); // Adjust this path based on your route
  };

  return (
    <div className="dashboard-container">
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

      <div className="reservation-container">
        <div className="reservation-center-wrapper">
          <h2 className="reservation-title">RESERVATION</h2>
          <div className="reservation-form">
            <form onSubmit={handleReservation}>
              <input type="text" placeholder="Name:" required />
              <input type="text" placeholder="Phone Number" required />
              <input type="number" placeholder="Number of People" required />
              <input type="date" required />
              <input type="time" required />
              <input type="text" placeholder="Table Number" required />
              <button type="submit" className="reservation-button">Make a Reservation</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
