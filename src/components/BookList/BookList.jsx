import { useSelector, useDispatch } from "react-redux";
import { setToggleFavoriteBook, selectBooks, deleteBook } from "../../redux/slices/booksSlice";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { selectTitleFilter, selectAuthorFilter, selectFavoriteFilter } from "../../redux/slices/filterSlice";
import "./BookList.css";

export default function BookList() {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
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
    dispatch(setToggleFavoriteBook(id));
  };

  const highlightMath = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
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
                  {++i}. {highlightMath(book.title, titleBooks)} by{" "}
                  <strong>{highlightMath(book.author, authorBooks)}</strong>
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
