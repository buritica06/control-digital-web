import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="sintesis">1. Síntesis sistémica</h2>
<ul>
  <li>
    Un lazo de control digital une el dominio continuo y el discreto mediante dos interfaces críticas sincronizadas por
    el reloj de periodo \\(T\\): el <strong>ADC + S/H</strong> en la medición y el <strong>DAC + ZOH</strong> en la
    actuación.
  </li>
  <li>
    El convertidor ADC impone una <strong>doble discretización</strong>: en el tiempo (\\(x[k] = x(kT)\\)) y en la
    amplitud (\\(2^n\\) niveles separados por \\(Q = V_{\\mathrm{FS}}/2^n\\)).
  </li>
  <li>
    Para evitar el <strong>aliasing</strong> se necesita un filtro pasobajo analógico antes del ADC y cumplir
    \\(f_s &gt; 2 f_{\\max}\\) (en la práctica de control, \\(10\\text{–}30\\) veces el ancho de banda del lazo).
  </li>
  <li>
    El <strong>retenedor ZOH</strong> introduce un retardo medio de \\(T/2\\), mientras que la cuantificación fija un
    piso de ruido eficaz \\(\\sigma_q = Q / \\sqrt{12}\\) y un \\(\\mathrm{SQNR} \\approx 6.02n + 1.76\\ \\text{dB}\\).
  </li>
  <li>
    Elegir entre <strong>MCU, DSP, FPGA o PLC</strong> depende del determinismo temporal, la frecuencia de muestreo y
    el presupuesto del sistema, evitando tanto el subdimensionamiento como el sobrecosto innecesario.
  </li>
</ul>

<div class="callout callout--def" role="note">
  <span class="callout__title">Criterio profesional del ingeniero mecatrónico</span>
  <p>
    Dimensionar hardware con rigor es una responsabilidad ética y técnica: subdimensionar compromete la precisión y la
    seguridad operativa de la máquina; sobredimensionar vuelve inviable el proyecto en costo y mantenimiento.
  </p>
</div>

<h2 id="evaluacion">2. Criterios de evaluación (MEC36-RA1)</h2>
<div class="table-wrap">
  <table>
    <caption>Alineación curricular — Resultado de aprendizaje MEC36-RA1</caption>
    <thead>
      <tr>
        <th scope="col">Criterio</th>
        <th scope="col">Sobresaliente</th>
        <th scope="col">Aceptable</th>
        <th scope="col">Insuficiente</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>CE1 — Elementos del lazo digital</strong></td>
        <td>Explica el flujo completo de señales, dimensiona \\(T\\), \\(n\\), \\(Q\\), \\(\\sigma_q\\) y SQNR sin errores y justifica su impacto en la estabilidad.</td>
        <td>Identifica los bloques del lazo y calcula \\(Q\\) o \\(f_N\\), pero omite su relación con el desempeño dinámico del sistema.</td>
        <td>Confunde muestreo con cuantificación o ubica incorrectamente el filtro antialiasing y el ZOH.</td>
      </tr>
      <tr>
        <td><strong>CE2 — Tecnologías de procesamiento</strong></td>
        <td>Selecciona MCU, DSP, FPGA o PLC justificando determinismo temporal, ancho de banda y costo del proceso.</td>
        <td>Reconoce diferencias generales entre plataformas, pero con justificación parcial frente a los tiempos del lazo.</td>
        <td>Propone hardware incompatible con el periodo de muestreo o el entorno industrial.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="siguiente">3. Puente hacia la Semana 2</h2>
<p>
  Ahora que comprendes cómo una señal física \\(x(t)\\) se transforma en una secuencia numérica \\(x[k]\\), la siguiente
  pregunta es: <em>¿cómo analizamos y diseñamos matemáticamente sistemas que operan sobre secuencias?</em> En la
  <strong>Semana 2 (Transformada Z)</strong> construiremos el equivalente discreto de la Transformada de Laplace para
  estudiar polos, estabilidad y respuesta en el plano \\(z\\).
</p>

<h2 id="bibliografia">4. Bibliografía (formato IEEE)</h2>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 1.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, caps. 1–2.</li>
  <li>M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic Press, 2019, caps. 1–3.</li>
</ol>
`,objetivos:[`Integrar en una visión sistémica los conceptos de arquitectura, muestreo, ZOH, cuantificación y hardware.`,`Reconocer los criterios de evaluación de MEC36-RA1 y la conexión con la Transformada Z.`]});export{t as default};