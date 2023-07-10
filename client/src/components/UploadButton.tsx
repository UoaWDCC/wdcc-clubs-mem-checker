import React, { useRef, useState } from 'react';
import styles from './UploadLogo.module.css';
import UploadIcon from '../assets/upload_logo.svg';
import FileItem from './FileItem';

interface UploadButtonProps {
    onFileSelect: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleButtonClick = () => {
        if (!selectedFile && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
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
                return `${fileNameWithoutExtension.slice(0, 10)}...${extension}`;
            }
        }
        return 'Choose an image to upload';
    };

    const getFileSize = () => {
        return selectedFile ? selectedFile.size : 0;
    };

    return (
        <div className={styles.container}>
            <button className={styles.uploadButton} onClick={handleButtonClick}>
                <span>{selectedFile ? 'Uploaded logo' : 'Choose an image to upload'}</span>
                {selectedFile && (
                    <FileItem fileName={getFileNameDisplay()} fileSize={getFileSize()} onDelete={handleDelete} />
                )}
                {!selectedFile && (
                    <img src={UploadIcon} alt="Upload Icon" className={styles.uploadIcon} />
                )}
                <span className={styles.optionalText}>{selectedFile ? 'please click next to apply logo to your site' : ''}</span>
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