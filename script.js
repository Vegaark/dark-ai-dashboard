const chatBox = document.getElementById("chatBox");

let memory = [];

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function typeEffect(text) {
  let i = 0;
  const msg = document.createElement("div");
  msg.className = "ai";
  chatBox.appendChild(msg);

  const interval = setInterval(() => {
    msg.innerText += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 15);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  memory.push("User: " + text);

  addMessage("user", text);
  input.value = "";

  setTimeout(() => {
    const reply = getAIResponse(text.toLowerCase());
    memory.push("AI: " + reply);

    typeEffect(reply);
  }, 500);
}

// ENTER key support
document.getElementById("userInput")
.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

function getAIResponse(input) {

  if (input.includes("who are you")) {
    return "I am DARK AI — created by Vega. I learn, respond, and evolve.";
  }

  if (input.includes("portfolio") || input.includes("projects")) {
    return "Projects: Dark AI System, Calculator App, More coming soon.";
  }

  if (input.includes("vega") || input.includes("creator")) {
    return "Creator: Joshua (Vegaark) — AI developer.";
  }

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello. I am ready.";
  }

  if (input.includes("how") || input.includes("why") || input.includes("what")) {
    return "Analyzing your question... My system is generating a logical response.";
  }

  if (input.length > 25) {
    return "Deep input detected... Expanding intelligence soon.";
  }

  return "I am evolving. Ask me anything.";
}
addLine("System Ready.");
