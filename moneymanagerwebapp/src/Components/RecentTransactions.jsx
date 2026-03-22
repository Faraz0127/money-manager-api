import React from 'react';
import { ArrowRight } from 'lucide-react';
import moment from 'moment';

// Custom reusable component
import TransactionInfoCard from './TransactionInfoCard';

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card p-4">
            
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold">Recent Transactions</h5>
                
                {/* Action Button */}
                <button 
                    className="btn flex items-center gap-1 cursor-pointer"
                    onClick={onMore}
                >
                    More <ArrowRight size={15} className="text-base" />
                </button>
            </div>

            {/* Transactions List */}
            <div className="mt-6">
                {/* Slices the array to only map the first 5 records */}
                {transactions?.slice(0, 5).map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        // Formats the raw ISO string into a readable date
                        date={moment(item.date).format("Do MMM YYYY")} 
                        amount={item.amount}
                        type={item.type}
                        // Hides the trash icon to prevent deletions from the dashboard
                        hideDeleteButton={true} 
                    />
                ))}
            </div>
            
        </div>
    );
};

export default RecentTransactions;