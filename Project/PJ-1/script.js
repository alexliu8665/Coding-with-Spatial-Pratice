document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");
  let loadedImages = 0; // Track the number of loaded images
  const imagesPerLoad = 20; // Number of images to load per batch
  const totalImages = 50; // Total number of images available

  // Function to load images
  function loadImages() {
    const maxImagesToLoad = Math.min(totalImages - loadedImages, imagesPerLoad);
    for (let i = 0; i < maxImagesToLoad; i++) {
      const img = document.createElement("img");
      const imageIndex = loadedImages + i + 1; // Image index starts at 1
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
      img.alt = `Image ${imageIndex}`;
      img.loading = "lazy"; // Enable lazy loading
      imageGrid.appendChild(img);
    }
    loadedImages += maxImagesToLoad;

    // Remove scroll event listener if all images are loaded
    if (loadedImages >= totalImages) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Function to detect scroll position and load more images
  function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
      loadImages();
    }
  }

  // Event listener for dropdown to refresh images
  planetSelect.addEventListener("change", () => {
    loadedImages = 5; // Reset loaded images count
    imageGrid.innerHTML = ""; // Clear the current images
    loadImages(); // Reload images
  });

  // Initial load
  loadImages();
  window.addEventListener("scroll", handleScroll);
});
