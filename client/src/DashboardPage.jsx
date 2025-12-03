import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './api';

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({ email: 'Trader', balance: 0, id: '' });

    // search state vala part
    const [searchQuery, setSearchQuery] = useState('');
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(false);

    // buy/sell state vala part
    const [tradeMode, setTradeMode] = useState('BUY'); // 'BUY' or 'SELL'
    const [quantity, setQuantity] = useState(1);
    const [buyError, setBuyError] = useState('');
    const [portfolio, setPortfolio] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // user data..pura balance and profile
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) return navigate('/login');

            try {
                // user data fetch kar rha bac kend se

                const userRes = await axios.get(`${API_BASE_URL}/api/auth/user/${userId}`);
                setUser({
                    email: userRes.data.email,
                    balance: userRes.data.balance, // ye hai real balance data
                    id: userId
                });

                // portfolio fetch kar rha

                const portfolioRes = await axios.get(`${API_BASE_URL}/api/trade/portfolio/${userId}`);
                setPortfolio(portfolioRes.data);

                // transactions fetch kar rha
                const transactionsRes = await axios.get(`${API_BASE_URL}/api/trade/transactions/${userId}`);
                setTransactions(transactionsRes.data);

                // Check for incoming stock symbol from CompanyListPage
                if (location.state?.symbol) {
                    setSearchQuery(location.state.symbol);
                    handleSearch(null, location.state.symbol);
                    // Clear state so it doesn't persist on refresh
                    window.history.replaceState({}, document.title);
                }

            } catch (err) {
                console.error("Error loading data:", err);
                // error ke liye hai ye part
            }
        };
        fetchData();
    }, [navigate, location.state]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // stock search karne vala part

    const handleSearch = async (e, symbolOverride = null) => {
        if (e) e.preventDefault();
        const query = symbolOverride || searchQuery;

        if (!query) return;
        setLoading(true);
        setStock(null);

        try {
            const res = await axios.get(`${API_BASE_URL}/api/stocks/${query}`);
            setStock(res.data);
            setBuyError('');
        } catch (err) {
            alert('Stock not found');
        } finally {
            setLoading(false);
        }
    };

    // stock khareedne/beechne ke liye hai ye

    const handleTrade = async () => {
        const token = localStorage.getItem('token');

        // user id chahiye beechne ya khareedne ke liye
        if (!user.id) {
            alert("Error: User ID not found. Please log out and log in again.");
            return;
        }

        try {
            const endpoint = tradeMode === 'BUY' ? '/api/trade/buy' : '/api/trade/sell';
            const res = await axios.post(`${API_BASE_URL}${endpoint}`, {
                userId: user.id,
                symbol: stock.symbol,
                quantity: Number(quantity),
                price: stock.price
            });

            alert(`Success! ${tradeMode === 'BUY' ? 'Bought' : 'Sold'} ${quantity} shares of ${stock.symbol}`);

            // balance update vala part

            // balance update vala part

            setUser(prev => ({ ...prev, balance: res.data.newBalance }));
            setStock(null);
            setQuantity(1);

            // Refresh portfolio and transactions
            const portfolioRes = await axios.get(`${API_BASE_URL}/api/trade/portfolio/${user.id}`);
            setPortfolio(portfolioRes.data);

            const transactionsRes = await axios.get(`${API_BASE_URL}/api/trade/transactions/${user.id}`);
            setTransactions(transactionsRes.data);

        } catch (err) {
            setBuyError(err.response?.data?.msg || 'Trade failed');
        }
    };

    return (
        <div className="min-h-screen text-white font-sans p-4 md:p-8 pt-24 bg-transparent">

            {/* header dashboard ka */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 max-w-6xl mx-auto gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Welcome, <span className="text-blue-400">{user.email}</span></h1>
                    <p className="text-gray-400 text-sm mt-1">Market Status: <span className="text-green-400">Live</span></p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto bg-gray-900/50 p-4 rounded-xl md:bg-transparent md:p-0">
                    <p className="text-sm text-gray-400">Buying Power</p>
                    <p className="text-2xl font-bold text-green-400">${user.balance.toLocaleString()}</p>
                </div>
            </header>

            {/* search section....search bar */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">

                    {/* search karne pr jo input hoga */}
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

                    {/* buy button..stock khareedne ke liye */}
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

                            {/* Buy/Sell Toggle */}
                            <div className="flex gap-2 bg-black/30 p-1 rounded-lg">
                                <button
                                    onClick={() => setTradeMode('BUY')}
                                    className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${tradeMode === 'BUY' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => setTradeMode('SELL')}
                                    className={`flex-1 py-2 rounded-md font-bold text-sm transition-all ${tradeMode === 'SELL' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Sell
                                </button>
                            </div>

                            {/* quantity increase or decrease karne ke liye arrow button  */}
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-20 bg-black/50 border border-gray-600 rounded-lg px-2 text-center text-white"
                                />
                                <button
                                    onClick={handleTrade}
                                    className={`flex-1 text-sm py-2 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 ${tradeMode === 'BUY' ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
                                >
                                    {tradeMode === 'BUY' ? 'Confirm Buy' : 'Confirm Sell'}
                                </button>
                            </div>
                            {buyError && <p className="text-red-400 text-xs text-center">{buyError}</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* portfolio vala part */}
            {/* portfolio vala part */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Portfolio Table */}
                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Your Portfolio</h2>
                    {portfolio.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No stocks owned yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-sm border-b border-gray-700">
                                        <th className="pb-2">Symbol</th>
                                        <th className="pb-2">Qty</th>
                                        <th className="pb-2">Avg Price</th>
                                        <th className="pb-2">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {portfolio.map((item) => (
                                        <tr key={item._id} className="border-b border-gray-800 last:border-0">
                                            <td className="py-3 font-bold text-blue-400">{item.symbol}</td>
                                            <td className="py-3">{item.quantity}</td>
                                            <td className="py-3">${item.avgPrice.toFixed(2)}</td>
                                            <td className="py-3 text-green-400 font-bold">
                                                ${(item.quantity * item.avgPrice).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Transaction History */}
                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Transaction History</h2>
                    {transactions.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No transactions yet.</p>
                    ) : (
                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400 text-sm border-b border-gray-700">
                                        <th className="pb-2">Type</th>
                                        <th className="pb-2">Symbol</th>
                                        <th className="pb-2">Qty</th>
                                        <th className="pb-2">Price</th>
                                        <th className="pb-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {transactions.map((tx) => (
                                        <tr key={tx._id} className="border-b border-gray-800 last:border-0">
                                            <td className={`py-3 font-bold ${tx.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.type}
                                            </td>
                                            <td className="py-3 font-bold">{tx.symbol}</td>
                                            <td className="py-3">{tx.quantity}</td>
                                            <td className="py-3">${tx.price.toFixed(2)}</td>
                                            <td className="py-3 text-gray-400 text-xs">
                                                {new Date(tx.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;