import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: "AKIAU2D25LSZ2DMCR3FD",
    secretAccessKey: "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",
    region: "eu-north-1",
});

interface S3UploadOptions {
    ownerId: string;
    fileName: string;
    onProgress?: (percentage: number) => void;
    onSuccess?: (response: AWS.S3.ManagedUpload.SendData) => void;
    onFail?: (error: Error) => void;
}
//
// 
// 
// 
// 
// 
// udate the file type to Blob
// 
// 
// 
// 
// 
// 
export const uploadFileToS3 = async (file: Blob, options: S3UploadOptions) => {
    const { ownerId, fileName, onProgress, onSuccess, onFail } = options;
    const params: AWS.S3.PutObjectRequest = {
        Bucket: 'valhio-docai',
        Key: `${ ownerId }/${ fileName }`,
        Body: file,
        ACL: 'private',
        // ContentType: 'application/pdf',
    };

    try {
        const response = await s3.upload(params)
            .on('httpUploadProgress', (progress) => {
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                if (onProgress) {
                    onProgress(percentage);
                }
            })
            .promise();

        if (onSuccess) {
            onSuccess(response);
        }
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        if (onFail) {
            onFail(error as Error);
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

export const getFileUrlFromS3 = async (fileName: string, ownerId: string) => {
    const params = {
        Bucket: 'valhio-docai',
        Key: `${ ownerId }/${ fileName }`,
    };

    try {
        const result = await s3.getSignedUrlPromise('getObject', params);
        console.log('File fetched successfully');
        return result;
    } catch (error) {
        console.error('Error fetching file:', error);
        throw error;
    }
}