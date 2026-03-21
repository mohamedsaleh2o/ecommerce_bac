const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true, default: 0 },
  count: { type: Number, required: true, default: 0 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true, text: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  image: { type: String, required: true },
  rating: { type: ratingSchema, required: true }
}, { timestamps: true });

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  }
});

module.exports = mongoose.model('Product', productSchema);
