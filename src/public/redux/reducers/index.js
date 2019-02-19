import { combineReducers } from 'redux';

import products from './products';
import productDetails from './productDetails';
import carts from './carts';
import checkCart from './checkCart';

const appReducer = combineReducers({
  products,
  productDetails,
  carts,
  checkCart
});

export default appReducer;