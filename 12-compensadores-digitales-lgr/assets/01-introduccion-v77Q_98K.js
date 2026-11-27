import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  En la Semana 11 observamos que ajustar únicamente una ganancia proporcional \\(K\\) solo desplaza los polos sobre el LGR
  original de la planta. Si el polo dominante deseado \\(z_d\\) —fijado por requisitos de sobrepaso \\(M_p\\) y tiempo de
  establecimiento \\(t_s\\)— no pertenece al LGR, ningún valor de \\(K\\) logrará el desempeño exigido.
</p>
<p>
  Para remodelar las trayectorias del LGR e incorporar un aporte de fase exacto se diseña un
  <strong>compensador digital dinámico</strong> \\(D(z) = K_c \\frac{z - z_0}{z - p_0}\\), directamente implementable en
  un microcontrolador como una ecuación en diferencias de primer orden.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 12 · Corte 3)</span>
  <p>
    Diseñar compensadores digitales de <strong>adelanto de fase</strong> (mejora transitoria) y <strong>atraso de fase</strong>
    (reducción de error estacionario) directamente en el plano \\(Z\\) mediante el método del LGR.
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
      <tr><td>1</td><td><strong>Explicar</strong> la función del compensador en adelanto (transitorio) frente al de atraso (régimen permanente).</td><td>Nivel 2 · Comprender</td></tr>
      <tr><td>2</td><td><strong>Calcular</strong> el ángulo de deficiencia de fase \\(\\phi\\) en el polo deseado \\(z_d\\).</td><td>Nivel 3 · Aplicar</td></tr>
      <tr><td>3</td><td><strong>Sintetizar</strong> \\(D(z) = K_c\\frac{z - z_0}{z - p_0}\\) y su ecuación en diferencias programable \\(u[k]\\).</td><td>Nivel 4 · Analizar</td></tr>
      <tr><td>4</td><td><strong>Validar</strong> en simulación 3D + 2D el cumplimiento de \\(M_p\\), \\(t_s\\) y esfuerzo de control \\(u[k]\\).</td><td>Nivel 5 · Evaluar</td></tr>
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
      <tr><td><strong>1. Introducción</strong></td><td>Por qué necesitamos compensación dinámica en \\(Z\\)</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA4 y verbos Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Mapa de navegación a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Deficiencia de fase, adelanto vs. atraso y laboratorio 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Servoposicionador compensado con simulador 3D + 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto guiado y 6 ejercicios con verificación inmediata</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis de diseño y rúbrica de evaluación</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas críticas sobre cancelación polo-cero y saturación</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Kuo, Franklin (IEEE) y script Python</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Puente hacia Semana 13 (Controladores PID Digitales)</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Identificar cuándo el control proporcional puro es insuficiente y se requiere un compensador D(z).`,`Recorrer los 10 apartados del módulo de compensación digital por LGR.`]});export{t as default};