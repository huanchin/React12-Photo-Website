import { useState } from "react";

function Search({ input, setInput, onSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default Search;
