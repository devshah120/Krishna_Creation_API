const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderSrNo: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    partyName: { type: String, required: true },
    productName: { type: String, required: true },
    productSize: { type: String, required: true },
    productQty: { type: Number, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    outsource: { type: Boolean, default: false },
    outsourceName: { type: String },
    arrivalDate: { type: Date },
    assignedWorkerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Pending Approval', 'Complete'],
        default: 'New'
    },
    proofImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
