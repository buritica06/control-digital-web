import{t as e}from"./chapter-C2599_w7.js";var t=`<h2 id="puente-s-z">1. El puente físico entre el plano \\(s\\) y el plano \\(z\\)</h2>
<p>
  Toda planta real vive en tiempo continuo, pero el microcontrolador solo ve muestras cada \\(T\\) segundos. El puente
  matemático exacto entre ambos mundos es la transformación exponencial:
</p>
\\[ z = e^{sT} = e^{(\\sigma + j\\omega)T} = \\underbrace{e^{\\sigma T}}_{\\text{radio } |z|} \\, e^{j\\underbrace{\\omega T}_{\\text{ángulo } \\theta}} \\]
<p>
  Piénsalo como doblar un mapa: todo el semiplano izquierdo estable del plano continuo (\\(\\sigma &lt; 0\\)) queda
  encerrado dentro del <strong>círculo unitario \\(|z| &lt; 1\\)</strong>. Cuanto más rápido decae la planta continua,
  más cerca del origen \\(z = 0\\) cae su polo discreto; cuanto más oscila, mayor es el ángulo \\(\\theta = \\omega T\\).
</p>

<h2 id="paso-a-paso-sz">2. Del plano \\(s\\) al plano \\(z\\) y a la ecuación en diferencias, paso a paso</h2>
<p>
  Recorre estas cinco etapas para conectar el polo continuo, la geometría del círculo unitario y la elección del método
  de discretización.
</p>

<div class="stepper" data-ch3-stepper>
  <div class="stepper__controls">
    <button type="button" class="btn btn--ghost" data-step-prev>← Anterior</button>
    <span class="stepper__k" data-step-counter>Paso 1 de 5</span>
    <button type="button" class="btn btn--primary" data-step-next>Siguiente →</button>
    <button type="button" class="btn btn--ghost" data-step-reset>Reiniciar</button>
  </div>
  <div class="stepper__calc" data-step-body aria-live="polite"></div>
  <div class="stepper__table">
    <table>
      <caption>Mapa de correspondencia continuo–discreto</caption>
      <thead>
        <tr>
          <th scope="col">Paso</th>
          <th scope="col">Región / concepto en \\(s\\)</th>
          <th scope="col">Equivalente en \\(z\\)</th>
        </tr>
      </thead>
      <tbody>
        <tr data-step-row="0">
          <td><strong>1</strong></td>
          <td>Polo estable \\(\\sigma &lt; 0\\)</td>
          <td>Interior del círculo: \\(|z| = e^{\\sigma T} &lt; 1\\)</td>
        </tr>
        <tr data-step-row="1">
          <td><strong>2</strong></td>
          <td>Eje imaginario \\(\\sigma = 0\\)</td>
          <td>Frontera exacta: \\(|z| = 1\\) (oscilación sostenida)</td>
        </tr>
        <tr data-step-row="2">
          <td><strong>3</strong></td>
          <td>Polo inestable \\(\\sigma &gt; 0\\)</td>
          <td>Exterior del círculo: \\(|z| &gt; 1\\) (divergencia)</td>
        </tr>
        <tr data-step-row="3">
          <td><strong>4</strong></td>
          <td>Frecuencia \\(\\omega\\) y periodo \\(T\\)</td>
          <td>Ángulo \\(\\theta = \\omega T\\) (\\(2\\pi/\\theta\\) muestras/ciclo)</td>
        </tr>
        <tr data-step-row="4">
          <td><strong>5</strong></td>
          <td>Discretización de \\(G(s)\\)</td>
          <td>ZOH (planta + DAC), Tustin (filtros), Euler (cuidado si \\(T &gt; 2\\tau\\))</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<h2 id="mapeo-3d">3. Mapeo geométrico 3D: Plano \\(S \\mapsto\\) Plano \\(Z\\) (Three.js)</h2>
<p>
  En esta escena 3D interactiva puedes mover la parte real \\(\\sigma\\), la frecuencia \\(\\omega\\) y el periodo de
  muestreo \\(T\\). Los arcos tridimensionales muestran en vivo hacia dónde viajan los polos desde el plano continuo
  (izquierda) hasta el círculo unitario del plano \\(Z\\) (derecha). Prueba llevar \\(\\sigma &gt; 0\\) para ver cómo los
  polos escapan del disco verde y se vuelven rojos.
</p>
<div data-viz="mapeoSZ3D" data-preset="subamortiguado"></div>

<h2 id="metodos-discretizacion">4. Cuatro métodos para discretizar \\(G(s) = \\dfrac{K}{\\tau s + 1}\\)</h2>
<p>
  Para una planta clásica de primer orden \\(\\tau\\dot{y}(t) + y(t) = Ku(t)\\) (como un motor DC o un circuito RC),
  cada método produce una ecuación en diferencias distinta:
</p>

<div class="table-wrap">
  <table>
    <caption>Comparativa de discretización para \\(G(s) = K / (\\tau s + 1)\\)</caption>
    <thead>
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Regla / sustitución</th>
        <th scope="col">Polo discreto \\(p\\)</th>
        <th scope="col">Ecuación en diferencias</th>
        <th scope="col">Estabilidad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>ZOH</strong> (invariante al escalón)</td>
        <td>\\((1 - z^{-1})\\mathcal{Z}\\{G(s)/s\\}\\)</td>
        <td>\\(e^{-T/\\tau}\\)</td>
        <td>\\(y[k] = e^{-T/\\tau}y[k-1] + K(1-e^{-T/\\tau})u[k-1]\\)</td>
        <td>Siempre estable (\\(0 &lt; p &lt; 1\\)). Exacta con DAC.</td>
      </tr>
      <tr>
        <td><strong>Tustin</strong> (bilineal)</td>
        <td>\\(s \\leftarrow \\dfrac{2}{T}\\dfrac{z-1}{z+1}\\)</td>
        <td>\\(\\dfrac{2\\tau - T}{2\\tau + T}\\)</td>
        <td>\\(y[k] = \\dfrac{2\\tau-T}{2\\tau+T}y[k-1] + \\dfrac{KT}{2\\tau+T}(u[k]+u[k-1])\\)</td>
        <td>Siempre estable; ideal para filtros y controladores.</td>
      </tr>
      <tr>
        <td><strong>Euler adelante</strong></td>
        <td>\\(s \\leftarrow \\dfrac{z-1}{T}\\)</td>
        <td>\\(1 - \\dfrac{T}{\\tau}\\)</td>
        <td>\\(y[k] = \\left(1-\\dfrac{T}{\\tau}\\right)y[k-1] + \\dfrac{KT}{\\tau}u[k-1]\\)</td>
        <td><strong>Peligro:</strong> diverge si \\(T &gt; 2\\tau\\).</td>
      </tr>
      <tr>
        <td><strong>Euler atrás</strong></td>
        <td>\\(s \\leftarrow \\dfrac{z-1}{Tz}\\)</td>
        <td>\\(\\dfrac{\\tau}{\\tau + T}\\)</td>
        <td>\\(y[k] = \\dfrac{\\tau}{\\tau+T}y[k-1] + \\dfrac{KT}{\\tau+T}u[k]\\)</td>
        <td>Siempre estable, aunque ligeramente sobreamortiguado.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Caso práctico: el filtro exponencial de primer orden</span>
  <p>
    Al discretizar un filtro pasabajos \\(\\tau\\dot{y} + y = x\\) con ZOH se obtiene
    \\(y[k] = \\alpha\\,y[k-1] + (1-\\alpha)\\,x[k]\\) con \\(\\alpha = e^{-T/\\tau}\\). Este algoritmo reduce la varianza de
    ruido blanco en un factor \\(\\dfrac{1-\\alpha}{1+\\alpha}\\), mostrando el compromiso clave del procesamiento digital:
    más suavizado (\\(\\alpha \\to 1\\)) implica una respuesta más lenta.
  </p>
</div>

<h2 id="lab-discretizacion">5. Experimento interactivo: ¿cuándo falla Euler adelante?</h2>
<p>
  Compara las cuatro curvas frente a la planta continua ante un escalón de \\(6\\text{ V}\\). Con \\(T = 0.05\\text{ s}\\) y
  \\(\\tau = 0.5\\text{ s}\\) los cuatro métodos coinciden muy bien; sube \\(T\\) por encima de \\(2\\tau = 1.0\\text{ s}\\) y
  comprueba cómo <strong>Euler adelante diverge</strong> mientras ZOH y Tustin siguen estables.
</p>
<div data-viz="comparadorDiscretizacion" data-preset="motorDc"></div>

<h2 id="relieve-3d">6. Relieve 3D de \\(|G(z)|\\), polos y círculo unitario (Three.js)</h2>
<p>
  En esta superficie tridimensional, los pilares verticales señalan los polos de
  \\(G(z) = \\dfrac{b_0 z^2}{z^2 + a_1 z + a_2}\\) y el anillo amarillo marca la frontera \\(|z| = 1\\). Mientras ambos
  pilares permanezcan verdes dentro del disco, el sistema es estable; mueve \\(a_1\\) o \\(a_2\\) hasta sacar un polo del
  anillo para ver cómo el disco cambia a rojo y el sistema pierde estabilidad.
</p>
<div data-viz="superficieLti3D" data-preset="servo3d"></div>
`,n=String.raw,r=[{titulo:`Paso 1 · Polo continuo estable (σ < 0) → Interior de |z| = 1`,cuerpo:n`
      <p>Si una planta continua tiene un polo en \(s = \sigma + j\omega\) con \(\sigma &lt; 0\), su exponencial \(e^{\sigma t}\) decae a cero. Al muestrear cada \(T\) segundos:</p>
      \[ |z| = e^{\sigma T} &lt; 1 \]
      <p>Todo el semiplano izquierdo continuo queda encerrado dentro del disco unitario del plano \(Z\).</p>
    `},{titulo:`Paso 2 · Eje imaginario (σ = 0) → Frontera |z| = 1`,cuerpo:n`
      <p>Un oscilador sin amortiguamiento (\(s = \pm j\omega\)) tiene \(\sigma = 0\), por lo que:</p>
      \[ z = e^{\pm j\omega T} \implies |z| = 1 \]
      <p>Los polos sobre el anillo amarillo producen oscilaciones sostenidas que ni crecen ni desaparecen (estabilidad marginal).</p>
    `},{titulo:`Paso 3 · Polo continuo inestable (σ > 0) → Exterior |z| > 1`,cuerpo:n`
      <p>Cuando \(\sigma &gt; 0\), el radio discreto supera la unidad: \(|z| = e^{\sigma T} &gt; 1\). Cada término \(p^k\) crece exponencialmente con \(k\):</p>
      \[ \lim_{k \to \infty} |p|^k = \infty \]
      <p>Basta un solo polo fuera del círculo unitario para que toda la ecuación en diferencias sea inestable.</p>
    `},{titulo:`Paso 4 · Frecuencia de oscilación y ángulo θ = ωT`,cuerpo:n`
      <p>La parte imaginaria \(\omega\) se traduce directamente en el ángulo polar \(\theta = \omega T\) (radianes por muestra):</p>
      \[ N_{\text{ciclo}} = \frac{2\pi}{\omega T} \text{ muestras por ciclo} \]
      <p>Si \(\theta = \pi\) (polo real negativo), la señal cambia de signo en cada muestra: es la máxima frecuencia representable (frecuencia de Nyquist).</p>
    `},{titulo:`Paso 5 · Elección del método de discretización`,cuerpo:n`
      <p>No todos los métodos preservan igual el mapeo \(z = e^{sT}\):</p>
      <ul>
        <li><strong>ZOH:</strong> exacta cuando una planta continua recibe señal de un DAC escalonado.</li>
        <li><strong>Tustin:</strong> mapea exactamente el semiplano izquierdo dentro de \(|z| &lt; 1\); ideal para filtros y controladores.</li>
        <li><strong>Euler adelante:</strong> sencillo, pero si \(T &gt; 2\tau\) saca el polo del círculo unitario y diverge.</li>
      </ul>
    `}];function i(e,t){let n=e.querySelector(`[data-ch3-stepper]`);if(!n)return;let i=n.querySelector(`[data-step-prev]`),a=n.querySelector(`[data-step-next]`),o=n.querySelector(`[data-step-reset]`),s=n.querySelector(`[data-step-counter]`),c=n.querySelector(`[data-step-body]`),l=[...n.querySelectorAll(`[data-step-row]`)],u=0;function d(){let e=r[u];s.textContent=`Paso ${u+1} de ${r.length}`,i.disabled=u===0,a.disabled=u===r.length-1,c.innerHTML=`<p><strong>${e.titulo}</strong></p>${e.cuerpo}`,t.renderMathIn(c),l.forEach((e,t)=>{e.querySelectorAll(`td`).forEach(e=>e.classList.toggle(`is-current`,t===u))})}i.addEventListener(`click`,()=>{u>0&&(--u,d())}),a.addEventListener(`click`,()=>{u<r.length-1&&(u+=1,d())}),o.addEventListener(`click`,()=>{u=0,d()}),l.forEach((e,t)=>{e.style.cursor=`pointer`,e.addEventListener(`click`,()=>{u=t,d()})}),d()}var a=e({html:t,objetivos:[`Interpretar paso a paso el mapeo z = exp(sT) y el significado geométrico del círculo unitario |z| = 1.`,`Explorar en 3D cómo la parte real σ, la frecuencia ω y el muestreo T ubican los polos en el plano Z.`,`Comparar los métodos ZOH, Tustin, Euler adelante y Euler atrás en precisión y preservación de estabilidad.`],presets:{subamortiguado:{sigma:-.8,omega:2.2,T:.35,animar:!0},motorDc:{T:.05,tau:.5,K:20,titulo:`Motor DC G(s) = 20 / (0.5s + 1) — Escalón de 6 V`},servo3d:{a1:-1.3,a2:.4,b0:1}},setup:i});export{a as default};