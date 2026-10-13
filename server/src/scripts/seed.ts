import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sale from '../models/Sale.ts';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/daily-sales-log';

const FIXED_SALES = [
  { itemName: 'Rice (50kg)', amount: 45000, timestamp: '2026-10-01T08:30:00.000Z' },
  { itemName: 'Beans (50kg)', amount: 52000, timestamp: '2026-10-01T10:15:00.000Z' },
  { itemName: 'Groundnut Oil (25L)', amount: 38000, timestamp: '2026-10-02T09:00:00.000Z' },
  { itemName: 'Tomatoes (Basket)', amount: 15000, timestamp: '2026-10-02T11:45:00.000Z' },
  { itemName: 'Pepper (Basket)', amount: 12000, timestamp: '2026-10-03T08:00:00.000Z' },
  { itemName: 'Onions (Bag)', amount: 28000, timestamp: '2026-10-03T14:20:00.000Z' },
  { itemName: 'Maggi (Carton)', amount: 8500, timestamp: '2026-10-04T10:30:00.000Z' },
  { itemName: 'Salt (Bag)', amount: 3500, timestamp: '2026-10-04T16:00:00.000Z' },
  { itemName: 'Milk (Carton)', amount: 18000, timestamp: '2026-10-05T09:15:00.000Z' },
  { itemName: 'Sugar (50kg)', amount: 42000, timestamp: '2026-10-05T13:45:00.000Z' },
  { itemName: 'Flour (50kg)', amount: 35000, timestamp: '2026-10-06T08:45:00.000Z' },
  { itemName: 'Spaghetti (Carton)', amount: 9500, timestamp: '2026-10-06T15:30:00.000Z' },
  { itemName: 'Bread (Loaf)', amount: 800, timestamp: '2026-10-07T07:00:00.000Z' },
  { itemName: 'Eggs (Crate)', amount: 3200, timestamp: '2026-10-07T12:00:00.000Z' },
  { itemName: 'Chicken (Kg)', amount: 4500, timestamp: '2026-10-07T17:30:00.000Z' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Sale.deleteMany({});
    console.log('Cleared existing sales');

    const salesWithDates = FIXED_SALES.map(sale => ({
      ...sale,
      timestamp: new Date(sale.timestamp),
    }));

    const created = await Sale.insertMany(salesWithDates);
    console.log(`Seeded ${created.length} sales records`);

    created.forEach(sale => {
      console.log(`  - ${sale.itemName}: ₦${sale.amount.toLocaleString()} at ${sale.timestamp.toISOString()}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();