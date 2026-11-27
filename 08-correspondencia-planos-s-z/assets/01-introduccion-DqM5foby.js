import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  En control clásico en tiempo continuo, el ingeniero traduce rápidamente requisitos de desempeño —como un sobrepaso
  máximo \\(M_p \\le 16.3\\%\\) o un tiempo de establecimiento \\(t_s \\le 1.0\\ \\text{s}\\)— en una región triangular del
  semiplano izquierdo de Laplace. Al implementar el controlador en un sistema digital, la transformación exponencial
  \\(z = e^{sT}\\) deforma esas rectas en <strong>círculos concéntricos</strong> y <strong>espirales logarítmicas</strong>
  dentro del círculo unitario del plano \\(Z\\).
</p>
<p>
  Dominar esta geometría es indispensable antes de diseñar compensadores en el Corte 3: permite saber de un solo vistazo
  qué ubicación de polos discretos produce una respuesta rápida y suave, cuál genera oscilaciones de alta frecuencia y
  cuál conduce a la inestabilidad.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 8 · Corte 2)</span>
  <p>
    Establecer la correspondencia exacta entre el plano complejo \\(S\\) y el plano \\(Z\\) mediante \\(z = e^{sT}\\), trazar
    las curvas de amortiguamiento constante (\\(\\zeta\\)), frecuencia natural (\\(\\omega_n\\)) y tiempo de establecimiento
    (\\(t_s\\)), y delimitar la región admisible de polos discretos.
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
      <tr><td>1</td><td><strong>Describir</strong> el mapeo del semiplano izquierdo de Laplace hacia el interior del círculo unitario en \\(Z\\).</td><td>Nivel 2 · Comprender</td></tr>
      <tr><td>2</td><td><strong>Calcular</strong> la posición de polos dominantes en \\(Z\\) a partir de especificaciones de \\(M_p\\) y \\(t_s\\).</td><td>Nivel 3 · Aplicar</td></tr>
      <tr><td>3</td><td><strong>Delimitar</strong> gráficamente la región admisible de polos en el plano \\(Z\\) para criterios transitorios.</td><td>Nivel 4 · Analizar</td></tr>
      <tr><td>4</td><td><strong>Evaluar</strong> la influencia del periodo de muestreo \\(T\\) en la dispersión geométrica de los polos discretos.</td><td>Nivel 5 · Evaluar</td></tr>
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
      <tr><td><strong>1. Introducción</strong></td><td>De especificaciones continuas a geometría discreta</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA3 y verbos Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Mapa de navegación a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Mapeo \\(z = e^{sT}\\), banda primaria, espirales \\(\\zeta\\), círculos \\(t_s\\) y lab 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Articulación de brazo robótico con simulador 3D + 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto práctico guiado y 6 ejercicios evaluables</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis de regiones del plano \\(Z\\) y rúbrica</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas críticas sobre respuesta deadbeat y polos negativos</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Franklin, Fadali, Åström (IEEE) y script Python</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Puente hacia Semana 9 (Estabilidad y Criterio de Jury)</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender la relación geométrica entre especificaciones continuas y regiones del plano Z.`,`Identificar los resultados de aprendizaje de la Semana 8 (MEC36-RA3).`,`Navegar por los 10 apartados del módulo y sus laboratorios interactivos.`]});export{t as default};