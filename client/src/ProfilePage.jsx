import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './api';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', balance: 0, createdAt: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get(`${API_BASE_URL}/api/auth/user/${userId}`);
                setUser(res.data);
            } catch (err) {
                console.error("Error loading user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans p-4 md:p-8 pt-24 bg-transparent">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your account information</p>
                </header>

                {/* Profile Card */}
                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 md:p-8">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{user.email}</h2>
                            <p className="text-gray-400 text-sm mt-1">Active Trader</p>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <p className="text-xs text-gray-400 mb-1">Email Address</p>
                                    <p className="text-base font-medium text-white">{user.email}</p>
                                </div>
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <p className="text-xs text-gray-400 mb-1">Account Balance</p>
                                    <p className="text-base font-bold text-green-400">${user.balance.toLocaleString()}</p>
                                </div>
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <p className="text-xs text-gray-400 mb-1">Member Since</p>
                                    <p className="text-base font-medium text-white">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <p className="text-xs text-gray-400 mb-1">Account Status</p>
                                    <p className="text-base font-medium text-green-400">Active</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                                >
                                    Go to Dashboard
                                </button>
                                <button
                                    onClick={() => navigate('/companies')}
                                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
                                >
                                    View Market
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
