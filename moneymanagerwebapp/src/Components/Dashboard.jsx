import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import moment from "moment";
import toast from 'react-hot-toast';

// Layout Components
import MenuBar from './MenuBar';
import Sidebar from './Sidebar';
import MonthYearPicker from './MonthYearPicker';

// API
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Dashboard = ({ children, activeMenu }) => {
    const { user } = useContext(AppContext);

    // ✅ FIX: state must be inside component
    const [selectedMonth, setSelectedMonth] = useState({
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD')
    });

    const [dashboardData, setDashboardData] = useState(null);

    // ✅ FIX: function inside component
    const fetchDashboardData = async (filters) => {
        try {
            const { startDate, endDate } = filters;

            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA, {
                params: { startDate, endDate }
            });

            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch dashboard data");
        }
    };

    // ✅ FIX: useEffect inside component
    useEffect(() => {
        fetchDashboardData(selectedMonth);
    }, [selectedMonth]);

    return (
        <>
            {user && (
                <div className="min-h-screen bg-slate-50">

                    {/* Top Navbar */}
                    <MenuBar activeMenu={activeMenu} />

                    <div className="flex">

                        {/* Sidebar */}
                        <div className="hidden lg:block">
                            <Sidebar activeMenu={activeMenu} />
                        </div>

                        {/* Main Content */}
                        <div className="grow mx-5">

                            {/* ✅ Month Picker */}
                            <div className="mt-5">
                                <MonthYearPicker onMonthChange={setSelectedMonth} />
                            </div>

                            {/* Optional: show selected month */}
                            <h2 className="text-lg font-semibold mb-4">
                                {moment(selectedMonth.startDate).format("MMMM YYYY")}
                            </h2>

                            {/* Pass data to children */}
                            {children}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;