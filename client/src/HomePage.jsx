import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">

        {/*  Nav bar for login and signup */ }

        <nav className="flex justify-end items-center p-6">
            <div className="flex gap-4">
            <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
                Login
            </Link>
            <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50"
            >
                Register
            </Link>
            </div>
        </nav>

        {/* center content*/}
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
            <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Vestio
            </h1>
            <p className="text-gray-400 text-xl">Welcome to your trading simulation platform</p>
            </div>
        </div>
        </div>
    );
};

export default HomePage;