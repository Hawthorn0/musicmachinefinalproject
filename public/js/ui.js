const canvas = document.querySelector('#machine-canvas');
const ctx = canvas.getContext('2d');
const hint = document.querySelector('.canvas-hint');
const toolButtons = document.querySelectorAll('[data-tool]');
const objects = [];
let activeTool = null;

const colors = {
  circle: '#78c9ff',
  rectangle: '#ffce73',
  triangle: '#c4a4ff',
  spawner: '#68d7ae',
  killbox: '#ff8b95'
};

function drawObject({ type, x, y }) {
  ctx.fillStyle = colors[type];
  ctx.strokeStyle = colors[type];
  ctx.lineWidth = 3;

  if (type === 'circle') {
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'rectangle') {
    ctx.fillRect(x - 32, y - 18, 64, 36);
  } else if (type === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(x, y - 26);
    ctx.lineTo(x + 28, y + 22);
    ctx.lineTo(x - 28, y + 22);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'spawner') {
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'killbox') {
    ctx.strokeRect(x - 25, y - 25, 50, 50);
    ctx.beginPath();
    ctx.moveTo(x - 14, y - 14);
    ctx.lineTo(x + 14, y + 14);
    ctx.moveTo(x + 14, y - 14);
    ctx.lineTo(x - 14, y + 14);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach(drawObject);
}

function resizeCanvas() {
  const bounds = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(bounds.width * scale);
  canvas.height = Math.round(bounds.height * scale);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  draw();
}

toolButtons.forEach(button => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    activeTool = button.dataset.tool;
    toolButtons.forEach(other => {
      other.setAttribute('aria-pressed', String(other === button));
    });
  });
});

canvas.addEventListener('click', event => {
  if (!activeTool) return;

  const bounds = canvas.getBoundingClientRect();
  objects.push({
    type: activeTool,
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  });

  hint.hidden = true;
  draw();
});

new ResizeObserver(resizeCanvas).observe(canvas);