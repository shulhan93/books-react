import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id != action.payload);
    },
    setToggleFavoriteBook: (state, action) => {
      return state.map((book) => (book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book));
    },
  },
});

export const { setBook, deleteBook, setToggleFavoriteBook } = booksSlice.actions;

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
