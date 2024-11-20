const LEVEL_1 = [
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", ".", "*"],
    ["*", "S", ".", ".", ".", ".", ".", "*", "*", ".", "*", ".", "T"],
    ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", "*", ".", "*"],
    ["*", "*", "*", "*", "*", ".", "*", "*", "*", ".", "*", ".", "*"],
    ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
    ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", ".", "*"],
    ["*", "*", "*", "*", "*", ".", ".", ".", ".", ".", ".", ".", "*"],
    ["*", "*", "*", "*", "*", ".", "*", "*", "*", "*", "*", "*", "*"],
    ["*", ".", ".", ".", ".", ".", ".", ".", ".", ".", "*", "*", "*"],
    ["*", ".", "*", "*", "*", "*", "*", "*", ".", ".", ".", "*", "*"],
    ["*", ".", ".", ".", ".", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
]

const LEVEL_2 = [
    ["*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "S", "*", "*", "*"],
    ["*", "*", "*", "*", ".", "*", "*", "*"],
    ["*", "*", "*", ".", ".", "*", "*", "*"],
    ["*", "*", "*", ".", "*", "*", "*", "*"],
    ["*", ".", ".", ".", "*", ".", ".", "."],
    ["*", ".", "*", "*", "*", ".", "*", "."],
    ["*", ".", "*", "*", "*", ".", "*", "."],
    ["*", ".", ".", ".", "*", ".", "*", "."],
    ["*", "*", "*", ".", ".", ".", "*", "."],
    ["*", "T", ".", "*", "*", "*", "*", "."],
    ["*", "*", ".", ".", ".", ".", ".", "."]
];

const LEVEL_3 = [
    ["*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "S", "*", "*", "*"],
    ["*", "*", "*", "*", ".", "*", "*", "*"],
    ["*", "*", "*", "*", ".", "*", "*", "*"],
    ["*", ".", ".", ".", ".", ".", "*", "*"],
    ["*", ".", "*", "*", "*", ".", ".", "*"],
    ["*", ".", "*", "*", "*", ".", "*", "*"],
    ["*", ".", ".", ".", "*", ".", ".", "*"],
    ["*", "*", "*", ".", "*", "*", ".", "*"],
    ["*", ".", ".", ".", "*", "*", ".", "*"],
    ["*", "T", ".", "*", "*", "*", "*", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*"]
];


let player = {
    name: "Madeline",
    alive: true,
    x: 0,
    y: 0,
    level: 1,
    moves: 0,
}

function playerMove(level, direction) {
    let playerRow = level[player.y];
    let playerCell = playerRow[player.x];

    let newPlayerX = player.x;
    let newPlayerY = player.y;

    if (direction === "ArrowUp") {
        newPlayerY -= 1;
    } else if (direction === "ArrowDown") {
        newPlayerY += 1;
    } else if (direction === "ArrowLeft") {
        newPlayerX -= 1;
    } else if (direction === "ArrowRight") {
        newPlayerX += 1;
    }

    let newRow = level[newPlayerY];
    let newCell = newRow[newPlayerX];

    // check where the player is moving into
    if (newCell === "." || newCell === "T") {
        player.x = newPlayerX;
        player.y = newPlayerY;
        player.moves += 1;
    }

    // allow player to move through the walls for testing purposes
    // if (newCell === "*" || newCell === "S") {
    //     player.x = newPlayerX;
    //     player.y = newPlayerY;
    //     player.moves += 1;
    // }

    // check if player has reached the treasure
    if (newCell === "T") {
        player.level += 1;
        player.x = 0;
        player.y = 0;
        player.moves = 0;
        alert(`Congratulations ${player.name}! You may now proceed to the next level`);
        const newLevel =
            player.level === 1
                ? LEVEL_1
                : player.level === 2
                    ? LEVEL_2
                    : player.level === 3
                        ? LEVEL_3
                        : LEVEL_1;
        drawLevelOnScreen(newLevel);
    } else {
        drawLevelOnScreen(level);
    }
}

function drawLevelOnScreen(level) {
    const scene = document.getElementById("scene");

    // Clear the scene
    scene.innerHTML = "";

    console.table({
        playerX: player.x,
        playerY: player.y,
        playerLevel: player.level,
        playerMoves: player.moves
    })

    // Loop through the rows
    for (let y = 0; y < level.length; y++) {
        const row = level[y];
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        scene.appendChild(rowElement);

        // Loop through the cells
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            rowElement.appendChild(cellElement);

            if (cell === ".") {
                cellElement.classList.add("path");
            } else if (cell === "*") {
                cellElement.classList.add("wall");
            } else if (cell === "S") {
                cellElement.classList.add("start");

                //draw player if she is not on the board
                if (player.x === 0 && player.y === 0) {
                    player.x = x;
                    player.y = y;
                    player.moves = 1;
                    cellElement.classList.add("player");
                }

            } else if (cell === "T") {
                cellElement.classList.add("treasure");
                cellElement.classList.add("end");
            }
        }
    }

    // if player has moved, update the player position
    if (player.moves > 0) {
        const row = level[player.y];
        const cell = row[player.x];
        const cellElement = document.querySelector(".row:nth-child(" + (player.y + 1) + ") .cell:nth-child(" + (player.x + 1) + ")");
        cellElement.classList.add("player");
    }
}


window.onload = () => {

    (function () {
        const level = player.level === 1 ? LEVEL_1 : player.level === 2 ? LEVEL_2 : LEVEL_3;

        drawLevelOnScreen(level);

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
                const currentLevel = player.level === 1 ? LEVEL_1 : player.level === 2 ? LEVEL_2 : LEVEL_3;
                playerMove(currentLevel, event.key);
            }
        });
    })();

    // TODO: setup mouvement
}
