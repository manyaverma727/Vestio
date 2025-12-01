import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/stocks/:symbol
router.get('/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const apiKey = process.env.FINNHUB_API_KEY;

    try {
        // 1. Ask Finnhub for the price
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
        
        // 2. Finnhub sends back object: { c: current_price, d: change, ... }
        const data = response.data;

        // 3. Send clean data to frontend
        if (data.c === 0 && data.d === null) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json({
        symbol: symbol.toUpperCase(),
        price: data.c,           // Current Price
        change: data.d,          // Change in $
        percentChange: data.dp   // Change in %
        });

    } catch (error) {
        console.error('Finnhub Error:', error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

export default router;