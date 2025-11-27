import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    }, { timestamps: true });

    // password hashing kar rha for security
    
//     userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
    
//     try {
//         const salt = await bcryptjs.genSalt(10);
//         this.password = await bcryptjs.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const User = mongoose.model('User', userSchema);
export default User;