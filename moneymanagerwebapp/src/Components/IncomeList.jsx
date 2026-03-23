import React, { useState } from 'react';
import { Download, Mail, LoaderCircle } from 'lucide-react';
import moment from 'moment';

// Reusable UI Component
import TransactionInfoCard from './TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
    // 1. Local state to handle the loading spinners for the action buttons
    const [loading, setLoading] = useState(false);

    // 2. Async handlers to trigger the API functions passed from the parent (Income.jsx)
    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    };

    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-4">
            
            {/* Header Section with Action Buttons */}
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-lg font-semibold">Income Sources</h5>
                
                <div className="flex items-center justify-center gap-2">
                    {/* Download Button */}
                    <button 
                        className="btn flex items-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" 
                        onClick={handleDownload} 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin w-4 h-4" />
                                Downloading
                            </>
                        ) : (
                            <>
                                <Download size={15} className="text-green-500" />
                                Download
                            </>
                        )}
                    </button>

                    {/* Email Button */}
                    <button 
                        className="btn flex items-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" 
                        onClick={handleEmail} 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin w-4 h-4" />
                                Emailing
                            </>
                        ) : (
                            <>
                                <Mail size={15} className="text-green-500" />
                                Email
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Income Cards Grid Render */}
            {transactions?.length === 0 ? (
                <p className="text-gray-500 text-center">No income records found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions?.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            // Formats the date string (e.g., 12th Jul 2025)
                            date={moment(income.date).format("Do MMM YYYY")} 
                            amount={income.amount}
                            type="income"
                            // Passes the specific income ID back up to Income.jsx to trigger the delete alert
                            onDelete={() => onDelete(income.id)} 
                        />
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default IncomeList;