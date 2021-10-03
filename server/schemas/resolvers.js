const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Product, Review, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51JeslkDra0kXhwYb8LB1x0i2Q6W9AF0xAeVXBqLqZouUzw3WUkwPfG94ISNW5BZnXOEtM3dYYvLh9AAytaTExThX00bV1s0ZFL');

const resolvers =
{
    Query:
    {
        me: async (parent, args, context) => {
            console.log("me");
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate({ path: "reviews", populate: "product" })
                    .populate({ path: "orders", populate: "product" })
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return await User.find().populate({ path: "reviews", populate: "product" });
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id).populate({ path: "reviews", populate: "product" });
        },
        categories: async () => {
            return await Category.find().populate("subcategories");
        },
        subcategories: async (parent, { _id }) => 
        {
            const parentCategory = await Category.findById(_id).populate("subcategories");
            const subcategories = [];
            for(let i = 0; i < parentCategory.subcategories.length; i++)
            {
                const category = await Category.findById(parentCategory.subcategories[i]._id);
                subcategories.push(category);
            }
            return subcategories;
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
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addCategory: async (parent, args) => {
            const category = await Category.create(args);
            return category;
        },
        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        editCategory: async (parent, args) => {
            const category = await Category.findOneAndUpdate({_id: args._id}, { name: args.name, subcategories: args.subcategories});
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
            console.log(args);
            const product = await Product.findOneAndUpdate({_id: args._id}, { name: args.name, description: args.description, image: args.image, price: args.price, category: args.category, featuredProduct: args.featuredProduct});
            console.log(product);
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