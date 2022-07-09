const express = require('express');
const cors = require('cors');
const multer = require('multer');
const expressAsyncHandler = require('express-async-handler');
const PORT = process.env.PORT || 3002;
const { tsv2json } = require('tsv-json')
const path = require('path');
const Generate = require('./controllers');
const https = require('https');

const dir = multer.diskStorage({
    // file name
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    }
}
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/upload', multer({ storage: dir }).single('file'), expressAsyncHandler(async (req, res) => {
    let fl = path.join(__dirname, './uploads/' + req.file.originalname);
    await Generate.all(fl);
    res.send(`<a href="/dream_beach_report.csv" >Download Result</a>`);
})
);

app.post('/generate', expressAsyncHandler(async (req, res) => {
    let hasil = tsv2json(JSON.stringify(req.body));
    console.log(hasil);
    res.json("hasil");
}));

https.createServer(app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// }
// );


