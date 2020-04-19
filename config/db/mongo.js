const DB_USER = 'estefany'
const DB_PASS = 'estefany'
const DB_HOST = 'ingenieria-web-ctf1d.mongodb.net/test?retryWrites=true&w=majority'

const MONGODB_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;

module.exports = {
  MONGO_URI,
  MONGODB_OPTIONS,
};
