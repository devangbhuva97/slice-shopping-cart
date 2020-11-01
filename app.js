require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { v1: uuidv1 } = require("uuid");

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ schema });

const app = express();

app.use((req, _, next) => {
  req.request_id = uuidv1();
  next();
});

const path = '/graphql';

server.applyMiddleware({ app, path });

const httpServer = createServer(app);

httpServer.listen({ port: process.env.PORT }, () => {
  console.log('APP', `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});
