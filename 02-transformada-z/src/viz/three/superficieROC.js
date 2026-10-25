/**
 * Escena 3D de la Superficie de Magnitud |X(z)| y Región de Convergencia (ROC).
 * Muestra el relieve de la función en el plano complejo y el cilindro translúcido de la ROC.
 * Interfaz obligatoria: { mount, update, resize, dispose, renderer }
 */

import { IUB_COLORS, isWebGLAvailable, disposeHierarchy, setupResizeObserver, setupVisibilityObserver } from './three-utils.js';

export function createScene(container, options = {}) {
  let renderer = null;
  let scene = null;
  let camera = null;
  let controls = null;
  let animId = null;
  let isVisible = true;
  let resizeObserver = null;
  let visibilityObserver = null;

  // Objetos gráficos reactivos
  let surfaceMesh = null;
  let rocCylinder = null;
  let unitCircle3D = null;

  const state = {
    tipo: options.tipo ?? 'exponencial', // 'exponencial', 'escalon', 'servo'
    a: options.a ?? 0.8187,
    a2: options.a2 ?? 0.6065,
  };

  function mount() {
    if (!isWebGLAvailable()) {
      container.innerHTML = `
        <div class="webgl-fallback">
          <p class="font-bold text-iub-naranja">⚠️ WebGL no disponible.</p>
          <p class="text-sm mt-1">Superficie |X(z)| y cilindro de convergencia.</p>
        </div>
      `;
      return;
    }

    const THREE = window.THREE;
    if (!THREE) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(IUB_COLORS.oscuro);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, -3.2, 2.8);
    camera.up.set(0, 0, 1);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    if (window.THREE.OrbitControls) {
      controls = new window.THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 14;
      controls.minDistance = 1.5;
    }

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(4, 5, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00ade7, 0.4);
    dirLight2.position.set(-4, -5, -2);
    scene.add(dirLight2);

    // Ejes y base
    buildBaseAndAxes(THREE);

    // Superficie y ROC inicial
    buildSurface(THREE);
    buildROC(THREE);

    resizeObserver = setupResizeObserver(container, (w, h) => resize(w, h));
    visibilityObserver = setupVisibilityObserver(container, (vis) => {
      isVisible = vis;
    });

    const clock = new THREE.Clock();
    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  function buildBaseAndAxes(THREE) {
    const gridHelper = new THREE.GridHelper(5, 10, IUB_COLORS.amarillo, IUB_COLORS.grid);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -0.01;
    scene.add(gridHelper);

    // Círculo unitario |z| = 1 resaltado
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const th = (i / 100) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(th), Math.sin(th), 0.01));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: IUB_COLORS.amarillo, linewidth: 2 });
    unitCircle3D = new THREE.Line(geom, mat);
    scene.add(unitCircle3D);
  }

  function evaluateMagnitude(x, y) {
    // Variable compleja z = x + j*y
    const r2 = x * x + y * y;
    const r = Math.sqrt(r2);
    const eps = 0.08;

    if (state.tipo === 'escalon') {
      // X(z) = z / (z - 1) -> polo en (1, 0)
      const dx = x - 1.0;
      const dy = y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const mag = r / Math.max(d, eps);
      return Math.min(mag, 2.5);
    } else if (state.tipo === 'servo') {
      // E(z) = z*(z + 0.03) / ((z - a1)*(z - a2))
      const d1 = Math.sqrt((x - state.a) ** 2 + y ** 2);
      const d2 = Math.sqrt((x - state.a2) ** 2 + y ** 2);
      const num = r * Math.sqrt((x + 0.03) ** 2 + y ** 2);
      const den = Math.max(d1 * d2, eps * eps);
      return Math.min(num / den, 2.5);
    } else {
      // Exponencial: X(z) = z / (z - a) -> polo en (a, 0)
      const dx = x - state.a;
      const dy = y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const mag = r / Math.max(d, eps);
      return Math.min(mag, 2.5);
    }
  }

  function buildSurface(THREE) {
    if (surfaceMesh) {
      scene.remove(surfaceMesh);
      disposeHierarchy(surfaceMesh);
    }

    const size = 3.6;
    const gridRes = 90;
    const geom = new THREE.PlaneGeometry(size, size, gridRes, gridRes);
    const pos = geom.attributes.position;
    const colors = [];

    const colorLow = new THREE.Color(0x121023);
    const colorMid = new THREE.Color(0x00ade7);
    const colorHigh = new THREE.Color(0xffdf2d);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const zMag = evaluateMagnitude(x, y);
      pos.setZ(i, zMag * 0.7);

      // Coloreado perceptualmente accesible
      const t = Math.min(zMag / 2.5, 1.0);
      const c = new THREE.Color();
      if (t < 0.5) {
        c.lerpColors(colorLow, colorMid, t * 2);
      } else {
        c.lerpColors(colorMid, colorHigh, (t - 0.5) * 2);
      }
      colors.push(c.r, c.g, c.b);
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.1,
      wireframe: false,
    });

    surfaceMesh = new THREE.Mesh(geom, mat);
    scene.add(surfaceMesh);
  }

  function buildROC(THREE) {
    if (rocCylinder) {
      scene.remove(rocCylinder);
      disposeHierarchy(rocCylinder);
    }

    let radius = Math.abs(state.a);
    if (state.tipo === 'escalon') radius = 1.0;
    if (state.tipo === 'servo') radius = Math.max(state.a, state.a2);

    // Cilindro translúcido delimitador de la ROC
    const height = 2.2;
    const geom = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
    geom.rotateX(Math.PI / 2);
    geom.translate(0, 0, height / 2);

    const mat = new THREE.MeshBasicMaterial({
      color: IUB_COLORS.verde,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    rocCylinder = new THREE.Mesh(geom, mat);
    scene.add(rocCylinder);
  }

  function update(newParams = {}) {
    Object.assign(state, newParams);
    if (!scene) return;
    const THREE = window.THREE;
    buildSurface(THREE);
    buildROC(THREE);

    const rocLabel = document.getElementById('roc-indicator-val');
    if (rocLabel) {
      let rVal = Math.abs(state.a);
      if (state.tipo === 'escalon') rVal = 1.0;
      if (state.tipo === 'servo') rVal = Math.max(state.a, state.a2);
      rocLabel.textContent = `|z| > ${rVal.toFixed(3)}`;
    }
  }

  function resize(w, h) {
    if (!renderer || !camera) return;
    const width = w || container.clientWidth;
    const height = h || container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function dispose() {
    if (animId) cancelAnimationFrame(animId);
    if (resizeObserver) resizeObserver.disconnect();
    if (visibilityObserver) visibilityObserver.disconnect();
    if (controls) controls.dispose();
    if (scene) disposeHierarchy(scene);
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    renderer = null;
    scene = null;
    camera = null;
    controls = null;
  }

  return {
    mount,
    update,
    resize,
    dispose,
    get renderer() {
      return renderer;
    },
  };
}
