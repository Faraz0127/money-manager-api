import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Layout and Custom Components
import Input from '../Components/Input';
import { assets } from '../assets/assets'; 

// Context & API
import { AppContext } from '../Context/AppContext';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import { validateEmail } from '../util/validation';

const Login = () => {
    // 1. Context and Navigation Hooks
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    // 2. Component States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 3. Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Validations
        if (!email.trim() || !validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }

        setIsLoading(true);

        try {
            // Post payload to backend login API
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { 
                email, 
                password 
            });

            // Destructure the token and user profile object from the response
            const { token, user } = response.data;

            if (token) {
                // Save JWT to LocalStorage for interceptor use
                localStorage.setItem('token', token);
                
                // Set the global user state so other components know who is logged in
                setUser(user);
                
                // Redirect to the Dashboard
                navigate('/dashboard');
            }

        } catch (error) {
            console.error("Something went wrong", error);
            
            // Extract the specific backend error message (e.g., "invalid email or password")
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                const fallbackMessage = error.message || "Something went wrong";
                setError(fallbackMessage);
                toast.error(fallbackMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            
            {/* Background Blur Image */}
            <img 
                src={assets.login_bg} 
                alt="background" 
                className="absolute inset-0 w-full h-full object-cover filter blur-sm" 
            />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome back
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg p-3 mb-4 text-center">
  ⏱️ Backend is hosted on Render free tier.<br/>
  First login may take <b>60–120 seconds</b> to respond.<br/>
  Please wait and do not refresh.
</div>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login
                    </p>

                    {/* Login Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        
                        <Input
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            type="text"
                        />
                        
                        <Input
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="***"
                            type="password"
                        />

                        {/* Error Message UI */}
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>

                        {/* Route to Signup */}
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                                Sign up
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;