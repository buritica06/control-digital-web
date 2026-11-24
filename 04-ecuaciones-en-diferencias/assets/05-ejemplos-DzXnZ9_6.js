import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<p>
  Cuatro casos resueltos con la misma lógica sistémica: <strong>plantear el modelo</strong>,
  <strong>aplicar la herramienta adecuada</strong> y <strong>verificar físicamente el resultado</strong>.
</p>

<h2 id="ejemplo-1">Ejemplo 1 — Servomecanismo de 2.º orden con condiciones iniciales no nulas</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Resuelve \\(y[k] - 1.3y[k-1] + 0.4y[k-2] = u[k]\\) ante un escalón unitario \\(u[k] = 1\\) (\\(k \\ge 0\\)), sabiendo que
    el sistema parte con energía almacenada \\(y[-1] = 2\\) e \\(y[-2] = 1\\).
  </p>
</div>
<ol>
  <li>
    <strong>Transformar al dominio \\(Z\\) con el teorema de retardo:</strong>
    \\[ (1 - 1.3z^{-1} + 0.4z^{-2})Y(z) - 2.2 + 0.8z^{-1} = U(z) \\]
  </li>
  <li>
    <strong>Separar respuesta libre y respuesta forzada:</strong>
    \\[ Y(z) = \\underbrace{\\frac{2.2z^2 - 0.8z}{(z - 0.8)(z - 0.5)}}_{Y_{\\text{libre}}(z)} + \\underbrace{\\frac{z^3}{(z - 1)(z - 0.8)(z - 0.5)}}_{Y_{\\text{forzada}}(z)} \\]
  </li>
  <li>
    <strong>Expandir \\(Y(z)/z\\) por fracciones parciales (Heaviside):</strong>
    \\[ \\frac{Y(z)}{z} = \\frac{3.2z^2 - 3.0z + 0.8}{(z - 1)(z - 0.8)(z - 0.5)} = \\frac{10}{z - 1} - \\frac{7.4667}{z - 0.8} + \\frac{0.6667}{z - 0.5} \\]
  </li>
  <li>
    <strong>Solución cerrada y verificación:</strong>
    \\[ y[k] = 10.0 - 7.4667(0.8)^k + 0.6667(0.5)^k \\quad (k \\ge 0) \\]
    Comprueba \\(k = 0\\): \\(y[0] = 10 - 7.4667 + 0.6667 = 3.2\\), exactamente igual a \\(1.3(2) - 0.4(1) + 1 = 3.2\\).
  </li>
</ol>

<h2 id="ejemplo-2">Ejemplo 2 — Discretización ZOH de un motor DC</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Un motor DC tiene función de transferencia \\(G(s) = \\dfrac{20}{0.5s + 1}\\) (rad/s por voltio) y se controla mediante
    un DAC con retenedor ZOH cada \\(T = 0.05\\text{ s}\\). Obtén la ecuación en diferencias y la velocidad ante un
    escalón de \\(v = 6\\text{ V}\\).
  </p>
</div>
<ol>
  <li>
    <strong>Parámetros ZOH (\\(\\tau = 0.5\\text{ s}\\), \\(K = 20\\)):</strong>
    \\[ a = e^{-T/\\tau} = e^{-0.05/0.5} = e^{-0.1} = 0.904837, \\qquad b = K(1 - a) = 20(1 - 0.904837) = 1.903252 \\]
  </li>
  <li>
    <strong>Ecuación en diferencias ejecutable:</strong>
    \\[ \\omega[k] = 0.904837\\,\\omega[k-1] + 1.903252\\,v[k-1] \\]
  </li>
  <li>
    <strong>Respuesta al escalón de \\(6\\text{ V}\\) (\\(V(z) = \\dfrac{6z}{z - 1}\\)):</strong>
    \\[ \\omega[k] = 120\\left(1 - 0.904837^k\\right)\\ \\text{rad/s} \\]
  </li>
  <li>
    <strong>Verificación física:</strong> \\(\\omega[0] = 0\\), \\(\\omega[1] = 11.42\\text{ rad/s}\\) y la velocidad de
    régimen permanente es \\(\\omega(\\infty) = K \\cdot v = 20 \\times 6 = 120\\text{ rad/s}\\).
  </li>
</ol>

<h2 id="ejemplo-3">Ejemplo 3 — Oscilaciones amortiguadas con polos complejos conjugados</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Resuelve la ecuación homogénea \\(y[k] - y[k-1] + 0.5y[k-2] = 0\\) con \\(y[0] = 1\\) e \\(y[1] = 0.5\\).
  </p>
</div>
<ol>
  <li>
    <strong>Raíces del polinomio característico:</strong> \\(r^2 - r + 0.5 = 0 \\implies r_{1,2} = 0.5 \\pm j0.5\\).
  </li>
  <li>
    <strong>Forma polar:</strong> radio \\(\\rho = \\sqrt{0.5^2 + 0.5^2} = 0.7071 &lt; 1\\) (estable) y ángulo
    \\(\\theta = \\arctan(1) = \\pi/4\\text{ rad}\\) (\\(45^\\circ\\)).
  </li>
  <li>
    <strong>Plantilla modal oscilatoria:</strong>
    \\[ y[k] = (0.7071)^k \\left[C_1\\cos\\!\\left(\\frac{\\pi k}{4}\\right) + C_2\\sin\\!\\left(\\frac{\\pi k}{4}\\right)\\right] \\]
  </li>
  <li>
    <strong>Ajuste con \\(y[0] = 1\\) y \\(y[1] = 0.5\\):</strong> resulta \\(C_1 = 1\\) y \\(C_2 = 0\\), por lo que
    \\[ y[k] = (0.7071)^k \\cos\\!\\left(\\frac{\\pi k}{4}\\right) \\]
  </li>
</ol>
<div data-viz="respuestaLti" data-preset="subamortiguado"></div>

<h2 id="ejemplo-4">Ejemplo 4 — Rango crítico de ganancia \\(K\\) con el criterio de Jury</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Una planta integradora \\(G(s) = \\dfrac{K}{s(s + 1)}\\) con retenedor ZOH (\\(T = 1\\text{ s}\\)) tiene función de
    transferencia de pulso \\(G(z) = \\dfrac{K(0.3679z + 0.2642)}{(z - 1)(z - 0.3679)}\\). Determina el rango de ganancia
    \\(K\\) para que el lazo cerrado unitario sea estable.
  </p>
</div>
<ol>
  <li>
    <strong>Ecuación característica de lazo cerrado \\(1 + G(z) = 0\\):</strong>
    \\[ P(z) = z^2 + (0.3679K - 1.3679)z + (0.3679 + 0.2642K) = 0 \\]
  </li>
  <li>
    <strong>Aplicar las tres condiciones de Jury:</strong>
    <ul>
      <li>\\(P(1) = 0.6321K &gt; 0 \\implies K &gt; 0\\)</li>
      <li>\\(P(-1) = 2.7358 - 0.1037K &gt; 0 \\implies K &lt; 26.38\\)</li>
      <li>\\(|a_2| = 0.3679 + 0.2642K &lt; 1 \\implies K &lt; 2.3925\\)</li>
    </ul>
  </li>
  <li>
    <strong>Conclusión:</strong> la intersección de las tres desigualdades da el rango seguro
    \\(0 &lt; K &lt; 2.39\\). Si \\(K \\ge 2.39\\), los polos salen del círculo unitario y el lazo oscila sin control.
  </li>
</ol>
`,objetivos:[`Aplicar la Transformada Z con condiciones iniciales no nulas y comprobar la coherencia con la iteración directa.`,`Obtener modelos en diferencias ZOH de plantas físicas de primer orden y predecir su estado estacionario.`,`Interpretar polos complejos conjugados en forma polar y calcular márgenes de estabilidad en lazo cerrado con Jury.`],presets:{subamortiguado:{a1:-1,a2:.5,b0:1,ym1:0,ym2:0,muestras:18,titulo:`Polos complejos conjugados (r = 0.707, θ = 45°): oscilación amortiguada`}}});export{t as default};