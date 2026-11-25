import{t as e}from"./chapter-C2599_w7.js";var t=`<h2 id="por-que">1. ¿Por qué un microcontrolador usa ecuaciones en diferencias?</h2>
<p>
  En el mundo físico, un motor DC, un horno o un circuito RC cambian de forma continua y se describen con
  <strong>ecuaciones diferenciales</strong>. Sin embargo, un microcontrolador (Arduino, STM32, DSP o PLC) no puede
  integrar ni derivar en tiempo continuo: solo ejecuta sumas y multiplicaciones cada vez que su reloj interno dispara
  una interrupción cada \\(T\\) segundos (el <strong>periodo de muestreo</strong>).
</p>

<h2 id="paso-a-paso">2. El lazo digital y la discretización, paso a paso</h2>
<p>
  Recorre las cinco etapas que transforman una planta física continua en un algoritmo que corre dentro del
  microcontrolador. Usa los botones para avanzar por cada eslabón del ciclo.
</p>

<div class="stepper" data-lazo-stepper>
  <div class="stepper__controls">
    <button type="button" class="btn btn--ghost" data-step-prev>← Anterior</button>
    <span class="stepper__k" data-step-counter>Paso 1 de 5</span>
    <button type="button" class="btn btn--primary" data-step-next>Siguiente →</button>
    <button type="button" class="btn btn--ghost" data-step-reset>Reiniciar</button>
  </div>
  <div class="stepper__calc" data-step-body aria-live="polite"></div>
  <div class="stepper__table">
    <table>
      <caption>Resumen sistémico de las 5 etapas del ciclo digital</caption>
      <thead>
        <tr>
          <th scope="col">Etapa</th>
          <th scope="col">Bloque físico / lógico</th>
          <th scope="col">Operación clave</th>
        </tr>
      </thead>
      <tbody>
        <tr data-step-row="0">
          <td><strong>1</strong></td>
          <td>Planta continua \\(G(s)\\)</td>
          <td>\\(\\tau\\dot{y}(t) + y(t) = K\\,u(t)\\)</td>
        </tr>
        <tr data-step-row="1">
          <td><strong>2</strong></td>
          <td>Muestreador + ADC</td>
          <td>\\(y[k] = y(kT)\\) cada \\(T\\) segundos</td>
        </tr>
        <tr data-step-row="2">
          <td><strong>3</strong></td>
          <td>Discretización ZOH</td>
          <td>\\(a = e^{-T/\\tau},\\; b = K(1 - a)\\)</td>
        </tr>
        <tr data-step-row="3">
          <td><strong>4</strong></td>
          <td>CPU y memoria recursiva</td>
          <td>\\(y[k] = a\\,y[k-1] + b\\,u[k-1]\\)</td>
        </tr>
        <tr data-step-row="4">
          <td><strong>5</strong></td>
          <td>DAC + Retenedor ZOH</td>
          <td>\\(u(t) = u[k]\\) en \\([kT, (k+1)T)\\)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 id="discretizacion-3d">3. Discretización y lazo digital en 3D (Three.js)</h2>
<p>
  Explora ahora todo el proceso en tres dimensiones. En el plano frontal verás los cuatro bloques del lazo cerrado con
  el pulso de señal circulando entre ellos y los registros de memoria <code>y[k-1]</code> y <code>u[k-1]</code> sobre
  la CPU; en el plano posterior se superponen la curva continua \\(y(t)\\) (azul), las muestras del ADC \\(y[k]\\)
  (amarillo) y la retención escalonada del ZOH (verde).
</p>
<p>
  Mueve el periodo de muestreo \\(T\\), la constante de tiempo \\(\\tau\\) o la ganancia \\(K\\) para observar cómo cambian al
  instante la escalera ZOH y los coeficientes \\(a\\) y \\(b\\) de la ecuación en diferencias discretizada.
</p>
<div data-viz="lazoDigital3D" data-preset="plantaBase"></div>

<div class="callout callout--def" role="note">
  <span class="callout__title">Modelo del retenedor de orden cero (ZOH)</span>
  <p>
    Mantener constante la señal entre muestras equivale a introducir un retardo promedio de \\(T/2\\) segundos. En el
    dominio de Laplace se modela como:
  </p>
  \\[ G_{h0}(s) = \\frac{1 - e^{-sT}}{s} \\]
</div>

<h2 id="eleccion-t">4. Cómo elegir el periodo de muestreo \\(T\\) sin perder el control</h2>
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

<h2 id="forma-recursiva">5. De la forma implícita al algoritmo que corre en la CPU</h2>
<p>
  En general, una ecuación en diferencias <strong>lineal e invariante en el tiempo (LTI)</strong> de orden \\(n\\)
  relaciona la salida actual con las \\(n\\) salidas anteriores y las \\(m\\) entradas anteriores:
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
`,n=String.raw,r=[{titulo:`Paso 1 · Planta física continua`,cuerpo:n`
      <p>Partimos de una planta real de primer orden (por ejemplo, un motor DC o un circuito RC con \(\tau = 0.5\text{ s}\) y \(K = 1\)):</p>
      \[ \tau\dot{y}(t) + y(t) = K\,u(t) \quad \Longleftrightarrow \quad G(s) = \frac{K}{\tau s + 1} \]
      <p>Su salida \(y(t)\) evoluciona de manera suave en el tiempo continuo, pero el microcontrolador no puede leer infinitos instantes.</p>
    `},{titulo:`Paso 2 · Muestreo periódico y conversión A/D (ADC)`,cuerpo:n`
      <p>Un reloj interno dispara una interrupción cada \(T\) segundos (por ejemplo, \(T = 0.15\text{ s}\)). En cada tick \(t = kT\), el ADC congela el voltaje del sensor y lo convierte en un número:</p>
      \[ y[k] = y(kT), \qquad k = 0, 1, 2, \dots \]
      <p>Así la curva continua se transforma en una secuencia discreta de muestras que la CPU puede guardar en memoria RAM.</p>
    `},{titulo:`Paso 3 · Discretización exacta con retenedor ZOH`,cuerpo:n`
      <p>Como el actuador mantiene \(u(t) = u[k]\) constante durante todo el intervalo \([kT, (k+1)T)\), resolvemos la ecuación diferencial exacta en un paso de duración \(T\):</p>
      \[ a = e^{-T/\tau}, \qquad b = K(1 - e^{-T/\tau}) \]
      <p>Con \(T = 0.15\text{ s}\), \(\tau = 0.5\text{ s}\) y \(K = 1\) obtenemos \(a = e^{-0.3} \approx 0.741\) y \(b \approx 0.259\).</p>
    `},{titulo:`Paso 4 · Algoritmo recursivo y memoria en la CPU`,cuerpo:n`
      <p>La ecuación diferencial desaparece y queda una <strong>ecuación en diferencias</strong> que el procesador evalúa en microsegundos usando solo dos registros de memoria (\(y[k-1]\) y \(u[k-1]\)):</p>
      \[ y[k] = a\,y[k-1] + b\,u[k-1] \]
      <p>En control en lazo cerrado, la CPU calcula primero el error \(e[k] = r[k] - y[k]\), obtiene la nueva acción \(u[k]\) y desplaza sus registros para el siguiente ciclo \(k+1\).</p>
    `},{titulo:`Paso 5 · Conversión D/A y retención escalonada (ZOH)`,cuerpo:n`
      <p>La CPU escribe \(u[k]\) en el convertidor D/A (o módulo PWM). El retenedor de orden cero sostiene ese valor firme hasta el próximo pulso de reloj:</p>
      \[ u_{\text{ZOH}}(t) = u[k] \quad \text{para } kT \le t &lt; (k+1)T \]
      <p>La planta física responde a este escalón y, al cumplirse \(t = (k+1)T\), el ADC vuelve a muestrear para cerrar el lazo.</p>
    `}];function i(e,t){let n=e.querySelector(`[data-lazo-stepper]`);if(!n)return;let i=n.querySelector(`[data-step-prev]`),a=n.querySelector(`[data-step-next]`),o=n.querySelector(`[data-step-reset]`),s=n.querySelector(`[data-step-counter]`),c=n.querySelector(`[data-step-body]`),l=[...n.querySelectorAll(`[data-step-row]`)],u=0;function d(){let e=r[u];s.textContent=`Paso ${u+1} de ${r.length}`,i.disabled=u===0,a.disabled=u===r.length-1,c.innerHTML=`<p><strong>${e.titulo}</strong></p>${e.cuerpo}`,t.renderMathIn(c),l.forEach((e,t)=>{e.querySelectorAll(`td`).forEach(e=>e.classList.toggle(`is-current`,t===u))})}i.addEventListener(`click`,()=>{u>0&&(--u,d())}),a.addEventListener(`click`,()=>{u<r.length-1&&(u+=1,d())}),o.addEventListener(`click`,()=>{u=0,d()}),l.forEach((e,t)=>{e.style.cursor=`pointer`,e.addEventListener(`click`,()=>{u=t,d()})}),d()}var a=e({html:t,objetivos:[`Explicar paso a paso cómo el ciclo ADC–CPU–ZOH traduce una planta continua en una ecuación en diferencias.`,`Visualizar en 3D la relación entre la señal continua y(t), las muestras y[k] y la retención escalonada ZOH.`,`Seleccionar un periodo de muestreo T adecuado a partir de la dinámica de la planta y distinguir sistemas IIR de FIR.`],presets:{plantaBase:{T:.15,tau:.5,K:1,etapa:`todas`,animar:!0}},setup:i});export{a as default};