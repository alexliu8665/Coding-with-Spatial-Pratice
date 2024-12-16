document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");
  let loadedImages = 0;
  const imagesPerLoad = 20;
  const totalImages = 50; // Update this based on actual number of images

  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1;
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      loadImages();
    }
  }

  planetSelect.addEventListener("change", () => {
    loadedImages = 0;
    imageGrid.innerHTML = ""; // Clear existing images
    loadImages();
  });

  // Initial load
  loadImages();
  window.addEventListener("scroll", handleScroll);
});
