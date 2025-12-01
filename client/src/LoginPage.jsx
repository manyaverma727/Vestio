import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            })

            const token = res.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('email', email)
            
            alert('Login Successful!')
            navigate('/')

        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials')
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
            {/* Navbar matching HomePage */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/60 border-b border-white/10">
                <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer">
                    Vestio.
                </Link>
                <div className="flex items-center gap-6">
                    <Link 
                        to="/register" 
                        className="px-6 py-2 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center text-center pt-40 px-4 relative min-h-screen">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                <div className="w-full max-w-md relative z-10">
                    <div className="mb-8">
                        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                Welcome Back
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">Sign in to continue your trading journey</p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-semibold text-red-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2 text-sm">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 font-semibold mb-2 text-sm">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full px-8 py-4 bg-blue-600 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <span className="relative z-10">
                                {isLoading ? 'Signing In...' : 'Sign In'} &rarr;
                            </span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-blue-500/50"></div>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage