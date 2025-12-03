import express from 'express';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

//--- NEW ROUTE: Get Portfolio ---
// Used to display the table on the Dashboard

router.get('/portfolio/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Find all stocks owned by this user
        const portfolio = await Portfolio.find({ userId });
        
        // Send the list back to the frontend
        res.json(portfolio);
        } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
        }
    });

// POST /api/trade/buy
router.post('/buy', async (req, res) => {
    const { userId, symbol, quantity, price } = req.body;
    const totalCost = quantity * price;

    try {
        // 1. Get the User to check balance
        const user = await User.findById(userId);
        
        // 2. Check if they have enough money (Assuming user has a 'balance' field)
        // Note: We need to make sure your User model has a 'balance' field. 
        // If not, we'll add it in the next step.
        if (user.balance < totalCost) {
        return res.status(400).json({ msg: 'Insufficient funds' });
        }

        // 3. Deduct cash from User
        user.balance -= totalCost;
        await user.save();

        // 4. Update Portfolio (Add stock)
        let holding = await Portfolio.findOne({ userId, symbol });
        
        if (holding) {
        // If they already own it, update average price and quantity
        const newTotalQuantity = holding.quantity + quantity;
        const newAvgPrice = ((holding.avgPrice * holding.quantity) + totalCost) / newTotalQuantity;
        
        holding.quantity = newTotalQuantity;
        holding.avgPrice = newAvgPrice;
        await holding.save();
        } else {
        // If new stock, create new holding
        const newHolding = new Portfolio({
            userId,
            symbol,
            quantity,
            avgPrice: price
        });
        await newHolding.save();
        }

        // 5. Create Transaction Record (History)
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

export default router;