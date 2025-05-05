// import { useContext, useEffect, useState } from 'react';
// import { SocketContext } from '../context/socket';
// import axios from 'axios';

// const NotificationHandler = () => {
//   const socket = useContext(SocketContext);
//   const [notifications, setNotifications] = useState([]);
//   const userId = 2;
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/ajouter/api/notifications', {
//           params: { userId }
//         });
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     if (userId) {
//       fetchNotifications();
//       socket.emit('authenticate', userId);
//     }
//   }, [userId]);

//   useEffect(() => {
//     const handleNewNotification = (notification) => {
//       setNotifications(prev => [notification, ...prev]);
//       // Optional: Play sound
//       new Audio('/notification-sound.mp3').play();
//     };

//     socket.on('new-notification', handleNewNotification);

//     return () => {
//       socket.off('new-notification', handleNewNotification);
//     };
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.put(`http://localhost:4000/ajouter/api/notifications/${notificationId}/read`);
//       setNotifications(prev =>
//         prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
//       );
//     } catch (error) {
//       console.error('Error marking as read:', error);
//     }
//   };

//   return (
//     <div className="notification-container">
//       {notifications.map(notification => (
//         <div 
//           key={notification.id} 
//           className={`notification ${notification.read ? 'read' : 'unread'}`}
//           onClick={() => !notification.read && markAsRead(notification.id)}
//         >
//           <div className="notification-content">
//             {notification.message}
//           </div>
//           <div className="notification-time">
//             {new Date(notification.created_at).toLocaleTimeString()}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationHandler;