import { useState, useEffect } from 'react';
import api from '../../services/api';
import ChatWindow from '../../components/Chat/ChatWindow';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { socket } from '../../services/socket';

const LiveChat = () => {
    const { user } = useAuth();
    const { onlineUsers, fetchUnreadCount } = useChat();
    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get('/chat/students');
                setStudents(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chat students:', error);
                setLoading(false);
            }
        };

        fetchStudents();

        const handleNotification = (message) => {
            setStudents(prev => {
                const studentExists = prev.find(s => s._id === message.sender || s._id === (message.sender._id));
                if (studentExists) {
                    return prev.map(s => {
                        const sId = typeof message.sender === 'object' ? message.sender._id : message.sender;
                        if (sId === s._id && selectedStudent?._id !== s._id) {
                            return { ...s, unreadCount: (s.unreadCount || 0) + 1 };
                        }
                        return s;
                    });
                } else {
                    // Refresh student list if it's a new conversation
                    fetchStudents();
                    return prev;
                }
            });
        };

        const handleOnlineStatus = ({ userId, status }) => {
            // Force re-render of student list to show status dots
            setStudents(prev => [...prev]);
        };

        socket.on('new_message_notification', handleNotification);
        socket.on('online_status', handleOnlineStatus);

        return () => {
            socket.off('new_message_notification', handleNotification);
            socket.off('online_status', handleOnlineStatus);
        };
    }, [selectedStudent ]);


    return (
        <div className="p-6 h-[calc(100vh-100px)]">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-full flex overflow-hidden">
                {/* Students List */}
                <div className="w-80 border-r border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Live Support</h2>
                        <p className="text-sm text-gray-500">Manage student conversations</p>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">Loading chats...</div>
                        ) : students.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-400 text-sm">No active conversations</p>
                            </div>
                        ) : (
                            students.map((student) => (
                                <button
                                    key={student._id}
                                    onClick={() => {
                                        setSelectedStudent(student);
                                        // Update local unread count for UI
                                        setStudents(prev => prev.map(s => s._id === student._id ? { ...s, unreadCount: 0 } : s));
                                    }}
                                    className={`w-full p-4 flex items-center gap-3 transition-colors hover:bg-indigo-50 border-b border-gray-50 ${
                                        selectedStudent?._id === student._id ? 'bg-indigo-50 border-r-4 border-r-indigo-600' : ''
                                    }`}
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                            {student.fullName.charAt(0)}
                                        </div>
                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${onlineUsers.has(student._id) ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                                    </div>
                                    <div className="text-left flex-1 overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-gray-800 truncate">{student.fullName}</h4>
                                            {student.unreadCount > 0 && (
                                                <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                                    {student.unreadCount}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{student.email}</p>
                                    </div>
                                </button>

                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
                    {selectedStudent ? (
                        <div className="w-full max-w-2xl h-full flex flex-col">
                            <ChatWindow 
                                user={user} 
                                room={selectedStudent._id} 
                                receiverId={selectedStudent._id}
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="bg-white p-8 rounded-full shadow-sm mb-4 inline-block">
                                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700">Select a student</h3>
                            <p className="text-gray-500 text-sm">Choose a conversation from the list to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveChat;
