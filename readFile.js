/* var fs = require('fs');
const content = new Buffer();
fs.readFile('./minion.jpg', async function read(err, data) {
    if (err) {
        throw err;
    }
    return content = await data;
    console.log(content)
});

console.log("gaaa") */

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
async function doFile() {
    try {
        const text = await readFile('./minion.jpg');
        console.log(text);
    } catch (err) {
        console.log('Error', err);
    }
}
let ga = doFile();

console.log(ga)

