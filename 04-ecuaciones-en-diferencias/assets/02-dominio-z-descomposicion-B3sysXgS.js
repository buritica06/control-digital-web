import{t as e}from"./chapter-C2599_w7.js";var t=e({html:`<h2 id="retardo">1. Cómo entra la energía inicial en la Transformada Z</h2>
<p>
  En la práctica, un sistema rara vez arranca desde cero: un brazo robótico puede estar en movimiento, un condensador
  puede tener carga o un horno ya puede estar tibio en \\(k = 0\\). Esa historia previa se guarda en las
  <strong>condiciones iniciales</strong> \\(y[-1], y[-2], \\dots, y[-n]\\).
</p>
<p>
  Para llevar una ecuación en diferencias al dominio \\(Z\\) sin perder esa historia, aplicamos el
  <strong>teorema de traslación hacia atrás (retardo)</strong> de la Transformada Z unilateral:
</p>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Teorema de retardo con condiciones iniciales</span>
  \\[ \\mathcal{Z}\\{y[k-1]\\} = z^{-1}Y(z) + y[-1] \\]
  \\[ \\mathcal{Z}\\{y[k-2]\\} = z^{-2}Y(z) + z^{-1}y[-1] + y[-2] \\]
</div>

<h2 id="descomposicion">2. Separación exacta: respuesta libre + respuesta forzada</h2>
<p>
  Cuando sustituyes el teorema de retardo en una ecuación LTI y despejas \\(Y(z)\\), ocurre algo muy limpio y útil:
  la salida total siempre se divide en <strong>dos partes independientes que se suman</strong>.
</p>
\\[ Y(z) = \\underbrace{\\frac{C_{\\text{CI}}(z)}{A(z)}}_{\\text{Respuesta libre } Y_{\\text{libre}}(z)} + \\underbrace{\\frac{B(z)}{A(z)}\\,U(z)}_{\\text{Respuesta forzada } Y_{\\text{forzada}}(z)} \\]

<ul>
  <li>
    <strong>Respuesta libre \\(y_{\\text{libre}}[k]\\) (entrada cero):</strong> muestra cómo se disipa la energía que ya
    estaba almacenada en el sistema si apagamos la entrada (\\(u[k] = 0\\)). Si el sistema es estable, esta parte tiende
    a cero.
  </li>
  <li>
    <strong>Respuesta forzada \\(y_{\\text{forzada}}[k]\\) (estado cero):</strong> muestra cómo responde el sistema a la
    orden \\(u[k]\\) suponiendo que partió en reposo absoluto. De aquí nace la
    <strong>función de transferencia de pulso</strong> \\(G(z) = B(z)/A(z)\\).
  </li>
</ul>

<div class="callout callout--def" role="note">
  <span class="callout__title">Idea sistémica</span>
  <p>
    Ambas respuestas comparten el mismo denominador \\(A(z) = 1 + a_1 z^{-1} + \\dots + a_n z^{-n}\\)
    (el <strong>polinomio característico</strong>). Por eso las raíces de \\(A(z)\\) —los <strong>polos</strong>—
    deciden la estabilidad tanto de la respuesta libre como de la forzada.
  </p>
</div>

<h2 id="manim-z">3. Animaciones paso a paso del dominio Z y la evolución temporal</h2>
<p>
  La primera animación resuelve el álgebra de un servomecanismo con \\(y[-1]=2, y[-2]=1\\). La segunda muestra cómo se
  apaga la respuesta libre mientras la forzada lleva la salida hacia \\(y(\\infty)=10\\).
</p>
<div data-manim="scene2"></div>
<div data-manim="scene3"></div>

<h2 id="simulador-lti">4. Laboratorio interactivo: separa y prueba la respuesta LTI</h2>
<p>
  Mueve los coeficientes \\(a_1, a_2, b_0\\) y las condiciones iniciales \\(y[-1], y[-2]\\) de
  \\(y[k] + a_1 y[k-1] + a_2 y[k-2] = b_0 u[k]\\). Verifica en la gráfica y en la tabla que en cada muestra
  \\(y[k] = y_{\\text{libre}}[k] + y_{\\text{forzada}}[k]\\). Prueba llevar \\(a_2\\) por encima de \\(1\\) o \\(a_1\\) a un
  extremo para ver cómo el diagnóstico de Jury detecta la inestabilidad.
</p>
<div data-viz="respuestaLti" data-preset="servoCi"></div>
`,objetivos:[`Aplicar el teorema de retardo unilateral incorporando condiciones iniciales históricas y[-1], y[-2].`,`Descomponer la salida total en respuesta libre (entrada cero) y respuesta forzada (estado cero).`,`Interpretar cómo los polos del polinomio característico A(z) determinan la convergencia o divergencia de la secuencia.`],presets:{servoCi:{params:{a1:-1.3,a2:.4,b0:1,ym1:2,ym2:1,muestras:16,titulo:`Servomecanismo: y[k] − 1.3y[k−1] + 0.4y[k−2] = u[k]`}}}});export{t as default};