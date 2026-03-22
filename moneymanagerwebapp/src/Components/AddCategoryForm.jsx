import React, { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

// Custom reusable components
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    // 1. Component States
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        type: 'income',
        icon: ''
    });

    // 2. Dropdown options for the category type
    const categoryTypeOptions = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ];

    // 3. Effect to handle Edit Mode population
    useEffect(() => {
        if (isEditing && initialCategoryData) {
            // Populate the form with the selected category data
            setCategory(initialCategoryData);
        } else {
            // Reset to default empty values
            setCategory({ name: '', type: 'income', icon: '' });
        }
    }, [isEditing, initialCategoryData]);

    // 4. Dynamic handle change for all inputs
    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    };

    // 5. Submit Handler
    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Passes the local state object up to the parent component
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            {/* Emoji Icon Picker */}
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            {/* Category Name Input */}
            <Input
                label="Category Name"
                placeholder="Example: Freelance, Salary, Groceries"
                type="text"
                value={category.name}
                onChange={(e) => handleChange('name', e.target.value)}
            />

            {/* Category Type Dropdown */}
            {/* Notice the isSelect and options props specifically added to the Input component to render a dropdown */}
            <Input
                label="Category Type"
                value={category.type}
                onChange={(e) => handleChange('type', e.target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="btn-primary flex items-center gap-2"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {/* Dynamic Rendering for loading and editing states */}
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-4 h-4" />
                            {isEditing ? 'Updating...' : 'Adding...'}
                        </>
                    ) : (
                        isEditing ? 'Update Category' : 'Add Category'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddCategoryForm;