import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  En tiempo continuo, el criterio de Routh-Hurwitz decide la estabilidad verificando si existen polos en el semiplano
  derecho \\(\\mathrm{Re}(s) &gt; 0\\). En control digital, la frontera de estabilidad es la circunferencia del
  <strong>círculo unitario</strong> (\\(|z| = 1\\)), por lo que Routh-Hurwitz no aplica directamente sobre \\(P(z)\\).
</p>
<p>
  El <strong>Criterio Algebraico de Estabilidad de Jury</strong> permite determinar —sin factorizar polinomios de
  orden superior— si todas las raíces de \\(1 + D(z)G(z) = 0\\) permanecen estrictamente dentro de \\(|z| &lt; 1\\), y
  calcular el rango seguro de ganancia \\(0 &lt; K &lt; K_{\\mathrm{cr}}\\) antes de encender un actuador mecatrónico.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 9 · Cierre del Corte 2)</span>
  <p>
    Dominar las condiciones necesarias y suficientes de Jury, construir su tabla de determinantes \\(2\\times 2\\),
    contrastar el método con la transformación bilineal de Tustin-Routh y determinar márgenes críticos de ganancia.
  </p>
</div>

<h2 id="resultados-aprendizaje">2. Resultados de aprendizaje</h2>
<div class="table-wrap">
  <table>
    <caption>Resultados de aprendizaje específicos — MEC36-RA3 (Taxonomía de Bloom)</caption>
    <thead>
      <tr><th scope="col">#</th><th scope="col">Resultado de aprendizaje</th><th scope="col">Nivel Bloom</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td><strong>Definir</strong> las condiciones analíticas de estabilidad asintótica y marginal en el plano \\(Z\\).</td><td>Nivel 1 · Recordar</td></tr>
      <tr><td>2</td><td><strong>Construir</strong> la tabla de coeficientes de Jury para polinomios característicos de orden \\(n\\).</td><td>Nivel 3 · Aplicar</td></tr>
      <tr><td>3</td><td><strong>Calcular</strong> el rango permisible de ganancia crítica \\(0 &lt; K &lt; K_{\\mathrm{cr}}\\) en lazo cerrado.</td><td>Nivel 4 · Analizar</td></tr>
      <tr><td>4</td><td><strong>Evaluar</strong> la estabilidad mediante la transformación bilineal acoplada con Routh-Hurwitz.</td><td>Nivel 5 · Evaluar</td></tr>
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
      <tr><td><strong>1. Introducción</strong></td><td>Frontera \\(|z|=1\\) y relevancia industrial del test de Jury</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA3 y verbos Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Mapa interactivo a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Algoritmo de Jury, tabla, transformación bilineal y triángulo 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Posicionador mecatrónico (\\(0 &lt; K &lt; 4.14\\)) con simulador 3D + 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto práctico guiado y 6 ejercicios con verificación automática</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis del criterio y rúbrica de evaluación</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas críticas sobre seguridad y margen de ganancia</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Fadali, Franklin (IEEE) y script Python de Jury</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Balance del Corte 2 y puente hacia LGR en Z (Semana 11)</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender la necesidad de criterios algebraicos específicos para el círculo unitario |z| = 1.`,`Identificar los resultados de aprendizaje de cierre del Corte 2 (MEC36-RA3).`]});export{t as default};