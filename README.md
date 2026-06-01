# CineView Hub 🎬

A full-stack movie browsing web application built as part of the Pi-xcels Take Home Assignment.

## About the Project

CineView Hub allows users to browse a collection of movies, search by title, view key details at a glance, and explore individual movie profiles. Built with a Node.js/Express backend and a React frontend.

## Features

- Movie Listing Page - Displays all movies in a responsive 4-column grid (1 column on mobile)
- Search Functionality - Filter movies by title in real time
- Movie Detail Page - Shows full movie information including runtime, localized release date, overview and status
- Responsive Design - Works on both desktop and mobile devices
- REST API - Clean backend API built from scratch using Express.js

## Tech Stack

Frontend: React.js, CSS3  
Backend: Node.js, Express.js  
Data Source: movies_metadata.json (provided dataset)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/movies | GET | Returns all movies with title, tagline and rating |
| /api/movies/:id | GET | Returns full details of a specific movie by ID |

## How to Run Locally

1. Clone the repository
2. Run npm install
3. Run npm start
4. Open http://localhost:3000 in your browser

## Requirements Fulfillment Checklist

- [x] Backend loads data from server/movies_metadata.json
- [x] API endpoint to list all movies
- [x] API endpoint to get single movie by ID
- [x] Movie listing page with title, tagline and vote_average
- [x] Responsive design - 4 columns on desktop, 1 column on mobile
- [x] Single movie detail page with all fields displayed
- [x] Localized release date based on browser settings
- [x] Runtime displayed in minutes
- [x] Back button to return to movie listing page
- [x] Search functionality added as additional enhancement

## Future Features

### 1. User Authentication
Allow users to create accounts and log in to personalize their experience.

### 2. User Movie Ratings and Reviews
Let users rate movies and submit their own written reviews.

### 3. Advanced Filtering
Filter movies by genre, release year, language and rating range.

### 4. Watchlist Feature
Users can save movies to a personal watchlist for later viewing.

### 5. Live Search Suggestions
Show autocomplete suggestions while typing in the search bar.

### 6. Pagination
Load movies in pages instead of all at once for better performance.

### 7. Dark Mode
Toggle between light and dark themes for better user experience.

### 8. Movie Poster Images
Display movie poster images fetched from an external movie API.

## Developer

Rakshita A V  
24BCM542









