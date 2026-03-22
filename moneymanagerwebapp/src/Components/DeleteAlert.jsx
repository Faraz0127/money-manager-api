import React, { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const DeleteAlert = ({ content, onDelete }) => {
    // 1. Local loading state for the spinner
    const [loading, setLoading] = useState(false);

    // 2. Async wrapper to handle the loading UI while waiting for the parent's API call
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Display the dynamic confirmation message */}
            <p className="text-sm text-gray-700">{content}</p>
            
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {/* Conditional rendering for the spinner and text */}
                    {loading ? (
                        <>
                            <LoaderCircle className="animate-spin w-4 h-4" />
                            Deleting...
                        </>
                    ) : (
                        'Delete'
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;