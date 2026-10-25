---
tipo: documentacion_web
asignatura: '[[MEC36 - Control II]]'
semana: 2
---

# Plataforma Didáctica Interactiva: Semana 2 — Transformada Z

> **MEC36 — Control II (Control en Tiempo Discreto)**  
> **Programa de Ingeniería Mecatrónica · Institución Universitaria de Barranquilla (IUB)**  
> **Profesor:** Ricardo Buriticá  
> **Resultado de Aprendizaje:** `MEC36-RA2` (Criterio CE1)

Esta plataforma web educativa de última generación combina **visualizaciones 3D en tiempo real con WebGL (Three.js)**, **gráficas científicas interactivas (Plotly.js)**, **fórmulas matemáticas con calidad tipográfica (KaTeX)** y una **redacción empática y agradable para estudiantes de ingeniería**.

---

## 🚀 Requisitos Previos e Instalación

### Opción 1: Desarrollo Moderno con Vite (Node.js)
- **Node.js**: $\ge 18.0.0$
- **npm**: $\ge 9.0.0$

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en vivo (HMR)
npm run dev

# 3. Compilar para producción (genera la carpeta /dist)
npm run build

# 4. Probar la compilación de producción localmente
npm run preview
```

### Opción 2: Previsualización Local Rápida (Sin Node.js)
Si estás en una máquina sin Node.js instalado, puedes servir la aplicación de inmediato utilizando el servidor Python incluido:

```bash
python servir_local.py
# Se abrirá automáticamente http://localhost:8080/index.html en tu navegador.
```

---

## 🌐 Despliegue Automático en GitHub Pages (CI/CD)

El repositorio incluye el flujo de trabajo `.github/workflows/deploy.yml` que compila y publica el sitio automáticamente cada vez que haces un push a `main`:

1. Sube tu repositorio a GitHub.
2. En GitHub, ve a **Settings** → **Pages**.
3. En **Build and deployment** → **Source**, selecciona **GitHub Actions**.
4. ¡Listo! Cada `git push origin main` desplegará el sitio web en cuestión de segundos en `https://<usuario>.github.io/<repositorio>/`.

---

## 🧱 Estructura del Proyecto

```text
generacion/web_transformada_z_modular/
├── index.html                   # Entrada principal de la aplicación SPA
├── package.json                 # Dependencias y scripts de construcción
├── vite.config.js               # Configuración de Vite con base relativa './'
├── servir_local.py              # Servidor HTTP local sin dependencias
├── README.md                    # Documentación y guía de despliegue
├── assets/
│   ├── logos/                   # Logos oficiales institucionales IUB
│   └── images/fallbacks/        # Imágenes estáticas de respaldo sin WebGL
├── src/
│   ├── main.js                  # Inicialización de la app, estado y eventos
│   ├── router.js                # Enrutador e inyector de capítulos
│   ├── modules/                 # Contenido pedagógico guiado (Capítulos 1 a 7)
│   │   ├── 01-mapeo-conforme/   # Mapeo s -> z y discretización
│   │   ├── 02-definicion-roc/   # Serie de potencias y Región de Convergencia
│   │   ├── 03-elementales/      # Diccionario de funciones canónicas
│   │   ├── 04-teoremas/         # Desplazamiento, avance y estabilidad
│   │   ├── 05-caso-servomecanismo/# Caso práctico de error mecatrónico
│   │   ├── 06-ejemplos/         # Ejercicios resueltos paso a paso
│   │   └── 07-ejercicios/       # Cuestionario interactivo con feedback
│   ├── viz/
│   │   ├── three/               # Motor 3D (Three.js WebGL)
│   │   │   ├── planoZ.js        # Círculo unitario, polos y ceros interactivos
│   │   │   ├── superficieROC.js # Relieve 3D de magnitud |X(z)| y cilindro ROC
│   │   │   └── three-utils.js   # Manejo de ciclo de vida y WebGL fallback
│   │   └── plotly/              # Motor 2D (Plotly.js)
│   │       ├── respuestaEscalon.js # Muestreo continuo vs discreto
│   │       ├── secuencias.js    # Catálogo stem dinámico
│   │       ├── errorServomecanismo.js # Trayectoria temporal y límites TVI/TVF
│   │       └── plotly-utils.js  # Paleta IUB accesible y layout anti-colisión
│   ├── math/
│   │   ├── evaluator.js         # Evaluador seguro con math.js y timeout
│   │   ├── discrete.js          # Rutinas de cálculo de polos, ceros y señales
│   │   └── katex-macros.js      # Renderizador y macros KaTeX
│   ├── ui/
│   │   ├── gui.js               # Factoría de lil-gui fuera del canvas
│   │   ├── progreso.js          # Barra de progreso persistente en localStorage
│   │   ├── nav.js               # Navegación con scrollspy
│   │   └── theme.js             # Gestor de tema claro/oscuro
│   └── styles/
│       ├── main.css             # Estructura y diseño general
│       ├── theme.css            # Paleta institucional IUB Dark Yellow
│       └── components.css       # Tarjetas pedagógicas y cajas de llamada
└── docs/
    ├── arquitectura.md          # Justificación de arquitectura y trade-offs
    ├── guia-mantenimiento.md     # Buenas prácticas y checklist de PR
    └── guia-contenido.md        # Tono pedagógico y pautas de redacción
```

---

## 🛠️ Cómo Extender la Plataforma

### 1. Añadir una Nueva Escena 3D
1. Crea un módulo en `src/viz/three/<nuevaEscena>.js`.
2. Exporta la factoría estándar:
   ```javascript
   export function createScene(container, options) {
     return { mount(), update(params), resize(w, h), dispose(), renderer };
   }
   ```
3. Importa y monta la escena dentro de `src/router.js` vinculando su contenedor HTML y su panel `lil-gui` dedicado.

### 2. Añadir una Nueva Gráfica 2D
1. Crea un módulo en `src/viz/plotly/<nuevaGrafica>.js`.
2. Utiliza `getBaseLayout(titulo, ejeX, ejeY)` de `src/viz/plotly/plotly-utils.js` para asegurar que las etiquetas no se superpongan con las curvas ni con la leyenda.
3. Actualiza siempre con `Plotly.react(container, traces, layout)` para máxima velocidad sin parpadeos.

---

## 🎓 Identidad Institucional
Diseñado conforme al manual de estilo institucional de la **Institución Universitaria de Barranquilla (IUB)**:
- **Fondo:** `#121023` (IUB Oscuro)
- **Acento:** `#FFDF2D` (IUB Amarillo)
- **Información:** `#00ADE7` (IUB Azul Claro)
- **Éxito:** `#3B9C6D` (IUB Verde)
- **Advertencia:** `#E39037` (IUB Naranja)
