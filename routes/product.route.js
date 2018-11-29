const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../models/ProductUnit');

productRoutes.route('/add').post(function (req, res) {
  let product = new Product(req.body);
  console.log("req.body os " + JSON.stringify(req.body));
  product.save()
    .then(game => {
      res.status(200).json({ 'adUnit': 'Products in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

productRoutes.route('/edit/:id').post(function (req, res) {
  let id = req.params.id || req.body.productid;
  Product.find({ productid: id }, function (err, produ) {
    var prod = produ[0];
    if (prod) {
      prod.productid = req.body.productid;
      prod.productname = req.body.productname;
      prod.hsn = req.body.hsn;
      prod.mrp = req.body.mrp;
      prod.rate = req.body.rate;
      prod.tamilname = req.body.tamilname;

      prod.save().then(adUnit => {
        res.json('Update complete');
      }).catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});
productRoutes.route('/delete/:id').post(function (req, res) {
  Product.remove({ productid: req.params.id }, function (err, adUnit) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});
module.exports = productRoutes;