import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const useUser = () => {
    // 1. Extract context methods
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        // 2. If user already exists in state, no need to fetch again
        if (user) {
            return;
        }

        let isMounted = true;

        // 3. Asynchronous function to fetch the public profile data
        const fetchUserInfo = async () => {
            try {
                // The JWT token is automatically passed via the Axios request interceptor
                const response = await axiosConfig.get(API_ENDPOINTS.getUserInfo);
                
                if (isMounted && response.data) {
                    // Update global state with the fetched profile
                    setUser(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch the user information', error);
                
                if (isMounted) {
                    // If the token is invalid or expired, clear data and force logout
                    clearUser();
                    navigate('/login');
                }
            }
        };

        // 4. Trigger the fetch function
        fetchUserInfo();

        // 5. Cleanup function to prevent state updates if the component unmounts
        return () => {
            isMounted = false;
        };

    }, [user, setUser, clearUser, navigate]);

    // Return the user object so components can access it easily
    return { user };
};

export default useUser;