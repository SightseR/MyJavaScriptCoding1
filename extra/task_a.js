const container = document.getElementById('container');
const grid = document.getElementById('grid');
const message = document.getElementById('message');
window.focus();

const gridSize = 20;
let creature = { x: 0, y: 0, direction: 'right' };
let target = { x: gridSize - 1, y: gridSize - 1 };
let obstacles = [];


function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
}

function updateGrid() {
    grid.childNodes.forEach((cell, index) => {
        const x = index % gridSize;
        const y = Math.floor(index / gridSize);

        cell.classList.remove('creature', 'target', 'obstacle');

        if (x === creature.x && y === creature.y) {
            cell.classList.add('creature');
        } else if (x === target.x && y === target.y) {
            cell.classList.add('target');
        } else if (isObstacle(x, y)) {
            cell.classList.add('obstacle');
        }
    });
}

function isObstacle(x, y) {
    return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
}


function showMessage(text) {
    message.innerText = text;
    message.style.display = 'block';
}

function hideMessage() {
    message.style.display = 'none';
}

function moveCreature() {
    let newX = creature.x;
    let newY = creature.y;

    switch (creature.direction) {
        case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
        case 'left':
            newX--;
            break;
        case 'right':
            newX++;
            break;
    }

    if (!isValidMove(newX, newY)) {
        if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
            showMessage('Failure! Out of the grid.');
        } else if (newX === target.x && newY === target.y) {
            showMessage('Congratulations!!!');
        } else {
            showMessage('Failure! Hit an obstacle.');
        }
        return;
    }

    hideMessage();
    creature.x = newX;
    creature.y = newY;
    updateGrid();
}


function isValidMove(newX, newY) {
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
        return false;
    }
    if (newX === target.x && newY === target.y) {
        return false;
    }
    // Check if the new position is an obstacle
    for (const obstacle of obstacles) {
        if (newX === obstacle.x && newY === obstacle.y) {
            return false;
        }
    }
    return true;
}


function isObstacle(x, y) {
    return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
}

function changeDirection(e) {
    let newDirection;
    if (e.key === 'ArrowUp') {
        newDirection = 'up';
    } else if (e.key === 'ArrowDown') {
        newDirection = 'down';
    } else if (e.key === 'ArrowLeft') {
        newDirection = 'left';
    } else if (e.key === 'ArrowRight') {
        newDirection = 'right';
    } else {
        return;
    }

    let newX = creature.x;
    let newY = creature.y;

    switch (newDirection) {
        case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
        case 'left':
            newX--;
            break;
        case 'right':
            newX++;
            break;
    }

    if (isValidMove(newX, newY)) {
        creature.direction = newDirection;
    }
}

function fetchObstacles() {
    fetch('http://localhost:3010/obstacles')
        .then(response => response.json())
        .then(data => {
            obstacles = data;
            updateGrid();
        })
        .catch(error => console.error('Error fetching obstacles:', error));
}


container.addEventListener('keydown', changeDirection);

createGrid();
updateGrid();
fetchObstacles();


window.onload = async function () {
    await fetchObstacles(); // Wait for obstacles to be fetched before proceeding
    container.focus();
    setInterval(moveCreature, 300);
};


