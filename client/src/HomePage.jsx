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
        const email = localStorage.getItem('email'); 
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
        
        {/*  nav bar  */}

        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/60 border-b border-white/10 relative z-10">
            
            {/* Logo after login */}

            <div className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
            Vestio.
            </div>

            
            <div className="flex items-center gap-6">
            
            {!isLoggedIn ? (
                /*  if not login  */

                <>
                <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-white font-medium text-sm transition-colors duration-200"
                >
                    Log In
                </Link>
                <Link 
                    to="/register" 
                    className="px-6 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                    Sign Up
                </Link>
                </>
            ) : (
                /* agar login ho gaye to proflie show karna */

                <div className="relative">
                {/* profile circle photo */}

                <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                    {/* Initial (You can replace this with a real user initial later) */}
                    {userInitial}
                </button>

                {/* profile ka dropdown menu */}

                {showDropdown && (
                    <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-800">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{}</p>
                    </div>
                    
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        View Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                        Settings
                    </Link>
                    <div className="border-t border-gray-800 my-1"></div>
                    <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
                    >
                        Sign Out
                    </button>
                    </div>
                )}
                </div>
            )}
            
            </div>
        </nav>

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