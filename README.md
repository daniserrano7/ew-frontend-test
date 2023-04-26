## Energy Web - JavaScript/TypeScript Developer recruitment task

## Solution

## Complexity

The time complexity of the algorithm is O(2 _ g) + O(g _ m), so it is basically O(g _ m), being g the number of genres passed as an argument and m the number of movies in the database. The main bottleneck of the algorithm is the iteration over the movies array. On every iteration, the function checks that all movie genres are included on the genres array passed as an argument. This is why the time complexity is O(g _ m) in the worst case scenario. However, not every movie will have all the genres filters, so it could be less than that.

For computing the variables moviesRankedByMatches and rankedMovies we need to iterate over the genres array (g) twice; that is why I mentioned O(2 \* g) at the beginning. However, given that they are not the main bottleneck, they can be safely ignored.

### Considerations

Initially I used forEach and for .. of to iterate over the movies array, which is the performance bottleneck. Even though they are the most readable approach, they are not the most performant, so I ended up using for loops. In case you want to see a more readable approach, please check the previous commit.

To test code's performance I have created a basic benchmark using the `performance.now()` method. I have tested the code with the original 163 movies replicated 1000 times (a dataset of 163000 movies) and the results are the following:

- 1st version: 31.49 ms -> ORIGINAL
- 2nd version: 33.82 ms -> With for..of instead of forEach
- 3rd version: 30.90 ms -> With new Set(genres)
- 4th version: 28.62 ms -> Using for loops

I have transformed the array argument `genres` to a Set, which is theoretically better for indexing. However, the improvement was very small and it may not be significant. It is interesting to note that, besides being forEach theoretically less performant than for..of, the former is actually faster in this case.

## Challenge

Hey there!

Not so long ago we decided create a catalogue of our favorite movies (./src/db.json) as json. It is hard to find things there, so we would like to build an algorithm to make it easier.

## Before start

1. Please remove `.git` folder and initialize your own repository using this repository as a starting point
2. Please install all dependencies using `npm i`

## TODO'S

1. Write an algorithm that would help us find the right movie:

- If we provide genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [Comedy, Crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only. Similarly applies when the requested array of genres is shorter.

- Of course we don't want to have duplicates.

- If we provide an empty list, then we should get a single random movie. (return type should be a array with single movie)

2. The algorithm needs to as efficient as possible, so please also provide its complexity using "Big O" notation with some explanation how you've calculated it.

To make it easier we've also provided a set of tests to make sure your solution works as expected. You can find them in `./src/__tests__`. To run them just use:

```bash
npm t
```

### Rules

- Please not use any outside library like `lodash` etc.
- We require code in git repository
- All tests needs to pass
