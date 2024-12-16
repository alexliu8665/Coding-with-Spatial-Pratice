document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");
  let loadedImages = 0; // 已加載的圖片數量
  const imagesPerLoad = 20; // 每次加載圖片數量

  // 假設有一個分類對應數據的 JSON 文件（需根據實際數據替換）
  const imageCategories = {
    Energetic: [1, 2, 3, 4, 5],
    Lonely: [6, 7, 8],
    Verdant: [9, 10],
    Oceanic: [11, 12, 13],
    // 添加其他分類
  };

  function loadImages(category) {
    console.log(`Loading images for category: ${category}`); // 調試訊息

    // 清空現有圖片
    imageGrid.innerHTML = "";

    // 確認該分類是否有數據
    if (!imageCategories[category] || imageCategories[category].length === 0) {
      console.log(`No images found for category: ${category}`);
      imageGrid.innerHTML = "<p>No images found for this category.</p>"; // 提示沒有圖片
      return;
    }

    // 遍歷分類中的圖片編號
    imageCategories[category].forEach((imageIndex) => {
      const img = document.createElement("img");
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`; // 圖片路徑
      img.alt = `Image ${imageIndex}`;
      img.onerror = () => console.error(`Failed to load image: ${img.src}`); // 圖片加載錯誤提示
      imageGrid.appendChild(img);
    });
  }

  // 監聽選單的變化事件
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    console.log(`Selected category: ${selectedCategory}`); // 調試訊息
    loadImages(selectedCategory); // 加載對應分類圖片
  });
});
