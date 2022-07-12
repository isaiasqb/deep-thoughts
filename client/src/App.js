import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// establish the connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

// enable application to interact with Apollo Client instance. 

// Wrap the entire returning JSX code with <ApolloProvider>. 
// Because we're passing the client variable in as the value for the client prop in the provider, 
// everything between the JSX tags will eventually have access to the server's API data through the client we set up.
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
