import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const DashboardPage = () => {
    const { currentUser } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen bg-[#F5F6FA]">
            {/* Mobile menu button */}
            <div className="md:hidden fixed z-20 top-4 left-4">
                <button
                    className="p-2 bg-white rounded-md shadow-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* Sidebar for mobile - shown conditionally */}
            <div
                className={`fixed inset-0 z-10 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="absolute top-0 left-0 h-full z-20">
                    <Sidebar />
                </div>
            </div>

            {/* Sidebar for desktop - always shown */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-5">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Vehicle Dashboard</h1>
                        <p className="text-gray-600">
                            Welcome back, {currentUser?.fullname || 'User'}
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;