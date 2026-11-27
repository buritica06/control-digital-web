import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Ejemplo o caso práctico con simulador 3D + 2D) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: control digital de un reactor químico exotérmico</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Especificación de la planta industrial</span>
  <p>
    Se diseña el lazo de control digital de temperatura para un <strong>reactor químico exotérmico continuo</strong>
    equipado con camisa de enfriamiento, agitador mecánico, válvula proporcional accionada por DAC/ZOH y sensor RTD
    expuesto a ruido electromagnético acoplado de \\(60\\ \\text{Hz}\\) proveniente de la red eléctrica. La dinámica
    dominante del proceso se modela como un sistema de primer orden con retardo puro de transporte:
  </p>
</div>
\\[
  G_p(s) = \\frac{K_p}{\\tau s + 1}\\,e^{-Ls} = \\frac{2.5}{15s + 1}\\,e^{-2s}
\\]
<p>
  <strong>Parámetros nominales:</strong> ganancia estática \\(K_p = 2.5\\ ^\\circ\\text{C}/\\%\\), constante de tiempo térmica
  \\(\\tau = 15\\ \\text{s}\\), retardo de transporte \\(L = 2\\ \\text{s}\\), frecuencia de cruce de ganancia
  \\(\\omega_c \\approx 0.1\\ \\text{rad/s}\\) y perturbación de sensor a \\(f_{\\text{ruido}} = 60\\ \\text{Hz}\\).
</p>

<h2 id="solucion-analitica">5.2 Solución analítica paso a paso</h2>
<ol>
  <li>
    <strong>Selección del periodo de muestreo \\(T\\):</strong>
    <ul>
      <li>
        Por tiempo de subida (\\(t_r \\approx 2.2\\tau = 33\\ \\text{s}\\)): \\(T \\approx t_r / 10 = 3.3\\ \\text{s}\\).
      </li>
      <li>
        Por ancho de banda del proceso (\\(\\omega_b \\approx 1/\\tau = 0.0667\\ \\text{rad/s}\\)), usando \\(\\omega_s = 20\\omega_b\\):
        \\[
          \\omega_s = 20(0.0667) \\approx 1.33\\ \\text{rad/s} \\;\\Rightarrow\\; T = \\frac{2\\pi}{1.33} \\approx 4.71\\ \\text{s}
        \\]
      </li>
      <li>
        Por compatibilidad con el retardo puro \\(L = 2\\ \\text{s}\\): conviene elegir \\(T\\) como submúltiplo exacto de
        \\(L\\) (\\(d = L/T \\in \\mathbb{Z}^+\\)). Adoptando <strong>\\(T = 1.0\\ \\text{s}\\)</strong> (\\(f_s = 1.0\\ \\text{Hz}\\),
        \\(\\omega_s = 2\\pi\\ \\text{rad/s}\\)), se obtienen \\(d = 2\\) pasos enteros de retardo y más de \\(60\\) muestras dentro
        del tiempo de establecimiento (\\(4\\tau = 60\\ \\text{s}\\)).
      </li>
    </ul>
  </li>
  <li>
    <strong>Pérdida de margen de fase introducida por el ZOH:</strong> evaluando a \\(\\omega_c = 0.1\\ \\text{rad/s}\\):
    \\[
      \\Delta\\phi_{\\mathrm{ZOH}} = -\\frac{\\omega_c T}{2} = -\\frac{0.1 \\cdot 1.0}{2} = -0.05\\ \\text{rad} \\approx -2.86^\\circ
    \\]
    <p>
      Con \\(T = 1.0\\ \\text{s}\\) la degradación de fase es mínima (\\(-2.86^\\circ\\)). En contraste, un muestreo lento de
      \\(T = 5.0\\ \\text{s}\\) provoca \\(-14.32^\\circ\\) de pérdida adicional, generando sobreimpulso severo u oscilación.
    </p>
  </li>
  <li>
    <strong>Diseño del filtro analógico antialiasing:</strong> con \\(f_s = 1.0\\ \\text{Hz}\\), la frecuencia de Nyquist es
    \\(f_N = 0.5\\ \\text{Hz}\\). Se diseña un filtro pasobajo <strong>Butterworth de 2.º orden</strong> con frecuencia de
    corte \\(f_c = 0.2\\ \\text{Hz}\\) (\\(\\omega_c^{\\mathrm{filtro}} = 1.257\\ \\text{rad/s}\\)), cuya atenuación a
    \\(60\\ \\text{Hz}\\) supera los \\(95\\ \\text{dB}\\) (\\(40\\ \\text{dB/década}\\)):
    \\[
      H_{\\mathrm{AA}}(s) = \\frac{\\omega_c^2}{s^2 + \\sqrt{2}\\,\\omega_c s + \\omega_c^2}, \\qquad
      |H_{\\mathrm{AA}}(j\\cdot 2\\pi\\cdot 60)|_{\\mathrm{dB}} \\approx -40\\log_{10}\\!\\left(\\frac{60}{0.2}\\right) \\approx -99.1\\ \\text{dB}
    \\]
  </li>
</ol>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D en tiempo real</h2>
<p>
  El laboratorio acopla la <strong>planta física 3D del reactor</strong> (tanque con fluido térmico coloreado según la
  temperatura \\(y(t)\\), agitador rotativo, válvula proporcional que cambia a saltos con \\(u_{\\mathrm{ZOH}}(t)\\) y sensor
  RTD que destella en cada instante \\(t = kT\\)) con la <strong>gráfica 2D de respuesta dinámica y ZOH</strong>.
  Mueve los controles para verificar cómo el incremento de \\(T\\) degrada el margen de fase y cómo desactivar el filtro
  antialiasing inyecta un alias en el lazo.
</p>
<div data-viz="reactorZOHSim" data-preset="nominal"></div>
`,objetivos:[`Aplicar reglas heurísticas de selección de periodo T a una planta térmica con retardo de transporte.`,`Cuantificar la pérdida de margen de fase del ZOH y verificar su efecto dinámico en tiempo real (3D + 2D).`,`Evaluar la necesidad del filtro analógico Butterworth antialiasing frente a ruido acoplado de alta frecuencia.`],presets:{nominal:{params:{T:1,Kc:.55,Tref:65,ruidoAmp:3.5,filtroAA:!0}}}});export{t as default};