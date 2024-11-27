document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  let loadedImages = 0;
  const imagesPerLoad = 20; // 每次滾動加載的圖片數量
  const totalImages = 50; // 總圖片數量

  function loadImages() {
    for (let i = loadedImages; i < loadedImages + imagesPerLoad; i++) {
      if (i >= totalImages) return;
      const img = document.createElement("img");
      // 使用 GitHub Pages 的絕對路徑
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${(i % totalImages) + 1}.jpg`;
      img.alt = `Image ${(i % totalImages) + 1}`;
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.marginBottom = "10px";
      imageGrid.appendChild(img);
    }
    loadedImages += imagesPerLoad;
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loadImages();
    }
  }

  window.addEventListener("scroll", handleScroll);
  loadImages(); // 初始加載圖片
});
