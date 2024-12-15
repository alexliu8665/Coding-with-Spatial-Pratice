let imageContainer = document.getElementById('image-container');
let loadingMessage = document.getElementById('loading-message');
let currentIndex = 1; // 從第 1 張圖片開始
const totalImages = 20; // 總共 20 張圖片
let isLoading = false;

// 初始載入 5 個元素
loadMoreContent();

// 監聽滾動事件
window.addEventListener('scroll', () => {
    if (isLoading) return;

    // 當滾動到底部時
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        loadMoreContent();
    }
});

// 加載更多內容的函數
function loadMoreContent() {
    isLoading = true;
    loadingMessage.style.display = 'block';

    setTimeout(() => {
        for (let i = 0; i < 5 && currentIndex <= totalImages; i++) {
            // 加載圖片框
            let imageBox = document.createElement('div');
            imageBox.className = 'image-box';
            let img = document.createElement('img');
            img.src = `https://alexliu8665.github.io/Coding-with-Spatial-Pratice/Project/PJ-1/Images/${currentIndex}.JPG`;
            img.alt = `圖片 ${currentIndex}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            imageBox.appendChild(img);
            imageContainer.appendChild(imageBox);

            // 加載文字框
            let textBox = document.createElement('div');
            textBox.className = 'text-box';
            textBox.textContent = `這是第 ${currentIndex} 個文字框。`;
            imageContainer.appendChild(textBox);

            currentIndex++;
        }

        isLoading = false;
        loadingMessage.style.display = 'none';
    }, 1000); // 模擬加載時間 1 秒
}
