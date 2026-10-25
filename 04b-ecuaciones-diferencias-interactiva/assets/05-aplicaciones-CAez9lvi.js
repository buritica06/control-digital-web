import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="estabilidad">1. Estabilidad y modos naturales</h2>
<p>
  La respuesta libre de una ecuación en diferencias es una combinación de los modos \\(p_i^{\\,k}\\). El tipo de polo
  determina la forma de cada modo:
</p>
<div class="table-wrap">
  <table>
    <caption class="visually-hidden">Ubicación del polo y modo natural</caption>
    <thead>
      <tr><th scope="col">Ubicación del polo</th><th scope="col">Modo natural</th><th scope="col">Comportamiento</th></tr>
    </thead>
    <tbody>
      <tr><td>Real, \\(0 &lt; p &lt; 1\\)</td><td>\\(p^{k}\\)</td><td>Decaimiento monótono (más lento cuanto más cerca de 1)</td></tr>
      <tr><td>Real, \\(-1 &lt; p &lt; 0\\)</td><td>\\((-|p|)^{k}\\)</td><td>Decaimiento alternado: cambia de signo en cada muestra</td></tr>
      <tr><td>Complejos \\(r\\,e^{\\pm j\\theta}\\), \\(r &lt; 1\\)</td><td>\\(r^{k}\\cos(\\theta k + \\varphi)\\)</td><td>Oscilación amortiguada; \\(\\theta\\) en rad/muestra</td></tr>
      <tr><td>\\(p = 0\\)</td><td>\\(\\delta[k]\\)</td><td>Desaparece en una muestra (respuesta “deadbeat”)</td></tr>
      <tr><td>\\(|p| = 1\\)</td><td>\\(\\cos(\\theta k)\\) o constante</td><td>Sostenido: marginalmente estable</td></tr>
      <tr><td>\\(|p| &gt; 1\\)</td><td>\\(|p|^{k}\\cdots\\)</td><td>Crece sin límite: inestable</td></tr>
    </tbody>
  </table>
</div>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Criterio de Jury para orden 2</span>
  <p>\\(P(z) = z^{2} + a_1 z + a_2\\) tiene ambas raíces dentro del círculo unitario si y solo si:</p>
  \\[ |a_2| &lt; 1, \\qquad P(1) = 1 + a_1 + a_2 &gt; 0, \\qquad P(-1) = 1 - a_1 + a_2 &gt; 0 \\]
  <p>
    En el plano \\((a_1, a_2)\\) estas tres desigualdades forman el <strong>triángulo de estabilidad</strong>. Para el
    caso de estudio, \\(a_1 = -1.3,\\ a_2 = 0.4\\): \\(|0.4| &lt; 1\\), \\(P(1) = 0.1 &gt; 0\\), \\(P(-1) = 2.7 &gt; 0\\):
    estable, aunque cerca del borde \\(P(1) = 0\\) (polo dominante en 0.8, respuesta lenta).
  </p>
</div>

<h2 id="filtro">2. Aplicación: filtro digital IIR para un sensor</h2>
<p>
  Un encoder entrega la velocidad de un motor con ruido de cuantización. El filtro pasa-bajos de primer orden
  \\(y[k] = \\alpha\\,y[k-1] + (1-\\alpha)\\,u[k]\\) tiene polo \\(p = \\alpha\\) y ganancia unitaria en continua. Con
  \\(T = 1\\,\\text{ms}\\) y una constante de tiempo deseada \\(\\tau = 20\\,\\text{ms}\\), el mapeo \\(p = e^{-T/\\tau}\\) da
  \\(\\alpha = e^{-0.05} \\approx 0.951\\). En firmware son dos multiplicaciones y una suma por muestra. Aumentar
  \\(\\alpha\\) filtra más ruido pero agrega retardo de fase: es el compromiso que muestra el diagrama de Bode.
</p>

<h2 id="lugar-raices">3. Lugar de raíces: de lazo abierto a lazo cerrado</h2>
<p>
  Al cerrar un lazo con ganancia proporcional \\(K\\) sobre la planta \\(G(z)\\), los polos de lazo cerrado son las raíces
  de \\(1 + K\\,G(z) = 0\\): una nueva ecuación en diferencias cuyos coeficientes dependen de \\(K\\). El lugar de raíces
  muestra cómo se mueven esos polos. En 3D usamos el eje vertical para \\(K\\); la proyección en el piso es el diagrama
  2D clásico, y el cilindro \\(|z| = 1\\) marca el límite de estabilidad.
</p>
<div data-viz="rootLocus3D"></div>
<p>
  Con la planta por defecto \\(G(z) = (z + 0.6)/((z - 1)(z - 0.4))\\), la ecuación característica es
  \\(z^{2} + (K - 1.4)\\,z + (0.4 + 0.6K) = 0\\). Por Jury, \\(|0.4 + 0.6K| &lt; 1 \\Rightarrow K &lt; 1\\): el panel debe
  mostrar \\(K_{\\text{crítico}} = 1\\), donde las ramas complejas atraviesan el cilindro.
</p>

<h2 id="frecuencia">4. Respuesta en frecuencia: Bode y Nyquist</h2>
<p>
  Evaluar \\(G(z)\\) en \\(z = e^{j\\Omega}\\) da la ganancia y el desfase que el sistema aplica a una senoidal muestreada
  de frecuencia \\(\\Omega\\) rad/muestra (\\(\\Omega = \\omega T\\)). Solo tiene sentido hasta \\(\\Omega = \\pi\\), la
  frecuencia de Nyquist: por encima, las senoidales muestreadas son indistinguibles (aliasing).
</p>
<div data-viz="bode"></div>
<p>
  El margen de fase y el margen de ganancia miden cuánto puede empeorar el lazo antes de volverse inestable. El
  diagrama de Nyquist muestra la misma información en el plano complejo: si la curva de \\(K\\,G(e^{j\\Omega})\\) se
  acerca al punto \\(-1\\), el lazo cerrado se acerca a la inestabilidad. Sube \\(K\\) en ambas gráficas y observa cómo el
  margen de ganancia (en dB) predice el \\(K\\) en que la curva toca \\(-1\\).
</p>
<div data-viz="nyquist"></div>

<h2 id="estados">5. Espacio de estados: la ecuación vectorial</h2>
<p>
  Un sistema de orden \\(n\\) es equivalente a \\(n\\) ecuaciones de primer orden acopladas,
  \\(\\mathbf{x}[k+1] = \\mathbf{A}\\,\\mathbf{x}[k]\\). La solución es \\(\\mathbf{x}[k] = \\mathbf{A}^{k}\\mathbf{x}[0]\\) y su
  comportamiento lo dictan los valores propios de \\(\\mathbf{A}\\) (los polos). El sistema es asintóticamente estable si
  el <strong>radio espectral</strong> \\(\\rho(\\mathbf{A}) = \\max |\\lambda_i| &lt; 1\\).
</p>
<div data-viz="espacioEstados"></div>
<ul>
  <li>Con \\(r &lt; 1\\) la trayectoria es una espiral que se cierra hacia el origen; con \\(r &gt; 1\\), se abre (observa la escala de ejes).</li>
  <li>\\(\\theta\\) fija cuántas muestras tarda una vuelta: \\(2\\pi/\\theta\\).</li>
  <li>Activa el haz de condiciones iniciales: todas las trayectorias comparten la misma forma porque la dinámica la impone \\(\\mathbf{A}\\), no el punto de partida.</li>
</ul>
`,objetivos:[`Clasificar los modos naturales según la ubicación de los polos y aplicar el criterio de Jury de orden 2.`,`Diseñar un filtro IIR de primer orden a partir de una constante de tiempo.`,`Leer un lugar de raíces discreto y encontrar la ganancia crítica.`,`Interpretar márgenes de estabilidad en Bode y Nyquist, y la estabilidad en espacio de estados.`]});export{t as default};