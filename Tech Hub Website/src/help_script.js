// dom to handle chat messages  
const chatInput = document.querySelector(".chat-input textarea"); 
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
// user message 
let userMessage;
// open ai
const API_KEY = "sk-proj-X5UPLpviCijGJ9uWmTEsT3BlbkFJIWsz4vRtJtbcu39Awd4s";
// create element to pass message and class name 
const createChatLi = (message, className) => { 
    const chatLi = document.createElement("Li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined"><i class="fa-solid fa-robot"></i></span><p>${message}</p>`; 
    chatLi.innerHTML = chatContent; 
    return chatLi;
}
// api response 
const generateResponse = (incomingChatLi) => { 
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${API_KEY}`
        }, 
        body: JSON.stringify ({
            model: "gpt-3.5-turbo-0125", 
            messages: [{role: "user", content: userMessage}]
        }) 
    } 
    // get response from open ai  
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Tech Hub is a fantastic online resource dedicated to all things technology-related. It's essentially your go-to platform for information on computers, smartphones, wearables, and other tech gadgets. Whether you're interested in learning about the latest tech trends or diving deep into computer science topics, Tech Hub has you covered. Plus, it's a great place to connect with fellow tech enthusiasts and engage in discussions about the exciting world of technology. Check it out to stay informed and join a vibrant tech community!";
    })
}

// message handler 
const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return; 
    // append the message to the chatbox 
    chatbox.appendChild(createChatLi(userMessage, "outgoing")); 
    // show chat bot is typing 
    setTimeout(() => {
        const incomingChatLi = createChatLi("Tech hub bot is typing...", "incoming") 
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi); 
    }, 500);
}
sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener('keypress', function(event) {
    // Check if the key pressed is Enter 
    if (event.key === 'Enter') {
        // Call the handleChat function
        handleChat();
    }
});