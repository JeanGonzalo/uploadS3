const fs = require('fs');
const util = require('util');

//Normal
var content;
fs.readFile('./holi', 'utf8', async function read(err, data) {
    if (err) {
        throw err;
    }
    content = await data;
    console.log(content)
});


//Promises
const readFile = util.promisify(fs.readFile);
readFile('./index.js', 'utf8')
    .then((text) => {
        console.log(text);
    })
    .catch((err) => {
        console.log('Error', err);
    });



// Async
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
async function doFile() {
    try {
        const text = await readFile('./index.js', 'utf8');
        console.log(text);
    } catch (err) {
        console.log('Error', err);
    }
}
doFile();
