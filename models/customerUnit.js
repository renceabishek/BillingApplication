const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let customerUnit = new Schema({
    customer_id: {
        type: String
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_buyerscode: {
        type: String,
        required: true
    },
    customer_tinno: {
        type: String
    },
    customer_state: {
        type: String
    },
    customer_mobno: {
        type: Number
    },
    customer_email: {
        type: String
    },
    customer_address: {
        type: String
    }
    ,
    customer_pincode: {
        type: Number
    },
    customer_remarks: {
        type: String
    }
}, {
        collection: 'customers'
    });

module.exports = mongoose.model('customerUnit', customerUnit);