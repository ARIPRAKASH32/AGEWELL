// AGEWELL Senior Independence Portal - Advanced 3D Visualizer Engine
// Enhanced 3D Animation System with Interactive Holographic Care Capsule & Vitality Physics

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 7.8);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Dynamic Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
  mainLight.position.set(6, 6, 6);
  scene.add(mainLight);

  const blueBacklight = new THREE.PointLight(0x0284c7, 4.0, 30);
  blueBacklight.position.set(-6, -4, -3);
  scene.add(blueBacklight);

  const cyanFillLight = new THREE.PointLight(0x06b6d4, 3.5, 25);
  cyanFillLight.position.set(4, -5, 4);
  scene.add(cyanFillLight);

  // Main 3D Container Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 1. Dual-Tone Holographic Care Capsule (Pill)
  const capsuleGroup = new THREE.Group();
  masterGroup.add(capsuleGroup);

  // Lower Oceanic Sapphire Capsule Half
  const lowerGeo = new THREE.CylinderGeometry(1.15, 1.15, 1.4, 32, 1, false);
  const sapphireMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f2744,
    emissive: 0x071324,
    emissiveIntensity: 0.6,
    roughness: 0.15,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.45,
    opacity: 0.95,
    transparent: true,
    reflectivity: 0.9
  });
  const lowerCyl = new THREE.Mesh(lowerGeo, sapphireMat);
  lowerCyl.position.y = -0.7;
  capsuleGroup.add(lowerCyl);

  const lowerBottomGeo = new THREE.SphereGeometry(1.15, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const lowerBottom = new THREE.Mesh(lowerBottomGeo, sapphireMat);
  lowerBottom.position.y = -1.4;
  capsuleGroup.add(lowerBottom);

  // Upper Vibrant Cyan Capsule Half
  const upperGeo = new THREE.CylinderGeometry(1.15, 1.15, 1.4, 32, 1, false);
  const cyanMat = new THREE.MeshPhysicalMaterial({
    color: 0x0ea5e9,
    emissive: 0x0284c7,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transmission: 0.4,
    opacity: 0.96,
    transparent: true,
    reflectivity: 0.95
  });
  const upperCyl = new THREE.Mesh(upperGeo, cyanMat);
  upperCyl.position.y = 0.7;
  capsuleGroup.add(upperCyl);

  const upperTopGeo = new THREE.SphereGeometry(1.15, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const upperTop = new THREE.Mesh(upperTopGeo, cyanMat);
  upperTop.position.y = 1.4;
  capsuleGroup.add(upperTop);

  // Sleek Central Chrome Ring Divider
  const dividerGeo = new THREE.TorusGeometry(1.18, 0.06, 16, 64);
  const dividerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
  const divider = new THREE.Mesh(dividerGeo, dividerMat);
  divider.rotation.x = Math.PI / 2;
  capsuleGroup.add(divider);

  // 2. Holographic Rotating Care Cross Inside the Capsule
  const coreCrossGroup = new THREE.Group();
  capsuleGroup.add(coreCrossGroup);

  const crossMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.9, 0.3), crossMat);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.3), crossMat);
  coreCrossGroup.add(crossV);
  coreCrossGroup.add(crossH);

  // DNA / Vital Particles floating inside
  const dnaCount = 24;
  const dnaGroup = new THREE.Group();
  coreCrossGroup.add(dnaGroup);
  for (let i = 0; i < dnaCount; i++) {
    const angle = i * 0.45;
    const y = (i / dnaCount) * 2.2 - 1.1;
    const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0x8be034 }));
    p1.position.set(Math.cos(angle) * 0.55, y, Math.sin(angle) * 0.55);
    const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    p2.position.set(Math.cos(angle + Math.PI) * 0.55, y, Math.sin(angle + Math.PI) * 0.55);
    dnaGroup.add(p1);
    dnaGroup.add(p2);
  }

  capsuleGroup.rotation.z = Math.PI / 5;
  capsuleGroup.rotation.x = Math.PI / 10;

  // 3. Multi-Layer Gyroscope Orbital Protection Rings
  const ringsGroup = new THREE.Group();
  masterGroup.add(ringsGroup);

  // Outer Ring 1 (Cyan)
  const ring1Geo = new THREE.TorusGeometry(2.6, 0.045, 16, 120);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8,
    metalness: 0.6,
    roughness: 0.2
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ringsGroup.add(ring1);

  // Satellite Orb on Ring 1
  const sat1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  sat1.position.set(2.6, 0, 0);
  ring1.add(sat1);

  // Outer Ring 2 (Perpendicular Gyro - Deep Azure)
  const ring2Geo = new THREE.TorusGeometry(3.1, 0.035, 16, 120);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.65 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ringsGroup.add(ring2);

  const sat2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  sat2.position.set(-3.1, 0, 0);
  ring2.add(sat2);

  // Outer Ring 3 (Inclined Aura - Mint Aqua)
  const ring3Geo = new THREE.TorusGeometry(3.6, 0.025, 16, 120);
  const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.45 });
  const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
  ringsGroup.add(ring3);

  // 4. Floating Atmospheric Health Constellation (100 Stars)
  const starCount = 100;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 14;
    starPos[i + 1] = (Math.random() - 0.5) * 12;
    starPos[i + 2] = (Math.random() - 0.5) * 8;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.16,
    transparent: true,
    opacity: 0.85
  });
  const stars = new THREE.Points(starGeo, starMat);
  masterGroup.add(stars);

  // Mouse Parallax & Interactive Kinetic Pulse
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let spinVelocity = 0;

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
  };
  container.addEventListener('mousemove', onMouseMove);

  // Click on Canvas to trigger kinetic spin pulse
  container.addEventListener('click', () => {
    spinVelocity += 0.8;
  });

  // Render & Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Smooth damping
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Spin velocity decay
    spinVelocity *= 0.94;

    // Capsule rotations
    capsuleGroup.rotation.y = elapsed * 0.5 + spinVelocity;
    capsuleGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.25 + (Math.PI / 10);

    // Inner DNA & cross counter-rotation
    coreCrossGroup.rotation.y = -elapsed * 0.8;

    // Gyroscope rings rotation
    ring1.rotation.z = elapsed * 0.45;
    ring1.rotation.y = Math.sin(elapsed * 0.3) * 0.6;

    ring2.rotation.x = elapsed * 0.35;
    ring2.rotation.z = Math.cos(elapsed * 0.25) * 0.5;

    ring3.rotation.y = -elapsed * 0.2;
    ring3.rotation.x = Math.sin(elapsed * 0.2) * 0.4;

    // Master hover & mouse parallax
    masterGroup.rotation.y = targetX * 0.6;
    masterGroup.rotation.x = -targetY * 0.5;
    masterGroup.position.y = Math.sin(elapsed * 1.8) * 0.18;

    stars.rotation.y = elapsed * 0.03;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
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
  const dir = new THREE.DirectionalLight(0x38bdf8, 2.8);
  dir.position.set(4, 4, 4);
  scene.add(dir);

  const orbGroup = new THREE.Group();
  scene.add(orbGroup);

  // Faceted Luminous Vitality Core (Oceanic Cyan)
  const sphereGeo = new THREE.IcosahedronGeometry(1.25, 4);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x0ea5e9,
    emissive: 0x0369a1,
    emissiveIntensity: 0.65,
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  orbGroup.add(sphere);

  // Outer Heart-Rate Geometric Aura (Cyan Wireframe)
  const wireGeo = new THREE.IcosahedronGeometry(1.5, 2);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  orbGroup.add(wire);

  // ECG Vitality Pulse Ring (Mint Green)
  const ecgGeo = new THREE.TorusGeometry(1.85, 0.03, 16, 64);
  const ecgMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
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

  // 3D SOS Heavy Industrial Base
  const baseGeo = new THREE.CylinderGeometry(1.65, 1.85, 0.5, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.15 });
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
    rotor.rotation.y = t * 4.0; // Fast revolving emergency strobe beam

    // Pulsing light intensity
    light.intensity = 2.5 + Math.sin(t * 6.0) * 2.5;

    // Expanding dual wave pulses
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
