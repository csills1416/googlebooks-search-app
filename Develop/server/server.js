const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const cors = require('cors'); // For handling CORS
const morgan = require('morgan'); // For logging

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Use morgan for HTTP request logging
app.use(morgan('combined'));

// Use CORS to handle cross-origin requests, if your client is on a different domain or port
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Remember to start the Apollo Server before applying it as middleware
server.start().then(() => {
  server.applyMiddleware({ app });
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`));
});
