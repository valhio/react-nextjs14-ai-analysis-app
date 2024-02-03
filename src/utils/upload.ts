import s3 from "./config/s3";
import { v4 as uuidv4 } from 'uuid';

interface S3UploadOptions {
    file: Blob;
    ownerId: string;
    fileName: string;
    fileType: string;
    fileSizeLimit: number;
    onProgress?: (percentage: number) => void;
    onSuccess?: (response: AWS.S3.ManagedUpload.SendData) => void;
    onFail?: (error: Error) => void;
}


const generateUniqueKey = (ownerId: string, fileName: string) => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '');
    const uniqueId = uuidv4().replace(/-/g, '');
    const uniqueKey = `${ ownerId }/${ uniqueId }-${ fileName }`;
    return uniqueKey;
};

export default async function uploadFileToS3(options: S3UploadOptions){
    const { file, ownerId, fileName, fileType, fileSizeLimit, onProgress, onSuccess, onFail } = options;
    const params: AWS.S3.PutObjectRequest = {
        Bucket: s3.config.params!.Bucket,
        Key: generateUniqueKey(ownerId, fileName),
        Body: file,
        ACL: 'private',
    };

    if (!file) throw new Error('File is undefined');

    if (!file.type || file.type !== fileType) {
        if (onFail) onFail(new Error('File type is not supported')); // Pass error to the fail callback in the frontend component (currently UploadButton.tsx)
        return; // Stop execution
    }

    if (file.size > fileSizeLimit) {
        if (onFail) onFail(new Error(`File size exceeds: ${ fileSizeLimit / 1000000 } MB`)); // Pass error to the fail callback in the frontend component (currently UploadButton.tsx)
        return; // Stop execution
    }

    try {
        const response = await s3.upload(params)
            .on('httpUploadProgress', (progress) => {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                if (onProgress) {
                    onProgress(percentage);
                }
            })
            .promise();

        if (onSuccess) { // If success callback is provided, call it with the response
            onSuccess(response); // Response contains the uploaded file url
        }
    } catch (error) {
        console.log('Error uploading file to S3:', error);
        if (onFail) { // If fail callback is provided, call it with the error
            onFail(error as Error); // Error is of type AWS.AWSError
        }
        throw error;
    }
};