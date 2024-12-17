document.addEventListener("DOMContentLoaded", () => {
  const sphereContainer = document.getElementById("sphereContainer");
  const planetSelect = document.getElementById("planetSelect");

  // Three.js 基本設置
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphereContainer.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

  // 星空背景
  const starsGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 5000; i++) {
    positions.push(
      (Math.random() - 0.5) * 2000, 
      (Math.random() - 0.5) * 2000, 
      (Math.random() - 0.5) * 2000
    );
  }
  starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

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

  const spheres = [];
  let selectedSphere = null; // 選中的球體
  let selectedSphereRotationProgress = 0; // 旋轉進度
  let selectedSphereAngle = 0; // 軌跡旋轉角度

  // 初始化球體（隨機分布與大小）
  Object.keys(imageCategories).forEach((category) => {
    const texture = textureLoader.load(`./Images/${imageCategories[category][0]}`);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const randomSize = Math.random() * 4 + 1; // 球體大小範圍：1 ~ 5
    const sphere = new THREE.Mesh(sphereGeometry.clone().scale(randomSize, randomSize, randomSize), material);

    // 隨機分布位置
    sphere.position.set(
      (Math.random() - 0.5) * 100, // X軸範圍 -50 到 50
      (Math.random() - 0.5) * 50,  // Y軸範圍 -25 到 25
      (Math.random() - 0.5) * 100  // Z軸範圍 -50 到 50
    );

    scene.add(sphere);
    spheres.push({
      sphere,
      category,
      images: imageCategories[category],
      imageIndex: 0,
      originalScale: randomSize, // 保存原始大小
    });
  });

  camera.position.z = 100; // 拉遠視角增加深度效果

  // 更新球體圖片
  function updateSphereImage(data) {
    data.imageIndex = (data.imageIndex + 1) % data.images.length;
    const newTexture = textureLoader.load(`./Images/${data.images[data.imageIndex]}`);
    data.sphere.material.map = newTexture;
    data.sphere.material.needsUpdate = true;
  }

  // 監聽選單變化
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;

    spheres.forEach((data) => {
      if (data.category === selectedCategory) {
        selectedSphere = data; // 記錄選中的球體
        selectedSphereRotationProgress = 0; // 重置旋轉進度
        selectedSphereAngle = 0;

        // 放大選中球體
        data.sphere.scale.set(data.originalScale * 3, data.originalScale * 3, data.originalScale * 3);
      } else {
        // 其他球體恢復大小
        data.sphere.scale.set(data.originalScale, data.originalScale, data.originalScale);
      }
    });
  });

  // 動畫循環
  function animate() {
    requestAnimationFrame(animate);

    // 星空背景緩慢旋轉
    stars.rotation.y += 0.0005;

    spheres.forEach((data) => {
      data.sphere.rotation.y += 0.01; // 球體自轉

      if (data === selectedSphere) {
        // 選中球體沿背景旋轉軌跡運動
        selectedSphereAngle += 0.002;
        const radius = 50; // 軌跡半徑
        data.sphere.position.x = Math.sin(selectedSphereAngle) * radius;
        data.sphere.position.z = Math.cos(selectedSphereAngle) * radius;

        // 選中球體轉滿一圈後切換圖片
        selectedSphereRotationProgress += 0.01;
        if (selectedSphereRotationProgress >= 2 * Math.PI) {
          selectedSphereRotationProgress = 0;
          updateSphereImage(data);
        }
      }
    });

    renderer.render(scene, camera);
  }

  animate();

  // 視窗大小變化處理
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
