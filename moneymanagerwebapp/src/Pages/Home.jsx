import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Coins, CreditCard } from 'lucide-react'; 

// Layout and Context
import Dashboard from '../Components/Dashboard';
import useUser from '../hooks/useUser';

// Reusable UI Components
import InfoCard from '../components/InfoCard';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverview from '../components/FinanceOverview';
import Transactions from '../components/Transactions';

// Utils and API Configuration
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/API_endpoints';
import { addThousandSeparator } from '../util/helper';

const Home = () => {
    // Check if the user is authenticated and retrieve their details
    const { user } = useUser();
    const navigate = useNavigate();

    // Component states
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch the aggregated dashboard data from the Spring Boot backend
    const fetchDashboardData = async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.dashboardData);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong while fetching the dashboard data", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        // Wrap the page in the universal dashboard layout and highlight the "Dashboard" menu item
        <Dashboard activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                
                {/* Top Grid: High-level Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<Wallet />}
                        label="Total Balance"
                        value={addThousandSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-purple-800"
                    />
                    <InfoCard
                        icon={<Coins />}
                        label="Total Income"
                        value={addThousandSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-green-800"
                    />
                    <InfoCard
                        icon={<CreditCard />}
                        label="Total Expense"
                        value={addThousandSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-800"
                    />
                </div>

                {/* Bottom Grid: Transaction Lists and Financial Overview Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions || []}
                        onMore={() => navigate('/expense')}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    <Transactions
                        title="Recent Expenses"
                        transactions={dashboardData?.latestExpenses || []}
                        type="expense"
                        onMore={() => navigate('/expense')}
                    />

                    <Transactions
                        title="Recent Incomes"
                        transactions={dashboardData?.latestIncomes || []}
                        type="income"
                        onMore={() => navigate('/income')}
                    />
                    
                </div>
            </div>
        </Dashboard>
    );
};

export default Home;