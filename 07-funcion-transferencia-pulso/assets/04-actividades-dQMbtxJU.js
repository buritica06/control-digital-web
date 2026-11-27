const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-AC2Dpity.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s07-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Álgebra de bloques con y sin muestreador intermedio`,enunciado:g`<p>Dos bloques continuos \(G_1(s)\) y \(G_2(s)\) están conectados en cascada <em>sin</em> ningún muestreador entre ellos, muestreándose únicamente la entrada y la salida final. ¿Cuál es la función de transferencia de pulso equivalente?</p>`,opciones:[`G₁(z) · G₂(z)`,`G₁G₂(z) = Z{ G₁(s) · G₂(s) }`,`G₁(z) + G₂(z)`,`(1 − z⁻¹) · G₁(z) · G₂(z)`],correcta:1,pista:g`<p>Solo se multiplican las transformadas Z individuales cuando existe un muestreador físico entre ambos bloques.</p>`,solucion:g`<p>Sin muestreador intermedio debe calcularse la transformada conjunta \(\overline{G_1 G_2}(z) = \mathcal{Z}\{G_1(s)G_2(s)\}\).</p>`},{id:`s07-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Mapeo exacto de polos continuos con ZOH`,enunciado:g`<p>Una planta tiene polos continuos en \(s_1 = 0\) y \(s_2 = -4\). Si se discretiza con ZOH usando \(T = 0.2\ \text{s}\), calcula el polo discreto \(z_2 = e^{s_2 T}\).</p>`,respuestas:[{etiqueta:`Polo discreto z₂`,valor:Math.exp(-.8)}],pista:g`<p>Evalúa \(z_2 = e^{-4 \cdot 0.2} = e^{-0.8}\).</p>`,solucion:g`<p>\(z_2 = e^{-0.8} \approx 0.4493\).</p>`},{id:`s07-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Función de transferencia de pulso de primer orden`,enunciado:g`<p>Discretiza con ZOH la planta \(G_p(s) = \dfrac{3}{s + 3}\) para \(T = 0.1\ \text{s}\), cuya forma es \(G(z) = \dfrac{b_0}{z - a_1}\). Calcula \(a_1 = e^{-3T}\) y \(b_0 = 1 - e^{-3T}\).</p>`,respuestas:[{etiqueta:`Polo a₁ = e⁻⁰·³`,valor:Math.exp(-.3)},{etiqueta:`Ganancia b₀ = 1 − e⁻⁰·³`,valor:1-Math.exp(-.3)}],pista:g`<p>Para \(\frac{a}{s+a}\) con ZOH, \(G(z) = \frac{1 - e^{-aT}}{z - e^{-aT}}\).</p>`,solucion:g`<p>\(a_1 = e^{-0.3} \approx 0.7408\) y \(b_0 = 1 - 0.7408 = 0.2592\). Comprobación DC: \(G(1) = b_0/(1-a_1) = 1\).</p>`},{id:`s07-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Singularidad introducida por la discretización ZOH`,enunciado:g`<p>Aunque el servomotor continuo \(G_p(s) = 10/[s(s+2)]\) no posee ceros finitos, su modelo ZOH \(G(z)\) sí tiene uno en \(z_0 \approx -0.9355\). ¿Cómo se denomina este tipo de cero?</p>`,etiqueta:`Nombre técnico`,aceptadas:[`cero de muestreo`,`ceros de muestreo`,`sampling zero`],pista:g`<p>Aparece únicamente como consecuencia del proceso de muestreo y retención.</p>`,solucion:g`<p>Se denomina <strong>cero de muestreo</strong> (<em>sampling zero</em>).</p>`},{id:`s07-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Ganancia crítica aproximada del servomotor en lazo cerrado`,enunciado:g`<p>Para la ecuación característica \(z^2 + (-1.81873 + 0.04683K)z + (0.81873 + 0.04381K) = 0\), el término independiente \(a_0(K) = 0.81873 + 0.04381K\) debe ser menor que \(1\) para que los polos permanezcan dentro del círculo unitario. Calcula el valor límite \(K_{\max}\) donde \(a_0(K_{\max}) = 1\).</p>`,respuestas:[{etiqueta:`K_max`,valor:(1-.81873)/.04381}],pista:g`<p>Despeja \(K\) de \(0.81873 + 0.04381K = 1\).</p>`,solucion:g`<p>\(K_{\max} = \dfrac{1 - 0.81873}{0.04381} \approx 4.138\). Puedes comprobarlo en el simulador 3D+2D.</p>`},{id:`s07-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + 2D del servomotor`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Servomotor DC</a>, mantén \(T = 0.1\ \text{s}\) y aumenta progresivamente \(K\) desde \(0.6\) hasta \(3.8\). Luego fija \(K = 1.2\) y aumenta \(T\) a \(0.35\ \text{s}\). Explica qué ocurre con los polos de lazo cerrado y con el comportamiento intermuestral del rotor 3D.</p>`,respuestaModelo:g`<p>Al subir \(K\) hacia \(4.14\), el módulo de los polos complejos conjugados \(|p_{1,2}| = \sqrt{0.81873 + 0.04381K}\) se aproxima a \(1\), causando sobreimpulso alto y oscilación persistente en el disco 3D. Al aumentar \(T\) a \(0.35\ \text{s}\) con \(K = 1.2\), el retardo del ZOH reduce el margen de estabilidad y la señal \(v_{\mathrm{ZOH}}(t)\) muestra escalones amplios que excitan oscilaciones visibles entre muestras.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>
  Completa las seis actividades de cálculo y análisis sobre función de transferencia de pulso, álgebra de bloques y
  lazo cerrado digital. Tu progreso se guarda automáticamente en este navegador.
</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Por qué un sistema continuo estable de segundo orden sin ceros puede volverse inestable en lazo cerrado digital con solo control proporcional K?</summary>
  <div>
    <p>
      En tiempo continuo, \(G_p(s) = \frac{10}{s(s+2)}\) es estable para cualquier \(K &gt; 0\). Sin embargo, al
      discretizarlo con ZOH, el retardo de fase \(-\omega T/2\) y el cero de muestreo hacen que el término independiente
      \(a_0(K)\) supere la unidad para \(K &gt; K_{\max}\), sacando los polos fuera del círculo unitario \(|z| = 1\).
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. ¿Por qué la ganancia en estado estacionario G(z=1) debe coincidir con G_p(s=0) al discretizar con ZOH?</summary>
  <div>
    <p>
      Porque ante una entrada constante (escalón unitario), el Retenedor de Orden Cero reproduce exactamente la entrada
      continua sin error de escalonamiento; por el Teorema del Valor Final, \(G(1) = \lim_{s\to 0} G_p(s)\) siempre que
      la planta sea estable.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>3. ¿Qué peligro ocultan las oscilaciones intermuestrales (hidden oscillations) cuando solo observamos y[k]?</summary>
  <div>
    <p>
      La función \(G(z)\) solo describe los valores exactos en \(t = kT\). Entre muestras, el actuador puede sufrir
      sobreesfuerzo o excitar resonancias mecánicas de engranajes que parecen invisibles si el periodo \(T\) es muy
      grande respecto a la dinámica rápida del sistema.
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Aplicar correctamente las reglas de discretización ZOH y álgebra de bloques muestreados.`,`Verificar analítica y numéricamente la estabilidad del servomotor en lazo cerrado.`,`Reflexionar sobre el comportamiento intermuestral en sistemas mecatrónicos.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};