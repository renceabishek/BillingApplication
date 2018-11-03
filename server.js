const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB');
    const customerRoutes = require('./routes/customer.route');
    const produtRoutes = require('./routes/product.route');

    const app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    app.use('/customer', customerRoutes);
    app.use('/product', produtRoutes);

    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
       });