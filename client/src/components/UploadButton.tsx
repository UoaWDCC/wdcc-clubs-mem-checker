import React from 'react';
import styles from './UploadLogo.module.css'

interface UploadButtonProps {
    onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelect(file);
        }
    };

    return (
        <div>
            <label htmlFor="upload-button">
                <span className={styles.buttonLabel}>choose an image to upload</span>
            </label>
            <input
                id= {styles["upload-button"]}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default UploadButton;