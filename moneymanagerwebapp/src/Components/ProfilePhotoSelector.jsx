import React, { useRef, useState, useEffect } from 'react';
import { User, Upload, Trash } from 'lucide-react';

const ProfilePhotoSelector = ({ image, setImage }) => {
    // Reference to hide and trigger the native HTML file input
    const inputRef = useRef(null);
    
    // Local state to store the temporary generated object URL for the image preview
    const [previewUrl, setPreviewUrl] = useState(null);

    // ✅ ADD THIS HERE
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Handles the file selection event
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Update the parent's state with the actual file payload
            setImage(file);
            
            // Generate a local preview URL and update local state
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    // Clears the selected image
    const handleRemoveImage = (e) => {
        e.preventDefault(); // Prevents the form from accidentally submitting
        setImage(null);
        setPreviewUrl(null);
    };

    // Triggers the hidden file input when the custom button is clicked
    const onChooseFile = (e) => {
        e.preventDefault(); // Prevents the form from accidentally submitting
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            {/* Hidden native file input */}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {/* Conditional Rendering: Show placeholder if no image, otherwise show preview */}
            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    <User size={35} className="text-purple-500" />
                    
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                    >
                        <Upload size={15} className="text-purple-500" />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                    >
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;