const express = require('express');
const app = express();
const adUnitRoutes = express.Router();
const CustomerUnit = require('../models/customerUnit');


adUnitRoutes.route('/add').post(function (req, res) {
    console.log('check');
    let adUnit = new CustomerUnit(req.body);
    adUnit.save()
        .then(game => {
            res.status(200).json({ 'customers': 'AdUnit in added successfully' });
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

adUnitRoutes.route('/edit/:id').post(function (req, res) {
    let id = req.params.id || req.body.customer_id;
    console.log('-->'+id);
    CustomerUnit.find({ customer_id: id }, function (err, cust) {
      var cus = cust[0];
      if (cus) {
        cus.customer_id = req.body.customer_id;
        cus.customer_name = req.body.customer_name;
        cus.customer_buyerscode = req.body.customer_buyerscode;
        cus.customer_tinno = req.body.customer_tinno;
        cus.customer_state = req.body.customer_state;
        cus.customer_mobno = req.body.customer_mobno;
        cus.customer_email = req.body.customer_email;
        cus.customer_address = req.body.customer_address;
        cus.customer_pincode = req.body.customer_pincode;
        cus.customer_remarks = req.body.customer_remarks;
  
        cus.save().then(adUnit => {
          res.json('Update complete');
        }).catch(err => {
          res.status(400).send("unable to update the database");
        });
      }
    });
  });

  adUnitRoutes.route('/delete/:id').post(function (req, res) {
    CustomerUnit.remove({ customer_id: req.params.id }, function (err, adUnit) {
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  });

module.exports = adUnitRoutes;