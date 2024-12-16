document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const planetSelect = document.getElementById("planetSelect");

  // Updated category-to-image mapping based on Excel file
  const imageCategories = {
    Energetic: [1, 13, 25, 37, 49],
    Lonely: [2, 14, 26, 38, 50],
    Verdant: [3, 15, 27, 39],
    Oceanic: [4, 16, 28, 40],
    Desolate: [5, 17, 29, 41],
    Radiant: [6, 18, 30, 42],
    Mysterious: [7, 19, 31, 43],
    Arid: [8, 20, 32, 44],
    Futuristic: [9, 21, 33, 45],
    Azure: [10, 22, 34, 46],
    Luminous: [11, 23, 35, 47],
    Pulsating: [12, 24, 36, 48],
  };

  /**
   * Load images based on the selected category
   * @param {string} category - Selected category name
   */
  function loadImages(category) {
    console.log(Loading images for category: ${category}); // Debug message

    // Clear existing images
    imageGrid.innerHTML = "";

    // Check if the category exists and has images
    if (!imageCategories[category] || imageCategories[category].length === 0) {
      console.log(No images found for category: ${category});
      imageGrid.innerHTML = "<p>No images found for this category.</p>";
      return;
    }

    // Loop through the images in the selected category
    imageCategories[category].forEach((imageIndex) => {
      const img = document.createElement("img");
      img.src = https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${imageIndex}.JPG;
      img.alt = Image ${imageIndex};
      img.onerror = () => console.error(Failed to load image: ${img.src}); // Error logging
      imageGrid.appendChild(img);
    });
  }

  // Listen for changes in the dropdown menu
  planetSelect.addEventListener("change", () => {
    const selectedCategory = planetSelect.value;
    console.log(Selected category: ${selectedCategory}); // Debug message
    loadImages(selectedCategory); // Load images for the selected category
  });

  // Default category to load on page load
  const defaultCategory = Object.keys(imageCategories)[0]; // First category
  if (defaultCategory) {
    console.log(Default category: ${defaultCategory}); // Debug message
    loadImages(defaultCategory);
    planetSelect.value = defaultCategory; // Set the dropdown to the default category
  }
});