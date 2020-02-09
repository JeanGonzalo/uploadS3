const express = require('express');
const aws = require('aws-sdk');

const s3 = new aws.S3();

//const v4 = require('aws-signature-v4');
require("dotenv").config();
s3.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    //region: 'us-east-2'
    //endpoint: 's3-eu-central-1.amazonaws.com',
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
    region: 'us-east-2',
    //ACL: 'public-read',
})

const app = express();
app.use(express.json());
//const router = express.Router();

//const fileType = 'application/pdf'
//const key = 'minion.jpg'
//const getRandomFilename = () => require("crypto").randomBytes(16).toString("hex");

app.post('/getSignedURL', (req, res, next) => {
    console.log('estas en get')

    const params = {
        Bucket: 'bucket000upload',
        //Bucket: 'bucket000upload',
        Key: 'img/minion.jpg',
        //ContentType: contentType,
        //ContentType: "image/png",
        //ContentType: fileType,
        //ACL: 'public-read',
        //ContentType: 'application/octet-stream'
        //"Content-Type": "image/png"

    };
    s3.getSignedUrl('putObject', params, function (err, signedURL) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                postURL: signedURL,
                getURL: signedURL.split("?")[0]
            })
        }
    });

    /* var url = v4.createPresignedS3URL('kolin.jpeg', {
        region: 'us-east-2', // using frankfurt which requires V4 at the moment
        expires: 3600, // need to upload within 1 hour
        method: 'PUT',
        headers: {
            'x-amz-acl': 'public-read' // set the uploaded file ACL to public-read
        }
    });

    res.json(url) */
});

//app.use(express.urlencoded({ extended: true }));

app.listen(9000, function () {
    console.log(`We app is listening on port: 9000`);
});