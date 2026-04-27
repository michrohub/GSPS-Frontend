import { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatFloatingButton from '../components/Chat/ChatFloatingButton';
import {
    FaTachometerAlt,
    FaIdCard,
    FaTools,
    FaMoneyBillWave,
    FaUsers,
    FaFileContract,
    FaUserGraduate,
    FaChartLine,
    FaComments
} from "react-icons/fa";

import { TbLogout } from "react-icons/tb";



const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
        { name: 'KYC Status', path: '/dashboard/kyc', icon: FaIdCard },
        { name: 'Service', path: '/dashboard/service', icon: FaTools },
        { name: 'Payments', path: '/dashboard/payments', icon: FaMoneyBillWave },
        { name: 'Referrals', path: '/dashboard/referrals', icon: FaUsers },
        { name: 'Profile', path: '/dashboard/profile', icon: FaUserGraduate },
        // { name: 'Terms & Conditions', path: '/dashboard/terms', icon: FaFileContract },
    ];

    const adminItems = [
        { name: 'Dashboard', path: '/admin/analytics', icon: FaChartLine },
        { name: 'KYC Management', path: '/admin/kyc', icon: FaIdCard },
        { name: 'Payments list', path: '/admin/payments', icon: FaMoneyBillWave },
        { name: 'User Management', path: '/admin/users', icon: FaUsers },
        { name: 'Fee Applications', path: '/admin/service', icon: FaFileContract },

        { name: 'Live Chat', path: '/admin/chat', icon: FaComments },
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
                    {actualItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center space-x-4 px-6 py-4 rounded-[10px] transition-all ${location.pathname === item.path
                                    ? 'bg-gsps-green text-white shadow-lg'
                                    : 'hover:bg-white/5 text-white/60 hover:text-white'
                                    }`}
                            >
                                {/* ✅ icon render */}
                                <Icon className="text-xl" />

                                <span className="font-bold">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className=" mt-auto border-t border-white/5">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className="flex items-center space-x-4 px-6 py-4 w-full text-left text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-2xl transition-all cursor-pointer"
                    >
                        <TbLogout />

                        <span className="font-bold">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (user && user.role === 'student' && !user.termsAccepted) {
        return (
            <div className="min-h-screen bg-gsps-bg-light flex flex-col items-center justify-center p-6">
                <main className="w-full max-w-4xl">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gsps-bg-light">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            <div className="lg:ml-72 flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-6 py-3 flex items-center justify-between">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden px-4 py-2 text-gsps-blue bg-white rounded-[10px] shadow-sm">☰</button>

                    <div className="relative ml-auto" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-2xl transition-all"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="font-black text-gsps-blue leading-none">{user?.fullName}</p>
                                <p className="text-xs font-bold text-gsps-blue/40 uppercase tracking-widest mt-1">{user?.role === 'admin' ? 'Administrator' : 'Student Account'}</p>
                            </div>
                            <div className="w-12 h-12 bg-gsps-green/10 text-gsps-green rounded-2xl flex items-center justify-center font-black text-lg overflow-hidden border-2 border-white shadow-sm">
                                {user?.profileImage ? (
                                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    user?.fullName?.charAt(0)
                                )}
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-[10px] shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Link
                                    to="/dashboard/profile"
                                    className="flex items-center space-x-2 gap-2 block px-6 py-3 text-sm font-bold text-gsps-blue hover:bg-gsps-bg-light hover:text-gsps-green transition-all"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <FaUserGraduate />  Profile
                                </Link>
                                <hr className="my-1 border-gray-50" />
                                <button
                                    onClick={() => { logout(); navigate('/login'); }}
                                    className="flex items-center space-x-2 gap-2 w-full text-left px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50/50 transition-all"
                                >
                                    <TbLogout />
                                    Logout
                                </button>
                            </div>
                        )}
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
