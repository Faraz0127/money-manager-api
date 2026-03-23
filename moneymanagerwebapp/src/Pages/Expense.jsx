import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';

import useUser from '../hooks/useUser';
import Dashboard from '../Components/Dashboard';
import ExpenseOverview from '../Components/ExpenseOverview';
import ExpenseList from '../Components/ExpenseList';
import Modal from '../Components/Model';
import AddExpenseForm from '../Components/AddExpenseForm';
import DeleteAlert from '../Components/DeleteAlert';
import MonthYearPicker from '../Components/MonthYearPicker';

import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Expense = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(moment());
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // Fetch expense data by date range (month)
    const fetchExpenseDetails = async (monthDate) => {
        if (loading) return;
        setLoading(true);
        
        try {
            // Get start and end dates of the selected month
            const startDate = monthDate.clone().startOf('month').format('YYYY-MM-DD');
            const endDate = monthDate.clone().endOf('month').format('YYYY-MM-DD');

            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense details", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) setCategories(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    // Trigger initial data loads
    useEffect(() => {
        fetchExpenseDetails(selectedMonth);
        fetchExpenseCategories();
    }, []);

    // Fetch data when month changes
    useEffect(() => {
        fetchExpenseDetails(selectedMonth);
    }, [selectedMonth]);

    const handleAddExpense = async (expense) => {
        const { name, amount, date, categoryId } = expense;

        if (!name?.trim()) { toast.error("Name is required"); return; }
        if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount must be greater than zero"); return; }
        if (!date) { toast.error("Please select a date"); return; }
        if (!categoryId) { toast.error("Please select a category"); return; }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) { toast.error("Date cannot be in the future"); return; }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                ...expense,
                amount: Number(amount)
            });
            if (response.status === 200 || response.status === 201) {
                toast.success("Expense added successfully");
                setOpenAddExpenseModal(false);
                fetchExpenseDetails(selectedMonth);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails(selectedMonth);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            // Include date range in download
            const startDate = selectedMonth.clone().startOf('month').format('YYYY-MM-DD');
            const endDate = selectedMonth.clone().endOf('month').format('YYYY-MM-DD');

            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                },
                responseType: 'blob'
            });
            
            const fileName = `expense_${selectedMonth.format('MMMM_YYYY')}.xlsx`;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to download expense");
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const startDate = selectedMonth.clone().startOf('month').format('YYYY-MM-DD');
            const endDate = selectedMonth.clone().endOf('month').format('YYYY-MM-DD');

            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            if (response.status === 200) toast.success("Expense details emailed successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    };

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                
                {/* Month Selector */}
                <MonthYearPicker onMonthChange={setSelectedMonth} />

                <div className="grid grid-cols-1 gap-6">
                    <ExpenseOverview
                        transactions={expenseData}
                        onAddExpense={() => setOpenAddExpenseModal(true)}
                    />
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm
                        categories={categories}
                        onAddExpense={handleAddExpense}
                    />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this expense?"
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Expense;