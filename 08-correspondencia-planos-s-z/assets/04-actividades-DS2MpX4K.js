const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-CV0jqCgm.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
      <label for="${e.id}-r${t}">${r(n)}</label>
      <input id="${e.id}-r${t}" name="r${t}" type="text" inputmode="${i}" autocomplete="off" spellcheck="false"
        maxlength="80" aria-describedby="${e.id}-f${t}" />
      <span class="feedback" id="${e.id}-f${t}" aria-live="polite"></span>
    </div>`,n=`<button class="btn btn--primary btn--small" type="submit">Comprobar</button>`;switch(e.tipo){case`numerica`:return`${e.respuestas.map((e,n)=>t(n,e.etiqueta,`decimal`)).join(``)}
        <div class="exercise__actions">${n}</div>`;case`texto`:return`${t(0,e.etiqueta,`text`)}<div class="exercise__actions">${n}</div>`;case`opcion`:{let t=Array.isArray(e.correcta);return`<fieldset class="choice-list" aria-describedby="${e.id}-f0">
          <legend>${t?`Marca todas las correctas`:`Elige una opción`}</legend>
          ${e.opciones.map((e,n)=>`<label class="choice">
                <input type="${t?`checkbox`:`radio`}" name="opcion" value="${n}" />
                <span>${e}</span>
              </label>`).join(``)}
        </fieldset>
        <span class="feedback" id="${e.id}-f0" aria-live="polite"></span>
        <div class="exercise__actions">${n}</div>`}case`abierta`:return`<label class="open-answer" for="${e.id}-r0">Tu respuesta (no se guarda ni se envía)</label>
        <textarea class="open-answer__field" id="${e.id}-r0" rows="4"></textarea>
        <div class="exercise__actions">
          <button class="btn btn--primary btn--small" type="submit">Comparar con la respuesta modelo</button>
        </div>
        <div class="open-answer__model" data-modelo hidden>
          <div class="callout callout--ex" role="note"><span class="callout__title">Respuesta modelo</span>${e.respuestaModelo}</div>
          <button class="btn btn--small" type="button" data-autoevaluar>Mi respuesta cubre lo esencial</button>
        </div>`;default:throw Error(`Tipo de actividad desconocido: ${e.tipo}`)}}function u(e,n,i){return`<section class="exercise reveal" data-ex="${e.id}" aria-labelledby="${e.id}-t">
    <div class="exercise__head">
      <h3 id="${e.id}-t">${n}. ${r(e.titulo)}</h3>
      <span class="badge ${i?`badge--done`:``}" data-badge>${i?`${t(`check`)} Resuelto`:r(e.nivel)}</span>
    </div>
    ${e.enunciado}
    <form class="exercise__answers" novalidate>${l(e)}</form>
    ${e.pista?`<details class="disclosure"><summary>Pista</summary><div>${e.pista}</div></details>`:``}
    ${e.solucion?`<details class="disclosure"><summary>Solución</summary><div>${e.solucion}</div></details>`:``}
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s08-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Imagen geométrica de una recta σ = constante en el plano Z`,enunciado:g`<p>En el mapeo \(z = e^{sT}\), ¿en qué curva del plano \(Z\) se transforma una recta vertical \(\sigma = -\sigma_0 &lt; 0\) (tiempo de establecimiento constante)?</p>`,opciones:[`Una espiral logarítmica que parte de z = 1.`,`Un círculo concéntrico centrado en el origen de radio r = e^(−σ₀T) < 1.`,`Un rayo radial que parte del origen con ángulo θ = σ₀T.`,`Una recta vertical en Re(z) = −σ₀.`],correcta:1,pista:g`<p>Recuerda que \(|z| = e^{\sigma T}\) solo depende de la parte real \(\sigma\).</p>`,solucion:g`<p>Como \(\sigma = -\sigma_0\) es constante, \(|z| = e^{-\sigma_0 T}\) es constante para cualquier \(\omega\), generando un círculo centrado en el origen.</p>`},{id:`s08-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Radio máximo por tiempo de establecimiento`,enunciado:g`<p>Un sistema discreto muestreado a \(T = 0.1\ \text{s}\) requiere \(t_s \le 2.0\ \text{s}\) (criterio del \(2\%\): \(\sigma = 4/t_s\)). Calcula \(\sigma\) y el radio máximo \(r_{\max} = e^{-\sigma T}\).</p>`,respuestas:[{etiqueta:`σ = 4 / t_s (rad/s)`,valor:2},{etiqueta:`Radio máximo r_max`,valor:Math.exp(-.2)}],pista:g`<p>Calcula \(\sigma = 4/2.0 = 2.0\) y evalúa \(e^{-2.0 \cdot 0.1}\).</p>`,solucion:g`<p>\(\sigma = 2.0\ \text{rad/s}\) y \(r_{\max} = e^{-0.2} \approx 0.8187\).</p>`},{id:`s08-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Ángulo y parte real de un par de polos en Z`,enunciado:g`<p>Para \(\omega_d = 5\ \text{rad/s}\), \(r = 0.8\) y \(T = 0.1\ \text{s}\), calcula el ángulo \(\theta = \omega_d T\) (en radianes) y la parte real \(\mathrm{Re}(z) = r\cos(\theta)\).</p>`,respuestas:[{etiqueta:`Ángulo θ (rad)`,valor:.5},{etiqueta:`Re(z) = r·cos(θ)`,valor:.8*Math.cos(.5)}],pista:g`<p>Multiplica \(\omega_d T = 5(0.1) = 0.5\ \text{rad}\) y evalúa \(0.8\cos(0.5)\).</p>`,solucion:g`<p>\(\theta = 0.5\ \text{rad}\) (\(28.65^\circ\)) y \(\mathrm{Re}(z) = 0.8\cos(0.5) \approx 0.7021\).</p>`},{id:`s08-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Respuesta asociada a polos en el origen z = 0`,enunciado:g`<p>¿Qué nombre recibe la respuesta en tiempo mínimo finito que ocurre cuando todos los polos de lazo cerrado se ubican exactamente en el origen \(z = 0\)?</p>`,etiqueta:`Nombre de la respuesta`,aceptadas:[`deadbeat`,`respuesta deadbeat`,`tiempo minimo`,`tiempo mínimo`],pista:g`<p>Es un término clásico en inglés usado en control digital que comienza por «dead…».</p>`,solucion:g`<p>Se conoce como <strong>respuesta deadbeat</strong> (extinción en un número finito mínimo de muestras).</p>`},{id:`s08-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Polinomio característico deseado P_d(z)`,enunciado:g`<p>Si los polos dominantes deseados son \(z_{1,2} = 0.7 \pm j\,0.3\), el polinomio característico es \(z^2 + a_1 z + a_0 = 0\). Calcula \(a_1 = -2\,\mathrm{Re}(z)\) y \(a_0 = |z|^2\).</p>`,respuestas:[{etiqueta:`Coeficiente a₁`,valor:-1.4},{etiqueta:`Coeficiente a₀`,valor:.58}],pista:g`<p>Desarrolla \((z - 0.7 - j0.3)(z - 0.7 + j0.3) = (z - 0.7)^2 + 0.3^2\).</p>`,solucion:g`<p>\(a_1 = -1.4\) y \(a_0 = 0.49 + 0.09 = 0.58\), es decir, \(z^2 - 1.4z + 0.58 = 0\).</p>`},{id:`s08-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + 2D del brazo robótico`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Brazo Robótico</a>, compara (a) \(\zeta = 0.25, t_s = 1.5\ \text{s}\) frente a (b) \(\zeta = 0.75, t_s = 0.7\ \text{s}\) manteniendo \(T = 0.05\ \text{s}\). Explica cómo se desplazan los polos \(z_{1,2}\) en el plano \(Z\) y cómo cambia el movimiento del eslabón 3D.</p>`,respuestaModelo:g`<p>Al aumentar \(\zeta\) de \(0.25\) a \(0.75\) y reducir \(t_s\) de \(1.5\ \text{s}\) a \(0.7\ \text{s}\), los polos se acercan al origen (radio \(r\) menor) y reducen su ángulo \(\theta\), disminuyendo drásticamente el sobrepaso \(M_p\) y haciendo que el brazo 3D alcance la referencia con un movimiento rápido, firme y prácticamente sin oscilaciones.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>
  Resuelve las seis actividades sobre mapeo \(S \to Z\), curvas de amortiguamiento y diseño de polinomios deseados.
</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Por qué los polos sobre el eje real negativo (−1 &lt; z &lt; 0) suelen evitarse en actuadores mecánicos aunque sean estables?</summary>
  <div>
    <p>
      Un polo real negativo \(z = -a\) (\(0 &lt; a &lt; 1\)) genera el modo \((-a)^k = (-1)^k a^k\), que cambia de signo
      en cada muestra (oscilación a la frecuencia de Nyquist \(\omega_s/2\)). En servomotores y brazos robóticos esto
      produce golpeteo de engranajes (<em>chattering</em>), vibración audible y calentamiento excesivo.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. ¿Por qué no siempre conviene colocar los polos en z = 0 (control deadbeat) en una planta física real?</summary>
  <div>
    <p>
      Aunque matemáticamente anula el error en un número mínimo de pasos, forzar los polos a \(z = 0\) demanda picos
      de esfuerzo de control muy elevados (saturación del actuador), es muy sensible a errores de modelado y puede
      inducir fuertes oscilaciones intermuestrales (<em>inter-sample ripple</em>).
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>3. ¿Cómo afecta reducir el periodo T (muestrear más rápido) a la ubicación de los polos en el plano Z?</summary>
  <div>
    <p>
      Como \(r = e^{-\sigma T}\) y \(\theta = \omega_d T\), al hacer \(T \to 0\) todos los polos se aglomeran cada vez
      más cerca del punto \(z = 1 + j0\), aumentando la sensibilidad numérica a la longitud de palabra de los
      coeficientes del controlador.
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Calcular coordenadas polares y rectangulares de polos discretos a partir de Mp, ts y T.`,`Evaluar críticamente los modos sobre el eje real negativo y la respuesta deadbeat.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};