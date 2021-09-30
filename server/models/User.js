const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
{
<<<<<<< HEAD

=======
    firstName: 
    {
        type: String,
        required: true,
        trim: true
    },
    lastName: 
    {
        type: String,
        required: true,
        trim: true
    },
    userName: 
    {
        type: String,
        required: true,
        trim: true
    },
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true,
        minlength: 5
    },
    //orders: [Order],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    admin: 
    {
        type: Boolean,
        default: false
    }
>>>>>>> 6d43a92140da87e06fe716f6d1fa5d5deb4f17a6
});

userSchema.pre('save', async function (next)
{
    if (this.isNew || this.isModified('password'))
    {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password)
{
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
