
export const config = {
  AWS: {
    region: "eu-north-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    test: process.env.FACEBOOK_SECRET as string,
    a: process.env.GITHUB_ID as string
  },
};

console.log(config);

export default config;