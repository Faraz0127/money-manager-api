import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CustomLineChart from './CustomLineChart';
import { prepareIncomeLineChartData } from '../util/helper';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending over time and analyze your expense trends
                    </p>
                </div>
                <button
                    className="add-btn flex items-center gap-1"
                    onClick={onAddExpense}
                >
                    <Plus size={15} /> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverview;