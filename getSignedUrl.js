const express = require('express');
const aws = require('aws-sdk');

const s3 = new aws.S3();
require("dotenv").config();
s3.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
})

const app = express();
app.use(express.json());
//const router = express.Router();
app.get('/getSignedURL', (req, res, next) => {
    console.log('estas en get')

    const params = {
        Bucket: 'bucket000upload',
        Key: 'file-name.pdf',
        ContentType: 'image/jpeg'
    };

    return s3.getSignedUrl('putObject', params, function (err, signedURL) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                postURL: signedURL,
                getURL: signedURL.split("?")[0]
            })
        }
    })

});


//app.use(express.urlencoded({ extended: true }));

app.listen(9000, function () {
    console.log(`We app is listening on port: 9000`);
});