const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

const customerRoutes = require('./routes/customer.route');
//const produtRoutes = require('./routes/product.route');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/BillingApp').then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);


app.use(bodyParser.json());
app.use(cors());
app.use('/customer', customerRoutes);
//app.use('/product', produtRoutes);

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});