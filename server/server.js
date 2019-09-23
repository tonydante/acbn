import express from 'express';
import path from 'path';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import socket from 'socket.io';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import routes from './routes';
import devConfig from '../webpack.config.babel';
import prodConfig from '../webpack.config.prod.babel';

dotenv.config();

// database config
const configDB = require('./config/database');

const port = process.env.PORT || 8000;
let compiler;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(configDB.url_production); // connect to our production database
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect(configDB.url_test); // connect to our test database
  compiler = webpack(devConfig);
} else {
  mongoose.connect(configDB.url);
  compiler = webpack(devConfig);
}

// Set up the express app
const app = express();
const server = http.Server(app);
const io = socket(server);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + './../public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.render('home.ejs');
})
app.get('/loans', (req, res) => {
  res.render('loans/business-loans/index.ejs');
})

app.get('/service', (req, res) => {
  res.render('services-tools/tools/index.ejs');
})

app.get('/router/about', (req, res) => {
  res.render('about-us/board-of-directors/index.ejs');
})
app.get('/router/aboutus', (req, res) => {
  res.render('about-us/about-us.ejs');
})
app.get('/account', (req, res) => {
  res.render('accounts/visa-debit-card.ejs')
})
app.get('/router/contactus', (req, res) => {
  res.render('about-us/contact-us.ejs');
})

app.get('/zohoverify/verifyforzoho.html', (req, res) => {
  res.render('zohoverify/verifyforzoho.html')
})
if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: prodConfig.output.publicPath,
    open: false
  }));
  app.use(webpackHotMiddleware(compiler));
}


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../client', 'index.html'));
});
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


