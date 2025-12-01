import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        uppercase: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    avgPrice: {
        type: Number,
        required: true,
    },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;