import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './SearchForm';
import MovieDisplay from './MovieDisplay';
import MovieList from './MovieList';

function App() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '2bd456ad98108f462fb8a13051a5b0f2';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

// Función para realizar la petición GET a la API
const fetchMovies = async (searchKey) => {
  const type = searchKey ? "search" : "discover";
  const {
    data: { results },
  } = await axios.get(`${API_URL}/${type}/movie`, {
    params: {
      api_key: API_KEY,
      query: searchKey,
    },
  });

  setMovies(results);
  setMovie(results[0]);

  if (results.length) {
    await fetchMovie(results[0].id);
  }
};

// Función para la petición de un solo objeto y mostrar en el reproductor de video
const fetchMovie = async (id) => {
  const { data } = await axios.get(`${API_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  });

  if (data.videos && data.videos.results) {
    const trailer = data.videos.results.find((vid) => vid.name === "Official Trailer");
    setTrailer(trailer ? trailer : data.videos.results[0]);
  }
  setMovie(data);
};

// Función para buscar películas
const searchMovies = (e) => {
  e.preventDefault();
  fetchMovies(searchKey);
};

// Función para seleccionar una película de la lista y actualizar el trailer
const selectMovie = (selectedMovie) => {
  setMovie(selectedMovie);
  fetchMovie(selectedMovie.id);
};

// Efecto para cargar películas al inicio
useEffect(() => {
  fetchMovies();
}, []);

  return (
    <div>
      <h2 className='main-title text-center mt-5 mb-5'>Films Fanatic</h2>

      <SearchForm searchMovies={searchMovies} setSearchKey={setSearchKey} />

      <MovieDisplay movie={movie} trailer={trailer} playing={playing} setPlaying={setPlaying} />

      <MovieList movies={movies} selectMovie={selectMovie} URL_IMAGE={URL_IMAGE} />
    </div>
  );
}

export default App;
