import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import saleRoutes from './routes/saleRoutes.js';
import { config } from './config/index.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', saleRoutes);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });
};
startServer();
export default app;
//# sourceMappingURL=index.js.map