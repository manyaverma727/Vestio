import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

//  middleware
app.use(cors());          //frontend or backend ko connect karta hai

//json data parse kar rha
app.use(express.json());  

app.use('/api/auth', authRoutes); 

// database connection vala part

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('YEAHH!!...... MongoDB Connected'))
    .catch((err) => console.log('OOPS!!!....TRY AGAIN  DB Error:', err));


    // server start kar rha
app.listen(PORT, () => {
    console.log(`HI!!!....Server running on port ${PORT}`);
});