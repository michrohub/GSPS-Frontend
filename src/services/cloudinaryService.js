import imageCompression from 'browser-image-compression';
import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
    console.warn('Cloudinary configuration is missing! Check your .env file and restart the dev server.');
}

/**
 * Compresses an image file.
 * @param {File} file - Original image file.
 * @returns {Promise<File>} - Compressed image file.
 */
export const compressImage = async (file) => {
    // If it's not an image (e.g. PDF), return as is
    if (!file.type.startsWith('image/')) return file;

    const options = {
        maxSizeMB: 0.3, // 300 KB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        return compressedFile;
    } catch (error) {
        console.error('Image compression failed:', error);
        return file; // Fallback to original file
    }
};

/**
 * Uploads a file directly to Cloudinary.
 * @param {File} file - File to upload.
 * @param {Function} onProgress - Callback for upload progress.
 * @returns {Promise<Object>} - Cloudinary upload result.
 */
export const uploadToCloudinary = async (file, onProgress) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                if (onProgress) onProgress(percentCompleted);
            },
        });
        return response.data;
    } catch (error) {
        console.error('Cloudinary upload failed:', error);
        throw error;
    }
};

/**
 * Generates an optimized Cloudinary URL with transformations.
 * @param {string} url - Original Cloudinary URL.
 * @param {Object} options - Transformation options (width, height, crop).
 * @returns {string} - Optimized URL.
 */
export const getOptimizedUrl = (url, options = {}) => {
    if (!url || !url.includes('cloudinary.com')) return url;

    const { width, height, crop = 'fill' } = options;
    
    // Split URL to inject transformations
    // Example: https://res.cloudinary.com/demo/image/upload/sample.jpg
    // Becomes: https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_fill,f_auto,q_auto/sample.jpg
    
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;

    let transformations = 'f_auto,q_auto';
    if (width) transformations += `,w_${width}`;
    if (height) transformations += `,h_${height}`;
    if (width || height) transformations += `,c_${crop}`;

    return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};
