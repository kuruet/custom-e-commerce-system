import mongoose from 'mongoose';

const loyaltySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  history: [{
    type: { type: String, enum: ['EARNED', 'REDEEMED'] },
    points: Number,
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Loyalty', loyaltySchema);