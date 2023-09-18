import React from 'react';
import styles from './UploadLogo.module.css';
import TrashIcon from '../../../assets/trash_icon.svg';

interface FileItemProps {
    fileName: string;
    fileSize: number;
    onDelete: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ fileName, fileSize, onDelete }) => {
    const formatFileSize = (size: number) => {
        if (size < 1024) {
            return size + ' B';
        } else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(2) + ' KB';
        } else {
            return (size / (1024 * 1024)).toFixed(2) + ' MB';
        }
    };

    return (
        <div className={styles.fileContainer}>
            <div className={styles.fileContent}>
                <span className={styles.fileName}>{fileName}</span>
                <span className={styles.fileSize}>{formatFileSize(fileSize)}</span>
                <img
                    src={TrashIcon}
                    alt="Delete Icon"
                    className={styles.deleteButton}
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default FileItem;
