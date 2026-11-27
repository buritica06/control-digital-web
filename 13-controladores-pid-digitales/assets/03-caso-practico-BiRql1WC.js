import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 3: Apartado 5 (Caso práctico: Control PID de velocidad PWM con Anti-Windup) -->
<h2 id="enunciado-caso">5.1 Sistema físico real: servomotor DC de velocidad con driver PWM (0–12 V)</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Especificación del firmware embebido (T = 0.02 s)</span>
  <p>
    Se diseña un lazo de control digital de velocidad para un servomotor DC (\\(0\\text{–}1000\\ \\text{RPM}\\)) alimentado
    por un puente H PWM con límites físicos \\(U_{\\min} = 0\\ \\text{V}\\) y \\(U_{\\max} = 12\\ \\text{V}\\). Los parámetros
    sintonizados son \\(K_p = 2.5\\), \\(T_i = 0.2\\ \\text{s}\\), \\(T_d = 0.05\\ \\text{s}\\) y \\(T = 0.02\\ \\text{s}\\)
    (\\(f_s = 50\\ \\text{Hz}\\)).
  </p>
</div>

<h2 id="solucion-analitica">5.2 Cálculo analítico del algoritmo PID incremental</h2>
<ol>
  <li>
    <strong>Factores adimensionales de discretización:</strong>
    \\[
      \\frac{T}{2T_i} = \\frac{0.02}{2(0.2)} = 0.05, \\qquad \\frac{T_d}{T} = \\frac{0.05}{0.02} = 2.5
    \\]
  </li>
  <li>
    <strong>Coeficientes \\(q_0, q_1, q_2\\):</strong>
    \\[
      q_0 = 2.5(1 + 0.05 + 2.5) = \\mathbf{8.875}, \\quad
      q_1 = -2.5(1 - 0.05 + 5.0) = \\mathbf{-14.875}, \\quad
      q_2 = 2.5(2.5) = \\mathbf{6.250}
    \\]
  </li>
  <li>
    <strong>Ley recursiva con saturación <em>Anti-Windup Clamping</em>:</strong>
    \\[
      \\Delta u[k] = 8.875\\,e[k] - 14.875\\,e[k-1] + 6.250\\,e[k-2], \\qquad
      u[k] = \\mathrm{clip}\\!\\left(u[k-1] + \\Delta u[k],\\, 0.0,\\, 12.0\\right)
    \\]
  </li>
</ol>

<h2 id="simulador-sincronizado">5.3 Simulador sincronizado 3D + 2D: Motor DC con PID Digital y Anti-Windup</h2>
<p>
  Ajusta \\(K_p, T_i, T_d\\), el límite de saturación \\(U_{\\max}\\) y el conmutador <strong>Anti-Windup</strong>. Observa
  en la <strong>escena 3D</strong> cómo el volante inercial gira según las RPM reales y la barra LED se ilumina en rojo
  al saturar el PWM, mientras la <strong>gráfica 2D</strong> contrasta la respuesta con y sin protección anti-windup.
</p>
<div data-viz="motorPIDDigitalSim" data-preset="nominal"></div>
`,objetivos:[`Calcular los coeficientes incrementales q₀ = 8.875, q₁ = −14.875, q₂ = 6.250.`,`Verificar en 3D + 2D cómo el esquema anti-windup evita el sobrepaso excesivo tras la saturación PWM.`],presets:{nominal:{params:{Kp:.035,Ti:.25,Td:.02,uMax:12,refRpm:1e3,antiWindup:!0}}}});export{t as default};