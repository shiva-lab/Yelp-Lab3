import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from '../src/Component/Main';
import { BrowserRouter } from "react-router-dom";

// components



// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
    );
  }
}
export default App;