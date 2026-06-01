const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Points to our local json data file
const MOVIES_FILE_PATH = path.join(__dirname, 'movies_metadata.json');

// Helper function to read data safely and handle exceptions
const getMoviesData = () => {
  try {
    const rawData = fs.readFileSync(MOVIES_FILE_PATH, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Failed to read movie data file:", error);
    return [];
  }
};

// GET: Fetch all movies (returns only essential dashboard fields)
app.get('/api/movies', (req, res) => {
  const movies = getMoviesData();
  
  // Mapping the fields specified in the requirements to keep response lightweight
  const filteredList = movies.map(movie => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));
  
  res.json(filteredList);
});

// GET: Fetch specific movie details by ID
app.get('/api/movies/:id', (req, res) => {
  const movies = getMoviesData();
  const targetId = parseInt(req.params.id, 10);
  
  const selectedMovie = movies.find(m => m.id === targetId);

  // Fallback check if ID isn't in the JSON
  if (!selectedMovie) {
    return res.status(404).json({ message: 'Requested movie could not be found' });
  }
  
  res.json(selectedMovie);
});

// Listen on port 3001 to work seamlessly with the CRA proxy config
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});