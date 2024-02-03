import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
});

export const s3 = new AWS.S3({
    params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string },
    region: process.env.NEXT_PUBLIC_AWS_REGION as string,
});

export default s3;