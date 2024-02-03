import s3 from "./config/s3Config";

interface s3DeleteOptions {
    fileKey: string;
    ownerId: string;
    onSuccess?: () => void;
    onFail?: (error: Error) => void;
}

export const deleteFileFromS3 = async (options: s3DeleteOptions,) => {
    const { fileKey, ownerId, onSuccess, onFail } = options || {};
    const params = {
        Bucket: s3.config.params!.Bucket,
        Key: `${ fileKey }`,
    };

    if (fileKey.split('/')[0] !== ownerId) {
        if (onFail) onFail(new Error('User is not authorized to access this file'));
        return;
    }

    try {
        await s3.deleteObject(params).promise();
        if (onSuccess) onSuccess();
        console.log('File deleted successfully');
    } catch (error) {
        if (onFail) onFail(error as Error);
        console.error('Error deleting file:', error);
        throw error;
    }
};