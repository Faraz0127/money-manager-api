import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { AppContext } from '../Context/AppContext';

// 🔥 FIX: Check the correct import path for assets
import { SIDEBAR_DATA } from '../assets/assets'; 

const Sidebar = ({ activeMenu }) => {
    // 1. Grab user data from global context
    const { user } = useContext(AppContext);
    
    // 2. Initialize navigation hook
    const navigate = useNavigate();

    // 🔥 Handle sidebar navigation - FIXED: Don't pass path directly
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            
            {/* User Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {/* Conditionally render profile picture or a default User icon */}
                {user?.profileImageUrl ? (
                    <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="w-20 h-20 bg-slate-400 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
                        <User size={35} className="text-purple-500" />
                    </div>
                )}
                
                {/* User's Full Name */}
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullName || ''}
                </h5>
            </div>

            {/* Sidebar Navigation Items */}
            <div>
                {SIDEBAR_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 cursor-pointer transition-colors ${
                            activeMenu === item.label 
                                ? 'text-white bg-purple-600' 
                                : 'text-slate-700 hover:bg-gray-100'
                        }`}
                    >
                        <item.icon className="text-xl" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
            
        </div>
    );
};

export default Sidebar;