import express from 'express';
// ApolloServer
import { ApolloServer } from 'apollo-server-express';  
import {typeDefs} from './data/schema';
import { resolvers } from './data/resolvers';

const app = express();

app.get("/", (req, res) => res.send("Welcome to my api"));

module.exports = app;

async function start(){
    const server = new ApolloServer({typeDefs, resolvers})

    await server.start()

    server.applyMiddleware({app});

    app.use("*", (req, res) => res.status(404).send("Not found"));
    
    app.listen({port: 4000}, () => 
        console.log(`Server corriendo en el puerto http://localhost:4000${server.graphqlPath}
        `)
    );
}

start();