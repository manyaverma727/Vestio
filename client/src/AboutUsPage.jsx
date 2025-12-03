import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden pt-24">
            <div className="max-w-4xl mx-auto px-8">
                <h1 className="text-5xl font-extrabold mb-8 tracking-tight">
                    About <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Vestio</span>
                </h1>

                <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        Welcome to <strong>Vestio</strong>, your premier destination for simulated stock trading.
                        We believe that financial literacy should be accessible, risk-free, and engaging.
                    </p>
                    <p>
                        Our platform allows you to experience the thrill of the stock market without the fear of losing real money.
                        Whether you are a seasoned investor looking to test new strategies or a beginner taking your first steps
                        into the world of finance, Vestio provides the perfect sandbox environment.
                    </p>
                    <p>
                        With real-time market data, intuitive portfolio management, and a sleek, modern interface,
                        Vestio empowers you to learn, grow, and master the art of trading.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
