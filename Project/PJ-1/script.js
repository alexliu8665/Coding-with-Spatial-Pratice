// script.js

// Container for the images
const imageContainer = document.getElementById("image-container");

// Number of images to load initially
const initialImageCount = 20;

// Number of images to load per scroll
const loadMoreCount = 10;

// Image path base URL
const baseUrl = "https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/";

// Function to create an image element
function createImage(index) {
    const img = document.createElement("img");
    img.src = `${baseUrl}${index}.JPG`;
    img.alt = `Image ${index}`;
    img.onerror = () => {
        console.error(`Image ${index} failed to load.`);
    };
    return img;
}

// Function to load images
function loadImages(start, count) {
    for (let i = start; i < start + count; i++) {
        const imgElement = createImage(i);
        imageContainer.appendChild(imgElement);
    }
}

// Initial load of images
loadImages(1, initialImageCount);

// Infinite scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const currentImageCount = imageContainer.childElementCount;
        loadImages(currentImageCount + 1, loadMoreCount);
    }
});
