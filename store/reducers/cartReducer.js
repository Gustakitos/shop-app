import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';
import { ADD_ORDER } from '../actions/orderActions';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload];
      const currentQty = state.items[action.payload].quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
        );
        updatedCartItems = {
          ...state.items,
          [action.payload]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.payload];
      }
      let newTotal;
      newTotal =
        state.totalAmount - selectedCartItem.productPrice === 0
          ? 0.0
          : state.totalAmount - selectedCartItem.productPrice;

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: newTotal,
      };
    case ADD_ORDER:
      return initialState;
  }
  return state;
};
