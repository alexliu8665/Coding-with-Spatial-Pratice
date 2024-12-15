document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  let loadedImages = 0; // 已加載的圖片數量
  const imagesPerLoad = 20; // 每次滾動加載的圖片數量
  const totalImages = 50; // 總圖片數量

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1;
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `圖片 ${imageIndex}`;
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // 滾動事件檢測
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      loadImages();
    }
  }

  // 初始加載圖片
  loadImages();
  loadImages();

  window.addEventListener("scroll", handleScroll);
});
