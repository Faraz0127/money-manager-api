import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react'; 

// Assuming the instructor imports the custom chart and utility function here
import CustomLineChart from './CustomLineChart'; 
import { prepareIncomeLineChartData } from '../util/helper'; 

const IncomeOverview = ({ transactions, onAddIncome }) => {
    // 1. State to hold the formatted data for the chart
    const [chartData, setChartData] = useState([]);

    // 2. Effect to process the transactions whenever they change
    useEffect(() => {
        // Uses the utility function to group the data by date
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card p-4">
            
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-semibold">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends
                    </p>
                </div>
                
                {/* Add Income Button */}
                <button 
                    className="add-btn flex items-center gap-1"
                    onClick={onAddIncome}
                >
                    <Plus size={15} /> Add Income
                </button>
            </div>

            {/* Line Chart Section */}
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>

        </div>
    );
};

export default IncomeOverview;