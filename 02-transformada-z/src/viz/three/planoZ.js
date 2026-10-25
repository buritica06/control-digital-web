/**
 * Escena 3D interactiva del Plano Z (Three.js WebGL).
 * Representa el círculo unitario, ejes complejo Re/Im, polos, ceros y estabilidad.
 * Interfaz obligatoria: { mount, update, resize, dispose, renderer }
 */

import { IUB_COLORS, isWebGLAvailable, disposeHierarchy, setupResizeObserver, setupVisibilityObserver } from './three-utils.js';
import { calcularPolosSegundoOrden } from '../../math/discrete.js';

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
  let unitCircleLine = null;
  let polesGroup = null;
  let zerosGroup = null;
  let stabilityDisk = null;

  // Parámetros actuales
  const params = {
    a1: options.a1 ?? -1.425,
    a2: options.a2 ?? 0.496,
    b0: options.b0 ?? 1.0,
    b1: options.b1 ?? 0.03,
  };

  function mount() {
    if (!isWebGLAvailable()) {
      container.innerHTML = `
        <div class="webgl-fallback">
          <p class="font-bold text-iub-naranja">⚠️ Tu navegador o entorno no tiene aceleración WebGL disponible.</p>
          <p class="text-sm mt-2 text-slate-300">Mostrando representación esquemática del Plano Z.</p>
          <div class="mt-4 p-4 rounded bg-space-850 text-xs font-mono text-iub-amarillo">
            Círculo Unitario |z|=1 | Polos en z₁=0.8187, z₂=0.6065 (Estable)
          </div>
        </div>
      `;
      return;
    }

    const THREE = window.THREE;
    if (!THREE) {
      console.error('Three.js no está cargado globalmente');
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Escena y Cámara
    scene = new THREE.Scene();
    scene.background = new THREE.Color(IUB_COLORS.oscuro);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, -3.2, 3.5);
    camera.up.set(0, 0, 1);

    // 2. Renderer profesional
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. OrbitControls
    if (window.THREE.OrbitControls) {
      controls = new window.THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 12;
      controls.minDistance = 1.2;
    }

    // 4. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 10);
    scene.add(dirLight);

    // 5. Grid y Ejes Cartesianos
    buildGridAndAxes(THREE);

    // 6. Círculo Unitario |z| = 1
    buildUnitCircle(THREE);

    // 7. Grupos de Polos y Ceros
    polesGroup = new THREE.Group();
    zerosGroup = new THREE.Group();
    scene.add(polesGroup);
    scene.add(zerosGroup);

    // 8. Calcular geometría inicial
    update(params);

    // 9. Observadores
    resizeObserver = setupResizeObserver(container, (w, h) => resize(w, h));
    visibilityObserver = setupVisibilityObserver(container, (vis) => {
      isVisible = vis;
    });

    // 10. Loop de render
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (controls) controls.update();

      // Animación suave de los polos (resaltado)
      polesGroup.children.forEach((poleMesh) => {
        if (poleMesh.userData.isUnstable) {
          const s = 1.0 + Math.sin(elapsed * 6) * 0.2;
          poleMesh.scale.set(s, s, s);
        } else {
          poleMesh.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);

      if (prefersReducedMotion) {
        cancelAnimationFrame(animId);
      }
    }

    animate();
  }

  function buildGridAndAxes(THREE) {
    // Grid sutil
    const gridHelper = new THREE.GridHelper(6, 12, IUB_COLORS.amarillo, IUB_COLORS.grid);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -0.01;
    scene.add(gridHelper);

    // Disco interior de estabilidad (|z| < 1)
    const diskGeom = new THREE.CircleGeometry(1.0, 64);
    const diskMat = new THREE.MeshBasicMaterial({
      color: IUB_COLORS.verde,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    stabilityDisk = new THREE.Mesh(diskGeom, diskMat);
    stabilityDisk.position.z = -0.005;
    scene.add(stabilityDisk);

    // Eje Real (X) y Eje Imaginario (Y)
    const axesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const axesGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3, 0, 0),
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 3, 0),
    ]);
    const axesLines = new THREE.LineSegments(axesGeom, axesMaterial);
    scene.add(axesLines);
  }

  function buildUnitCircle(THREE) {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0.005));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: IUB_COLORS.amarillo, linewidth: 2 });
    unitCircleLine = new THREE.Line(geom, mat);
    scene.add(unitCircleLine);
  }

  function createPoleMesh(THREE, isUnstable = false) {
    const group = new THREE.Group();
    const color = isUnstable ? IUB_COLORS.coral : IUB_COLORS.coral;
    const mat = new THREE.LineBasicMaterial({ color, linewidth: 3 });

    const size = 0.08;
    const p1 = [new THREE.Vector3(-size, -size, 0.01), new THREE.Vector3(size, size, 0.01)];
    const p2 = [new THREE.Vector3(-size, size, 0.01), new THREE.Vector3(size, -size, 0.01)];

    const g1 = new THREE.BufferGeometry().setFromPoints(p1);
    const g2 = new THREE.BufferGeometry().setFromPoints(p2);

    group.add(new THREE.Line(g1, mat));
    group.add(new THREE.Line(g2, mat));

    // Añadir esferita central
    const sphereGeom = new THREE.SphereGeometry(0.03, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({ color });
    group.add(new THREE.Mesh(sphereGeom, sphereMat));

    group.userData.isUnstable = isUnstable;
    return group;
  }

  function createZeroMesh(THREE) {
    const geom = new THREE.RingGeometry(0.05, 0.075, 24);
    const mat = new THREE.MeshBasicMaterial({ color: IUB_COLORS.azulClaro, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = 0.01;
    return mesh;
  }

  function update(newParams = {}) {
    Object.assign(params, newParams);
    if (!scene) return;

    const THREE = window.THREE;

    // 1. Limpiar polos anteriores
    while (polesGroup.children.length > 0) {
      const child = polesGroup.children[0];
      polesGroup.remove(child);
      disposeHierarchy(child);
    }

    // 2. Limpiar ceros anteriores
    while (zerosGroup.children.length > 0) {
      const child = zerosGroup.children[0];
      zerosGroup.remove(child);
      disposeHierarchy(child);
    }

    // 3. Recalcular polos con discrete.js
    const rootData = calcularPolosSegundoOrden(params.a1, params.a2);

    rootData.polos.forEach((p) => {
      const isUnstable = p.mag >= 1.0;
      const pole = createPoleMesh(THREE, isUnstable);
      pole.position.set(p.re, p.im, 0);
      polesGroup.add(pole);
    });

    // 4. Cero en z0 = -b1/b0
    if (params.b0 !== 0) {
      const z0 = -params.b1 / params.b0;
      const zeroMesh = createZeroMesh(THREE);
      zeroMesh.position.set(z0, 0, 0);
      zerosGroup.add(zeroMesh);
    }

    // 5. Ajustar color de estabilidad en el disco
    if (stabilityDisk) {
      stabilityDisk.material.color.setHex(rootData.esEstable ? IUB_COLORS.verde : IUB_COLORS.coral);
    }

    // Notificar al estado de UI
    const statusEl = document.getElementById('zplane-status');
    if (statusEl) {
      statusEl.innerHTML = `
        <span class="font-bold ${rootData.esEstable ? 'text-iub-verde' : 'text-iub-naranja'}">
          ${rootData.esEstable ? '● Sistema Estable (|p| < 1)' : '▲ Sistema Inestable (|p| ≥ 1)'}
        </span>
        <span class="text-slate-400 font-mono text-xs block mt-1">
          Polos: ${rootData.polos.map(p => `${p.re.toFixed(3)} ${p.im >= 0 ? '+' : ''}${p.im !== 0 ? p.im.toFixed(3) + 'j' : ''} (|p|=${p.mag.toFixed(3)})`).join(', ')}
        </span>
      `;
    }
  }

  function resize(width, height) {
    if (!renderer || !camera) return;
    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
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
