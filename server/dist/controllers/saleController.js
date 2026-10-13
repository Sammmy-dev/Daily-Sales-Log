import Sale from '../models/Sale.js';
export const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ timestamp: 1 });
        const response = {
            success: true,
            data: sales,
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch sales',
        });
    }
};
export const createSale = async (req, res) => {
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
        const response = {
            success: true,
            data: sale,
        };
        res.status(201).json(response);
    }
    catch (error) {
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
export const deleteSale = async (req, res) => {
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
        const response = {
            success: true,
            data: { id },
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete sale',
        });
    }
};
export const clearSales = async (req, res) => {
    try {
        await Sale.deleteMany({});
        const response = {
            success: true,
            message: 'All sales cleared',
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to clear sales',
        });
    }
};
//# sourceMappingURL=saleController.js.map