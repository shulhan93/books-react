import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBook, thunkFunction } from "../../redux/slices/booksSlice";
import booksData from "../../data/books.json";
import createBookWithId from "../../utils/createBookWithId";
import "./BookForm.css";

export default function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = createBookWithId({ title, author }, "manual");

      dispatch(setBook(book));
      setTitle("");
      setAuthor("");
    }
  };

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook, "random");

    dispatch(setBook(randomBookWithId));
  };

  const handleAddRandomBookByApi = () => {
    dispatch(thunkFunction);
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick={handleAddRandomBookByApi}>
          {" "}
          Add Random by api
        </button>
      </form>
    </div>
  );
}
