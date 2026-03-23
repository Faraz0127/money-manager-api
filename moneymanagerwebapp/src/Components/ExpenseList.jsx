import React, { useState } from 'react';
import { Download, Mail, LoaderCircle } from 'lucide-react';
import moment from 'moment';
import TransactionInfoCard from './TransactionInfoCard';

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try { await onDownload(); } finally { setLoading(false); }
    };

    const handleEmail = async () => {
        setLoading(true);
        try { await onEmail(); } finally { setLoading(false); }
    };

    return (
        <div className="card p-4">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-lg font-semibold">Expense Sources</h5>
                <div className="flex items-center gap-2">
                    <button
                        className="btn flex items-center gap-1 cursor-pointer disabled:opacity-60"
                        onClick={handleDownload}
                        disabled={loading}
                    >
                        {loading ? (
                            <><LoaderCircle className="animate-spin w-4 h-4" />Downloading</>
                        ) : (
                            <><Download size={15} className="text-red-500" />Download</>
                        )}
                    </button>
                    <button
                        className="btn flex items-center gap-1 cursor-pointer disabled:opacity-60"
                        onClick={handleEmail}
                        disabled={loading}
                    >
                        {loading ? (
                            <><LoaderCircle className="animate-spin w-4 h-4" />Emailing</>
                        ) : (
                            <><Mail size={15} className="text-red-500" />Email</>
                        )}
                    </button>
                </div>
            </div>

            {transactions?.length === 0 ? (
                <p className="text-gray-500 text-center">No expense records found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transactions?.map((expense) => (
                        <TransactionInfoCard
                            key={expense.id}
                            title={expense.name}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;