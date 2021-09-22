// import required modules
const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
//const path = require('path');

// create our Express App
const app = express();

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require('@slack/web-api');

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient("xoxb-2480804893744-2500097531939-Vsu1MAkEPFvInSIHR6kWynGe", {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});


// Set up the port on which our app will run
const PORT = process.env.PORT || 3001;

// static directory from where we want to serve public files
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

// The name of the file you're going to upload
//const fileName = "/Users/poojagangrade/UploadImages/UploadImages/uploads/images/daycare.png";
// ID of channel that you want to upload file to
//const channelName= "slack-integration";

/*//http.createServer(function(req, res) {
    // The filename is simple the local directory and tacks on the requested url
    var filename = __dirname+req.url;
  
    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(filename);
  
    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
    });
  
    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
      res.end(err);
    });
  }).listen(3001);

try {
  // Call the files.upload method using the WebClient
  const result =  client.files.upload({
    // channels can be a list of one to many strings
    channels: channelName,
    initial_comment: "Here\'s my file :smile:",
    // Include your filename in a ReadStream here
    readStream: fs.createReadStream(fileName)
  });

  console.log(result);
}
catch (error) {
  console.error(error);
} 
        //console.log('Image uploaded successfully.');
    //}
    ////else throw 'error';
//});




/*app.post('/upload', upload.single('photo'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
  });*/



    /*try {
        res.send(req.file);
        console.log('Image uploaded successfully.');
    }
    catch(err){
        res.send(400);
    } */



/*response = app.files_upload(
    channels= 'slack-integration',
    file=req.file.path,
    initial_comment='My initial comment'
    )*/ 

    /*app.get("/daycare.png", (req, res) => {
        res.sendFile(path.join(__dirname, "./uploads/images/daycare.png"));
      }); */

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
    console.log('Server Running at http://127.0.0.1:3001')
});