document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");
  let loadedImages = 0; // 已加載的圖片數量
  const imagesPerLoad = 20; // 每次加載圖片數量
  const totalImages = 50; // 總圖片數量（需根據實際情況修改）

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    console.log(`開始加載 ${maxImagesToLoad} 張圖片`);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // 圖片編號從 1 開始
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;
      img.loading = "lazy"; // 啟用懶加載
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    if (loadedImages >= totalImages) {
      console.log("已加載所有圖片，移除滾動事件監聽");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // 滾動檢測函數
  function handleScroll() {
    console.log("滾動事件已觸發");
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      console.log("滾動到底部，準備加載圖片");
      loadImages();
    }
  }

  // 選擇分類時重新加載圖片
  planetSelect.addEventListener("change", () => {
    console.log("選單改變，重新加載圖片");
    loadedImages = 0;
    imageGrid.innerHTML = ""; // 清空已有圖片
    loadImages(); // 重新加載
  });

  // 初始加載圖片
  loadImages();
  window.addEventListener("scroll", handleScroll);
});
