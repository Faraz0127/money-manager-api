import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

// Context and Layout
import useUser from '../hooks/useUser';
import Dashboard from '../Components/Dashboard';

// Components
import CategoryList from '../Components/CategoryList';
import Modal from '../Components/Model';
import AddCategoryForm from '../Components/AddCategoryForm';

// API utilities
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';

const Category = () => {
    useUser(); 

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong, please try again", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        const isDuplicate = categoryData.some(
            (cat) => cat.name.toLowerCase() === name.trim().toLowerCase()
        );
        if (isDuplicate) {
            toast.error("Category name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, { 
                name, 
                type, 
                icon 
            });
            
            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error adding category", error);
            toast.error(error.response?.data?.message || "Failed to add category");
        }
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    };

    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;
        
        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }
        
        if (!id) {
            toast.error("Category ID is missing for update");
            return;
        }

        try {
            const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { 
                name, 
                type, 
                icon 
            });
            
            if (response.status === 200) {
                toast.success("Category updated successfully");
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error updating the category", error);
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    };

    return (
    <>
        {/* 🔥 FIX: Pass correct activeMenu "Category" */}
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    
                    <button 
                        className="btn-primary flex items-center gap-1"
                        onClick={() => setOpenAddCategoryModal(true)}
                    >
                        <Plus size={15} /> Add Category
                    </button>
                </div>

                <CategoryList 
                    categories={categoryData}
                    onEditCategory={handleEditCategory}
                />

                <Modal 
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                <Modal 
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm 
                        isEditing={true} 
                        initialCategoryData={selectedCategory} 
                        onAddCategory={handleUpdateCategory} 
                    />
                </Modal>
                
            </div>
        </Dashboard>
    </>
);
};

export default Category;