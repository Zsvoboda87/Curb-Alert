import Home from './components/Pages/Home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-globally'

export const customHistory = createBrowserHistory();

const initState = {
  mapCenter: {
    lat: 41.4,
    lng: -81.7
  }
}

const httpLink = createHttpLink({
  uri: '/graphql',
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
      <Provider globalState={initState}>
        <Router forceRefresh={true}>
          <ChakraProvider>
            <Switch>

              <Home></Home>

            </Switch>
          </ChakraProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
