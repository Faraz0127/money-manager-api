import React from 'react';
import { X } from 'lucide-react';

const Model = ({ isOpen, onClose, title, children }) => {
    // 1. Conditional Rendering: If not open, return null to hide the model
    if (!isOpen) return null;

    return (
        // 2. Background Overlay
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm">
            
            {/* 3. Model Sizing and Positioning */}
            <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
                
                {/* 4. Model Content Wrapper */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100">
                    
                    {/* 5. Model Header */}
                    <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-2xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h3>
                        
                        {/* Close Button */}
                        <button 
                            type="button" 
                            className="text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-9 h-9 flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={onClose}
                        >
                            <X size={15} />
                        </button>
                    </div>

                    {/* 6. Model Body (Injects the child components) */}
                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Model;