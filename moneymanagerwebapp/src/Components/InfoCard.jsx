import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow md:shadow-gray-100 border border-gray-200/50">
            
            {/* Dynamic Icon Container */}
            <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>

            {/* Information Details */}
            <div>
                <h6 className="text-sm text-gray-500 mb-1">
                    {label}
                </h6>
                
                {/* Indian Rupee HTML Entity with the passed value */}
                <span className="text-[22px]">
                    &#8377; {value}
                </span>
            </div>
            
        </div>
    );
};

export default InfoCard;