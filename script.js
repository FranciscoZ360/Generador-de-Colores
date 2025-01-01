// Genera un color aleatorio en formato hexadecimal
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
}

// Convierte un color RGB en formato hexadecimal
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    return `#${result}`;
}

// Genera diferentes tonalidades de un color
function generateShades(color) {
    return Array.from({ length: 5 }, (_, i) => {
        let shade = color;
        for (let j = 0; j < 3; j++) {
            let value = parseInt(shade.substr(1 + j * 2, 2), 16);
            value = Math.min(255, value + (i * 20));
            shade = shade.substr(0, 1 + j * 2) + value.toString(16).padStart(2, '0') + shade.substr(3 + j * 2);
        }
        return shade;
    });
}

// Crea un contenedor de color con su nombre
function createColorContainer(color, onClickHandler) {
    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = color;
    if (onClickHandler) colorDiv.onclick = onClickHandler;

    const colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = color;

    const colorContainer = document.createElement('div');
    colorContainer.appendChild(colorDiv);
    colorContainer.appendChild(colorName);

    return colorContainer;
}

// Establece un fondo degradado basado en un color
function setGradientBackground(color) {
    document.body.style.background = `linear-gradient(to right, ${color}, #ffffff)`;
}

// Muestra las tonalidades de un color seleccionado
function showShades(event) {
    const color = event.target.style.backgroundColor;
    const hexColor = rgbToHex(color);
    const shades = generateShades(hexColor);
    const palette = document.getElementById('palette');
    palette.innerHTML = '';

    shades.forEach(shade => {
        palette.appendChild(createColorContainer(shade));
    });

    setGradientBackground(hexColor);
}

// Genera una paleta de colores aleatorios
function generatePalette() {
    const palette = document.getElementById('palette');
    palette.innerHTML = '';

    Array.from({ length: 5 }, () => generateRandomColor()).forEach(color => {
        palette.appendChild(createColorContainer(color, showShades));
    });
}
