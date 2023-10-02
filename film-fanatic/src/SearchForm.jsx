// SearchForm.jsx
import React from 'react';

function SearchForm({ searchMovies, setSearchKey }) {
  return (
    <form className='container mb-4' onSubmit={searchMovies}>
      <input type='text' placeholder='search' onChange={(e) => setSearchKey(e.target.value)} />
      <button className='btn btn-primary'>Search</button>
    </form>
  );
}

export default SearchForm;
