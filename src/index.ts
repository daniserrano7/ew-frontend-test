import { Genre, Movie } from "./index.types";
const moviesDb = require("./db.json").movies as Movie[];

// Simulates a database call
const getMovies = (): Movie[] => moviesDb;

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const movies = getMovies();
  const genresIsEmpety = genres.length === 0;

  if (genresIsEmpety) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return [randomMovie];
  }

  // Array of arrays of movies, where each array is a level of genre matches
  // e.g. filtering with 3 genres: [ [movies with 3 matches], [movies with 2 matches], [movies with 1 match] ]
  const moviesRankedByMatches = Array.from({ length: genres.length }).map(
    () => []
  ) as Movie[][];

  movies.forEach((movie: Movie) => {
    if (movie.genres.length === 0) return;

    // Check if all movie genres are included in the genres filter
    const allMovieGenresMatches = movie.genres.every((genre: string) =>
      genres.includes(genre as Genre)
    );

    // If all genres matches, we include the movie in the array of movies with the same number of matches
    if (allMovieGenresMatches) {
      const level = movie.genres.length - 1;
      moviesRankedByMatches[level].push(movie);
    }
  });

  // Given that we want to prioritize movies with more matches, we reverse the array and flatten it
  // to get a single array of movies from the most matched to the least matched
  const rankedMovies = moviesRankedByMatches.slice().reverse().flat();
  return rankedMovies;
};
