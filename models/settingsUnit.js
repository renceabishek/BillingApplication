const mongoose = require('mongoose');
let settings = new mongoose.Schema({
    customer_id: {
        type: Number
    },
    product_id: {
        type: Number
    },
    invoice_no: {
        type: Number
    },
    owner_name: {
        type: String
    },
    owner_mobno: {
        type: Number
    },
    owner_shname: {
        type: String
    },
    owner_street: {
        type: String
    },
    owner_city: {
        type: String
    },
    owner_gstin: {
        type: String
    },
    owner_email: {
        type: String
    }
}, {
        collection: 'settings'
    });

module.exports = mongoose.model('setttings', settings);