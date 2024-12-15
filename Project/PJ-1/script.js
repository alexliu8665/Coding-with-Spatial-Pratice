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
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.marginBottom = "10px";
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    // 如果所有圖片加載完成，移除滾動事件
    if (loadedImages >= totalImages) {
      console.log("所有圖片加載完成");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // 滾動檢測函數
  function handleScroll() {
    console.log("滾動觸發");
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 150;

    if (scrollPosition >= threshold) {
      console.log("觸發圖片加載...");
      loadImages();
    }
  }

  // 初次加載兩批圖片，保證高度足夠
  loadImages();
  loadImages();

  // 監聽滾動事件
  window.addEventListener("scroll", handleScroll);
});
