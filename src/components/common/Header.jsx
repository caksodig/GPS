import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { currentUser } = useAuth();

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchQuery);
    };

    return (
        // <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        //     <form onSubmit={handleSearch} className="relative">
        //         <input
        //             type="text"
        //             placeholder="Search"
        //             value={searchQuery}
        //             onChange={(e) => setSearchQuery(e.target.value)}
        //             className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
        //         />
        //         <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        //     </form>

        //     <div className="flex items-center">
        //         <div className="mr-6">
        //             <span className="text-sm text-gray-600">English</span>
        //         </div>

        //         <div className="flex items-center">
        //             <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
        //                 {/* User avatar */}
        //                 <img
        //                     src="/api/placeholder/40/40"
        //                     alt="User Avatar"
        //                     className="w-full h-full object-cover"
        //                 />
        //             </div>
        //             <div>
        //                 <div className="text-sm font-medium">{currentUser?.fullname || 'User'}</div>
        //                 <div className="text-xs text-gray-500">Admin</div>
        //             </div>
        //         </div>
        //     </div>
        // </header>
        <header className="bg-white p-4 flex items-center justify-between flex-wrap gap-4">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative flex-grow max-w-[70%] sm:max-w-xs">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </form>

            {/* User Info */}
            <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden mr-2">
                    <img
                        src="/api/placeholder/40/40"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-sm">
                    <div className="font-medium truncate max-w-[100px]">{currentUser?.fullname || 'User'}</div>
                    <div className="text-xs text-gray-500">Admin</div>
                </div>
            </div>
        </header>


    );
};

export default Header;