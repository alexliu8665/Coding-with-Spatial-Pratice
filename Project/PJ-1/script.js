document.addEventListener("DOMContentLoaded", () => {
  const sceneContainer = document.getElementById("sphereContainer"); // 修正這裡
  const planetSelect = document.getElementById("planetSelect");

  // Three.js 設置
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneContainer.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
  let currentSphere;

  // 圖片分類與對應圖片列表
  const imageCategories = {
    Arid: ["2.JPG", "6.JPG", "15.JPG", "18.JPG", "20.JPG", "22.JPG", "28.JPG", "34.JPG", "36.JPG"],
    Desolate: ["1.JPG", "5.JPG", "12.JPG", "13.JPG", "37.JPG", "40.JPG", "43.JPG", "48.JPG"],
    Lonely: ["33.JPG"],
    Mysterious: ["3.JPG", "26.JPG", "27.JPG", "30.JPG", "31.JPG"],
    Oceanic: ["19.JPG", "23.JPG", "38.JPG", "39.JPG"],
    Pulsating: ["9.JPG", "11.JPG", "14.JPG", "16.JPG", "25.JPG", "35.JPG", "42.JPG", "44.JPG", "45.JPG", "50.JPG"],
    Radiant: ["4.JPG", "7.JPG", "10.JPG", "17.JPG", "24.JPG", "29.JPG", "46.JPG", "49.JPG"],
    Verdant: ["8.JPG", "21.JPG", "32.JPG", "41.JPG", "47.JPG"],
  };

  let currentCategory = "Arid"; // 預設分類
  let currentImageIndex = 0; // 當前圖片索引
  let rotationCounter = 0; // 累積旋轉計數

  // 創建球體
  function createSphere(texturePath) {
    if (currentSphere) scene.remove(currentSphere);

    const texture = textureLoader.load(texturePath);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    currentSphere = new THREE.Mesh(sphereGeometry, material);
    scene.add(currentSphere);
  }

  // 加載下一張圖片
  function loadNextImage() {
    const images = imageCategories[currentCategory];
    if (!images || images.length === 0) return;

    currentImageIndex = (currentImageIndex + 1) % images.length; // 循環切換圖片
    const imagePath = `./Images/${images[currentImageIndex]}`;
    console.log(`Loading image: ${imagePath}`);
    createSphere(imagePath);
  }

  // 初始化球體
  loadNextImage();

  // 監聽選單切換分類
  planetSelect.addEventListener("change", () => {
    currentCategory = planetSelect.value;
    currentImageIndex = -1; // 重置索引
    loadNextImage();
  });

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);

    if (currentSphere) {
      currentSphere.rotation.y += 0.004; // 球體旋轉速度

      // 檢測是否旋轉一整圈
      rotationCounter += 0.004;
      if (rotationCounter >= 2 * Math.PI) {
        rotationCounter = 0; // 重置旋轉計數
        loadNextImage(); // 加載下一張圖片
      }
    }

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
