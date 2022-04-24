import Home from './components/Pages/Home'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react'

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
        <Home />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
