# Project Name : Easy bingo

A webapp written in NuxtJS designed to help users create and download a custom bingo card.

## Tech specs

- NuxtJS 3
- Pinia as local storage
- TailwindCss (dont use postcss or autoprefixer)
- Dockerfile + docker compose (no database)
- Helm chart
- Make a  separate component for the grid, and the individual cells

## Features

- Main page
  - Styled header that help uers understand the purpose of the website
  - A button to lead the users to the bingo card editor
  - A List of saved bingo cards
    - add a button on each saved bing card that leads to the solve page
- Bingo card editor page
  - A selector of the bingo card grid, square grid starting at 3x3, ending at 13x13
  - In each grid cell, the user can input the text they want, it occupies the whole size iof the cell
  - Add a border to the currently selected cell
  - add a light background to the center cell
  - add a button to shuffle the cells, but not the center cell
  - add a button to preview the generated grid, it makes a png capture of the current grid, it open thee picture in a new browser tab
  - add a button to save the current grid, and ask the user to name it to the browser (its a list of bingo cards), so the user can edit them later.
- Solve page
  - Only visible when the user clicks on the solve button on the main page list.
  - Add / remove a red cross on the whole selected cell size
  - When the bingo card is solved (a whole line, column, diagnonal is marked with a cross), highlight the corresponding  line, column, diagonal, with a light green background
  - Add a button to download the grid in png format
