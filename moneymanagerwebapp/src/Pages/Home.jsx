import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Coins, CreditCard } from 'lucide-react';

import Dashboard from '../Components/Dashboard';
import useUser from '../hooks/useUser';

import InfoCard from '../Components/InfoCard';
import RecentTransactions from '../Components/RecentTransactions';
import FinanceOverview from '../Components/FinanceOverview';
import Transactions from '../Components/Transactions';

import { addThousandSeparator } from '../util/helper';

const Home = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDashboardDataChange = (data) => {
        setDashboardData(data);
    };

    return (
        <Dashboard activeMenu="Dashboard" onDashboardDataChange={handleDashboardDataChange}>
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

                {/* ROW 1: Recent Transactions + Financial Overview (Pie Chart) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4 min-h-[300px]">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions || []}
                            onMore={() => navigate('/income')}
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

                {/* ROW 2: Recent Expenses + Recent Incomes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white rounded-2xl shadow p-4 min-h-[300px]">
                        <Transactions
                            title="Recent Expenses"
                            transactions={dashboardData?.recentFiveExpenses || []}
                            type="expense"
                            onMore={() => navigate('/expense')}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow p-4 min-h-[300px]">
                        <Transactions
                            title="Recent Incomes"
                            transactions={dashboardData?.recentFiveIncomes || []}
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