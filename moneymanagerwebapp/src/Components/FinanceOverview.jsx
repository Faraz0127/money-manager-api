import React from 'react';

// Pre-built chart component and formatting utility imported by the instructor
import CustomPieChart from './CustomPieChart'; 
import { addThousandSeparator } from '../util/helper'; 

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    
    // 1. Define custom colors for the pie chart slices
    const colors = ['#6b21a8', '#166534', '#991b1b']; // Purple (Balance), Green (Income), Red (Expense)

    // 2. Prepare the data array expected by the CustomPieChart component
    const balanceData = [
        {
            name: "Total Balance",
            value: totalBalance || 0,
            label: "Total Balance",
            totalAmount: `₹ ${addThousandSeparator(totalBalance || 0)}`
        },
        {
            name: "Total Income",
            value: totalIncome || 0,
            label: "Total Income",
            totalAmount: `₹ ${addThousandSeparator(totalIncome || 0)}`
        },
        {
            name: "Total Expense",
            value: totalExpense || 0,
            label: "Total Expense",
            totalAmount: `₹ ${addThousandSeparator(totalExpense || 0)}`
        }
    ];

    return (
        <div className="card">
            
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">
                    Financial Overview
                </h5>
            </div>

            {/* Custom Pie Chart Integration */}
            <div className="mt-6">
                <CustomPieChart 
                    data={balanceData} 
                    colors={colors} 
                    showTextAnchor={true} 
                />
            </div>
            
        </div>
    );
};

export default FinanceOverview;