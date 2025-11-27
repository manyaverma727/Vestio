import express from 'express';
// import bcryptjs, { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//registeration vala route

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        //check kar rha ki ye user pehle se exist kar rha ki nhi

        const existingUser = await User.findOne({ email });


        const hashPassword = await bcrypt.hash(password, 10);
        
        if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
        }

        // agar exist nhi karta to new user bana dega

        const newUser = await User.create({ email, password:hashPassword });
   
     

   

        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        console.log(err.message);
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

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // jwt token bhi generate kar rha
        const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
        );

        return res.json({ 
        token, 
        user: { id: user._id, email: user.email } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;