import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

// Layout Components
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';

const Dashboard = ({ children, activeMenu }) => {
    // Grab the logged-in user object from the global state
    const { user } = useContext(AppContext);

    return (
        <>
            {/* Only render the dashboard layout if the user object is present */}
            {user && (
                <div className="min-h-screen bg-slate-50">
                    {/* Top Navigation Bar */}
                    <MenuBar activeMenu={activeMenu} />

                    {/* Main Layout containing Sidebar and Right Side Content */}
                    {/* <div className="flex max-w-[1080px] mx-auto"> */}
                    <div className="flex">
                        
                        {/* Left Sidebar - Hidden on mobile screens */}
                        <div className="hidden lg:block">
                            <Sidebar activeMenu={activeMenu} />
                        </div>

                        {/* Right Side Content (Dynamic Page Content) */}
                        <div className="grow mx-5">
                            {children}
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;