import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md">
            <div className="mb-6">
            <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Register
            </h2>
            <p className="text-gray-400 text-center text-sm">Create a new account to get started.</p>
            </div>
            <form className="space-y-5">

                {/* name vala part */}

            <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">Name</label>
                <input
                type="text"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
                />
            </div>

            {/* email vala part */}

            <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">Email</label>
                <input
                type="email"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                />
            </div>

            {/* password vala part */}

            <div>
                <label className="block text-gray-300 font-semibold mb-2 text-sm">Password</label>
                <input
                type="password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                />
            </div>

            {/** button part */}
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50"
            >
                Create Account
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