import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    type, 
    isSelect, 
    options 
}) => {
    // Local state to track whether the password should be masked or visible
    const [showPassword, setShowPassword] = useState(false);

    // Toggle function for the password visibility
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            {/* 1. Conditionally render the label if the prop is passed */}
            {label && (
                <label className="text-[13px] text-slate-800 block mb-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* 2. Conditionally render a dropdown <select> OR a standard <input> */}
                {isSelect ? (
                    <select
                        value={value}
                        onChange={onChange}
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    >
                        {/* Map over the passed options array to generate dropdown items */}
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        <input
                            // Dynamically swap type if it's a password field and the toggle is active
                            type={
                                type === 'password'
                                    ? showPassword
                                        ? 'text'
                                        : 'password'
                                    : type
                            }
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder}
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-md px-3 py-2 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                        
                        {/* 3. Only render the Eye icon toggle if the original type is "password" */}
                        {type === 'password' && (
                            <span 
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <Eye size={20} className="text-purple-800" />
                                ) : (
                                    <EyeOff size={20} className="text-slate-400" />
                                )}
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Input;