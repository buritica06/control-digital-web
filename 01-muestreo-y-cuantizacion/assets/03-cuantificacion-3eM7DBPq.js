import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="que-es-cuantificar">1. Cuantificación: convertir voltaje en palabras binarias</h2>
<p>
  Una vez que el circuito <em>Sample &amp; Hold</em> congela el voltaje de la muestra \\(x(kT)\\), el convertidor ADC
  debe guardarlo usando un número finito de \\(n\\) bits. Con \\(n\\) bits solo existen \\(2^n\\) códigos binarios distintos
  para repartir todo el rango de entrada \\(V_{\\mathrm{FS}}\\) (<em>Full Scale</em>).
</p>
<p>
  El salto mínimo que el convertidor logra distinguir se llama <strong>tamaño de paso</strong> o
  <strong>resolución elemental \\(Q\\)</strong> (valor de 1 LSB, <em>Least Significant Bit</em>):
</p>
\\[ Q = \\frac{V_{\\mathrm{FS}}}{2^n - 1} \\approx \\frac{V_{\\mathrm{FS}}}{2^n} \\]
<p>
  Cuantos más bits tenga el ADC, más pequeño es el escalón \\(Q\\) y más fina es la lectura que recibe el controlador.
</p>

<h2 id="error-ruido">2. Error de cuantificación, ruido RMS y SQNR</h2>
<p>
  Al redondear cada muestra real al nivel discreto más cercano, introducimos un pequeño error instantáneo
  \\(e_q[k] = x[k] - x_q[k]\\). Como el redondeo nunca dista más de medio escalón, el error siempre queda acotado:
</p>
\\[ -\\frac{Q}{2} \\le e_q[k] \\le \\frac{Q}{2} \\]
<p>
  Si la señal varía con suficiente riqueza respecto a \\(Q\\), el error se comporta como ruido uniforme en ese intervalo.
  Integrando sobre \\([-Q/2,\\; Q/2]\\) obtenemos la <strong>potencia (varianza)</strong> y el
  <strong>valor eficaz (RMS)</strong> del ruido de cuantificación:
</p>
\\[ \\sigma_q^2 = \\int_{-Q/2}^{Q/2} e_q^2 \\,\\frac{1}{Q}\\,de_q = \\frac{Q^2}{12}, \\qquad \\sigma_q = \\frac{Q}{\\sqrt{12}} \\]
<p>
  Para una señal senoidal que aprovecha todo el rango \\(V_{\\mathrm{FS}}\\), la relación señal a ruido de cuantificación
  teórica máxima (<strong>SQNR</strong>) crece aproximadamente <strong>\\(6\\ \\text{dB}\\) por cada bit adicional</strong>:
</p>
\\[ \\mathrm{SQNR} \\approx 6.02\\,n + 1.76 \\quad [\\text{dB}] \\]

<div class="callout callout--thm" role="note">
  <span class="callout__title">Regla práctica de ingeniería</span>
  <p>
    Cada bit extra en el ADC <strong>duplica</strong> la cantidad de niveles, <strong>reduce a la mitad</strong> el
    tamaño de paso \\(Q\\) y el ruido eficaz \\(\\sigma_q\\), y gana \\(6.02\\ \\text{dB}\\) de relación señal a ruido.
  </p>
</div>

<h2 id="impacto-lazo">3. ¿Por qué importa esto en un lazo cerrado?</h2>
<p>
  En una planta física, el ruido de cuantificación no es solo un número en papel. Cuando la resolución \\(n\\) es muy baja
  respecto a la precisión requerida:
</p>
<ul>
  <li>
    <strong>Banda muerta de medición:</strong> variaciones pequeñas de la planta menores que \\(Q\\) resultan invisibles
    para el controlador.
  </li>
  <li>
    <strong>Ciclos límite (<em>limit cycles</em>):</strong> el controlador salta repetidamente entre dos códigos
    vecinos, haciendo vibrar válvulas o motores y acelerando su desgaste mecánico.
  </li>
  <li>
    <strong>Amplificación en acción derivativa:</strong> si usas un PID digital, el término derivativo divide saltos de
    tamaño \\(Q\\) entre un \\(T\\) pequeño, inyectando picos de ruido directo al actuador.
  </li>
</ul>

<h2 id="laboratorio-cuantificacion">4. Laboratorio interactivo: resolución y error de cuantificación</h2>
<p>
  Empieza con \\(n = 4\\ \\text{bits}\\) para distinguir con facilidad los escalones, cambia luego la vista a
  <strong>Error \\(e_q[k]\\)</strong> y observa cómo el error se mantiene encerrado entre \\(-Q/2\\) y \\(+Q/2\\). Sube
  después a \\(10\\) o \\(12\\ \\text{bits}\\) y compara el ruido RMS simulado con \\(\\sigma_q = Q/\\sqrt{12}\\).
</p>

<div data-viz="cuantificacionADC" data-preset="exploracion"></div>

<h2 id="superficie-3d">5. Mapa 3D: cómo escala el paso \\(Q\\) con \\(V_{\\mathrm{FS}}\\) y los bits \\(n\\)</h2>
<p>
  Esta superficie tridimensional muestra el logaritmo del paso de cuantificación \\(\\log_{10}(Q)\\) en función del rango
  de voltaje \\(V_{\\mathrm{FS}}\\) (eje \\(x\\)) y la resolución en bits \\(n\\) (eje \\(y\\)). Rota la figura para ver que
  aumentar \\(n\\) hace caer el error de forma exponencial, mucho más rápido que reducir \\(V_{\\mathrm{FS}}\\).
</p>

<div data-viz="superficie3D" data-preset="mapaQ"></div>
`,objetivos:[`Calcular el tamaño de paso Q (LSB), el error máximo ±Q/2, el ruido eficaz σ_q y el SQNR de un convertidor ADC.`,`Verificar en simulación cómo el ruido RMS experimental converge al modelo teórico Q / √12.`,`Explicar el efecto sistémico de una resolución insuficiente (banda muerta, ciclos límite y ruido en acción derivativa).`],presets:{exploracion:{params:{bits:4,vMax:10,fSenal:1.5,fs:40,vista:`comparacion`}},mapaQ:{titulo:`Superficie 3D del tamaño de paso log₁₀(Q)`,descripcion:`Eje x: variación de V_FS (1.5 a 10.5 V). Eje y: variación de resolución n (4 a 12 bits). Eje z: log₁₀(Q). Cada bit extra reduce Q a la mitad.`,hideControls:[`expresion`,`a`,`b`,`rango`],params:{expresion:`(log(x + 6) - (y + 8) * log(2)) / log(10)`,a:1,b:1,rango:4.5,altura:1.4,ejeX:`V_FS`,ejeY:`n (bits)`,ejeZ:`log₁₀(Q)`}}}});export{t as default};