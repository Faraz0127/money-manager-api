import React, { useState, useRef } from 'react';
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
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="text-[13px] text-slate-800 block mb-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {isSelect ? (
                    <select
                        value={value}
                        onChange={onChange}
                        className="w-full bg-transparent outline-none border border-gray-300 rounded-md px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        <input
                            ref={inputRef}
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
                            className="w-full bg-transparent outline-none border border-gray-300 rounded-md px-3 py-2 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            style={{
                                // 🔥 CRITICAL: Proper password masking
                                WebkitTextSecurity: type === 'password' && !showPassword ? 'disc' : 'none',
                                letterSpacing: type === 'password' && !showPassword ? '0.3em' : 'normal',
                            }}
                        />
                        
                        {type === 'password' && (
                            <span 
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
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