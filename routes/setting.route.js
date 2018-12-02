const express = require('express');
const app = express();
const settingsRoute = express.Router();

let Setting = require('../models/settingsUnit');

settingsRoute.route('/add').post(function (req, res) {
    let setsave = new Setting(req.body);
    console.log("req.body settings " + JSON.stringify(req.body));
    setsave.save()
      .then(game => {
        res.status(200).json({ 'settings': 'Settings in added successfully' });
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });

  settingsRoute.route('/').get(function (req, res) {
    Setting.find(function (err, set) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(set);
      }
    });
  });

  settingsRoute.route('/edit/:id').post(function (req, res) {
    let id = req.params.id || req.body._id;
    console.log('dhc');
    Setting.find({ _id: id }, function (err, produ) {
      var prod = produ[0];
      if (prod) {
        prod.product_id = req.body.product_id;
        prod.customer_id = req.body.customer_id;  
        prod.save().then(adUnit => {
          res.json('Update complete');
        }).catch(err => {
          res.status(400).send("unable to update the database");
        });
      }
    });
  });

  module.exports = settingsRoute;