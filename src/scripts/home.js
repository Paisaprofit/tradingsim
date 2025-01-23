window.onload = function () {
    // Define all messages
    let messages = [
        "Hi I am Mr.Bull, Your personal AI assistant for all your needs you might have. I’ll be your companion in your quest to master Financial Independence.",
        "First let me introduce you to USER DASHBOARD.",
        "This is your personal page which helps you navigate to other paths on your journey",
        "Click on the Game Button to begin"
    ];

    // Select the chatbot messages container
    let chatbotMessages = document.querySelector('.chatbot-messages');

    // Function to display messages in the chatbot
    function displayMessages() {
        // Loop through messages
        messages.forEach(function (message, index) {
            setTimeout(function () {
                let messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.textContent = message;
                chatbotMessages.appendChild(messageElement);
            }, index * 2000); // Delay between messages (2 seconds)
        });
    }

    // Call the function to display the messages
    displayMessages();
};
// script.js
// script.js
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100; // Move carousel horizontally
  carousel.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length; // Loop to the first slide
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop to the last slide
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Auto-scroll every 5 seconds
setInterval(nextSlide, 5000);
