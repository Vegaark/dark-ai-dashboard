const chatBox = document.getElementById("chatBox");

// 🔊 SPEAK
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;
  speechSynthesis.speak(speech);
}

// 🎤 VOICE INPUT
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    document.getElementById("userInput").value = text;
    sendMessage();
  };

  recognition.start();
}

// 🧾 ADD MESSAGE
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✨ TYPING EFFECT
function typeEffect(text) {
  let i = 0;
  const msg = document.createElement("div");
  msg.className = "ai";
  chatBox.appendChild(msg);

  function type() {
    if (i < text.length) {
      msg.textContent += text.charAt(i);
      i++;

      let delay = text.charAt(i - 1) === "." ? 200 : 15;
      setTimeout(type, delay);
    } else {
      speak(text);
    }
  }

  type();
}

// 🚀 SEND MESSAGE
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if (!text) return;

  addMessage("user", text);
  input.value = "";

  setTimeout(() => {
    const reply = getAIResponse(text.toLowerCase());
    typeEffect(reply);
  }, 400);
}

// ⌨️ ENTER KEY
document.getElementById("userInput")
.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

// 🧠 SMART AI LOGIC (NO API)
function getAIResponse(input) {

  // greetings
  if (input.includes("hello") || input.includes("hi")) {
    return "Hello. I am DARK AI. Ask me anything.";
  }

  // identity
  if (input.includes("who are you")) {
    return "I am DARK AI — created by Vega. I simulate intelligence and assist users.";
  }

  // creator
  if (input.includes("vega") || input.includes("creator")) {
    return "Creator: Joshua, also known as Vegaark.";
  }

  // portfolio
  if (input.includes("portfolio") || input.includes("projects")) {
    return "Projects include Dark AI System, Calculator App, and upcoming innovations.";
  }

  // time
  if (input.includes("time")) {
    return "Current time is " + new Date().toLocaleTimeString();
  }

  // date
  if (input.includes("date")) {
    return "Today is " + new Date().toDateString();
  }

  // math (basic)
  try {
    if (/^[0-9+\-*/(). ]+$/.test(input)) {
      let result = eval(input);
      return "The answer is " + result;
    }
  } catch {}

  // "what is / who is"
  if (input.startsWith("what is") || input.startsWith("who is")) {
    let topic = input.replace("what is", "").replace("who is", "").trim();
    return topic + " is something important. My offline knowledge is limited, but it relates to real-world concepts.";
  }

  // how questions
  if (input.startsWith("how")) {
    return "That depends on multiple factors. Generally, it requires understanding the process step by step.";
  }

  // why questions
  if (input.startsWith("why")) {
    return "There are logical reasons behind it. It usually happens due to cause and effect relationships.";
  }

  // long input (feels smart)
  if (input.length > 40) {
    return "Complex input detected. Processing deeper logic. My current offline system has limited knowledge, but I understand your intent.";
  }

  // fallback
  return "I do not have full internet access yet, but I am evolving. Try asking in a different way.";
}

// ⚡ START
window.onload = () => {
  typeEffect("DARK AI ONLINE. All systems operational.");
  document.getElementById("userInput").focus();
};
