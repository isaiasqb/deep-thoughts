const mongoose = require('mongoose');

mongoose.connect(
  //'mongodb://localhost/deep-thoughts'
  process.env.MONGODB_URI || 'mongodb://localhost:27017/deep-thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

module.exports = mongoose.connection;
