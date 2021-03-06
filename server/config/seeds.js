const db = require('./connection');
const { User, Category, Product, Review, Order } = require('../models');

db.once('open', async () =>
{
    console.log("Seeding started");
    await Category.deleteMany();

    const subcategories = await Category.insertMany([
        { name: 'Dog Food' },
        { name: 'Dog Treats' },
        { name: 'Dog Toys' },
        { name: 'Dog Supplies' },
        { name: 'Cat Food' },
        { name: 'Cat Treats' },
        { name: 'Cat Toys' },
        { name: 'Cat Supplies' },
        { name: 'Fish Food' },
        { name: 'Fish Treats' },
        { name: 'Fish Toys' },
        { name: 'Fish Supplies' },
        { name: 'Reptile Food' },
        { name: 'Reptile Treats' },
        { name: 'Reptile Toys' },
        { name: 'Reptile Supplies' },
        { name: 'Bird Food' },
        { name: 'Bird Treats' },
        { name: 'Bird Toys' },
        { name: 'Bird Supplies' },
        { name: 'Small Rodent Food' },
        { name: 'Small Rodent Treats' },
        { name: 'Small Rodent Toys' },
        { name: 'Small Rodent Supplies' },
        { name: 'Exotic Food' },
        { name: 'Exotic Treats' },
        { name: 'Exotic Toys' },
        { name: 'Exotic Supplies' }
    ]);

    console.log("Subcategories created");

    await Category.insertMany([
        {
            name: 'Dogs',
            subcategories: [
                subcategories[0]._id,
                subcategories[1]._id,
                subcategories[2]._id,
                subcategories[3]._id
            ]
        },
        {
            name: 'Cats',
            subcategories: [
                subcategories[4]._id,
                subcategories[5]._id,
                subcategories[6]._id,
                subcategories[7]._id
            ]
        },
        {
            name: 'Fish',
            subcategories: [
                subcategories[8]._id,
                subcategories[9]._id,
                subcategories[10]._id,
                subcategories[11]._id
            ]
        },
        {
            name: 'Reptiles',
            subcategories: [
                subcategories[12]._id,
                subcategories[13]._id,
                subcategories[14]._id,
                subcategories[15]._id
            ]
        },
        {
            name: 'Birds',
            subcategories: [
                subcategories[16]._id,
                subcategories[17]._id,
                subcategories[18]._id,
                subcategories[19]._id
            ]
        },
        {
            name: 'Small Rodents',
            subcategories: [
                subcategories[20]._id,
                subcategories[21]._id,
                subcategories[22]._id,
                subcategories[23]._id
            ]
        },
        {
            name: 'Exotic',
            subcategories: [
                subcategories[24]._id,
                subcategories[25]._id,
                subcategories[26]._id,
                subcategories[27]._id
            ]
        }
    ]);

    console.log("Categories seeded");

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Bag of Dog Food',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'dogfood.jpg',
            category: subcategories[0]._id,
            price: 12.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Doggie Snax',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'dogtreats.jpg',
            category: subcategories[1]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: "Tug o' War Rope",
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'dogtoy.jpg',
            category: subcategories[2]._id,
            price: 5.99,
            reviews: []
        },
        {
            name: 'Dog Kennel',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'dogkennel.jpg',
            category: subcategories[3]._id,
            price: 23.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Can of Tuna',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'catfood.jpg',
            category: subcategories[4]._id,
            price: 7.99,
            reviews: []
        },
        {
            name: 'Party Mix',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'cattreats.jpg',
            category: subcategories[5]._id,
            price: 12.99,
            reviews: []
        },
        {
            name: 'Fish on a pole',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'cattoy.jpg',
            category: subcategories[6]._id,
            price: 1.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Cat Tower',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'cattower.jpg',
            category: subcategories[7]._id,
            price: 53.99,
            reviews: []
        },
        {
            name: 'Tropical Fish Food',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'fishfood.jpg',
            category: subcategories[8]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Betta Fish Pellets',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'fishtreats.jpg',
            category: subcategories[9]._id,
            price: 4.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Submarineer Statue',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'fishtoy.jpg',
            category: subcategories[10]._id,
            price: 13.99,
            reviews: []
        },
        {
            name: 'Fish Tank',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'fishtank.jpg',
            category: subcategories[11]._id,
            price: 102.99,
            reviews: []
        },
        {
            name: 'Fish Aquarium',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'fishaquarium.jpg',
            category: subcategories[11]._id,
            price: 75.99,
            reviews: []
        },
        {
            name: 'Omnivore Mix',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'reptilefood.jpg',
            category: subcategories[12]._id,
            price: 50.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Herptivite Multivitamins',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'reptiletreats.jpg',
            category: subcategories[13]._id,
            price: 5.99,
            reviews: []
        },
        {
            name: 'Hideaway Rock',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'reptilehideaway.jpg',
            category: subcategories[14]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Heating Pad',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'reptileheatingpad.jpg',
            category: subcategories[15]._id,
            price: 32.99,
            reviews: []
        },
        {
            name: 'Wild Bird Seed',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'birdfood.jpg',
            category: subcategories[16]._id,
            price: 7.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Treat Sticks',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'birdtreats.jpg',
            category: subcategories[17]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Swings',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'birdtoys.jpg',
            category: subcategories[18]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Birdcage',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'birdcage.jpg',
            category: subcategories[19]._id,
            price: 62.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Hampster Food',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'rodentfood.jpg',
            category: subcategories[20]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Nibble Rings',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'rodenttreats.jpg',
            category: subcategories[21]._id,
            price: 2.99,
            reviews: []
        },
        {
            name: 'Hampster Ball',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'hampsterball.jpg',
            category: subcategories[22]._id,
            price: 12.99,
            reviews: []
        },
        {
            name: 'Hampster Wheel',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'hampsterwheel.jpg',
            category: subcategories[23]._id,
            price: 2.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Kangaroo Food',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'kangaroofood.jpg',
            category: subcategories[24]._id,
            price: 22.99,
            reviews: []
        },
        {
            name: 'Axolotl Treats',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'axolotltreats.jpg',
            category: subcategories[25]._id,
            price: 3.99,
            reviews: []
        },
        {
            name: 'Elephant Ring Toss',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'elephantringtoss.jpg',
            category: subcategories[26]._id,
            price: 5.99,
            featuredProduct: true,
            reviews: []
        },
        {
            name: 'Giraffe Enclosure',
            description:
                'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            image: 'giraffeenclosure.jpg',
            category: subcategories[27]._id,
            price: 1002.99,
            reviews: []
        },
    ]);

    console.log('products seeded');

    await User.deleteMany();

    let users = [];
    users.push(await User.create(
        {
            firstName: 'Nathan',
            lastName: 'Pfau',
            userName: 'natepfau',
            email: 'natepfau@yahoo.com',
            password: 'password123',
            orders: [
                {
                    products: [products[0]._id, products[1]._id, products[2]._id]
                }
            ],
            admin: true
        }));
    users.push(await User.create(
        {
            firstName: 'Chris',
            lastName: 'Rose',
            userName: 'chrisrose',
            email: 'blazer5@email.arizona.edu',
            password: 'password123',
            orders: [
                {
                    products: [products[0]._id, products[1]._id, products[2]._id]
                }
            ],
            admin: true
        }));
    users.push(await User.create(
        {
            firstName: 'Alan',
            lastName: 'Moreno',
            userName: 'alanmoreno',
            email: 'alg.moreno00@gmail.com',
            password: 'password123',
            orders: [
                {
                    products: [products[0]._id, products[1]._id, products[2]._id]
                }
            ],
            admin: true
        }));

    console.log('Users seeded');

    await Review.deleteMany();

    let review = await Review.create(
        {
            reviewText: 'This is the best food I have ever tasted',
            rating: 4,
            user: users[0]._id,
            product: products[0]._id
        });

    let user = await User.findOneAndUpdate(
        { _id: users[0]._id },
        { $push: { reviews: review._id } },
        { new: true });

    let product = await Product.findOneAndUpdate(
        { _id: products[0]._id },
        { $push: { reviews: review._id } },
        { new: true });

    review = await Review.create(
        {
            reviewText: 'This is the best food I have ever tasted again',
            rating: 5,
            user: users[0]._id,
            product: products[0]._id
        });

    user = await User.findOneAndUpdate(
        { _id: users[0]._id },
        { $push: { reviews: review._id } },
        { new: true });

    product = await Product.findOneAndUpdate(
        { _id: products[0]._id },
        { $push: { reviews: review._id } },
        { new: true });

    review = await Review.create(
        {
            reviewText: 'Very Roomy',
            rating: 3,
            user: users[1]._id,
            product: products[27]._id
        });

    await User.findOneAndUpdate(
        { _id: users[1]._id },
        { $push: { reviews: review._id } });

    await Product.findOneAndUpdate(
        { _id: products[27]._id },
        { $push: { reviews: review._id } });

    review = await Review.create(
        {
            reviewText: 'Not a real fish',
            rating: 1,
            user: users[2]._id,
            product: products[6]._id
        });

    await User.findOneAndUpdate(
        { _id: users[2]._id },
        { $push: { reviews: review._id } });

    await Product.findOneAndUpdate(
        { _id: products[6]._id },
        { $push: { reviews: review._id } });

    console.log('Reviews seeded');

    process.exit();
});