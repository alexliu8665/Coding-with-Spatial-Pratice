// 選取容器
const container = document.querySelector('.container');

// 紀錄新增內容數量
let contentCount = 2;

// 滾動事件監聽
window.addEventListener('scroll', () => {
    // 如果滾動到底部
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        addNewContent();
    }
});

// 新增內容的函數
function addNewContent() {
    for (let i = 0; i < 3; i++) {
        contentCount++;
        
        // 創建新的內容
        const newContent = document.createElement('div');
        newContent.classList.add('content');
        
        // 添加圖片
        const newImage = document.createElement('img');
        newImage.src = 'https://via.placeholder.com/500x300';
        newImage.alt = 'Placeholder Image';
        
        // 添加文字框
        const newText = document.createElement('p');
        newText.textContent = `這是第 ${contentCount} 個文字框。`;
        
        // 將圖片和文字加入新內容
        newContent.appendChild(newImage);
        newContent.appendChild(newText);
        
        // 將新內容加入容器
        container.appendChild(newContent);
    }
}
