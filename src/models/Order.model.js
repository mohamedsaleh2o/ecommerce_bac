const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true } // Snapshot of price at time of purchase
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [orderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  paymentMethod: { type: String, required: true, default: 'Cash on Delivery' }
}, { timestamps: true });

orderSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Order', orderSchema);
