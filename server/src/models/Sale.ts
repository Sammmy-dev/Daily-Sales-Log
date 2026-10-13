import mongoose, { Document, Schema } from 'mongoose';

export interface ISale extends Document {
  itemName: string;
  amount: number;
  timestamp: Date;
  createdAt: Date;
}

const SaleSchema = new Schema<ISale>(
  {
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [255, 'Item name cannot exceed 255 characters'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be a positive number'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

SaleSchema.index({ timestamp: 1 });

export default mongoose.model<ISale>('Sale', SaleSchema);