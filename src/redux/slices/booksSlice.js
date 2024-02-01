import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";

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

export const thunkFunction = async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data.title && res?.data.author) {
      dispatch(setBook(createBookWithId(res.data, "API")));
    }
  } catch (error) {
    console.log(error);
  }
};

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
