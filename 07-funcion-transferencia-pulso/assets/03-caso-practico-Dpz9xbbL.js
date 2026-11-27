import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: Servomotor DC con ZOH) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: servomotor DC de posición angular</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Especificación del actuador mecatrónico</span>
  <p>
    Un servomotor DC de imán permanente acoplado a una carga inercial se controla digitalmente en posición angular
    \\(\\theta(t)\\) mediante un microcontrolador con periodo \\(T = 0.1\\ \\text{s}\\), convertidor DAC/ZOH y codificador
    óptico (encoder) en realimentación unitaria. Su función de transferencia continua es:
  </p>
</div>
\\[
  G_p(s) = \\frac{\\Theta(s)}{V(s)} = \\frac{K_m}{s(s + a)} = \\frac{10}{s(s + 2)}
\\]

<h2 id="solucion-analitica">5.2 Solución analítica paso a paso</h2>
<ol>
  <li>
    <strong>Expansión de \\(G_p(s)/s\\) en fracciones parciales:</strong>
    \\[
      \\frac{G_p(s)}{s} = \\frac{10}{s^2(s+2)} = \\frac{5}{s^2} - \\frac{2.5}{s} + \\frac{2.5}{s+2}
    \\]
  </li>
  <li>
    <strong>Respuesta al escalón continua y muestreo en \\(t = kT\\) (\\(T = 0.1\\ \\text{s}\\)):</strong>
    \\[
      g_{\\mathrm{step}}(t) = 5t - 2.5 + 2.5\\,e^{-2t} \\;\\Rightarrow\\;
      g_{\\mathrm{step}}[k] = 0.5k - 2.5 + 2.5\\,(0.81873)^k
    \\]
  </li>
  <li>
    <strong>Aplicación de \\((1 - z^{-1})\\mathcal{Z}\\{g_{\\mathrm{step}}[k]\\}\\):</strong> usando la fórmula exacta de
    discretización ZOH para \\(\\frac{K_m}{s(s+a)}\\):
    \\[
      G(z) = \\frac{K_m}{a^2}\\cdot\\frac{z\\left(aT - 1 + e^{-aT}\\right) + \\left(1 - e^{-aT} - aT\\,e^{-aT}\\right)}{(z - 1)\\left(z - e^{-aT}\\right)}
    \\]
    Sustituyendo \\(K_m = 10\\), \\(a = 2\\), \\(T = 0.1\\ \\text{s}\\) (\\(aT = 0.2\\), \\(e^{-0.2} \\approx 0.81873\\)):
    \\[
      G(z) = \\frac{0.04683\\,z + 0.04381}{(z - 1)(z - 0.81873)}
    \\]
  </li>
  <li>
    <strong>Polos, cero de muestreo y ecuación característica en lazo cerrado (\\(D(z) = K\\)):</strong>
    <ul>
      <li>Polos de lazo abierto: \\(z_1 = e^{0} = 1.0\\) y \\(z_2 = e^{-0.2} = 0.81873\\).</li>
      <li><strong>Cero de muestreo:</strong> \\(z_0 = -\\dfrac{0.04381}{0.04683} \\approx -0.9355\\) (no existía en \\(G_p(s)\\)).</li>
      <li>Ecuación característica:
        \\[
          1 + K\\,G(z) = 0 \\;\\Rightarrow\\; z^2 + (-1.81873 + 0.04683\\,K)z + (0.81873 + 0.04381\\,K) = 0
        \\]
      </li>
    </ul>
  </li>
</ol>

<div class="table-wrap">
  <table>
    <caption>Comparación entre la planta continua y su modelo de pulso ZOH</caption>
    <thead>
      <tr><th scope="col">Propiedad</th><th scope="col">Planta continua \\(G_p(s)\\)</th><th scope="col">Planta discretizada \\(G(z)\\)</th></tr>
    </thead>
    <tbody>
      <tr><td>Polos</td><td>\\(s_1 = 0,\\; s_2 = -2\\)</td><td>\\(z_1 = 1.0,\\; z_2 = 0.81873\\) (\\(z = e^{sT}\\))</td></tr>
      <tr><td>Ceros finitos</td><td>Ninguno (\\(m = 0\\))</td><td>\\(z_0 \\approx -0.9355\\) (cero de muestreo)</td></tr>
      <tr><td>Grado relativo</td><td>\\(n - m = 2\\)</td><td>\\(n - m = 1\\) (retardo de 1 muestra)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D del servomotor DC</h2>
<p>
  Interactúa con el <strong>servomotor DC 3D</strong> (eje, disco inercial con aguja de posición \\(\\theta(t)\\), marcador
  de referencia \\(\\theta_{\\mathrm{ref}}\\) y encoder óptico que pulsa cada \\(T\\) s) acoplado a la <strong>gráfica 2D</strong>
  de \\(\\theta(t)\\), \\(\\theta[k]\\) y voltaje retenido \\(v_{\\mathrm{ZOH}}(t)\\). Aumenta \\(K\\) o \\(T\\) para observar cómo
  los polos de lazo cerrado se acercan al círculo unitario \\(|z| = 1\\).
</p>
<div data-viz="servomotorPulsoSim" data-preset="nominal"></div>
`,objetivos:[`Derivar analíticamente G(z) para el servomotor DC Gp(s) = 10/[s(s+2)] con T = 0.1 s.`,`Identificar el cero de muestreo z₀ ≈ −0.9355 y el mapeo exacto de polos z = e^(sT).`,`Explorar en 3D + 2D el efecto de K y T sobre los polos de lazo cerrado y la respuesta intermuestral.`],presets:{nominal:{params:{T:.1,K:1.2,refDeg:90,a:2}}}});export{t as default};