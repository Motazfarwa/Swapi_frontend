// src/context/socket.js
import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:4000', {
    withCredentials: true,
    transports: ['websocket', 'polling'] // Add this line
  });
export const SocketContext = createContext();