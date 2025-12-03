import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import LiquidEther from './components/LiquidEther';
import Navbar from './components/Navbar';
import DashboardPage from './DashboardPage';
import AboutUsPage from './AboutUsPage';
import CompanyListPage from './CompanyListPage';
import ProfilePage from './ProfilePage';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
                {/* Global LiquidEther Background */}
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                >
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                {/** Navbar */}
                <div style={{ position: 'relative', zIndex: 50 }}>
                    <Navbar />
                </div>
                {/* Page Content */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/companies" element={<CompanyListPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;