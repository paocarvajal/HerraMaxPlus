const fs = require('fs');

const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#1C1C21" />

  <!-- Grupo Herramientas Cruzadas (Martillo y Perica) -->
  <g transform="translate(400, 260) scale(1.4)">
    
    <!-- Llave Perica (Inclinada hacia la izquierda) -->
    <g transform="rotate(-40)">
      <!-- Mango Llave -->
      <rect x="-15" y="-50" width="30" height="150" rx="4" fill="#FF6B00" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" />
      <!-- Cabeza Llave -->
      <path d="M -35,-50 L 35,-50 L 35,-90 C 35,-110 -35,-110 -35,-50 Z" fill="#FF6B00" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" />
      <!-- Hueco interno llave -->
      <circle cx="0" cy="-60" r="10" fill="#1C1C21" />
      <!-- Mordaza detalle -->
      <rect x="-35" y="-70" width="30" height="15" fill="#1C1C21" />
      <!-- Tornillo sin fin simulado -->
      <rect x="-15" y="-40" width="30" height="15" fill="#1C1C21" opacity="0.5" />
    </g>

    <!-- Martillo (Inclinado hacia la derecha) -->
    <g transform="rotate(40)">
      <!-- Mango Martillo -->
      <rect x="-10" y="-30" width="20" height="140" rx="4" fill="#FF6B00" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" />
      <rect x="-10" y="80" width="20" height="30" rx="4" fill="#1C1C21" stroke="#FFFFFF" stroke-width="2" /> <!-- Grip -->
      <!-- Cabeza Martillo -->
      <path d="M -35,-30 L 35,-30 L 35,-70 C 15,-70 15,-50 -35,-50 Z" fill="#FF6B00" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" />
      <!-- Golpeador martillo -->
      <rect x="25" y="-80" width="20" height="30" rx="2" fill="#FF6B00" stroke="#FFFFFF" stroke-width="4" stroke-linejoin="round" />
    </g>
    
  </g>

  <!-- Corte / Banda central para el texto que tapa las herramientas -->
  <rect x="100" y="270" width="600" height="90" fill="#1C1C21" />

  <!-- Texto Principal: HERRAMAX -->
  <g transform="translate(400, 345)">
    <text x="-5" y="0" font-family="'Arial Black', 'Impact', sans-serif" font-size="95" font-weight="900" fill="#FFFFFF" text-anchor="end" letter-spacing="2">HERRA</text>
    <text x="-5" y="0" font-family="'Arial Black', 'Impact', sans-serif" font-size="95" font-weight="900" fill="#FF6B00" text-anchor="start" letter-spacing="2">MAX</text>
  </g>

  <!-- Texto Secundario: PLUS -->
  <g transform="translate(400, 420)">
    <text x="0" y="0" font-family="'Arial Black', 'Impact', sans-serif" font-size="45" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">PLUS</text>
  </g>
</svg>`;

const cleanDir = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Logo_Vectores_Herramax_Plus';
fs.mkdirSync(cleanDir, { recursive: true });

// Oscuro original
fs.writeFileSync(cleanDir + '\\HerraMax_Plus_Vector_Plano_Oscuro.svg', svgCode);

// Tratar version transparente sin fondo oscuro
let transCode = svgCode.replace('<rect width="800" height="600" fill="#1C1C21" />', '')
    .replaceAll('fill="#1C1C21"', 'fill="transparent"')
    .replace('<rect x="100" y="270" width="600" height="90" fill="transparent" />', '');

// La banda que tapa las herramientas debe ser borrada, pero eso revelaría las herramientas detrás del texto en PNGs trans.
// Para un SVG sólido, el texto debe taparlos. Si el fondo no existe, esto requiere clip-paths complejos.
// Vamos a dejar el fondo negro en el hueco para que tape.
const transLogoConFondoTexto = svgCode.replace('<rect width="800" height="600" fill="#1C1C21" />', '');

fs.writeFileSync(cleanDir + '\\HerraMax_Plus_Vector_Plano_Transparente.svg', transLogoConFondoTexto);

console.log("Archivos SVG planos generados correctamente.");
