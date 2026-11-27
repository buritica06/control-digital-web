import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 2: Apartado 4 (Desarrollo de sección) -->
<h2 id="algoritmo-posicion">4.1 Algoritmo PID de posición</h2>
<p>
  Partiendo de la ley continua \\(u(t) = K_p\\!\\left(e(t) + \\frac{1}{T_i}\\int_0^t e(\\tau)\\,d\\tau + T_d\\frac{de}{dt}\\right)\\),
  la forma <strong>posicional</strong> calcula directamente la salida absoluta \\(u[k]\\):
</p>
\\[
  u[k] = K_p\\,e[k] + \\sum_{j=0}^{k}\\frac{K_p T}{T_i}\\,e[j] + \\frac{K_p T_d}{T}\\left(e[k] - e[k-1]\\right)
\\]

<h2 id="algoritmo-velocidad">4.2 Algoritmo PID de velocidad (incremental)</h2>
<p>
  La forma <strong>incremental</strong> (estándar en PLC y firmware embebido) calcula únicamente el incremento
  \\(\\Delta u[k] = u[k] - u[k-1]\\). Empleando integración trapezoidal (Tustin) y derivada hacia atrás:
</p>
\\[
  \\Delta u[k] = q_0\\,e[k] + q_1\\,e[k-1] + q_2\\,e[k-2], \\qquad u[k] = u[k-1] + \\Delta u[k]
\\]
\\[
  q_0 = K_p\\!\\left(1 + \\frac{T}{2T_i} + \\frac{T_d}{T}\\right), \\qquad
  q_1 = -K_p\\!\\left(1 - \\frac{T}{2T_i} + \\frac{2T_d}{T}\\right), \\qquad
  q_2 = K_p\\,\\frac{T_d}{T}
\\]

<div class="table-wrap">
  <table>
    <caption>Comparación: PID en forma de posición vs. PID incremental (velocidad)</caption>
    <thead>
      <tr><th scope="col">Aspecto</th><th scope="col">Forma de posición</th><th scope="col">Forma de velocidad (incremental)</th></tr>
    </thead>
    <tbody>
      <tr><td>Salida calculada</td><td>Valor absoluto \\(u[k]\\)</td><td>Incremento \\(\\Delta u[k]\\)</td></tr>
      <tr><td>Conmutación Manual–Auto</td><td>Puede generar saltos (<em>bump</em>)</td><td>Suave por naturaleza (<em>bumpless transfer</em>)</td></tr>
      <tr><td>Protección Anti-Windup</td><td>Requiere lógica adicional de retroalimentación</td><td>Inmediata mediante saturación \\(u[k] = \\mathrm{sat}(u[k-1]+\\Delta u[k])\\)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="filtro-antiwindup">4.3 Filtrado derivativo y protección Anti-Windup</h2>
<ul>
  <li>
    <strong>Filtro derivativo de primer orden (\\(N \\approx 8\\text{–}20\\)):</strong> atenúa el ruido de alta frecuencia
    del encoder reemplazando la derivada ideal por \\(D(s) = \\dfrac{K_p T_d s}{1 + (T_d/N)s}\\):
    \\[
      D[k] = \\alpha\\,D[k-1] + K_p\\,\\frac{T_d}{T + T_d/N}\\left(e[k] - e[k-1]\\right), \\qquad \\alpha = \\frac{T_d/N}{T + T_d/N}
    \\]
  </li>
  <li>
    <strong>Anti-Windup (<em>Clamping</em>):</strong> cuando \\(u[k]\\) alcanza \\(U_{\\min}\\) o \\(U_{\\max}\\), se detiene la
    acumulación integral para evitar sobrepasos masivos al recuperar el control.
  </li>
</ul>

<h2 id="lab-filtro">4.4 Laboratorio 2D: acción derivativa pura vs. filtrada</h2>
<p>
  Ajusta el factor de filtrado \\(N\\) y el nivel de ruido del sensor para ver cómo el filtro derivativo elimina los
  picos destructivos en la señal de control.
</p>
<div data-viz="filtroDerivativoPID" data-preset="default"></div>
`,objetivos:[`Derivar los coeficientes q₀, q₁, q₂ del algoritmo PID incremental.`,`Comprobar el efecto del filtrado derivativo N y del anti-windup clamping.`],presets:{default:{params:{N:10,ruido:.08,Td:.05}}}});export{t as default};