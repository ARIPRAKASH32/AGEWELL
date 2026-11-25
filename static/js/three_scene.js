// AGEWELL Senior Independence Portal - Next-Gen 3D Biometric Helix & Particle Effects Engine
// Features:
// 1. Hero: 3D Vitality Double-Helix + Geodesic Shield + Bioluminescent Particle Aura + Click Energy Burst
// 2. Wellness Orb: Living Heartbeat TorusKnot + Dual Orbital Rings + Stardust
// 3. SOS Beacon: Holographic Emergency Radar + Pulsing Crimson Core + Triple Shockwave Rings

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 9.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));

  const keyLight = new THREE.DirectionalLight(0x8be034, 3.2);
  keyLight.position.set(6, 8, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xa9ee62, 3.5, 30);
  fillLight.position.set(-6, -4, 5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.5, 25);
  rimLight.position.set(0, 6, -5);
  scene.add(rimLight);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. 3D Vitality Double-Helix
  const helixGroup = new THREE.Group();
  helixGroup.rotation.z = 0.35; // Dynamic diagonal tilt
  masterGroup.add(helixGroup);

  const strandMatA = new THREE.MeshStandardMaterial({
    color: 0x8be034,
    emissive: 0x5aa219,
    emissiveIntensity: 0.55,
    roughness: 0.15,
    metalness: 0.25
  });

  const strandMatB = new THREE.MeshStandardMaterial({
    color: 0x143e31,
    emissive: 0x0d2c22,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.5
  });

  const rungMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.75
  });

  const nodeCount = 16;
  const helixHeight = 4.6;
  const helixRadius = 1.05;

  for (let i = 0; i < nodeCount; i++) {
    const t = i / (nodeCount - 1);
    const y = (t - 0.5) * helixHeight;
    const angle = t * Math.PI * 3.2;

    const x1 = Math.cos(angle) * helixRadius;
    const z1 = Math.sin(angle) * helixRadius;
    const x2 = Math.cos(angle + Math.PI) * helixRadius;
    const z2 = Math.sin(angle + Math.PI) * helixRadius;

    const nodeA = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), strandMatA);
    nodeA.position.set(x1, y, z1);
    helixGroup.add(nodeA);

    const nodeB = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), strandMatB);
    nodeB.position.set(x2, y, z2);
    helixGroup.add(nodeB);

    // Connecting Rung
    const rungGeo = new THREE.CylinderGeometry(0.035, 0.035, helixRadius * 2, 8);
    const rung = new THREE.Mesh(rungGeo, rungMat);
    rung.position.set(0, y, 0);
    rung.rotation.z = Math.PI / 2;
    rung.rotation.y = -angle;
    helixGroup.add(rung);
  }

  // 2. Protective Geodesic Wireframe Shield
  const shieldGeo = new THREE.IcosahedronGeometry(2.65, 1);
  const shieldMat = new THREE.MeshBasicMaterial({
    color: 0x8be034,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const shield = new THREE.Mesh(shieldGeo, shieldMat);
  masterGroup.add(shield);

  // 3. Orbiting Care Satellites & Rings
  const orbitRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.15, 0.02, 12, 64),
    new THREE.MeshBasicMaterial({ color: 0x8be034, transparent: true, opacity: 0.45 })
  );
  orbitRing1.rotation.x = Math.PI / 2.6;
  orbitRing1.rotation.y = 0.3;
  masterGroup.add(orbitRing1);

  const orbitRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.45, 0.015, 12, 64),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
  );
  orbitRing2.rotation.x = -Math.PI / 3;
  orbitRing2.rotation.y = -0.4;
  masterGroup.add(orbitRing2);

  // 4. Bioluminescent Particle Aura
  const particleCount = 110;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const r = 2.4 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = r * Math.cos(phi);
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xa9ee62,
    size: 0.075,
    transparent: true,
    opacity: 0.85
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  masterGroup.add(particles);

  // 5. Interactive Click Shockwave Ring
  const burstGeo = new THREE.RingGeometry(0.8, 0.98, 48);
  const burstMat = new THREE.MeshBasicMaterial({
    color: 0x8be034,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0
  });
  const burstRing = new THREE.Mesh(burstGeo, burstMat);
  masterGroup.add(burstRing);

  let mouseX = 0;
  let mouseY = 0;
  let burstActive = false;
  let burstScale = 1;
  let spinBoost = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  container.addEventListener('click', () => {
    burstActive = true;
    burstScale = 1;
    burstMat.opacity = 0.9;
    spinBoost = 0.14;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth helix rotation + click boost
    spinBoost *= 0.94;
    helixGroup.rotation.y += 0.014 + spinBoost;
    helixGroup.position.y = Math.sin(t * 1.4) * 0.18;

    // Geodesic shield breathing
    shield.rotation.y -= 0.004;
    shield.rotation.x += 0.002;
    const breathe = 1 + Math.sin(t * 2) * 0.03;
    shield.scale.set(breathe, breathe, breathe);

    // Rings & Particles
    orbitRing1.rotation.z += 0.008;
    orbitRing2.rotation.z -= 0.006;
    particles.rotation.y += 0.003;
    particles.rotation.x = Math.sin(t * 0.4) * 0.15;

    // Mouse parallax
    masterGroup.rotation.y += (mouseX * 0.45 - masterGroup.rotation.y) * 0.06;
    masterGroup.rotation.x += (mouseY * 0.35 - masterGroup.rotation.x) * 0.06;

    // Click energy burst
    if (burstActive) {
      burstScale += 0.16;
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

// Senior Dashboard: Living Heartbeat TorusKnot & Dual Orbital Rings
function initWellnessOrb(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.PointLight(0x8be034, 3.5, 20);
  light.position.set(3, 4, 4);
  scene.add(light);

  const knotGeo = new THREE.TorusKnotGeometry(0.95, 0.28, 100, 16);
  const knotMat = new THREE.MeshPhysicalMaterial({
    color: 0x7bce29,
    emissive: 0x143e31,
    emissiveIntensity: 0.45,
    roughness: 0.15,
    metalness: 0.3,
    clearcoat: 1.0
  });
  const knot = new THREE.Mesh(knotGeo, knotMat);
  scene.add(knot);

  const ringA = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.025, 12, 48),
    new THREE.MeshBasicMaterial({ color: 0xa9ee62, transparent: true, opacity: 0.55 })
  );
  ringA.rotation.x = Math.PI / 3;
  scene.add(ringA);

  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.015, 12, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
  );
  ringB.rotation.y = Math.PI / 3;
  scene.add(ringB);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    knot.rotation.y += 0.015;
    knot.rotation.x += 0.008;

    // Calm 60 BPM heartbeat pulse
    const pulse = 1 + Math.pow(Math.sin(t * 2.2), 4) * 0.09;
    knot.scale.set(pulse, pulse, pulse);

    ringA.rotation.z += 0.02;
    ringB.rotation.z -= 0.015;

    renderer.render(scene, camera);
  }
  animate();
}

// SOS Emergency Screen: Holographic Emergency Radar & Triple Shockwave Rings
function initSOSBeacon(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2.2, 5.6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const redLight = new THREE.PointLight(0xff2a2a, 5, 25);
  redLight.position.set(0, 2, 2);
  scene.add(redLight);

  // Industrial Base
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.3, 0.45, 32),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 })
  );
  base.position.y = -0.6;
  scene.add(base);

  // Pulsing Crimson Octahedron Core
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.85, 0),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.3
    })
  );
  core.position.y = 0.35;
  scene.add(core);

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
    wave.position.y = -0.35;
    wave.userData = { phase: i * (Math.PI * 2 / 3) };
    scene.add(wave);
    waves.push(wave);
  }

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    core.rotation.y += 0.04;
    const s = 1 + Math.sin(t * 6) * 0.12;
    core.scale.set(s, s, s);
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
