document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const overlayText = document.querySelector(".overlay-text");
  const totalImages = 50;
  let loadedImages = 0;
  const imagesPerLoad = 20;

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // 計算圖片索引
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Practice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;

      img.onerror = () => {
        console.warn(`Image ${imageIndex} failed to load.`);
      };

      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    // 所有圖片加載完成後
    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
      showOverlayText();
    }
  }

  // 顯示文字框
  function showOverlayText() {
    overlayText.classList.remove("hidden"); // 移除 hidden 類
    console.log("All images loaded. Showing overlay text...");
  }

  // 滾動檢測函數
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 100; // 使用更準確的高度檢測

    if (scrollPosition >= threshold) {
      loadImages();
    }
  }

  // 初次加載圖片
  loadImages();

  // 監聽滾動事件
  window.addEventListener("scroll", handleScroll);
});
