import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import useUser from '../hooks/useUser';
import Dashboard from '../Components/Dashboard';
import ExpenseOverview from '../Components/ExpenseOverview';
import ExpenseList from '../Components/ExpenseList';
import Modal from '../Components/Model';
import AddExpenseForm from '../Components/AddExpenseForm';
import DeleteAlert from '../Components/DeleteAlert';

import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Expense = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const fetchExpenseDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) setExpenseData(response.data);
        } catch (error) {
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

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    const handleAddExpense = async (expense) => {
        const { name, amount, date, categoryId } = expense;

        if (!name?.trim()) { toast.error("Name is required"); return; }
        if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount must be greater than zero"); return; }
        if (!date) { toast.error("Please select a date"); return; }
        if (!categoryId) { toast.error("Please select a category"); return; }

        const today = new Date().toISOString().split('T')[0]; // ✅ [0] fix
        if (date > today) { toast.error("Date cannot be in the future"); return; }

        console.log("Sending expense:", { name, amount, date, categoryId });
        
        try {
    const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        ...expense,
        amount: Number(amount)
    });
    if (response.status === 200 || response.status === 201) { // ✅
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
    }
} catch (error) {
    console.error("Error adding expense:", error);
    console.error("Error response:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed to add expense");
}
    };

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
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
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) toast.success("Expense details emailed successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    };

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
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