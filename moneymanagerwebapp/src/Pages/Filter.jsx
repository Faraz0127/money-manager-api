import React, { useState } from 'react';
import { Search, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import moment from 'moment';

// Layout and Custom Hooks
import Dashboard from '../components/Dashboard';
import useUser from '../hooks/useUser';

// Components
import TransactionInfoCard from '../components/TransactionInfoCard';

// API Utilities
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/API_endpoints';

const Filter = () => {
    // 1. Verify user authentication
    useUser();

    // 2. Component States for all form filters
    const [type, setType] = useState('income');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [keyword, setKeyword] = useState('');
    const [sortField, setSortField] = useState('date');
    const [sortOrder, setSortOrder] = useState('ASC');
    
    // States for Results and Loading
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // 3. Search Handler to fetch filtered data
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Post payload to backend filter API
            const response = await axiosConfig.post(API_ENDPOINTS.applyFilters, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });

            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
            toast.error(error.response?.data?.message || "Failed to fetch the transactions, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="filters">
            <div className="my-5 mx-auto">
                
                {/* Page Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>

                {/* Filter Form Card */}
                <div className="card p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select filters</h5>
                    </div>

                    <form 
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4" 
                        onSubmit={handleSearch}
                    >
                        {/* Transaction Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                            <select 
                                id="type" 
                                value={type} 
                                onChange={(e) => setType(e.target.value)} 
                                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                            <input 
                                type="date" 
                                id="startDate" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500" 
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                            <input 
                                type="date" 
                                id="endDate" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500" 
                            />
                        </div>

                        {/* Sort Field */}
                        <div>
                            <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort By</label>
                            <select 
                                id="sortField" 
                                value={sortField} 
                                onChange={(e) => setSortField(e.target.value)} 
                                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Order</label>
                            <select 
                                id="sortOrder" 
                                value={sortOrder} 
                                onChange={(e) => setSortOrder(e.target.value)} 
                                className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="ASC">Ascending</option>
                                <option value="DESC">Descending</option>
                            </select>
                        </div>

                        {/* Search Keyword & Button */}
                        <div className="sm:col-span-1 md:col-span-1 flex items-end">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <div className="flex">
                                    <input 
                                        type="text" 
                                        id="keyword" 
                                        placeholder="Search" 
                                        value={keyword} 
                                        onChange={(e) => setKeyword(e.target.value)} 
                                        className="w-full border rounded px-3 py-2 outline-none focus:border-blue-500" 
                                    />
                                    <button 
                                        type="submit" 
                                        className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer"
                                        disabled={loading}
                                    >
                                        <Search size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Filter Results Output */}
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-4">Transactions</h5>
                    
                    {/* Empty State Instructions */}
                    {transactions.length === 0 && !loading && (
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <p className="text-gray-500 flex items-center gap-2">
                            <LoaderCircle className="animate-spin w-4 h-4" /> 
                            Loading transactions...
                        </p>
                    )}

                    {/* Map Transaction Cards */}
                    {!loading && transactions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {transactions.map((transaction) => (
                                <TransactionInfoCard
                                    key={transaction.id}
                                    title={transaction.name}
                                    icon={transaction.icon}
                                    date={moment(transaction.date).format("Do MMM YYYY")}
                                    amount={transaction.amount}
                                    type={type}
                                    hideDeleteButton={true}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </Dashboard>
    );
};

export default Filter;