import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="muestreo">1. De la planta continua a la ecuación en diferencias</h2>
<p>
  La planta física (un motor, un tanque, un brazo) obedece una ecuación diferencial. El controlador digital solo la
  observa en los instantes \\(t = kT\\) y solo puede aplicarle entradas constantes por tramos (ZOH). La pregunta es:
  <em>¿qué relación hay entre \\(u[k]\\) y \\(y[k]\\)?</em> La respuesta es una ecuación en diferencias exacta, llamada
  <strong>equivalente ZOH</strong> de la planta.
</p>

<h3>Ejemplo de primer orden</h3>
<p>Sea la planta \\(\\dot y(t) = -a\\,y(t) + b\\,u(t)\\). Si \\(u(t) = u[k]\\) es constante en \\(kT \\le t &lt; (k+1)T\\), resolver la ecuación diferencial en ese intervalo da exactamente:</p>
\\[ y[k+1] = e^{-aT}\\,y[k] + \\frac{b}{a}\\left(1 - e^{-aT}\\right) u[k] \\]
<p>
  Es una ecuación en diferencias de primer orden con polo \\(p = e^{-aT}\\). No es una aproximación: coincide con la
  planta en cada instante de muestreo.
</p>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Propiedad — mapeo de polos \\(z = e^{sT}\\)</span>
  <p>
    Un polo continuo en \\(s\\) se convierte en un polo discreto en \\(z = e^{sT}\\). Para un par subamortiguado
    \\(s = -\\zeta\\omega_n \\pm j\\omega_d\\):
  </p>
  \\[ |z| = e^{-\\zeta\\omega_n T}, \\qquad \\angle z = \\pm\\,\\omega_d T \\]
  <p>
    El semiplano izquierdo (\\(\\operatorname{Re}\\{s\\} &lt; 0\\)) se mapea al interior del círculo unitario
    (\\(|z| &lt; 1\\)), y el eje imaginario, al propio círculo. Por eso la estabilidad discreta se lee con
    \\(|p_i| &lt; 1\\).
  </p>
</div>

<h2 id="zoh">2. Comparación continuo vs. discreto</h2>
<p>
  La gráfica siguiente parte de la planta de segundo orden \\(G(s) = \\omega_n^2/(s^2 + 2\\zeta\\omega_n s + \\omega_n^2)\\),
  la discretiza con ZOH y simula la ecuación en diferencias resultante. Observa que <strong>las muestras \\(y[k]\\)
  caen exactamente sobre \\(y(t)\\)</strong>, para cualquier \\(T\\). Lo que se pierde al aumentar \\(T\\) es
  <em>información entre muestras</em>, no exactitud en ellas.
</p>
<div data-viz="respuestaEscalon" data-preset="planta"></div>
<ul>
  <li>Aumenta \\(T\\) hasta \\(0.6\\,\\text{s}\\): el sobrepaso real ocurre entre dos muestras y el controlador no lo “ve”.</li>
  <li>Cambia al modo <em>Coeficientes</em> para escribir la ecuación directamente; la traza continua pasa a ser la salida escalonada del ZOH.</li>
  <li>Regla práctica (Ogata): elegir \\(T\\) para tener entre 8 y 10 muestras por ciclo de la oscilación amortiguada.</li>
</ul>

<h2 id="aproximaciones">3. Discretizaciones aproximadas</h2>
<p>
  En el diseño por emulación (diseñar en \\(s\\) y luego llevar el controlador al microcontrolador) se usan sustituciones
  algebraicas de \\(s\\):
</p>
<div class="table-wrap">
  <table>
    <caption class="visually-hidden">Métodos de discretización</caption>
    <thead>
      <tr><th scope="col">Método</th><th scope="col">Sustitución</th><th scope="col">Propiedad</th></tr>
    </thead>
    <tbody>
      <tr><td>Euler hacia adelante</td><td>\\(s \\approx \\dfrac{z - 1}{T}\\)</td><td>Simple; puede volver inestable una planta estable si \\(T\\) es grande.</td></tr>
      <tr><td>Euler hacia atrás</td><td>\\(s \\approx \\dfrac{z - 1}{T\\,z}\\)</td><td>Siempre conserva la estabilidad.</td></tr>
      <tr><td>Tustin (bilineal)</td><td>\\(s \\approx \\dfrac{2}{T}\\,\\dfrac{z - 1}{z + 1}\\)</td><td>Mapea exactamente el semiplano izquierdo en el círculo unitario; distorsiona la frecuencia.</td></tr>
      <tr><td>ZOH (exacta)</td><td>\\(G(z) = (1 - z^{-1})\\,\\Z{\\dfrac{G(s)}{s}}\\)</td><td>Exacta en los instantes de muestreo para entradas escalonadas.</td></tr>
    </tbody>
  </table>
</div>
<div class="callout callout--warn" role="note">
  <span class="callout__title">Atención — Euler y la estabilidad</span>
  <p>
    Con Euler hacia adelante, \\(\\dot y = -a y + b u\\) se convierte en \\(y[k+1] = (1 - aT)\\,y[k] + bT\\,u[k]\\). El polo
    \\(1 - aT\\) sale del círculo unitario si \\(T &gt; 2/a\\): una planta estable produce una simulación inestable. El
    equivalente ZOH, con polo \\(e^{-aT}\\), nunca tiene ese problema.
  </p>
</div>

<h2 id="superficie">4. Lo que “ve” la función de transferencia: \\(|G(z)|\\)</h2>
<p>
  \\(G(z)\\) es una función de variable compleja. Si dibujamos su módulo sobre el plano \\(z\\) obtenemos una superficie:
  se dispara en los polos y se anula en los ceros. Recorrer esa superficie sobre el círculo unitario,
  \\(z = e^{j\\Omega}\\), es evaluar la <strong>respuesta en frecuencia</strong> del sistema: \\(\\Omega = 0\\) corresponde
  a la ganancia en continua \\(G(1)\\) y \\(\\Omega = \\pi\\) a la frecuencia de Nyquist (media frecuencia de muestreo).
</p>
<div data-viz="superficieMagnitud"></div>
<ul>
  <li>Acerca los polos al círculo (\\(a_2 \\to 0.9\\)): la “chimenea” atraviesa la curva amarilla y aparece un pico de resonancia.</li>
  <li>Coloca un cero sobre el círculo (\\(b_0 = 1,\\ b_1 = 1\\) pone un cero en \\(z = -1\\)): la ganancia cae a cero en \\(\\Omega = \\pi\\).</li>
  <li>Cambia a escala lineal para ver por qué casi siempre se usa escala logarítmica (decibelios).</li>
</ul>
`,objetivos:[`Obtener el equivalente ZOH de una planta de primer orden y explicar por qué es exacto en los instantes de muestreo.`,`Aplicar el mapeo \\(z = e^{sT}\\) para relacionar polos continuos y discretos.`,`Comparar Euler, Tustin y ZOH, y reconocer el riesgo de inestabilidad numérica.`,`Interpretar \\(|G(z)|\\) sobre el plano complejo y su relación con la respuesta en frecuencia.`],presets:{planta:{params:{modo:`planta`,zeta:.35,wn:4,T:.15,tFinal:4}}}});export{t as default};