const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-BTBnSY8J.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s11-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Condición geométrica sobre el eje real del LGR`,enunciado:g`<p>Un punto de prueba sobre el eje real del plano \(Z\) pertenece al Lugar Geométrico de las Raíces (\(K &gt; 0\)) si y solo si:</p>`,opciones:[`Se encuentra estrictamente dentro del círculo unitario.`,`El número total de polos y ceros reales situados a su derecha es impar.`,`El número total de polos a su izquierda es par.`,`Está ubicado únicamente entre z = 0 y z = 1.`],correcta:1,pista:g`<p>Aplica la condición de ángulo \(\angle G(z) = \pm 180^\circ(2m+1)\) sobre el eje real.</p>`,solucion:g`<p>Cada polo o cero real a la derecha aporta \(\pm 180^\circ\); se requiere un número impar para obtener un múltiplo impar de \(180^\circ\).</p>`},{id:`s11-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Cálculo de centroide de asíntotas`,enunciado:g`<p>Sea \(G(z) = \dfrac{1}{(z - 1)(z - 0.6)(z - 0.2)}\) (\(n = 3\), \(m = 0\)). Calcula el centroide \(\sigma_a\) de las tres asíntotas.</p>`,respuestas:[{etiqueta:`Centroide σ_a`,valor:1.8/3}],pista:g`<p>Usa \(\sigma_a = \dfrac{\sum p_i - \sum z_j}{n - m}\).</p>`,solucion:g`<p>\(\sigma_a = (1 + 0.6 + 0.2)/3 = 1.8/3 = 0.6\).</p>`},{id:`s11-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Punto de ruptura para dos polos reales sin ceros`,enunciado:g`<p>Para \(G(z) = \dfrac{1}{(z - 1)(z - 0.6)}\), calcula el punto de ruptura \(z_b\) sobre el eje real resolviendo \(dK/dz = 0\).</p>`,respuestas:[{etiqueta:`Punto de ruptura z_b`,valor:.8}],pista:g`<p>Con \(K(z) = -(z-1)(z-0.6)\), deriva respecto a \(z\) e iguala a cero.</p>`,solucion:g`<p>\(2z - 1.6 = 0 \implies z_b = 0.8\) (el punto medio exacto entre ambos polos).</p>`},{id:`s11-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Condición que determina el valor numérico de K en el LGR`,enunciado:g`<p>¿Qué nombre recibe la condición \(K = \dfrac{1}{|G(z)|}\) que permite calcular la ganancia exacta en un punto del LGR?</p>`,etiqueta:`Nombre de la condición`,aceptadas:[`magnitud`,`condicion de magnitud`,`condición de magnitud`,`modulo`,`módulo`],pista:g`<p>Acompaña a la condición de ángulo.</p>`,solucion:g`<p>Es la <strong>condición de magnitud</strong>.</p>`},{id:`s11-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Ganancia K por condición de magnitud`,enunciado:g`<p>Para \(G(z) = \dfrac{0.2}{(z - 1)(z - 0.6)}\), calcula la ganancia \(K\) necesaria para colocar los polos exactamente en el punto de ruptura \(z_b = 0.8\).</p>`,respuestas:[{etiqueta:`Ganancia K`,valor:.2*.2/.2}],pista:g`<p>Evalúa \(K = \dfrac{|0.8 - 1|\cdot|0.8 - 0.6|}{0.2}\).</p>`,solucion:g`<p>\(K = (0.2 \cdot 0.2)/0.2 = 0.2\).</p>`},{id:`s11-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + LGR 2D`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Manipulador 1 GDL</a>, explora \(K = 0.2\), \(K = 1.26\) y \(K = 4.2\). Describe el recorrido de los polos en el plano \(Z\) y el comportamiento físico del brazo robótico 3D en cada régimen.</p>`,respuestaModelo:g`<p>En \(K = 0.2\) ambos polos son reales en \([0.8187, 1]\) y el brazo responde lentamente sin sobrepaso. En \(K = 1.26\) los polos se ubican en la zona compleja con \(\zeta \approx 0.5\), dando respuesta rápida con sobrepaso moderado. En \(K = 4.2\) los polos cruzan fuera de \(|z|=1\) y el manipulador se vuelve inestable.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>Resuelve las seis actividades sobre reglas de trazado del LGR en \(Z\), puntos de ruptura y condición de magnitud.</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Qué efecto tiene un cero de muestreo en z = −0.935 sobre la forma del LGR discreto?</summary>
  <div>
    <p>
      El cero atrae una de las ramas hacia sí; para \(n=2, m=1\), las ramas complejas describen una circunferencia
      centrada en el cero \(z_1 = -0.935\), ampliando el radio de curvatura y desplazando el cruce con el círculo
      unitario respecto al caso sin ceros.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. Si el LGR de la planta sin compensar no pasa por el polo deseado z_des, ¿puede resolverse ajustando solo K?</summary>
  <div>
    <p>
      No. Variar \(K\) solo mueve los polos a lo largo de las trayectorias existentes. Para forzar al LGR a pasar por
      \(z_{\mathrm{des}}\) hay que modificar la condición de ángulo añadiendo polos y ceros mediante un
      <strong>compensador digital</strong> (Semana 12).
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Aplicar las reglas del LGR en el plano Z y calcular ganancias mediante la condición de magnitud.`,`Reconocer cuándo es necesario incorporar un compensador dinámico.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};