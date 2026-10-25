import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="por-que">1. ¿Por qué ecuaciones en diferencias?</h2>
<p>
  Un controlador digital no ve señales continuas: ve <strong>números</strong> que llegan cada \\(T\\) segundos desde un
  convertidor analógico-digital (ADC), calcula con ellos y entrega otro número al convertidor digital-analógico (DAC),
  que lo mantiene constante hasta la siguiente muestra (retenedor de orden cero, ZOH).
</p>
<div class="table-wrap">
  <table>
    <caption class="visually-hidden">Lazo de control digital</caption>
    <thead>
      <tr><th scope="col">Etapa</th><th scope="col">Qué hace</th><th scope="col">Señal</th></tr>
    </thead>
    <tbody>
      <tr><td>Sensor + ADC</td><td>Mide la planta cada \\(T\\) segundos</td><td>\\(y(kT) \\to y[k]\\)</td></tr>
      <tr><td>Algoritmo (CPU)</td><td>Combina muestras actuales y pasadas</td><td>\\(u[k] = f\\big(e[k], e[k-1], u[k-1], \\dots\\big)\\)</td></tr>
      <tr><td>DAC + ZOH</td><td>Mantiene \\(u[k]\\) constante durante un periodo</td><td>\\(u(t) = u[k],\\; kT \\le t &lt; (k+1)T\\)</td></tr>
    </tbody>
  </table>
</div>
<p>
  La regla que usa la CPU para pasar de muestras pasadas a la muestra actual es una <strong>ecuación en
  diferencias</strong>. Es el equivalente discreto de una ecuación diferencial: en lugar de derivadas
  \\(\\dot y(t)\\), relaciona valores en instantes vecinos \\(y[k], y[k-1], y[k-2], \\dots\\)
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Definición — secuencia discreta</span>
  <p>
    Una <strong>secuencia</strong> \\(x[k]\\) es una lista de números indexada por el entero \\(k\\) (el número de
    muestra). Cuando proviene de muestrear una señal continua con periodo \\(T\\), \\(x[k] = x(kT)\\). Escribimos los
    corchetes para recordar que \\(k\\) solo toma valores enteros.
  </p>
</div>

<h2 id="primer-ejemplo">2. Un primer ejemplo: promediar para filtrar ruido</h2>
<p>
  Un sensor de posición entrega lecturas ruidosas \\(u[k]\\). Un filtro digital sencillo mezcla la lectura nueva con la
  estimación anterior:
</p>
\\[ y[k] = 0.8\\,y[k-1] + 0.2\\,u[k] \\qquad\\Longleftrightarrow\\qquad y[k] - 0.8\\,y[k-1] = 0.2\\,u[k] \\]
<p>
  Con \\(y[-1] = 0\\) y una entrada escalón \\(u[k] = 1\\): \\(y[0] = 0.2\\), \\(y[1] = 0.36\\), \\(y[2] = 0.488\\), … La salida
  sube hacia 1 siguiendo \\(y[k] = 1 - 0.8^{\\,k+1}\\): el coeficiente \\(0.8\\) decide <em>qué tan rápido</em> se olvida el
  pasado. Ese número es el <strong>polo</strong> del sistema, y lo estudiaremos a fondo en los próximos capítulos.
</p>

<h2 id="clasificacion">3. Clasificación</h2>
<ul>
  <li><strong>Orden:</strong> el mayor retardo de la salida. \\(y[k] - 0.8\\,y[k-1] = 0.2\\,u[k]\\) es de primer orden.</li>
  <li><strong>Lineal:</strong> \\(y\\) y \\(u\\) aparecen solo multiplicados por constantes y sumados (sin \\(y^2\\), \\(\\sin y\\), …). Vale la superposición.</li>
  <li><strong>Invariante en el tiempo:</strong> los coeficientes no dependen de \\(k\\). Retrasar la entrada solo retrasa la salida.</li>
  <li><strong>Homogénea / no homogénea:</strong> es homogénea si el lado derecho es cero (\\(u[k] = 0\\)): solo actúan las condiciones iniciales.</li>
</ul>

<h2 id="secuencias">4. Secuencias elementales</h2>
<p>
  Toda entrada de interés se construye con unas pocas secuencias básicas. Las más usadas en control son el impulso
  \\(\\delta[k]\\), el escalón \\(u[k]\\), la rampa \\(k\\,u[k]\\) y la exponencial \\(a^{k}u[k]\\). Explóralas y observa el
  efecto del <strong>retardo</strong> \\(x[n-n_0]\\): desplaza la secuencia \\(n_0\\) muestras a la derecha sin cambiar su
  forma. Ese es exactamente el operador \\(z^{-n_0}\\) que usaremos después.
</p>
<div data-viz="secuencias" data-preset="senales"></div>
<ul>
  <li>Con la exponencial, prueba \\(a = 0.8\\), \\(a = -0.8\\) y \\(a = 1.05\\): decaimiento monótono, alternado y crecimiento.</li>
  <li>Con la oscilación amortiguada, \\(a\\) controla la envolvente y \\(\\Omega\\) la frecuencia en <em>radianes por muestra</em>.</li>
</ul>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Idea clave</span>
  <p>
    Las exponenciales \\(a^{k}\\) son las “funciones propias” de las ecuaciones en diferencias lineales: si entra una
    exponencial, sale una exponencial de la misma base. Por eso la respuesta libre de cualquier sistema LTI discreto es
    una suma de términos \\(p_i^{\\,k}\\), donde los \\(p_i\\) son sus polos.
  </p>
</div>

<h2 id="ruta">5. Ruta del módulo</h2>
<ol>
  <li><a href="#/capitulo/02-representacion">Representación</a>: forma recursiva, operador \\(z^{-1}\\), polos y ceros.</li>
  <li><a href="#/capitulo/03-interpretacion">Interpretación física</a>: de la planta continua a la ecuación (ZOH).</li>
  <li><a href="#/capitulo/04-solucion">Solución</a>: recursión, transformada Z con condiciones iniciales y convolución.</li>
  <li><a href="#/capitulo/05-aplicaciones">Aplicaciones</a>: estabilidad, lugar de raíces, Bode, Nyquist y estados.</li>
  <li><a href="#/capitulo/06-ejercicios">Ejercicios</a> y <a href="#/capitulo/07-ejemplos">ejemplos resueltos</a>.</li>
</ol>
`,objetivos:[`Explicar por qué un controlador digital se describe con una ecuación en diferencias.`,`Distinguir orden, linealidad e invarianza en el tiempo.`,`Reconocer las secuencias elementales y el efecto de un retardo \\(x[n-n_0]\\).`],presets:{senales:{params:{modo:`senal`,tipo:`exponencial`,a:.8,n0:3},hideControls:[`modo`]}}});export{t as default};