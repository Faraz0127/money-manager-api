import { createContext } from "react";
import { useState } from 'react';

const AppContext = createContext();


export const AppContextProvider = ({children}) => {
    // State to hold the globally accessible user details
    const [user, setUser] = useState(null);

    // Function to clear out the user data when logging out
    // const clearUser = () => {
    //     setUser(null);
    // };

 // Object containing the state and functions to be passed down
    const contextValue = {
        user,
        // setUser
    };

return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

