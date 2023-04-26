import { Genre, Movie } from "./index.types";
const moviesDb = require("./db.json").movies as Movie[];

// Simulates a database call
const getMovies = (): Movie[] => moviesDb;

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const movies = getMovies();
  const genresSet = new Set(genres);
  const genresIsEmpety = genresSet.size === 0;

  if (genresIsEmpety) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return [randomMovie];
  }

  // Array of arrays of movies, where each array is a level of genre matches
  // e.g. filtering with 3 genres: [ [movies with 3 matches], [movies with 2 matches], [movies with 1 match] ]
  const moviesRankedByMatches = new Array(genres.length);
  for (let i = 0; i < genres.length; i++) {
    moviesRankedByMatches[i] = [];
  }

  for (const movie of movies) {
    if (movie.genres.length === 0) continue;

    // Check if all movie genres are included in the genres filter
    const allMovieGenresMatches = movie.genres.every((genre: string) =>
      genresSet.has(genre as Genre)
    );

    // If all genres matches, we include the movie in the array of movies with the same number of matches
    if (allMovieGenresMatches) {
      const matches = movie.genres.length - 1;
      moviesRankedByMatches[matches].push(movie);
    }
  }

  // Given that we want to prioritize movies with more matches, we reverse the array and flatten it
  // to get a single array of movies from the most matched to the least matched
  const rankedMovies = [];
  for (let i = moviesRankedByMatches.length - 1; i >= 0; i--) {
    rankedMovies.push(...moviesRankedByMatches[i]);
  }
  return rankedMovies;
};
