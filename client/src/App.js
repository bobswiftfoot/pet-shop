import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Nav from './components/Nav';
import Cart from './components/Cart'
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import Products from './pages/Products'
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';

let httpLink;

if (process.env.NODE_ENV === 'production')
{
  httpLink = createHttpLink({
    uri: '/graphql',
  });
}
else
{
  httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
  });
}

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
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/products/" component={Products} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/cart" component={Cart} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
