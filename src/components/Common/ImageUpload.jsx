import React, { useState, useEffect } from 'react';
import { compressImage, uploadToCloudinary } from '../../services/cloudinaryService';
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ImageUpload = ({ 
    onUploadSuccess, 
    onUploadError, 
    label, 
    required = false, 
    acceptedTypes = "image/jpeg,image/png,image/webp",
    maxSizeMB = 5
}) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, compressing, uploading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Cleanup preview URL to avoid memory leaks
        return () => {
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Reset state
        setFile(selectedFile);
        setStatus('idle');
        setProgress(0);
        setErrorMessage('');

        // Validation
        const isImage = selectedFile.type.startsWith('image/');
        if (!isImage && !selectedFile.type.includes('pdf')) {
            setErrorMessage('Only images (JPG, PNG, WebP) are allowed.');
            setStatus('error');
            return;
        }

        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            setErrorMessage(`File size exceeds ${maxSizeMB}MB limit.`);
            setStatus('error');
            return;
        }

        // Preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        try {
            // Compression
            setStatus('compressing');
            const fileToUpload = await compressImage(selectedFile);
            
            // Upload
            setStatus('uploading');
            const result = await uploadToCloudinary(fileToUpload, (pct) => {
                setProgress(pct);
            });

            setStatus('success');
            if (onUploadSuccess) onUploadSuccess(result);
        } catch (error) {
            console.error('Upload Error:', error);
            const msg = error.response?.data?.error?.message || 'Upload failed. Please check your Cloudinary settings.';
            setErrorMessage(msg);
            setStatus('error');
            if (onUploadError) onUploadError(error);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
        setProgress(0);
        setStatus('idle');
        setErrorMessage('');
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-xs font-black text-gsps-blue/40 uppercase tracking-widest ml-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            
            <div className={`relative min-h-[160px] rounded-[10px] border-2 border-dashed transition-all overflow-hidden
                ${status === 'success' ? 'border-gsps-green bg-gsps-green/5' : 
                  status === 'error' ? 'border-red-500 bg-red-50' : 
                  'border-gray-200 bg-gsps-bg-light hover:border-gsps-green/50'}
            `}>
                {!file ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer group">
                        <input
                            type="file"
                            accept={acceptedTypes}
                            onChange={handleFileChange}
                            required={required}
                            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                        />
                        <FaCloudUploadAlt className="text-4xl text-gsps-blue/20 group-hover:text-gsps-green transition-all mb-2" />
                        <span className="text-xs font-bold text-gsps-blue/40 group-hover:text-gsps-blue text-center">
                            Click to upload or drag & drop<br />
                            (Max {maxSizeMB}MB)
                        </span>
                    </div>
                ) : (
                    <div className="relative h-full w-full p-2 flex items-center justify-center min-h-[160px]">
                        {/* Preview */}
                        {preview && file.type.startsWith('image/') ? (
                            <img src={preview} alt="Preview" className="max-h-[144px] w-auto rounded-lg object-contain" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-2">📄</span>
                                <span className="text-xs font-bold text-gsps-blue truncate max-w-[150px]">{file.name}</span>
                            </div>
                        )}

                        {/* Overlay for Progress/Status */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] transition-all
                            ${status === 'uploading' || status === 'compressing' ? 'bg-gsps-blue/40 opacity-100' : 'opacity-0 pointer-events-none'}
                        `}>
                            <div className="w-2/3 h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                                <div 
                                    className="h-full bg-gsps-green transition-all duration-300" 
                                    style={{ width: `${status === 'compressing' ? 20 : progress}%` }}
                                ></div>
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                {status === 'compressing' ? 'Optimizing...' : `Uploading ${progress}%`}
                            </span>
                        </div>

                        {/* Success/Error Indicators */}
                        {status === 'success' && (
                            <div className="absolute top-2 right-2 bg-gsps-green text-white p-1 rounded-full shadow-lg">
                                <FaCheckCircle />
                            </div>
                        )}
                        
                        {/* Remove Button */}
                        <button 
                            onClick={handleRemove}
                            className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gsps-blue p-1 rounded-full shadow-md transition-all z-30"
                            title="Remove file"
                        >
                            <FaTimes size={12} />
                        </button>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {errorMessage && (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold mt-1 animate-in fade-in slide-in-from-top-1">
                    <FaExclamationTriangle />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
