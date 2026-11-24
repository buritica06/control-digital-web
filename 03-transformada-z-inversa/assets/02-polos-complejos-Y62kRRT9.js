import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="geometria-polar">1. Leer un polo complejo en coordenadas polares</h2>
<p>
  En sistemas mecatrónicos con inercia y elasticidad —como un servomotor o un eslabón robótico— el denominador suele
  contener un factor cuadrático sin raíces reales: \\(z^2 + a_1 z + a_2 = 0\\), con \\(a_1^2 &lt; 4a_2\\). Sus raíces son
  un par de <strong>polos complejos conjugados</strong>:
</p>
\\[ p_{1,2} = \\sigma \\pm j\\omega_d = r\\,e^{\\pm j\\theta} = r(\\cos\\theta \\pm j\\sin\\theta) \\]
<p>
  Pasarlos a forma polar \\((r, \\theta)\\) no es un capricho matemático: separa en dos números claros lo que ocurrirá en
  la máquina:
</p>
<ul>
  <li>
    <strong>Radio polar \\(r = \\sqrt{a_2} = \\sqrt{\\sigma^2 + \\omega_d^2}\\):</strong> controla la
    <em>envolvente exponencial</em> \\(r^k\\). Decide si la oscilación se apaga, se mantiene o crece sin control.
  </li>
  <li>
    <strong>Ángulo discreto \\(\\theta = \\arctan(\\omega_d / \\sigma)\\):</strong> fija la
    <em>frecuencia de oscilación por muestra</em> (en radianes/muestra). Un ciclo completo toma \\(2\\pi/\\theta\\) muestras.
  </li>
</ul>

<div class="callout callout--thm" role="note">
  <span class="callout__title">Idea clave — Sin álgebra compleja innecesaria</span>
  <p>
    En lugar de calcular residuos complejos conjugados, completa el numerador de la fracción cuadrática para que
    coincida con \\(z - r\\cos\\theta\\) y \\(r\\sin\\theta\\):
  </p>
  \\[ X(z) = A\\,\\frac{z(z - r\\cos\\theta)}{z^2 - 2r\\cos\\theta\\,z + r^2} + B\\,\\frac{z\\,r\\sin\\theta}{z^2 - 2r\\cos\\theta\\,z + r^2} \\;\\Longrightarrow\\; x[k] = r^k\\!\\left[A\\cos(k\\theta) + B\\sin(k\\theta)\\right] \\]
</div>

<h2 id="estabilidad-circulo">2. Los tres regímenes frente al círculo unitario \\(|z| = 1\\)</h2>
<div class="table-wrap">
  <table>
    <caption>Relación directa entre el radio polar \\(r = |p|\\) y la respuesta temporal \\(x[k]\\)</caption>
    <thead>
      <tr>
        <th scope="col">Ubicación del polo</th>
        <th scope="col">Régimen</th>
        <th scope="col">Efecto en la envolvente \\(r^k\\)</th>
        <th scope="col">Impacto en el actuador</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Interior (\\(r &lt; 1\\))</td>
        <td><strong>Estable</strong></td>
        <td>\\(r^k \\to 0\\) cuando \\(k \\to \\infty\\)</td>
        <td>La oscilación se amortigua y el sistema se estabiliza.</td>
      </tr>
      <tr>
        <td>Sobre el círculo (\\(r = 1\\))</td>
        <td><strong>Marginal</strong></td>
        <td>\\(1^k = 1\\) constante</td>
        <td>Oscilación sostenida sin apagarse (desgaste continuo).</td>
      </tr>
      <tr>
        <td>Exterior (\\(r &gt; 1\\))</td>
        <td><strong>Inestable</strong></td>
        <td>\\(r^k \\to \\infty\\) exponencialmente</td>
        <td>La amplitud diverge hasta saturar o dañar el actuador.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="lab-polos">3. Laboratorio interactivo: mueve \\((r, \\theta)\\) y observa \\(x[k]\\)</h2>
<p>
  Ajusta primero el radio \\(r\\) desde \\(0.60\\) (caso del brazo robótico) hasta \\(1.00\\) y \\(1.06\\). Luego cambia el
  ángulo \\(\\theta\\) para notar cómo aumenta o disminuye el número de muestras por ciclo sin alterar la velocidad de
  amortiguamiento.
</p>
<div data-viz="polosOscilacion" data-preset="robot"></div>

<h2 id="relieve-3d">4. Relieve 3D de \\(|Y(z)|\\) y contorno de Cauchy</h2>
<p>
  En el plano complejo \\(z\\), cada polo se levanta como un pico agudo de magnitud \\(|Y(z)| \\to \\infty\\). El
  <strong>círculo amarillo</strong> marca la frontera de estabilidad \\(|z| = 1\\), y el <strong>anillo verde</strong>
  muestra el contorno de Cauchy \\(C\\) sobre el que se integra la inversa: para que la secuencia sea causal y exacta,
  \\(C\\) debe encerrar todos los polos del sistema.
</p>
<div data-viz="superficieZ" data-preset="cauchy"></div>
`,objetivos:[`Convertir un factor cuadrático real del denominador a coordenadas polares (r, θ).`,`Relacionar la posición de los polos respecto al círculo unitario |z| = 1 con el amortiguamiento y la estabilidad.`,`Interpretar visualmente los picos de |Y(z)| y la condición del contorno de integración de Cauchy.`],presets:{robot:{titulo:`Respuesta oscilatoria discreta según (r, θ)`,descripcion:`Valores iniciales del brazo robótico (r = 0.60, θ = 48.19°). Prueba subir r a 1.00 y 1.06 para cruzar el círculo unitario.`,params:{r:.6,thetaDeg:48.19,A:1,B:.61,muestras:22,mostrarEnvolvente:!0}},cauchy:{titulo:`Superficie 3D |Y(z)|, círculo unitario y contorno de Cauchy`,descripcion:`Arrastra para rotar. Observa el polo real en z = 1 y el par conjugado en r = 0.60, encerrados por el contorno verde |z| = 1.18.`,params:{r:.6,thetaDeg:48.19,rCauchy:1.18,altura:1.5,mapa:`viridis`,curvas:!0}}}});export{t as default};