import {SET_PRODUCTS} from '../constants/actions/products';

export const setProducts = products => ({
  type: SET_PRODUCTS,
  payload: products,
});
