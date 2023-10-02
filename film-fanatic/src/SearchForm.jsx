// SearchForm.jsx
import React from 'react';

function SearchForm({ searchMovies, setSearchKey }) {
  return (
    <form className='custom-search-form' onSubmit={searchMovies}>
      <input type='text' className='custom-input'placeholder='search' onChange={(e) => setSearchKey(e.target.value)} />
      <button className='custom-button'>Search</button>
    </form>
  );
}

export default SearchForm;
