const dotenv = require('dotenv');
dotenv.config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME } = process.env

module.exports = {
    port: PORT || 3000,
    jwtSecretKey: JWT_SECRET_KEY,
    refreshTokenSecretKey: REFRESH_TOKEN_SECRET_KEY,
    dbUri: DB_URI,
    awsAccessKey: AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
    awsRegion: AWS_REGION,
    bucketName: BUCKET_NAME,
    prefix: '/api'
}