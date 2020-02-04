import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Users from './components/Users.js';

const client = new ApolloClient({ uri: '/graphql' });

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route exact path="/" component={Users} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
