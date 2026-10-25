import{r as e}from"./index-N8IbTwA-.js";import{t}from"./chapter-scZPzzfv.js";import{_ as n,n as r}from"./discrete-StYv7937.js";var i=`<p>
  Trabajaremos todo el capítulo con el <strong>caso de estudio del curso</strong>: un actuador mecatrónico gobernado
  por un microcontrolador, sometido a un escalón unitario y con condiciones iniciales residuales.
</p>
\\[ y[k] - 1.3\\,y[k-1] + 0.4\\,y[k-2] = u[k], \\qquad u[k] = 1 \\;(k \\ge 0), \\qquad y[-1] = 2,\\; y[-2] = 1 \\]

<h2 id="recursivo">1. Método recursivo (lo que hace el microcontrolador)</h2>
<p>
  Despejamos \\(y[k] = 1.3\\,y[k-1] - 0.4\\,y[k-2] + u[k]\\) y avanzamos muestra a muestra. Usa los botones para ver cada
  cálculo; la tabla compara con la solución analítica que obtendremos en la sección 3.
</p>
<div class="stepper wide" data-stepper aria-labelledby="stepper-title">
  <h3 id="stepper-title" style="margin-top: 0">Cálculo paso a paso</h3>
  <div class="stepper__controls">
    <button type="button" class="btn btn--small" data-step="prev">Anterior</button>
    <button type="button" class="btn btn--small btn--primary" data-step="next">Siguiente k</button>
    <button type="button" class="btn btn--small" data-step="reset">Reiniciar</button>
    <span>k = <span class="stepper__k" data-k>0</span></span>
  </div>
  <div class="stepper__calc" data-calc aria-live="polite"></div>
  <div class="stepper__table" data-table></div>
</div>
<p>
  El método recursivo es exacto, rápido y es el que se programa. Su limitación: entrega <em>números</em>, no una
  fórmula. No dice, por sí solo, hacia dónde converge la salida ni qué tan rápido.
</p>

<h2 id="clasico">2. Método clásico: homogénea + particular</h2>
<p>
  Igual que en ecuaciones diferenciales, la solución completa es la suma de la solución de la ecuación homogénea y una
  solución particular: \\(y[k] = y_h[k] + y_p[k]\\).
</p>
<h3>Solución homogénea</h3>
<p>Proponemos \\(y_h[k] = \\lambda^{k}\\) en \\(y[k] - 1.3\\,y[k-1] + 0.4\\,y[k-2] = 0\\) y dividimos por \\(\\lambda^{k-2}\\):</p>
\\[ \\lambda^{2} - 1.3\\,\\lambda + 0.4 = 0 \\;\\Rightarrow\\; \\lambda_1 = 0.8,\\quad \\lambda_2 = 0.5 \\;\\Rightarrow\\; y_h[k] = C_1\\,(0.8)^{k} + C_2\\,(0.5)^{k} \\]
<h3>Solución particular</h3>
<p>Para un escalón probamos una constante \\(y_p[k] = A\\): \\(A - 1.3A + 0.4A = 1 \\Rightarrow 0.1A = 1 \\Rightarrow A = 10\\).</p>
<h3>Constantes con las condiciones iniciales</h3>
\\[
\\begin{aligned}
k = -1:&\\quad 10 + \\tfrac{C_1}{0.8} + \\tfrac{C_2}{0.5} = 2 \\\\
k = -2:&\\quad 10 + \\tfrac{C_1}{0.64} + \\tfrac{C_2}{0.25} = 1
\\end{aligned}
\\;\\Rightarrow\\; C_1 = -7.4667,\\quad C_2 = 0.6667
\\]
\\[ \\boxed{\\,y[k] = 10 - 7.4667\\,(0.8)^{k} + 0.6667\\,(0.5)^{k}, \\qquad k \\ge 0\\,} \\]

<h2 id="transformada">3. Método de la transformada Z (libre + forzada)</h2>
<div class="callout callout--thm" role="note">
  <span class="callout__title">Teorema de retardo con condiciones iniciales</span>
  \\[ \\Z{y[k-1]} = z^{-1}Y(z) + y[-1], \\qquad \\Z{y[k-2]} = z^{-2}Y(z) + z^{-1}y[-1] + y[-2] \\]
</div>
<p><strong>Paso 1 — Transformar término a término</strong> y sustituir \\(y[-1] = 2\\), \\(y[-2] = 1\\):</p>
\\[ Y(z) - 1.3\\left[z^{-1}Y(z) + 2\\right] + 0.4\\left[z^{-2}Y(z) + 2z^{-1} + 1\\right] = U(z) \\]
\\[ \\left(1 - 1.3z^{-1} + 0.4z^{-2}\\right)Y(z) - 2.2 + 0.8z^{-1} = U(z) \\]
<p><strong>Paso 2 — Multiplicar por \\(z^2\\) y despejar.</strong> Aparecen dos términos con significado físico:</p>
\\[
Y(z) = \\underbrace{\\frac{2.2z^{2} - 0.8z}{z^{2} - 1.3z + 0.4}}_{Y_{\\text{libre}}(z)\\ \\text{(condiciones iniciales)}}
+ \\underbrace{\\frac{z^{2}}{z^{2} - 1.3z + 0.4}\\,U(z)}_{Y_{\\text{forzada}}(z)\\ \\text{(entrada)}}
\\]
<ul>
  <li><strong>Respuesta libre</strong> (entrada cero): depende solo de la energía almacenada, \\(y[-1], y[-2]\\).</li>
  <li><strong>Respuesta forzada</strong> (estado cero): depende de \\(G(z) = z^2/(z^2 - 1.3z + 0.4)\\) y de la entrada.</li>
</ul>
<p><strong>Paso 3 — Polos.</strong> \\(z^{2} - 1.3z + 0.4 = (z - 0.8)(z - 0.5)\\). Con el escalón, \\(U(z) = z/(z - 1)\\):</p>
\\[ \\frac{Y(z)}{z} = \\frac{3.2z^{2} - 3.0z + 0.8}{(z - 1)(z - 0.8)(z - 0.5)} = \\frac{A}{z - 1} + \\frac{B}{z - 0.8} + \\frac{C}{z - 0.5} \\]
<p><strong>Paso 4 — Residuos</strong> (se divide entre \\(z\\) para que cada fracción tenga la forma \\(z/(z-p)\\) de la tabla):</p>
\\[
A = \\left.\\frac{3.2z^{2} - 3z + 0.8}{(z - 0.8)(z - 0.5)}\\right|_{z=1} = \\frac{1.0}{0.1} = 10, \\quad
B = \\frac{0.448}{-0.06} = -7.4667, \\quad
C = \\frac{0.1}{0.15} = 0.6667
\\]
<p><strong>Paso 5 — Antitransformar</strong> con \\(\\iZ{\\tfrac{z}{z-p}} = p^{k}\\):</p>
\\[ y[k] = 10 - 7.4667\\,(0.8)^{k} + 0.6667\\,(0.5)^{k} \\qquad \\checkmark \\text{ coincide con el método clásico} \\]

<div class="callout callout--ex" role="note">
  <span class="callout__title">Descomposición detallada</span>
  <p>Haciendo las fracciones parciales por separado:</p>
  \\[ y_{\\text{libre}}[k] = 3.2\\,(0.8)^{k} - (0.5)^{k}, \\qquad y_{\\text{forzada}}[k] = 10 - 10.6667\\,(0.8)^{k} + 1.6667\\,(0.5)^{k} \\]
  <p>
    Sumadas dan la misma \\(y[k]\\). La respuesta libre se extingue (polos dentro del círculo unitario) y en régimen
    permanente solo queda la forzada: \\(y(\\infty) = G(1) = 1/(1 - 1.3 + 0.4) = 10\\).
  </p>
</div>

<h2 id="verificacion">4. Verificación interactiva</h2>
<p>
  La gráfica resuelve la ecuación de las dos maneras. Cambia los coeficientes, las condiciones iniciales o la entrada:
  la solución analítica (cruces) se recalcula por fracciones parciales —incluidos polos complejos y dobles— y debe
  coincidir con la recursiva (tallos) hasta el error de redondeo.
</p>
<div data-viz="secuencias" data-preset="servo"></div>

<h2 id="convolucion">5. Convolución: la respuesta forzada como suma de impulsos</h2>
<p>
  La respuesta al impulso \\(h[k] = \\iZ{G(z)}\\) caracteriza por completo al sistema. Con condiciones iniciales nulas,
  la salida ante cualquier entrada es la <strong>suma de convolución</strong>:
</p>
\\[ y_{\\text{forzada}}[k] = \\sum_{i=0}^{k} h[i]\\,u[k-i] = (h * u)[k] \\quad\\Longleftrightarrow\\quad Y(z) = G(z)\\,U(z) \\]
<p>
  Para el caso de estudio, \\(h[k] = \\tfrac{8}{3}(0.8)^{k} - \\tfrac{5}{3}(0.5)^{k}\\) (verifica: \\(h[0] = 1\\),
  \\(h[1] = 1.3\\)). Con el escalón, la convolución acumula \\(h\\): \\(y_{\\text{forzada}}[k] = \\sum_{i=0}^{k} h[i]\\), que
  tiende a \\(\\sum_{i=0}^{\\infty} h[i] = G(1) = 10\\).
</p>

<div class="table-wrap">
  <table>
    <caption class="visually-hidden">Comparación de métodos de solución</caption>
    <thead>
      <tr><th scope="col">Método</th><th scope="col">Entrega</th><th scope="col">Ventaja</th><th scope="col">Uso típico</th></tr>
    </thead>
    <tbody>
      <tr><td>Recursivo</td><td>Valores numéricos</td><td>Mínimo cómputo; trivial de programar</td><td>Firmware, simulación</td></tr>
      <tr><td>Clásico (\\(y_h + y_p\\))</td><td>Fórmula cerrada</td><td>Intuitivo; no requiere tablas</td><td>Entradas simples</td></tr>
      <tr><td>Transformada Z</td><td>Fórmula + libre/forzada</td><td>Sistemático; muestra polos y estabilidad</td><td>Análisis y diseño</td></tr>
      <tr><td>Convolución</td><td>Respuesta forzada</td><td>Vale para cualquier entrada</td><td>Filtros FIR, identificación</td></tr>
    </tbody>
  </table>
</div>
`,a={a:[-1.3,.4],b:[1],yPast:[2,1]},o=15;function s(t,i){let s=t.querySelector(`[data-stepper]`);if(!s)return;let c=s.querySelector(`[data-calc]`),l=s.querySelector(`[data-k]`),u=s.querySelector(`[data-table]`),{steps:d}=n({...a,u:Array(o).fill(1)}),f=r({a1:-1.3,a2:.4,b0:1,b1:0,yPast:a.yPast,input:`escalon`}),p=0,m=e=>e<0?`(${e.toFixed(4)})`:e.toFixed(4),h=(e,t)=>e<0?`-`:t===0?``:`+`;function g(){let t=d[p],n=t.terms.map((e,t)=>{let n=Math.abs(e.coef)===1?``:`${Math.abs(e.coef)}\\,`;return`${h(e.coef,t)} ${n}${e.kind}[${p-e.lag}]`}).join(` `),r=t.terms.map((e,t)=>`${h(e.coef,t)} ${Math.abs(e.coef)}\\cdot${m(e.value)}`).join(` `),a=t.terms.filter(e=>e.kind===`y`).map(e=>`y[${p-e.lag}] = ${e.value.toFixed(4)}${p-e.lag<0?`\\ (\\text{C.I.})`:``}`).join(`,\\quad `);c.innerHTML=`<div class="math-block"></div><div class="math-block"></div><div class="math-block"></div>`,i.renderMath(c.children[0],`\\text{Datos: } ${a},\\quad u[${p}] = 1`,!1),i.renderMath(c.children[1],`y[${p}] = ${n}`,!0),i.renderMath(c.children[2],`y[${p}] = ${r} = \\boxed{${t.y.toFixed(4)}}`,!0),l.textContent=String(p),u.innerHTML=`<table>
      <caption class="visually-hidden">Valores calculados hasta k = ${p}</caption>
      <thead><tr><th scope="col">k</th><th scope="col">y[k] recursiva</th><th scope="col">y[k] analítica</th></tr></thead>
      <tbody>${d.slice(0,p+1).map(e=>`<tr><td>${e.k}</td><td class="${e.k===p?`is-current`:``}" ${e.k===p?`data-current`:``}>${e.y.toFixed(4)}</td><td>${f.evaluate(e.k).toFixed(4)}</td></tr>`).join(``)}</tbody></table>`;let o=u.querySelector(`[data-current]`);o&&p>0&&(o._value=d[p-1].y,e(o,t.y,e=>e.toFixed(4))),s.querySelector(`[data-step="prev"]`).disabled=p===0,s.querySelector(`[data-step="next"]`).disabled=p===14}let _=e=>{let t=e.target.closest(`[data-step]`)?.dataset.step;t&&(t===`next`&&p<14&&p++,t===`prev`&&p>0&&p--,t===`reset`&&(p=0),g())};s.addEventListener(`click`,_),i.track(()=>s.removeEventListener(`click`,_)),g()}var c=t({html:i,objetivos:[`Resolver una ecuación en diferencias por recursión y verificar cada paso.`,`Obtener la solución cerrada por el método clásico (homogénea + particular).`,`Aplicar el teorema de retardo con condiciones iniciales y separar respuesta libre y forzada.`,`Interpretar la respuesta forzada como convolución con la respuesta al impulso.`],presets:{servo:{params:{modo:`ecuacion`,a1:-1.3,a2:.4,b0:1,b1:0,ym1:2,ym2:1,entrada:`escalon`,N:20},hideControls:[`modo`]}},setup:s});export{c as default};