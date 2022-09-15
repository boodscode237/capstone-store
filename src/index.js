import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './App';
import {UserProvider} from "./contexts/user.context";
import {ProductsProvider} from "./contexts/products.context";
import {CartProvider} from "./contexts/cart.context";

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductsProvider> 
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

