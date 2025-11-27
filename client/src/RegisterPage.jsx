import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await axios.post('http://localhost:3001/api/auth/register', {
                name,
                email,
                password,
            });

            alert('Registration Successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Try again.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md">
            <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Register
            </h2>
            <p className="text-gray-400 text-center text-sm">Create a new account to get started.</p>
            </div>
            {error && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm font-semibold text-red-300">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* name vala part */}

            <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                required
                />
            </div>

            {/* email vala part */}

            <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
                />
            </div>

            {/** button part */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50"
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            </form>

            {/** home page vapas jane ke liye */}

            <div className="mt-6 text-center">
            <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm">
                ← Back to Home
            </Link>
            </div>
        </div>
        </div>
    );
};

export default RegisterPage;