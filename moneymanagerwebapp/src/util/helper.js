// src/util/helper.js
import moment from 'moment';

/**
 * 1. addThousandSeparator
 * Takes a number/string amount and adds commas according to the Indian currency format.
 */
export const addThousandSeparator = (amount) => {
    if (!amount) return '0';
    
    // Converts the number to Indian standard formatting (e.g., 1,00,000)
    return Number(amount).toLocaleString('en-IN'); 
};

/**
 * 2. prepareIncomeLineChartData
 * Groups a list of transactions by their date, summing up the total amount for each day.
 * Formats the data specifically for the react-charts library.
 */
export const prepareIncomeLineChartData = (transactions = []) => {
    const groupedData = {};

    // Group the transactions by date
    transactions.forEach(transaction => {
        // Formats the raw ISO date down to a clean Day/Month string (e.g., "12th Jul")
        const dateStr = moment(transaction.date).format("Do MMM");
        
        if (!groupedData[dateStr]) {
            groupedData[dateStr] = {
                date: dateStr,
                totalAmount: 0,
                items: []
            };
        }
        
        // Add the current transaction's amount to that day's total
        groupedData[dateStr].totalAmount += Number(transaction.amount || 0);
        groupedData[dateStr].items.push(transaction);
    });

    // Convert the grouped object back into an array sorted by date for the chart
    return Object.values(groupedData);
};