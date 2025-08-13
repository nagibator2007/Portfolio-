import React, { useState } from 'react';
import "./style.css"

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <input
      type="search"
      placeholder="Search restaurants..."
      value={query}
      onChange={handleChange}
      className='search-input'
    />
  );
};

export default Search;