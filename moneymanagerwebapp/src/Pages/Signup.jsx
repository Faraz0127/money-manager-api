import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import Input from '../Components/Input';
import ProfilePhotoSelector from '../Components/ProfilePhotoSelector';
import { assets } from '../assets/assets'  // ✅ named import
import { validateEmail } from '../util/validation';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import uploadProfileImage from '../util/uploadProfileImage';


const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!fullName.trim()) {
            setError("Please enter your full name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            return;
        }

        setIsLoading(true);
        try {
            let profileImageUrl = "";
            if (profilePhoto) {
                profileImageUrl = await uploadProfileImage(profilePhoto);
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });
            if (response.status === 201) {
                toast.success("Profile created successfully");
                navigate("/login");
            }
        } catch (err) {
            console.error("Something went wrong", err);
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur */}
            <img 
                src={assets.login_bg} 
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover filter blur-sm" 
            />
            
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create an Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us
                    </p>

                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Profile Image Component */}
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector 
                                image={profilePhoto} 
                                setImage={setProfilePhoto} 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            { <Input 
                                label="Full Name" 
                                placeholder="Enter full name" 
                                type="text" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                            /> }
                            { <Input 
                                label="Email Address" 
                                placeholder="name@example.com" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            /> }
                            { <div className="col-span-2">
                                <Input 
                                    label="Password" 
                                    placeholder="******" 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div> }
                        </div>

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )} 

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Signing up
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                    </form>

                    <p className="text-sm text-slate-800 text-center mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;