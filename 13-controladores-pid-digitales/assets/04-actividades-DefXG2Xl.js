const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-DI10yx-2.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s13-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Ventaja operativa principal del algoritmo PID incremental (de velocidad)`,enunciado:g`<p>¿Por qué la industria prefiere implementar el algoritmo PID en <strong>forma de velocidad</strong> (\(\Delta u[k]\)) en lugar de la forma de posición?</p>`,opciones:[`Porque elimina por completo la necesidad de medir la salida del sensor.`,`Porque ofrece transferencia suave Manual–Auto (bumpless transfer) y protección anti-windup natural.`,`Porque reemplaza la acción derivativa por un integrador adicional.`,`Porque funciona únicamente sin periodo de muestreo fijo.`],correcta:1,pista:g`<p>Piensa en qué ocurre con la suma acumulada del integrador al conmutar de manual a automático o al saturar.</p>`,solucion:g`<p>Al calcular incrementos \(\Delta u[k]\) y saturar \(u[k] = \mathrm{sat}(u[k-1]+\Delta u[k])\), se evita el <em>windup</em> y los saltos bruscos al cambiar de modo.</p>`},{id:`s13-act-2`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Cálculo de coeficientes incrementales q₀ y q₂`,enunciado:g`<p>Para un PID digital con \(K_p = 2.0\), \(T_i = 0.5\ \text{s}\), \(T_d = 0.04\ \text{s}\) y \(T = 0.02\ \text{s}\), calcula \(q_0 = K_p(1 + \frac{T}{2T_i} + \frac{T_d}{T})\) y \(q_2 = K_p\frac{T_d}{T}\).</p>`,respuestas:[{etiqueta:`q₀`,valor:6.04},{etiqueta:`q₂`,valor:4}],pista:g`<p>Calcula primero \(T/(2T_i) = 0.02\) y \(T_d/T = 2.0\).</p>`,solucion:g`<p>\(q_0 = 2.0(1 + 0.02 + 2.0) = 6.04\) y \(q_2 = 2.0(2.0) = 4.0\).</p>`},{id:`s13-act-3`,tipo:`texto`,nivel:`Básico`,titulo:`Fenómeno de saturación del integrador`,enunciado:g`<p>¿Con qué término técnico en inglés se conoce la acumulación excesiva del término integral mientras el actuador permanece saturado en \(U_{\max}\)?</p>`,etiqueta:`Término técnico`,aceptadas:[`windup`,`integrator windup`,`wind-up`,`saturacion integral`,`saturación integral`],pista:g`<p>La protección que lo evita se llama <em>anti-…</em>.</p>`,solucion:g`<p>Se denomina <strong>windup</strong> (o <em>integrator windup</em>).</p>`},{id:`s13-act-4`,tipo:`opcion`,nivel:`Básico`,titulo:`Propósito del filtro pasa-bajos derivativo con parámetro N`,enunciado:g`<p>¿Qué problema resuelve el filtro de primer orden \(D(s) = \dfrac{K_p T_d s}{1 + (T_d/N)s}\) (\(N \approx 8\text{–}20\))?</p>`,opciones:[`Aumenta la ganancia en alta frecuencia para responder al ruido del encoder.`,`Limita la ganancia en alta frecuencia de la acción derivativa para evitar amplificar ruido de medición.`,`Elimina el error de estado estacionario ante escalón.`,`Sustituye completamente el filtro antialiasing analógico.`],correcta:1,pista:g`<p>La derivada ideal multiplica el ruido de alta frecuencia por \(1/T\).</p>`,solucion:g`<p>Limita la ganancia derivativa en alta frecuencia a \(N K_p\), evitando que el ruido de cuantificación sature o caliente el actuador.</p>`},{id:`s13-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Coeficiente α del filtro derivativo discreto`,enunciado:g`<p>Para \(T_d = 0.05\ \text{s}\), \(N = 10\) y \(T = 0.02\ \text{s}\), calcula el coeficiente recursivo \(\alpha = \dfrac{T_d/N}{T + T_d/N}\).</p>`,respuestas:[{etiqueta:`α`,valor:.005/.025}],pista:g`<p>Calcula \(T_d/N = 0.005\ \text{s}\) y divide entre \(0.02 + 0.005\).</p>`,solucion:g`<p>\(\alpha = 0.005 / 0.025 = 0.2\).</p>`},{id:`s13-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico en el simulador 3D + 2D del motor DC con PID`,enunciado:g`<p>En el <a href="#/capitulo/03-caso-practico">Simulador del Motor DC</a>, reduce \(U_{\max}\) a \(9\ \text{V}\) con \(T_i = 0.15\ \text{s}\) y alterna el conmutador <strong>Anti-Windup</strong> entre activo e inactivo. Explica la diferencia observada en el sobrepaso de RPM y el tiempo que tarda \(u[k]\) en abandonar la saturación.</p>`,respuestaModelo:g`<p>Sin anti-windup, mientras el driver permanece saturado en \(9\ \text{V}\), el integrador continúa acumulando un valor enorme que mantiene \(u[k] = 9\ \text{V}\) incluso después de superar los \(1000\ \text{RPM}\), provocando un sobrepaso severo. Con anti-windup activo, el voltaje desciende de inmediato al acercarse a la referencia, eliminando el sobrepaso destructivo y acelerando el asentamiento.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>Completa las seis actividades sobre algoritmos PID digitales, filtrado derivativo y esquemas anti-windup.</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<details class="disclosure">
  <summary>1. ¿Por qué muchos PID industriales aplican la derivada sobre la medición (−dy/dt) en lugar de sobre el error (de/dt)?</summary>
  <div>
    <p>
      Ante un cambio brusco tipo escalón en la referencia \(r[k]\), \(de/dt\) produce un pulso gigante instantáneo
      llamado <em>derivative kick</em> (patada derivativa) que golpea al actuador. Al derivar solo \(-y[k]\)
      (<em>derivative on measurement</em>), el lazo mantiene el amortiguamiento sin generar picos ante cambios de setpoint.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. ¿Qué mecanismos defensivos de software debe incluir obligatoriamente un firmware PID antes de conectarlo a una planta real?</summary>
  <div>
    <p>
      Saturación estricta de salida \([U_{\min}, U_{\max}]\), protección <em>anti-windup</em>, filtro derivativo,
      detección de fallo de sensor (<em>watchdog</em>), limitador de tasa de cambio (<em>slew-rate</em>) y parada de
      emergencia independiente en hardware.
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Implementar y validar coeficientes del PID incremental con filtrado derivativo y anti-windup.`,`Aplicar principios de seguridad funcional en firmware de control embebido.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};