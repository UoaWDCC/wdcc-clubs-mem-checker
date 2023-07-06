import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const UploadLogo: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleDelete = () => {
        setSelectedFile(null);
    };


    return (
        <div>
            {selectedFile ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/path/to/image-icon.png"
                        alt="File Icon"
                        style={{ width: '20px', marginRight: '10px' }}
                    />
                    <span>{selectedFile.name}</span>
                    <button onClick={handleDelete}>
                        <FaTrash />
                    </button>
                </div>
            ) : (
                <div
                    style={{
                        width: '200px',
                        height: '200px',
                        backgroundColor: '#e0e0e0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    No image uploaded
                </div>
            )}
            <label htmlFor="image-upload">
                Replace logo (or background) with another image
            </label>
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default UploadLogo;