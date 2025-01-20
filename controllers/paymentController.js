const { Payment } = require('../models/paymentModel.js');

exports.processPayment = async (req, res) => {
    try {
        const { orderId, amount, method } = req.body;

        if (!orderId || !amount || !method) {
            return res.status(400).json({ message: "Order ID, amount, and payment method are required" });
        }

        const payment = new Payment({
            orderId,
            amount,
            method,
        });

        await payment.save();
        res.status(201).json({ message: "Payment processed successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Failed to process payment. Please try again later." });
    }
};

exports.getPaymentDetails = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve payment details. Please try again later." });
    }
};