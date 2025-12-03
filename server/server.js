import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Routes
import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';
import tradeRoutes from './routes/trade.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//  middleware
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());

//json data parse kar rha
app.use(express.json());

app.use((req, res, next) => {
    console.log(`📨 Request received: ${req.method} ${req.url}`);
    next();
});

// routes hai
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/trade', tradeRoutes);

// database connection vala part
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('YEAHH!!...... MongoDB Connected'))
    .catch((err) => console.log('OOPS!!!....TRY AGAIN  DB Error:', err));

// server start kar rha
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});