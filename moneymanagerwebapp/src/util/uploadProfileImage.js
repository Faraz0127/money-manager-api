import { API_ENDPOINTS } from './apiEndpoints.js';

// The upload preset name configured in the Cloudinary dashboard
const CLOUDINARY_UPLOAD_PRESENT = 'moneymanager'; 

const uploadProfileImage = async (image) => { 
    // 1. Construct the payload required by Cloudinary
    const formData = new FormData(); 
    formData.append('file', image); 
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESENT); 

    try {
        // 2. Make an unsigned POST request to the Cloudinary API endpoint using Fetch
        const response = await fetch(API_ENDPOINTS.uploadImage, { 
            method: 'POST',
            body: formData
        });

        // 3. Handle non-200 responses
        if (!response.ok) { 
            const errorData = await response.json(); 
            throw new Error(errorData.error?.message || response.statusText || 'Cloudinary upload failed'); 
        }

        // 4. Extract and return the secure HTTPS URL
        const data = await response.json(); 
        console.log('Image uploaded successfully', data);
        return data.secure_url; 

    } catch (error) { 
        console.error('Error uploading the image', error); 
        throw error; 
    }
};

export default uploadProfileImage;