// AGEWELL Senior Independence Portal - Simple & Smooth 3D Animations

function initHero3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 6.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.DirectionalLight(0x8be034, 2.5);
  light.position.set(4, 5, 5);
  scene.add(light);

  // Simple Smooth Rotating Emerald & Lime Sphere
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1.45, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0x143e31,
      emissive: 0x0d2c22,
      roughness: 0.2,
      metalness: 0.3
    })
  );
  scene.add(sphere);

  // Single Clean Orbital Ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.04, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0x8be034, transparent: true, opacity: 0.85 })
  );
  ring.rotation.x = Math.PI / 2.6;
  scene.add(ring);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    sphere.rotation.y += 0.01;
    sphere.position.y = Math.sin(t * 1.5) * 0.15;

    ring.rotation.z += 0.012;
    ring.position.y = sphere.position.y;

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
  camera.position.set(0, 0, 4.5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const light = new THREE.PointLight(0x8be034, 2.5, 20);
  light.position.set(3, 4, 4);
  scene.add(light);

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0x7bce29,
      emissive: 0x143e31,
      roughness: 0.25,
      metalness: 0.2
    })
  );
  scene.add(orb);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    orb.rotation.y += 0.012;
    const pulse = 1 + Math.sin(t * 2) * 0.05;
    orb.scale.set(pulse, pulse, pulse);

    renderer.render(scene, camera);
  }
  animate();
}

function initSOSBeacon(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 5.0);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const redLight = new THREE.PointLight(0xef4444, 3.5, 20);
  redLight.position.set(0, 2, 2);
  scene.add(redLight);

  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.8,
      roughness: 0.2
    })
  );
  scene.add(beacon);

  const waveMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  const wave = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.15, 48), waveMat);
  wave.rotation.x = Math.PI / 2;
  scene.add(wave);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const s = 1 + Math.sin(t * 5) * 0.08;
    beacon.scale.set(s, s, s);

    const progress = (t * 0.8) % 1;
    const waveScale = 1 + progress * 2.0;
    wave.scale.set(waveScale, waveScale, 1);
    waveMat.opacity = (1 - progress) * 0.8;

    renderer.render(scene, camera);
  }
  animate();
}
