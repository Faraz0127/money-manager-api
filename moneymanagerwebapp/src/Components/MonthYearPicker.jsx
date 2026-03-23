import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';

/**
 * MonthYearPicker - Allows users to select any month/year to view data for that period
 * Returns: { startDate, endDate } for API filtering
 */
const MonthYearPicker = ({ onMonthChange, initialDate = null }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || moment());

    const handlePreviousMonth = () => {
        const newDate = selectedDate.clone().subtract(1, 'month');
        setSelectedDate(newDate);
        onMonthChange({
            startDate: newDate.startOf('month').format('YYYY-MM-DD'),
            endDate: newDate.endOf('month').format('YYYY-MM-DD'),
            month: newDate.month() + 1,
            year: newDate.year()
        });
    };

    const handleNextMonth = () => {
        const newDate = selectedDate.clone().add(1, 'month');
        setSelectedDate(newDate);
        onMonthChange({
            startDate: newDate.startOf('month').format('YYYY-MM-DD'),
            endDate: newDate.endOf('month').format('YYYY-MM-DD'),
            month: newDate.month() + 1,
            year: newDate.year()
        });
    };

    const handleToday = () => {
        const today = moment();
        setSelectedDate(today);
        onMonthChange({
            startDate: today.startOf('month').format('YYYY-MM-DD'),
            endDate: today.endOf('month').format('YYYY-MM-DD'),
            month: today.month() + 1,
            year: today.year()
        });
    };

    return (
        <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4 mb-6">
            {/* Previous Month Button */}
            <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Previous month"
            >
                <ChevronLeft size={20} className="text-gray-600" />
            </button>

            {/* Selected Month Display */}
            <div className="flex-1 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    {selectedDate.format('MMMM YYYY')}
                </h3>
            </div>

            {/* Next Month Button */}
            <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Next month"
            >
                <ChevronRight size={20} className="text-gray-600" />
            </button>

            {/* Today Button */}
            <button
                onClick={handleToday}
                className="ml-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
                Today
            </button>
        </div>
    );
};

export default MonthYearPicker;