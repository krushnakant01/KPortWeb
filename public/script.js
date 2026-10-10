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
  if (!chatPanel) return;

  chatPanel.hidden = false;
  chatLauncher.hidden = true;
  chatInput?.focus();
});

// Close the chatbot
closeChat?.addEventListener("click", () => {
  if (!chatPanel) return;

  chatPanel.hidden = true;

  if (chatLauncher) {
    chatLauncher.hidden = false;
    chatLauncher.focus();
  }
});

// Safely display a chat message
function addMessage(text, type = "bot") {
  if (!chatMessages) return;

  const message = document.createElement("div");

  message.className = `message ${type}`;
  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}

// Demo chatbot responses
function getDemoReply(question) {
  const q = question.toLowerCase().trim();

  // Skills and technologies
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech stack")
  ) {
    return (
      "My technical skills include:\n\n" +
      "• Frontend: HTML, CSS, JavaScript, React.js\n" +
      "• Programming: Java, Advanced Java\n" +
      "• Backend: Spring, Spring Boot\n" +
      "• Database: SQL, SQL Server\n" +
      "• Tools: Git, GitHub\n\n" +
      "I continue to develop my technical knowledge through practical projects and professional experience."
    );
  }

  // Projects
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("work")
  ) {
    return (
      "KPortWeb is my personal portfolio website.\n\n" +
      "It showcases my professional background, technical skills, projects, and contact information.\n\n" +
      "The website includes a responsive design, an interactive CSS-based 3D hero scene, and a demo portfolio chatbot.\n\n" +
      "The chatbot currently uses predefined responses rather than a live AI API."
    );
  }

  // Professional experience
  if (
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("internship") ||
    q.includes("machbizz") ||
    q.includes("database administrator") ||
    q.includes("software developer")
  ) {
    return (
      "Here is an overview of my professional experience:\n\n" +
      "• Current Position: Database Administrator\n" +
      "• Company: MachBizz Pvt. Ltd.\n" +
      "• Duration: January 2026 – Present\n\n" +
      "• Previous Role: Software Developer Intern\n" +
      "• Company: Hefshine Pvt. Ltd.\n" +
      "• Duration: June 2025 – December 2025\n\n" +
      "My background includes software development fundamentals, web technologies, Java, and SQL databases."
    );
  }

  // Contact information
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return (
      "You can connect with me through the Contact section of my portfolio.\n\n" +
      "Email: krushnakantmhaske@gmail.com\n" +
      "GitHub: github.com/krushnakant01\n" +
      "LinkedIn: linkedin.com/in/krushnakant-mhaske-423061335/\n\n" +
      "Please note that the contact form requires a valid Formspree form ID before it can send messages."
    );
  }

  // About
  if (
    q.includes("about") ||
    q.includes("who are you") ||
    q.includes("your name") ||
    q.includes("tell me about yourself")
  ) {
    return (
      "I am the developer behind KPortWeb, my personal portfolio project.\n\n" +
      "My professional experience includes working as a Database Administrator at MachBizz Pvt. Ltd. and previously as a Software Developer Intern at Hefshine Pvt. Ltd.\n\n" +
      "My technical interests include web development, Java, Spring Boot, SQL, and database technologies."
    );
  }

  // Greetings
  if (/^(hi|hello|hey)[\s!.]*$/i.test(q)) {
    return (
      "Hello! Welcome to my portfolio.\n\n" +
      "You can ask me about my skills, projects, professional experience, or contact information."
    );
  }

  // Help
  if (
    q.includes("help") ||
    q.includes("what can i ask") ||
    q.includes("what can you do")
  ) {
    return (
      "Here are some questions you can ask:\n\n" +
      "• What are your technical skills?\n" +
      "• Tell me about your projects.\n" +
      "• What is your professional experience?\n" +
      "• Tell me about yourself.\n" +
      "• How can I contact you?\n\n" +
      "I am currently running in demo mode with predefined responses."
    );
  }

  // Default response
  return (
    "I do not have that information in my demo knowledge base yet.\n\n" +
    "Try asking about my skills, projects, professional experience, or contact information."
  );
}

// Handle visitor questions
chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!chatInput || !chatMessages) return;

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

    if (!question || !chatMessages) return;

    addMessage(question, "user");
    addMessage(getDemoReply(question), "bot");
  });
});