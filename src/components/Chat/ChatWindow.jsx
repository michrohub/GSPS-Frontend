import { useState, useEffect, useRef } from 'react';
import { socket } from '../../services/socket';
import api from '../../services/api';
import { useChat } from '../../context/ChatContext';

const ChatWindow = ({ user, room, receiverId, onClose }) => {
    const { markAsRead, onlineUsers, playNotificationSound } = useChat();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get(`/chat/${room}`);
                setMessages(res.data);
                markAsRead(room); // Mark as read when opening chat
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchHistory();

        socket.auth.token = localStorage.getItem('token');
        if (!socket.connected) socket.connect();

        const onConnect = () => socket.emit('join_room', room);
        
        const handleReceiveMessage = (message) => {
            if (message.room === room) {
                setMessages((prev) => {
                    if (prev.find(m => m._id === message._id)) return prev;
                    return [...prev, message];
                });
                
                // If message is from someone else, play sound and mark as read
                const senderId = typeof message.sender === 'object' ? message.sender._id : message.sender;
                if (senderId !== user._id) {
                    playNotificationSound();
                    markAsRead(room);
                }
            }
        };

        const handleMessagesRead = ({ readerId }) => {
            if (readerId !== user._id) {
                setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
            }
        };

        socket.on('connect', onConnect);
        socket.on('receive_message', handleReceiveMessage);
        socket.on('messages_read', handleMessagesRead);

        if (socket.connected) onConnect();

        return () => {
            socket.off('connect', onConnect);
            socket.off('receive_message', handleReceiveMessage);
            socket.off('messages_read', handleMessagesRead);
            socket.emit('leave_room', room);
        };
    }, [room, markAsRead, user._id, playNotificationSound]);




    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
 e.preventDefault();
       if (newMessage.trim()) {
            const messageData = {
                senderId: user._id,
                receiverId: receiverId,
                message: newMessage,
                room: room
            };
           
            socket.emit('send_message', messageData);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-[450px] w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center font-bold">
                        {user.role === 'admin' ? 'S' : 'A'}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">
                            {user.role === 'admin' ? 'Student Support' : 'Admin Support'}
                        </h3>
                        <div className="flex items-center gap-1">
                            <span className={`w-2 h-2 rounded-full ${onlineUsers.has(receiverId) ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                            <p className="text-[10px] text-indigo-100 uppercase tracking-tighter">
                                {onlineUsers.has(receiverId) ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="hover:bg-indigo-500 p-1 rounded transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm">No messages yet. Say hello!</p>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isMine = (typeof msg.sender === 'object' ? msg.sender._id : msg.sender) === user._id;
                        return (
                            <div key={index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                    isMine 
                                    ? 'bg-indigo-600 text-white rounded-br-none' 
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                }`}>
                                    <p>{msg.message}</p>
                                    <div className="flex items-center justify-between mt-1 gap-2">
                                        <span className={`text-[10px] block ${isMine ? 'text-indigo-200' : 'text-gray-400'}`}>
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {isMine && (
                                            <span className="text-[10px] text-indigo-200">
                                                {msg.isRead ? 'Read' : 'Sent'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all active:scale-95 shadow-md disabled:opacity-50"
                    disabled={!newMessage.trim()}
                >
                    <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
