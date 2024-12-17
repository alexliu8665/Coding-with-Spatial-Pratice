document.addEventListener("DOMContentLoaded", () => {
  const sceneContainer = document.getElementById("sphereContainer");
  
  // Three.js 設置
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64); // 調整球體大小

  // 定義圖片分類與對應圖片列表
  const imageCategories = {
    Arid: ["2.JPG"],
    Desolate: ["1.JPG"],
    Lonely: ["33.JPG"],
    Mysterious: ["3.JPG"],
    Oceanic: ["19.JPG"],
    Pulsating: ["9.JPG"],
    Radiant: ["4.JPG"],
    Verdant: ["8.JPG"],
  };

  // 存儲所有球體和它們的相關資料
  const spheres = [];
  const positions = [ // 設定各球體在場景中的位置
    { x: -6, y: 0, z: 0 },
    { x: -4, y: 2, z: -4 },
    { x: -2, y: -2, z: 2 },
    { x: 0, y: 0, z: -6 },
    { x: 2, y: 2, z: 4 },
    { x: 4, y: -2, z: -2 },
    { x: 6, y: 0, z: 0 },
    { x: 0, y: 4, z: 6 },
  ];

  // 創建球體
  function createSpheres() {
    let index = 0;

    for (const [category, images] of Object.entries(imageCategories)) {
      const texturePath = `./Images/${images[0]}`; // 每個分類加載第一張圖片
      const texture = textureLoader.load(texturePath);

      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(sphereGeometry, material);

      // 設置球體位置
      sphere.position.set(positions[index].x, positions[index].y, positions[index].z);
      sphere.userData = { rotationSpeed: 0.005 + Math.random() * 0.005 }; // 設置每個球體不同的旋轉速度
      spheres.push(sphere);
      scene.add(sphere);

      index++;
    }
  }

  // 初始化所有球體
  createSpheres();

  camera.position.z = 15;

  // 動畫循環
  function animate() {
    requestAnimationFrame(animate);

    // 讓每個球體旋轉
    spheres.forEach((sphere) => {
      sphere.rotation.y += sphere.userData.rotationSpeed;
    });

    renderer.render(scene, camera);
  }
  animate();

  // 自適應窗口大小
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
