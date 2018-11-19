const express = require('express');
const app = express();
const adUnitRoutes = express.Router();
const CustomerUnit = require('../models/customerUnit');


adUnitRoutes.route('/add').post(function (req, res) {
    console.log('check');
    let adUnit = new CustomerUnit(req.body);
    adUnit.save()
        .then(game => {
            res.status(200).json({ 'adUnit': 'AdUnit in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

adUnitRoutes.route('/').get(function (req, res) {
    CustomerUnit.find(function (err, adUnits){
    if(err){
      console.log(err);
    }
    else {
      res.json(adUnits);
    }
  });
});

module.exports = adUnitRoutes;