const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

function addLine(text) {
    terminal.innerHTML += "<p>" + text + "</p>";
    terminal.scrollTop = terminal.scrollHeight;
}

// SPEAK
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// MEMORY
let memory = {};

// COMMAND SYSTEM
function processCommand(cmd) {
    cmd = cmd.toLowerCase();

    if (cmd.includes("hello")) {
        return "Hello. Dark AI active.";
    }
    else if (cmd.includes("who are you")) {
        return "I am Dark AI, your intelligent system.";
    }
    else if (cmd.includes("activate security")) {
        return "🔐 Security protocol activated.";
    }
    else if (cmd.includes("dark devil")) {
        return "⚫ Dark Devil Protocol engaged.";
    }
    else if (cmd.startsWith("remember")) {
        let data = cmd.replace("remember", "").trim();
        memory["data"] = data;
        return "Memory stored.";
    }
    else if (cmd.includes("what do you remember")) {
        return memory["data"] || "Nothing stored.";
    }
    else {
        return "Command not recognized.";
    }
}

// RUN
function runCommand(cmd) {
    addLine("> " + cmd);
    let response = processCommand(cmd);
    addLine(response);
    speak(response);
}

// ENTER KEY
input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        runCommand(input.value);
        input.value = "";
    }
});

// VOICE
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript;
    runCommand(voiceText);
};

document.addEventListener("keydown", (e) => {
    if (e.key === "v") {
        recognition.start();
    }
});

// BOOT
addLine("Initializing Dark AI...");
addLine("Voice module ready (press V)...");
addLine("System Ready.");