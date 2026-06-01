import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Application component states for data caching and active viewport toggle views
  const [moviesList, setMoviesList] = useState([]);
  const [activeMovieId, setActiveMovieId] = useState(null);
  const [singleMovie, setSingleMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initial dashboard load: fetch lightweight movies array from backend
  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMoviesList(data))
      .catch(err => console.error("Error loading home dashboard feed:", err));
  }, []);

  // Structural detail sync: fires off whenever active selection pointer target adjustments occur
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
        console.error("Error pulling full metadata payload:", err);
        setIsLoading(false);
      });
  }, [activeMovieId]);

  // Utility method parsing raw system strings into browser localized layout specs natively
  const formatBrowserDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const dateObj = new Date(dateStr.trim());
    if (isNaN(dateObj.getTime())) return dateStr;
    return dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎬 CineView Hub</h1>
      </header>

      {/* VIEW MODALITY 2: EXPLICIT INDIVIDUAL METADATA PROFILE */}
      {activeMovieId ? (
        <div className="details-view">
          <button className="back-btn" onClick={() => setActiveMovieId(null)}>
            ← Back to Movie Board
          </button>
          
          {isLoading || !singleMovie ? (
            <p>Loading cinematic properties profile...</p>
          ) : (
            <div>
              <h2>{singleMovie.title}</h2>
              {singleMovie.tagline && <p className="movie-tagline">"{singleMovie.tagline}"</p>}
              <hr style={{ borderColor: '#edf2f7', margin: '20px 0' }} />
              
              {/* Rendering specific mandatory requested evaluation fields */}
              <div className="detail-item">
                <span className="detail-label">Rating Profile:</span> {singleMovie.vote_average} / 10
              </div>
              <div className="detail-item">
                <span className="detail-label">Runtime Duration:</span> {singleMovie.runtime ? `${singleMovie.runtime} minutes` : 'N/A'}
              </div>
              <div className="detail-item">
                <span className="detail-label">Release Matrix (Localized):</span> {formatBrowserDate(singleMovie.release_date)}
              </div>
              
              {/* Fallback structural layout iteration reading out any leftover properties dynamically */}
              {Object.keys(singleMovie).map((key) => {
                // Skips baseline custom structural objects/primitives explicitly matched above
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
        /* VIEW MODALITY 1: HIGH RECONCILED INTERACTIVE TILED RESPONSIVE GRID LIST */
        <div>
          <div className="movie-grid">
            {moviesList.map((movie) => (
              <div 
                className="movie-card" 
                key={movie.id} 
                onClick={() => setActiveMovieId(movie.id)}
              >
                <div>
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-tagline">{movie.tagline || 'Metadata tagline empty'}</p>
                </div>
                <div className="movie-rating">
                  ⭐ {movie.vote_average ? `${movie.vote_average}/10` : 'No reviews'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;