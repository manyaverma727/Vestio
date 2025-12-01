import mongoose from 'mongoose';

// transaction ka structure define kar rha 
const transactionSchema = new mongoose.Schema({
    
    // specific user tracker 
    userId: {
        type: mongoose.Schema.Types.ObjectId, //  MongoDB ki unique ID format use ho rha
        ref: 'User',      // id points of user
        required: true,   // transaction us user ko hi belong karna chahiye
    },

    // stock ticker symbol
    symbol: {
        type: String,
        required: true,
        uppercase: true,  // automatically convert kar dega lowercase to uppercase 
    },

    // buy kar rhe ya sell kar rhe?
    type: {
        type: String,
        enum: ['BUY', 'SELL'], 
        required: true,
    },

    // kitne shares trade hue hai
    quantity: {
        type: Number,
        required: true,
    },

    // price of one share
    price: {
        type: Number,
        required: true,
    },

    // total value jo quant*price use hua
    total: {
        type: Number,
        required: true,
    },
    }, { 
    timestamps: true 
});

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;