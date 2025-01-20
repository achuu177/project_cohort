const { Order } = require('../models/orderModel.js');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || !items.length || !totalAmount) {
            return res.status(400).json({ message: "Items and total amount are required" });
        }

        const order = new Order({
            userId: req.user.id,
            items,
            totalAmount,
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order. Please try again later." });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders. Please try again later." });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Order status is required" });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status. Please try again later." });
    }
};
