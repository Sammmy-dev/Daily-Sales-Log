import { Request, Response } from 'express';
import Sale, { ISale } from '../models/Sale.ts';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export const getSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const sales = await Sale.find().sort({ timestamp: 1 });
    const response: ApiResponse<ISale[]> = {
      success: true,
      data: sales,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales',
    });
  }
};

export const createSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const { item_name, amount, timestamp } = req.body;

    if (!item_name || typeof item_name !== 'string' || item_name.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Item name is required and cannot be empty',
      });
      return;
    }

    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
      return;
    }

    const sale = await Sale.create({
      itemName: item_name.trim(),
      amount,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    const response: ApiResponse<ISale> = {
      success: true,
      data: sale,
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create sale',
    });
  }
};

export const seedSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = req.body.count || Math.floor(Math.random() * 6) + 10;

    const sampleItems = [
      { itemName: 'Rice (50kg)', amount: 45000 },
      { itemName: 'Beans (50kg)', amount: 52000 },
      { itemName: 'Groundnut Oil (25L)', amount: 38000 },
      { itemName: 'Tomatoes (Basket)', amount: 15000 },
      { itemName: 'Pepper (Basket)', amount: 12000 },
      { itemName: 'Onions (Bag)', amount: 28000 },
      { itemName: 'Maggi (Carton)', amount: 8500 },
      { itemName: 'Salt (Bag)', amount: 3500 },
      { itemName: 'Milk (Carton)', amount: 18000 },
      { itemName: 'Sugar (50kg)', amount: 42000 },
      { itemName: 'Flour (50kg)', amount: 35000 },
      { itemName: 'Spaghetti (Carton)', amount: 9500 },
      { itemName: 'Bread (Loaf)', amount: 800 },
      { itemName: 'Eggs (Crate)', amount: 3200 },
      { itemName: 'Chicken (Kg)', amount: 4500 },
    ];

    const salesToCreate = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
      const daysAgo = Math.floor(Math.random() * 7);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);

      const timestamp = new Date(now);
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

      salesToCreate.push({
        itemName: item.itemName,
        amount: item.amount + Math.floor(Math.random() * 5000) - 2500,
        timestamp,
      });
    }

    const createdSales = await Sale.insertMany(salesToCreate);

    const response: ApiResponse<ISale[]> = {
      success: true,
      count: createdSales.length,
      data: createdSales,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed sales',
    });
  }
};

export const deleteSale = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const sale = await Sale.findByIdAndDelete(id);

    if (!sale) {
      res.status(404).json({
        success: false,
        message: 'Sale not found',
      });
      return;
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete sale',
    });
  }
};

export const clearSales = async (req: Request, res: Response): Promise<void> => {
  try {
    await Sale.deleteMany({});
    const response: ApiResponse<null> = {
      success: true,
      message: 'All sales cleared',
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear sales',
    });
  }
};