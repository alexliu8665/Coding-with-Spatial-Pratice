document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const overlay = document.querySelector(".overlay");
  const typingText = document.getElementById("typingText");
  const totalImages = 50;
  const imagesPerLoad = 20;
  let loadedImages = 0;
  let clickedImages = 0; // 點擊計數

  const finalMessage = "I would love to live on the planet that are ______";

  // 加載圖片函數
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1;
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;
      img.addEventListener("click", handleImageClick); // 點擊事件
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;
  }

  // 點擊圖片事件處理
  function handleImageClick() {
    this.style.opacity = 0.5; // 點擊後圖片變暗
    clickedImages++;

    if (clickedImages === 3) {
      showOverlay(); // 顯示文字框
    }
  }

  // 顯示文字框，觸發動畫效果
  function showOverlay() {
    overlay.classList.add("show"); // 顯示黑色背景

    // 動態顯示打字效果
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < finalMessage.length) {
        typingText.textContent += finalMessage[charIndex];
        charIndex++;
      } else {
        clearInterval(typingInterval); // 停止打字動畫
      }
    }, 100); // 每個字元打字的時間間隔
  }

  // 初次加載圖片
  loadImages();
});
