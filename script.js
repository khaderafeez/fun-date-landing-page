document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const heartContainer = document.getElementById('heart-container');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝'];

    function createBurstAnimation() {
        const burstCount = 100;
        const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ff6347'];
        
        for (let i = 0; i < burstCount; i++) {
            const burst = document.createElement('div');
            burst.style.position = 'fixed';
            burst.style.top = `${Math.random() * window.innerHeight}px`;
            burst.style.left = `${Math.random() * window.innerWidth}px`;
            burst.style.width = `${Math.random() * 10 + 5}px`;
            burst.style.height = `${Math.random() * 10 + 5}px`;
            burst.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            burst.style.borderRadius = '50%';
            burst.style.opacity = '0.7';
            burst.style.transform = `scale(${Math.random() * 2})`;
            
            document.body.appendChild(burst);
            
            const animation = burst.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: `scale(${Math.random() * 5 + 2})`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            });
            
            animation.onfinish = () => burst.remove();
        }
    }

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);

    yesButton.addEventListener('click', () => {
        yesButton.textContent = 'Yay! I can\'t wait! 😍';
        yesButton.disabled = true;
        yesButton.classList.add('clicked');
        
        createBurstAnimation();
        
        for (let i = 0; i < 50; i++) {
            setTimeout(createHeart, i * 50);
        }

        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff1493', '#ff69b4', '#ffc0cb']
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
            const emoji = document.createElement('div');
            emoji.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = `${e.clientX}px`;
            emoji.style.top = `${e.clientY}px`;
            emoji.style.fontSize = '20px';
            emoji.style.pointerEvents = 'none';
            emoji.style.transition = 'all 0.5s ease-out';
            document.body.appendChild(emoji);

            setTimeout(() => {
                emoji.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
                emoji.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                emoji.remove();
            }, 550);
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('anonymous-message-form');
    const messageContent = document.getElementById('message-content');
    const messageStatus = document.getElementById('message-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = messageContent.value.trim();
        
        if (!message) {
            messageStatus.textContent = 'Please write a message first!';
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "60499b47-fede-434c-9a07-64386a38750d", // Replace with your actual key
                    message: message,
                    subject: "New Message from Date Request Page"
                })
            });

            const result = await response.json();

            if (result.success) {
                messageStatus.textContent = 'Message sent successfully! ✨';
                messageStatus.style.color = 'green';
                form.reset();
            } else {
                messageStatus.textContent = 'Failed to send message. Please try again.';
                messageStatus.style.color = 'red';
            }
        } catch (error) {
            messageStatus.textContent = 'An error occurred. Please try again.';
            messageStatus.style.color = 'red';
            console.error('Error:', error);
        }
    });
});