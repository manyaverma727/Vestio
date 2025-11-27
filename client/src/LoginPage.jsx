import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();         //reloading se rokta hai
        setIsLoading(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md">
                <div className="mb-6">
                    <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Login
                    </h2>
                    <p className="text-gray-400 text-center text-sm">Welcome back! Please sign in to continue.</p>
                </div>
            
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* email part*/ }

                    <div>
                        <label className="block text-gray-300 font-semibold mb-2 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* password vala part */}

                    <div>
                        <label className="block text-gray-300 font-semibold mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">

                    {/* home page vapas jane ke liye */}

                    <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;