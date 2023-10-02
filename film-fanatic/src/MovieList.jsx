// MovieList.jsx
import React from 'react';

function MovieList({ movies, selectMovie, URL_IMAGE }) {
  return (
    <div className='container mt-3 movie-list-container'>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4 movie-card  " onClick={() => selectMovie(movie)}>
            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={400} width="100%" />
            <h4 className='text-center text-custom-color'>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
