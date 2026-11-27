import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  Con la Semana 11 iniciamos el <strong>Tercer Corte Evaluativo (MEC36-RA4)</strong>, dedicado al <strong>diseño de
  controladores digitales</strong>. Mientras el Criterio de Jury responde si una ganancia \\(K\\) particular produce un
  sistema estable, el <strong>Lugar Geométrico de las Raíces (LGR)</strong> traza la trayectoria completa de todos los
  polos en lazo cerrado conforme \\(K\\) varía desde \\(0\\) hasta \\(\\infty\\).
</p>
<p>
  En el plano complejo \\(Z\\), el LGR permite elegir de forma visual y exacta la ganancia que sitúa los polos dominantes
  dentro de las regiones de amortiguamiento (\\(\\zeta\\)) y asentamiento (\\(t_s\\)) estudiadas en la Semana 8, o detectar
  cuándo un controlador proporcional puro no alcanza la región deseada y se requiere un compensador dinámico (Semana 12).
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 11 · Corte 3)</span>
  <p>
    Aplicar las condiciones de ángulo y magnitud de Evans en el plano \\(Z\\), construir el LGR completo de funciones de
    transferencia de pulso (incluyendo puntos de ruptura y cruce con \\(|z|=1\\)) y sintonizar ganancias para desempeño
    especificado.
  </p>
</div>

<h2 id="resultados-aprendizaje">2. Resultados de aprendizaje</h2>
<div class="table-wrap">
  <table>
    <caption>Resultados de aprendizaje específicos — MEC36-RA4 / CE1, CE3 (Bloom)</caption>
    <thead>
      <tr><th scope="col">#</th><th scope="col">Resultado de aprendizaje</th><th scope="col">Nivel Bloom</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td><strong>Definir</strong> las condiciones de magnitud y ángulo del LGR en el plano complejo \\(Z\\).</td><td>Nivel 1 · Recordar</td></tr>
      <tr><td>2</td><td><strong>Aplicar</strong> las reglas sistemáticas de trazado del LGR para funciones de transferencia de pulso.</td><td>Nivel 3 · Aplicar</td></tr>
      <tr><td>3</td><td><strong>Calcular</strong> puntos de ruptura sobre el eje real y la ganancia crítica de cruce en \\(|z|=1\\).</td><td>Nivel 4 · Analizar</td></tr>
      <tr><td>4</td><td><strong>Simular</strong> y verificar las trayectorias del LGR discreto en herramientas computacionales.</td><td>Nivel 4 · Analizar</td></tr>
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
      <tr><td><strong>1. Introducción</strong></td><td>Apertura del Corte 3 y diseño por reubicación de polos</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA4 y tabla Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Mapa interactivo a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Condiciones de ángulo/magnitud, reglas de trazado y lab 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Manipulador robótico 1 GDL con simulador 3D + LGR 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto práctico guiado y 6 ejercicios con corrección inmediata</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis de reglas y rúbrica de evaluación</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas críticas sobre ceros de muestreo y alta ganancia</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Kuo, Franklin (IEEE) y script Python</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Puente hacia Semana 12 (Compensadores adelanto/atraso)</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender el rol del LGR discreto en el diseño de controladores digitales (Corte 3 · RA4).`,`Recorrer los 10 apartados del módulo y sus laboratorios interactivos.`]});export{t as default};