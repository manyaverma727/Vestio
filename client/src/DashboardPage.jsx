import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: 'Trader', balance: 100000 });
    
    // State for Search
    const [searchQuery, setSearchQuery] = useState('');
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(false);

    // 1. Protect Route & Load User
    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        if (!token) {
        navigate('/login');
        } else if (email) {
        setUser(prev => ({ ...prev, email }));
        }
    }, [navigate]);

    // 2. Handle Logout
    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login');
    };

    // 3. Search Function
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setLoading(true);
        setStock(null);

        try {
            // Call YOUR backend API
            const res = await axios.get(`http://localhost:3001/api/stocks/${searchQuery}`);
            console.log("Stock Data:", res.data);
            setStock(res.data);

        } catch (err) {
            console.error(err);
            alert('Stock not found or Backend not running');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white font-sans p-8 pt-24 bg-transparent">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
            <div>
            <h1 className="text-3xl font-bold">Welcome, <span className="text-blue-400">{user.email}</span></h1>
            <p className="text-gray-400 text-sm mt-1">Market Status: <span className="text-green-400">Live</span></p>
            </div>
        </header>

        {/* --- SEARCH SECTION --- */}
        <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
                
                {/* Search Input */}
                <form onSubmit={handleSearch} className="flex-1 w-full flex gap-4">
                    <input 
                        type="text" 
                        placeholder="Search Symbol (e.g. AAPL)..." 
                        className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        {loading ? '...' : 'Search'}
                    </button>
                </form>

                {/* Stock Result Card */}
                {stock && (
                    <div className="flex-1 w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex justify-between items-center animate-fade-in">
                        <div>
                            <h3 className="font-bold text-2xl tracking-tight">{stock.symbol}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-sm font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.percentChange.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
                            <button className="mt-2 bg-green-600 hover:bg-green-500 text-xs px-6 py-2 rounded-lg font-bold shadow-lg transition-transform hover:scale-105">
                                BUY
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Buying Power</h3>
            <p className="text-4xl font-bold mt-2 text-white">${user.balance.toLocaleString()}</p>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Portfolio Value</h3>
            <p className="text-4xl font-bold mt-2 text-white">$100,000.00</p>
            <span className="text-gray-500 text-sm">Start trading to see gains</span>
            </div>
        </div>

        {/* --- PORTFOLIO PLACEHOLDER --- */}
        <div className="mt-12 max-w-6xl mx-auto bg-gray-900/40 border border-white/5 rounded-2xl p-8 min-h-[300px] flex items-center justify-center border-dashed border-gray-700">
            <p className="text-gray-500">Your portfolio is empty. Search for a stock above!</p>
        </div>

        </div>
    );
};

export default DashboardPage;