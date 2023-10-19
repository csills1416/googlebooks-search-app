// src/config/apolloClient.js or src/utils/apolloClient.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Adjust this to your GraphQL server endpoint
  cache: new InMemoryCache(),
});
