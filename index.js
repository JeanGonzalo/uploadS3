
const fs = require('fs');
const util = require('util');
//import * as util from 'util';
const uuidv4 = require('uuidv4');
const aws = require('aws-sdk')
const Buffer = require('buffer').Buffer;
//import { Buffer } from 'buffer';
require("dotenv").config();
const readFile = util.promisify(fs.readFile);
const BUCKET_NAME = "bucket000upload";

const s3 = new aws.s3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
})

const uploadToS3 = async (data: Buffer): Promise<string> => {
    const name = uuidv4() + '.png';
    s3.putObject({
        Key: name,
        Bucket: BUCKET_NAME,
        ContentType: 'image/png', //|| 'video/webm',
        Body: data,
        ACL: 'public-read',

    }).promise();
    return name;

}

const main = async () => {
    try {
        const data = await readFile('/.kolin.png');
        const url = await uploadToS3(data);
        console.log(url)
    } catch (err) {
        console.log(err)
    }
}

main();