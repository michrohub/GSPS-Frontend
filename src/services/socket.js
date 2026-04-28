import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = "http://localhost:5000";
// const SOCKET_URL = "https://api.gsps.online";

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    auth: {
        token: localStorage.getItem('token')
    }
});

