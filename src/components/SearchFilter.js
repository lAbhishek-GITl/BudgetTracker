import React from 'react';

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
    return (
        <input type="text" className="form-control mb-3" placeholder="Search Expenses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    );
};

export default SearchFilter;
