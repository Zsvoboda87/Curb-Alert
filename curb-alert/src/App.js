import Home from './components/Pages/Home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PostSingle from './components/Pages/PostSingle';

export const customHistory = createBrowserHistory();

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <Router forceRefresh={true}>
      <ApolloProvider client={client}>
        <ChakraProvider>

          <Home></Home>

        </ChakraProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
