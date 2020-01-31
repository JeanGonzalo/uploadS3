var fs = require('fs');
var content;
fs.readFile('./holi', 'utf8', async function read(err, data) {
    if (err) {
        throw err;
    }
    content = await data;
    console.log(content)
});
