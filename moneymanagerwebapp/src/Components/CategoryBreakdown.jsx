import React from 'react';
import CustomPieChart from './CustomPieChart';
import { addThousandSeparator } from '../util/helper';

const CategoryBreakdown = ({ incomeCategories = [], expenseCategories = [] }) => {
    // 🔥 Prepare income pie chart data
    const incomePieData = incomeCategories.map(cat => ({
        name: cat.categoryName,
        value: cat.totalAmount || 0,
        label: cat.categoryName,
        totalAmount: `₹ ${addThousandSeparator(cat.totalAmount || 0)}`
    }));

    // 🔥 Prepare expense pie chart data
    const expensePieData = expenseCategories.map(cat => ({
        name: cat.categoryName,
        value: cat.totalAmount || 0,
        label: cat.categoryName,
        totalAmount: `₹ ${addThousandSeparator(cat.totalAmount || 0)}`
    }));

    // Colors for income (green shades) and expense (red shades)
    const incomeColors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
    const expenseColors = ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca'];

    return (
        <div className="space-y-6">
            {/* Income Category Breakdown */}
            <div className="bg-white rounded-lg p-4">
                <h5 className="text-lg font-semibold text-green-800 mb-4">Income Breakdown</h5>
                {incomePieData.length > 0 ? (
                    <CustomPieChart
                        data={incomePieData}
                        colors={incomeColors}
                        showTextAnchor={true}
                    />
                ) : (
                    <p className="text-gray-500 text-center py-8">No income data available</p>
                )}
            </div>

            {/* Expense Category Breakdown */}
            <div className="bg-white rounded-lg p-4">
                <h5 className="text-lg font-semibold text-red-800 mb-4">Expense Breakdown</h5>
                {expensePieData.length > 0 ? (
                    <CustomPieChart
                        data={expensePieData}
                        colors={expenseColors}
                        showTextAnchor={true}
                    />
                ) : (
                    <p className="text-gray-500 text-center py-8">No expense data available</p>
                )}
            </div>
        </div>
    );
};

export default CategoryBreakdown;