import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="por-que-z">1. ¿Por qué necesitamos la Transformada Z?</h2>
<p>
  En Control I usabas la <strong>Transformada de Laplace</strong> para convertir ecuaciones diferenciales en álgebra de
  polinomios. Sin embargo, cuando un microcontrolador lee un sensor cada \\(T\\) segundos, la señal ya no fluye de manera
  continua: llega como una lista ordenada de muestras \\(x[0], x[1], x[2], \\dots\\).
</p>
<p>
  Si llevas ese tren de muestras directamente a Laplace, aparecen infinitas exponenciales \\(e^{-skT}\\). Factorizar o
  analizar ese tipo de expresiones es incómodo. La <strong>Transformada Z</strong> resuelve el problema con un cambio de
  variable limpio: agrupa toda la información del muestreo en una sola variable compleja \\(z\\).
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Idea central — Mapeo conforme \\(z = e^{sT}\\)</span>
  <p>
    Al definir \\(z = e^{sT}\\) (y por tanto \\(z^{-1} = e^{-sT}\\)), cada retardo de un período de muestreo \\(T\\) deja de ser
    una exponencial trascendente y pasa a ser una potencia algebraica. Un sistema digital vuelve a describirse con
    <strong>polinomios</strong>.
  </p>
</div>

<h2 id="derivacion">2. Del sensor continuo a la serie en \\(z\\)</h2>
<p>Observa cómo se conectan los tres niveles del sistema en tres pasos:</p>
<ol>
  <li>
    <strong>Muestreo ideal (mundo físico):</strong> tomamos el valor de \\(x(t)\\) en los instantes \\(t = kT\\):
    \\[ x^*(t) = \\sum_{k=0}^{\\infty} x(kT)\\,\\delta(t - kT) \\]
  </li>
  <li>
    <strong>Paso por Laplace (puente matemático):</strong> cada impulso desplazado aporta un factor \\(e^{-skT}\\):
    \\[ X^*(s) = \\sum_{k=0}^{\\infty} x(kT)\\,e^{-skT} \\]
  </li>
  <li>
    <strong>Sustitución \\(z = e^{sT}\\) (dominio discreto):</strong> escribimos \\(x[k] = x(kT)\\) y obtenemos la
    <strong>Transformada Z unilateral</strong>:
    \\[ X(z) = \\mathcal{Z}\\{x[k]\\} = \\sum_{k=0}^{\\infty} x[k]\\,z^{-k} \\]
  </li>
</ol>

<h2 id="memoria">3. Qué significa \\(z^{-1}\\) en tu microcontrolador</h2>
<p>
  Más allá de la matemática, \\(z^{-1}\\) tiene un significado físico inmediato en ingeniería mecatrónica:
  <strong>es una casilla de memoria que guarda la muestra del ciclo anterior</strong>.
</p>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Traducción directa a firmware (ESP32, STM32, Arduino)</span>
  <p>
    Cuando una relación discreta dice \\(y[k] = 0.8\\,y[k-1] + u[k]\\), el término \\(y[k-1]\\) corresponde a \\(z^{-1}Y(z)\\).
    En código C, ese operador se reduce a conservar una variable entre iteraciones de la interrupción periódica:
  </p>
</div>
<pre class="no-math"><code>// Ejecutado cada T segundos dentro del timer:
y = 0.8f * y_prev + u;
y_prev = y;  // Este registro implementa z^-1</code></pre>

<h2 id="laboratorio-muestreo">4. Laboratorio: efecto del período de muestreo \\(T\\)</h2>
<p>
  Mueve el deslizador de \\(T\\) y observa dos efectos conectados: al aumentar \\(T\\), pierdes resolución temporal sobre la
  curva continua \\(e(t)\\) y los polos discretos \\(p_i = e^{s_i T}\\) se acercan al origen. Al reducir \\(T\\), las muestras
  siguen fielmente la señal y los polos se aproximan al borde \\(z = 1\\).
</p>
<div data-viz="muestreo" data-preset="base"></div>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Lectura sistémica del mapeo \\(z = e^{sT}\\)</span>
  <p>
    Todo el semiplano izquierdo estable de Laplace (\\(\\operatorname{Re}\\{s\\} &lt; 0\\)) queda comprimido
    <strong>dentro del círculo unitario</strong> \\(|z| &lt; 1\\). El eje imaginario \\(j\\omega\\) se enrolla sobre la
    circunferencia \\(|z| = 1\\).
  </p>
</div>
`,objetivos:[`Explicar por qué el mapeo z = e^{sT} convierte exponenciales de Laplace en polinomios discretos.`,`Interpretar el operador z⁻¹ como un registro de memoria de un período de muestreo en un microcontrolador.`,`Relacionar el período de muestreo T con la fidelidad de las muestras y la posición de los polos en el plano Z.`],presets:{base:{params:{T:.1,tMax:2.5,mostrarContinua:!0}}}});export{t as default};