import { getFilteredMovies } from "./index";
import { Movie } from "./index.types";
const moviesDb = require("./db.json").movies as Movie[];

// This is the function used to generate the mock data for the benchmark
export const mockGetMovies = (): Movie[] =>
  Array.from({ length: 1000 })
    .map(() => moviesDb)
    .flat();

// This is the code used to benchmark the getFilteredMovies function
const n = 10;
let mean = 0;
for (let i = 0; i < n; i++) {
  const start = performance.now();
  getFilteredMovies({ genres: ["Crime", "Drama", "Music"] });
  const end = performance.now();
  const time = end - start;
  mean += time;
  console.log(`Execution time: ${time} ms`);
}

console.log(`Mean execution time: ${mean / n} ms`);
