const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-DKJBtQo9.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s09-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Condiciones necesarias y suficientes de Jury para n = 2`,enunciado:g`<p>Para \(P(z) = a_0 z^2 + a_1 z + a_2\) con \(a_0 &gt; 0\), ¿qué conjunto de condiciones garantiza que ambas raíces satisfagan \(|z_i| &lt; 1\)?</p>`,opciones:[`a₁ > 0 y a₂ > 0`,`|a₂| < a₀, P(1) > 0 y P(−1) > 0`,`|a₁| < a₀ y P(1) > 0 únicamente`,`P(1) > 0 y P(−1) < 0`],correcta:1,pista:g`<p>Recuerda las tres fronteras que forman el triángulo de estabilidad de Jury.</p>`,solucion:g`<p>Para \(n=2\) (par), las tres condiciones exactas son \(|a_2| &lt; a_0\), \(P(1) &gt; 0\) y \(P(-1) &gt; 0\).</p>`},{id:`s09-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Evaluación directa de Jury para P(z) = z² − 1.2z + 0.5`,enunciado:g`<p>Dado \(P(z) = z^2 - 1.2z + 0.5\), calcula \(P(1)\) y \(P(-1)\).</p>`,respuestas:[{etiqueta:`P(1)`,valor:.3},{etiqueta:`P(−1)`,valor:2.7}],pista:g`<p>Sustituye \(z = 1\) y \(z = -1\) directamente en \(z^2 - 1.2z + 0.5\).</p>`,solucion:g`<p>\(P(1) = 1 - 1.2 + 0.5 = 0.3 &gt; 0\) y \(P(-1) = 1 + 1.2 + 0.5 = 2.7 &gt; 0\). Como \(|0.5| &lt; 1\), el sistema es estable.</p>`},{id:`s09-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Cálculo de ganancia crítica K_cr`,enunciado:g`<p>Si la ecuación característica de un lazo cerrado es \(z^2 + (-1.6 + 0.1K)z + (0.6 + 0.08K) = 0\), calcula la ganancia crítica \(K_{\mathrm{cr}}\) impuesta por la condición \(|a_2| &lt; 1\).</p>`,respuestas:[{etiqueta:`K_cr`,valor:5}],pista:g`<p>Resuelve \(0.6 + 0.08K_{\mathrm{cr}} = 1\).</p>`,solucion:g`<p>\(K_{\mathrm{cr}} = (1 - 0.6)/0.08 = 5.0\).</p>`},{id:`s09-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Transformación para reutilizar Routh-Hurwitz en tiempo discreto`,enunciado:g`<p>¿Qué nombre recibe la transformación \(z = \dfrac{w + 1}{w - 1}\) que mapea el interior del círculo unitario en el semiplano izquierdo del plano \(w\)?</p>`,etiqueta:`Nombre de la transformación`,aceptadas:[`bilineal`,`transformacion bilineal`,`transformación bilineal`,`tustin`],pista:g`<p>También se conoce como transformación de Tustin.</p>`,solucion:g`<p>Es la <strong>transformación bilineal</strong> (o de Tustin).</p>`},{id:`s09-act-5`,tipo:`opcion`,nivel:`Intermedio`,titulo:`Signo requerido de P(−1) para un polinomio de tercer orden (n = 3)`,enunciado:g`<p>Para un polinomio característico cúbico \(P(z) = a_0 z^3 + a_1 z^2 + a_2 z + a_3\) con \(a_0 &gt; 0\), ¿qué signo debe tener \(P(-1)\) para que pueda ser estable?</p>`,opciones:[`P(−1) > 0`,`P(−1) < 0`,`P(−1) = 0`,`No influye en la estabilidad`],correcta:1,pista:g`<p>Evalúa \((-1)^n P(-1) &gt; 0\) con \(n = 3\).</p>`,solucion:g`<p>Como \((-1)^3 = -1\), la condición \((-1)^3 P(-1) &gt; 0\) exige \(P(-1) &lt; 0\).</p>`},{id:`s09-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + 2D del posicionador`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Posicionador Lineal</a>, prueba \(K = 1.5\), \(K = 4.14\) y \(K = 4.5\). Describe cómo cambian las condiciones de Jury, la baliza de estado y la respuesta del bloque 3D, y justifica por qué en industria se recomienda operar en \(K \le 0.5\,K_{\mathrm{cr}}\).</p>`,respuestaModelo:g`<p>En \(K = 1.5\) las tres condiciones se cumplen holgadamente y el carro converge suavemente. En \(K = 4.14\), \(a_2 \approx 1\) y el sistema oscila de manera sostenida (estabilidad marginal). En \(K = 4.5\), \(|a_2| &gt; 1\) y la amplitud diverge. Operar en \(K \le 0.5\,K_{\mathrm{cr}}\) conserva margen frente a variaciones de carga, desgaste mecánico y retardos no modelados.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>
  Resuelve los seis ejercicios sobre el Criterio de Estabilidad de Jury, transformación bilineal y ganancia crítica.
</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Qué ocurre físicamente cuando P(1) = 0 frente a cuando P(−1) = 0?</summary>
  <div>
    <p>
      Si \(P(1) = 0\), existe un polo real en \(z = +1\) (deriva monótona / comportamiento integrador). Si \(P(-1) = 0\),
      existe un polo real en \(z = -1\), lo que genera una oscilación sostenida de máxima frecuencia (\(\omega_s/2\))
      alternando de signo en cada muestra.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. ¿Por qué el Criterio de Jury es suficiente para garantizar estabilidad absoluta, pero insuficiente para garantizar buen desempeño transitorio?</summary>
  <div>
    <p>
      Jury solo verifica que todos los polos cumplan \(|z_i| &lt; 1\), pero un polo en \(|z| = 0.99\) es estable según
      Jury aunque produzca un transitorio extremadamente lento u oscilatorio. Para especificar \(M_p\) y \(t_s\) se
      combina Jury con las regiones de la Semana 8 y el LGR de la Semana 11.
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Aplicar algebraicamente el Criterio de Jury y determinar ganancias críticas.`,`Interpretar la diferencia entre estabilidad absoluta y margen de seguridad industrial.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};