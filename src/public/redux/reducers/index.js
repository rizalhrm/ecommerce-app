import { combineReducers } from 'redux';

import products from './products';
import productDetails from './productDetails';
import carts from './carts';
import checkCart from './checkCart';
import auth from './auth';
import profile from './profile';

const appReducer = combineReducers({
  products,
  productDetails,
  carts,
  checkCart,
  auth,
  profile
});

export default appReducer;