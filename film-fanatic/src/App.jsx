import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './SearchForm';
import MovieDisplay from './MovieDisplay';
import MovieList from './MovieList';
import logofilm from './picture/logo.png';
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
      append_to_response: "videos,release_dates,director",
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
const selectMovie = async(selectedMovie) => {
  setMovie(selectedMovie);
  await fetchMovie(selectedMovie.id);

  // Desplazar la página hacia el elemento con el id "trailer"
  const trailerElement = document.getElementById("trailer");
  if (trailerElement) {
    trailerElement.scrollIntoView({ behavior: "smooth" });
  }

};

// Efecto para cargar películas al inicio
useEffect(() => {
  fetchMovies();
}, []);

  return (
    <div>
      <div className="logo-container">
  <img src={logofilm} alt="Logo" className="logo-image" />
  <div className="film-fanatic-text">Films Fanatic</div>
</div>
    

      <SearchForm searchMovies={searchMovies} setSearchKey={setSearchKey} />

      <MovieDisplay movie={movie} trailer={trailer} playing={playing} setPlaying={setPlaying} />

      <MovieList movies={movies} selectMovie={selectMovie} URL_IMAGE={URL_IMAGE} />
    </div>
  );
}

export default App;
