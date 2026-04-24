import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/admin/analytics');
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div>Loading reports...</div>;

    return (
        <div className="space-y-12">
            <header>
                <h1 className=" text-[23px] lg:text-4xl font-black text-gsps-blue mb-2">Platform <span className="text-gsps-green">Analytics</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Real-time Performance Metrics</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: data?.totalUsers, icon: '👥', color: 'bg-blue-50 text-gsps-blue' },
                    { label: 'Processed Payments', value: data?.totalPayments, icon: '🏦', color: 'bg-green-50 text-gsps-green' },
                    { label: 'Transaction Volume', value: `$${data?.totalVolume.toLocaleString()}`, icon: '💰', color: 'bg-orange-50 text-orange-600' },
                    { label: 'Estimated Revenue', value: `$${data?.totalRevenue.toLocaleString()}`, icon: '📈', color: 'bg-gsps-blue text-white' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-[10px] shadow-sm border border-gray-100 group">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                        <p className="text-xs font-black text-gsps-blue/30   mb-2">{stat.label}</p>
                        <p className="text-4xl font-black text-gsps-blue">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white p-12 rounded-[10px] border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-black text-gsps-blue mb-12">Global Distribution</h3>
                <div className="h-80 bg-gsps-bg-light rounded-[40px] flex items-center justify-center border border-dashed border-gray-200">
                    <p className="text-gsps-blue/30 font-bold uppercase tracking-widest">[ Interactive Map Visualization Coming Soon ]</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
