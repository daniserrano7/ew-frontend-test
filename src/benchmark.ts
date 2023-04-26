import { getFilteredMovies } from "./index";

let mean = 0;
for (let i = 0; i < 10; i++) {
  const start = performance.now();
  getFilteredMovies({ genres: ["Crime", "Drama", "Music"] });
  const end = performance.now();
  const time = end - start;
  mean += time;
  console.log(`Execution time: ${time} ms`);
}

console.log(`Mean execution time: ${mean / 10} ms`);
