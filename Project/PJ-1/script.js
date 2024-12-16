document.addEventListener("DOMContentLoaded", () => {
  const sceneContainer = document.getElementById("scene-container");
  const planetSelect = document.getElementById("planetSelect");

  // Set up Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  // Create sphere geometry for image mapping
  const sphereGeometry = new THREE.SphereGeometry(5, 64, 64); // A smooth sphere
  const sphereMaterials = [];

  // Preload textures for all categories
  const textureLoader = new THREE.TextureLoader();
  const imageCategories = {
    Energetic: 'https://via.placeholder.com/512/ff0000',
    Lonely: 'https://via.placeholder.com/512/0000ff',
    Verdant: 'https://via.placeholder.com/512/00ff00',
    Oceanic: 'https://via.placeholder.com/512/00ffff',
    Desolate: 'https://via.placeholder.com/512/aaaaaa',
    Radiant: 'https://via.placeholder.com/512/ffff00',
    Mysterious: 'https://via.placeholder.com/512/5500ff',
    Arid: 'https://via.placeholder.com/512/ffaa00',
    Futuristic: 'https://via.placeholder.com/512/333333',
    Azure: 'https://via.placeholder.com/512/00aaff',
    Luminous: 'https://via.placeholder.com/512/ffffff',
    Pulsating: 'https://via.placeholder.com/512/ff00ff',
  };

  let currentSphere;

  function loadSphereTexture(category) {
    if (currentSphere) {
      scene.remove(currentSphere); // Remove old sphere
    }

    const texture = textureLoader.load(
      imageCategories[category],
      () => console.log(`Loaded texture for ${category}`),
      undefined,
      (err) => console.error('Error loading texture:', err)
    );

    const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: false });
    currentSphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(currentSphere);
  }

  // Camera position
  camera.position.z = 10;

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    if (currentSphere) {
      currentSphere.rotation.y += 0.005; // Rotate sphere
    }
    renderer.render(scene, camera);
  }

  animate();

  // Handle dropdown change
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    if (imageCategories[selectedCategory]) {
      loadSphereTexture(selectedCategory);
    }
  });

  // Load default sphere
  loadSphereTexture("Energetic");

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
