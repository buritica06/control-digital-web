# Plataforma Educativa Interactiva: Ecuaciones en Diferencias, Manim y Sistemas Discretos 3D

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Ready-00ADE7?style=for-the-badge&logo=github)](https://buritica06.github.io/control-digital-web/04-ecuaciones-en-diferencias/)
[![Manim CE](https://img.shields.io/badge/Manim%20CE-v0.22.0-FFDF2D?style=for-the-badge&labelColor=121023)](https://github.com/ManimCommunity/manim)
[![Institución](https://img.shields.io/badge/Institución-IUB%20Barranquilla-3B9C6D?style=for-the-badge&labelColor=121023)](https://unibarranquilla.edu.co)

Sitio web académico interactivo desarrollado para la asignatura **MEC36 — Control II (Sistemas de Control en Tiempo Discreto)** de la **Institución Universitaria de Barranquilla (IUB)**, enfocado en el estudio, resolución analítica/numérica y visualización tridimensional de las **Ecuaciones en Diferencias Lineales e Invariantes en el Tiempo (LTI)**.

---

## 📁 Estructura del Proyecto

El proyecto cumple estrictamente la arquitectura modular para despliegue directo en **GitHub Pages**:

```text
/
├── index.html                                  # Aplicación educativa principal guiada por módulos
├── ecuaciones_diferencias_semana04_3d.html     # Visor 3D autónomo en pantalla completa (Plotly WebGL)
├── semana04_3d_experience.py                   # Generador científico del visor 3D autónomo
├── servir_local.py                             # Servidor HTTP local para previsualización inmediata
├── README.md                                   # Instrucciones de instalación, Manim y despliegue
├── assets/
│   ├── css/
│   │   └── styles.css                          # Sistema visual institucional IUB (beamerthemeiub.sty)
│   ├── js/
│   │   ├── app.js                              # Lógica pedagógica, progreso, simulador, ejemplos y quiz
│   │   ├── viewer3d.js                         # Motor 3D WebGL (Three.js + OrbitControls, 4 escenas)
│   │   ├── charts.js                           # Gráficas dinámicas Plotly.js con cero superposición
│   │   └── manim_player.js                     # Reproductor interactivo de escenas de Manim
│   ├── images/                                 # Logos institucionales IUB y pósters de alta resolución
│   │   ├── logo_iub_blanco.png
│   │   ├── logo_iub_azul.png
│   │   └── poster_scene_01..04.png
│   └── videos/                                 # Animaciones matemáticas MP4 generadas con Manim CE
│       ├── scene_01_algebraic_dev.mp4
│       ├── scene_02_z_transform_ci.mp4
│       ├── scene_03_time_evolution.mp4
│       └── scene_04_stability_zplane.mp4
├── scenes/
│   └── manim/
│       ├── manim_scenes.py                     # Código fuente de las 4 escenas en Manim Community Edition
│       └── render_manim_videos.py              # Script de compilación e integración automática a assets/videos/
└── docs/
    ├── ARCHITECTURE.md                         # Documentación de arquitectura del sistema
    └── MAINTENANCE_GUIDE.md                    # Guía de mantenimiento, actualización y reutilización STEM
```

---

## 🎬 Escenas de Manim Incluidas (`scenes/manim/manim_scenes.py`)

| Escena | Clase en Python | Archivo de Video Generado | Propósito Pedagógico |
|---|---|---|---|
| **Escena 1** | `Scene01AlgebraicDevelopment` | `assets/videos/scene_01_algebraic_dev.mp4` | Del lazo digital (ADC → CPU → DAC/ZOH) a la ecuación implícita, despeje recursivo y actualización de registros $y[k-1], y[k-2]$. |
| **Escena 2** | `Scene02ZTransformShift` | `assets/videos/scene_02_z_transform_ci.mp4` | Aplicación del Teorema de Retardo con condiciones iniciales no nulas y separación en $Y_{\text{libre}}(z) + Y_{\text{forzada}}(z)$. |
| **Escena 3** | `Scene03TimeEvolution` | `assets/videos/scene_03_time_evolution.mp4` | Construcción muestra a muestra ($k=0\dots 11$) superponiendo la respuesta libre, forzada y total hacia $y(\infty)=10.0$. |
| **Escena 4** | `Scene04StabilityZPlane` | `assets/videos/scene_04_stability_zplane.mp4` | Estabilidad en el Plano $Z$, Círculo Unitario $|z|=1$, modos complejos, alternantes e inestables (Criterio de Jury). |

---

## 🛠️ Requisitos e Instalación para Regenerar Animaciones

> **Nota importante:** Los videos `.mp4` y pósters `.png` **ya están pre-renderizados e incluidos** en `assets/videos/` y `assets/images/`, por lo que el sitio web funciona de inmediato sin instalar nada. Si deseas modificar o regenerar las escenas de Manim:

### 1. Instalar dependencias de Python (Python 3.10+)
```bash
pip install manim imageio-ffmpeg numpy scipy matplotlib plotly
```

### 2. Ejecutar el pipeline de integración de Manim
Desde la raíz del proyecto, ejecuta:
```bash
python scenes/manim/render_manim_videos.py
```
Este script compila las 4 escenas de `scenes/manim/manim_scenes.py`, copia los archivos `.mp4` a `assets/videos/` y extrae las miniaturas póster en `assets/images/`.

### 3. Regenerar el visor 3D autónomo (opcional)
```bash
python semana04_3d_experience.py
```

---

## 💻 Ejecución Local

Puedes abrir directamente `index.html` con doble clic en cualquier navegador moderno (Chrome, Edge, Firefox, Safari), o levantar el servidor local incluido:

```bash
python servir_local.py
```
El navegador se abrirá automáticamente en `http://localhost:8084/index.html`.

---

## 🚀 Despliegue en GitHub Pages

### Opción A: Despliegue directo de esta carpeta como repositorio autónomo
1. Inicializa el repositorio y súbelo a GitHub:
   ```bash
   git init -b main
   git add .
   git commit -m "feat: Plataforma interactiva de Ecuaciones en Diferencias con Manim y 3D"
   git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
   git push -u origin main
   ```
2. En GitHub, ve a **Settings → Pages → Build and deployment**, selecciona **Deploy from a branch**, elige la rama `main` y la carpeta `/ (root)` y haz clic en **Save**.

### Opción B: Sincronización automática con el Hub Institucional `control-digital-web`
Desde el directorio `1. MEC36 - Control II/7. Cerebro_Docente_Control_II`, ejecuta:
```bash
python src/sincronizar_web_repo.py
```
Esto publica automáticamente el módulo en `https://buritica06.github.io/control-digital-web/04-ecuaciones-en-diferencias/` y actualiza el catálogo principal del curso.

---

## 👨‍🏫 Créditos Académicos
- **Institución:** Institución Universitaria de Barranquilla (IUB)
- **Facultad:** Facultad de Ingeniería — Programa de Ingeniería Mecatrónica
- **Asignatura:** MEC36 — Control II
- **Docente:** Ricardo Buriticá
