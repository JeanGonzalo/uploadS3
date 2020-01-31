
const fs = require('fs');
const util = require('util');
//import * as util from 'util';
const uuidv4 = require('uuidv4');
const aws = require('aws-sdk')
const Buffer = require('buffer').Buffer;
//import { Buffer } from 'buffer';

const readFile = util.promisify(fs.readFile);
const BUCKET_NAME = "bucket000upload";

const s3 = new aws.s3({
    accessKeyId: "AKIAR6YQIG4K2V4KEFEG",
    secretAccessKey: "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",
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