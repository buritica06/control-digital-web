import{t as e}from"./chapter-scZPzzfv.js";var t=`<p>
  Tres casos completos, de menor a mayor dificultad. Cada uno sigue la misma estructura: <em>planteamiento →
  transformación → polos → fracciones parciales → solución → verificación</em>. Las gráficas te permiten comprobar el
  resultado y explorar qué cambia al modificar los datos.
</p>

<h2 id="ej-filtro">Ejemplo 1 — Filtro digital de primer orden</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Un filtro de suavizado para un sensor de temperatura obedece \\(y[k] - 0.9\\,y[k-1] = 0.1\\,u[k]\\). Parte del reposo
    (\\(y[-1] = 0\\)) y recibe un escalón unitario. Halla \\(y[k]\\) y el número de muestras para alcanzar el 63 % del
    valor final.
  </p>
</div>
<p><strong>1. Transformada Z</strong> (condición inicial nula):
  \\(\\;(1 - 0.9z^{-1})\\,Y(z) = 0.1\\,U(z) \\Rightarrow Y(z) = \\dfrac{0.1\\,z}{z - 0.9}\\cdot\\dfrac{z}{z - 1}\\).</p>
<p><strong>2. Fracciones parciales:</strong></p>
\\[ \\frac{Y(z)}{z} = \\frac{0.1\\,z}{(z - 1)(z - 0.9)} = \\frac{A}{z - 1} + \\frac{B}{z - 0.9},\\qquad A = \\frac{0.1}{0.1} = 1,\\quad B = \\frac{0.09}{-0.1} = -0.9 \\]
<p><strong>3. Solución:</strong> \\(\\;y[k] = 1 - 0.9\\,(0.9)^{k} = 1 - (0.9)^{k+1}\\).</p>
<p>
  <strong>4. Constante de tiempo:</strong> \\((0.9)^{k+1} = e^{-1} \\Rightarrow k + 1 = \\dfrac{-1}{\\ln 0.9} \\approx 9.5\\).
  El filtro tarda unas 9 a 10 muestras en alcanzar el 63 %; con \\(T = 0.1\\,\\text{s}\\), \\(\\tau \\approx 0.95\\,\\text{s}\\).
</p>
<div data-viz="secuencias" data-preset="filtro"></div>

<h2 id="ej-servo">Ejemplo 2 — Servomecanismo con condiciones iniciales (caso del temario)</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    \\(y[k] - 1.3\\,y[k-1] + 0.4\\,y[k-2] = u[k]\\), escalón unitario, \\(y[-1] = 2\\), \\(y[-2] = 1\\). Separa la respuesta
    libre de la forzada, obtén \\(y[k]\\) y verifica \\(k = 0, 1, 2, 3\\) contra la recursión.
  </p>
</div>
\\[ Y(z) = \\underbrace{\\frac{2.2z^{2} - 0.8z}{(z - 0.8)(z - 0.5)}}_{\\text{libre}} + \\underbrace{\\frac{z^{3}}{(z - 1)(z - 0.8)(z - 0.5)}}_{\\text{forzada}} \\]
\\[ y[k] = \\underbrace{3.2(0.8)^{k} - (0.5)^{k}}_{\\text{libre}} + \\underbrace{10 - 10.6667(0.8)^{k} + 1.6667(0.5)^{k}}_{\\text{forzada}} = 10 - 7.4667(0.8)^{k} + 0.6667(0.5)^{k} \\]
<div class="table-wrap">
  <table>
    <caption>Verificación: recursión frente a fórmula cerrada</caption>
    <thead><tr><th scope="col">k</th><th scope="col">Recursión \\(1.3y[k-1] - 0.4y[k-2] + 1\\)</th><th scope="col">Fórmula cerrada</th></tr></thead>
    <tbody>
      <tr><td>0</td><td>\\(1.3(2) - 0.4(1) + 1 = 3.2\\)</td><td>\\(10 - 7.4667 + 0.6667 = 3.2\\)</td></tr>
      <tr><td>1</td><td>\\(1.3(3.2) - 0.4(2) + 1 = 4.36\\)</td><td>\\(10 - 5.9733 + 0.3333 = 4.36\\)</td></tr>
      <tr><td>2</td><td>\\(1.3(4.36) - 0.4(3.2) + 1 = 5.388\\)</td><td>\\(10 - 4.7787 + 0.1667 = 5.388\\)</td></tr>
      <tr><td>3</td><td>\\(1.3(5.388) - 0.4(4.36) + 1 = 6.2604\\)</td><td>\\(10 - 3.8229 + 0.0833 = 6.2604\\)</td></tr>
    </tbody>
  </table>
</div>
<p>Verificación en Python (la misma que se usa en la guía de laboratorio):</p>
<pre class="no-math"><code>import numpy as np

N = 12
y_rec = np.zeros(N)
y_m1, y_m2 = 2.0, 1.0                      # condiciones iniciales y[-1], y[-2]
for k in range(N):
    prev1 = y_rec[k-1] if k >= 1 else y_m1
    prev2 = y_rec[k-2] if k >= 2 else (y_m1 if k == 1 else y_m2)
    y_rec[k] = 1.3*prev1 - 0.4*prev2 + 1.0  # u[k] = 1

k = np.arange(N)
y_anl = 10 - (22.4/3)*0.8**k + (2/3)*0.5**k
print(np.max(np.abs(y_rec - y_anl)))       # ~1e-15: coinciden</code></pre>
<div data-viz="planoZ" data-preset="servo"></div>

<h2 id="ej-complejos">Ejemplo 3 — Polos complejos: respuesta oscilatoria</h2>
<div class="callout callout--ex" role="note">
  <span class="callout__title">Enunciado</span>
  <p>
    Resuelve \\(y[k] - y[k-1] + 0.5\\,y[k-2] = 0.5\\,u[k]\\) para un escalón unitario con condiciones iniciales nulas.
    Determina el sobrepaso y el periodo de oscilación en muestras.
  </p>
</div>
<p><strong>1. Polos:</strong> \\(z^{2} - z + 0.5 = 0 \\Rightarrow p_{1,2} = 0.5 \\pm 0.5j = 0.7071\\,e^{\\pm j\\pi/4}\\).</p>
<p><strong>2. Residuos de \\(Y(z)/z = \\dfrac{0.5\\,z^{2}}{(z - 1)(z^{2} - z + 0.5)}\\):</strong></p>
\\[ R_1 = \\left.\\frac{0.5z^{2}}{z^{2} - z + 0.5}\\right|_{z=1} = 1, \\qquad R_{p} = \\left.\\frac{0.5z^{2}}{(z - 1)(z - \\bar p)}\\right|_{z = p} = -0.25 - 0.25j \\]
<p><strong>3. Par conjugado → forma senoidal</strong> con \\(R_p p^{k} + \\bar R_p \\bar p^{k} = 2|R_p|\\,r^{k}\\cos(\\theta k + \\angle R_p)\\):</p>
\\[ y[k] = 1 + 0.7071\\,(0.7071)^{k}\\cos\\!\\left(\\frac{\\pi}{4}k - \\frac{3\\pi}{4}\\right) \\]
<p>
  <strong>4. Lectura:</strong> \\(y[0] = 0.5\\), \\(y[1] = 1\\), \\(y[2] = 1.25\\) (máximo, sobrepaso del 25 %), y la
  oscilación tiene periodo \\(2\\pi/\\theta = 8\\) muestras con envolvente \\(0.7071^{k}\\). El valor final es
  \\(G(1) = 0.5/(1 - 1 + 0.5) = 1\\).
</p>
<div data-viz="secuencias" data-preset="complejos"></div>
`,n=e=>({params:{modo:`ecuacion`,...e},hideControls:[`modo`]}),r=e({html:t,objetivos:[`Seguir un procedimiento completo y ordenado para resolver ecuaciones en diferencias.`,`Separar respuesta libre y forzada en un caso con condiciones iniciales no nulas.`,`Convertir un par de polos complejos en una respuesta senoidal amortiguada.`],presets:{filtro:n({a1:-.9,a2:0,b0:.1,b1:0,ym1:0,ym2:0,entrada:`escalon`,N:30}),servo:{params:{a1:-1.3,a2:.4,b0:1,b1:0}},complejos:n({a1:-1,a2:.5,b0:.5,b1:0,ym1:0,ym2:0,entrada:`escalon`,N:25})}});export{r as default};