const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }

});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.send('this is the home page')
})

app.post('/upload', upload.single('file'), function (req, res, next) {
    console.log(`Storage location is ${req.hostname}/${req.file.path}`);
    res.json(req.file)
})

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))