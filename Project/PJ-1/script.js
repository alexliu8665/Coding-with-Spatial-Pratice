document.addEventListener("DOMContentLoaded", () => {
  const planetSelect = document.getElementById("planetSelect");
  const sphereContainer = document.getElementById("sphere-container");

  // Category-to-image mapping
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

  let scene, camera, renderer, sphereGroup;

  // Initialize Three.js
  function initThreeJS() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sphereContainer.innerHTML = ""; // Clear previous canvas
    sphereContainer.appendChild(renderer.domElement);

    // Light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    animate();
  }

  // Create sphere of images
  function createImageSphere(images) {
    if (sphereGroup) {
      scene.remove(sphereGroup); // Remove previous sphere
    }

    sphereGroup = new THREE.Group();
    const radius = 1; // Sphere radius
    const loader = new THREE.TextureLoader();

    images.forEach((imageIndex, i) => {
      const texture = loader.load(
        `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`,
        () => console.log(`Image loaded: ${imageIndex}`)
      );

      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(2, 2); // Create flat image planes

      const mesh = new THREE.Mesh(geometry, material);

      // Arrange images on sphere surface
      const phi = Math.acos(-1 + (2 * i) / images.length);
      const theta = Math.sqrt(images.length * Math.PI) * phi;

      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);

      mesh.lookAt(scene.position); // Ensure images face the center
      sphereGroup.add(mesh);
    });

    scene.add(sphereGroup);
  }

  // Animate the scene
  function animate() {
    requestAnimationFrame(animate);
    if (sphereGroup) {
      sphereGroup.rotation.y += 0.002; // Rotate sphere slowly
    }
    renderer.render(scene, camera);
  }

  // Dropdown event listener
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    const images = imageCategories[selectedCategory];

    if (images) {
      console.log(`Loading images for category: ${selectedCategory}`);
      createImageSphere(images); // Create sphere with images
    }
  });

  // Window resize handling
  window.addEventListener("resize", () => {
    if (renderer && camera) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
  });

  // Initialize Three.js
  initThreeJS();
});
