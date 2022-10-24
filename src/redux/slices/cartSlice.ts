import { createSlice } from '@reduxjs/toolkit';
import { getCartItemsFromLS } from '../functions/getCartItemsFromLS';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: string;
  imageUrl: string;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const res = getCartItemsFromLS();

export const initialState: CartSliceState = {
  items: res.items,
  totalPrice: res.totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
    },
    removeItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
        if (findItem.count === 0) {
          findItem.count = 1;
        }
      }
    },
  },
});

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItems, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
