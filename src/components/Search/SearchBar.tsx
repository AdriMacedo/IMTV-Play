import "./SearchBar.scss";

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
function SearchBar({ onSearch }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim() !== "") {
      onSearch(query.trim());
      setQuery("");
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`search-container ${isExpanded ? "expanded" : ""}`}
      onFocus={() => setIsExpanded(true)}
    >
      <span className="search-icon" aria-label="search bar">🔍</span>
      <input
        type="text"
        placeholder="Search ..."
        className="search-input"
        aria-label="search movies/series"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsExpanded(true)}
      />
    </div>
  );
}

export default SearchBar;
