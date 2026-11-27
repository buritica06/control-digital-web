import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="deduccion-gz">4.1 Deducción de la función de transferencia de pulso con ZOH</h2>
<p>
  Cuando un procesador digital aplica la secuencia de control \\(u[k]\\) a una planta continua \\(G_p(s)\\) a través de un
  Retenedor de Orden Cero \\(G_{\\mathrm{ZOH}}(s) = \\frac{1 - e^{-sT}}{s}\\) y muestrea la salida \\(y(t)\\) cada \\(T\\)
  segundos, la relación en el dominio \\(Z\\) entre salida y entrada es la <strong>función de transferencia de pulso</strong>:
</p>
\\[
  G(z) = \\frac{Y(z)}{U(z)} = \\mathcal{Z}\\!\\left\\{ G_{\\mathrm{ZOH}}(s)\\,G_p(s) \\right\\}
  = \\mathcal{Z}\\!\\left\\{ (1 - e^{-sT})\\frac{G_p(s)}{s} \\right\\}
  = (1 - z^{-1})\\,\\mathcal{Z}\\!\\left\\{ \\frac{G_p(s)}{s} \\right\\}
\\]

<div class="callout callout--thm" role="note">
  <span class="callout__title">Procedimiento analítico en 5 pasos (Invarianza al escalón)</span>
  <p>
    (1) Formar \\(G_p(s)/s\\); (2) hallar la respuesta al escalón continua \\(g_{\\mathrm{step}}(t) = \\mathcal{L}^{-1}\\{G_p(s)/s\\}\\);
    (3) evaluar en los instantes de muestreo \\(g_{\\mathrm{step}}[k] = g_{\\mathrm{step}}(kT)\\);
    (4) calcular \\(\\mathcal{Z}\\{g_{\\mathrm{step}}[k]\\}\\); y (5) multiplicar por \\((1 - z^{-1}) = \\frac{z-1}{z}\\).
  </p>
</div>

<figure class="figura">
  <img
    src="./assets/images/lazo-pulso-zoh.svg"
    alt="Diagrama de bloques de lazo cerrado digital con controlador D(z), retenedor ZOH, servomotor Gp(s) y muestreador sincronizado"
    loading="lazy"
  />
  <figcaption>
    Figura 1. Lazo cerrado digital con muestreo sincronizado de periodo \\(T\\) y planta discretizada \\(G(z)\\).
  </figcaption>
</figure>

<h2 id="algebra-bloques">4.2 Álgebra de bloques muestreados: regla de separación</h2>
<p>
  En sistemas muestreados la posición física de cada muestreador modifica la función de transferencia resultante:
</p>
<ul>
  <li>
    <strong>Cascada CON muestreador intermedio:</strong> la señal entre \\(G_1(s)\\) y \\(G_2(s)\\) se discretiza antes de
    entrar al segundo bloque, por lo que las transformadas se multiplican:
    \\[
      Y(z) = G_1(z)\\,G_2(z)\\,U(z)
    \\]
  </li>
  <li>
    <strong>Cascada SIN muestreador intermedio:</strong> ambos bloques interactúan en tiempo continuo y solo se muestrea
    la salida final:
    \\[
      Y(z) = \\mathcal{Z}\\!\\left\\{ G_1(s)\\,G_2(s) \\right\\} U(z) = \\overline{G_1 G_2}(z)\\,U(z)
    \\]
  </li>
</ul>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Regla crítica de álgebra muestreada</span>
  <p>
    En general, \\(\\overline{G_1 G_2}(z) \\neq G_1(z)\\,G_2(z)\\). Solo es válido factorizar una función de \\(z\\) fuera de
    la Transformada Z si la señal correspondiente ya está muestreada (como el término \\(1 - e^{-sT}\\) del ZOH o un
    controlador digital \\(D(z)\\)).
  </p>
</div>

<h2 id="lazo-cerrado">4.3 Función de transferencia en lazo cerrado</h2>
<p>
  Para un lazo con referencia muestreada \\(R(z)\\), controlador digital \\(D(z)\\) y planta con ZOH \\(G(z)\\):
</p>
<ul>
  <li>
    <strong>Realimentación unitaria (\\(H(s)=1\\)) o con muestreador en el lazo:</strong>
    \\[
      \\frac{Y(z)}{R(z)} = \\frac{D(z)\\,G(z)}{1 + D(z)\\,G(z)}, \\qquad \\text{Ecuación característica: } 1 + D(z)\\,G(z) = 0
    \\]
  </li>
  <li>
    <strong>Sensor continuo \\(H(s)\\) no separado de \\(G_p(s)\\) por un muestreador:</strong>
    \\[
      \\frac{Y(z)}{R(z)} = \\frac{D(z)\\,G(z)}{1 + D(z)\\,\\overline{GH}(z)}, \\qquad
      \\overline{GH}(z) = (1 - z^{-1})\\,\\mathcal{Z}\\!\\left\\{\\frac{G_p(s)\\,H(s)}{s}\\right\\}
    \\]
  </li>
</ul>

<h2 id="lab-algebra">4.4 Laboratorio 2D: comparación entre \\(G_1(z)G_2(z)\\) y \\(\\overline{G_1 G_2}(z)\\)</h2>
<p>
  Compara la respuesta al escalón de dos etapas de primer orden \\(G_1(s) = \\frac{a}{s+a}\\) y \\(G_2(s) = \\frac{b}{s+b}\\)
  con y sin muestreador intermedio. Observa cómo la discrepancia crece a medida que aumenta el periodo \\(T\\).
</p>
<div data-viz="algebraBloquesZ" data-preset="default"></div>
`,objetivos:[`Aplicar la fórmula de invarianza al escalón G(z) = (1 − z⁻¹)Z{Gp(s)/s}.`,`Distinguir algebraica y gráficamente G₁(z)G₂(z) de la transformada conjunta G₁G₂(z).`,`Escribir la función de transferencia y la ecuación característica de lazo cerrado.`],presets:{default:{params:{a:1.5,b:3,T:.35}}}});export{t as default};