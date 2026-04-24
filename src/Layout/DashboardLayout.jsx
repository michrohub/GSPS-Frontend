import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatFloatingButton from '../components/Chat/ChatFloatingButton';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: '📊' },
        { name: 'KYC Status', path: '/dashboard/kyc', icon: '🪪' },
        { name: 'Service', path: '/dashboard/service', icon: '🛠️' },
        { name: 'Payments', path: '/dashboard/payments', icon: '💸' },
        { name: 'Referrals', path: '/dashboard/referrals', icon: '👥' },
        { name: 'Wallet', path: '/dashboard/wallet', icon: '💰' },
    ];

    const adminItems = [
        { name: 'KYC Management', path: '/admin/kyc', icon: '🔍' },
        { name: 'Payments list', path: '/admin/payments', icon: '💳' },
        { name: 'User Management', path: '/admin/users', icon: '👥' },
        { name: 'Fee Applications', path: '/admin/service', icon: '📑' },
        { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
        { name: 'Live Chat', path: '/admin/chat', icon: '💬' },
    ];

    const actualItems = user?.role === 'admin' ? adminItems : menuItems;

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gsps-blue text-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex flex-col h-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent)]">
                <div className="p-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                        <img src="/logo2.png" alt="GSPS" className="h-10 brightness-0 invert" />
                    </Link>
                    <button onClick={toggleSidebar} className="lg:hidden text-white/60 hover:text-white">✕</button>
                </div>

                <nav className="flex-1 px-6 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {actualItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-4 px-6 py-4 rounded-[10px] transition-all ${
                                location.pathname === item.path ? 'bg-gsps-green text-white shadow-lg' : 'hover:bg-white/5 text-white/60 hover:text-white'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-bold">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className=" mt-auto border-t border-white/5">
                    <button 
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center space-x-4 px-6 py-4 w-full text-left text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all cursor-pointer"
                    >
                        <span>🚪</span>
                        <span className="font-bold">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gsps-bg-light">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
            
            <div className="lg:ml-72 flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-6 py-3 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden px-4 py-2 text-gsps-blue bg-white rounded-[10px] shadow-sm">☰</button>
                    
                    <div className="flex items-center space-x-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="font-black text-gsps-blue leading-none">{user?.fullName}</p>
                            <p className="text-xs font-bold text-gsps-blue/40 uppercase tracking-widest mt-1">{user?.role === 'admin' ? 'Administrator' : 'Student Account'}</p>
                        </div>
                        <div className="w-12 h-12 bg-gsps-green/10 text-gsps-green rounded-2xl flex items-center justify-center font-black text-lg">
                            {user?.fullName?.charAt(0)}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-6 overflow-x-hidden">
                    <Outlet />
                </main>
                <ChatFloatingButton />
            </div>
        </div>
    );
};

export default DashboardLayout;
