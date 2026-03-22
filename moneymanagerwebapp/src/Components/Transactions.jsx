import React from 'react';
import { ArrowRight } from 'lucide-react';
import moment from 'moment';

// Custom reusable component
import TransactionInfoCard from './TransactionInfoCard';

const Transactions = ({ title, transactions, type, onMore }) => {
    return (
        <div className="card">
            
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">{title}</h5>
                
                {/* Action Button */}
                <button 
                    className="card-btn flex items-center gap-1 cursor-pointer"
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
                        // Formats the date string
                        date={moment(item.date).format("Do MMM YYYY")} 
                        amount={item.amount}
                        type={type}
                        // Hides the trash icon to prevent deletions from the dashboard overview
                        hideDeleteButton={true} 
                    />
                ))}
            </div>
            
        </div>
    );
};

export default Transactions;