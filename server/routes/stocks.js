import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/stocks/:symbol..ye request hai client se
router.get('/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const apiKey = process.env.FINNHUB_API_KEY;

    try {
        // finhub se price ka data leti hai
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);

        // object ke form me finhub data bhejti hai

        const data = response.data;

        // convert kara hai data frontend bhejta hai ye part

        if (data.c === 0 && data.d === null) {
            return res.status(404).json({ msg: 'Stock not found' });
        }

        res.json({
            symbol: symbol.toUpperCase(),
            price: data.c,           // abhi ka price
            change: data.d,          // dollar me chnage kar rha
            percentChange: data.dp   // per pe convert kar rha
        });

    } catch (error) {
        console.error('Finnhub Error:', error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

export default router;