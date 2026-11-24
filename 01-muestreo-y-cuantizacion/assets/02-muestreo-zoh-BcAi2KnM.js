import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="muestreo-periodico">1. Muestreo periódico: fotografiar el movimiento</h2>
<p>
  Un procesador digital no lee el tiempo de forma continua; toma muestras a intervalos fijos de \\(T\\) segundos. A ese
  intervalo lo llamamos <strong>periodo de muestreo</strong>, y a su inverso, <strong>frecuencia de muestreo</strong>:
</p>
\\[ x[k] = x(kT), \\qquad f_s = \\frac{1}{T}\\ [\\text{Hz}], \\qquad \\omega_s = \\frac{2\\pi}{T}\\ [\\text{rad/s}] \\]
<p>
  Aquí \\(k \\in \\{0, 1, 2, \\dots\\}\\) es el índice de la muestra. Elegir \\(T\\) es un equilibrio sistémico:
</p>
<ul>
  <li>
    Si \\(T\\) es <strong>demasiado grande</strong> (muestreo lento), el controlador "parpadea" demasiado y pierde
    información clave de la planta; el lazo puede volverse lento o incluso inestable.
  </li>
  <li>
    Si \\(T\\) es <strong>demasiado pequeño</strong> (muestreo excesivamente rápido), exigimos más cómputo, aumentamos el
    costo del hardware y amplificamos el ruido de alta frecuencia al calcular derivadas.
  </li>
</ul>

<h2 id="nyquist-aliasing">2. Teorema de Shannon-Nyquist y aliasing</h2>
<p>
  ¿Qué tan rápido debemos muestrear como mínimo para no engañar al controlador? El teorema de
  <strong>Shannon-Nyquist</strong> fija el límite teórico:
</p>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Teorema de muestreo (Shannon-Nyquist)</span>
  <p>
    Una señal con frecuencia máxima \\(f_{\\max}\\) puede reconstruirse sin ambigüedad solo si la frecuencia de muestreo
    cumple estrictamente:
  </p>
  \\[ f_s &gt; 2\\,f_{\\max} \\]
  <p>
    A \\(f_N = f_s / 2\\) se le llama <strong>frecuencia de Nyquist</strong>. Si la señal contiene componentes por encima
    de \\(f_N\\), aparecen frecuencias falsas más bajas: el fenómeno de <strong>aliasing</strong>.
  </p>
</div>

<p>
  Cuando ocurre <em>aliasing</em>, una vibración rápida de la máquina se "disfraza" de una oscilación lenta en las
  muestras \\(x[k]\\). Una vez que el alias entra al ADC, <strong>ningún algoritmo digital puede distinguirlo</strong> de
  una señal real lenta; por eso el filtro antialiasing debe ser siempre <em>analógico</em> y ubicarse antes del ADC.
</p>
<p>
  En la práctica de control digital no trabajamos al límite de \\(2 f_{\\max}\\): para mantener un buen margen de fase y
  una respuesta transitoria suave, suele elegirse \\(f_s\\) entre <strong>10 y 30 veces</strong> el ancho de banda del
  lazo cerrado (Ogata; Franklin et al.).
</p>

<h2 id="retenedor-zoh">3. Reconstrucción con Retenedor de Orden Cero (ZOH)</h2>
<p>
  Cuando el controlador calcula un nuevo comando \\(u[k]\\), la planta necesita una señal continua \\(u(t)\\). El circuito
  más usado en DAC industriales es el <strong>Retenedor de Orden Cero (ZOH)</strong>: mantiene constante el último valor
  calculado hasta que llega la siguiente muestra:
</p>
\\[ u(t) = u(kT), \\qquad kT \\le t &lt; (k+1)T \\]
<p>Su modelo dinámico en el dominio de Laplace es:</p>
\\[ G_{\\mathrm{ZOH}}(s) = \\frac{1 - e^{-sT}}{s} \\]

<div class="callout callout--def" role="note">
  <span class="callout__title">Efecto sistémico del ZOH — Retardo de fase</span>
  <p>
    Mantener la señal constante durante \\(T\\) segundos equivale, en promedio, a introducir un
    <strong>retardo puro de \\(T/2\\) segundos</strong> en el lazo cerrado. Ese retardo consume margen de fase: cuanto más
    grande es \\(T\\), más cerca queda el sistema de oscilar o inestabilizarse.
  </p>
</div>

<h2 id="laboratorio-muestreo">4. Laboratorio interactivo: muestreo, Nyquist y ZOH</h2>
<p>
  Mueve \\(f_0\\) y \\(f_s\\) en el panel derecho. Prueba bajar \\(f_s\\) por debajo de \\(2 f_0\\) para ver cómo aparece la
  <strong>onda alias</strong> (línea roja punteada) atravesando exactamente las mismas muestras \\(x[k]\\).
</p>

<div data-viz="muestreoZOH" data-preset="base"></div>

<details class="disclosure">
  <summary>Experimento guiado (2 minutos)</summary>
  <div>
    <ol>
      <li>Deja \\(f_0 = 2\\ \\text{Hz}\\) y sube \\(f_s\\) a \\(40\\ \\text{Hz}\\): observa cómo los escalones del ZOH casi calcan la curva continua y el retardo medio baja a \\(12.5\\ \\text{ms}\\).</li>
      <li>Baja \\(f_s\\) exactamente a \\(4\\ \\text{Hz}\\) (\\(f_s = 2f_0\\)): estás en el límite crítico de Nyquist.</li>
      <li>Baja \\(f_s\\) a \\(2.5\\ \\text{Hz}\\) (\\(f_s &lt; 2f_0\\)): aparece una onda falsa de \\(0.5\\ \\text{Hz}\\) que pasa por todos los puntos muestreados.</li>
    </ol>
  </div>
</details>
`,objetivos:[`Relacionar el periodo de muestreo T con la frecuencia de muestreo f_s y el criterio práctico de selección en control.`,`Aplicar el teorema de Shannon-Nyquist para identificar cuándo ocurre aliasing y cuál es la frecuencia aparente.`,`Explicar el funcionamiento del retenedor de orden cero (ZOH) y su efecto de retardo medio T/2 sobre la estabilidad.`],presets:{base:{params:{fSenal:2,fs:16,amplitud:4,duracion:1,mostrarZOH:!0,mostrarAlias:!0}}}});export{t as default};