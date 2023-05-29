const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

const points = [
    {x: 0, y: 2},
    {x: 0.5, y: 5},
    {x: 1, y: 6},
    {x: 2, y: 4},
    {x: 3, y: 3},
    {x: 4, y: 4.5},
    {x: 5, y: 9},
    {x: 6, y: 1}
];

const maxX = Math.max(...points.map(point => point.x));
const maxY = Math.max(...points.map(point => point.y));

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(30, 20);
    ctx.lineTo(30, 270);
    ctx.lineTo(350, 270);
    ctx.stroke();
}

function drawArrowheads() {
  ctx.beginPath();

  // Arrowhead for y-axis
  ctx.moveTo(30, 20);
  ctx.lineTo(25, 30);
  ctx.moveTo(30, 20);
  ctx.lineTo(35, 30);

  // Arrowhead for x-axis
  ctx.moveTo(350, 270);
  ctx.lineTo(340, 265);
  ctx.moveTo(350, 270);
  ctx.lineTo(340, 275);

  ctx.stroke();
}

function drawTicks() {
  const tickSize = 5;
    for (let i = 0; i <= maxX; i++) {
        ctx.fillText(i, 28 + (i * 50), 280);
        // Draw small vertical tick marks for x-axis
         ctx.beginPath();
         ctx.moveTo(30 + (i * 50), 270);
         ctx.lineTo(30 + (i * 50), 270 - tickSize);
         ctx.stroke();
    }
    for (let i = 1; i <= maxY; i++) {
        ctx.fillText(i, 20, 273 - (i * 25));
        ctx.beginPath();
         ctx.moveTo(30, 270 - (i * 25));
         ctx.lineTo(30 + tickSize, 270 - (i * 25));
         ctx.stroke();
    }
}

function drawCross(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x - size / 2, y - size / 2);
  ctx.lineTo(x + size / 2, y + size / 2);
  ctx.moveTo(x - size / 2, y + size / 2);
  ctx.lineTo(x + size / 2, y - size / 2);
  ctx.stroke();
}

function drawPoints() {
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        let x = 30 + (points[i].x * 50);
        let y = 270 - (points[i].y * 25);
        //ctx.arc(x, y, 3, 0, Math.PI * 2);
        drawCross(x, y, 6);
        ctx.fillStyle = 'black';
        ctx.fill();

        if (i < points.length - 1) {
            let nextX = 30 + (points[i + 1].x * 50);
            let nextY = 270 - (points[i + 1].y * 25);
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
        }
    }
}

drawAxes();
drawArrowheads();
drawTicks();
drawPoints();
