import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, changePassword } from '../../services/api';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    
    // Profile Update State
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.profileImage || null);

    // Password Update State
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('fullName', fullName);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const res = await updateProfile(formData);
            setUser(res.data.user);
            toast.success('Profile updated successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        if (passwords.newPassword.length < 6) {
            return toast.error('Password must be at least 6 characters');
        }

        setPasswordLoading(true);
        try {
            await changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            toast.success('Password changed successfully');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <header>
                <h1 className="text-4xl font-black text-gsps-blue mb-2">Account <span className="text-gsps-green">Profile</span></h1>
                <p className="text-gsps-blue/40 font-bold uppercase tracking-widest text-sm">Manage your personal information and security</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleProfileUpdate} className="bg-white p-8 rounded-[10px] shadow-sm border border-gray-100 space-y-8">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gsps-bg-light border-4 border-white shadow-xl">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-gsps-blue/20">
                                            {fullName?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute inset-0 flex items-center justify-center bg-gsps-blue/60 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl cursor-pointer text-xs font-black uppercase tracking-widest">
                                    Change
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                            </div>
                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <h3 className="text-2xl font-black text-gsps-blue">{user?.fullName}</h3>
                                <p className="text-gsps-blue/40 font-bold">{user?.email}</p>
                                <p className="text-xs font-black bg-gsps-green/10 text-gsps-green px-3 py-1 rounded-full inline-block uppercase tracking-widest">
                                    {user?.role} Account
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2 opacity-50 cursor-not-allowed">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Email Address (Locked)</label>
                                <input 
                                    type="email" 
                                    value={user?.email || ''} 
                                    disabled 
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent outline-none font-bold text-gsps-blue"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full md:w-auto px-12 py-4 bg-gsps-blue text-white rounded-2xl font-black shadow-lg shadow-blue-500/10 hover:bg-gsps-green transition-all active:scale-95 disabled:opacity-50"
                        >
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </form>

                    {/* Change Password */}
                    <form onSubmit={handlePasswordUpdate} className="bg-white p-8 rounded-[10px] shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-xl font-black text-gsps-blue mb-4">Security & <span className="text-gsps-green">Password</span></h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Current Password</label>
                                <input 
                                    type="password" 
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">New Password</label>
                                    <input 
                                        type="password" 
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                        placeholder="••••••••"
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                                        placeholder="••••••••"
                                        className="w-full px-6 py-4 rounded-2xl bg-gsps-bg-light border-2 border-transparent focus:border-gsps-green/30 outline-none font-bold text-gsps-blue transition-all"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={passwordLoading}
                            className="w-full md:w-auto px-12 py-4 bg-gsps-blue text-white rounded-2xl font-black shadow-lg shadow-blue-500/10 hover:bg-gsps-green transition-all active:scale-95 disabled:opacity-50"
                        >
                            {passwordLoading ? 'Updating Password...' : 'Update Password'}
                        </button>
                    </form>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-gsps-blue p-8 rounded-[10px] text-white">
                        <h3 className="text-xl font-black mb-4">Security Tip</h3>
                        <p className="text-white/60 font-bold leading-relaxed text-sm">
                            Use a strong password with a mix of letters, numbers, and symbols. Avoid using the same password for multiple accounts.
                        </p>
                    </div>
                    <div className="bg-gsps-green/10 p-8 rounded-[10px]">
                        <h3 className="text-xl font-black text-gsps-blue mb-4">Account Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gsps-blue/60 font-bold text-sm">KYC Status</span>
                                <span className="px-2 py-1 bg-white text-gsps-green rounded-lg text-[10px] font-black uppercase tracking-widest border border-gsps-green/20">{user?.kycStatus}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gsps-blue/60 font-bold text-sm">Tier</span>
                                <span className="px-2 py-1 bg-white text-gsps-blue rounded-lg text-[10px] font-black uppercase tracking-widest border border-gsps-blue/20">{user?.tier}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
