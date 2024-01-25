import { useSelector } from "react-redux";
import "./BookList.css";
export default function BookList() {
  const books = useSelector((state) => state.books);

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No Books available</p>
      ) : (
        <ul>
          {books.map((book, i) => {
            return (
              <li key={i}>
                <div className="book-info">
                  {++i}. {book.title} by <strong>{book.author}</strong>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}