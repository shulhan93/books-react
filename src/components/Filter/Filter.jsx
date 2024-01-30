import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setTitleFilter,
  selectTitleFilter,
  setAuthorFilter,
  selectAuthorFilter,
  resetFilters,
  setFavoriteFilter,
  selectFavoriteFilter,
} from "../../redux/slices/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const isFavoriteFilter = useSelector(selectFavoriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleFavoriteFilterChange = () => {
    dispatch(setFavoriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input type="text" value={titleFilter} placeholder="Filter by title..." onChange={handleTitleFilterChange} />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input type="checkbox" checked={isFavoriteFilter} onChange={handleFavoriteFilterChange} />
            Only favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}
