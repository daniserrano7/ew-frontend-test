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

  return [];
};
