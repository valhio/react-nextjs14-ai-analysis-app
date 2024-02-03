import s3 from "./config/s3Config";

export const getFileFromS3 = async (fileName: string, ownerId: string) => {
    const params = {
        Bucket: s3.config.params!.Bucket,
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

export const getFileUrlFromS3 = async (fileKey: string, ownerId: string,) => {
    const params = {
        // Bucket: 'valhio-docai',
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