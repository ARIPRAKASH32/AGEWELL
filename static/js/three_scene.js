// AGEWELL Senior Independence Portal - Three.js 3D Visualizer Engine

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x8be034, 2.5);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x38bdf8, 3, 20);
  rimLight.position.set(-5, -3, 3);
  scene.add(rimLight);

  // Main 3D Group
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Central 3D Care Capsule (Pill)
  const capsuleGeo = new THREE.CapsuleGeometry(1.2, 1.6, 32, 64);
  const capsuleMat = new THREE.MeshPhysicalMaterial({
    color: 0x143e31,
    emissive: 0x081d16,
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.4,
    opacity: 0.95,
    transparent: true,
    reflectivity: 0.9
  });
  const capsuleMesh = new THREE.Mesh(capsuleGeo, capsuleMat);
  capsuleMesh.rotation.z = Math.PI / 4;
  mainGroup.add(capsuleMesh);

  // 2. Vibrant Green Top Cap
  const topGeo = new THREE.SphereGeometry(1.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x7bce29,
    roughness: 0.2,
    metalness: 0.3,
    emissive: 0x3d7310,
    emissiveIntensity: 0.3
  });
  const topMesh = new THREE.Mesh(topGeo, topMat);
  topMesh.position.set(0.6, 0.6, 0);
  topMesh.rotation.z = -Math.PI / 4;
  mainGroup.add(topMesh);

  // 3. Orbital Rings (Shield of Protection)
  const ringGeo = new THREE.TorusGeometry(2.4, 0.04, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x8be034, transparent: true, opacity: 0.65 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 3;
  mainGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(3.0, 0.03, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa9ee62, transparent: true, opacity: 0.45 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = Math.PI / 6;
  mainGroup.add(ring2);

  // 4. Floating Health Vital Particles
  const particleCount = 60;
  const partGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8;
    positions[i + 1] = (Math.random() - 0.5) * 8;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const partMat = new THREE.PointsMaterial({
    color: 0x8be034,
    size: 0.12,
    transparent: true,
    opacity: 0.8
  });
  const particles = new THREE.Points(partGeo, partMat);
  mainGroup.add(particles);

  // Mouse Parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
  };
  container.addEventListener('mousemove', onMouseMove);

  // Animation Loop
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    capsuleMesh.rotation.y = elapsed * 0.4;
    capsuleMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.2 + (Math.PI / 4);

    ring1.rotation.z = elapsed * 0.3;
    ring1.rotation.y = Math.sin(elapsed * 0.2) * 0.5;

    ring2.rotation.y = -elapsed * 0.25;
    ring2.rotation.z = Math.cos(elapsed * 0.2) * 0.4;

    mainGroup.rotation.y = targetX * 0.5;
    mainGroup.rotation.x = -targetY * 0.5;
    mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.15;

    particles.rotation.y = elapsed * 0.05;

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
  camera.position.z = 4.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const amb = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0x7bce29, 2);
  dir.position.set(3, 3, 3);
  scene.add(dir);

  const sphereGeo = new THREE.IcosahedronGeometry(1.3, 4);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x7bce29,
    emissive: 0x143e31,
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1.0,
    wireframe: false
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  const wireGeo = new THREE.IcosahedronGeometry(1.45, 2);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x8be034, wireframe: true, transparent: true, opacity: 0.4 });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wire);

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    sphere.rotation.y = t * 0.3;
    wire.rotation.y = -t * 0.2;
    wire.rotation.x = t * 0.1;
    // Rhythmic vital breathing pulse
    const scale = 1.0 + Math.sin(t * 2.0) * 0.05;
    sphere.scale.set(scale, scale, scale);
    renderer.render(scene, camera);
  }
  animate();
}

function initBeacon3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xff3333, 4, 15);
  light.position.set(0, 2, 0);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  // 3D SOS Button Base
  const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.5, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.5;
  scene.add(base);

  // Red Emergency Dome
  const domeGeo = new THREE.SphereGeometry(1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xef4444,
    emissive: 0x991b1b,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    transmission: 0.5,
    transparent: true,
    opacity: 0.95
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = -0.25;
  scene.add(dome);

  // Pulse Rings
  const waveGeo = new THREE.RingGeometry(1.5, 1.65, 32);
  const waveMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
  const wave = new THREE.Mesh(waveGeo, waveMat);
  wave.rotation.x = Math.PI / 2;
  wave.position.y = -0.2;
  scene.add(wave);

  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    dome.rotation.y = t * 0.5;
    // Pulsing light
    light.intensity = 2 + Math.sin(t * 5.0) * 2;
    // Expanding wave
    const waveProgress = (t % 1.5) / 1.5;
    const waveScale = 1.0 + waveProgress * 2.2;
    wave.scale.set(waveScale, waveScale, waveScale);
    wave.material.opacity = Math.max(0, 1.0 - waveProgress);
    renderer.render(scene, camera);
  }
  animate();
}

// Auto-run when DOM is ready
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
