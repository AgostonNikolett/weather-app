import React from 'react';

const SearchBar = ({ query, setQuery, onSearch, error }) => {
    return (
        <form onSubmit={onSearch} aria-label="Search city form">
            <input
                type="text"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="City name input field"
            />
            <button type="submit">SUBMIT</button>
        </form>
    );
};

export default SearchBar;