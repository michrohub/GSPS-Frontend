import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { socket } from '../services/socket';
import api from '../services/api';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

// import soun from '../../public/sounds/notification.mp3'

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [totalUnread, setTotalUnread] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [lastNotificationTime, setLastNotificationTime] = useState(0);
    
    // Modern, soft notification sound
    // const [notificationAudio] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'));
    const [notificationAudio] = useState(new Audio('../../public/sounds/sound.mp3'));

    useEffect(() => {
        notificationAudio.volume = 0.4; // Set volume to 40% (pleasant and soft)
    }, [notificationAudio]);

    const playNotificationSound = useCallback(() => {
        const now = Date.now();
        // Prevent spam: only play if at least 1 second has passed since the last sound
        if (now - lastNotificationTime > 1000) {
            notificationAudio.currentTime = 0; // Reset to beginning for crisp playback
            notificationAudio.play().catch(e => console.log('Audio play failed:', e));
            setLastNotificationTime(now);
        }
    }, [notificationAudio, lastNotificationTime]);

    const fetchUnreadCount = useCallback(async () => {
        if (!user) return;
        try {
            const res = await api.get('/chat/unread/total');
            setTotalUnread(res.data.count);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;

        fetchUnreadCount();

        if (!socket.connected) {
            socket.auth = { token: localStorage.getItem('token') };
            socket.connect();
        }

        const handleNotification = (message) => {
            playNotificationSound();
            setTotalUnread(prev => prev + 1);
        };


        const handleOnlineStatus = ({ userId, status }) => {
            setOnlineUsers(prev => {
                const newSet = new Set(prev);
                if (status === 'online') newSet.add(userId);
                else newSet.delete(userId);
                return newSet;
            });
        };

        socket.on('new_message_notification', handleNotification);
        socket.on('online_status', handleOnlineStatus);

        return () => {
            socket.off('new_message_notification', handleNotification);
            socket.off('online_status', handleOnlineStatus);
        };
    }, [user, fetchUnreadCount, notificationAudio]);

    const markAsRead = async (room) => {
        try {
            await api.put(`/chat/read/${room}`);
            fetchUnreadCount();
            socket.emit('mark_as_read', { room, userId: user._id });
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    return (
        <ChatContext.Provider value={{ totalUnread, onlineUsers, markAsRead, fetchUnreadCount, playNotificationSound }}>
            {children}
        </ChatContext.Provider>
    );
};

