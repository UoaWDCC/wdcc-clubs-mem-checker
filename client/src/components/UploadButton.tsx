import React, { useRef } from 'react';
import styles from './UploadLogo.module.css';
import UploadIcon from '../assets/upload_logo.svg';

interface UploadButtonProps {
    onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileSelect(file);
        }
    };

    return (
        <div>
            <button className={styles.uploadButton} onClick={handleButtonClick}>
                <span>choose an image to upload</span>
                <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default UploadButton;