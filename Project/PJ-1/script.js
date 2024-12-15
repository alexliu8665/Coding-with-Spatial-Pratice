document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");
  const filterLabel = document.getElementById("filterLabel");

  let loadedImages = 0;
  const imagesPerLoad = 20;

  // Fetch image mapping from JSON
  fetch('image_mapping.json')
    .then(response => response.json())
    .then(data => {
      const imageCategories = {};

      // Convert JSON data into category mapping
      data.forEach(item => {
        if (!imageCategories[item.Category]) {
          imageCategories[item.Category] = [];
        }
        imageCategories[item.Category].push(item['Image Number']);
      });

      let selectedCategory = ""; // Currently selected category

      function loadImages() {
        const imagesToLoad = selectedCategory
          ? imageCategories[selectedCategory].slice(loadedImages, loadedImages + imagesPerLoad)
          : Array.from({ length: imagesPerLoad }, (_, i) => loadedImages + i + 1);

        imagesToLoad.forEach(imageIndex => {
          const img = document.createElement("img");
          img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG`;
          img.alt = `Image ${imageIndex}`;
          img.loading = "lazy";
          imageGrid.appendChild(img);
        });

        loadedImages += imagesToLoad.length;
      }

      planetSelect.addEventListener("change", () => {
        selectedCategory = planetSelect.value;
        loadedImages = 0;
        imageGrid.innerHTML = ""; // Clear current images
        filterLabel.textContent = selectedCategory ? `Current Filter: ${selectedCategory}` : "All Images";
        loadImages();
      });

      loadImages(); // Initial load
    })
    .catch(err => console.error('Error loading image mapping:', err));
});
