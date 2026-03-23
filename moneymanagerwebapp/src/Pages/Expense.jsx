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

    // ✅ FIXED STATE (NO moment object)
    const [selectedMonth, setSelectedMonth] = useState({
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD')
    });

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // ✅ FIXED FETCH FUNCTION
    const fetchExpenseDetails = async (filters) => {
        if (loading) return;
        setLoading(true);

        try {
            const { startDate, endDate } = filters;

            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES, {
                params: { startDate, endDate }
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

    // Fetch categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    // Initial load
    useEffect(() => {
        fetchExpenseDetails(selectedMonth);
        fetchExpenseCategories();
    }, []);

    // On month change
    useEffect(() => {
        fetchExpenseDetails(selectedMonth);
    }, [selectedMonth]);

    // Add Expense
    const handleAddExpense = async (expense) => {
        const { name, amount, date, categoryId } = expense;

        if (!name?.trim()) {
            toast.error("Name is required");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount must be greater than zero");
            return;
        }
        if (!date) {
            toast.error("Please select a date");
            return;
        }
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

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

    // Delete Expense
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

    // ✅ FIXED DOWNLOAD
    const handleDownloadExpenseDetails = async () => {
        try {
            const { startDate, endDate } = selectedMonth;

            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                params: { startDate, endDate },
                responseType: 'blob'
            });

            const fileName = `expense_${startDate}_to_${endDate}.xlsx`;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Expense details downloaded successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to download expense");
        }
    };

    // ✅ FIXED EMAIL
    const handleEmailExpenseDetails = async () => {
        try {
            const { startDate, endDate } = selectedMonth;

            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE, {
                params: { startDate, endDate }
            });

            if (response.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    };

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">

                {/* ✅ DO NOT CHANGE */}
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

                {/* Add Modal */}
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

                {/* Delete Modal */}
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