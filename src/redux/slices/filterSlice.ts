import { createSlice } from '@reduxjs/toolkit';

export interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  orderByDesc: boolean;
  search: string;
  page: number;
}

export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  orderByDesc: false,
  search: '',
  page: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategotyId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrder: (state) => {
      state.orderByDesc = !state.orderByDesc;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilter: (state, action) => {
      state.page = Number(action.payload.page);
      state.orderByDesc = Boolean(action.payload.orderByDesc);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});
export const { setCategotyId, setSort, setOrder, setSearch, setPage, setFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
