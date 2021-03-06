import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import API from './utils';

const container = document.getElementById('root');
const root = createRoot(container);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        },
      }
    }
  }
})

const client = new ApolloClient({
    uri: API,
    cache,
    connectToDevTools: true,
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>

      <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
