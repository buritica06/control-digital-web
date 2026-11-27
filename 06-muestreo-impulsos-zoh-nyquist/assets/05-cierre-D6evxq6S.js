import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7 (Resumen y conclusiones), 9 (Bibliografía y recursos) y 10 (Cierre) -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li>
    <strong>Muestreo por impulsos:</strong> multiplicar \\(x(t)\\) por \\(\\delta_T(t)\\) replica el espectro continuo
    \\(X(j\\omega)\\) cada \\(\\omega_s = 2\\pi/T\\) rad/s con factor de escala \\(1/T\\).
  </li>
  <li>
    <strong>Shannon-Nyquist y antialiasing:</strong> se requiere estrictamente \\(f_s &gt; 2f_{\\max}\\) para evitar
    solapamiento espectral. En la práctica de control digital se interpone un filtro analógico pasobajo con
    \\(f_c \\le f_s/2\\) antes del ADC y se muestrea a \\(10\\text{–}30\\) veces el ancho de banda del lazo cerrado.
  </li>
  <li>
    <strong>Retenedor de Orden Cero (ZOH):</strong> su respuesta \\(G_{\\mathrm{ZOH}}(j\\omega) = T\\,\\mathrm{sinc}(\\omega T/2\\pi)e^{-j\\omega T/2}\\)
    actúa aproximadamente como un retardo puro de \\(T/2\\), reduciendo el margen de fase en \\(\\Delta\\phi_{\\mathrm{ZOH}} = -\\omega_c T/2\\) rad.
  </li>
  <li>
    <strong>Criterio de ingeniería mecatrónica:</strong> elegir \\(T\\) demasiado grande desestabiliza el lazo por pérdida
    de fase y aliasing; elegir \\(T\\) demasiado pequeño incrementa la carga computacional y la sensibilidad a errores de
    cuantificación numérica.
  </li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — Criterio CE1 (MEC36-RA3)</caption>
    <thead>
      <tr>
        <th scope="col">Criterio</th>
        <th scope="col">Peso</th>
        <th scope="col">Sobresaliente</th>
        <th scope="col">Aceptable</th>
        <th scope="col">Insuficiente</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Selección del periodo \\(T\\)</td>
        <td>40 %</td>
        <td>Justifica \\(T\\) con al menos dos criterios (\\(t_r\\), \\(\\omega_b\\), retardo \\(L\\)) y verifica \\(\\Delta\\phi_{\\mathrm{ZOH}} &lt; 10^\\circ\\).</td>
        <td>Calcula \\(T\\) usando un único criterio heurístico sin validar la pérdida de fase.</td>
        <td>Elige \\(T\\) arbitrariamente o viola el límite de Nyquist.</td>
      </tr>
      <tr>
        <td>Análisis de aliasing y filtro AA</td>
        <td>35 %</td>
        <td>Calcula \\(f_{\\mathrm{alias}}\\) con exactitud y especifica orden y \\(f_c\\) del filtro analógico antialiasing.</td>
        <td>Identifica presencia de aliasing pero omite la atenuación requerida del filtro.</td>
        <td>Propone eliminar aliasing mediante filtrado digital posterior al ADC.</td>
      </tr>
      <tr>
        <td>Interpretación del simulador 3D/2D</td>
        <td>25 %</td>
        <td>Relaciona cuantitativamente la oscilación observada con el aumento de \\(T\\) y el retardo del ZOH.</td>
        <td>Describe cualitativamente los cambios en la respuesta al variar \\(T\\).</td>
        <td>No conecta los parámetros del simulador con el modelo matemático.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<h3>9.1 Referencias académicas (formato IEEE)</h3>
<ol>
  <li>
    K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996,
    cap. 3.
  </li>
  <li>
    G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA:
    Addison-Wesley, 1998, cap. 3.
  </li>
  <li>
    M. S. Fadali y A. Visioli, <em>Digital Control Engineering: Analysis and Design</em>, 3.ª ed. Londres: Academic
    Press, 2019, cap. 2.
  </li>
  <li>
    K. J. Åström y B. Wittenmark, <em>Computer-Controlled Systems: Theory and Design</em>, 3.ª ed. Mineola, NY: Dover
    Publications, 2011, cap. 2–3.
  </li>
  <li>
    B. C. Kuo, <em>Digital Control Systems</em>, 2.ª ed. Nueva York: Oxford University Press, 1995, cap. 3.
  </li>
</ol>

<h3>9.2 Recurso de laboratorio computacional en Python</h3>
<p>
  Reproduce en Python (NumPy) la demostración exacta del plegamiento espectral (\\(f_0 = 9\\ \\text{Hz}\\),
  \\(f_s = 10\\ \\text{Hz} \\Rightarrow f_{\\mathrm{alias}} = 1\\ \\text{Hz}\\)):
</p>
<pre class="no-math"><code>import numpy as np

f_real, f_s, duracion = 9.0, 10.0, 2.0
T = 1.0 / f_s
t_k = np.arange(0, duracion, T)
x_k = np.sin(2 * np.pi * f_real * t_k)

f_alias = abs(f_real - f_s)               # 1.0 Hz
x_alias_k = -np.sin(2 * np.pi * f_alias * t_k)
print(f"Error máximo entre muestras y alias: {np.max(np.abs(x_k - x_alias_k)):.2e}")</code></pre>

<h2 id="cierre">10. Cierre y conexión con el siguiente módulo</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 7 — Función de Transferencia de Pulso</span>
  <p>
    Ahora que conocemos cómo el muestreador de impulsos discretiza la señal y cómo el Retenedor de Orden Cero
    \\(G_{\\mathrm{ZOH}}(s) = \\frac{1 - e^{-sT}}{s}\\) conecta el controlador con la planta continua \\(G_p(s)\\), en la
    <strong>Semana 7</strong> combinaremos ambos bloques para derivar la <strong>función de transferencia de pulso</strong>
    \\(G(z) = (1 - z^{-1})\\mathcal{Z}\\!\\left\\{\\frac{G_p(s)}{s}\\right\\}\\) y modelar lazos abiertos y cerrados con muestreo
    sincronizado.
  </p>
</div>
`,objetivos:[`Sintetizar las relaciones clave de Nyquist, aliasing y desfase del ZOH.`,`Verificar el dominio del criterio CE1 mediante la rúbrica y el script de laboratorio en Python.`,`Conectar el modelo del ZOH con la derivación de la función de transferencia de pulso en Semana 7.`]});export{t as default};