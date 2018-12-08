const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

const produtRoutes = require('./routes/product.route');
const customerRoutes = require('./routes/customer.route');
const settingsRoutes = require('./routes/setting.route');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Billing').then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
app.use('/prodserv', produtRoutes);
app.use('/customer', customerRoutes);
app.use('/settings', settingsRoutes);

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});