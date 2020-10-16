let puzzle_state = [[0, 1, 2],
                    [7, 4, 8],
                    [3, 5, 6]];


function generate_puzzle_cell_html(cell) {
    if (cell == 0) {
        return "<td id='movable'></td>";
    } else {
        return `<td><p>${cell}</p></td>`;
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

window.onload = function () {
    draw_puzzle();
}