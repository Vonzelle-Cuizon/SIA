
// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import './App.css'
// import logo from './pic/logo.png';

// const App = () => {
//   const navigate = useNavigate()

//   return (
//     <div className="container">
//       <img src={logo} alt="Luxury Palette Logo" className="logo" />
//       <div className="buttons">
//         <button className="btn" onClick={() => navigate('/login')}>Sign in</button>
//         <button className="btn" onClick={() => navigate('/register')}>Sign up</button>

//       </div>
//     </div>
//   )
// }

// export default App



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './pic/logo.png';
import emailjs from 'emailjs-com';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Replace with your actual EmailJS public key

    // Optionally, send a test email when the app is loaded (e.g., after a successful app start)
    const sendTestEmail = () => {
      const templateParams = {
        user_email: "example@example.com", // Replace with dynamic data if needed
        user_id: "App Start Notification", // Replace with dynamic data if needed
      };

      emailjs
        .send("Email_JS", "template_isyqqqn", templateParams) // Use your Service ID and Template ID
        .then(
          (response) => {
            console.log("✅ Email notification sent.");
          },
          (error) => {
            console.log("❌ Email notification failed:", error);
          }
        );
    };

    // Uncomment this to send an email when the app is loaded
    // sendTestEmail();
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="Luxury Palette Logo" className="logo" />
      <div className="buttons">
        <button className="btn" onClick={() => navigate('/login')}>Sign in</button>
        <button className="btn" onClick={() => navigate('/register')}>Sign up</button>
      </div>
    </div>
  );
};

export default App;
