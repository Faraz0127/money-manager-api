import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { assets } from '../assets/assets'  // ✅ named import

const Login = () => {
    // 1. States copied directly from Signup.jsx
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <img 
                src={assets.login_bg} 
                alt="background" 
                className="absolute inset-0 w-full h-full object-cover filter blur-sm" 
            />
            
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    
                    {/* 2. Modified text to reflect logging in */}
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">Welcome back</h3>
                    <p className="text-sm text-slate-700 text-center mb-8">Please enter your details to login</p>

                    {/* 3. Removed the Grid layout that was used in Signup */}
                    <form className="space-y-4">
                        
                        {/* 4. Removed fullName and profileImage inputs */}
                        <Input 
                            label="Email Address"
                            placeholder="name@example.com"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <Input 
                            label="Password"
                            placeholder="***"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Error Message Placeholder */}
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            className="btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2"
                        >
                            Login
                        </button>

                        {/* 5. Link updated to point to the Signup page */}
                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account? <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;















// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { LoaderCircle } from 'lucide-react';
// import Input from '../components/Input';
// import { validateEmail } from '../util/validation';
// import axiosConfig from '../util/axiosConfig';
// import { API_ENDPOINTS } from '../util/apiEndpoints';
// import { AppContext } from '../context/AppContext';
// import assets from '../assets/assets';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
    
//     const navigate = useNavigate();
//     const { setUser } = useContext(AppContext);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); 

//         // Basic validation
//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address");
//             return;
//         }
//         if (!password.trim()) {
//             setError("Please enter your password");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
//                 email,
//                 password
//             });

//             // Extract token and user profile
//             const { token, user } = response.data;
            
//             if (token) {
//                 localStorage.setItem("token", token);
//                 setUser(user);
//                 navigate("/dashboard");
//             }
//         } catch (err) {
//             console.error("Something went wrong", err);
//             // Handle specific backend error messages securely
//             if (err.response && err.response.data && err.response.data.message) {
//                 setError(err.response.data.message);
//             } else {
//                 setError(err.message || "Something went wrong");
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
//             {/* Background image with blur */}
//             <img 
//                 src={assets.loginBackground} 
//                 alt="Background" 
//                 className="absolute inset-0 w-full h-full object-cover filter blur-sm" 
//             />
            
//             <div className="relative z-10 w-full max-w-lg px-6">
//                 <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
//                     <h3 className="text-2xl font-semibold text-black text-center mb-2">
//                         Welcome Back
//                     </h3>
//                     <p className="text-sm text-slate-700 text-center mb-8">
//                         Please enter your details to login
//                     </p>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <Input 
//                             label="Email Address" 
//                             placeholder="name@example.com" 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                         />
//                         <Input 
//                             label="Password" 
//                             placeholder="******" 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                         />

//                         {error && (
//                             <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
//                                 {error}
//                             </p>
//                         )}

//                         <button 
//                             type="submit" 
//                             disabled={isLoading}
//                             className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <LoaderCircle className="animate-spin w-5 h-5" />
//                                     Logging in
//                                 </>
//                             ) : (
//                                 "Login"
//                             )}
//                         </button>
//                     </form>

//                     <p className="text-sm text-slate-800 text-center mt-6">
//                         Don't have an account?{" "}
//                         <Link to="/signup" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
//                             Sign up
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;