import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from './api';

const CompanyListPage = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/stocks/market`);
                setCompanies(res.data);
            } catch (err) {
                console.error("Error fetching market data:", err);
                setError('Failed to load market data');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();

        // Refresh every minute
        const interval = setInterval(fetchCompanies, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleTrade = (symbol) => {
        navigate('/dashboard', { state: { symbol } });
    };

    return (
        <div className="min-h-screen text-white font-sans p-4 md:p-8 pt-24 bg-transparent">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Market Overview</h1>
                    <p className="text-gray-400 text-sm mt-1">Real-time prices for top companies</p>
                </header>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading market data...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-xl text-center text-red-400">
                        {error}
                    </div>
                ) : (
                    <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 text-gray-400 text-sm">
                                        <th className="p-4 font-medium">Symbol</th>
                                        <th className="p-4 font-medium">Price</th>
                                        <th className="p-4 font-medium">Change</th>
                                        <th className="p-4 font-medium">% Change</th>
                                        <th className="p-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {companies.map((company) => (
                                        <tr key={company.symbol} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold text-blue-400">{company.symbol}</td>
                                            <td className="p-4 font-medium">${company.price.toFixed(2)}</td>
                                            <td className={`p-4 font-medium ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {company.change > 0 ? '+' : ''}{company.change.toFixed(2)}
                                            </td>
                                            <td className={`p-4 font-medium ${company.percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {company.percentChange > 0 ? '+' : ''}{company.percentChange.toFixed(2)}%
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleTrade(company.symbol)}
                                                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-colors"
                                                >
                                                    Trade
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyListPage;
