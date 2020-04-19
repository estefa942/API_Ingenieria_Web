/**
 * NPM required packages
 */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');



const routes = require('../app/routes');



/**
 * Importing configuration variables
 */
const {
  port,
  morganMode,
} = require('./config');

const {
  MONGO_URI,
  MONGODB_OPTIONS,
} = require('./db/mongo');


/**
 * Sets up the server configuration to an Express app
 * @param {*} app 
 */
const server = (app) => {
    mongoose.connect(MONGO_URI, MONGODB_OPTIONS, (err) => {
      if (err) {
        return console.log('Error while connecting to Mongo database');
      }
      return console.log('Succesfull Mongo database connection!');
    });
  

  app.disable('x-powered-by');
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan(morganMode));
  app.use(cors());
  app.use('/', routes);
};

module.exports = server;
