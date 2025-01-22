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
