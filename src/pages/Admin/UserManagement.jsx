import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [tier, setTier] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/admin/users?search=${search}&role=${role}&tier=${tier}`);
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        const debounceFetch = setTimeout(fetchUsers, 300);
        return () => clearTimeout(debounceFetch);
    }, [search, role, tier]);


    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-[23px] lg:text-4xl font-black text-gsps-blue mb-2">User <span className="text-gsps-green">Database</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Monitor & Manage Accounts</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-[10px] border border-gray-100 focus:border-gsps-blue outline-none font-bold text-sm shadow-sm transition-all"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                </div>
                
                <div className="flex gap-4 w-full md:w-auto">
                    <select 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="flex-1 md:flex-none px-4 py-4 rounded-[10px] border border-gray-100 font-bold text-sm outline-none bg-white shadow-sm"
                    >
                        <option value="">All Roles</option>
                        <option value="student">Students</option>
                        <option value="admin">Admins</option>
                    </select>

                    <select 
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className="flex-1 md:flex-none px-4 py-4 rounded-[10px] border border-gray-100 font-bold text-sm outline-none bg-white shadow-sm"
                    >
                        <option value="">All Tiers</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Diamond">Diamond</option>
                    </select>
                </div>
            </div>


            <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-y-auto mb-[40px]">
                <table className="w-full text-left">
                        <thead className="bg-[#003b73] border-b border-gray-100 ">
                        <tr className='whitespace-nowrap'>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Full Name</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Email</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">KYC Status</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Tier</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Referrals</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Wallet</th>
                            <th className="px-8 py-5 text-xs font-black text-white  tracking-widest">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-gsps-bg-light/30 transition-all whitespace-nowrap">
                                <td className="px-8 py-5 font-black text-gsps-blue">{u.fullName}</td>
                                <td className="px-8 py-5 font-bold text-sm text-gsps-blue/60">{u.email}</td>
                                <td className="px-8 py-5">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                        u.kycStatus === 'approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                    }`}>{u.kycStatus}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                        u.tier === 'Diamond' ? 'bg-purple-100 text-purple-600' : 
                                        u.tier === 'Gold' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                    }`}>{u.tier || 'Silver'}</span>
                                </td>
                                <td className="px-8 py-5 font-black text-gsps-blue">{u.referralCount || 0}</td>
                                <td className="px-8 py-5 font-black text-gsps-blue">${u.walletBalance.toFixed(2)}</td>
                                <td className="px-8 py-5 font-bold text-sm text-gsps-blue/40">{new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
