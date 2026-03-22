import React from 'react';
import { UtensilsCrossed, Trash, TrendingUp, TrendingDown } from 'lucide-react';

// Assuming the utility function is imported here
import { addThousandSeparator } from '../util/helper'; 

const TransactionInfoCard = ({ 
    icon, 
    title, 
    date, 
    amount, 
    type, 
    hideDeleteButton, 
    onDelete 
}) => {

    // 1. Dynamic Styling for Amount Box based on Transaction Type
    const getAmountStyles = () => {
        if (type === 'income') {
            return 'bg-green-50 text-green-800';
        } else if (type === 'expense') {
            return 'bg-red-50 text-red-800';
        }
        return '';
    };

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            
            {/* 2. Icon / Emoji Display */}
            <div className="w-12 h-12 flex items-center justify-center text-2xl text-gray-800 bg-gray-100 rounded-full">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <UtensilsCrossed className="text-purple-500" />
                )}
            </div>

            {/* 3. Details Section (Title and Date) */}
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                {/* 4. Actions and Amount Display */}
                <div className="flex items-center gap-2">
                    
                    {/* Delete Button: Hidden by default prop OR hidden until hover using group-hover */}
                    {!hideDeleteButton && (
                        <button 
                            className="text-gray-400 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        >
                            <Trash size={18} />
                        </button>
                    )}

                    {/* Amount Box with Dynamic Colors and Trend Icons */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className="text-xs sm:text-sm font-medium">
                            {type === 'income' ? '+' : '-'} {addThousandSeparator(amount)}
                        </h6>
                        
                        {type === 'income' ? (
                            <TrendingUp size={15} />
                        ) : (
                            <TrendingDown size={15} />
                        )}
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default TransactionInfoCard;