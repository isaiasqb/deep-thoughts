import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

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
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route path="/profile">
                <Route path=':username' element={<Profile />}  />
                <Route path=''          element={<Profile />}  />
              </Route>
              <Route
                path="/thought/:id"
                element={<SingleThought />}
              />
              {/* If the route doesn't match any of the preceding paths */}
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
