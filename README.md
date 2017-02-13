# Conway's Game of ~~Life~~ DEATH!

[Live][website]

[website]: https://chrabyrd.github.io/game_of_death

## Minimum Viable Product

- [x] The ability to start, pause, and progress game levels.
- [x] Select squares to be alive at any point during play
- [x] See the number of clicks left to complete the level
- [x] An About modal describing the rules of the game

## Background

Conway's Game of Life is a classic example of the concept of **cellular automata**.  The original GoL is a 0-player game that plays out on a rectangular grid.  Each cell on the grid is either dead or alive when the game begins.  On the next iteration of the game (called a "generation") the cells follow these rules:

1) Any live cell with 2 or 3 live neighbors (defined to be the eight cells surrounding it) stays alive,
2) Any dead cell with exactly 3 neighbors will come to life,
3) Any live cell with less than 2 neighbors or more than 3 neighbors will die.

## The Game

The concept behind Conway's Game of Life is interesting, but ultimately falls short of its potential as a 0-player game. By using the concept behind Conway's Game of Life to power its logic engine, Conway's Game of Death successfully turns the traditional 0-player game into a 1-player puzzle game.

The logic in the original GoL (and subsequently GoD) allows for certain structures to remain intact through each state change. These structures can range from simple to complex, and from static to dynamic. They are the basis for each level in Conway's Game of Death.

The player's objective is to "clear" each level by activating the proper cells within a given number of clicks. The player is not able to manually deactivate any tiles, and there is no time limit. With each pattern the player completes, a more complex pattern replaces it.

<p align="center">
  <img src="docs/images/play_screen.png" alt="play-screen">
</p>

## Features and Implementation

The logic of the game is split into four different classes.

### Cell

[Cell.js][cell]

Each `cell` is constructed with a list of its neighbors, as well as an `alive` state. It's also constructed with a min/max `x` and `y` value, as that was the only way to divide the HTML5 canvas into a clickable grid.

### Board

[Board.js][board]

The `board` acts as a container to the cell class. It keeps track of the cells, and holds the functionality of changing each cell's `alive` state on click.

### Automata

[Automata.js][automata]

The `automata` is the engine driving the game. It has a single function `cellLogic`, which is used to decide which cell should be "alive" or "dead." While the theory is relatively straightforward, manipulating the cells in real-time created an asymmetric board logic. This was solved by gathering the data points for each element meant to change, an changing them near-concurrently after they had been collected.


```javascript

  const changingCells = [];

  for (let i = 0; i < this.board.cells.length; i++) {
    // Cell logic resulting in pushing cell objects into changingCells
  }

  for (let i = 0; i < changingCells.length; i++) {
    this.board.cells[changingCells[i]].changeState();
  }

```

## Game

[Game.js][game]

The `game` class contains the logic that turns Conway's Game of Life engine into a working single-player game. Every 250 milliseconds it makes a check against the board's win condition, completes a single state change of its grid, and re-renders the board.

[cell]: ./scripts/cell.js
[board]: ./scripts/board.js
[automata]: ./scripts/automata.js
[game]: ./scripts/game.js

## Future

There are several features that will be added to this project in the future.

- More levels, containing patterns of increasing difficulty.

- The ability to keep a cumulative score persisted between levels.

- More CSS updates.
