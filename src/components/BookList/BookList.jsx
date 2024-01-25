import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../redux/books/actionCreators";
import "./BookList.css";

export default function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No Books available</p>
      ) : (
        <ul>
          {books.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {book.title} by <strong>{book.author}</strong>
                </div>
                <div className="book-actions">
                  <button onClick={() => handleDeleteBook(book.id)}>x</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
