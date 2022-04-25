import Home from './components/Pages/Home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PostSingle from './components/Pages/PostSingle';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={PostSingle} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
