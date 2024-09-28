import {SET_PRODUCTS} from '../constants/actions/products';

const initialState = {
  data: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default productsReducer;
