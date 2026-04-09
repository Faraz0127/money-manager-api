import React from 'react';
import { Github, Linkedin, Mail, Zap, PieChart, Download, Filter, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#7c3aed"/>
      <stop offset="100%" stopColor="#4f46e5"/>
    </linearGradient>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#a855f7"/>
      <stop offset="100%" stopColor="#7c3aed"/>
    </linearGradient>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fbbf24"/>
      <stop offset="100%" stopColor="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect x="10" y="30" width="70" height="48" rx="8" fill="url(#g1)"/>
  <rect x="10" y="22" width="70" height="18" rx="6" fill="url(#g2)"/>
  <rect x="62" y="42" width="22" height="24" rx="6" fill="#1e1b4b" opacity=".5"/>
  <circle cx="73" cy="54" r="6" fill="url(#g3)"/>
  <text x="73" y="57.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#92400e">$</text>
  <rect x="18" y="50" width="36" height="3" rx="1.5" fill="white" opacity=".4"/>
  <rect x="18" y="57" width="24" height="3" rx="1.5" fill="white" opacity=".25"/>
</svg>
                        <h1 className="text-2xl font-bold text-purple-800">Personal Wallet Tracker</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 text-purple-800 font-semibold hover:bg-purple-100 rounded-lg transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-6 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-900 transition"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Master Your Money, Effortlessly Track Your Finances
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Your foundation for secure, intelligent financial management. Effortlessly track your income and expenses to achieve your financial goals.
                        </p>
                        

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-8 py-4 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 transition shadow-lg"
                            >
                                Start Tracking for Free
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-8 py-4 border-2 border-purple-800 text-purple-800 font-bold rounded-lg hover:bg-purple-50 transition"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    {/* Illustration/Demo Cards */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                                    <div className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl">💵</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Balance</p>
                                        <p className="text-2xl font-bold text-gray-900">₹84,200</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl">📈</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Income</p>
                                        <p className="text-2xl font-bold text-gray-900">₹1,85,000</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl">📉</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Expense</p>
                                        <p className="text-2xl font-bold text-gray-900">₹1,00,800</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        Powerful Features
                    </h3>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="text-purple-800" size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Track Easily</h4>
                            <p className="text-gray-600">Add income and expenses with just a few clicks</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <PieChart className="text-blue-800" size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Visualize Data</h4>
                            <p className="text-gray-600">Beautiful charts and financial overview</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Download className="text-green-800" size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Export Reports</h4>
                            <p className="text-gray-600">Download Excel reports of your data</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="text-orange-800" size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Filter</h4>
                            <p className="text-gray-600">Find transactions by date, category, amount</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Developer Info Section */}
<section className="bg-gradient-to-r from-purple-800 to-blue-800 py-20">
    <div className="max-w-4xl mx-auto px-6 text-white">
        <h3 className="text-3xl font-bold text-center mb-12">
            About the Developer
        </h3>

        {/* Card */}
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 mb-8 shadow-xl">
            
            {/* Name + Role */}
            <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-white">
                    Faraz Pasha
                </h4>
                <p className="text-white mt-2 text-lg font-semibold">
                    Backend Developer
                </p>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/25 rounded-lg p-6 mb-8">
                <p className="text-center text-white font-semibold mb-4">
                    Tech Stack:
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <div className="px-4 py-2 bg-orange-500 rounded-full text-white font-semibold shadow-md">
                        Java
                    </div>
                    <div className="px-4 py-2 bg-green-500 rounded-full text-white font-semibold shadow-md">
                        Spring Boot
                    </div>
                    <div className="px-4 py-2 bg-blue-600 rounded-full text-white font-semibold shadow-md">
                        MySQL
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-center text-white/90 mb-8 leading-relaxed text-lg">
                Passionate backend developer specializing in{" "}
                <span className="font-bold text-white">Java</span> and{" "}
                <span className="font-bold text-white">Spring Boot</span>. 
                Money Manager is built with a robust backend powered by{" "}
                <span className="font-bold text-white">Spring Boot</span> with{" "}
                <span className="font-bold text-white">MySQL</span> database, 
                ensuring secure and efficient financial data management.
            </p>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
                <a
                    href="mailto:farazpasha098@gmail.com"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-purple-800 font-semibold rounded-lg hover:bg-purple-50 transition shadow-md"
                >
                    <Mail size={20} />
                    farazpasha098@gmail.com
                </a>

                <a
                    href="https://github.com/Faraz0127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
                >
                    <Github size={20} />
                    GitHub
                </a>

                <a
                    href="https://www.linkedin.com/in/faraz-pasha-j127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                    <Linkedin size={20} />
                    LinkedIn
                </a>
            </div>
        </div>
    </div>
</section>

            {/* CTA Section */}
            <section className="bg-purple-50 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to Master Your Finances?</h3>
                    <p className="text-xl text-gray-600 mb-8">
                        Start tracking your money today, completely free!
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-10 py-4 bg-purple-800 text-white font-bold text-lg rounded-lg hover:bg-purple-900 transition shadow-lg"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-gray-400">
                        © 2026 Personal Wallet Tracker. Built by Faraz Pasha. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Frontend: React + Netlify | Backend: Spring Boot + MySQL + Render
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;