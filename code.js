let puzzle_state = [[0, 1, 2],
[7, 4, 8],
[3, 5, 6]];

const game_size = 3;

function generate_puzzle_cell_html(cell) {
    if (cell == 0) {
        return "<td id='movable'></td>";
    } else {
        return `<td onclick="square_click_handler(this)"><p>${cell}</p></td>`;
    }
}

function generate_puzzle_row_html(row) {
    let puzzle_row_html = "<tr>";
    for (let i = 0; i < row.length; i++) {
        const cell = row[i];
        puzzle_row_html += generate_puzzle_cell_html(cell);
    }
    puzzle_row_html += "</tr>";
    return puzzle_row_html;
}

function generate_puzzle_html() {
    let puzzle_html = "<table>";
    for (let i = 0; i < puzzle_state.length; i++) {
        const row = puzzle_state[i];
        puzzle_html += generate_puzzle_row_html(row);
    }
    puzzle_html += "</table>";
    return puzzle_html;
}

function draw_puzzle() {
    const puzzle_container = document.getElementById("puzzle_container");
    puzzle_container.innerHTML = generate_puzzle_html();
}

function swap_empty_square(puzzle_state, row, col) {
    let empty_square_row = 0;
    let empty_square_cell = 0;
    for (rowIndex in puzzle_state) {
        const row = puzzle_state[parseInt(rowIndex)];
        for (cellIndex in row) {
            const cell = row[parseInt(cellIndex)];
            if (cell == 0) {
                empty_square_row = parseInt(rowIndex);
                empty_square_cell = parseInt(cellIndex);
            }
        }
    }

    // Check of de cell ernaast ligt
    if ((empty_square_row + 1 == row && empty_square_cell == col) ||
        (empty_square_row - 1 == row && empty_square_cell == col) ||
        (empty_square_row == row && empty_square_cell + 1 == col) ||
        (empty_square_row == row && empty_square_cell - 1 == col)
    ) { 
        const swap_value = puzzle_state[row][col];
        puzzle_state[empty_square_row][empty_square_cell] = swap_value;
        puzzle_state[row][col] = 0;
    }
}

function check_game_complete(puzzle) {
    const solution = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

    if (puzzle.length != game_size) return false;
    for (rowIndex in puzzle) {
        const row = puzzle[rowIndex];
        if (row.length != game_size) return false;
        for (cellIndex in row) {
            const cell = row[cellIndex];
            if (cell != solution[rowIndex][cellIndex]) {
                return false;
            }
        }
    }
    return true;
}

function square_click_handler(cell) {
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    swap_empty_square(puzzle_state, row, col);
    draw_puzzle();
    if (check_game_complete(puzzle_state)) {
        alert("Proficiat!");
    }
}

window.onload = function () {
    draw_puzzle();
}