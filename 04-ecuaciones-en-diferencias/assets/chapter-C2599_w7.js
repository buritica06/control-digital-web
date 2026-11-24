var e={scene1:{titulo:`Animación Manim 1 — Del lazo digital al algoritmo recursivo`,subtitulo:`Cómo la ecuación implícita se despeja y actualiza los registros de memoria y[k-1], y[k-2].`,video:`./assets/videos/scene_01_algebraic_dev.mp4`,poster:`./assets/images/poster_scene_01.png`,clase:`Scene01AlgebraicDevelopment`,markers:[{time:.2,label:`1. Lazo ADC → CPU → ZOH`},{time:2.3,label:`2. Forma implícita`},{time:4.4,label:`3. Despeje recursivo`},{time:7,label:`4. Memoria z⁻¹`}],codigo:`class Scene01AlgebraicDevelopment(Scene):
    def construct(self):
        # Forma implícita LTI de orden n = 2
        # y[k] + a1*y[k-1] + a2*y[k-2] = b0*u[k] + b1*u[k-1]
        # Despeje algebraico -> algoritmo recursivo en el MCU:
        # y[k] = -a1*y[k-1] - a2*y[k-2] + b0*u[k] + b1*u[k-1]`},scene2:{titulo:`Animación Manim 2 — Transformada Z con condiciones iniciales`,subtitulo:`Teorema de retardo aplicado al servomecanismo con y[-1]=2, y[-2]=1 y separación libre/forzada.`,video:`./assets/videos/scene_02_z_transform_ci.mp4`,poster:`./assets/images/poster_scene_02.png`,clase:`Scene02ZTransformShift`,markers:[{time:.2,label:`1. Teorema de retardo`},{time:2,label:`2. Sustitución de CI`},{time:4.1,label:`3. Separación libre + forzada`}],codigo:`class Scene02ZTransformShift(Scene):
    def construct(self):
        # Z{y[k-1]} = z^-1 * Y(z) + y[-1]
        # Z{y[k-2]} = z^-2 * Y(z) + z^-1 * y[-1] + y[-2]
        # Y(z) = (2.2*z^2 - 0.8*z)/A(z) + z^2*U(z)/A(z)`},scene3:{titulo:`Animación Manim 3 — Evolución temporal de la secuencia y[k]`,subtitulo:`Extinción de la respuesta libre y convergencia de la respuesta total hacia y(∞) = 10.`,video:`./assets/videos/scene_03_time_evolution.mp4`,poster:`./assets/images/poster_scene_03.png`,clase:`Scene03TimeEvolution`,markers:[{time:.2,label:`1. Ejes y asíntota y(∞)=10`},{time:1.7,label:`2. Envolventes libre y forzada`},{time:3,label:`3. Muestras totales y[k]`}],codigo:`class Scene03TimeEvolution(Scene):
    def construct(self):
        k = np.arange(0, 12)
        y_libre = 3.2 * (0.8 ** k) - 1.0 * (0.5 ** k)
        y_forzada = 10.0 - (32.0 / 3.0) * (0.8 ** k) + (5.0 / 3.0) * (0.5 ** k)
        y_total = y_libre + y_forzada`},scene4:{titulo:`Animación Manim 4 — Estabilidad en el plano Z y círculo unitario`,subtitulo:`Tres regímenes clave: polos complejos estables, polo real negativo alternante y polos inestables.`,video:`./assets/videos/scene_04_stability_zplane.mp4`,poster:`./assets/images/poster_scene_04.png`,clase:`Scene04StabilityZPlane`,markers:[{time:.2,label:`1. Círculo unitario |z|=1`},{time:1.2,label:`2. Complejos estables (|p|=0.78)`},{time:3.2,label:`3. Real negativo (p=-0.75)`},{time:5.2,label:`4. Inestable (|p|=1.08)`}],codigo:`class Scene04StabilityZPlane(Scene):
    def construct(self):
        # Estabilidad BIBO <=> todos los polos satisfacen |p_i| < 1
        # Regímenes comparados: |p|=0.78, p=-0.75, |p|=1.08`}},t=[.5,1,1.5,2];function n(n){n.querySelectorAll(`[data-manim]`).forEach(n=>{let r=e[n.dataset.manim];if(!r)return;n.classList.add(`manim-card`),n.innerHTML=`
      <div class="manim-card__head">
        <div>
          <p class="manim-card__eyebrow">Animación matemática · Manim CE (${r.clase})</p>
          <h3 class="manim-card__title">${r.titulo}</h3>
          <p class="manim-card__sub">${r.subtitulo}</p>
        </div>
        <div class="manim-card__speeds" role="group" aria-label="Velocidad de reproducción">
          ${t.map(e=>`<button type="button" class="manim-speed${e===1?` is-active`:``}" data-rate="${e}">${e}×</button>`).join(``)}
        </div>
      </div>
      <div class="manim-card__video-wrap">
        <video class="manim-card__video" controls playsinline preload="metadata" poster="${r.poster}" src="${r.video}">
          Tu navegador no soporta la reproducción de video MP4.
        </video>
      </div>
      <div class="manim-card__markers" role="group" aria-label="Marcadores de la animación">
        <span class="manim-card__markers-label">Saltar a:</span>
        ${r.markers.map(e=>`<button type="button" class="manim-marker" data-time="${e.time}"><code>${e.time.toFixed(1)}s</code> ${e.label}</button>`).join(``)}
      </div>
      <details class="disclosure manim-card__code">
        <summary>Ver fragmento en Python (Manim CE)</summary>
        <div><pre class="no-math"><code>${r.codigo.replace(/</g,`&lt;`)}</code></pre></div>
      </details>
    `;let i=n.querySelector(`video`);n.querySelectorAll(`.manim-speed`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.rate);i.playbackRate=t,n.querySelectorAll(`.manim-speed`).forEach(t=>t.classList.toggle(`is-active`,t===e))})}),n.querySelectorAll(`.manim-marker`).forEach(e=>{e.addEventListener(`click`,()=>{i.currentTime=Number(e.dataset.time),i.play().catch(()=>{})})})})}function r({html:e,objetivos:t=[],presets:r={},setup:i}){return{objetivos:t,render(t,a){t.insertAdjacentHTML(`beforeend`,e),a.renderMathIn(t),n(t),t.querySelectorAll(`[data-viz]`).forEach(e=>{let t=r[e.dataset.preset]??{},n=a.mountViz(e,e.dataset.viz,t);a.track(()=>n.dispose())}),t.querySelectorAll(`:scope > h2, :scope > .callout, :scope > .table-wrap, :scope > .manim-card`).forEach(e=>e.classList.add(`reveal`)),i?.(t,a)}}}export{r as t};