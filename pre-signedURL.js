var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

var s3 = new AWS.S3({
    endpoint: new AWS.Endpoint('https://s3.sirv.com'),
    s3ForcePathStyle: true
});

s3.getSignedUrl('putObject', {
    Bucket: 'ENTER_YOUR_SIRV_S3_BUCKET_HERE',
    Key: 'kotlin.png'
}, function (err, url) {
    console.log(err, url);
});