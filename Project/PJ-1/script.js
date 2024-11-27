document.addEventListener("DOMContentLoaded", () => {
    const imageGrid = document.getElementById("imageGrid");
    let loadedImages = 0;
    const imagesPerLoad = 20;
    const totalImages = 50;
  
    function loadImages() {
      for (let i = loadedImages; i < loadedImages + imagesPerLoad; i++) {
        if (i >= totalImages) return;
        const img = document.createElement("img");
        img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/images/${(i % totalImages) + 1}.jpg`; // 圖片路徑
        img.alt = `${i + 1}`;
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
    loadImages();
  });
  