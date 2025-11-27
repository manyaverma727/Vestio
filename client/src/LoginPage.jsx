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
            // sending login request to server

            const res = await axios.post('https://vestio-trading.onrender.com/api/auth/login', {
                email,
                password,
            })

            // token mil rha yaha se

            const token = res.data.token
            
            //token save ho rha

            localStorage.setItem('token', token)
            
            //success

            alert('Login Successful!')
            navigate('/') // Go to Home Page

        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials')
        } finally {
            setIsLoading(false)
        }
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
            
                {error && (
                    <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm font-semibold text-red-300">
                        {error}
                    </div>
                )}
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

                    <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage