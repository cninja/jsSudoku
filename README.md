##Sudoku Solver In Javascript
Everyone makes these right?

##Why I did it
Came accross a link to an article titled [How not to solve a Sodoku](http://devgrind.com/2007/04/25/how-to-not-solve-a-sudoku/).
It compares two different programmers in their efforts to product a Sodoku solver. Before I started reading
implementations from either programmer, I decided to implement my own to see how I compared to the two
that are discussed.

##Conclusions
After reading the articles, I see I implemented a solution similar to Norvig, but I did not include a separate constraint propagation step. Instead, I am just searching a 1 element array of guesses in solveStep(). It makes the code clener, but I probably loose some in effecency, however, the tests run quickly enough that I am not as concerned about its speed.


Now off to implement the bits to complete answer problem 96 for my Project Euler account.
