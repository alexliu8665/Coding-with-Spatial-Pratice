document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const totalImages = 50;

  function loadImages() {
    for (let i = 1; i <= totalImages; i++) {
      const img = document.createElement("img");
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${i}.JPG`;
      img.alt = `Image ${i}`;
      imageGrid.appendChild(img);
    }
  }

  loadImages();
});
