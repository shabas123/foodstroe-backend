// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            varient: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending', // Default status could be 'Pending', 'Shipped', 'Delivered'
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
