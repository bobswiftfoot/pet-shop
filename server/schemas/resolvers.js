const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { User, Category, Product, Review } = require('../models');
const stripe = require('stripe')('sk_test_51JeslkDra0kXhwYb8LB1x0i2Q6W9AF0xAeVXBqLqZouUzw3WUkwPfG94ISNW5BZnXOEtM3dYYvLh9AAytaTExThX00bV1s0ZFL');

const resolvers =
{
    Query:
    {
        users: async () => {
            return await User.find().populate({ path: "reviews", populate: "product" });
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id).populate({ path: "reviews", populate: "product" });
        },
        categories: async () => {
            return await Category.find().populate("subcategories");
        },
        subcategories: async (parent, { _id }) => {
            return await Category.findById(_id);
        },
        products: async (parent, { category }) => {
            const params = {};
            if (category)
                params.category = category;
            return await Product.find(params).populate("category");
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate("category").populate({ path: "reviews", populate: "user" });
        },
        featuredProducts: async (parent, { category }) => {
            const params = {};
            params.category = category;
            params.featuredProduct = true;
            return await Product.find(params).populate("category");
        },
        reviews: async (parent, { user, product }) => {
            const params = {};
            if (user)
                params.user = user;
            else if (product)
                params.product = product;
            return await Review.find(params).populate("user").populate("product");
        },
        review: async (parent, { _id }) => {
            return await Review.findById(_id).populate("user").populate("product");
        },
        checkout: async (parent, args, context) => {

            const url = new URL(context.headers.referer).origin;

            const order = new Order({ products: args.products });
            const { products } = await order.populate('products').execPopulate();

            const line_items = [];

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: '${url}/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: '${url}/'
            });

            return { session: session.id };
        }
    },

    Mutation:
    {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        addCategory: async (parent, args) => {
            const category = await Category.create(args);
            return category;
        },
        editCategory: async (parent, args) => {
            const category = await Category.findOneAndUpdate(args._id, args);
            return category;
        },
        removeCategory: async (parent, { _id }) => {
            const category = await Category.findOneAndDelete(_id);
            return category;
        },
        addProduct: async (parent, args) => {
            const product = await Product.create(args);
            return product;
        },
        editProduct: async (parent, args) => {
            const product = await Product.findOneAndUpdate(args._id, args);
            return product;
        },
        removeProduct: async (parent, { _id }) => {
            const product = await Product.findOneAndDelete(_id);
            return product;
        },
        addReview: async (parent, args) => {
            const review = await Review.create(args);

            await User.findOneAndUpdate(
                { _id: args.user },
                { $push: { reviews: review._id } });

            await Product.findOneAndUpdate(
                { _id: args.product },
                { $push: { reviews: review._id } });

            return review;
        },
        editReview: async (parent, args) => {
            const review = await Review.findOneAndUpdate(args._id, args);
            return review;
        },
        removeReview: async (parent, { _id }) => {
            const review = await Review.findOneAndRemove(_id);

            await User.findOneAndUpdate(
                { _id: review.user },
                { $pull: { reviews: _id } });

            await Product.findOneAndUpdate(
                { _id: review.product },
                { $pull: { reviews: _id } });

            return review;
        }
    }
};

module.exports = resolvers;