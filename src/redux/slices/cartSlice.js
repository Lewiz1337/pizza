import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: [],
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
      findItem.count--;
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
      if (findItem.count === 0) {
        findItem.count = 1;
      }
    },
  },
});
export const { addItem, minusItem, removeItems, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
