import React, { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
        date: '',
        icon: '',
        categoryId: ''
    });

    const categoryOptions = categories?.map((category) => ({
        value: category.id,
        label: category.name
    })) || [];

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories, expense.categoryId]);

    const handleChange = (key, value) => {
        setExpense((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                label="Expense Name"
                placeholder="Example: Rent, Groceries, Netflix"
                type="text"
                value={expense.name}
                onChange={(e) => handleChange('name', e.target.value)}
            />
            <Input
                label="Category"
                value={expense.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                label="Amount"
                placeholder="500"
                type="number"
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
            />
            <Input
                label="Date"
                type="date"
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
            />
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="btn-primary flex items-center gap-2"
                    onClick={handleAddExpense}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-4 h-4" />
                            Adding...
                        </>
                    ) : (
                        'Add Expense'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;