# Control Digital Web — MEC36: Control II (IUB)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-00A3E0?style=for-the-badge&logo=github)](https://buritica06.github.io/control-digital-web/)
[![Módulo](https://img.shields.io/badge/Módulo-MEC36%20Control%20II-002F6C?style=for-the-badge)](https://buritica06.github.io/control-digital-web/)
[![Institución](https://img.shields.io/badge/Institución-IUB%20Barranquilla-FFC72C?style=for-the-badge&labelColor=002F6C)](https://unibarranquilla.edu.co)

Repositorio centralizado de **aplicaciones web interactivas, simuladores en tiempo real, visualizadores tridimensionales WebGL (Three.js / Plotly) y herramientas pedagógicas** para la asignatura **MEC36 - Control II (Control Digital / Sistemas en Tiempo Discreto)** de la **Institución Universitaria de Barranquilla (IUB)**.

---

## 🌐 Catálogo de Aplicaciones Web Activas

Cada aplicación cuenta con su propia carpeta independiente, con su `index.html` autónomo y documentación técnica:

| Carpeta / Aplicación | Módulo | Temas Clave | Enlace Directo (GitHub Pages) |
|---|---|---|---|
| [`01-muestreo-y-cuantizacion`](./01-muestreo-y-cuantizacion/) | Semana 01 | Muestreo periódico, Retenedor ZOH, Teorema de Shannon-Nyquist, Cuantificación de 8 a 16 bits y SNR | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/01-muestreo-y-cuantizacion/)** |
| [`02-transformada-z`](./02-transformada-z/) | Semana 02 | Transformada Z unilateral, Funciones canónicas, Región de Convergencia (ROC), Teoremas de retardo y valor final | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/02-transformada-z/)** |
| [`03-transformada-z-inversa`](./03-transformada-z-inversa/) | Semana 03 | Expansión en Fracciones Parciales (Heaviside), División Larga, Integral de Inversión y Residuos de Cauchy | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/03-transformada-z-inversa/)** |
| [`04-ecuaciones-en-diferencias`](./04-ecuaciones-en-diferencias/) | Semana 04 | Respuesta libre y forzada, animaciones Manim, discretización ZOH/Tustin/Euler, Jury, PI digital | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/04-ecuaciones-en-diferencias/)** |
| [`04b-ecuaciones-diferencias-interactiva`](./04b-ecuaciones-diferencias-interactiva/) | Semana 04 | Plataforma por capítulos: plano z y \|G(z)\| en 3D, solución paso a paso, lugar de raíces 3D, Bode, Nyquist, ejercicios con verificación | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/04b-ecuaciones-diferencias-interactiva/)** |
| [`topologia-transformada-z`](./topologia-transformada-z/) | Tópico Avanzado | Mapeo continuo-discreto $s 	o z$, Círculo Unitario ($|z|=1$), Superficie 3D de Magnitud y Análisis de Estabilidad | 🚀 **[Abrir App](https://buritica06.github.io/control-digital-web/topologia-transformada-z/)** |

> 💡 **Portal Principal:** Puedes acceder al Hub completo con buscador dinámico en: **[https://buritica06.github.io/control-digital-web/](https://buritica06.github.io/control-digital-web/)**

---

## 📁 Estructura del Repositorio

```text
control-digital-web/
├── index.html                                # Hub Principal con buscador, filtros y tarjetas de cada app
├── README.md                                 # Documentación general y catálogo con enlaces
├── .gitignore                                # Exclusiones de control de versiones
├── logos/                                    # Identidad visual oficial IUB
│   ├── logo_iub_azul.png
│   ├── logo_iub_blanco.png
│   └── ...
├── 01-muestreo-y-cuantizacion/               # Semana 1: Lazo digital, Muestreo y Cuantificación
│   ├── index.html                            # App interactiva con controles y HUD
│   ├── muestreo_cuantizacion_3d.html         # Visor Plotly 3D completo
│   ├── semana01_3d_experience.py             # Script de cálculo matemático en Python
│   └── README.md                             # Documentación específica del laboratorio
├── 02-transformada-z/                        # Semana 2: Transformada Z y Teoremas
│   ├── index.html                            # App interactiva Three.js con KaTeX
│   ├── transformada_z_semana02_3d.html       # Visualizador Plotly 3D
│   ├── semana02_3d_experience.py             # Generador simbólico y numérico
│   └── README.md
├── 03-transformada-z-inversa/                # Semana 3: Transformada Z Inversa
│   ├── index.html                            # App interactiva con Three.js y HUD
│   ├── transformada_z_inversa_semana03_3d.html # Visualizador 3D
│   ├── semana03_3d_experience.py             # Métodos analíticos y numéricos
│   └── README.md
└── topologia-transformada-z/                 # Topología Energética 3D
    ├── index.html                            # Visualizador interactivo integrado
    ├── transformada_z_experiencia_3d.html    # Superficie tridimensional
    ├── z_transform_3d_experience.py          # Script matemático
    └── README.md
```

---

## 🛠️ Tecnologías y Arquitectura

- **Frontend:** HTML5, CSS3, JavaScript nativo (ES6+), **Tailwind CSS** (vía CDN para máxima portabilidad).
- **Gráficos 3D:** **Three.js** (WebGL con controles orbitales `OrbitControls`) y **Plotly.js** (superficies matemáticas de alta precisión).
- **Tipografía Matemática:** **KaTeX** (renderizado LaTeX ultrarrápido en el navegador sin dependencias externas).
- **Identidad Institucional:** Paleta de colores oficial de la Institución Universitaria de Barranquilla (IUB):
  - Azul Institucional: `#002F6C`
  - Azul Claro: `#00A3E0`
  - Amarillo Acento: `#FFC72C`
- **Cero Instalación:** Todos los módulos se ejecutan 100% en el lado del cliente (browser-side) directamente desde GitHub Pages o abriendo cualquier archivo `.html` localmente.

---

## 🚀 Cómo agregar una nueva página web al repositorio

1. Crea una nueva carpeta descriptiva con el nombre de la página (ej. `04-diseno-controladores-digitales/`).
2. Guarda tu archivo principal como `index.html` dentro de esa carpeta.
3. Incluye los archivos complementarios (imágenes, scripts en python, visores 3D).
4. Agrega una tarjeta en el archivo `index.html` raíz del repositorio y actualiza este `README.md`.
5. Ejecuta:
   ```bash
   git add .
   git commit -m "feat: Agregar nueva página web interactiva"
   git push origin main
   ```
   GitHub Pages actualizará automáticamente la nueva página en cuestión de segundos.

---

## 👨‍🏫 Créditos y Autoría

- **Institución:** [Institución Universitaria de Barranquilla (IUB)](https://unibarranquilla.edu.co)
- **Facultad:** Facultad de Ingeniería
- **Programa:** Ingeniería Mecatrónica
- **Asignatura:** MEC36 - Control II
- **Docente:** Leopoldo Antonio Laborde Leon / Ricardo Buriticá
