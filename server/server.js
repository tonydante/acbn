import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import validator from 'express-validator';
import logger from 'logger';
import http from 'http';
import dotenv from 'dotenv';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import routes from './routes';
import devConfig from '../webpack.config.babel';
import prodConfig from '../webpack.config.prod';

dotenv.config();

// database config
const configDB = require('./config/database');
let compiler;
// compiler = webpack(devConfig);
mongoose.connect(configDB.url);

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(configDB.url_production, option); // connect to our production database
  compiler = webpack(prodConfig);
  console.log(compiler);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect(configDB.url_test); // connect to our test database
  compiler = webpack(devConfig);
} else {
  mongoose.connect(configDB.url);
  compiler = webpack(devConfig);
}

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname + './../public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.render('home.ejs');
})


if (process.env.NODE_ENV === 'production') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: prodConfig.output.publicPath,
    open: false
  }));
} else {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    open: false
  }));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../client', 'index.html'));
});


//Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works');
  } else {
    console.log(`Server runnin on port ${port}...`);
  }
});
