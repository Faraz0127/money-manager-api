import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Coins, CreditCard } from 'lucide-react';

import Dashboard from '../Components/Dashboard';
import useUser from '../hooks/useUser';

import InfoCard from '../Components/InfoCard';
import RecentTransactions from '../Components/RecentTransactions';
import FinanceOverview from '../Components/FinanceOverview';
import Transactions from '../Components/Transactions';

import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import { addThousandSeparator } from '../util/helper';

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <Dashboard activeMenu="Dashboard">

            {/* 🔴 TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto mt-6">
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

            {/* 🔴 MAIN CONTENT */}
            <div className="mt-6 px-6 max-w-7xl mx-auto space-y-6">

                {/* ROW 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 min-h-[300px]">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions || []}
                            onMore={() => navigate('/expense')}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow p-4 min-h-[300px]">
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />
                    </div>
                </div>

                {/* ROW 2 */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 min-h-[200px]">
        <Transactions
            title="Recent Expenses"
            transactions={dashboardData?.recentFiveExpenses || []}  // ✅ FIXED
            type="expense"
            onMore={() => navigate('/expense')}
        />
    </div>

    <div className="bg-white rounded-2xl shadow p-4 min-h-[200px]">
        <Transactions
            title="Recent Incomes"
            transactions={dashboardData?.recentFiveIncomes || []}   // ✅ FIXED
            type="income"
            onMore={() => navigate('/income')}
        />
    </div>

</div>
            </div>
        </Dashboard>
    );
};

export default Home;