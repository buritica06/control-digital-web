import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<h2 id="por-que">1. ¿Por qué un microcontrolador usa ecuaciones en diferencias?</h2>
<p>
  En el mundo físico, un motor DC, un horno o un circuito RC cambian de forma continua y se describen con
  <strong>ecuaciones diferenciales</strong>. Sin embargo, un microcontrolador (Arduino, STM32, DSP o PLC) no puede
  integrar ni derivar en tiempo continuo: solo ejecuta sumas y multiplicaciones cada vez que su reloj interno dispara
  una interrupción cada \\(T\\) segundos (el <strong>periodo de muestreo</strong>).
</p>
<p>
  En cada instante discreto \\(t = kT\\) (\\(k = 0, 1, 2, \\dots\\)), el lazo digital repite siempre el mismo ciclo de
  cuatro pasos:
</p>
<ol>
  <li><strong>Leer el sensor (ADC):</strong> toma una foto del voltaje \\(y(t)\\) y la guarda como el número \\(y[k]\\).</li>
  <li><strong>Calcular el error:</strong> compara la referencia deseada con la medición actual, \\(e[k] = r[k] - y[k]\\).</li>
  <li><strong>Ejecutar la ecuación en diferencias:</strong> combina el valor actual y unos pocos valores guardados en memoria para calcular la nueva orden \\(u[k]\\).</li>
  <li><strong>Actuar sobre la planta (DAC / ZOH):</strong> envía \\(u[k]\\) al actuador y mantiene ese voltaje fijo durante todo el intervalo \\([kT, (k+1)T)\\).</li>
</ol>

<div class="callout callout--def" role="note">
  <span class="callout__title">Modelo del retenedor de orden cero (ZOH)</span>
  <p>
    Mantener constante la señal entre muestras equivale a introducir un retardo promedio de \\(T/2\\) segundos. En el
    dominio de Laplace se modela como:
  </p>
  \\[ G_{h0}(s) = \\frac{1 - e^{-sT}}{s} \\]
</div>

<h2 id="eleccion-t">2. Cómo elegir el periodo de muestreo \\(T\\) sin perder el control</h2>
<p>
  El <strong>teorema de Nyquist–Shannon</strong> exige muestrear a más del doble de la frecuencia máxima
  (\\(\\omega_s &gt; 2\\omega_{\\text{máx}}\\)) para evitar el <em>aliasing</em>. En control digital ese mínimo no basta:
  si \\(T\\) es demasiado grande, el retardo \\(T/2\\) del retenedor ZOH reduce el margen de fase y vuelve lento o
  inestable al sistema.
</p>

<div class="table-wrap">
  <table>
    <caption>Reglas prácticas de ingeniería para fijar \\(T\\)</caption>
    <thead>
      <tr>
        <th scope="col">Parámetro de la planta</th>
        <th scope="col">Regla recomendada</th>
        <th scope="col">Sentido práctico</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Constante de tiempo \\(\\tau\\)</td>
        <td>\\(T \\approx \\tau / 10 \\text{ a } \\tau / 5\\)</td>
        <td>Toma entre 5 y 10 lecturas antes de que el sistema alcance el 63 %.</td>
      </tr>
      <tr>
        <td>Tiempo de subida \\(t_r\\)</td>
        <td>\\(t_r / T \\in [4, 10]\\) muestras</td>
        <td>Captura con fidelidad el arranque de la respuesta.</td>
      </tr>
      <tr>
        <td>Ancho de banda \\(\\omega_b\\)</td>
        <td>\\(\\omega_s \\approx 20\\,\\omega_b \\text{ a } 40\\,\\omega_b\\)</td>
        <td>Mantiene pequeño el desfase introducido por el ZOH.</td>
      </tr>
      <tr>
        <td>Tiempo de establecimiento \\(t_s\\)</td>
        <td>\\(t_s / T \\ge 20\\) muestras</td>
        <td>Garantiza suficiente resolución durante todo el transitorio.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Cuidado con el aliasing</span>
  <p>
    Si una interferencia de \\(9\\text{ Hz}\\) se muestrea a \\(f_s = 10\\text{ Hz}\\), produce exactamente las mismas
    muestras que una señal falsa de \\(|9 - 10| = 1\\text{ Hz}\\). Por eso siempre se instala un filtro analógico
    pasabajos <em>antialiasing</em> antes del ADC con frecuencia de corte \\(\\omega_c &lt; \\omega_s / 2\\).
  </p>
</div>

<h2 id="forma-recursiva">3. De la forma implícita al algoritmo que corre en la CPU</h2>
<p>
  Una ecuación en diferencias <strong>lineal e invariante en el tiempo (LTI)</strong> de orden \\(n\\) relaciona la
  salida actual con las \\(n\\) salidas anteriores y las \\(m\\) entradas anteriores:
</p>
\\[ y[k] + a_1 y[k-1] + \\dots + a_n y[k-n] = b_0 u[k] + b_1 u[k-1] + \\dots + b_m u[k-m] \\]
<p>
  Para programarla en C o Python, basta despejar \\(y[k]\\). Así nace la <strong>forma explícita recursiva</strong>:
</p>
\\[ y[k] = -\\sum_{i=1}^{n} a_i\\,y[k-i] + \\sum_{j=0}^{m} b_j\\,u[k-j] \\]

<ul>
  <li>
    <strong>Sistemas recursivos (IIR):</strong> al menos un \\(a_i \\neq 0\\). Usan memoria de salidas pasadas, tienen
    polos fuera del origen y pueden volverse inestables si esos polos se salen del círculo unitario.
  </li>
  <li>
    <strong>Sistemas no recursivos (FIR):</strong> todos los \\(a_i = 0\\). Solo promedian entradas pasadas, todos sus
    polos están en \\(z = 0\\) y son siempre estables.
  </li>
</ul>

<h2 id="animacion-1">4. Visualización paso a paso (Manim)</h2>
<p>
  Observa en esta animación cómo el lazo físico se traduce en la ecuación recursiva y cómo se desplazan los registros
  de memoria \\(z^{-1}\\) en cada ciclo de reloj.
</p>
<div data-manim="scene1"></div>
`,objetivos:[`Explicar por qué un sistema embebido opera mediante ecuaciones en diferencias y cómo funciona el ciclo ADC–CPU–ZOH.`,`Seleccionar un periodo de muestreo T adecuado a partir de la dinámica de la planta y prevenir el aliasing.`,`Convertir una ecuación en diferencias de forma implícita a algoritmo recursivo ejecutable y distinguir sistemas IIR de FIR.`]});export{t as default};