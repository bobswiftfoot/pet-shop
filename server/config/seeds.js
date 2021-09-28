const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
    console.log('seeded');
    
    process.exit();
});