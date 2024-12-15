// script.js
const imageContainer = document.getElementById("image-container");
const loadingMessage = document.getElementById("loading-message");
const baseUrl = "https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/";
let loadedImages = 0;
const imagesPerLoad = 5; // 每次加載的圖片數

// 初始化加載圖片和文字框
function loadMoreContent() {
    loadingMessage.style.display = "block";

    setTimeout(() => {
        for (let i = 1; i <= imagesPerLoad; i++) {
            const imageIndex = loadedImages + i;

            // 創建圖片元素
            const img = document.createElement("img");
            img.src = `${baseUrl}${imageIndex}.JPG`;
            img.alt = `圖片 ${imageIndex}`;
            imageContainer.appendChild(img);

            // 創建文字框
            const textBox = document.createElement("div");
            textBox.className = "text-box";
            textBox.innerText = `這是第 ${imageIndex} 個文字框。`;
            imageContainer.appendChild(textBox);
        }

        loadedImages += imagesPerLoad;
        loadingMessage.style.display = "none";
    }, 1000); // 模擬加載延遲
}

// 滾動事件監聽
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        loadMoreContent();
    }
});

// 初始加載
loadMoreContent();
