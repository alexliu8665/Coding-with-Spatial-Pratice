document.addEventListener("DOMContentLoaded", () => {
  const sphereContainer = document.getElementById("sphereContainer");
  const planetSelect = document.getElementById("planetSelect");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  sphereContainer.appendChild(renderer.domElement);

  const textureLoader = new THREE.TextureLoader();
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

  // 星空背景
  const starsGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 5000; i++) {
    positions.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
  }
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

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
  let selectedSphere = null;

  Object.keys(imageCategories).forEach((category) => {
    const texture = textureLoader.load(`./Images/${imageCategories[category][0]}`);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 50);
    scene.add(sphere);
    spheres.push({ sphere, category, images: imageCategories[category], imageIndex: 0 });
  });

  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    spheres.forEach((data) => {
      if (data.category === selectedCategory) {
        selectedSphere = data;
        data.sphere.scale.set(3, 3, 3);
      } else {
        data.sphere.scale.set(1, 1, 1);
      }
    });
  });

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0005;

    spheres.forEach((data) => {
      data.sphere.rotation.y += 0.01;

      if (data === selectedSphere) {
        data.sphere.position.x += 0.1 * Math.sin(Date.now() * 0.001);
        data.sphere.position.z += 0.1 * Math.cos(Date.now() * 0.001);
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
