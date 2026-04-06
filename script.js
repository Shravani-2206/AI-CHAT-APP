import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "Enter Your API key"; 

// 1. Initialize the library
const genAI = new GoogleGenerativeAI(API_KEY);

// 2. Specify the model AND the API version to fix the 404 error
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
});

const btn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");

async function chat() {
    const prompt = input.value.trim();
    if (!prompt) return;

    chatContainer.innerHTML += `<p style="color: #00ffcc; margin-bottom: 10px;"><b>You:</b> ${prompt}</p>`;
    input.value = ""; 

    try {
        // Use the proper method to generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        chatContainer.innerHTML += `<p style="margin-bottom: 20px;"><b>AI:</b> ${text}</p>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        console.error(error);
        chatContainer.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

btn.addEventListener("click", chat);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") chat();
});
