// Función para mostrar resultados
function calcularResultado(formula, resultado, proceso, elementoId) {
    const elemento = document.getElementById(elementoId);
    elemento.innerHTML = `
        <p><strong>Fórmula:</strong> ${formula}</p>
        <p><strong>Resultado:</strong> ${resultado}</p>
        <p><strong>Proceso:</strong> ${proceso}</p>
    `;
    elemento.style.display = 'block';
}

// Función para validar inputs
function validarInput(valor) {
    if (isNaN(valor) || valor <= 0) {
        alert('Por favor ingrese un valor válido (mayor que cero)');
        return false;
    }
    return true;
}

// Funciones para el cuadrado
function calcularAreaCuadrado() {
    const lado = parseFloat(document.getElementById('lado-area').value);
    if (validarInput(lado)) {
        const area = lado * lado;
        calcularResultado('A = L²', 
                         area.toFixed(2) + ' unidades²', 
                         `${lado} × ${lado} = ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularPerimetroCuadrado() {
    const lado = parseFloat(document.getElementById('lado-perimetro').value);
    if (validarInput(lado)) {
        const perimetro = 4 * lado;
        calcularResultado('P = 4L', 
                         perimetro.toFixed(2) + ' unidades', 
                         `4 × ${lado} = ${perimetro.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Funciones para el triángulo
function calcularAreaTriangulo() {
    const base = parseFloat(document.getElementById('base-area').value);
    const altura = parseFloat(document.getElementById('altura-area').value);
    if (validarInput(base) && validarInput(altura)) {
        const area = (base * altura) / 2;
        calcularResultado('A = (b × h)/2', 
                         area.toFixed(2) + ' unidades²', 
                         `(${base} × ${altura}) / 2 = ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularPerimetroTriangulo() {
    const lado1 = parseFloat(document.getElementById('lado1').value);
    const lado2 = parseFloat(document.getElementById('lado2').value);
    const lado3 = parseFloat(document.getElementById('lado3').value);
    if (validarInput(lado1) && validarInput(lado2) && validarInput(lado3)) {
        const perimetro = lado1 + lado2 + lado3;
        calcularResultado('P = L₁ + L₂ + L₃', 
                         perimetro.toFixed(2) + ' unidades', 
                         `${lado1} + ${lado2} + ${lado3} = ${perimetro.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Funciones para el círculo
function calcularAreaCirculo() {
    const radio = parseFloat(document.getElementById('radio-area').value);
    if (validarInput(radio)) {
        const area = Math.PI * Math.pow(radio, 2);
        calcularResultado('A = πr²', 
                         area.toFixed(2) + ' unidades²', 
                         `π × ${radio}² ≈ ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularCircunferencia() {
    const radio = parseFloat(document.getElementById('radio-perimetro').value);
    if (validarInput(radio)) {
        const circunferencia = 2 * Math.PI * radio;
        calcularResultado('C = 2πr', 
                         circunferencia.toFixed(2) + ' unidades', 
                         `2 × π × ${radio} ≈ ${circunferencia.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Funciones para el rectángulo
function calcularAreaRectangulo() {
    const largo = parseFloat(document.getElementById('largo-area').value);
    const ancho = parseFloat(document.getElementById('ancho-area').value);
    if (validarInput(largo) && validarInput(ancho)) {
        const area = largo * ancho;
        calcularResultado('A = L × A', 
                         area.toFixed(2) + ' unidades²', 
                         `${largo} × ${ancho} = ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularPerimetroRectangulo() {
    const largo = parseFloat(document.getElementById('largo-perimetro').value);
    const ancho = parseFloat(document.getElementById('ancho-perimetro').value);
    if (validarInput(largo) && validarInput(ancho)) {
        const perimetro = 2 * (largo + ancho);
        calcularResultado('P = 2(L + A)', 
                         perimetro.toFixed(2) + ' unidades', 
                         `2 × (${largo} + ${ancho}) = ${perimetro.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Funciones para el rombo
function calcularAreaRombo() {
    const diagonalMayor = parseFloat(document.getElementById('diagonal-mayor').value);
    const diagonalMenor = parseFloat(document.getElementById('diagonal-menor').value);
    if (validarInput(diagonalMayor) && validarInput(diagonalMenor)) {
        const area = (diagonalMayor * diagonalMenor) / 2;
        calcularResultado('A = (D × d)/2', 
                         area.toFixed(2) + ' unidades²', 
                         `(${diagonalMayor} × ${diagonalMenor}) / 2 = ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularPerimetroRombo() {
    const lado = parseFloat(document.getElementById('lado-rombo').value);
    if (validarInput(lado)) {
        const perimetro = 4 * lado;
        calcularResultado('P = 4L', 
                         perimetro.toFixed(2) + ' unidades', 
                         `4 × ${lado} = ${perimetro.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Funciones para el pentágono
function calcularAreaPentagono() {
    const lado = parseFloat(document.getElementById('lado-pentagono-area').value);
    const apotema = parseFloat(document.getElementById('apotema').value);
    if (validarInput(lado) && validarInput(apotema)) {
        const perimetro = 5 * lado;
        const area = (perimetro * apotema) / 2;
        calcularResultado('A = (P × a)/2', 
                         area.toFixed(2) + ' unidades²', 
                         `(5 × ${lado} × ${apotema}) / 2 ≈ ${area.toFixed(2)}`, 
                         'resultado-area');
    }
}

function calcularPerimetroPentagono() {
    const lado = parseFloat(document.getElementById('lado-pentagono-perimetro').value);
    if (validarInput(lado)) {
        const perimetro = 5 * lado;
        calcularResultado('P = 5L', 
                         perimetro.toFixed(2) + ' unidades', 
                         `5 × ${lado} = ${perimetro.toFixed(2)}`, 
                         'resultado-perimetro');
    }
}

// Selección del botón hamburguesa y el menú
const toggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Evento de clic para abrir/cerrar el menú
toggleButton.addEventListener('click', () => {
  navMenu.classList.toggle('open');

  // Animación de líneas del botón hamburguesa (opcional)
  toggleButton.classList.toggle('active');
});
