import { Button } from "react-bootstrap";
import { useState } from "react";

const Search = ({ searchTrips, clearSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTrips(text);
    setText("");
  };

  const handleInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-1 rounded-3">
          {/* <div className="relative"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Search Station"
            value={text}
            onChange={handleInput}
          />
          <div className="input-grouped-append">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-end"
            >
              Go
            </button>
          </div>
        </div>
      </form>
      <Button onClick={clearSearch} className="clear-btn">
        Clear
      </Button>
    </div>
  );
};
export default Search;
