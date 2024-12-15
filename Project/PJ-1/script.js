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

    // 所有圖片加載完成後顯示文字
    if (loadedImages >= totalImages) {
      console.log("所有圖片已加載完成");
      window.removeEventListener("scroll", handleScroll);
      showMessage(); // 顯示文字
    }
  }

  // 顯示文字的函數
  function showMessage() {
    const message = document.createElement("div");
    message.textContent = "I would love to live in a world that _";
    message.style.textAlign = "center";
    message.style.color = "#fff";
    message.style.fontSize = "1.5em";
    message.style.margin = "30px auto";
    message.style.padding = "10px";
    message.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    message.style.width = "100%";

    document.body.appendChild(message); // 直接插入到 body 最底部
    console.log("文字已插入到頁面底部");
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
