const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./evaluator-bIOy2wEy.js","./rolldown-runtime-WkwZ5CU-.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,t as r}from"./index-1n_TgB0f.js";import{t as i}from"./chapter-scZPzzfv.js";var a=(e,t,n)=>Math.abs(e-t)<=(n??Math.max(.005*Math.abs(t),.001)),o=e=>String(e).normalize(`NFD`).replace(/\p{M}/gu,``).toLowerCase().replace(/\s+/g,` `).trim(),s=(e,t)=>t.map(o).includes(o(e));function c(e,t){let n=[].concat(t);return e.length===n.length&&n.every(t=>e.includes(t))}function l(e){let t=(t,n,i)=>`<div class="answer-row">
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
  </section>`}function d(e,t,n){e.className=`feedback ${t?`feedback--ok`:`feedback--bad`}`,e.textContent=n}async function f(t,n){let{evaluateSafe:r}=await e(async()=>{let{evaluateSafe:e}=await import(`./evaluator-bIOy2wEy.js`);return{evaluateSafe:e}},__vite__mapDeps([0,1]),import.meta.url),i=!0;for(let[e,o]of t.respuestas.entries()){let s=n.querySelector(`[name="r${e}"]`),c=n.querySelector(`#${t.id}-f${e}`),l=s.value.trim().replace(`,`,`.`),u=!1;if(!l)d(c,!1,`Escribe una respuesta.`);else try{let e=await r(l,{},{timeoutMs:50});u=a(e,o.valor,o.tol),d(c,u,u?`✓ Correcto (${e.toPrecision(5)})`:`✗ Obtuviste ${e.toPrecision(5)}; revisa el procedimiento.`)}catch(e){d(c,!1,`No se pudo interpretar: ${e.message}`)}s.setAttribute(`aria-invalid`,String(!u)),i&&=u}return i}function p(e,t){let n=t.querySelector(`[name="r0"]`),r=t.querySelector(`#${e.id}-f0`),i=n.value.trim()!==``&&s(n.value,e.aceptadas);return n.setAttribute(`aria-invalid`,String(!i)),d(r,i,i?`✓ Correcto`:n.value.trim()?`✗ No coincide; revisa la pista.`:`Escribe una respuesta.`),i}function m(e,t){let n=t.querySelector(`#${e.id}-f0`),r=[...t.querySelectorAll(`[name="opcion"]:checked`)].map(e=>Number(e.value)),i=c(r,e.correcta);return d(n,i,i?`✓ Correcto`:r.length?`✗ Todavía no; inténtalo de nuevo.`:`Marca una opción.`),i}function h(e){return function(r,i){let a=document.createElement(`div`);a.innerHTML=e.map((e,t)=>u(e,t+1,i.progress.isExerciseSolved(e.id))).join(``),r.appendChild(a),i.renderMathIn(a);let o=(e,r)=>{i.progress.markExercise(r.id);let a=e.querySelector(`[data-badge]`);a.className=`badge badge--done`,a.innerHTML=`${t(`check`)} Resuelto`,n(a)},s=t=>{let n=t.closest(`[data-ex]`);return{box:n,a:e.find(e=>e.id===n.dataset.ex)}},c=async e=>{let t=e.target.closest(`form`);if(!t)return;e.preventDefault();let{box:n,a:r}=s(t);if(r.tipo===`abierta`){t.querySelector(`[data-modelo]`).hidden=!1;return}let i={numerica:f,texto:p,opcion:m}[r.tipo];await i(r,t)&&o(n,r)},l=e=>{let t=e.target.closest(`[data-autoevaluar]`);if(!t)return;let{box:n,a:r}=s(t);o(n,r),t.disabled=!0};r.addEventListener(`submit`,c),r.addEventListener(`click`,l),i.track(()=>{r.removeEventListener(`submit`,c),r.removeEventListener(`click`,l)})}}var g=String.raw,_=[{id:`s06-act-1`,tipo:`opcion`,nivel:`Básico`,titulo:`Efecto espectral del muestreador ideal por impulsos`,enunciado:g`<p>Al multiplicar una señal continua \(x(t)\) por un tren de impulsos \(\delta_T(t)\) de periodo \(T\), ¿qué ocurre con su espectro \(X(j\omega)\)?</p>`,opciones:[`Se atenúa uniformemente sin cambiar de ubicación en frecuencia.`,`Se replica periódicamente en todos los múltiplos enteros de la frecuencia de muestreo ω_s = 2π/T, escalado por 1/T.`,`Se recorta automáticamente a la frecuencia de Nyquist sin producir solapamiento.`,`Se desplaza únicamente hacia frecuencias positivas mayores que ω_s.`],correcta:1,pista:g`<p>Recuerda la Serie Compleja de Fourier del tren de deltas y la propiedad de desplazamiento de la Transformada de Fourier.</p>`,solucion:g`<p>\(X^*(j\omega) = \frac{1}{T}\sum_{n=-\infty}^{\infty} X(j(\omega - n\omega_s))\): aparecen infinitas copias centradas en \(n\omega_s\) escaladas por \(1/T\).</p>`},{id:`s06-act-2`,tipo:`numerica`,nivel:`Básico`,titulo:`Cálculo de frecuencia aparente de alias`,enunciado:g`<p>Un sensor industrial mide una vibración senoidal de \(f_0 = 17\ \text{Hz}\), pero el ADC muestrea a \(f_s = 20\ \text{Hz}\). Calcula la frecuencia de Nyquist \(f_N\) y la frecuencia aparente de alias \(f_{\mathrm{alias}}\) (en Hz).</p>`,respuestas:[{etiqueta:`Frecuencia de Nyquist f_N (Hz)`,valor:10},{etiqueta:`Frecuencia aparente f_alias (Hz)`,valor:3}],pista:g`<p>Aplica \(f_N = f_s / 2\) y \(f_{\mathrm{alias}} = \min_k |f_0 - k f_s|\).</p>`,solucion:g`<p>\(f_N = 20/2 = 10\ \text{Hz}\). Como \(17 &gt; 10\), \(f_{\mathrm{alias}} = |17 - 1\cdot 20| = 3\ \text{Hz}\).</p>`},{id:`s06-act-3`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Pérdida de margen de fase del Retenedor de Orden Cero (ZOH)`,enunciado:g`<p>En un lazo de control con frecuencia de cruce \(\omega_c = 0.4\ \text{rad/s}\) se utiliza un periodo de muestreo \(T = 0.5\ \text{s}\). Calcula la magnitud de la pérdida de margen de fase introducida por el ZOH en radianes y en grados (valor positivo de pérdida).</p>`,respuestas:[{etiqueta:`|Δφ_ZOH| (rad)`,valor:.1},{etiqueta:`|Δφ_ZOH| (grados)`,valor:18/Math.PI}],pista:g`<p>Usa \(|\Delta\phi_{\mathrm{ZOH}}| = \frac{\omega_c T}{2}\) en radianes y multiplica por \(180/\pi\) para grados.</p>`,solucion:g`<p>\(|\Delta\phi_{\mathrm{ZOH}}| = \frac{0.4 \cdot 0.5}{2} = 0.1\ \text{rad} \approx 5.73^\circ\).</p>`},{id:`s06-act-4`,tipo:`texto`,nivel:`Básico`,titulo:`Etapa obligatoria previa al convertidor ADC`,enunciado:g`<p>¿Qué nombre recibe el filtro analógico pasobajo que debe ubicarse obligatoriamente <em>antes</em> del muestreador para suprimir componentes por encima de \(f_s/2\)?</p>`,etiqueta:`Nombre del filtro`,aceptadas:[`antialiasing`,`anti-aliasing`,`filtro antialiasing`,`filtro anti-aliasing`,`anti aliasing`],pista:g`<p>Su nombre indica literalmente que evita el fenómeno de <em>aliasing</em>.</p>`,solucion:g`<p>Es el <strong>filtro antialiasing</strong> (analógico, previo al ADC), pues una vez ocurrido el plegamiento espectral ningún filtro digital puede revertirlo.</p>`},{id:`s06-act-5`,tipo:`numerica`,nivel:`Intermedio`,titulo:`Selección de periodo T por criterio de ancho de banda`,enunciado:g`<p>Un servomecanismo tiene ancho de banda en lazo cerrado \(\omega_b = 4\ \text{rad/s}\). Aplicando la regla de ingeniería \(\omega_s = 20\,\omega_b\), determina la frecuencia angular de muestreo \(\omega_s\) (rad/s) y el periodo \(T\) (s).</p>`,respuestas:[{etiqueta:`ω_s (rad/s)`,valor:80},{etiqueta:`Periodo T (s)`,valor:2*Math.PI/80}],pista:g`<p>Calcula \(\omega_s = 20\omega_b\) y luego \(T = 2\pi / \omega_s\).</p>`,solucion:g`<p>\(\omega_s = 20(4) = 80\ \text{rad/s}\) y \(T = 2\pi / 80 \approx 0.0785\ \text{s}\) (\(78.5\ \text{ms}\)).</p>`},{id:`s06-act-6`,tipo:`abierta`,nivel:`Avanzado`,titulo:`Reto práctico guiado con el simulador 3D + 2D del reactor`,enunciado:g`<p>Abre el <a href="#/capitulo/03-caso-practico">Simulador 3D + 2D del reactor</a>, fija \(K_c = 0.65\) y realiza dos experimentos: (a) incrementa \(T\) desde \(1.0\ \text{s}\) hasta \(4.5\ \text{s}\) con filtro antialiasing activo; (b) regresa a \(T = 1.0\ \text{s}\) y desactiva el filtro antialiasing con amplitud de ruido \(4^\circ\text{C}\). Redacta un diagnóstico técnico explicando ambos comportamientos.</p>`,respuestaModelo:g`<p>(a) Al aumentar \(T\) de \(1.0\ \text{s}\) a \(4.5\ \text{s}\), la pérdida de fase del ZOH crece de \(-2.86^\circ\) a \(-12.89^\circ\) (sumada al retardo de transporte \(L = 2\ \text{s}\)), provocando mayor sobreimpulso y oscilaciones sostenidas en la válvula 3D y en \(y(t)\). (b) Al desactivar el filtro antialiasing, la perturbación de alta frecuencia se pliega dentro de la banda base como una oscilación falsa que el controlador intenta corregir, desgastando el actuador y degradando la regulación térmica.</p>`}],v=String.raw`
<h2 id="actividad-aprendizaje">6. Actividad de aprendizaje</h2>
<p>
  Resuelve los seis ejercicios interactivos (incluyendo el reto guiado sobre el simulador 3D + 2D). Las respuestas
  numéricas aceptan decimales o expresiones matemáticas (como <code>2*pi/80</code>) y tu avance se guarda localmente en
  este navegador.
</p>
<div id="bloque-actividades"></div>

<h2 id="preguntas-discusion">8. Preguntas y discusión</h2>
<p>
  Discute estas preguntas de pensamiento crítico con tu grupo o antes de la sesión de laboratorio:
</p>

<details class="disclosure">
  <summary>1. ¿Por qué cumplir estrictamente f_s = 2.1·f_max suele ser suficiente en audio, pero peligroso en un lazo de control digital?</summary>
  <div>
    <p>
      En audio basta reconstruir la forma de onda fuera de línea con un filtro reconstructor de alto orden. En control
      en tiempo real, el Retenedor de Orden Cero (ZOH) introduce un retardo de fase de \(-180^\circ(f/f_s)\): a
      \(f_s \approx 2.1\,f_c\) la pérdida de fase ronda \(-85^\circ\), lo que destruye el margen de fase y desestabiliza
      la planta en lazo cerrado. Por eso en control se exige \(f_s \approx 10\text{–}30\,f_b\).
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>2. Si un microcontrolador moderno puede muestrear a 100 kHz un reactor térmico con τ = 15 s, ¿conviene usar T = 10 μs?</summary>
  <div>
    <p>
      No. Muestrear órdenes de magnitud más rápido que la dinámica física acumula polos discretos muy cercanos a
      \(z = 1\), amplifica errores de redondeo/cuantificación en los coeficientes del controlador, dispara el ruido en
      la acción derivativa y desperdicia CPU y energía sin mejorar la respuesta térmica.
    </p>
  </div>
</details>

<details class="disclosure">
  <summary>3. ¿Qué riesgo implica que un filtro analógico antialiasing tenga una frecuencia de corte demasiado baja respecto a ω_b?</summary>
  <div>
    <p>
      El filtro antialiasing está dentro del lazo de realimentación; si su frecuencia de corte \(f_c\) se acerca al ancho
      de banda del lazo \(\omega_b\), su propio desfase (hasta \(-90^\circ\) en \(f_c\) para un Butterworth de 2.º orden)
      se suma al del ZOH y reduce el margen de fase. Por ello suele escogerse \(f_s\) suficientemente alta para ubicar
      \(f_c\) muy por encima de \(\omega_b\) y por debajo de \(f_s/2\).
    </p>
  </div>
</details>
`,y=i({html:v,objetivos:[`Aplicar el Teorema de Shannon-Nyquist y el cálculo de desfase del ZOH en problemas cuantitativos.`,`Validar hipótesis de diseño mediante experimentación dirigida en el simulador 3D + 2D.`,`Argumentar decisiones de ingeniería sobre compromiso entre periodo T, filtrado antialiasing y estabilidad.`],setup(e,t){let n=e.querySelector(`#bloque-actividades`);n&&h(_)(n,t)}});export{y as default};