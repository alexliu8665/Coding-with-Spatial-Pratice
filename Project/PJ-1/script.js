document.addEventListener("DOMContentLoaded", () => {
  const sceneContainer = document.getElementById("scene-container");
  const planetSelect = document.getElementById("planetSelect");

  // Three.js 基本設置
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  let currentSphere;
  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);

  // 圖片分類數據
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

  // 加載球體貼圖
  function loadSphereTexture(category) {
    if (currentSphere) scene.remove(currentSphere); // 清除當前球體

    const imageIndex = imageCategories[category]?.[0]; // 使用該分類的第一張圖片
    if (!imageIndex) {
      console.error(`Category "${category}" has no images.`);
      return;
    }

    const texturePath = `./Images/${imageIndex}.JPG`;
    console.log(`Loading texture: ${texturePath}`);

    const texture = textureLoader.load(
      texturePath,
      () => console.log("Texture loaded successfully."),
      undefined,
      () => {
        console.error(`Failed to load texture: ${texturePath}`);
        alert("圖片加載失敗，請檢查路徑是否正確！");
      }
    );

    const material = new THREE.MeshBasicMaterial({ map: texture });
    currentSphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(currentSphere);
  }

  // 初始球體設置
  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    if (currentSphere) currentSphere.rotation.y += 0.005; // 球體旋轉
    renderer.render(scene, camera);
  }
  animate();

  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    loadSphereTexture(selectedCategory);
  });

  // 載入預設分類
  loadSphereTexture("Energetic");

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
