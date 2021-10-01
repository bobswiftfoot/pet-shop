const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

let serverPath = "";

async function startServer()
{
    const server = new ApolloServer(
        {
            typeDefs,
            resolvers,
        });
    await server.start();

    server.applyMiddleware({ app });
    
    //Save the path to use in the log later on.
    serverPath = server.graphqlPath;
}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () =>
{
    app.listen(PORT, () =>
    {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${serverPath}`);
    });
});
