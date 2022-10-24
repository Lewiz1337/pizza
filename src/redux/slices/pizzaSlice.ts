import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FilterSliceState } from './filterSlice';

// type FetchPizzaProps = {
//   sort: {};
//   orderByDesc: boolean;
//   categoryId: number;
//   page: number;
// };

type FetchPizzaItem = {
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export interface PizzaState {
  items: FetchPizzaItem[];
  status: 'loading' | 'success' | 'error';
}

export const fetchPizzas = createAsyncThunk<FetchPizzaItem[], FilterSliceState>(
  'pizza/fetchPizzas',
  async ({ sort, orderByDesc, categoryId, page }) => {
    let _apiBase = 'https://633dbdc4f2b0e623dc7a9137.mockapi.io/api/v1/pizza?';
    let _sort = `&sortBy=${sort.sortProperty}${orderByDesc ? '&order=desc' : '&order=asc'}`;
    let _category = categoryId ? `&category=${categoryId}` : '';
    let _page = `&page=${page}&limit=6`;
    const res = await axios.get(_apiBase + _sort + _category + _page);
    return res.data;
  },
);

const initialState: PizzaState = {
  items: [...Array(6)],
  status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [...Array(6)];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [...Array(6)];
      state.status = 'error';
    });
  },
});
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
