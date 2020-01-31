const express = require('express');
const morgan = require('morgan');
const uuidv4 = require('uuidv4');
const aws = require('aws-sdk');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.post('/getSignedURL', async (req, res, next) => {
    const s3 = new aws.S3();
    s3.config.update({
        accessKeyId: 'AKIAR6YQIG4K2V4KEFEG',
        secretAccessKey: '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',
        region: 'us-east-2'
    })

    const params = {
        Bucket: 'bucket000upload',
        Key: './kolin.jpeg',
        ContentType: 'image/jpeg'
    };

    return s3.getSignedUrl('putObject', params, function (err, signedURL) {
        if (err) {
            console.log(err)
            return next(res.err);
        } else {
            return res.json({
                postURL: signedURL,
                getURL: signedURL.split("?")[0]
            })
        }
    })

});

app.listen(9000, function () {
    console.log(`We app is listening on port: 9000`);
});