const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-BKgTG-Rw.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s12-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Relación entre z₀ y p₀ en un compensador digital de adelanto`,enunciado:g`<p>Para que \(D(z) = K_c\dfrac{z - z_0}{z - p_0}\) actúe como compensador de <strong>adelanto de fase</strong> (aportando ángulo positivo \(\phi &gt; 0\) en \(z_d\)), ¿qué desigualdad deben cumplir \(p_0\) y \(z_0\) sobre el semieje real positivo?</p>`,opciones:[`0 < z₀ < p₀ < 1`,`0 ≤ p₀ < z₀ < 1`,`p₀ > 1 y z₀ < 0`,`p₀ = z₀`],correcta:1,pista:g`<p>El cero debe ubicarse más cerca de \(z = +1\) que el polo.</p>`,solucion:g`<p>Con \(0 \le p_0 &lt; z_0 &lt; 1\), el ángulo \(\angle(z_d - z_0) &gt; \angle(z_d - p_0)\), produciendo adelanto de fase \(\phi &gt; 0\).</p>`},{id:`s12-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Ganancia en baja frecuencia de un compensador de atraso`,enunciado:g`<p>Un compensador de atraso tiene \(z_0 = 0.96\), \(p_0 = 0.992\) y \(K_c = 1\). Calcula el factor de mejora de ganancia DC \(\dfrac{1 - z_0}{1 - p_0}\).</p>`,respuestas:[{etiqueta:`Factor de mejora DC`,valor:(1-.96)/(1-.992)}],pista:g`<p>Evalúa \(D(1) = (1 - 0.96)/(1 - 0.992)\).</p>`,solucion:g`<p>\(D(1) = 0.04 / 0.008 = 5.0\), reduciendo el error estacionario en un factor de 5.</p>`},{id:`s12-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Cálculo del ángulo de deficiencia de fase φ`,enunciado:g`<p>Si en el polo deseado \(z_d\) la planta en lazo abierto aporta un ángulo \(\angle G(z_d) = -215^\circ\), ¿cuántos grados de adelanto positivo \(\phi\) debe suministrar el compensador para cumplir \(\angle D(z_d) + \angle G(z_d) = -180^\circ\)?</p>`,respuestas:[{etiqueta:`Deficiencia φ (grados)`,valor:35}],pista:g`<p>Despeja \(\phi = -180^\circ - (-215^\circ)\).</p>`,solucion:g`<p>\(\phi = 35^\circ\) de adelanto de fase.</p>`},{id:`s12-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Tipo de compensador para mejorar error estacionario sin alterar el transitorio`,enunciado:g`<p>Cuando la respuesta transitoria ya cumple \(M_p\) y \(t_s\), pero el error de estado estacionario ante rampa es demasiado grande, ¿qué tipo de compensador se diseña?</p>`,etiqueta:`Tipo de compensador`,aceptadas:[`atraso`,`atraso de fase`,`compensador de atraso`,`lag`],pista:g`<p>Aumenta la ganancia cerca de \(z = 1\) con polo y cero muy próximos a \(1\).</p>`,solucion:g`<p>Un <strong>compensador de atraso de fase</strong> (<em>lag</em>).</p>`},{id:`s12-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Ecuación en diferencias del compensador digital`,enunciado:g`<p>Al expresar \(D(z) = 1.436\dfrac{z - 0.81873}{z - 0.6074}\) como \(u[k] = a\,u[k-1] + b_0\,e[k] + b_1\,e[k-1]\), calcula los coeficientes \(a\) y \(b_1\).</p>`,respuestas:[{etiqueta:`Coeficiente a (de u[k−1])`,valor:.6074},{etiqueta:`Coeficiente b₁ (de e[k−1])`,valor:-1.17569628}],pista:g`<p>Divide numerador y denominador por \(z\) y despeja \(u[k]\).</p>`,solucion:g`<p>\(a = 0.6074\) y \(b_1 = -1.436(0.81873) \approx -1.1757\).</p>`},{id:`s12-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + 2D del compensador`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Servoposicionador</a>, compara el diseño nominal (\(p_0 = 0.607\)) frente a un polo más agresivo (\(p_0 = 0.25, K_c = 2.2\)). Analiza la mejora en velocidad frente al aumento en el pico inicial de la señal de control \(u[k]\).</p>`,respuestaModelo:g`<p>Al reducir \(p_0\) a \(0.25\) y subir \(K_c\), el brazo compensado acelera aún más y reduce el tiempo de asentamiento, pero el pico de voltaje inicial \(u[0] = K_c e[0]\) crece drásticamente, acercándose a los límites de saturación del puente H/driver del motor.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>Completa las seis actividades de diseño de compensadores digitales en adelanto y atraso de fase en el plano \(Z\).</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Por qué nunca debe cancelarse un polo o cero de la planta ubicado fuera del círculo unitario (|z| ≥ 1)?</summary>
  <div>
    <p>
      En la práctica nunca existe cancelación exacta debido a tolerancias e incertidumbres del modelo. Intentar cancelar
      un polo inestable o un cero de fase no mínima deja un modo oculto inestable o no observable que diverge
      internamente y satura los actuadores.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. ¿Por qué un compensador de adelanto con polo p₀ muy cercano a cero (o negativo) amplifica el ruido de medición?</summary>
  <div>
    <p>
      Porque su ganancia en alta frecuencia (cerca de \(z = -1\), frecuencia de Nyquist) es \(|D(-1)| = K_c\frac{1+z_0}{1+p_0}\),
      la cual crece fuertemente cuando \(p_0\) disminuye, transmitiendo el ruido del sensor directamente al actuador.
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Sintetizar compensadores de adelanto y atraso en el plano Z.`,`Evaluar compromisos entre rapidez transitoria, ruido y saturación.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};