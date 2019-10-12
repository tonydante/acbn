import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import socket from 'socket.io';
import routes from './server/routes';

dotenv.config();

// database config
const configDB = require('./server/config/database');

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(configDB.url_production); // connect to our production database
} else if (process.env.NODE_ENV === 'test') {
    mongoose.connect(configDB.url_test); // connect to our test database
} else {
    console.log('hitting here')
  mongoose.connect(configDB.url);
}

// Set up the express app
const app = express();
const server = http.Server(app);
const io = socket(server);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage })
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `images/uploads/${req.file.filename}`
    });
  else 
    res.status("409").json("No Files to Upload.")
});
app.use('/api/v1', routes);


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.get('/zohoverify/verifyforzoho.html', (req, res) => {
  res.render('zohoverify/verifyforzoho.html')
})
// if (process.env.NODE_ENV === 'development') {
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: prodConfig.output.publicPath,
//     open: false
//   }));
//   app.use(webpackHotMiddleware(compiler));
// }


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './../client', 'index.html'));
// });
// declare socket for real time 
export { io };  
io.on('connect', (soc) => {
  console.log('user connected');
  soc.on('isActive', (payload) => {
    console.log(payload, '===============> payload');
    soc.broadcast.emit('updateClient', payload);
  });
  soc.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works');
  } else {
    console.log(`Server running...... ${port}`);
  }
});