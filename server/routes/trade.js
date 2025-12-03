import express from 'express';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// portfolio display karane vala part

router.get('/portfolio/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // saare stcoks ka data fetch kar rha ek specific user se 

        const portfolio = await Portfolio.find({ userId });

        // frontend ko list bhej rha

        res.json(portfolio);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// GET /api/trade/transactions/:userId
router.get('/transactions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// POST /api/trade/buy...ye request bhej rha

router.post('/buy', async (req, res) => {
    const { userId, symbol, quantity, price } = req.body;
    const totalCost = quantity * price;

    try {
        // balance check kar rhe
        const user = await User.findById(userId);

        // check kar rha ki kya enough balance hai user ke paas for buying or selling

        if (user.balance < totalCost) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        // paise minus kar rha from balance

        user.balance -= totalCost;
        await user.save();

        // portfolio update kar rha
        let holding = await Portfolio.findOne({ userId, symbol });

        if (holding) {
            // agar user ke paas already ho
            const newTotalQuantity = holding.quantity + quantity;
            const newAvgPrice = ((holding.avgPrice * holding.quantity) + totalCost) / newTotalQuantity;

            holding.quantity = newTotalQuantity;
            holding.avgPrice = newAvgPrice;
            await holding.save();
        } else {
            // agar new stock hai toh new holding create ka r rha
            const newHolding = new Portfolio({
                userId,
                symbol,
                quantity,
                avgPrice: price
            });
            await newHolding.save();
        }

        // transaction history
        const transaction = new Transaction({
            userId,
            symbol,
            type: 'BUY',
            quantity,
            price,
            total: totalCost
        });
        await transaction.save();

        res.json({ msg: `Successfully bought ${quantity} shares of ${symbol}`, newBalance: user.balance });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});
// sell engine
router.post('/sell', async (req, res) => {
    const { userId, symbol, quantity, price } = req.body;
    const totalValue = quantity * price;
    const upperSymbol = symbol.toUpperCase();

    try {
        const user = await User.findById(userId);
        const holding = await Portfolio.findOne({ userId, symbol: upperSymbol });

        // check kar rha ki kya us company ke stock uske paas hai

        if (!holding) {
            return res.status(400).json({ msg: 'You do not own this stock' });
        }

        // check kar rhe ki enough shares hai

        if (holding.quantity < quantity) {
            return res.status(400).json({ msg: `Not enough shares. You have ${holding.quantity}.` });
        }

        // money add kar de rha balance me

        user.balance += totalValue;
        await user.save();

        // oney subtract kar rha
        holding.quantity -= quantity;

        if (holding.quantity === 0) {
            // agar saare sell kar diye to database clear kar do

            await Portfolio.findByIdAndDelete(holding._id);
        } else {
            // varna save kar lo new quantity

            await holding.save();
        }

        // record history

        const transaction = new Transaction({
            userId,
            symbol: upperSymbol,
            type: 'SELL',
            quantity,
            price,
            total: totalValue
        });
        await transaction.save();

        res.json({ msg: `Sold ${quantity} shares`, newBalance: user.balance });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});
export default router;