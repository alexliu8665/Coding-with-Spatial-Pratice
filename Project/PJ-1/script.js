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

  // 星空背景
  function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000; // 星星數量
    const positions = [];

    for (let i = 0; i < starsCount; i++) {
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
      positions.push((Math.random() - 0.5) * 1000);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, opacity: 0.8 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    function animateStars() {
      stars.rotation.y += 0.0002; // 星空旋轉效果
    }
    return animateStars;
  }
  const animateStars = createStars();

  const spheres = [];
  const sphereData = [];
  const categories = ["Arid", "Desolate", "Lonely", "Mysterious", "Oceanic", "Pulsating", "Radiant", "Verdant"];

  let selectedSphere = null;

  // 初始化球體
  categories.forEach((category, index) => {
    const randomSize = Math.random() * 1 + 0.5;
    const texture = textureLoader.load(`./Images/${category}.JPG`);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const sphere = new THREE.Mesh(sphereGeometry.clone().scale(randomSize, randomSize, randomSize), material);
    sphere.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 30);

    scene.add(sphere);
    spheres.push(sphere);
    sphereData.push({ category, originalScale: randomSize, speed: { x: 0, y: 0, z: 0 } });
  });

  camera.position.z = 20;

  // 選單選擇事件
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;

    spheres.forEach((sphere, index) => {
      const data = sphereData[index];

      if (data.category === selectedCategory) {
        selectedSphere = sphere;
        data.speed.x = (Math.random() - 0.5) * 0.05;
        data.speed.y = (Math.random() - 0.5) * 0.05;
        data.speed.z = (Math.random() - 0.5) * 0.05;

        sphere.scale.set(data.originalScale * 3, data.originalScale * 3, data.originalScale * 3);
      } else {
        sphere.scale.set(data.originalScale, data.originalScale, data.originalScale);
        data.speed = { x: 0, y: 0, z: 0 };
      }
    });
  });

  // 動畫循環
  function animate() {
    requestAnimationFrame(animate);
    animateStars();

    spheres.forEach((sphere, index) => {
      const data = sphereData[index];
      sphere.rotation.y += 0.01;

      if (sphere === selectedSphere) {
        sphere.position.x += data.speed.x;
        sphere.position.y += data.speed.y;
        sphere.position.z += data.speed.z;

        if (Math.abs(sphere.position.x) > 15) data.speed.x *= -1;
        if (Math.abs(sphere.position.y) > 10) data.speed.y *= -1;
        if (Math.abs(sphere.position.z) > 15) data.speed.z *= -1;
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
