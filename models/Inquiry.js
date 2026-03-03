const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    orderSrNo: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    partyName: { type: String, required: true },
    productName: { type: String, required: true },
    productSize: { type: String, required: true },
    productQty: { type: Number, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    color: { type: String },
    samplePhoto: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
