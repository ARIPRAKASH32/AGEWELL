// AGEWELL Senior Independence Portal - Next-Gen 3D Zero-Gravity Care Pod & Orbiting Capsules
// Features: Floating Crystal Vitality Core + Tumbling 3D Medicine Capsules + Kinetic Gravitational Pulse

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 8.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x8be034, 3.2);
  keyLight.position.set(6, 6, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xa9ee62, 3.5, 30);
  fillLight.position.set(-6, -4, 4);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xffffff, 2.5, 25);
  rimLight.position.set(0, 5, -4);
  scene.add(rimLight);

  // Master 3D Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Central Faceted Crystal of Vitality (Guardian Core)
  const coreGroup = new THREE.Group();
  masterGroup.add(coreGroup);

  const crystalGeo = new THREE.OctahedronGeometry(1.35, 1);
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x143e31,
    emissive: 0x081d16,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.15,
    transmission: 0.6,
    opacity: 0.95,
    transparent: true,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  coreGroup.add(crystal);

  // Inner Glowing Heart Cross
  const innerHeartGeo = new THREE.SphereGeometry(0.65, 16, 16);
  const innerHeartMat = new THREE.MeshBasicMaterial({ color: 0x8be034 });
  const innerHeart = new THREE.Mesh(innerHeartGeo, innerHeartMat);
  coreGroup.add(innerHeart);

  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.75, 0.2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  coreGroup.add(crossV);
  coreGroup.add(crossH);

  // 2. Realistic 3D Tumbling Medicine Capsules (Orbiting Pills)
  function createMiniCapsule() {
    const pill = new THREE.Group();
    
    // Bottom Emerald Half
    const bGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.5, 24);
    const bMat = new THREE.MeshStandardMaterial({ color: 0x144233, roughness: 0.2, metalness: 0.3 });
    const bCyl = new THREE.Mesh(bGeo, bMat);
    bCyl.position.y = -0.25;
    pill.add(bCyl);

    const bCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
      bMat
    );
    bCap.position.y = -0.5;
    pill.add(bCap);

    // Top Lime Half
    const tGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.5, 24);
    const tMat = new THREE.MeshStandardMaterial({ color: 0x8be034, roughness: 0.15, metalness: 0.2, emissive: 0x5aa219, emissiveIntensity: 0.3 });
    const tCyl = new THREE.Mesh(tGeo, tMat);
    tCyl.position.y = 0.25;
    pill.add(tCyl);

    const tCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      tMat
    );
    tCap.position.y = 0.5;
    pill.add(tCap);

    // Central Silver Ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.29, 0.02, 12, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
    );
    ring.rotation.x = Math.PI / 2;
    pill.add(ring);

    return pill;
  }

  // Generate 4 Orbiting Capsules at different orbital radii and speeds
  const orbitingPills = [];
  const pillConfigs = [
    { radius: 2.7, speed: 0.65, angle: 0, tiltX: 0.4, tiltZ: 0.2, spinSpeed: 1.5 },
    { radius: 3.2, speed: -0.5, angle: Math.PI / 2, tiltX: -0.5, tiltZ: 0.6, spinSpeed: 2.0 },
    { radius: 2.9, speed: 0.8, angle: Math.PI, tiltX: 0.6, tiltZ: -0.4, spinSpeed: 1.2 },
    { radius: 3.5, speed: -0.4, angle: Math.PI * 1.5, tiltX: -0.3, tiltZ: -0.7, spinSpeed: 1.8 }
  ];

  pillConfigs.forEach(cfg => {
    const p = createMiniCapsule();
    masterGroup.add(p);
    orbitingPills.push({ mesh: p, ...cfg });
  });

  // 3. Gyroscope Protective Energy Rings
  const ringsGroup = new THREE.Group();
  masterGroup.add(ringsGroup);

  const ring1Geo = new THREE.TorusGeometry(2.8, 0.04, 16, 100);
  const ring1Mat = new THREE.MeshStandardMaterial({ color: 0x8be034, emissive: 0x5aa219, emissiveIntensity: 0.7 });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  ringsGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(3.3, 0.03, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa9ee62, transparent: true, opacity: 0.5 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 6;
  ringsGroup.add(ring2);

  // 4. Stardust Vitality Field (90 particles)
  const particleCount = 90;
  const partGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 6;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({
    color: 0x8be034,
    size: 0.14,
    transparent: true,
    opacity: 0.85
  });
  const particles = new THREE.Points(partGeo, partMat);
  masterGroup.add(particles);

  // Mouse Parallax & Interactive Kinetic Shockwave
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let pulseIntensity = 0;

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
  };
  container.addEventListener('mousemove', onMouseMove);

  // Interactive Click: Gravitational Shockwave
  container.addEventListener('click', () => {
    pulseIntensity = 1.0;
  });

  // Render & Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Parallax damping
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Decay shockwave pulse
    pulseIntensity *= 0.93;

    // Rotate central crystal & inner heart
    crystal.rotation.y = elapsed * 0.5;
    crystal.rotation.x = Math.sin(elapsed * 0.4) * 0.3;
    const heartScale = 1.0 + Math.sin(elapsed * 3.5) * 0.12 + (pulseIntensity * 0.3);
    innerHeart.scale.set(heartScale, heartScale, heartScale);

    // Orbiting & tumbling medicine capsules
    orbitingPills.forEach(p => {
      p.angle += (p.speed * 0.02) * (1.0 + pulseIntensity * 2.0);
      const rad = p.radius + (pulseIntensity * 0.6);
      
      const x = Math.cos(p.angle) * rad;
      const z = Math.sin(p.angle) * rad;
      const y = Math.sin(p.angle * 2.0 + elapsed) * 0.6;
      
      p.mesh.position.set(x, y, z);
      p.mesh.rotation.x = elapsed * p.spinSpeed;
      p.mesh.rotation.y = elapsed * p.spinSpeed * 0.8;
      p.mesh.rotation.z = Math.sin(elapsed) * 0.5;
    });

    // Orbital rings rotation
    ring1.rotation.z = elapsed * 0.35;
    ring1.rotation.y = Math.sin(elapsed * 0.2) * 0.4;
    ring2.rotation.y = -elapsed * 0.3;
    ring2.rotation.x = Math.cos(elapsed * 0.25) * 0.5;

    // Master group tilt
    masterGroup.rotation.y = targetX * 0.55;
    masterGroup.rotation.x = -targetY * 0.45;
    masterGroup.position.y = Math.sin(elapsed * 1.6) * 0.15;

    particles.rotation.y = elapsed * 0.04;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

function initWellnessOrb3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 4.6;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const amb = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0x8be034, 2.8);
  dir.position.set(4, 4, 4);
  scene.add(dir);

  const orbGroup = new THREE.Group();
  scene.add(orbGroup);

  // Faceted Emerald Vitality Core
  const sphereGeo = new THREE.IcosahedronGeometry(1.25, 4);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x7bce29,
    emissive: 0x143e31,
    emissiveIntensity: 0.65,
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  orbGroup.add(sphere);

  // Outer Heart-Rate Geometric Aura (Lime Wireframe)
  const wireGeo = new THREE.IcosahedronGeometry(1.5, 2);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xa9ee62, wireframe: true, transparent: true, opacity: 0.45 });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  orbGroup.add(wire);

  // ECG Lifeline Wave Ring (Bright Sprout Lime)
  const ecgGeo = new THREE.TorusGeometry(1.85, 0.03, 16, 64);
  const ecgMat = new THREE.MeshBasicMaterial({ color: 0x8be034, transparent: true, opacity: 0.8 });
  const ecgRing = new THREE.Mesh(ecgGeo, ecgMat);
  ecgRing.rotation.x = Math.PI / 2.5;
  orbGroup.add(ecgRing);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    sphere.rotation.y = t * 0.4;
    wire.rotation.y = -t * 0.25;
    wire.rotation.x = t * 0.15;
    ecgRing.rotation.z = t * 0.6;

    // Rhythmic breathing heartbeat pulse
    const heartbeat = 1.0 + Math.pow(Math.sin(t * 3.0), 4) * 0.09;
    sphere.scale.set(heartbeat, heartbeat, heartbeat);
    renderer.render(scene, camera);
  }
  animate();
}

function initBeacon3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2.2, 5.2);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const beaconGroup = new THREE.Group();
  scene.add(beaconGroup);

  const light = new THREE.PointLight(0xff2222, 5, 20);
  light.position.set(0, 2, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // 3D SOS Industrial Base
  const baseGeo = new THREE.CylinderGeometry(1.65, 1.85, 0.5, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x081d16, metalness: 0.9, roughness: 0.15 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.55;
  beaconGroup.add(base);

  // Red Emergency Optical Dome
  const domeGeo = new THREE.SphereGeometry(1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xef4444,
    emissive: 0xb91c1c,
    emissiveIntensity: 0.7,
    roughness: 0.1,
    transmission: 0.4,
    transparent: true,
    opacity: 0.96
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = -0.3;
  beaconGroup.add(dome);

  // Revolving Strobe Light Sweep Beam
  const beamGeo = new THREE.ConeGeometry(2.5, 5, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xff3333,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = Math.PI / 2;
  beam.position.set(0, 0.5, 2.5);
  const rotor = new THREE.Group();
  rotor.add(beam);
  beaconGroup.add(rotor);

  // Multi-Ring Pulse Waves
  const waves = [];
  for (let i = 0; i < 2; i++) {
    const waveGeo = new THREE.RingGeometry(1.5, 1.68, 32);
    const waveMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.rotation.x = Math.PI / 2;
    wave.position.y = -0.25;
    beaconGroup.add(wave);
    waves.push(wave);
  }

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    dome.rotation.y = t * 0.4;
    rotor.rotation.y = t * 4.0;

    light.intensity = 2.5 + Math.sin(t * 6.0) * 2.5;

    waves.forEach((w, idx) => {
      const progress = ((t + idx * 0.75) % 1.5) / 1.5;
      const scale = 1.0 + progress * 2.4;
      w.scale.set(scale, scale, scale);
      w.material.opacity = Math.max(0, 1.0 - progress);
    });

    renderer.render(scene, camera);
  }
  animate();
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('hero-3d-canvas')) {
    initHero3D('hero-3d-canvas');
  }
  if (document.getElementById('wellness-orb-canvas')) {
    initWellnessOrb3D('wellness-orb-canvas');
  }
  if (document.getElementById('sos-beacon-canvas')) {
    initBeacon3D('sos-beacon-canvas');
  }
});
