document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  let loadedImages = 20; // 已加載的圖片數量
  const imagesPerLoad = 20; // 每次滾動加載的圖片數量
  const totalImages = 50; // 總圖片數量

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad); // 確保不超過總圖片數量
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // 當前圖片索引
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`; // 圖片的絕對路徑
      img.alt = `圖片 ${imageIndex}`; // 替代文字
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.marginBottom = "10px";
      imageGrid.appendChild(img); // 將圖片加入容器
    }
    loadedImages += maxImagesToLoad; // 更新已加載的圖片數量

    // 如果所有圖片加載完成，移除滾動事件監聽器
    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // 滾動檢測函數
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY; // 當前滾動位置
    const threshold = document.body.offsetHeight - 50; // 頁面底部的閾值（減少延遲）

    if (scrollPosition >= threshold) {
      loadImages(); // 滾動到底部時加載更多圖片
    }
  }

  // 初次加載足夠的圖片以確保頁面高度足以滾動
  loadImages();

  // 監聽滾動事件
  window.addEventListener("scroll", handleScroll);
});
