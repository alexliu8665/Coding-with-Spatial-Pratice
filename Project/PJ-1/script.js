document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid");
  const textOverlay = document.getElementById("textOverlay");
  let loadedImages = 0;
  const totalImages = 20;
  let clickedImages = 0;

  function loadImages() {
    for (let i = 1; i <= totalImages; i++) {
      const img = document.createElement("img");
      img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${i}.JPG`;
      img.alt = `Image ${i}`;
      img.addEventListener("click", () => {
        clickedImages++;
        if (clickedImages >= 3) {
          textOverlay.style.display = "block";
          typeTextEffect();
        }
      });
      imageGrid.appendChild(img);
    }
  }

  function typeTextEffect() {
    const text = "I would love to live on the planet that are _____";
    let index = 0;
    textOverlay.innerHTML = "";
    function type() {
      if (index < text.length) {
        textOverlay.innerHTML += text[index];
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  loadImages();
});
