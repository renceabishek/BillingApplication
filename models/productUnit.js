const mongoose = require('mongoose');

// Define collection and schema for Products
let product = new mongoose.Schema({
  productid: {
    type: Number
  },
  productname: {
    type: String
  },
  hsn: {
    type: Number
  },
  mrp: {
    type: String
  },
  rate: {
    type: String
  },
  tamilname: {
    type: String
  }
}, {
    collection: 'products'
  });

module.exports = mongoose.model('product', product);