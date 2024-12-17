document.addEventListener("DOMContentLoaded", () => {
  const planetSelect = document.getElementById("planetSelect");
  const sphereContainer = document.getElementById("sphereContainer");

  // Image categories updated from Excel
  const imageCategories = {
    "Arid": [2, 6, 15, 18, 20, 22, 28, 34, 36],
    "Desolate": [1, 5, 12, 13, 37, 40, 43, 48],
    "Lonely": [33],
    "Mysterious": [3, 26, 27, 30, 31],
    "Oceanic": [19, 23, 38, 39],
    "Pulsating": [9, 11, 14, 16, 25, 35, 42, 44, 45, 50],
    "Radiant": [4, 7, 10, 17, 24, 29, 46, 49],
    "Verdant": [8, 21, 32, 41, 47]
  };

  let currentCategory = "Arid";
  let imageIndex = 0;
  let images = [];

  // Initialize Three.js Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphereContainer.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ map: null, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  camera.position.z = 10;

  // Function to load next image in a category
  function loadNextImage() {
    if (images.length > 0) {
      const imagePath = `Images/${images[imageIndex]}.JPG`;
      const textureLoader = new THREE.TextureLoader();

      textureLoader.load(imagePath, (texture) => {
        material.map = texture;
        material.needsUpdate = true;
        console.log(`Loaded Image: ${imagePath}`);
      });

      imageIndex = (imageIndex + 1) % images.length;
    }
  }

  // Function to update category images
  function updateCategory(category) {
    currentCategory = category;
    images = imageCategories[category] || [];
    imageIndex = 0;
    loadNextImage();
  }

  // Animation to rotate the sphere
  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;

    // Load next image after each full rotation
    if (Math.abs(sphere.rotation.y) >= Math.PI * 2) {
      sphere.rotation.y = 0;
      loadNextImage();
    }

    renderer.render(scene, camera);
  }

  // Event listener for category change
  planetSelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    console.log(`Selected Category: ${selectedCategory}`);
    updateCategory(selectedCategory);
  });

  // Start animation and load the default category
  updateCategory(currentCategory);
  animate();
});
