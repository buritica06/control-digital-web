import{t as e}from"./chapter-scZPzzfv.js";var t=e({html:`<h2 id="por-que-invertir">1. ¿Por qué necesitamos regresar al tiempo?</h2>
<p>
  En el plano \\(z\\) el álgebra se vuelve cómoda: las ecuaciones en diferencias se convierten en cocientes de
  polinomios y la estabilidad se lee mirando el círculo unitario. Sin embargo, un motor paso a paso o un brazo robótico
  no entiende polinomios en \\(z\\); necesita una lista concreta de posiciones en cada instante de muestreo:
  \\(x[0], x[1], x[2], \\dots\\)
</p>
<p>
  La <strong>Transformada Z inversa</strong>, \\(\\mathcal{Z}^{-1}\\{X(z)\\}\\), es el puente de vuelta. Traduce una función
  racional \\(X(z)\\) a la secuencia física \\(x[k]\\) que realmente ocurre en la planta.
</p>

<div class="callout callout--def" role="note">
  <span class="callout__title">Definición — Integral de inversión de Cauchy</span>
  <p>
    Para una secuencia causal \\(x[k]\\) (\\(k \\ge 0\\)), la inversa se define como una integral cerrada sobre un contorno
    antihorario \\(C\\) situado dentro de la Región de Convergencia (ROC) que encierra todos los polos de \\(X(z)\\):
  </p>
  \\[ x[k] = \\frac{1}{2\\pi j}\\oint_C X(z)\\,z^{k-1}\\,dz = \\sum \\operatorname{Res}\\!\\left[X(z)\\,z^{k-1}\\right] \\]
</div>

<p>
  En la práctica de control digital rara vez resolvemos esa integral a mano. La teoría de residuos garantiza que
  podemos obtener exactamente el mismo resultado con dos herramientas algebraicas directas:
</p>
<ul>
  <li>
    <strong>Fracciones parciales:</strong> entrega una <em>fórmula cerrada</em> \\(x[k]\\) válida para todo \\(k \\ge 0\\).
    Muestra de inmediato qué polos dominan, si el sistema oscila y si es estable.
  </li>
  <li>
    <strong>División polinomial directa:</strong> entrega los <em>primeros números</em> \\(x[0], x[1], x[2], \\dots\\)
    sin factorizar el denominador. Es ideal para verificar código embebido o cálculos rápidos.
  </li>
</ul>

<h2 id="tecnica-xz-z">2. Por qué expandimos \\(X(z)/z\\) y no \\(X(z)\\)</h2>
<p>
  Fíjate en las transformadas más frecuentes en control discreto: el escalón es \\(\\frac{z}{z-1}\\) y la exponencial es
  \\(\\frac{z}{z-a}\\). Casi todas llevan un factor <strong>\\(z\\) en el numerador</strong>.
</p>
<p>
  Si expandimos \\(X(z)\\) directamente, obtenemos fracciones de la forma \\(\\frac{c_i}{z - p_i}\\), que corresponden a
  secuencias retardadas \\(p_i^{k-1}u[k-1]\\). En cambio, si primero dividimos por \\(z\\), expandimos \\(X(z)/z\\) y al final
  multiplicamos de nuevo por \\(z\\), cada término cae directo en la tabla canónica:
</p>

\\[ \\frac{X(z)}{z} = \\frac{c_1}{z - p_1} + \\frac{c_2}{z - p_2} + \\dots + \\frac{c_n}{z - p_n} \\quad \\Longrightarrow \\quad X(z) = \\sum_{i=1}^{n} c_i\\,\\frac{z}{z - p_i} \\]

<div class="callout callout--thm" role="note">
  <span class="callout__title">Idea clave — Polos reales simples</span>
  <p>
    Cada residuo \\(c_i\\) se calcula tapando el factor \\((z - p_i)\\) y evaluando el resto en \\(z = p_i\\) (método de
    Heaviside):
  </p>
  \\[ c_i = \\lim_{z \\to p_i} (z - p_i)\\,\\frac{X(z)}{z} \\qquad \\Longrightarrow \\qquad x[k] = \\sum_{i=1}^{n} c_i\\,p_i^{\\,k} \\quad (k \\ge 0) \\]
</div>

<h2 id="polos-multiples">3. ¿Qué cambia cuando un polo se repite?</h2>
<p>
  Si un polo real \\(p_i\\) aparece con multiplicidad \\(m\\) (por ejemplo, \\((z - a)^2\\) en un sistema críticamente
  amortiguado), la expansión de \\(X(z)/z\\) incluye potencias desde \\(1\\) hasta \\(m\\):
</p>
\\[ \\frac{c_{i,1}}{z - p_i} + \\frac{c_{i,2}}{(z - p_i)^2} + \\dots + \\frac{c_{i,m}}{(z - p_i)^m} \\]
<p>
  El coeficiente de mayor orden \\(c_{i,m}\\) se evalúa directamente, y los anteriores se obtienen derivando respecto a \\(z\\):
</p>
\\[ c_{i,j} = \\frac{1}{(m - j)!}\\lim_{z \\to p_i}\\frac{d^{m-j}}{dz^{m-j}}\\!\\left[(z - p_i)^m \\frac{X(z)}{z}\\right] \\]
<p>
  Al multiplicar por \\(z\\) e invertir, un polo doble en \\(z = a\\) introduce el factor creciente \\(k\\):
  \\(\\mathcal{Z}^{-1}\\!\\left\\{\\frac{a\\,z}{(z-a)^2}\\right\\} = k\\,a^k u[k]\\). Mientras \\(|a| &lt; 1\\), la caída
  exponencial \\(a^k\\) termina venciendo al crecimiento lineal \\(k\\) y la respuesta vuelve a cero.
</p>

<h2 id="tabla-pares">4. Pares canónicos de referencia rápida</h2>
<div class="table-wrap">
  <table>
    <caption>Pares de Transformada Z inversa más utilizados en control digital (\\(k \\ge 0\\))</caption>
    <thead>
      <tr>
        <th scope="col">Dominio \\(z\\)</th>
        <th scope="col">Secuencia \\(x[k]\\)</th>
        <th scope="col">Significado físico</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>\\(1\\)</td>
        <td>\\(\\delta[k]\\)</td>
        <td>Impulso unitario solo en \\(k = 0\\)</td>
      </tr>
      <tr>
        <td>\\(\\dfrac{z}{z - 1}\\)</td>
        <td>\\(u[k] = 1\\)</td>
        <td>Referencia o estado estacionario constante</td>
      </tr>
      <tr>
        <td>\\(\\dfrac{z}{z - a}\\)</td>
        <td>\\(a^k\\,u[k]\\)</td>
        <td>Modo exponencial real (decae si \\(|a| &lt; 1\\))</td>
      </tr>
      <tr>
        <td>\\(\\dfrac{a\\,z}{(z - a)^2}\\)</td>
        <td>\\(k\\,a^k\\,u[k]\\)</td>
        <td>Modo de polo real doble (amortiguamiento crítico)</td>
      </tr>
      <tr>
        <td>\\(\\dfrac{z\\,(z - r\\cos\\theta)}{z^2 - 2r\\cos\\theta\\,z + r^2}\\)</td>
        <td>\\(r^k \\cos(k\\theta)\\,u[k]\\)</td>
        <td>Oscilación amortiguada en fase coseno</td>
      </tr>
      <tr>
        <td>\\(\\dfrac{z\\,r\\sin\\theta}{z^2 - 2r\\cos\\theta\\,z + r^2}\\)</td>
        <td>\\(r^k \\sin(k\\theta)\\,u[k]\\)</td>
        <td>Oscilación amortiguada en fase seno</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="callout callout--warn" role="note">
  <span class="callout__title">Atención — dos errores frecuentes</span>
  <p>
    <strong>1) Olvidar devolver la \\(z\\):</strong> después de hallar los coeficientes de \\(X(z)/z\\), multiplica siempre
    por \\(z\\) antes de buscar en la tabla.<br />
    <strong>2) Cuando \\(X(z)\\) no tiene un factor \\(z\\) en el numerador:</strong> si \\(X(z) = \\frac{1}{z - a}\\),
    dividir por \\(z\\) introduce un polo extra en \\(z = 0\\) (que genera un impulso \\(\\delta[k]\\)). También puedes
    escribirla como \\(z^{-1}\\frac{z}{z-a}\\), que equivale a desplazar una muestra: \\(a^{k-1}u[k-1]\\).
  </p>
</div>
`,objetivos:[`Interpretar la Transformada Z inversa como el paso del modelo en el plano z a la secuencia temporal x[k].`,`Aplicar la técnica de fracciones parciales sobre X(z)/z para polos reales simples y múltiples.`,`Identificar qué aporta cada polo de X(z) al comportamiento físico del sistema discreto.`]});export{t as default};