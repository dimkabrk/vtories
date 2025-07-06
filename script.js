document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '7️⃣', '🔔', '💎'];
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');
    const spinBtn = document.getElementById('spinBtn');
    const resultMessage = document.getElementById('resultMessage');
    
    let isSpinning = false;
    let spinCount = 0;
    const totalSpins = 30; // Количество шагов анимации
    
    // Звуки
    const spinSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-slot-machine-spin-1930.mp3');
    const winSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    
    spinBtn.addEventListener('click', spin);
    
    function spin() {
        if (isSpinning) return;
        
        isSpinning = true;
        spinBtn.disabled = true;
        resultMessage.textContent = '';
        spinCount = 0;
        spinSound.currentTime = 0;
        spinSound.play();
        
        const spinInterval = setInterval(() => {
            slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            spinCount++;
            
            if (spinCount >= totalSpins) {
                clearInterval(spinInterval);
                isSpinning = false;
                spinBtn.disabled = false;
                spinSound.pause();
                checkResult();
            }
        }, 100);
    }
    
    function checkResult() {
        const result1 = slot1.textContent;
        const result2 = slot2.textContent;
        const result3 = slot3.textContent;
        
        if (result1 === result2 && result2 === result3) {
            // Все три одинаковые
            resultMessage.textContent = 'ДЖЕКПОТ!';
            winSound.play();
            createFireworks(30);
        } else if (result1 === result2 || result1 === result3 || result2 === result3) {
            // Две одинаковые
            resultMessage.textContent = 'Вы выиграли!';
            winSound.play();
            createFireworks(15);
        } else {
            resultMessage.textContent = 'Попробуйте еще раз!';
        }
    }
    
    function createFireworks(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                // Случайный цвет
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Начальная позиция (центр экрана)
                const startX = window.innerWidth / 2;
                const startY = window.innerHeight / 2;
                
                // Конечная позиция (случайная точка вокруг центра)
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 200;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                firework.style.left = `${startX}px`;
                firework.style.top = `${startY}px`;
                firework.style.setProperty('--x', '0px');
                firework.style.setProperty('--y', '0px');
                firework.style.setProperty('--x-end', `${endX}px`);
                firework.style.setProperty('--y-end', `${endY}px`);
                firework.style.animation = 'firework 1s forwards';
                
                document.body.appendChild(firework);
                
                // Удаляем элемент после анимации
                setTimeout(() => {
                    firework.remove();
                }, 1000);
            }, Math.random() * 500);
        }
    }
    
    // Инициализация слотов случайными символами
    slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
});
