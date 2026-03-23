import React, { createContext, useState } from 'react';

// 1. Create and export the Context object
export const AppContext = createContext();

// 2. Create and export the Provider component
export const AppContextProvider = ({ children }) => {
    
    // State to hold the logged-in user's details globally
    const [user, setUser] = useState(null);

    // Helper function to wipe the user data upon logging out
    const clearUser = () => {
        setUser(null);
    };

    // The object payload containing all state and setter functions to be accessed by consumers
    const contextValue = {
        user,
        setUser,
        clearUser
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};