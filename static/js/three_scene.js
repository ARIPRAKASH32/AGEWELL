// AGEWELL Senior Independence Portal - Futuristic 3D Immersive WebGL Engine
// Preserves exact brand colors (#081d16, #0d2c22, #143e31, #7bce29, #8be034, #ef4444)

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 8.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Cinematic 3-Point Studio Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  const keyLight = new THREE.DirectionalLight(0x8be034, 3.0);
  keyLight.position.set(6, 7, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xa9ee62, 2.8, 30);
  fillLight.position.set(-6, -4, 5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.2, 25);
  rimLight.position.set(0, 6, -5);
  scene.add(rimLight);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Translucent Glassmorphic Outer Crystal
  const outerGeo = new THREE.IcosahedronGeometry(1.75, 1);
  const outerMat = new THREE.MeshPhysicalMaterial({
    color: 0x143e31,
    emissive: 0x081d16,
    emissiveIntensity: 0.45,
    roughness: 0.1,
    metalness: 0.2,
    transmission: 0.55,
    transparent: true,
    opacity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08
  });
  const outerCrystal = new THREE.Mesh(outerGeo, outerMat);
  masterGroup.add(outerCrystal);

  // Subtle Holographic Wireframe Cage
  const wireCage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.92, 1),
    new THREE.MeshBasicMaterial({ color: 0x8be034, wireframe: true, transparent: true, opacity: 0.22 })
  );
  masterGroup.add(wireCage);

  // Inner Glowing Sprout-Lime Core
  const innerCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.82, 0),
    new THREE.MeshStandardMaterial({
      color: 0x8be034,
      emissive: 0x7bce29,
      emissiveIntensity: 0.75,
      roughness: 0.15,
      metalness: 0.3
    })
  );
  masterGroup.add(innerCore);

  // 2. Triple Gyroscopic Orbital Rings
  const rings = [];
  const ringConfigs = [
    { radius: 2.55, tube: 0.025, color: 0x8be034, opacity: 0.7, rx: Math.PI / 2.6, ry: 0.3, speed: 0.01 },
    { radius: 2.95, tube: 0.018, color: 0xa9ee62, opacity: 0.45, rx: -Math.PI / 3, ry: -0.4, speed: -0.008 },
    { radius: 3.3, tube: 0.014, color: 0xffffff, opacity: 0.25, rx: Math.PI / 5, ry: 0.7, speed: 0.006 }
  ];

  ringConfigs.forEach((cfg) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 72),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity })
    );
    ring.rotation.x = cfg.rx;
    ring.rotation.y = cfg.ry;
    ring.userData = { speed: cfg.speed };
    masterGroup.add(ring);
    rings.push(ring);
  });

  // 3. Floating 3D Particle Aura
  const particleCount = 90;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const r = 2.3 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pPos[i] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ color: 0xa9ee62, size: 0.065, transparent: true, opacity: 0.8 })
  );
  masterGroup.add(particles);

  // 4. Interactive Click Shockwave
  const burstMat = new THREE.MeshBasicMaterial({
    color: 0x8be034,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0
  });
  const burstRing = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.18, 48), burstMat);
  masterGroup.add(burstRing);

  let mouseX = 0;
  let mouseY = 0;
  let burstActive = false;
  let burstScale = 1;
  let spinBoost = 0;

  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  container.addEventListener('click', () => {
    burstActive = true;
    burstScale = 1;
    burstMat.opacity = 0.85;
    spinBoost = 0.08;
  });

  const clock = new THREE.Clock();
  const reduced = prefersReducedMotion();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reduced) {
      spinBoost *= 0.94;
      outerCrystal.rotation.y += 0.006 + spinBoost;
      outerCrystal.rotation.x = Math.sin(t * 0.7) * 0.12;
      wireCage.rotation.y -= 0.004;
      innerCore.rotation.y -= 0.012 + spinBoost;

      const floatY = Math.sin(t * 1.4) * 0.14;
      outerCrystal.position.y = floatY;
      wireCage.position.y = floatY;
      innerCore.position.y = floatY;

      const pulse = 1 + Math.sin(t * 2.4) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);

      rings.forEach((r) => {
        r.rotation.z += r.userData.speed;
      });

      particles.rotation.y += 0.0025;
      masterGroup.rotation.y += (mouseX * 0.4 - masterGroup.rotation.y) * 0.06;
      masterGroup.rotation.x += (mouseY * 0.3 - masterGroup.rotation.x) * 0.06;

      if (burstActive) {
        burstScale += 0.14;
        burstRing.scale.set(burstScale, burstScale, 1);
        burstMat.opacity -= 0.03;
        if (burstMat.opacity <= 0) {
          burstActive = false;
          burstMat.opacity = 0;
        }
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

function initWellnessOrb(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 4.8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.PointLight(0x8be034, 3.2, 20);
  light.position.set(3, 4, 4);
  scene.add(light);

  const orb = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.12, 1),
    new THREE.MeshPhysicalMaterial({
      color: 0x7bce29,
      emissive: 0x143e31,
      emissiveIntensity: 0.45,
      roughness: 0.15,
      metalness: 0.3,
      clearcoat: 1.0
    })
  );
  scene.add(orb);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.65, 0.022, 14, 56),
    new THREE.MeshBasicMaterial({ color: 0xa9ee62, transparent: true, opacity: 0.55 })
  );
  halo.rotation.x = Math.PI / 2.5;
  scene.add(halo);

  const clock = new THREE.Clock();
  const reduced = prefersReducedMotion();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reduced) {
      orb.rotation.y += 0.012;
      orb.rotation.x = Math.sin(t * 1.1) * 0.15;
      halo.rotation.z += 0.015;

      const pulse = 1 + Math.sin(t * 2.2) * 0.05;
      orb.scale.set(pulse, pulse, pulse);
    }

    renderer.render(scene, camera);
  }
  animate();
}

function initSOSBeacon(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.8, 5.4);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const redLight = new THREE.PointLight(0xef4444, 4.2, 24);
  redLight.position.set(0, 2, 2);
  scene.add(redLight);

  const beacon = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.95, 0),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.3
    })
  );
  beacon.position.y = 0.25;
  scene.add(beacon);

  const waves = [];
  for (let i = 0; i < 3; i++) {
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const wave = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.06, 48), waveMat);
    wave.rotation.x = Math.PI / 2;
    wave.position.y = -0.45;
    wave.userData = { phase: i / 3 };
    scene.add(wave);
    waves.push(wave);
  }

  const clock = new THREE.Clock();
  const reduced = prefersReducedMotion();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!reduced) {
      beacon.rotation.y += 0.03;
      const s = 1 + Math.sin(t * 5.5) * 0.09;
      beacon.scale.set(s, s, s);

      waves.forEach((w) => {
        const progress = (t * 0.85 + w.userData.phase) % 1;
        const scale = 1 + progress * 2.2;
        w.scale.set(scale, scale, 1);
        w.material.opacity = (1 - progress) * 0.8;
      });
    }

    renderer.render(scene, camera);
  }
  animate();
}
