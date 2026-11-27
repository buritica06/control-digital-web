import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: Posicionador mecatrónico y ganancia crítica K_cr) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: posicionador lineal mecatrónico en lazo cerrado</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Planteamiento del problema de estabilidad</span>
  <p>
    Un posicionador lineal mecatrónico (masa–resorte–amortiguador accionado por motor con muestreo \\(T = 0.1\\ \\text{s}\\))
    presenta la siguiente ecuación característica discreta en lazo cerrado dependiente de la ganancia \\(K\\):
  </p>
</div>
\\[
  P(z) = z^2 + (-1.81873 + 0.04683\\,K)\\,z + (0.81873 + 0.04379\\,K) = 0
\\]

<h2 id="solucion-analitica">5.2 Evaluación analítica del Criterio de Jury (\\(n = 2\\))</h2>
<p>Identificamos \\(a_0 = 1\\), \\(a_1 = -1.81873 + 0.04683K\\) y \\(a_2 = 0.81873 + 0.04379K\\):</p>
<ol>
  <li>
    <strong>Condición 1 (\\(|a_2| &lt; a_0\\)):</strong>
    \\[
      0.81873 + 0.04379\\,K &lt; 1 \\;\\Rightarrow\\; K &lt; \\frac{0.18127}{0.04379} \\approx 4.1395
    \\]
  </li>
  <li>
    <strong>Condición 2 (\\(P(1) &gt; 0\\)):</strong>
    \\[
      P(1) = 1 + (-1.81873 + 0.04683K) + (0.81873 + 0.04379K) = 0.09062\\,K &gt; 0 \\;\\Rightarrow\\; K &gt; 0
    \\]
  </li>
  <li>
    <strong>Condición 3 (\\(P(-1) &gt; 0\\), \\(n = 2\\) par):</strong>
    \\[
      P(-1) = 1 - (-1.81873 + 0.04683K) + (0.81873 + 0.04379K) = 3.63746 - 0.00304\\,K &gt; 0 \\;\\Rightarrow\\; K &lt; 1196.5
    \\]
  </li>
</ol>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Rango seguro de ganancia y ganancia crítica</span>
  <p>
    Intersecando las tres desigualdades se obtiene <strong>\\(0 &lt; K &lt; 4.14\\)</strong>. En \\(K_{\\mathrm{cr}} \\approx 4.14\\),
    \\(a_2 = 1\\) y los polos cruzan el círculo unitario (\\(|z| = 1\\)), produciendo oscilación sostenida.
  </p>
</div>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D del posicionador lineal</h2>
<p>
  Ajusta la ganancia \\(K\\) y observa cómo el <strong>posicionador lineal masa–resorte 3D</strong> (carro móvil, resorte
  compresible, baliza de estabilidad verde/ámbar/rojo) y la <strong>gráfica 2D de \\(x[k]\\)</strong> pasan de una
  respuesta amortiguada a oscilación marginal en \\(K \\approx 4.14\\) y divergencia inestable para \\(K &gt; 4.14\\).
</p>
<div data-viz="masaResorteJurySim" data-preset="nominal"></div>
`,objetivos:[`Evaluar las tres desigualdades de Jury para hallar el rango 0 < K < 4.14.`,`Verificar en 3D + 2D la transición entre estabilidad asintótica, marginal e inestabilidad al variar K.`],presets:{nominal:{params:{K:1.8,refMm:100}}}});export{t as default};