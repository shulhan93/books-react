import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  isFavorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // return { ...state, title: action.payload };
      state.title = action.payload;
    },
    setAuthorFilter: (state, action) => {
      // return { ...state, title: action.payload };
      state.author = action.payload;
    },
    setFavoriteFilter: (state) => {
      // return { ...state, title: action.payload };
      state.isFavorite = !state.isFavorite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { setTitleFilter, setAuthorFilter, setFavoriteFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectFavoriteFilter = (state) => state.filter.isFavorite;

export default filterSlice.reducer;
