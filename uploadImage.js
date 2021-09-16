// import required modules
const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const path = require('path');

// create our Express App
const app = express();

// Set up the port on which our app will run
const PORT = process.env.PORT || 3000;

// static directory from where we want to serve public files
app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';

    try {
        res.send(req.file);
    }
    catch(err){
        res.send(400);
    }

    res.send('Image uploaded successfully.');
    
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
    console.log('Server Running at http://127.0.0.1:3000')
});