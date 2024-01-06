import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
    accessKeyId: "AKIAU2D25LSZ2DMCR3FD",
    secretAccessKey: "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",
    region: "eu-north-1",
});

interface S3UploadOptions {
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

export const uploadFileToS3 = async (file: Blob, options: S3UploadOptions) => {
    const { ownerId, fileName, fileType, fileSizeLimit, onProgress, onSuccess, onFail } = options;
    const params: AWS.S3.PutObjectRequest = {
        Bucket: 'valhio-docai',
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

export const getFileFromS3 = async (fileName: string, ownerId: string) => {
    const params = {
        Bucket: 'valhio-docai',
        Key: `${ ownerId }/${ fileName }`,
    };

    try {
        const result = await s3.getObject(params).promise();
        console.log('File fetched successfully');
        return result.Body;
    } catch (error) {
        console.error('Error fetching file:', error);
        throw error;
    }
};

export const getFileUrlFromS3 = async (fileKey: string, ownerId: string) => {
    const params = {
        Bucket: 'valhio-docai',
        Key: `${ fileKey }`, // File key has the format: ownerId/uniqueId-fileName. It is used to authorize the current user to access the file.
    };

    if (fileKey.split('/')[0] !== ownerId) throw new Error('User is not authorized to access this file');

    try {
        const result = await s3.getSignedUrlPromise('getObject', params); // Get a signed url that expires in 15 minutes.  A signed url is a temporary url that allows access to a private file. This url is used to fetch the file from the frontend. A signed url is required because the bucket is private.
        console.log('File fetched successfully');
        return result;
    } catch (error) {
        console.error('Error fetching file:', error);
        throw error;
    }
}

export const deleteFileFromS3 = async (fileKey: string, ownerId: string) => {
    const params = {
        Bucket: 'valhio-docai',
        Key: `${ fileKey }`,
    };

    try {
        await s3.deleteObject(params).promise();
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};