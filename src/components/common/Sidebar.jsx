// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//     const { logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const navigation = [
//         { name: 'Dashboard', icon: 'fa-tachometer-alt', path: '/' },
//         { name: 'Job', icon: 'fa-briefcase', path: '/job' },
//         { name: 'Vehicle Lists', icon: 'fa-car', path: '/vehicles' },
//     ];

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <div className="bg-white h-screen w-64 border-r border-gray-200 flex flex-col">
//             <div className="p-5 text-2xl font-bold text-primary border-b border-gray-200">
//                 GPS.ID TMS
//             </div>

//             <div className="flex-1">
//                 {navigation.map((item) => (
//                     <div
//                         key={item.name}
//                         className={`flex items-center px-5 py-4 hover:bg-gray-100 cursor-pointer ${location.pathname === item.path ? 'bg-gray-100 border-l-4 border-primary text-primary' : 'text-gray-600'
//                             }`}
//                         onClick={() => navigate(item.path)}
//                     >
//                         <i className={`fas ${item.icon} w-6`}></i>
//                         <span className="ml-3">{item.name}</span>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-auto border-t border-gray-200">
//                 <div
//                     className="flex items-center px-5 py-4 text-gray-600 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => navigate('/settings')}
//                 >
//                     <i className="fas fa-cog w-6"></i>
//                     <span className="ml-3">Settings</span>
//                 </div>
//                 <div
//                     className="flex items-center px-5 py-4 text-gray-600 hover:bg-gray-100 cursor-pointer"
//                     onClick={handleLogout}
//                 >
//                     <i className="fas fa-sign-out-alt w-6"></i>
//                     <span className="ml-3">Logout</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigation = [
        { name: 'Dashboard', icon: 'fa-tachometer-alt', path: '/' },
        { name: 'Job', icon: 'fa-briefcase', path: '/job' },
        { name: 'Vehicle Lists', icon: 'fa-car', path: '/vehicles' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`bg-white h-screen ${isCollapsed ? 'w-20' : 'w-64'} border-r border-gray-200 flex flex-col transition-all duration-300`}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
                {!isCollapsed && (
                    <div className="text-2xl font-bold text-primary">GPS.ID TMS</div>
                )}
                <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none hidden md:block" >
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1">
                {navigation.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center px-5 py-4 hover:bg-gray-100 cursor-pointer transition-all duration-200 ${location.pathname === item.path ? 'bg-gray-100 border-l-4 border-primary text-primary' : 'text-gray-600'}`}
                        onClick={() => navigate(item.path)}
                    >
                        <i className={`fas ${item.icon} w-6 text-center`}></i>
                        {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-200">
                <div
                    className="flex items-center px-5 py-4 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/settings')}
                >
                    <i className="fas fa-cog w-6 text-center"></i>
                    {!isCollapsed && <span className="ml-3">Settings</span>}
                </div>
                <div
                    className="flex items-center px-5 py-4 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                >
                    <i className="fas fa-sign-out-alt w-6 text-center"></i>
                    {!isCollapsed && <span className="ml-3">Logout</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
