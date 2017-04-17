# Automata
[Live][website]

[website]: https://chrabyrd.github.io/Automata

## Overview
Automata is a cellular automation engine built entirely out of HTML5, CSS3, and Javascript ES6. No additional libraries (such as jQuery or EaselJS) have been used to assist in program function or DOM manipulation. However the application uses Node.js, Webpack, and Babel to compile the ES6 into browser-parsible code.

This project is still under development. If you have any questions or concerns, please email me at: chrabyrd@gmail.com

## Key Bindings
*Note: All key bindings are disabled when changing cell names*

`1 - 4` (Change Type) Change the current cell type.

`Spacebar` (Pause) Stop or start the automation engine.

`Esc` (Toggle UI) Opens or closes all modals and taskbars.

`N` (Next Frame) Execute one logic cycle.

`R` (Reset) Discard the current grid and render a blank one.

`I` (Information) Open the information modal.

`O` (Options) Open the options modal for the current cell type.

## Cellular Logic

### Warning
```
By default, cells are skipped automatically (Skip Condition: 100% chance).

To change this, DO NOT change the chance slider; it can potentially break the automation engine.

Instead change the statement to: Skip Condition: `validCells === 0` (100% chance). Then change the cell's other behavior as you normally would.
```

### Behavior Hierarchy
`Skip` -> `Die` -> `Stay` -> `Reproduce` -> `Wander`

Cells evaluate their conditional statements, and perform actions based on the outcome. There is a hiearchy of cell behavior, outlined above. A cell will evaluate each of its behaviors' conditional statements in turn. If the statement returns `true`, the cell will peform the behavior and exit the loop. If it returns `false`, the cell will move to the next behavior in line. If no behavior conditions return `true`, the cell will behave the same as `Skip Condition: 100% chance`.

### Valid Cells
At the bottom of each cell's behavior modal is a list of cell types. If a type is enabled it is considered "valid" for the purposes of:

- `Valid Cells` behavior dropdown
- `Wander` -ing (A cell will only move onto cells it considers valid)
- `Reproduce` -ing (A cell will only reproduce into cells it considers valid)

## Current Features

### Grid
- Dynamically resizes to fit the browser window
- Has valid height and width values based on cell size
- Height and width can be manually changed through user interaction
- Grid can be reset

### Cells

#### Appearance
- Name and color values are initialized from the information hash
- Name, color and cell size can be changed manually through user interaction
- On receiving a new value, all instances of name and color are dynamically changed

#### Behavior
- Can `Wander`, `Stay` `Reproduce`, and `Die`
- Cell behavior is extracted, evaluated and initialized from the information hash
- A persistant chance slider is integrated into cell behavior
- Valid cell types are integrated into cell behavior
- Complex logic can be built with `&&`, `||` and `Delete` buttons
- Cell behavior can be manually changed through user interaction

### Automation Engine
- The current generation can be paused, unpaused, and rendered frame-by-frame
- Ensures random cell selection
- Correctly parses logic statements
- Render speed can be manually changed through user interaction

## Features in Production
- Minor bug involving the chance slider and conditional operator `or` (current issue)
- Change `Valid Cells` dropdown option to `Valid Cells (with false)` and `Valid Cells (sans false)`
- Add `Change` cell behavior
- Redesign `Valid Cells` buttons
- Add ability for cells to track state
- Add ability for cells to perform more than one action per turn
- Add button to increase the number of cell types
- Abstract grid size, cell size, and speed to information hash
- Add feature to import / export JSON "snapshots" of state
- Add full-stack features, making it possible to create an account and save JSON "snapshots" to a Database
