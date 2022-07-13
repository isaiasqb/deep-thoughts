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
import { setContext } from '@apollo/client/link/context';

// establish the connection to the back-end server's /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

//middleware function that will retrieve the token for us and combine it with the existing httpLink.
  // we use the setContext() function to retrieve the token from localStorage 
  // and set the HTTP request headers of every request to include the token,
  // if the request doesn't need the token, our server-side resolver function won't check for it.
const authLink = setContext((_, { headers }) => { 
  //Because we're not using the first parameter, 
  //but we still need to access the second one, we can use an underscore _ to serve as a placeholder.
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// combine the authLink and httpLink objects so that every request retrieves the token 
// and sets the request headers before making the request to the API. 
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
