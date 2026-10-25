/**
 * Motor WebGL 3D Educativo (Three.js + OrbitControls) — 4 Escenas Interactivas
 * Asignatura: MEC36 - Control II | Semana 04: Ecuaciones en Diferencias
 * Institución Universitaria de Barranquilla (IUB)
 */

(function () {
  let scene, camera, renderer, controls;
  let rootGroup;
  let currentMode3D = 'surface';
  let animTime = 0;
  let isAnimating = true;

  let currentSimParams = {
    a1: -1.3,
    a2: 0.4,
    b0: 1.0,
    b1: 0.0,
    ym1: 2.0,
    ym2: 1.0,
    uAmp: 1.0,
    activeK: 3
  };

  let servoArmGroup = null;
  let activeSampleBeacon = null;

  const COLORS_HEX = {
    oscuro: 0x121023,
    amarillo: 0xffdf2d,
    azul: 0x00ade7,
    naranja: 0xe39037,
    verde: 0x3b9c6d,
    blanco: 0xffffff,
    coral: 0xf87171,
    grid: 0x2f2a54
  };

  function initViewer3D(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS_HEX.oscuro);
    scene.fog = new THREE.FogExp2(COLORS_HEX.oscuro, 0.025);

    const w = container.clientWidth || 800;
    const h = container.clientHeight || 500;

    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
    camera.position.set(6.8, 5.4, 7.6);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.maxDistance = 28;
      controls.minDistance = 2.5;
      controls.target.set(0, 0.8, 0);
    }

    // Iluminación académica de alto contraste
    const ambient = new THREE.AmbientLight(0xffffff, 0.68);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(10, 16, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(COLORS_HEX.azul, 0.7, 30);
    dirLight2.position.set(-8, 8, -6);
    scene.add(dirLight2);

    rootGroup = new THREE.Group();
    scene.add(rootGroup);

    buildSceneForMode();

    // Escalado adaptativo sin deformación
    const ro = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw > 0 && nh > 0) {
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }
    });
    ro.observe(container);

    animateLoop();
  }

  function clearRootGroup() {
    if (!rootGroup) return;
    while (rootGroup.children.length > 0) {
      const obj = rootGroup.children[0];
      rootGroup.remove(obj);
    }
    servoArmGroup = null;
    activeSampleBeacon = null;
  }

  function buildBaseGrid() {
    const grid = new THREE.GridHelper(12, 24, COLORS_HEX.amarillo, COLORS_HEX.grid);
    grid.position.y = 0;
    rootGroup.add(grid);
  }

  /**
   * ESCENA 1: Paisaje 3D de |Y(z)|, Círculo Unitario |z|=1 y Polos Característicos
   */
  function buildSurfaceScene(simData) {
    buildBaseGrid();

    const { a1, a2, ym1, ym2, uAmp } = currentSimParams;
    const { poles, jury } = simData;

    // Círculo unitario |z| = 1 en el plano XZ
    const ucGeo = new THREE.RingGeometry(1.96, 2.04, 96);
    ucGeo.rotateX(-Math.PI / 2);
    const ucMat = new THREE.MeshBasicMaterial({ color: COLORS_HEX.amarillo, side: THREE.DoubleSide });
    const ucMesh = new THREE.Mesh(ucGeo, ucMat);
    ucMesh.position.y = 0.03;
    rootGroup.add(ucMesh);

    // Disco interior de estabilidad |z| < 1
    const diskGeo = new THREE.CircleGeometry(1.96, 64);
    diskGeo.rotateX(-Math.PI / 2);
    const diskMat = new THREE.MeshBasicMaterial({
      color: jury.isStable ? COLORS_HEX.verde : COLORS_HEX.coral,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide
    });
    const diskMesh = new THREE.Mesh(diskGeo, diskMat);
    diskMesh.position.y = 0.015;
    rootGroup.add(diskMesh);

    // Malla 3D de magnitud |Y(z)| (escala: 1 unidad del plano Z = 2 unidades en escena)
    const segs = 56;
    const size = 6.0;
    const surfGeo = new THREE.PlaneGeometry(size, size, segs, segs);
    surfGeo.rotateX(-Math.PI / 2);

    const posAttr = surfGeo.attributes.position;
    const colors = [];
    const cDark = new THREE.Color(COLORS_HEX.oscuro);
    const cCyan = new THREE.Color(COLORS_HEX.azul);
    const cYellow = new THREE.Color(COLORS_HEX.amarillo);
    const cOrange = new THREE.Color(COLORS_HEX.naranja);

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const zr = vx / 2.0;
      const zi = -vz / 2.0;

      // Evaluar |1 / (z^2 + a1*z + a2)|
      let dMin = 1.0;
      poles.forEach(p => {
        const d = Math.hypot(zr - p.re, zi - p.im);
        dMin *= Math.max(0.14, d);
      });
      const mag = Math.min(3.6, 0.55 / dMin);
      posAttr.setY(i, mag);

      const t = Math.min(1, mag / 3.4);
      const col = new THREE.Color();
      if (t < 0.45) {
        col.lerpColors(cDark, cCyan, t / 0.45);
      } else if (t < 0.8) {
        col.lerpColors(cCyan, cYellow, (t - 0.45) / 0.35);
      } else {
        col.lerpColors(cYellow, cOrange, (t - 0.8) / 0.2);
      }
      colors.push(col.r, col.g, col.b);
    }

    surfGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    surfGeo.computeVertexNormals();

    const surfMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.15
    });
    const surfMesh = new THREE.Mesh(surfGeo, surfMat);
    rootGroup.add(surfMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: COLORS_HEX.azul,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    rootGroup.add(new THREE.Mesh(surfGeo, wireMat));

    // Pilares luminosos en la posición de los polos p1, p2
    poles.forEach(p => {
      const px = p.re * 2.0;
      const pz = -p.im * 2.0;
      const isInside = Math.hypot(p.re, p.im) < 1.0;
      const pCol = isInside ? COLORS_HEX.verde : COLORS_HEX.coral;

      const pillarGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.7, 20);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: pCol,
        emissive: pCol,
        emissiveIntensity: 0.5
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 1.85, pz);
      rootGroup.add(pillar);

      const sphereGeo = new THREE.SphereGeometry(0.18, 24, 24);
      const sphere = new THREE.Mesh(sphereGeo, pillarMat);
      sphere.position.set(px, 3.75, pz);
      rootGroup.add(sphere);
    });
  }

  /**
   * ESCENA 2: Cascada 3D de Memoria Recursiva y Evolución de Secuencias (Total, Libre, Forzada)
   */
  function buildMemoryCascadeScene(simData) {
    buildBaseGrid();
    const { kArr, yTotal, yLibre, yForzada } = simData;
    const maxN = Math.min(14, kArr.length);
    const maxAbs = Math.max(1.0, ...yTotal.slice(0, maxN).map(v => Math.abs(v)));
    const scaleY = 3.2 / maxAbs;

    // Tres carriles en Z: Z = -1.8 (Respuesta Libre), Z = 0 (Respuesta Total), Z = +1.8 (Respuesta Forzada)
    const lanes = [
      { z: -1.8, arr: yLibre, color: COLORS_HEX.naranja },
      { z: 0.0, arr: yTotal, color: COLORS_HEX.amarillo },
      { z: 1.8, arr: yForzada, color: COLORS_HEX.azul }
    ];

    lanes.forEach(lane => {
      const pts = [];
      for (let k = 0; k < maxN; k++) {
        const xPos = -4.5 + k * 0.72;
        const val = lane.arr[k] * scaleY;
        const h = Math.max(0.06, Math.abs(val));

        const stemGeo = new THREE.CylinderGeometry(0.06, 0.06, h, 14);
        const stemMat = new THREE.MeshStandardMaterial({
          color: lane.color,
          emissive: lane.color,
          emissiveIntensity: k === currentSimParams.activeK ? 0.65 : 0.2
        });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.set(xPos, val / 2, lane.z);
        rootGroup.add(stem);

        const tipGeo = new THREE.SphereGeometry(k === currentSimParams.activeK ? 0.16 : 0.11, 18, 18);
        const tip = new THREE.Mesh(tipGeo, stemMat);
        tip.position.set(xPos, val, lane.z);
        rootGroup.add(tip);

        pts.push(new THREE.Vector3(xPos, val, lane.z));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const lineMat = new THREE.LineBasicMaterial({ color: lane.color });
      rootGroup.add(new THREE.Line(lineGeo, lineMat));
    });

    // Anillo marcador de la muestra activa k
    const actK = Math.min(maxN - 1, Math.max(0, currentSimParams.activeK));
    const actX = -4.5 + actK * 0.72;
    const actY = yTotal[actK] * scaleY;

    const ringGeo = new THREE.TorusGeometry(0.32, 0.045, 16, 40);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: COLORS_HEX.verde });
    activeSampleBeacon = new THREE.Mesh(ringGeo, ringMat);
    activeSampleBeacon.position.set(actX, actY, 0);
    rootGroup.add(activeSampleBeacon);
  }

  /**
   * ESCENA 3: Gemelo Digital 3D de Servomecanismo / Actuador Mecatrónico Discreto
   */
  function buildServoScene(simData) {
    buildBaseGrid();
    const { yTotal, ySS } = simData;

    // Base cilíndrica del servomotor mecatrónico
    const baseGeo = new THREE.CylinderGeometry(1.35, 1.55, 0.8, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x221e3f, metalness: 0.5, roughness: 0.35 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, 0.4, 0);
    rootGroup.add(baseMesh);

    // Anillo graduado de posición objetivo
    const dialGeo = new THREE.RingGeometry(1.75, 1.9, 64);
    dialGeo.rotateX(-Math.PI / 2);
    const dialMat = new THREE.MeshBasicMaterial({ color: COLORS_HEX.azul, side: THREE.DoubleSide });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.set(0, 0.82, 0);
    rootGroup.add(dialMesh);

    // Grupo móvil del brazo/rotor controlado por y[k]
    servoArmGroup = new THREE.Group();
    servoArmGroup.position.set(0, 0.85, 0);

    const hubGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.5, 24);
    const hubMat = new THREE.MeshStandardMaterial({
      color: COLORS_HEX.amarillo,
      metalness: 0.4,
      roughness: 0.25
    });
    servoArmGroup.add(new THREE.Mesh(hubGeo, hubMat));

    const armGeo = new THREE.BoxGeometry(2.6, 0.22, 0.36);
    const armMat = new THREE.MeshStandardMaterial({
      color: COLORS_HEX.azul,
      emissive: COLORS_HEX.azul,
      emissiveIntensity: 0.22
    });
    const armMesh = new THREE.Mesh(armGeo, armMat);
    armMesh.position.set(1.15, 0.12, 0);
    servoArmGroup.add(armMesh);

    const tipGeo = new THREE.SphereGeometry(0.24, 24, 24);
    const tipMat = new THREE.MeshStandardMaterial({
      color: COLORS_HEX.verde,
      emissive: COLORS_HEX.verde,
      emissiveIntensity: 0.45
    });
    const tipMesh = new THREE.Mesh(tipGeo, tipMat);
    tipMesh.position.set(2.4, 0.12, 0);
    servoArmGroup.add(tipMesh);

    const kIdx = Math.min(yTotal.length - 1, Math.max(0, currentSimParams.activeK));
    const normScale = ySS && Math.abs(ySS) > 0.1 ? (Math.PI * 0.75) / ySS : 0.25;
    servoArmGroup.rotation.y = yTotal[kIdx] * normScale;

    rootGroup.add(servoArmGroup);
  }

  /**
   * ESCENA 4: Mapeo Tridimensional Plano S -> Plano Z (z = e^(sT))
   */
  function buildMappingScene(simData) {
    buildBaseGrid();

    // Plano S continuo a la izquierda (x = -3.2)
    const sPlaneGeo = new THREE.PlaneGeometry(3.2, 3.6);
    const sPlaneMat = new THREE.MeshBasicMaterial({
      color: COLORS_HEX.azul,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const sPlane = new THREE.Mesh(sPlaneGeo, sPlaneMat);
    sPlane.position.set(-3.2, 1.8, 0);
    rootGroup.add(sPlane);

    // Frontera eje jw del plano S
    const jwGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 12);
    const jwMat = new THREE.MeshBasicMaterial({ color: COLORS_HEX.amarillo });
    const jwLine = new THREE.Mesh(jwGeo, jwMat);
    jwLine.position.set(-1.6, 1.8, 0);
    rootGroup.add(jwLine);

    // Círculo unitario del plano Z a la derecha (x = +2.6)
    const zDiskGeo = new THREE.RingGeometry(1.55, 1.65, 64);
    const zDiskMat = new THREE.MeshBasicMaterial({ color: COLORS_HEX.amarillo, side: THREE.DoubleSide });
    const zRing = new THREE.Mesh(zDiskGeo, zDiskMat);
    zRing.position.set(2.6, 1.8, 0);
    rootGroup.add(zRing);

    const zFillGeo = new THREE.CircleGeometry(1.55, 64);
    const zFillMat = new THREE.MeshBasicMaterial({
      color: COLORS_HEX.verde,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    });
    const zFill = new THREE.Mesh(zFillGeo, zFillMat);
    zFill.position.set(2.6, 1.8, -0.02);
    rootGroup.add(zFill);

    // Arcos 3D conectando puntos del semiplano izquierdo s con el interior de |z| = 1
    const samplePairs = [
      { sx: -2.8, sy: 2.7, zx: 2.6 + 0.65, zy: 1.8 + 0.65, col: COLORS_HEX.verde },
      { sx: -2.8, sy: 0.9, zx: 2.6 + 0.65, zy: 1.8 - 0.65, col: COLORS_HEX.verde },
      { sx: -1.6, sy: 2.9, zx: 2.6, zy: 1.8 + 1.6, col: COLORS_HEX.amarillo },
      { sx: -3.9, sy: 1.8, zx: 2.6 + 0.25, zy: 1.8, col: COLORS_HEX.azul }
    ];

    samplePairs.forEach(pair => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(pair.sx, pair.sy, 0),
        new THREE.Vector3(-0.2, pair.sy + 0.85, 1.8),
        new THREE.Vector3(pair.zx, pair.zy, 0)
      );
      const pts = curve.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color: pair.col });
      rootGroup.add(new THREE.Line(geo, mat));
    });
  }

  function buildSceneForMode() {
    if (!rootGroup || !window.IUBCharts) return;
    clearRootGroup();
    const simData = window.IUBCharts.computeSecondOrderSystem(currentSimParams);

    if (currentMode3D === 'surface') {
      buildSurfaceScene(simData);
    } else if (currentMode3D === 'memory') {
      buildMemoryCascadeScene(simData);
    } else if (currentMode3D === 'servo') {
      buildServoScene(simData);
    } else {
      buildMappingScene(simData);
    }
  }

  function animateLoop() {
    requestAnimationFrame(animateLoop);
    if (controls) controls.update();

    if (isAnimating) {
      animTime += 0.025;
      if (activeSampleBeacon) {
        activeSampleBeacon.rotation.z = animTime * 1.5;
      }
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function setViewer3DMode(mode) {
    currentMode3D = mode;
    const labels = {
      surface: 'Escena 3D 1: Superficie |Y(z)|, Círculo Unitario |z|=1 y Polos de A(z)',
      memory: 'Escena 3D 2: Cascada 3D de Memoria Recursiva (Total, Libre y Forzada)',
      servo: 'Escena 3D 3: Gemelo Digital 3D de Servomecanismo Mecatrónico y[k]',
      mapping: 'Escena 3D 4: Mapeo Geométrico 3D del Plano S al Plano Z (z = e^{sT})'
    };

    const lblEl = document.getElementById('viewer3dSceneTitle');
    if (lblEl && labels[mode]) lblEl.textContent = labels[mode];

    document.querySelectorAll('.btn-mode-3d').forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
        btn.classList.remove('bg-space-850', 'text-iub-blanco');
      } else {
        btn.classList.remove('bg-iub-amarillo', 'text-iub-oscuro', 'font-black');
        btn.classList.add('bg-space-850', 'text-iub-blanco');
      }
    });

    buildSceneForMode();
  }

  function setCameraPreset(preset) {
    if (!camera || !controls) return;
    if (preset === 'iso') {
      camera.position.set(6.8, 5.4, 7.6);
    } else if (preset === 'top') {
      camera.position.set(0, 11.5, 0.01);
    } else if (preset === 'front') {
      camera.position.set(0, 2.4, 10.5);
    } else if (preset === 'side') {
      camera.position.set(10.5, 2.4, 0);
    }
    controls.target.set(0, 0.8, 0);
    controls.update();
  }

  function updateViewer3DParams(newParams) {
    currentSimParams = { ...currentSimParams, ...newParams };
    buildSceneForMode();
  }

  window.IUBViewer3D = {
    initViewer3D,
    setViewer3DMode,
    setCameraPreset,
    updateViewer3DParams
  };
})();
