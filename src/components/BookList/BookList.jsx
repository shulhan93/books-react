import { useSelector, useDispatch } from "react-redux";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { selectTitleFilter, selectAuthorFilter, selectFavoriteFilter } from "../../redux/slices/filterSlice";
import "./BookList.css";

export default function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const titleBooks = useSelector(selectTitleFilter);
  const authorBooks = useSelector(selectAuthorFilter);
  const favoriteBooks = useSelector(selectFavoriteFilter);
  const filterBooks = books.filter((book) => {
    const matchesTitle =
      book.title.toLowerCase().includes(titleBooks.toLowerCase()) &&
      book.author.toLowerCase().includes(authorBooks.toLowerCase());
    const matchesFavorite = favoriteBooks ? book.isFavorite : true;

    return matchesTitle && matchesFavorite;
  });

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filterBooks.length === 0 ? (
        <p>No Books available</p>
      ) : (
        <ul>
          {filterBooks.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {book.title} by <strong>{book.author}</strong>
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavorite(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
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
