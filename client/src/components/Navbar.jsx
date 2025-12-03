import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userInitial, setUserInitial] = useState('U');
    const [userEmail, setUserEmail] = useState('User');
    const navigate = useNavigate();
    const location = useLocation();

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
        setIsMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setShowDropdown(false);
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-4 md:py-6 flex justify-between items-center backdrop-blur-md bg-black/60 border-b border-white/10">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer z-50">
                Vestio.
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Home
                </Link>
                <Link to="/companies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    Market
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

            {/* desktop auth vala part */}
            <div className="hidden md:flex items-center gap-6">
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

            {/* hamburger menu vala part */}
            <button
                className="md:hidden text-white z-50 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden">
                    <Link to="/" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link to="/companies" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
                        Market
                    </Link>
                    <Link to="/about" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
                        About Us
                    </Link>
                    {isLoggedIn && (
                        <Link to="/dashboard" className="text-xl font-medium text-gray-300 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                    )}

                    <div className="w-16 h-px bg-gray-800 my-2"></div>

                    {!isLoggedIn ? (
                        <div className="flex flex-col gap-4 items-center w-full px-8">
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium text-lg transition-colors duration-200">
                                Log In
                            </Link>
                            <Link to="/register" className="w-full text-center px-6 py-3 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300">
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 items-center">
                            <div className="text-center">
                                <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                                <p className="text-lg font-bold text-white">{userEmail}</p>
                            </div>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-medium text-lg transition-colors">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;