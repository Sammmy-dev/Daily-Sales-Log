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