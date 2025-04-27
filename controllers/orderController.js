
const Order = require('../models/orderModel');


exports.createOrder = async (req, res) => {
    const { userId, items, total } = req.body;

    try {
        const order = new Order({
            userId,
            items,
            total,
            status: 'Pending',
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: 'Error placing order' });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

