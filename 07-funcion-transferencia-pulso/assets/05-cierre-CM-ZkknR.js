import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<!-- Capítulo 5: Apartados 7, 9 y 10 -->
<h2 id="resumen">7. Resumen y conclusiones</h2>
<ul>
  <li>
    <strong>Función de transferencia de pulso con ZOH:</strong> \\(G(z) = (1 - z^{-1})\\mathcal{Z}\\{G_p(s)/s\\}\\) modela de
    forma exacta en los instantes \\(t = kT\\) el conjunto DAC/ZOH + planta continua + ADC.
  </li>
  <li>
    <strong>Álgebra de bloques muestreados:</strong> en cascada sin muestreador intermedio se usa la transformada
    conjunta \\(\\overline{G_1 G_2}(z) \\neq G_1(z)G_2(z)\\).
  </li>
  <li>
    <strong>Polos y ceros discretos:</strong> los polos se mapean exactamente como \\(z_i = e^{s_i T}\\), mientras que el
    ZOH introduce ceros de muestreo adicionales en el plano \\(z\\).
  </li>
  <li>
    <strong>Lazo cerrado:</strong> la dinámica discreta queda gobernada por \\(1 + D(z)G(z) = 0\\) (o \\(1 + D(z)\\overline{GH}(z) = 0\\)
    si el sensor \\(H(s)\\) no está separado por un muestreador).
  </li>
</ul>

<div class="table-wrap">
  <table>
    <caption>Rúbrica de evaluación — Criterio CE2 (MEC36-RA3)</caption>
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
        <td>Obtención de \\(G(z)\\) con ZOH</td>
        <td>45 %</td>
        <td>Deriva \\(G(z)\\) sin errores algebraicos, verifica ganancia DC \\(G(1)\\) e identifica polos y ceros.</td>
        <td>Plantea correctamente el método pero comete errores menores en fracciones parciales.</td>
        <td>Omite el factor \\((1 - z^{-1})\\) o discretiza sin dividir por \\(s\\).</td>
      </tr>
      <tr>
        <td>Álgebra de bloques y lazo cerrado</td>
        <td>35 %</td>
        <td>Distingue \\(\\overline{GH}(z)\\) de \\(G(z)H(z)\\) y obtiene la ecuación característica exacta.</td>
        <td>Deduce el lazo cerrado unitario correctamente pero falla con sensor continuo \\(H(s)\\).</td>
        <td>Aplica álgebra continua directa ignorando la posición de los muestreadores.</td>
      </tr>
      <tr>
        <td>Validación computacional</td>
        <td>20 %</td>
        <td>Contrasta sus resultados analíticos con <code>control.c2d</code> y el simulador 3D + 2D.</td>
        <td>Ejecuta la simulación sin interpretar el efecto de \\(K\\) y \\(T\\).</td>
        <td>No realiza validación numérica.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="bibliografia">9. Bibliografía y recursos</h2>
<h3>9.1 Referencias académicas (formato IEEE)</h3>
<ol>
  <li>K. Ogata, <em>Sistemas de control en tiempo discreto</em>, 2.ª ed. México: Prentice Hall Hispanoamericana, 1996, cap. 3.</li>
  <li>B. C. Kuo, <em>Digital Control Systems</em>, 2.ª ed. Nueva York: Oxford University Press, 1995, cap. 3.</li>
  <li>G. F. Franklin, J. D. Powell y M. L. Workman, <em>Digital Control of Dynamic Systems</em>, 3.ª ed. Menlo Park, CA: Addison-Wesley, 1998, cap. 3.</li>
  <li>K. J. Åström y B. Wittenmark, <em>Computer-Controlled Systems: Theory and Design</em>, 3.ª ed. Mineola, NY: Dover Publications, 2011, cap. 2–3.</li>
</ol>

<h3>9.2 Recurso de laboratorio en Python (<code>python-control</code>)</h3>
<pre class="no-math"><code>import control as ctrl

Gp = ctrl.TransferFunction([10.0], [1.0, 2.0, 0.0])
Gz = ctrl.c2d(Gp, 0.1, method='zoh')
print(Gz)
print("Polos:", ctrl.poles(Gz))
print("Ceros:", ctrl.zeros(Gz))</code></pre>

<h2 id="cierre">10. Cierre y conexión con el siguiente módulo</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Puente hacia la Semana 8 — Correspondencia entre los Planos S y Z</span>
  <p>
    Ya sabemos obtener los polos discretos de lazo cerrado a partir de \\(1 + D(z)G(z) = 0\\). En la <strong>Semana 8</strong>
    estudiaremos la geometría del mapeo \\(z = e^{sT}\\) para traducir especificaciones de desempeño —razón de
    amortiguamiento \\(\\zeta\\), frecuencia natural \\(\\omega_n\\) y tiempo de establecimiento \\(t_s\\)— directamente en
    regiones del plano complejo \\(Z\\).
  </p>
</div>
`,objetivos:[`Consolidar la metodología de discretización ZOH y el álgebra de bloques muestreados.`,`Verificar el criterio CE2 mediante la rúbrica y el script de control.c2d.`,`Preparar la transición al mapeo geométrico entre los planos S y Z en Semana 8.`]});export{t as default};