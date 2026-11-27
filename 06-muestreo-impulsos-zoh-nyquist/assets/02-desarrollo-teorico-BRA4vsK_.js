import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="muestreo-impulsos">4.1 El muestreador ideal por impulsos</h2>
<p>
  En el análisis formal de sistemas de control digital, la captura periódica de una señal continua \\(x(t)\\) cada
  \\(T\\) segundos se modela mediante un <strong>muestreador ideal por impulsos</strong> que multiplica la señal por un
  tren periódico de deltas de Dirac \\(\\delta_T(t)\\):
</p>
\\[
  x^*(t) = x(t)\\cdot \\delta_T(t) = x(t)\\sum_{k=-\\infty}^{\\infty} \\delta(t - kT) = \\sum_{k=-\\infty}^{\\infty} x(kT)\\,\\delta(t - kT)
\\]
<p>
  Como \\(\\delta_T(t)\\) es periódico con periodo \\(T\\) y frecuencia angular de muestreo \\(\\omega_s = \\frac{2\\pi}{T}\\),
  admite la siguiente expansión en <strong>Serie Compleja de Fourier</strong>:
</p>
\\[
  \\delta_T(t) = \\frac{1}{T}\\sum_{n=-\\infty}^{\\infty} e^{j n \\omega_s t}
\\]
<p>
  Sustituyendo esta serie en \\(x^*(t)\\) y aplicando la propiedad de desplazamiento en frecuencia de la Transformada de
  Fourier, se obtiene el espectro exacto de la señal muestreada:
</p>
\\[
  X^*(j\\omega) = \\mathcal{F}\\!\\left\\{ x(t)\\,\\frac{1}{T}\\sum_{n=-\\infty}^{\\infty} e^{j n \\omega_s t} \\right\\}
  = \\frac{1}{T}\\sum_{n=-\\infty}^{\\infty} X\\!\\left(j(\\omega - n\\omega_s)\\right)
\\]

<div class="callout callout--thm" role="note">
  <span class="callout__title">Propiedad espectral fundamental</span>
  <p>
    Muestrear en el tiempo con periodo \\(T\\) produce <strong>infinitas réplicas periódicas</strong> del espectro continuo
    \\(X(j\\omega)\\), centradas en \\(0, \\pm\\omega_s, \\pm 2\\omega_s, \\dots\\) y escaladas en amplitud por \\(1/T\\).
  </p>
</div>

<figure class="figura">
  <img
    src="./assets/images/lazo-muestreo-zoh.svg"
    alt="Diagrama de bloques del lazo de control digital con filtro antialiasing, muestreador por impulsos, controlador D(z), retenedor ZOH y planta continua"
    loading="lazy"
  />
  <figcaption>
    Figura 1. Arquitectura de un lazo de control digital con filtro pasobajo antialiasing, muestreador de impulsos
    \\(\\delta_T(t)\\) y retenedor de orden cero \\(G_{\\mathrm{ZOH}}(s)\\).
  </figcaption>
</figure>

<h2 id="nyquist-aliasing">4.2 Teorema de Shannon-Nyquist, aliasing y filtro antialiasing</h2>
<p>
  Si la señal continua está limitada en banda a una frecuencia máxima \\(\\omega_{\\max} = 2\\pi f_{\\max}\\), las réplicas
  espectrales adyacentes no se superponen siempre que se cumpla el <strong>Teorema de Muestreo de Shannon-Nyquist</strong>:
</p>
\\[
  \\omega_s &gt; 2\\,\\omega_{\\max} \\iff f_s &gt; 2\\,f_{\\max} \\qquad \\text{con frecuencia de Nyquist } f_N = \\frac{f_s}{2}
\\]
<p>
  Cuando existen componentes con frecuencia \\(f &gt; f_N\\) (como ruido electromagnético de \\(60\\ \\text{Hz}\\) o armónicos
  de conmutación), las copias espectrales se solapan y la energía de alta frecuencia aparece disfrazada en banda base
  a una <strong>frecuencia aparente de alias</strong>:
</p>
\\[
  f_{\\mathrm{alias}} = \\min_{k \\in \\mathbb{Z}} \\left| f - k\\,f_s \\right| \\le \\frac{f_s}{2}
\\]

<div class="callout callout--warn" role="note">
  <span class="callout__title">Error irreversible después del ADC</span>
  <p>
    Una vez que ocurre el aliasing dentro del convertidor ADC, <strong>ningún filtro digital</strong> puede separar la
    señal verdadera del alias. Por ello es obligatorio colocar un <strong>filtro analógico pasobajo antialiasing</strong>
    (p. ej., Butterworth de 2.º orden con \\(f_c \\le f_s/2\\)) <em>antes</em> del muestreador.
  </p>
</div>

<h2 id="zoh-dinamica">4.3 Función de transferencia y desfase del Retenedor de Orden Cero (ZOH)</h2>
<p>
  A la salida del procesador digital, el DAC opera normalmente como un <strong>Retenedor de Orden Cero (ZOH)</strong>:
  mantiene constante el valor \\(u[k]\\) durante todo el intervalo \\(kT \\le t &lt; (k+1)T\\). Su respuesta al impulso es un
  pulso rectangular unitario de duración \\(T\\), cuya Transformada de Laplace es:
</p>
\\[
  G_{\\mathrm{ZOH}}(s) = \\frac{1 - e^{-sT}}{s}
\\]
<p>
  Evaluando sobre el eje imaginario \\(s = j\\omega\\) y factorizando el término de fase media \\(e^{-j\\omega T/2}\\):
</p>
\\[
  G_{\\mathrm{ZOH}}(j\\omega) = \\frac{1 - e^{-j\\omega T}}{j\\omega}
  = e^{-j\\omega T/2}\\,\\frac{e^{j\\omega T/2} - e^{-j\\omega T/2}}{j\\omega}
  = T\\,\\frac{\\sin(\\omega T/2)}{\\omega T/2}\\,e^{-j\\omega T/2}
  = T\\,\\mathrm{sinc}\\!\\left(\\frac{\\omega T}{2\\pi}\\right)\\angle -\\frac{\\omega T}{2}
\\]
<ul>
  <li>
    <strong>Magnitud:</strong> decae siguiendo la envolvente \\(|\\mathrm{sinc}(f/f_s)|\\) con ceros exactos en los múltiplos
    de la frecuencia de muestreo \\(\\omega = m\\omega_s\\) (\\(m = 1, 2, \\dots\\)).
  </li>
  <li>
    <strong>Retardo de fase puro:</strong> equivale aproximadamente a un retardo temporal de medio periodo de muestreo
    \\(T/2\\), introduciendo una pérdida directa de <strong>margen de fase</strong> a la frecuencia de cruce \\(\\omega_c\\):
  </li>
</ul>
\\[
  \\Delta\\phi_{\\mathrm{ZOH}}(\\omega_c) = -\\frac{\\omega_c T}{2}\\ \\text{rad} = -180^\\circ\\!\\left(\\frac{f_c}{f_s}\\right)
\\]

<h2 id="lab-aliasing-zoh">4.4 Laboratorio interactivo 2D: aliasing y respuesta del ZOH</h2>
<p>
  Experimenta con una señal senoidal continua de frecuencia \\(f_0\\) muestreada a \\(f_s = 1/T\\). Prueba el caso clásico
  del temario (\\(f_0 = 9\\ \\text{Hz}\\), \\(f_s = 10\\ \\text{Hz}\\)) para comprobar que el procesador no distingue la señal de
  \\(9\\ \\text{Hz}\\) de un alias de \\(1\\ \\text{Hz}\\) con fase invertida, y observa cómo varía la caída \\(\\mathrm{sinc}\\)
  y el desfase del ZOH.
</p>
<div data-viz="aliasingZOH" data-preset="default"></div>

<h2 id="criterios-periodo">4.5 Criterios de ingeniería para seleccionar el periodo de muestreo \\(T\\)</h2>
<div class="table-wrap">
  <table>
    <caption>Comparación de criterios prácticos de selección de periodo de muestreo T</caption>
    <thead>
      <tr>
        <th scope="col">Enfoque de diseño</th>
        <th scope="col">Criterio matemático</th>
        <th scope="col">Regla típica para \\(T\\)</th>
        <th scope="col">Ventajas y limitaciones</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nyquist teórico</strong></td>
        <td>\\(\\omega_s &gt; 2\\omega_{\\max}\\)</td>
        <td>\\(T &lt; \\dfrac{\\pi}{\\omega_{\\max}}\\)</td>
        <td>Límite teórico mínimo; insuficiente para garantizar buen margen de fase en lazo cerrado.</td>
      </tr>
      <tr>
        <td><strong>Tiempo de subida (\\(t_r\\))</strong></td>
        <td>\\(4 \\text{ a } 10\\) muestras en \\(t_r\\)</td>
        <td>\\(T \\approx \\dfrac{t_r}{10} \\text{ a } \\dfrac{t_r}{4}\\)</td>
        <td>Muy intuitivo en el dominio temporal; estándar en plantas térmicas y de nivel.</td>
      </tr>
      <tr>
        <td><strong>Ancho de banda (\\(\\omega_b\\))</strong></td>
        <td>\\(\\omega_s \\approx 10\\omega_b \\text{ a } 30\\omega_b\\)</td>
        <td>\\(T \\approx \\dfrac{2\\pi}{20\\omega_b}\\)</td>
        <td>Mantiene la pérdida de margen de fase del ZOH por debajo de \\(10^\\circ\\); preferido en mecatrónica.</td>
      </tr>
      <tr>
        <td><strong>Tiempo de establecimiento (\\(t_s\\))</strong></td>
        <td>\\(20 \\text{ a } 50\\) muestras en \\(t_s\\)</td>
        <td>\\(T \\approx \\dfrac{t_s}{40}\\)</td>
        <td>Asegura captura fina de la envolvente transitoria sin saturar el procesador.</td>
      </tr>
    </tbody>
  </table>
</div>
`,objetivos:[`Deducir el espectro periódico X*(jω) a partir del tren de impulsos y la Serie Compleja de Fourier.`,`Calcular la frecuencia de Nyquist y predecir la frecuencia aparente de alias f_alias.`,`Evaluar la magnitud sinc y la pérdida de margen de fase Δφ_ZOH = −ω_c·T/2 del Retenedor de Orden Cero.`],presets:{default:{params:{f0:9,fs:10,duracion:1.2}}}});export{t as default};