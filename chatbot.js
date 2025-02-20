document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chat-button");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    chatButton.addEventListener("click", () => {
        chatContainer.style.display = "flex";
    });

    closeChat.addEventListener("click", () => {
        chatContainer.style.display = "none";
    });

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        addMessage("Você: " + message, "user");
        userInput.value = "";

        fetch("chatbot.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `message=${encodeURIComponent(message)}`
        })
        .then(response => response.text())
        .then(data => {
            setTimeout(() => addMessage("Toinha: " + data, "bot"), 1000);
        });
    }

    function addMessage(text, type) {
        let msg = document.createElement("div");
        msg.classList.add("message", type);
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
