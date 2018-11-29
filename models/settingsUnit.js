const mongoose = require('mongoose');
let settings = new mongoose.Schema({
    customer_id: {
        type: Number
    },
    product_id: {
        type: Number
    }
}, {
        collection: 'settings'
    });

module.exports = mongoose.model('setttings', settings);