import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1 (Introducción), 2 (Resultados de Aprendizaje) y 3 (Índice) -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  Al iniciar el <strong>Segundo Corte Evaluativo</strong> de <strong>MEC36 — Control II</strong>, damos el salto desde
  la manipulación algebraica de secuencias discretas hacia el análisis frecuencial y físico de la interfaz entre una
  planta continua y un controlador digital. En sistemas mecatrónicos industriales —como reactores térmicos,
  servomecanismos de precisión o accionamientos eléctricos— el convertidor analógico-digital (ADC) y el retenedor de
  orden cero (DAC/ZOH) no son bloques ideales transparentes: modifican el espectro de la señal e introducen retardos
  de fase que condicionan directamente la estabilidad en lazo cerrado.
</p>
<p>
  Si el periodo de muestreo \\(T\\) se escoge demasiado grande, el ruido de alta frecuencia (por ejemplo, interferencia
  de \\(60\\ \\text{Hz}\\) de la red eléctrica o conmutación PWM) se <em>pliega</em> hacia las bajas frecuencias generando
  <strong>aliasing</strong>, mientras que el retenedor ZOH consume margen de fase y puede llevar a la oscilación
  sostenida o inestabilidad. En este módulo formalizamos ambos fenómenos para seleccionar \\(T\\) y diseñar el filtro
  antialiasing con rigor de ingeniería.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 6 · Corte 2)</span>
  <p>
    Establecer el modelo matemático del muestreador ideal por impulsos, demostrar el Teorema de Muestreo de
    Shannon-Nyquist y cuantificar la respuesta en frecuencia del Retenedor de Orden Cero (ZOH) antes de formular
    funciones de transferencia de pulso en la Semana 7.
  </p>
</div>

<h2 id="resultados-aprendizaje">2. Resultados de aprendizaje</h2>
<p>
  Este módulo aporta directamente al Resultado de Aprendizaje <strong>MEC36-RA3</strong> (<em>Analizar en el plano Z
  los sistemas de control en tiempo discreto</em>) y al criterio de evaluación <strong>CE1</strong> (<em>Seleccionar el
  tiempo de muestreo del sistema utilizando métodos adecuados</em>). Al finalizar el estudio, el estudiante será capaz de:
</p>

<div class="table-wrap">
  <table>
    <caption>Resultados de aprendizaje específicos (Taxonomía de Bloom)</caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Resultado de aprendizaje</th>
        <th scope="col">Nivel Bloom</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><strong>Explicar</strong> la naturaleza matemática del muestreo por impulsos y la periodicidad de su espectro en frecuencia.</td>
        <td>Nivel 2 · Comprender</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>Determinar</strong> la frecuencia mínima de muestreo y la frecuencia aparente de alias aplicando el Teorema de Shannon-Nyquist.</td>
        <td>Nivel 3 · Aplicar</td>
      </tr>
      <tr>
        <td>3</td>
        <td><strong>Modelar</strong> la función de transferencia, magnitud tipo \\(\\mathrm{sinc}\\) y desfase lineal del Retenedor de Orden Cero (ZOH).</td>
        <td>Nivel 4 · Analizar</td>
      </tr>
      <tr>
        <td>4</td>
        <td><strong>Diseñar</strong> el periodo de muestreo \\(T\\) y el filtro analógico antialiasing para una planta de control mecatrónico.</td>
        <td>Nivel 5 · Sintetizar</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="indice">3. Índice y mapa de navegación</h2>
<p>
  El sitio está organizado en cinco capítulos progresivos que cubren los <strong>10 apartados académicos</strong> del
  módulo. Puedes navegar directamente a cada sección desde la siguiente guía:
</p>

<div class="table-wrap">
  <table>
    <caption>Estructura completa del módulo (10 apartados obligatorios)</caption>
    <thead>
      <tr>
        <th scope="col">Apartado</th>
        <th scope="col">Contenido principal</th>
        <th scope="col">Ubicación</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Introducción</strong></td>
        <td>Motivación industrial del muestreo y relevancia en control digital</td>
        <td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td>
      </tr>
      <tr>
        <td><strong>2. Resultados de aprendizaje</strong></td>
        <td>Alineación curricular MEC36-RA3 y tabla de verbos Bloom</td>
        <td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td>
      </tr>
      <tr>
        <td><strong>3. Índice</strong></td>
        <td>Mapa interactivo anclado a cada sección del módulo</td>
        <td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td>
      </tr>
      <tr>
        <td><strong>4. Desarrollo de sección</strong></td>
        <td>Muestreo por impulsos, Nyquist, aliasing, ZOH y laboratorio 2D</td>
        <td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td>
      </tr>
      <tr>
        <td><strong>5. Ejemplo o caso práctico</strong></td>
        <td>Reactor exotérmico continuo con simulador sincronizado 3D + 2D</td>
        <td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td>
      </tr>
      <tr>
        <td><strong>6. Actividad de aprendizaje</strong></td>
        <td>Reto práctico guiado y 6 ejercicios con corrección automática</td>
        <td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td>
      </tr>
      <tr>
        <td><strong>7. Resumen y conclusiones</strong></td>
        <td>Síntesis de ecuaciones críticas y rúbrica de verificación</td>
        <td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td>
      </tr>
      <tr>
        <td><strong>8. Preguntas y discusión</strong></td>
        <td>Cuestionario de pensamiento crítico e ingeniería mecatrónica</td>
        <td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td>
      </tr>
      <tr>
        <td><strong>9. Bibliografía y recursos</strong></td>
        <td>Ogata, Franklin, Fadali, Åström (IEEE) y script de laboratorio Python</td>
        <td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td>
      </tr>
      <tr>
        <td><strong>10. Cierre</strong></td>
        <td>Conexión directa con Semana 7 (Función de transferencia de pulso)</td>
        <td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td>
      </tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender la importancia del análisis frecuencial en el lazo de control digital (Corte 2 · RA3).`,`Identificar los cuatro resultados de aprendizaje medibles de la Semana 6.`,`Recorrer la estructura de los 10 apartados del módulo y sus laboratorios interactivos.`]});export{t as default};