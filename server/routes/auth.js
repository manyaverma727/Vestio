import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

//registeration vala route

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check kar rha ki ye user pehle se exist kar rha ki nhi

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
        }

        // agar exist nhi karta to new user bana dega

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // login vala route

    router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // login karne pe check kar rha ki if it exits or not 
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // password match kar rha

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // jwt token bhi generate kar rha
        
        const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
        );

        res.json({ 
        token, 
        user: { id: user._id, email: user.email } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;