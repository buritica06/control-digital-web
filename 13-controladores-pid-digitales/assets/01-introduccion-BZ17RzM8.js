import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  Más del \\(90\\%\\) de los lazos de control industrial en robótica, manufactura y procesos térmicos se implementan con
  <strong>controladores PID digitales</strong>. Sin embargo, trasladar la ecuación continua ideal a un microcontrolador
  exige resolver tres retos críticos de ingeniería real: elegir entre la forma <em>posicional</em> y la forma
  <em>incremental (de velocidad)</em>, filtrar el ruido amplificado por la acción derivativa y evitar el
  <strong>integrator windup</strong> cuando el actuador alcanza sus límites físicos de saturación (p. ej., \\(0\\text{–}12\\ \\text{V}\\) PWM).
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 13 · Cierre lectivo de MEC36)</span>
  <p>
    Derivar e implementar los algoritmos PID digitales de posición y velocidad, incorporar filtrado derivativo de
    primer orden y proteger el lazo cerrado mediante esquemas <em>anti-windup</em> reproducibles en C embebido y Python.
  </p>
</div>

<h2 id="resultados-aprendizaje">2. Resultados de aprendizaje</h2>
<div class="table-wrap">
  <table>
    <caption>Resultados de aprendizaje específicos — MEC36-RA4 / CE2, CE3 (Bloom)</caption>
    <thead>
      <tr><th scope="col">#</th><th scope="col">Resultado de aprendizaje</th><th scope="col">Nivel Bloom</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td><strong>Identificar</strong> las aproximaciones de discretización numérica (Euler y Tustin/trapezoidal) del PID.</td><td>Nivel 1 · Recordar</td></tr>
      <tr><td>2</td><td><strong>Comparar</strong> el algoritmo PID de posición frente al algoritmo incremental (de velocidad).</td><td>Nivel 2 · Comprender</td></tr>
      <tr><td>3</td><td><strong>Implementar</strong> un PID discreto con filtrado derivativo y protección <em>anti-windup</em>.</td><td>Nivel 3 · Aplicar</td></tr>
      <tr><td>4</td><td><strong>Evaluar</strong> la robustez del lazo cerrado ante saturación del actuador y ruido de medición.</td><td>Nivel 5 · Evaluar</td></tr>
    </tbody>
  </table>
</div>

<h2 id="indice">3. Índice y mapa de navegación</h2>
<div class="table-wrap">
  <table>
    <caption>Estructura completa del módulo (10 apartados obligatorios)</caption>
    <thead>
      <tr><th scope="col">Apartado</th><th scope="col">Contenido principal</th><th scope="col">Ubicación</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>1. Introducción</strong></td><td>Estándar industrial PID digital y retos de implementación</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA4 / CE2–CE3 y verbos Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Mapa de navegación a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Posición vs. velocidad, filtro derivativo, anti-windup y lab 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Motor DC 0–1000 RPM (PWM 12 V) con simulador 3D + 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto guiado y 6 ejercicios con verificación automática</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis de implementación defensiva y rúbrica CE2</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas críticas sobre bumpless transfer y seguridad funcional</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Fadali, Franklin, Åström (IEEE) y firmware Python</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Balance integral de MEC36 y directrices para Semana 14</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre del curso</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender la relevancia industrial de los algoritmos PID digitales y sus protecciones.`,`Recorrer los 10 apartados del módulo final de MEC36 — Control II.`]});export{t as default};