import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 1: Apartados 1, 2 y 3 -->
<h2 id="introduccion">1. Introducción al tema</h2>
<p>
  En la Semana 6 analizamos por separado el muestreador ideal por impulsos y el Retenedor de Orden Cero (ZOH). Sin
  embargo, para diseñar un controlador digital en un microcontrolador o PLC necesitamos un modelo matemático compacto
  que relacione directamente las muestras de comando \\(u[k]\\) con las muestras medidas de salida \\(y[k]\\). Ese modelo
  es la <strong>Función de Transferencia de Pulso</strong> \\(G(z)\\).
</p>
<p>
  Comprender cómo se combinan el DAC/ZOH, la planta continua \\(G_p(s)\\) y el ADC es esencial en ingeniería mecatrónica:
  la ubicación física de los muestreadores cambia por completo el álgebra de bloques, y la discretización con ZOH
  introduce <em>ceros de muestreo</em> que no existían en la planta analógica original y que alteran el desempeño en
  lazo cerrado.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Propósito del módulo (Semana 7 · Corte 2)</span>
  <p>
    Derivar la función de transferencia de pulso en lazo abierto \\(G(z) = (1 - z^{-1})\\mathcal{Z}\\{G_p(s)/s\\}\\),
    aplicar correctamente las reglas del álgebra de bloques muestreados y obtener la función de transferencia en lazo
    cerrado \\(Y(z)/R(z)\\) con muestreo sincronizado.
  </p>
</div>

<h2 id="resultados-aprendizaje">2. Resultados de aprendizaje</h2>
<p>
  Este módulo desarrolla el Resultado de Aprendizaje <strong>MEC36-RA3</strong> y el criterio de evaluación
  <strong>CE2</strong> (<em>Obtener la función de transferencia de sistemas en tiempo discreto a partir de su
  equivalente en tiempo continuo</em>):
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
        <td><strong>Definir</strong> la función de transferencia de pulso para sistemas muestreados sincrónicamente.</td>
        <td>Nivel 1 · Recordar</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>Diferenciar</strong> el producto de transformadas \\(G_1(z)G_2(z)\\) frente a la transformada del producto \\(\\overline{G_1 G_2}(z)\\).</td>
        <td>Nivel 2 · Comprender</td>
      </tr>
      <tr>
        <td>3</td>
        <td><strong>Calcular</strong> analíticamente la función de transferencia de pulso en lazo abierto \\(G(z) = \\mathcal{Z}\\{G_{\\mathrm{ZOH}}(s)G_p(s)\\}\\).</td>
        <td>Nivel 3 · Aplicar</td>
      </tr>
      <tr>
        <td>4</td>
        <td><strong>Deducir</strong> la función de transferencia y la ecuación característica de lazo cerrado \\(Y(z)/R(z)\\).</td>
        <td>Nivel 4 · Analizar</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="indice">3. Índice y mapa de navegación</h2>
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
      <tr><td><strong>1. Introducción</strong></td><td>Motivación del modelado discreto entrada-salida</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Introducción</a></td></tr>
      <tr><td><strong>2. Resultados de aprendizaje</strong></td><td>Alineación MEC36-RA3 / CE2 y verbos Bloom</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Resultados</a></td></tr>
      <tr><td><strong>3. Índice</strong></td><td>Navegación anclada a los 10 apartados</td><td><a href="#/capitulo/01-introduccion">Cap. 1 · Índice</a></td></tr>
      <tr><td><strong>4. Desarrollo de sección</strong></td><td>Deducción de \\(G(z)\\), álgebra muestreada, lazo cerrado y lab 2D</td><td><a href="#/capitulo/02-desarrollo-teorico">Cap. 2 · Desarrollo teórico</a></td></tr>
      <tr><td><strong>5. Ejemplo o caso práctico</strong></td><td>Servomotor DC \\(G_p(s)=10/[s(s+2)]\\) con simulador 3D + 2D</td><td><a href="#/capitulo/03-caso-practico">Cap. 3 · Caso práctico 3D</a></td></tr>
      <tr><td><strong>6. Actividad de aprendizaje</strong></td><td>Reto práctico guiado y 6 ejercicios con corrección automática</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Actividades</a></td></tr>
      <tr><td><strong>7. Resumen y conclusiones</strong></td><td>Síntesis de propiedades de polos, ceros y comportamiento intermuestral</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Cierre</a></td></tr>
      <tr><td><strong>8. Preguntas y discusión</strong></td><td>Preguntas de pensamiento crítico sobre discretización y muestreo</td><td><a href="#/capitulo/04-actividades">Cap. 4 · Discusión</a></td></tr>
      <tr><td><strong>9. Bibliografía y recursos</strong></td><td>Ogata, Kuo, Franklin, Åström (IEEE) y script Python <code>control.c2d</code></td><td><a href="#/capitulo/05-cierre">Cap. 5 · Bibliografía</a></td></tr>
      <tr><td><strong>10. Cierre</strong></td><td>Conexión con Semana 8 (Correspondencia entre los planos S y Z)</td><td><a href="#/capitulo/05-cierre">Cap. 5 · Siguiente sesión</a></td></tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Comprender el papel de la función de transferencia de pulso G(z) en el modelado de plantas continuas.`,`Identificar los objetivos Bloom asociados a MEC36-RA3 y CE2.`,`Explorar la estructura de los 10 apartados del módulo.`]});export{t as default};