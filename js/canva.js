const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");
let puntos = [];
let modo = "puntos"; // por defecto
let dibujando = false;
let puntosLapiz = [];

// Cambiar el modo de dibujo
document.getElementById("modoDibujo").addEventListener("change", (e) => {
  modo = e.target.value;
  reiniciar(); // limpiar al cambiar de modo
});

canvas.addEventListener("mousedown", (e) => {
  if (modo === "lapiz") {
    dibujando = true;
    puntosLapiz = [];
    const pos = obtenerPosicion(e);
    puntosLapiz.push(pos);
    dibujarPunto(pos.x, pos.y);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (modo === "lapiz" && dibujando) {
    const pos = obtenerPosicion(e);
    puntosLapiz.push(pos);
    dibujarLinea(puntosLapiz[puntosLapiz.length - 2], pos);
  }
});

canvas.addEventListener("mouseup", () => {
  if (modo === "lapiz") {
    dibujando = false;
    if (puntosLapiz.length > 2) {
      cerrarFigura(puntosLapiz);
      calcularPerimetro(puntosLapiz);
      calcularArea(puntosLapiz);
    }
  }
});

canvas.addEventListener("click", (e) => {
  if (modo !== "puntos" && modo !== "cuadrado") return;

  const pos = obtenerPosicion(e);
  puntos.push(pos);
  dibujarPunto(pos.x, pos.y);

  const len = puntos.length;

  if (modo === "puntos" && len > 1) {
    dibujarLinea(puntos[len - 2], puntos[len - 1]);
  }

  if (modo === "puntos" && len > 2) {
    cerrarFigura(puntos);
    calcularPerimetro(puntos);
    calcularArea(puntos);
  }

  if (modo === "cuadrado" && len === 4) {
    const puntosCuadrado = corregirCuadrado(puntos);
    reiniciarCanvas(); // limpiamos canvas y dibujamos limpio
    puntosCuadrado.forEach(p => dibujarPunto(p.x, p.y));
    for (let i = 0; i < 4; i++) {
      dibujarLinea(puntosCuadrado[i], puntosCuadrado[(i + 1) % 4]);
    }
    cerrarFigura(puntosCuadrado);
    calcularPerimetro(puntosCuadrado);
    calcularArea(puntosCuadrado);
    puntos = puntosCuadrado;
  }

  document.getElementById("puntos").textContent = puntos.length;
});

// Obtener coordenadas del clic relativo al canvas
function obtenerPosicion(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function dibujarPunto(x, y) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, 2 * Math.PI);
  ctx.fill();
}

function dibujarLinea(p1, p2) {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function cerrarFigura(puntos) {
  ctx.beginPath();
  ctx.moveTo(puntos[puntos.length - 1].x, puntos[puntos.length - 1].y);
  ctx.lineTo(puntos[0].x, puntos[0].y);
  ctx.stroke();
}

function calcularPerimetro(puntosFigura) {
  let p = 0;
  for (let i = 0; i < puntosFigura.length; i++) {
    const p1 = puntosFigura[i];
    const p2 = puntosFigura[(i + 1) % puntosFigura.length];
    p += Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }
  document.getElementById("perimetro").textContent = p.toFixed(2);
}

function calcularArea(puntosFigura) {
  let area = 0;
  const n = puntosFigura.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += (puntosFigura[i].x * puntosFigura[j].y) - (puntosFigura[j].x * puntosFigura[i].y);
  }
  area = Math.abs(area / 2);
  document.getElementById("area").textContent = area.toFixed(2);
}

function reiniciar() {
  puntos = [];
  puntosLapiz = [];
  reiniciarCanvas();
  document.getElementById("puntos").textContent = 0;
  document.getElementById("area").textContent = 0;
  document.getElementById("perimetro").textContent = 0;
}

function reiniciarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 🔧 Corregir puntos para que formen un cuadrado perfecto
function corregirCuadrado(p) {
  const centro = {
    x: (p[0].x + p[1].x + p[2].x + p[3].x) / 4,
    y: (p[0].y + p[1].y + p[2].y + p[3].y) / 4,
  };

  const ladoPromedio = (
    Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) +
    Math.hypot(p[1].x - p[2].x, p[1].y - p[2].y) +
    Math.hypot(p[2].x - p[3].x, p[2].y - p[3].y) +
    Math.hypot(p[3].x - p[0].x, p[3].y - p[0].y)
  ) / 4;

  const half = ladoPromedio / 2;

  return [
    { x: centro.x - half, y: centro.y - half },
    { x: centro.x + half, y: centro.y - half },
    { x: centro.x + half, y: centro.y + half },
    { x: centro.x - half, y: centro.y + half },
  ];
}
function snapToAngle(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);
  const snapAngles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI];
  let closest = snapAngles[0];
  let minDiff = Math.abs(angle - closest);

  for (let i = 1; i < snapAngles.length; i++) {
    const diff = Math.abs(angle - snapAngles[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = snapAngles[i];
    }
  }

  const length = Math.hypot(dx, dy);
  const snappedX = x1 + length * Math.cos(closest);
  const snappedY = y1 + length * Math.sin(closest);

  return { x: snappedX, y: snappedY };
}
