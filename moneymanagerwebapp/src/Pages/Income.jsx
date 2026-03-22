import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Layout and Hooks
import useUser from '../hooks/useUser';
import Dashboard from '../components/Dashboard';

// Components
import IncomeOverview from '../components/IncomeOverview';
import IncomeList from '../components/IncomeList';
import Modal from '../components/Modal';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';

// API Utilities
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Income = () => {
    // 1. Verify user authentication
    useUser();

    // 2. Component States
    const [loading, setLoading] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Modal States
    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // 3. Fetch all current month income details
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch income details", error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    };

    // 4. Fetch income-specific categories for the add form dropdown
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch the income categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch the income categories");
        }
    };

    // Trigger initial data loads
    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    // 5. Handle Adding a New Income [1-4]
    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

        // Validations
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error("Amount should be a valid number greater than zero");
            return;
        }
        if (!date) {
            toast.error("Please select date");
            return;
        }
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        // Prevent future dates
        const today = new Date().toISOString().split('T');
        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, { 
                name, 
                amount: Number(amount), 
                date, 
                icon, 
                categoryId 
            });
            
            if (response.status === 201) {
                toast.success("Income added successfully");
                setOpenAddIncomeModel(false);
                fetchIncomeDetails(); 
            }
        } catch (error) {
            console.error("Error adding income", error);
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    };

    // 6. Handle Deleting an Income [5-7]
    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting the income", error);
            toast.error(error.response?.data?.message || "Failed to delete an income");
        }
    };

    // 7. Handle Downloading Excel Report [8-10]
    const handleDownloadIncomeDetails = async () => {
        try {
            // responseType: 'blob' is required to handle binary file streams
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
                responseType: 'blob'
            });
            
            const fileName = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.success("Download the income details successful");
        } catch (error) {
            console.error("Error downloading the income details", error);
            toast.error(error.response?.data?.message || "Failed to download the income");
        }
    };

    // 8. Handle Emailing Excel Report [11]
    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if (response.status === 200) {
                toast.success("Income details emailed successfully");
            }
        } catch (error) {
            console.error("Error emailing income details", error);
            toast.error(error.response?.data?.message || "Failed to email income");
        }
    };

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    
                    {/* Top Overview Section with Line Chart */}
                    <div>
                        <IncomeOverview 
                            transactions={incomeData} 
                            onAddIncome={() => setOpenAddIncomeModel(true)}
                        />
                    </div>

                    {/* Bottom List Section with Excel Controls */}
                    <IncomeList 
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />

                </div>

                {/* Add Income Modal */}
                <Modal 
                    isOpen={openAddIncomeModel} 
                    onClose={() => setOpenAddIncomeModel(false)} 
                    title="Add Income"
                >
                    <AddIncomeForm 
                        onAddIncome={handleAddIncome} 
                        categories={categories} 
                    />
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal 
                    isOpen={openDeleteAlert.show} 
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })} 
                    title="Delete Income"
                >
                    <DeleteAlert 
                        content="Are you sure want to delete this income details?" 
                        onDelete={() => deleteIncome(openDeleteAlert.data)} 
                    />
                </Modal>
                
            </div>
        </Dashboard>
    );
};

export default Income;