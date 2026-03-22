import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Page Components
import Home from './Pages/Home';
import Income from './Pages/Income';
import Expense from './Pages/Expense';
import Category from './Pages/Category';
import Filter from './Pages/Filter';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

// Root Component to handle default routing based on authentication
const RootComponent = () => {
    // Check if the user is authenticated by looking for the token in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    
    // Redirect to the dashboard if authenticated, otherwise redirect to login
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Base Route */}
                    <Route path="/" element={<RootComponent />} />
                    
                    {/* Application Routes */}
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/filter" element={<Filter />} />
                    
                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
            
            {/* Global Toast Notifications */}
            <Toaster />
        </>
    );
};

export default App;