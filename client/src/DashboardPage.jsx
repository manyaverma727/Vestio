import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: 'Trader', balance: 0, id: '' });
    
    // search state
    const [searchQuery, setSearchQuery] = useState('');
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // buy state
    const [quantity, setQuantity] = useState(1);
    const [buyError, setBuyError] = useState('');
    const [portfolio, setPortfolio] = useState([]);

    // 1. Load User Data (Profile + Balance)
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId'); 
            
            if (!token || !userId) return navigate('/login');
    
            try {
                // A. Fetch User Details (Balance) from Backend
                const userRes = await axios.get(`http://localhost:3001/api/auth/user/${userId}`);
                setUser({ 
                    email: userRes.data.email, 
                    balance: userRes.data.balance, // <--- REAL DATABASE BALANCE
                    id: userId 
                });
    
                // B. Fetch Portfolio
                const portfolioRes = await axios.get(`http://localhost:3001/api/trade/portfolio/${userId}`);
                setPortfolio(portfolioRes.data);
    
            } catch (err) {
                console.error("Error loading data:", err);
                // Optional: navigate('/login') if error implies invalid token
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login');
    };

    // 2. Search Stock
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setLoading(true);
        setStock(null);

        try {
            // Use Localhost for development
            const res = await axios.get(`http://localhost:3001/api/stocks/${searchQuery}`);
            setStock(res.data);
            setBuyError('');
        } catch (err) {
            alert('Stock not found');
        } finally {
            setLoading(false);
        }
    };

    // 3. Buy Stock (The New Feature)
    const handleBuy = async () => {
        const token = localStorage.getItem('token');
        
        // We need the User ID to buy.
        if (!user.id) {
            alert("Error: User ID not found. Please log out and log in again.");
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/api/trade/buy', {
                userId: user.id,
                symbol: stock.symbol,
                quantity: Number(quantity),
                price: stock.price
            });

            alert(`Success! Bought ${quantity} shares of ${stock.symbol}`);
            
            // Update Balance UI
            setUser(prev => ({ ...prev, balance: res.data.newBalance }));
            setStock(null); // Clear search
            setQuantity(1);

        } catch (err) {
            setBuyError(err.response?.data?.msg || 'Trade failed');
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
            <div className="text-right">
                <p className="text-sm text-gray-400">Buying Power</p>
                <p className="text-2xl font-bold text-green-400">${user.balance.toLocaleString()}</p>
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
                        className="w-full bg-black/40 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-colors">
                        {loading ? '...' : 'Search'}
                    </button>
                </form>

                {/* Stock Result Card with BUY Button */}
                {stock && (
                    <div className="flex-1 w-full bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex flex-col gap-4 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-2xl tracking-tight">{stock.symbol}</h3>
                                <span className={`text-sm font-bold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${stock.price} ({stock.change > 0 ? '+' : ''}{stock.percentChange}%)
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Total Cost</p>
                                <p className="text-xl font-bold">${(stock.price * quantity).toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Buy Controls */}
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                min="1" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-20 bg-black/50 border border-gray-600 rounded-lg px-2 text-center text-white"
                            />
                            <button 
                                onClick={handleBuy}
                                className="flex-1 bg-green-600 hover:bg-green-500 text-sm py-2 rounded-lg font-bold shadow-lg transition-transform hover:scale-105"
                            >
                                Confirm Buy
                            </button>
                        </div>
                        {buyError && <p className="text-red-400 text-xs text-center">{buyError}</p>}
                    </div>
                )}
            </div>
        </div>

        {/* --- PORTFOLIO PLACEHOLDER (Next Step: Make this real!) --- */}
        <div className="mt-12 max-w-6xl mx-auto bg-gray-900/40 border border-white/5 rounded-2xl p-8 min-h-[300px] flex items-center justify-center border-dashed border-gray-700">
            <p className="text-gray-500">Your portfolio is empty. Search for a stock above to buy!</p>
        </div>

        </div>
    );
};

export default DashboardPage;