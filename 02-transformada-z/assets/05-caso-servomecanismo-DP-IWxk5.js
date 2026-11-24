import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="enunciado">1. El problema en un lazo de control real</h2>
<p>
  Conectemos todo lo visto en un caso de ingeniería mecatrónica. Imagina un servomecanismo de posición angular al que le
  ordenas un cambio de referencia en escalón. Su señal de error continuo en lazo cerrado evoluciona según:
</p>
\\[ e(t) = 4\\,e^{-2t} - 3\\,e^{-5t} \\qquad (t \\ge 0) \\]
<p>
  El microcontrolador lee el encoder mediante una interrupción periódica a frecuencia de muestreo
  \\(f_s = 10\\ \\text{Hz}\\), es decir, \\(T = 0.1\\ \\text{s}\\). Queremos pasar del mundo físico al dominio Z y verificar los
  valores límite del error.
</p>

<h2 id="desarrollo">2. Desarrollo sistemático en 4 pasos</h2>

<h3>Paso 1 — Obtener la secuencia muestreada \\(e[k]\\)</h3>
<p>Sustituimos \\(t = kT = 0.1\\,k\\) en la señal continua:</p>
\\[ a_1 = e^{-2(0.1)} = e^{-0.2} \\approx 0.81873, \\qquad a_2 = e^{-5(0.1)} = e^{-0.5} \\approx 0.60653 \\]
\\[ e[k] = 4\\,(0.81873)^k - 3\\,(0.60653)^k \\qquad (k \\ge 0) \\]
<p>
  Ambas bases están en \\((0, 1)\\): esto anticipa que el error caerá de manera suave, sin alternancias de signo.
</p>

<h3>Paso 2 — Calcular \\(E(z)\\) y su ROC</h3>
<p>Por linealidad y usando la transformada de la secuencia geométrica \\(\\mathcal{Z}\\{a^k\\} = \\dfrac{z}{z - a}\\):</p>
\\[ E(z) = \\frac{4z}{z - 0.81873} - \\frac{3z}{z - 0.60653} = \\frac{z(z + 0.02997)}{z^2 - 1.42526\\,z + 0.49658} \\]
<div class="callout callout--thm" role="note">
  <span class="callout__title">Lectura geométrica del sistema</span>
  <p>
    Polos reales en \\(p_1 = 0.81873\\) y \\(p_2 = 0.60653\\); ceros en \\(z = 0\\) y \\(z_0 = -0.02997\\). Como la señal es
    causal, la región de convergencia queda fijada por el polo más externo: \\(\\text{ROC}: |z| &gt; 0.81873\\). Al incluir
    \\(|z| = 1\\), el error es estable.
  </p>
</div>

<h3>Paso 3 — Comprobar el arranque con el TVI</h3>
\\[ e[0] = \\lim_{z \\to \\infty} \\frac{z^2 + 0.02997\\,z}{z^2 - 1.42526\\,z + 0.49658} = 1.0 \\]
<p>Si evalúas directamente en el tiempo, \\(e(0) = 4e^0 - 3e^0 = 1.0\\). Coincidencia exacta.</p>

<h3>Paso 4 — Comprobar el régimen permanente con el TVF</h3>
<p>
  Primero verificamos la condición de validez: los polos de \\((1 - z^{-1})E(z)\\) son \\(0.81873\\) y \\(0.60653\\), ambos
  estrictamente menores que \\(1\\). Podemos aplicar el TVF con seguridad:
</p>
\\[ e[\\infty] = \\lim_{z \\to 1} \\left(\\frac{z - 1}{z}\\right) \\frac{z(z + 0.02997)}{(z - 0.81873)(z - 0.60653)} = 0.0 \\]
<p>El error de posición en estado estacionario se anula por completo: el actuador alcanza la referencia deseada.</p>

<h2 id="simulacion-servo">3. Simulación interactiva del error \\(e[k]\\)</h2>
<p>
  Varía el período de muestreo \\(T\\) para observar cómo cambian los polos discretos \\(p_1, p_2\\), la expresión racional
  \\(E(z)\\) y la velocidad en muestras con la que el servomecanismo extingue el error.
</p>
<div data-viz="errorServomecanismo" data-preset="base"></div>
`,objetivos:[`Discretizar una señal de error continua mediante sustitución t = kT y calcular sus bases exponenciales.`,`Obtener la función racional E(z), sus polos, ceros y Región de Convergencia.`,`Validar el comportamiento inicial y estacionario de un servomecanismo usando el TVI y el TVF.`],presets:{base:{params:{T:.1,N:28}}}});export{t as default};