// import express from 'express';
import express from'express';
import  path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session  from 'express-session';
import cookieParser from 'cookie-parser';
import  passport from 'passport';
import flash  from 'connect-flash';
import validator from 'express-validator';
require('dotenv').config();

var configDB = require('./config/database');

// configuration ===============================================================
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(configDB.url); // connect to our database  
} else {
  mongoose.connect(configDB.url_production); // connect to our database
}

require('./config/passport')(passport); // pass passport for configuration


const app = express();
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
app.use(validator());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(session({ 
  secret: 'ilovescotchscotchyscotchscotch',
  resave: true,
  saveUninitialized: true
 })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/index.js')(app, passport);

app.listen(process.env.PORT || 3000, ()=>{
  console.log('started server on port 3000')
})