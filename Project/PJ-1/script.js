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

  const spheres = [];
  const sphereData = [];
  const categories = Object.keys(imageCategories);

  let selectedSphere = null;
  let selectedSphereData = null;

  // 初始化球體（隨機分布和大小）
  categories.forEach((category, index) => {
    const randomSize = Math.random() * 1 + 0.5;
    const texture = textureLoader.load(`./Images/${imageCategories[category][0]}?t=${Date.now()}`);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphere = new THREE.Mesh(sphereGeometry.clone().scale(randomSize, randomSize, randomSize), material);

    // 隨機位置
    sphere.position.x = (Math.random() - 0.5) * 30;
    sphere.position.y = (Math.random() - 0.5) * 15;
    sphere.position.z = (Math.random() - 0.5) * 30;

    scene.add(sphere);
    spheres.push(sphere);

    sphereData.push({
      category,
      rotationProgress: 0,
      currentImageIndex: 0,
      originalScale: randomSize,
      speed: { x: 0, y: 0, z: 0 },
    });
  });

  camera.position.z = 15;

  // 更新球體圖片
  function updateSphereImage(sphere, sphereInfo) {
    sphereInfo.currentImageIndex =
      (sphereInfo.currentImageIndex + 1) % imageCategories[sphereInfo.category].length;
    const imagePath = `./Images/${imageCategories[sphereInfo.category][sphereInfo.currentImageIndex]}?t=${Date.now()}`;
    const newTexture = textureLoader.load(imagePath, () => {
      sphere.material.map = newTexture;
      sphere.material.needsUpdate = true;
    });
  }

  // 監聽選單變化
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;

    sphereData.forEach((data, index) => {
      const sphere = spheres[index];
      if (data.category === selectedCategory) {
        selectedSphere = sphere;
        selectedSphereData = data;

        data.speed.x = (Math.random() - 0.5) * 0.05;
        data.speed.y = (Math.random() - 0.5) * 0.05;
        data.speed.z = (Math.random() - 0.5) * 0.05;

        sphere.scale.set(data.originalScale * 3, data.originalScale * 3, data.originalScale * 3);
        data.rotationProgress = 0;
      } else {
        data.speed.x = data.speed.y = data.speed.z = 0;
        sphere.scale.set(data.originalScale, data.originalScale, data.originalScale);
      }
    });
  });

  // 動畫函數
  function animate() {
    requestAnimationFrame(animate);

    spheres.forEach((sphere, index) => {
      const sphereInfo = sphereData[index];
      sphere.rotation.y += 0.01;

      if (sphere === selectedSphere) {
        sphere.position.x += sphereInfo.speed.x;
        sphere.position.y += sphereInfo.speed.y;
        sphere.position.z += sphereInfo.speed.z;

        if (Math.abs(sphere.position.x) > 15) sphereInfo.speed.x *= -1;
        if (Math.abs(sphere.position.y) > 10) sphereInfo.speed.y *= -1;
        if (Math.abs(sphere.position.z) > 15) sphereInfo.speed.z *= -1;

        sphereInfo.rotationProgress += 0.01;
        if (sphereInfo.rotationProgress >= 2 * Math.PI) {
          sphereInfo.rotationProgress = 0;
          updateSphereImage(sphere, sphereInfo);
        }
      }
    });

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
