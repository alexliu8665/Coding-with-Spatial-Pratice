document.addEventListener("DOMContentLoaded", () => {
  const planetSelect = document.getElementById("planetSelect");
  const container = document.getElementById("threeContainer");

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

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 2;

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  const textureLoader = new THREE.TextureLoader();

  function loadCategory(category) {
    const images = imageCategories[category] || [];
    if (!images.length) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 512;

    let loadedImages = 0;
    images.forEach((imageIndex, idx) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;

      img.onload = () => {
        const x = (idx % 2) * 512;
        const y = Math.floor(idx / 2) * 256;
        context.drawImage(img, x, y, 512, 256);
        loadedImages++;

        if (loadedImages === images.length) {
          const texture = textureLoader.load(canvas.toDataURL());
          sphereMaterial.map = texture;
          sphereMaterial.needsUpdate = true;
        }
      };
    });
  }

  planetSelect.addEventListener("change", () => {
    const category = planetSelect.value;
    loadCategory(category);
  });

  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();
});
