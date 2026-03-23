import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';

const CustomLineChart = ({ data }) => {

    if (!data || data.length === 0) {
        return (
            <p className="text-gray-500 text-center">
                No data available for this month.
            </p>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Total Income']}
                />
                <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#6b21a8"
                    strokeWidth={2}
                    dot={{ fill: '#6b21a8', r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;