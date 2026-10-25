/**
 * Controlador Interactivo de Escenas de Manim (Video MP4 + Marcadores + Código Fuente)
 * Asignatura: MEC36 - Control II | Semana 04: Ecuaciones en Diferencias
 * Institución Universitaria de Barranquilla (IUB)
 */

const MANIM_SCENES_DATA = {
  scene1: {
    id: 'scene1',
    className: 'Scene01AlgebraicDevelopment',
    title: 'Escena 1: Desarrollo Algebraico y Arquitectura de Memoria Recursiva',
    subtitle: 'Del Lazo de Control Digital (ADC → CPU → DAC/ZOH) al Algoritmo en el Microcontrolador',
    videoSrc: 'assets/videos/scene_01_algebraic_dev.mp4',
    posterSrc: 'assets/images/poster_scene_01.png',
    description:
      'Visualiza cómo un procesador digital reemplaza las ecuaciones diferenciales continuas por una ecuación en diferencias lineal de orden n. Muestra el despeje algebraico desde la forma implícita hacia el algoritmo recursivo explícito y la actualización física de los registros de memoria y[k-1] e y[k-2].',
    equationLatex: '$$y[k] = -a_1 y[k-1] - a_2 y[k-2] + b_0 u[k] + b_1 u[k-1]$$',
    markers: [
      { time: 0.2, label: '1. Lazo Digital (ADC → CPU → ZOH)' },
      { time: 2.3, label: '2. Ecuación Implícita de Atraso' },
      { time: 4.4, label: '3. Despeje del Algoritmo Recursivo' },
      { time: 7.0, label: '4. Desplazamiento de Registros z⁻¹' }
    ],
    pythonSnippet: `class Scene01AlgebraicDevelopment(Scene):
    def construct(self):
        self.camera.background_color = "#121023"  # iubOscuro
        # 1. Forma implícita LTI de orden n = 2
        card_implicit = build_equation_card([
            ("Forma Implícita de Atraso (Orden n = 2):", "#CBD5E1"),
            ("y[k] + a₁·y[k-1] + a₂·y[k-2] = b₀·u[k] + b₁·u[k-1]", "#FFFFFF"),
        ], badge_label="MODELO LTI", border_color="#00ADE7")
        # 2. Transformación algebraica a algoritmo recursivo
        card_explicit = build_equation_card([
            ("Despeje Algebraico → Algoritmo Recursivo Ejecutable:", "#FFDF2D"),
            ("y[k] = -a₁·y[k-1] - a₂·y[k-2] + b₀·u[k] + b₁·u[k-1]", "#3B9C6D"),
        ], badge_label="ALGORITMO MCU", border_color="#FFDF2D")
        self.play(TransformFromCopy(card_implicit, card_explicit))`
  },
  scene2: {
    id: 'scene2',
    className: 'Scene02ZTransformShift',
    title: 'Escena 2: Transformación al Dominio Z con Condiciones Iniciales',
    subtitle: 'Teorema de Retardo Temporal y Desacoplamiento en Respuesta Libre + Respuesta Forzada',
    videoSrc: 'assets/videos/scene_02_z_transform_ci.mp4',
    posterSrc: 'assets/images/poster_scene_02.png',
    description:
      'Desarrolla paso a paso la aplicación de la Transformada Z unilateral sobre la ecuación del servomecanismo y[k] - 1.3y[k-1] + 0.4y[k-2] = u[k] con condiciones iniciales no nulas y[-1]=2, y[-2]=1. Ilustra cómo emergen algebraicamente el polinomio característico A(z) y la separación exacta entre la respuesta a entrada cero (libre) y estado cero (forzada).',
    equationLatex: '$$Y(z) = \\underbrace{\\frac{2.2z^2 - 0.8z}{z^2 - 1.3z + 0.4}}_{Y_{\\text{libre}}(z)} + \\underbrace{\\frac{z^2}{z^2 - 1.3z + 0.4}U(z)}_{Y_{\\text{forzada}}(z)}$$',
    markers: [
      { time: 0.2, label: '1. Teorema de Retardo con CI' },
      { time: 2.0, label: '2. Sustitución y[-1]=2, y[-2]=1' },
      { time: 4.1, label: '3. Separación Libre + Forzada y Solución' }
    ],
    pythonSnippet: `class Scene02ZTransformShift(Scene):
    def construct(self):
        # Teorema de traslación hacia atrás con condiciones iniciales
        card_shift = build_equation_card([
            ("Z{ y[k-1] } = z⁻¹·Y(z) + y[-1]", "#00ADE7"),
            ("Z{ y[k-2] } = z⁻²·Y(z) + z⁻¹·y[-1] + y[-2]", "#E39037"),
        ], badge_label="TEOREMA DE RETARDO")
        # Desacoplamiento Libre vs. Forzada
        card_decomp = build_equation_card([
            ("Y(z) = [ (2.2·z² - 0.8·z) / A(z) ] + [ z²·U(z) / A(z) ]", "#FFDF2D"),
            ("y[k] = 10.0 - 7.4667·(0.8)^k + 0.6667·(0.5)^k  (k ≥ 0)", "#3B9C6D"),
        ], badge_label="LIBRE + FORZADA → SOLUCIÓN CERRADA")`
  },
  scene3: {
    id: 'scene3',
    className: 'Scene03TimeEvolution',
    title: 'Escena 3: Evolución Temporal de Secuencias Discretas y[k]',
    subtitle: 'Construcción Muestra a Muestra (k = 0..11) y Convergencia al Régimen Permanente',
    videoSrc: 'assets/videos/scene_03_time_evolution.mp4',
    posterSrc: 'assets/images/poster_scene_03.png',
    description:
      'Representa gráficamente la evolución temporal de la secuencia discreta y[k] para el servomecanismo mecatrónico. Contrasta la extinción exponencial de la respuesta libre (energía inicial almacenada) con el crecimiento de la respuesta forzada hacia la asíntota de estado estacionario y(∞) = 10.0.',
    equationLatex: '$$y[k] = 10.0 - 7.4667(0.8)^k + 0.6667(0.5)^k \\xrightarrow{k \\to \\infty} 10.0$$',
    markers: [
      { time: 0.2, label: '1. Ejes Discretos y Asíntota y(∞)=10' },
      { time: 1.7, label: '2. Envolventes Libre y Forzada' },
      { time: 3.0, label: '3. Secuencia de Muestras y[k]' }
    ],
    pythonSnippet: `class Scene03TimeEvolution(Scene):
    def construct(self):
        k_vals = np.arange(0, 12)
        y_libre = 3.2 * (0.8 ** k_vals) - 1.0 * (0.5 ** k_vals)
        y_forzada = 10.0 - (32.0 / 3.0) * (0.8 ** k_vals) + (5.0 / 3.0) * (0.5 ** k_vals)
        y_total = y_libre + y_forzada
        # Creación progresiva de muestras discretas (stem plot)
        self.play(LaggedStart(*[FadeIn(s, shift=UP * 0.15) for s in stems_total], lag_ratio=0.12))`
  },
  scene4: {
    id: 'scene4',
    className: 'Scene04StabilityZPlane',
    title: 'Escena 4: Estabilidad en el Plano Z y Criterio de Jury',
    subtitle: 'Relación entre la Ubicación de Polos en |z| = 1 y la Naturaleza de la Respuesta Temporal',
    videoSrc: 'assets/videos/scene_04_stability_zplane.mp4',
    posterSrc: 'assets/images/poster_scene_04.png',
    description:
      'Sincroniza el plano complejo Z (con el Círculo Unitario |z| = 1 resaltado en amarillo institucional) y la respuesta temporal discreta p^k. Muestra tres regímenes fundamentales: polos complejos conjugados subamortiguados dentro del círculo, polo real negativo alternante a frecuencia de Nyquist, y cruce inestable fuera del círculo unitario.',
    equationLatex: '$$\\text{Estabilidad BIBO} \\iff |p_i| < 1 \\quad \\forall i \\in \\{1,\\dots,n\\}$$',
    markers: [
      { time: 0.2, label: '1. Círculo Unitario |z| = 1' },
      { time: 1.2, label: '2. Polos Complejos Estables (|p|=0.78)' },
      { time: 3.2, label: '3. Polo Real Negativo Alternante (p=-0.75)' },
      { time: 5.2, label: '4. Polos Inestables Fuera de |z|=1 (|p|=1.08)' }
    ],
    pythonSnippet: `class Scene04StabilityZPlane(Scene):
    def construct(self):
        unit_disk = Circle(
            radius=radius, stroke_color="#FFDF2D", stroke_width=3,
            fill_color="#3B9C6D", fill_opacity=0.16
        )
        # Evaluación dinámica de modos p^k según ubicación en el plano Z
        regimes = [
            ("1. Complejos Estables: |p| = 0.78 < 1", ...),
            ("2. Real Negativo Estable: p = -0.75", ...),
            ("3. Inestable (Fuera de |z|=1): |p| = 1.08 > 1", ...),
        ]`
  }
};

let currentManimSceneKey = 'scene1';

function selectManimScene(sceneKey) {
  const data = MANIM_SCENES_DATA[sceneKey];
  if (!data) return;
  currentManimSceneKey = sceneKey;

  // Actualizar estado activo de botones selectores
  document.querySelectorAll('.manim-tab-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-scene') === sceneKey;
    if (isTarget) {
      btn.classList.add('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
      btn.classList.remove('bg-space-850', 'text-iub-blanco', 'font-semibold');
    } else {
      btn.classList.remove('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
      btn.classList.add('bg-space-850', 'text-iub-blanco', 'font-semibold');
    }
  });

  // Actualizar video y metadatos
  const videoEl = document.getElementById('manimVideoElement');
  const titleEl = document.getElementById('manimSceneTitle');
  const subEl = document.getElementById('manimSceneSubtitle');
  const descEl = document.getElementById('manimSceneDescription');
  const eqEl = document.getElementById('manimSceneEquation');
  const codeEl = document.getElementById('manimPythonCode');
  const markersContainer = document.getElementById('manimMarkersContainer');
  const classBadge = document.getElementById('manimClassBadge');

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (descEl) descEl.textContent = data.description;
  if (classBadge) classBadge.textContent = `scenes/manim/manim_scenes.py :: ${data.className}`;
  if (codeEl) codeEl.textContent = data.pythonSnippet;

  if (eqEl) {
    eqEl.innerHTML = data.equationLatex;
    if (window.renderMathInElement) {
      window.renderMathInElement(eqEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ]
      });
    }
  }

  if (markersContainer) {
    markersContainer.innerHTML = data.markers
      .map(
        m => `
        <button onclick="seekManimVideo(${m.time})"
                class="px-3 py-1.5 rounded-lg bg-space-850 hover:bg-iub-azulClaro hover:text-iub-oscuro border border-iub-azulClaro/40 text-xs font-semibold text-iub-blanco transition flex items-center gap-1.5">
          <span class="font-mono text-iub-amarillo">[${m.time.toFixed(1)}s]</span>
          <span>${m.label}</span>
        </button>`
      )
      .join('');
  }

  if (videoEl) {
    const currentSpeed = videoEl.playbackRate || 1.0;
    videoEl.poster = data.posterSrc;
    videoEl.src = data.videoSrc;
    videoEl.load();
    videoEl.playbackRate = currentSpeed;
    videoEl.play().catch(() => {});
  }

  if (window.IUBApp && typeof window.IUBApp.markMilestone === 'function') {
    window.IUBApp.markMilestone(`manim_${sceneKey}`);
  }
}

function seekManimVideo(seconds) {
  const videoEl = document.getElementById('manimVideoElement');
  if (!videoEl) return;
  videoEl.currentTime = seconds;
  videoEl.play().catch(() => {});
}

function setManimPlaybackRate(rate) {
  const videoEl = document.getElementById('manimVideoElement');
  if (videoEl) {
    videoEl.playbackRate = rate;
  }
  document.querySelectorAll('.manim-speed-btn').forEach(btn => {
    const btnRate = parseFloat(btn.getAttribute('data-rate'));
    if (Math.abs(btnRate - rate) < 0.01) {
      btn.classList.add('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
      btn.classList.remove('bg-space-800', 'text-slate-200');
    } else {
      btn.classList.remove('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
      btn.classList.add('bg-space-800', 'text-slate-200');
    }
  });
}

window.selectManimScene = selectManimScene;
window.seekManimVideo = seekManimVideo;
window.setManimPlaybackRate = setManimPlaybackRate;
