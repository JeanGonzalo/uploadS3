const express = require('express');
const aws = require('aws-sdk');
require("dotenv").config();



const router = express.Router();


const s3 = new aws.S3();
s3.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
})


router.get('/getSignedURL', (req, res, next) => {
    console.log('estas en get')

    const params = {
        Bucket: 'bucket000upload',
        Key: './kolin.jpeg',
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


const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.listen(9000, function () {
    console.log(`We app is listening on port: 9000`);
});