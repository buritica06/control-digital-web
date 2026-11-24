import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<h2 id="puente-s-z">1. El puente físico entre el plano \\(s\\) y el plano \\(z\\)</h2>
<p>
  Toda planta real vive en el tiempo continuo. Para simularla o controlarla desde un microcontrolador, traducimos su
  modelo continuo \\(G(s)\\) a una ecuación en diferencias mediante el mapeo fundamental \\(z = e^{sT}\\).
</p>
<p>
  Piensa en \\(z = e^{sT}\\) como un cambio de mapa: toda la región estable del plano continuo (el semiplano izquierdo
  \\(\\text{Re}(s) &lt; 0\\)) queda plegada dentro del <strong>círculo unitario \\(|z| &lt; 1\\)</strong>. Si un polo cae
  afuera (\\(|p| &gt; 1\\)), su contribución \\(p^k\\) crece sin límite y el sistema se vuelve inestable.
</p>

<h2 id="metodos-discretizacion">2. Cuatro formas de discretizar una planta de primer orden</h2>
<p>
  Considera una planta clásica de primer orden \\(\\tau\\dot{y}(t) + y(t) = Ku(t)\\), es decir
  \\(G(s) = \\dfrac{K}{\\tau s + 1}\\) (como un motor DC o un circuito RC). Según el método elegido, cambian tanto el
  polo discreto como la garantía de estabilidad:
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
        <td>Siempre estable; excelente para filtros y controladores.</td>
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

<h2 id="lab-discretizacion">3. Experimento: ¿cuándo falla Euler adelante?</h2>
<p>
  Compara las cuatro curvas frente a la planta continua ante un escalón de \\(6\\text{ V}\\). Con \\(T = 0.05\\text{ s}\\) y
  \\(\\tau = 0.5\\text{ s}\\) todos los métodos coinciden muy bien; pero sube \\(T\\) por encima de \\(2\\tau = 1.0\\text{ s}\\)
  y observa cómo <strong>Euler adelante explota</strong> mientras ZOH y Tustin siguen siendo estables.
</p>
<div data-viz="comparadorDiscretizacion" data-preset="motorDc"></div>

<h2 id="relieve-3d">4. Geometría 3D en el plano \\(Z\\) y círculo unitario</h2>
<p>
  En esta vista tridimensional, cada pico corresponde a un polo de \\(G(z) = \\dfrac{b_0 z^2}{z^2 + a_1 z + a_2}\\).
  El anillo amarillo marca la frontera de estabilidad \\(|z| = 1\\). Las esferas verdes indican polos estables
  (\\(|p| &lt; 1\\)); si cambias \\(a_1\\) o \\(a_2\\) hasta que alguna esfera salga del anillo, se vuelve roja: el sistema
  pierde estabilidad.
</p>
<div data-viz="superficieLti3D" data-preset="servo3d"></div>

<h2 id="manim-estabilidad">5. Animación Manim: tres regímenes de estabilidad en el plano \\(Z\\)</h2>
<p>
  Observa cómo la posición de los polos respecto al círculo unitario define directamente la forma de la secuencia:
  oscilación amortiguada (polos complejos dentro), alternancia de signo (polo real negativo dentro) o divergencia
  (polos fuera).
</p>
<div data-manim="scene4"></div>
`,objetivos:[`Interpretar el mapeo z = exp(sT) y el significado geométrico del círculo unitario |z| = 1.`,`Comparar los métodos ZOH, Tustin, Euler adelante y Euler atrás en precisión y preservación de estabilidad.`,`Relacionar la ubicación de los polos en la superficie 3D |G(z)| con la estabilidad y oscilación en el tiempo.`],presets:{motorDc:{T:.05,tau:.5,K:20,titulo:`Motor DC G(s) = 20 / (0.5s + 1) — Escalón de 6 V`},servo3d:{a1:-1.3,a2:.4,b0:1}}});export{t as default};