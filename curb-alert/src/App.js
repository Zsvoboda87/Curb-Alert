import Home from './components/Pages/Home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setContext } from '@apollo/client/link/context';


export const customHistory = createBrowserHistory();

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router forceRefresh={true}>
        <ChakraProvider>
          <Switch>

            <Home></Home>

          </Switch>
        </ChakraProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
