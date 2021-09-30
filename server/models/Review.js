const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
{
    user: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product:
    {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    } ,  
    reviewText:
    {
        type: String,
        required: true
    },
    rating:
    {
        type: Number,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;