# Automata

### THIS PROJECT IS CURRENTLY UNDER DEVELOPMENT

#### Note: Cells that `wander` need logic to handle when there are no valid neighboring cells. To keep errors from occurring, please ensure that each wandering cell keeps one of these conditions:

##### - Skip Condition: `validCells === 0` (100% chance)

##### - Stay Condition: `validCells === 0` (100% chance)

##### - Die Condition: `validCells === 0` (100% chance)

[Live][website]

[website]: https://chrabyrd.github.io/Automata

#### Overview

Automata is a cellular automation engine. It's built entirely out of HTML/CSS/Javascript, with no additional libraries assisting in program function or DOM manipulation (such as jQuery or EaselJS). A single external library is used, [JSColor](https://github.com/jo/JSColor), because why hand-code a perfectly functional, non-essential part of the project?

#### Basic Controls

- Keys `1 - 4` change the current cell type

- `Spacebar` pauses the engine

- `n` renders the next frame

- `r` refreshes the grid

#### Current Features

##### Grid

- Dynamically resizes to fit browser window
- Change cell / grid size
- Change render speed

##### Cells

- Can change cell name / color
- Name / color changes dynamically affect all instances of self

##### Cell Logic

- Cell behavior has been abstracted to function from a single hash
- Cell logic can be changed via dropdown menu
- Cell logic is packaged with a "percent chance" slider
- Complex logic can be built with addition of `&&`, `||` and `Delete` buttons
- A cell's valid neighboring cells can be defined

#### Features in Production

- UI (pretty much all of it)
- UX (minor bugs and improvements need to be made, but basic functionality is there)
- Button to access `false` cellType
- Button to add more cell types to current state
- Add feature to import / export JSON "snapshots" of state
- Add Full-stack features, making it possible to create an account and save "snapshots" to a DB
