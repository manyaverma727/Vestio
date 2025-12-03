import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userInitial, setUserInitial] = useState('U');
    const [userEmail, setUserEmail] = useState('User');
    const navigate = useNavigate();
    const location = useLocation();

    // Check login status whenever the route changes (location dependency)
    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token) {
                setIsLoggedIn(true);
                if (email) {
                    setUserEmail(email);
                    setUserInitial(email.charAt(0).toUpperCase());
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLogin();
    }, [location]); // Re-run this check every time we change pages

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setShowDropdown(false);
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/60 border-b border-white/10">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                Vestio.
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Home
                </Link>
                <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    About Us
                </Link>
                {isLoggedIn && (
                    <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Dashboard
                    </Link>
                )}
            </div>

            <div className="flex items-center gap-6">
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="text-gray-300 hover:text-white font-medium text-sm transition-colors duration-200">
                            Log In
                        </Link>
                        <Link to="/register" className="px-6 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-blue-500/50 transition-all"
                        >
                            {userInitial}
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-800">
                                    <p className="text-xs text-gray-400">Signed in as</p>
                                    <p className="text-sm font-bold text-white truncate">{userEmail}</p>
                                </div>
                                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <div className="border-t border-gray-800 my-1"></div>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;