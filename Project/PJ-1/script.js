document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  let loadedImages = 20; // 已加載的圖片數量
  const imagesPerLoad = 20; // 每次滾動加載的圖片數量
  const totalImages = 50; // 總圖片數量

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad); // 確保不超過總數
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // 圖片索引從1開始
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`; // 替換為圖片的絕對路徑
      img.alt = `圖片 ${imageIndex}`;
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.marginBottom = "10px";
      imageGrid.appendChild(img); // 添加圖片到容器
    }
    loadedImages += maxImagesToLoad; // 更新已加載的數量

    // 如果所有圖片加載完成，移除滾動監聽
    if (loadedImages >= totalImages) {
      console.log("所有圖片已加載完成");
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // 滾動事件處理函數
  function handleScroll() {
    console.log("滾動觸發");
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    console.log(`滾動位置: ${scrollPosition}, 閾值: ${threshold}`);

    if (scrollPosition >= threshold) {
      console.log("開始加載更多圖片...");
      loadImages();
    }
  }

  // 初次加載足夠的圖片以保證頁面高度
  loadImages();
  loadImages();

  // 監聽滾動事件
  window.addEventListener("scroll", handleScroll);
});
