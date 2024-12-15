document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const overlayText = document.querySelector(".overlay-text");
  const totalImages = 50;
  let loadedImages = 20;
  const imagesPerLoad = 20;

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // 計算圖片索引
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    // 如果所有圖片加載完成，移除滾動事件監聽器
    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
      showOverlayText(); // 顯示文字框
    }
  }

  // 顯示文字框
  function showOverlayText() {
    overlayText.classList.remove("hidden"); // 移除 hidden 類
  }

  // 滾動檢測函數
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY; // 當前滾動位置
    const threshold = document.body.offsetHeight - 50; // 頁面底部的閾值

    if (scrollPosition >= threshold) {
      loadImages(); // 滾動到底部時加載更多圖片
    }
  }

  // 初次加載圖片
  loadImages();

  // 監聽滾動事件
  window.addEventListener("scroll", handleScroll);
});
