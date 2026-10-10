
"use strict";

// Automatically update the footer year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Chatbot HTML elements
const chatPanel = document.getElementById("chatPanel");
const chatLauncher = document.getElementById("chatLauncher");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// Open the chatbot
chatLauncher?.addEventListener("click", () => {
  chatPanel.hidden = false;
  chatLauncher.hidden = true;
  chatInput.focus();
});

// Close the chatbot
closeChat?.addEventListener("click", () => {
  chatPanel.hidden = true;
  chatLauncher.hidden = false;
});

// Safely display a chat message
function addMessage(text, type = "bot") {
  const message = document.createElement("div");

  message.className = `message ${type}`;
  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}

// Generate demo chatbot responses
function getDemoReply(question) {
  const q = question.toLowerCase().trim();

  // Skills
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("tech stack")
  ) {
    return "My current portfolio skills include:\n\n• HTML — Website Structure\n• CSS — Styling and Responsive Design\n• JavaScript — Interactive Features\n• Node.js and Express — Backend Fundamentals\n\nI am currently learning web development and exploring artificial intelligence.";
  }

  // Projects
  if (
    q.includes("project") ||
    q.includes("work")
  ) {
    return "My main project is the KPortWeb AI Portfolio.\n\nIt features a premium dark design, a responsive layout, and a demo portfolio chatbot.\n\nThe chatbot currently uses predefined responses rather than a live AI API.";
  }
 
  // Professional Experience
  if (
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("internship") ||
    q.includes("machbizz") ||
    q.includes("database administrator") ||
    q.includes("software developer")
  ) {
    return "Here is an overview of my professional experience:\n\n" +
      "• Current Position: Database Administrator\n" +
      "• Company: MachBizz Pvt. Ltd.\n" +
      "• Duration: January 2026 – Present\n\n" +
      "• Internship Role: Software Developer Intern\n" +
      "• Duration: Please refer to the Experience section for the confirmed dates.\n\n" +
      "My professional journey focuses on database administration, software development, and continuous learning.";
  }


  // Contact
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hire")
  ) {
    return "You can find contact information in the Contact section of this website.\n\nPlease note that a working email address and contact form have not been configured yet.";
  }

  // About
  if (
    q.includes("about") ||
    q.includes("who are you") ||
    q.includes("your name")
  ) {
    return "I am the portfolio assistant for Your Name.\n\nThis website is part of the KPortWeb project and showcases the developer's information, skills, and projects.";
  }

  // Greetings
  if (/^(hi|hello|hey)[\s!.]*$/i.test(q)) {
    return "Hello! 👋 Welcome to my portfolio.\n\nFeel free to ask me about my skills, projects, or contact information. How can I help you today?";
  }

  // Help
  if (
    q.includes("help") ||
    q.includes("what can i ask")
  ) {
    return "Here are some questions you can ask:\n\n• What are your skills?\n• Tell me about your projects.\n• How can I contact you?\n• Tell me about yourself.\n\nI am currently running in demo mode.";
  }

  // Default response
  return "Sorry, I don't have that information available in my demo knowledge base yet.\n\nTry asking me about my skills, projects, background, or contact information.";
}

// Handle visitor questions
chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = chatInput.value.trim();

  if (!question) return;

  addMessage(question, "user");
  chatInput.value = "";

  const answer = getDemoReply(question);
  addMessage(answer, "bot");

  chatInput.focus();
});

// Handle quick-question buttons
document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.dataset.question;

    addMessage(question, "user");
    addMessage(getDemoReply(question), "bot");
  });
});
