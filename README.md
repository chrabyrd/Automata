## Conway's Game of ~~Life~~ DEATH!

### Background

Conway's Game of Life is a classic example of the concept of **cellular automata**.  The original GoL is a 0-player game that plays out on a rectangular grid.  Each cell on the grid is either dead or alive when the game begins.  On the next iteration of the game (called a "generation") the cells follow these rules:

1) Any live cell with 2 or 3 live neighbors (defined to be the eight cells surrounding it) stays alive,
2) Any dead cell with exactly 3 neighbors will come to life,
3) Any live cell with less than 2 neighbors or more than 3 neighbors will die.

### The Game

The theory behind Conway's Game of Life has always fascinated me, but I felt like it was a missed oppurtunity that it hasn't been turned into a single-player game. There is only one level now, as proof-of-concept. The grid continuously updates in the background, giving the patterns the appearance of motion. The object of each level is to "clear" grid by activating the proper cells within a given time limit. The player will not be able to manually deactivate any tiles.
