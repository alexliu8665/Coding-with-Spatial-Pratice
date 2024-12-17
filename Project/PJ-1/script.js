document.addEventListener("DOMContentLoaded", () => {
  const sceneContainer = document.getElementById("scene-container");
  const planetSelect = document.getElementById("planetSelect");

  // Three.js Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  // Sphere Geometry
  const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
  let currentSphere;

  const textureLoader = new THREE.TextureLoader();
  
  // Image mapping loaded from Excel file (simplified for demo)
  const imageCategories = {
    Energetic: [1, 13, 25, 37, 49],
    Lonely: [2, 14, 26, 38, 50],
    Verdant: [3, 15, 27, 39],
    Oceanic: [4, 16, 28, 40],
    Desolate: [5, 17, 29, 41],
    Radiant: [6, 18, 30, 42],
    Mysterious: [7, 19, 31, 43],
    Arid: [8, 20, 32, 44],
    Futuristic: [9, 21, 33, 45],
    Azure: [10, 22, 34, 46],
    Luminous: [11, 23, 35, 47],
    Pulsating: [12, 24, 36, 48],
  };

  /**
   * Load Sphere Texture with the first image of the selected category
   * @param {string} category
   */
  function loadSphereTexture(category) {
    if (currentSphere) {
      scene.remove(currentSphere);
    }

    // Use the first image of the selected category as texture
    const imageIndex = imageCategories[category][0];
    const texturePath = `./Images/${imageIndex}.JPG`;

    const texture = textureLoader.load(
      texturePath,
      () => console.log(`Loaded texture: ${texturePath}`),
      undefined,
      (err) => console.error(`Error loading texture: ${err}`)
    );

    const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: false });
    currentSphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(currentSphere);
  }

  // Camera Position
  camera.position.z = 10;

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (currentSphere) currentSphere.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  // Dropdown Event Listener
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    if (imageCategories[selectedCategory]) {
      loadSphereTexture(selectedCategory);
    }
  });

  // Load Default Category
  loadSphereTexture("Energetic");

  // Resize Event
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
