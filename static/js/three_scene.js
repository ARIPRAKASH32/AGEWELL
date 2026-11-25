// AGEWELL Senior Independence Portal - Dynamic Morphing 3D Care Sphere & Holographic Effects
// Features:
// 1. Hero: Real-time Vertex-Morphing Liquid Emerald Sphere + Orbiting Satellites + Click Shockwave
// 2. Wellness/Login Orb: Faceted Emerald Diamond + Counter-Rotating Wireframe Cage + Dual Halos
// 3. SOS Beacon: 3D Rotating Crimson Medical Cross + Strobe Wireframe + Triple Shockwave Rings

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 8.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));

  const keyLight = new THREE.DirectionalLight(0x8be034, 3.4);
  keyLight.position.set(6, 7, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xa9ee62, 3.2, 30);
  fillLight.position.set(-6, -4, 5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.5, 25);
  rimLight.position.set(0, 6, -5);
  scene.add(rimLight);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Real-time Vertex-Morphing Liquid Emerald Sphere
  const morphGeo = new THREE.IcosahedronGeometry(1.75, 4);
  const basePositions = Float32Array.from(morphGeo.attributes.position.array);

  const morphMat = new THREE.MeshPhysicalMaterial({
    color: 0x143e31,
    emissive: 0x0d2c22,
    emissiveIntensity: 0.55,
    roughness: 0.12,
    metalness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transparent: true,
    opacity: 0.88,
    wireframe: false
  });
  const morphSphere = new THREE.Mesh(morphGeo, morphMat);
  masterGroup.add(morphSphere);

  // Wireframe Overlay for holographic depth
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x8be034,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const wireOverlay = new THREE.Mesh(morphGeo, wireMat);
  wireOverlay.scale.set(1.015, 1.015, 1.015);
  masterGroup.add(wireOverlay);

  // Inner Glowing Sprout-Lime Core
  const innerCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0x8be034 })
  );
  masterGroup.add(innerCore);

  // 2. Orbiting Care Satellites on Tilted Gyroscopic Rings
  const satellites = [];
  const satConfigs = [
    { radius: 2.75, speed: 0.9, tiltX: 0.5, tiltZ: 0.2, color: 0x8be034 },
    { radius: 3.15, speed: -0.7, tiltX: -0.6, tiltZ: 0.5, color: 0xa9ee62 },
    { radius: 3.45, speed: 0.55, tiltX: 0.2, tiltZ: -0.7, color: 0xffffff }
  ];

  satConfigs.forEach((cfg) => {
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = cfg.tiltX;
    orbitGroup.rotation.z = cfg.tiltZ;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.radius, 0.015, 12, 64),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.PI / 2;
    orbitGroup.add(ring);

    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 16, 16),
      new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.6,
        roughness: 0.15,
        metalness: 0.4
      })
    );
    orbitGroup.add(sat);
    masterGroup.add(orbitGroup);
    satellites.push({ sat, radius: cfg.radius, speed: cfg.speed });
  });

  // 3. Interactive Click Shockwave Ring
  const burstMat = new THREE.MeshBasicMaterial({
    color: 0x8be034,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0
  });
  const burstRing = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.3, 48), burstMat);
  masterGroup.add(burstRing);

  let mouseX = 0;
  let mouseY = 0;
  let burstActive = false;
  let burstScale = 1;
  let morphBoost = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  container.addEventListener('click', () => {
    burstActive = true;
    burstScale = 1;
    burstMat.opacity = 0.9;
    morphBoost = 0.28;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    morphBoost *= 0.93;
    const amp = 0.12 + morphBoost;

    // Vertex morphing wave
    const pos = morphGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const wave = Math.sin(bx * 2.2 + t * 2.4) * Math.cos(by * 2.2 + t * 1.9) * Math.sin(bz * 2.2 + t * 2.1);
      const scale = 1 + wave * amp;
      pos.setXYZ(i, bx * scale, by * scale, bz * scale);
    }
    pos.needsUpdate = true;
    morphGeo.computeVertexNormals();

    morphSphere.rotation.y += 0.006;
    wireOverlay.rotation.y += 0.006;

    const corePulse = 1 + Math.sin(t * 2.6) * 0.08;
    innerCore.scale.set(corePulse, corePulse, corePulse);

    satellites.forEach((s) => {
      const a = t * s.speed;
      s.sat.position.set(Math.cos(a) * s.radius, 0, Math.sin(a) * s.radius);
    });

    masterGroup.rotation.y += (mouseX * 0.45 - masterGroup.rotation.y) * 0.06;
    masterGroup.rotation.x += (mouseY * 0.35 - masterGroup.rotation.x) * 0.06;

    if (burstActive) {
      burstScale += 0.15;
      burstRing.scale.set(burstScale, burstScale, 1);
      burstMat.opacity -= 0.03;
      if (burstMat.opacity <= 0) {
        burstActive = false;
        burstMat.opacity = 0;
      }
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!container.clientWidth || !container.clientHeight) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Senior Dashboard & Login Panel: Faceted Emerald Diamond + Counter-Rotating Wireframe Cage
function initWellnessOrb(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5.0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.PointLight(0x8be034, 3.8, 20);
  light.position.set(3, 4, 4);
  scene.add(light);

  const diamond = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.15, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x7bce29,
      emissive: 0x143e31,
      emissiveIntensity: 0.5,
      roughness: 0.12,
      metalness: 0.35,
      clearcoat: 1.0
    })
  );
  scene.add(diamond);

  const cage = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.55, 0),
    new THREE.MeshBasicMaterial({ color: 0xa9ee62, wireframe: true, transparent: true, opacity: 0.45 })
  );
  scene.add(cage);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.9, 0.02, 12, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
  );
  halo.rotation.x = Math.PI / 2.4;
  scene.add(halo);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    diamond.rotation.y += 0.018;
    diamond.rotation.x = Math.sin(t * 1.2) * 0.25;
    cage.rotation.y -= 0.012;
    cage.rotation.z += 0.008;
    halo.rotation.z += 0.015;

    const pulse = 1 + Math.pow(Math.sin(t * 2.2), 4) * 0.08;
    diamond.scale.set(pulse, pulse, pulse);

    renderer.render(scene, camera);
  }
  animate();
}

// SOS Emergency Screen: 3D Rotating Crimson Medical Cross + Triple Shockwave Rings
function initSOSBeacon(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2.0, 5.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const redLight = new THREE.PointLight(0xff2a2a, 5, 25);
  redLight.position.set(0, 2, 2);
  scene.add(redLight);

  // 3D Crimson Medical Cross
  const crossGroup = new THREE.Group();
  const crossMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xdc2626,
    emissiveIntensity: 0.9,
    roughness: 0.15,
    metalness: 0.3
  });
  const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.45, 0.45), crossMat);
  const hBar = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.45, 0.45), crossMat);
  crossGroup.add(vBar, hBar);
  crossGroup.position.y = 0.35;
  scene.add(crossGroup);

  const shieldSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.25, 1),
    new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.25 })
  );
  shieldSphere.position.y = 0.35;
  scene.add(shieldSphere);

  // Triple Staggered Shockwave Rings
  const waves = [];
  for (let i = 0; i < 3; i++) {
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const wave = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.05, 48), waveMat);
    wave.rotation.x = Math.PI / 2;
    wave.position.y = -0.45;
    wave.userData = { phase: i * (Math.PI * 2 / 3) };
    scene.add(wave);
    waves.push(wave);
  }

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    crossGroup.rotation.y += 0.035;
    shieldSphere.rotation.y -= 0.015;
    const s = 1 + Math.sin(t * 6) * 0.1;
    crossGroup.scale.set(s, s, s);
    redLight.intensity = 3.5 + Math.sin(t * 8) * 2.0;

    waves.forEach((w) => {
      const progress = ((t * 0.9 + w.userData.phase / (Math.PI * 2)) % 1);
      const scale = 1 + progress * 2.4;
      w.scale.set(scale, scale, 1);
      w.material.opacity = (1 - progress) * 0.85;
    });

    renderer.render(scene, camera);
  }
  animate();
}
