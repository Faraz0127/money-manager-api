import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import moment from "moment";
import toast from 'react-hot-toast';

// Layout Components
import MenuBar from '../Components/Menubar';
import Sidebar from '../Components/Sidebar';
import MonthYearPicker from '../Components/MonthYearPicker';

// API
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Dashboard = ({ children, activeMenu, onDashboardDataChange }) => {
    const { user } = useContext(AppContext);

    const [selectedMonth, setSelectedMonth] = useState({
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD')
    });

    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 🔥 Fetch dashboard data with month filter
    const fetchDashboardData = async (filters) => {
        try {
            setIsLoading(true);
            const { startDate, endDate } = filters;

            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA, {
                params: { startDate, endDate }
            });

            if (response.status === 200) {
                setDashboardData(response.data);
                // 🔥 Callback to parent component
                if (onDashboardDataChange) {
                    onDashboardDataChange(response.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            toast.error("Failed to fetch dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when month changes (ONLY for Dashboard page)
    useEffect(() => {
        if (activeMenu === 'Dashboard') {
            fetchDashboardData(selectedMonth);
        }
    }, [selectedMonth, activeMenu]);

    // 🔥 DEBUG: Log activeMenu
    useEffect(() => {
        console.log('Dashboard received activeMenu:', activeMenu);
    }, [activeMenu]);

    return (
        <>
            {user && (
                <div className="min-h-screen bg-slate-50">

                    {/* Top Navbar - PASS activeMenu here */}
                    <MenuBar activeMenu={activeMenu} />

                    <div className="flex">

                        {/* Sidebar - PASS activeMenu here */}
                        <div className="hidden lg:block">
                            <Sidebar activeMenu={activeMenu} />
                        </div>

                        {/* Main Content */}
                        <div className="grow mx-5">

                            {/* 🔥 Month Picker - Only show on Dashboard */}
                            {activeMenu === 'Dashboard' && (
                                <div className="mt-5">
                                    <MonthYearPicker onMonthChange={setSelectedMonth} />
                                </div>
                            )}

                            {/* Show current month */}
                            {activeMenu === 'Dashboard' && (
                                <h2 className="text-lg font-semibold mb-4 mt-4">
                                    {moment(selectedMonth.startDate).format("MMMM YYYY")}
                                </h2>
                            )}

                            {/* 🔥 Render children normally */}
                            {children}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;