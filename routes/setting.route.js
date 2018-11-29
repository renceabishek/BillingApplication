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

  module.exports = settingsRoute;