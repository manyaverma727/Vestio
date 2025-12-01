import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userInitial, setUserInitial] = useState('U');
    const [userEmail, setUserEmail] = useState('User');
    const navigate = useNavigate();

    // check kar rha is the user logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email'); // Get email from storage

        if (token) {
            setIsLoggedIn(true);
            if (email) {
                setUserEmail(email);
                setUserInitial(email.charAt(0).toUpperCase());
            }
        }
    }, []);

    //handle layout hai

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsLoggedIn(false); 
        setShowDropdown(false); 
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">

        {/* home page center content */}
        <main className="flex flex-col items-center justify-center text-center pt-40 px-4 relative min-h-screen z-10">

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Master the <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Stock Market.
            </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            Experience real-time trading with zero risk. <br />
            Start with <span className="text-white font-semibold">$100,000</span> in paper money today.
            </p>

            {/* Change CTA acc to login state */}
            <Link 
            to={isLoggedIn ? "/dashboard" : "/register"}
            className="group relative px-8 py-4 bg-blue-600 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1"
            >
            <span className="relative z-10">
                {isLoggedIn ? "Go to Dashboard" : "Start Trading Now"} &rarr;
            </span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-500/50"></div>
            </Link>

        </main>
        </div>
    );
};

export default HomePage;