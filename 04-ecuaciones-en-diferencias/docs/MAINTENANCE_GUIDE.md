# Guía de Mantenimiento, Actualización y Reutilización STEM

> **Institución Universitaria de Barranquilla (IUB)**  
> **Facultad de Ingeniería — Programa de Ingeniería Mecatrónica**  
> **Proyecto:** Plataforma Interactiva de Ecuaciones en Diferencias y Sistemas Discretos (`MEC36`)

---

## 1. Mantenimiento del Contenido Pedagógico

El contenido educativo está desacoplado en módulos claros dentro de `index.html` y `assets/js/app.js`, lo que facilita su actualización semestre a semestre sin alterar el motor gráfico.

### 1.1 Actualizar o agregar un nuevo Ejemplo Resuelto
1. Abra `assets/js/app.js` y localice el arreglo `SOLVED_EXAMPLES` o la sección `#ejemplos-resueltos` en `index.html`.
2. Defina los coeficientes del polinomio característico $A(z) = 1 + a_1 z^{-1} + a_2 z^{-2}$, del polinomio de entrada $B(z) = b_0 + b_1 z^{-1} + b_2 z^{-2}$ y las condiciones iniciales $y[-1], y[-2]$.
3. Utilice el botón **"Cargar en Simulador"** (función `loadPresetIntoLab(presetId)`) para vincular automáticamente el nuevo ejemplo con las gráficas dinámicas de Plotly y el visor 3D.

### 1.2 Agregar nuevos Ejercicios Propuestos o Preguntas de Autoevaluación
1. En `assets/js/app.js`, localice el objeto `PRACTICE_EXERCISES` (para ejercicios numéricos verificables) y `QUIZ_QUESTIONS` (para preguntas de selección múltiple).
2. Agregue un nuevo objeto siguiendo el esquema:
   ```javascript
   {
     id: "ex-5",
     titulo: "Filtro Digital de Primer Orden",
     enunciado: "Considere y[k] - 0.85 y[k-1] = 0.15 u[k] con u[k] = 10...",
     respuestaEsperada: 10.0,
     tolerancia: 0.05,
     unidad: "V",
     pista: "Aplique el teorema del valor final con z -> 1.",
     solucionPasoAPaso: "En estado estacionario y_ss (1 - 0.85) = 0.15 (10) => y_ss = 10 V."
   }
   ```
3. El sistema de barra de progreso actualizará automáticamente el denominador total de actividades completadas.

---

## 2. Regeneración y Actualización de Escenas de Manim

Todas las animaciones matemáticas residen en `scenes/manim/manim_scenes.py`.

### 2.1 Renderizar con Manim Community Edition (`manim`)
Si modifica una fórmula o animación en `scenes/manim/manim_scenes.py`, ejecute el script integrador desde la raíz del proyecto:

```bash
python scenes/manim/render_manim_videos.py
```

Este script:
1. Verifica si `manim` y `ffmpeg` están disponibles en el entorno Python activo.
2. Renderiza las 4 escenas (`Scene01AlgebraicDevelopment`, `Scene02ZTransformShift`, `Scene03TimeEvolution`, `Scene04StabilityZPlane`) en resolución Full HD (`1920x1080`, 60 FPS) o HD (`1280x720`, 30 FPS).
3. Copia automáticamente los archivos `.mp4` resultantes a `assets/videos/` con los nombres exactos que consume `index.html` y genera las imágenes póster en `assets/images/`.

### 2.2 Renderizado directo con Manim CLI (individual)
Para previsualizar una sola escena durante el desarrollo:

```bash
manim -pqh scenes/manim/manim_scenes.py Scene02ZTransformShift
```

---

## 3. Reglas de Diseño Visual para Nuevas Gráficas (`assets/js/charts.js`)

Al añadir nuevas gráficas con Plotly.js, respete siempre el estándar anti-superposición de la plataforma:

1. **Nunca use el título interno de Plotly (`layout.title.text`) sobre el área de datos**: Coloque el título y subtítulo en la tarjeta HTML superior (`.chart-header`) para garantizar legibilidad en pantallas móviles estrechas.
2. **Active siempre `automargin: true`** en `xaxis` y `yaxis` con separación `standoff: 14`.
3. **Leyenda en contenedor superior o inferior despejado**:
   ```javascript
   legend: {
     orientation: 'h',
     x: 0,
     y: 1.14,
     bgcolor: 'rgba(18, 16, 35, 0.85)',
     bordercolor: 'rgba(255, 223, 45, 0.25)',
     borderwidth: 1
   }
   ```
4. **Paleta accesible de alto contraste sobre `#121023`**:
   - Amarillo IUB (`#FFDF2D`) para la señal principal o respuesta total $y[k]$.
   - Azul Claro IUB (`#00ADE7`) para la respuesta forzada o referencia continua.
   - Naranja IUB (`#E39037`) para la respuesta libre o aproximación Tustin.
   - Verde IUB (`#3B9C6D`) para la región estable o señal de control $u[k]$.
   - Coral (`#F87171`) para polos inestables o divergencia de Euler.

---

## 4. Reutilización de la Plantilla para Otras Asignaturas STEM

Esta arquitectura es 100 % modular y puede adaptarse a otras asignaturas de Ingeniería (como **MEC42 — Diseño de Automatismos de PLC**, **Señales y Sistemas**, **Ecuaciones Diferenciales**, **Robótica** o **Sistemas SCADA**):

1. **Identidad visual**: Las variables CSS en `assets/css/styles.css` (`:root`) centralizan la paleta oficial de la IUB.
2. **Estructura de navegación y progreso**: El sistema de seguimiento en `assets/js/app.js` utiliza una clave de almacenamiento configurable (`STORAGE_KEY = 'iub_mec36_ecdif_progress_v1'`). Basta con cambiar esta clave para una nueva asignatura o semana.
3. **Integración con el repositorio central (`control-digital-web`)**: Ejecute `python ../src/sincronizar_web_repo.py` para publicar automáticamente el módulo en el Hub institucional de GitHub Pages.
