import { useState } from 'react';
import ChatWindow from './ChatWindow';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

const ChatFloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { totalUnread } = useChat();

    if (!user || user.role === 'admin') return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <ChatWindow 
                        user={user} 
                        room={user._id} 
                        receiverId="admin" // In backend, we can handle sending to any admin or a specific one
                        onClose={() => setIsOpen(false)} 
                    />
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 group relative"
                >
                    {totalUnread > 0 && (
                        <div className="absolute -top-2 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
                            {totalUnread}
                        </div>
                    )}

                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat with Support
                    </span>
                </button>
            )}
        </div>
    );
};

export default ChatFloatingButton;
