import React, { useState } from 'react';

interface ImageUploadComponentProps {
    logo: boolean;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ logo }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleFileDelete = () => {
        setUploadedFile(null);
    };

    return (
        <div>
            <h2>Upload {logo ? 'Logo' : 'Background'}</h2>
            {uploadedFile ? (
                <div>
                    <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" />
                    <button onClick={handleFileDelete}>Delete</button>
                </div>
            ) : (
                <div>
                    <div>Placeholder Box</div>
                </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <div>{uploadedFile ? uploadedFile.name : 'No file uploaded'}</div>
            <button>Replace {logo ? 'logo' : 'background'} with another image</button>
        </div>
    );
};

export default ImageUploadComponent;
