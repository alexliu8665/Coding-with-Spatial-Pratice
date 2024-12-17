document.addEventListener("DOMContentLoaded", () => {
  const sphereContainer = document.getElementById("sphereContainer");
  const planetSelect = document.getElementById("planetSelect");

  // Three.js 設置
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphereContainer.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

  // 圖片分類與對應圖片列表
  const imageCategories = {
    Arid: ["2.JPG", "6.JPG", "15.JPG", "18.JPG"],
    Desolate: ["1.JPG", "5.JPG", "12.JPG", "13.JPG"],
    Lonely: ["33.JPG"],
    Mysterious: ["3.JPG", "26.JPG", "27.JPG"],
    Oceanic: ["19.JPG", "23.JPG"],
    Pulsating: ["9.JPG", "11.JPG"],
    Radiant: ["4.JPG", "7.JPG"],
    Verdant: ["8.JPG", "21.JPG"],
  };

  // 初始化球體
  const spheres = [];
  const sphereData = [];
  let categories = Object.keys(imageCategories);

  categories.forEach((category, index) => {
    const texture = textureLoader.load(`./Images/${imageCategories[category][0]}`);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x = Math.sin((index / categories.length) * Math.PI * 2) * 6;
    sphere.position.z = Math.cos((index / categories.length) * Math.PI * 2) * 6;

    scene.add(sphere);
    spheres.push(sphere);

    sphereData.push({
      category,
      rotationProgress: 0, // 旋轉進度
      currentImageIndex: 0, // 當前圖片索引
    });
  });

  camera.position.z = 15;

  // 切換圖片
  function updateSphereImage(sphere, sphereInfo) {
    sphereInfo.currentImageIndex =
      (sphereInfo.currentImageIndex + 1) % imageCategories[sphereInfo.category].length;
    const imagePath = `./Images/${imageCategories[sphereInfo.category][sphereInfo.currentImageIndex]}`;
    const newTexture = textureLoader.load(imagePath);
    sphere.material.map = newTexture;
    sphere.material.needsUpdate = true;
  }

  // 監聽清單變化
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;

    sphereData.forEach((data, index) => {
      const sphere = spheres[index];

      if (data.category === selectedCategory) {
        sphere.scale.set(1.5, 1.5, 1.5); // 放大
        sphere.rotation.y = 0; // 反向旋轉
      } else {
        sphere.scale.set(1, 1, 1); // 恢復原大小
      }
    });
  });

  // 動畫函數
  function animate() {
    requestAnimationFrame(animate);

    spheres.forEach((sphere, index) => {
      const sphereInfo = sphereData[index];
      sphere.rotation.y += 0.01; // 每個球體自轉

      // 檢測是否轉完一圈
      sphereInfo.rotationProgress += 0.01;
      if (sphereInfo.rotationProgress >= 2 * Math.PI) {
        sphereInfo.rotationProgress = 0; // 重置進度
        updateSphereImage(sphere, sphereInfo); // 更新圖片
      }
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
