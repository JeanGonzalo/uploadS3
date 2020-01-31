const AWS = require('aws-sdk')
require("dotenv").config();
const s3 = new AWS.S3()
AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
})

// Tried with and without this. Since s3 is not region-specific, I don't
// think it should be necessary.
// AWS.config.update({region: 'us-west-2'})

const myBucket = 'bucket-name'
const myKey = './file-name.pdf'
const signedUrlExpireSeconds = 60 * 5

const url = s3.getSignedUrl('putObject', {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds
})

console.log(url)