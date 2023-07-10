import React, { useRef, useState } from 'react';
import styles from './UploadLogo.module.css';
import UploadIcon from '../assets/upload_logo.svg';
import TrashIcon from '../assets/trash_icon.svg';

interface UploadButtonProps {
    onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleDelete = () => {
        setSelectedFile(null);
    };

    const getFileNameDisplay = () => {
        if (selectedFile) {
            const fileName = selectedFile.name;
            const extensionIndex = fileName.lastIndexOf('.');
            if (extensionIndex !== -1) {
                const fileNameWithoutExtension = fileName.substring(0, extensionIndex);
                const extension = fileName.substring(extensionIndex);
                return `${fileNameWithoutExtension.slice(0, 8)}...${extension}`;
            }
        }
        return 'Choose an image to upload';
    };

    return (
        <div>
            <button className={styles.uploadButton} onClick={handleButtonClick}>
                <span>{getFileNameDisplay()}</span>
                {selectedFile && (
                    <img
                        src={TrashIcon}
                        alt="Delete Icon"
                        className={styles.deleteButton}
                        onClick={handleDelete}
                    />
                )}
                {!selectedFile && (
                    <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                )}
            </button>
            <input
                id={styles['upload-button']}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default UploadButton;