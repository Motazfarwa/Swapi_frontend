// components/Navbar.jsx

import axios from 'axios';
import './Navbar.css'

const Navbar = () => {

  const userId = 1;

  const sendTestNotification = async () => {
    try {
      // Send test notification to yourself
      await axios.post('http://localhost:4000/api/send-message', {
        senderId: userId,
        receiverId: userId,
        message: "This is a test notification!"
      });
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  };

  const simulateBookRequest = async () => {
    try {
      // Simulate a book request from user 2 to current user
      await axios.post('http://localhost:4000/api/books/request', {
        bookId: 1, // Replace with actual book ID
        requesterId: 2, // Replace with test user ID
        ownerId: userId
      });
    } catch (error) {
      console.error('Failed to simulate book request:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">Book Exchange</div>
        
        <div className="nav-controls">
          <button 
            className="test-btn"
            onClick={sendTestNotification}
          >
            Send Test Notification
          </button>

          <button
            className="test-btn"
            onClick={simulateBookRequest}
          >
            Simulate Book Request
          </button>

      

          <button className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};



export default Navbar;