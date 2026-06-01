import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(null);
  const [singleMovie, setSingleMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMoviesList(data))
      .catch(err => console.error("Error loading movies:", err));
  }, []);

  useEffect(() => {
    if (!activeMovieId) {
      setSingleMovie(null);
      return;
    }
    setIsLoading(true);
    fetch(`/api/movies/${activeMovieId}`)
      .then(res => res.json())
      .then(data => {
        setSingleMovie(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading movie details:", err);
        setIsLoading(false);
      });
  }, [activeMovieId]);

  const formatBrowserDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const dateObj = new Date(dateStr.trim());
    if (isNaN(dateObj.getTime())) return dateStr;
    return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredMovies = moviesList.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1>CineView Hub</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Browse and explore movies</p>
      </header>

      {activeMovieId ? (
        <div className="details-view">
          <button className="back-btn" onClick={() => setActiveMovieId(null)}>
            Back to Movie Board
          </button>

          {isLoading || !singleMovie ? (
            <p>Loading movie details...</p>
          ) : (
            <div>
              <h2>{singleMovie.title}</h2>
              {singleMovie.tagline && (
                <p className="movie-tagline">"{singleMovie.tagline}"</p>
              )}
              <hr style={{ borderColor: '#edf2f7', margin: '20px 0' }} />

              <div className="detail-item">
                <span className="detail-label">Rating:</span> {singleMovie.vote_average} / 10
              </div>
              <div className="detail-item">
                <span className="detail-label">Runtime:</span> {singleMovie.runtime ? `${singleMovie.runtime} minutes` : 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Release Date:</span> {formatBrowserDate(singleMovie.release_date)}
              </div>

              {Object.keys(singleMovie).map((key) => {
                if (['title', 'tagline', 'runtime', 'release_date', 'id', 'vote_average'].includes(key)) return null;
                if (typeof singleMovie[key] === 'object') return null;
                return (
                  <div className="detail-item" key={key}>
                    <span className="detail-label">{key.replace(/_/g, ' ').toUpperCase()}:</span> {String(singleMovie[key])}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '24px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />

          {filteredMovies.length === 0 ? (
            <p style={{ color: '#64748b' }}>No movies found for "{searchQuery}"</p>
          ) : (
            <div className="movie-grid">
              {filteredMovies.map((movie) => (
                <div
                  className="movie-card"
                  key={movie.id}
                  onClick={() => setActiveMovieId(movie.id)}
                >
                  <div>
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-tagline">{movie.tagline || 'No tagline available'}</p>
                  </div>
                  <div className="movie-rating">
                    {movie.vote_average ? `${movie.vote_average}/10` : 'No rating'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
