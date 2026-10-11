
"use strict";

// =========================
// Automatically Update Footer Year
// =========================
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =========================
// Light and Dark Theme Toggle
// =========================
(() => {
  const themeToggle = document.getElementById("themeToggle");

  function getSavedTheme() {
    try {
      const savedTheme = localStorage.getItem("kportweb-theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    } catch (error) {
      // Use the default theme if storage is unavailable.
    }

    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (!themeToggle) return;

    const isDark = theme === "dark";
    const label = isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
  }

  applyTheme(getSavedTheme());

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";

    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("kportweb-theme", nextTheme);
    } catch (error) {
      // Theme switching still works for the current page.
    }
  });
})();

// =========================
// Interactive 3D Hero Scene
// =========================
(() => {
  const scene = document.getElementById("heroScene");

  if (!scene) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  scene.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const rect = scene.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    scene.style.setProperty("--pointer-x", `${x * 12}deg`);
    scene.style.setProperty("--pointer-y", `${y * -12}deg`);
  });

  scene.addEventListener("pointerleave", () => {
    scene.style.setProperty("--pointer-x", "0deg");
    scene.style.setProperty("--pointer-y", "0deg");
  });
})();

// =========================
// Chatbot HTML Elements
// =========================
const chatPanel = document.getElementById("chatPanel");
const chatLauncher = document.getElementById("chatLauncher");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// =========================
// Open and Close Chatbot
// =========================
function openChat() {
  if (!chatPanel) return;

  chatPanel.hidden = false;

  if (chatLauncher) {
    chatLauncher.setAttribute("aria-expanded", "true");
  }

  chatInput?.focus();
}

function closeChatPanel() {
  if (!chatPanel) return;

  chatPanel.hidden = true;

  if (chatLauncher) {
    chatLauncher.setAttribute("aria-expanded", "false");
    chatLauncher.focus();
  }
}

chatLauncher?.addEventListener("click", () => {
  if (!chatPanel) return;

  if (chatPanel.hidden) {
    openChat();
  } else {
    closeChatPanel();
  }
});

closeChat?.addEventListener("click", closeChatPanel);

// Close chatbot with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel && !chatPanel.hidden) {
    closeChatPanel();
  }
});

// =========================
// Safely Display Chat Messages
// =========================
function addMessage(text, type = "bot") {
  if (!chatMessages) return;

  const message = document.createElement("div");

  message.className = `message ${type}`;
  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}

// =========================
// Demo Chatbot Responses
// =========================
function getDemoReply(question) {
  const q = question.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey)[\s!.]*$/i.test(q)) {
    return (
      "Hello! Welcome to my portfolio.\n\n" +
      "You can ask me about my skills, education, projects, " +
      "professional experience, or contact information."
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
      "• Tell me about your education.\n" +
      "• Tell me about your projects.\n" +
      "• What is your professional experience?\n" +
      "• Tell me about yourself.\n" +
      "• How can I contact you?\n\n" +
      "I am currently running in demo mode with predefined responses."
    );
  }

  // Education
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("bsc") ||
    q.includes("b.sc") ||
    q.includes("msc") ||
    q.includes("m.sc") ||
    q.includes("computer science") ||
    q.includes("qualification") ||
    q.includes("academic")
  ) {
    return (
      "Here is my academic background:\n\n" +
      "• Postgraduate: M.Sc. Computer Science — Currently pursuing\n" +
      "• Undergraduate: Bachelor of Computer Science (B.Sc.)\n" +
      "• University: Savitribai Phule Pune University, Pune\n" +
      "• Graduation period: 2023–2025\n\n" +
      "My undergraduate studies covered programming fundamentals, " +
      "algorithms, data structures, Object-Oriented Programming in Java, " +
      "database systems, and web technologies.\n\n" +
      "Related technologies include Java, MySQL, Spring Framework, " +
      "Spring Boot, Spring MVC, Spring Security, and web technologies."
    );
  }

  // Skills and technologies
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech stack") ||
    q.includes("programming language") ||
    q.includes("framework") ||
    q.includes("database")
  ) {
    return (
      "My technical skills include:\n\n" +
      "• Frontend: HTML, CSS, JavaScript, React.js\n" +
      "• Programming: Java, Advanced Java\n" +
      "• Backend: Spring, Spring Boot, Spring MVC, Spring Security\n" +
      "• Databases: SQL, MySQL, SQL Server\n" +
      "• Tools: Git, GitHub\n\n" +
      "I continue to develop my technical knowledge through practical " +
      "projects and professional experience."
    );
  }

  // Projects
  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("github") ||
    q.includes("website") ||
    q.includes("source code")
  ) {
    return (
      "KPortWeb is my personal portfolio website.\n\n" +
      "It showcases my professional background, education, technical " +
      "skills, projects, and contact information.\n\n" +
      "The website includes a responsive design, a CSS-based interactive " +
      "3D hero scene, a light and dark theme switcher, and a demo chatbot.\n\n" +
      "GitHub: https://github.com/krushnakant01\n\n" +
      "The chatbot uses predefined responses rather than a live AI API."
    );
  }

  // Professional experience
  if (
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("internship") ||
    q.includes("machbizz") ||
    q.includes("database administrator") ||
    q.includes("software developer") ||
    q.includes("hefshine") ||
    q.includes("career") ||
    q.includes("professional")
  ) {
    return (
      "Here is an overview of my professional experience:\n\n" +
      "• Current Position: Database Administrator\n" +
      "• Company: MachBizz Pvt. Ltd.\n" +
      "• Duration: January 2026 – Present\n\n" +
      "• Previous Role: Software Developer Intern\n" +
      "• Company: Hefshine Pvt. Ltd.\n" +
      "• Duration: June 2025 – December 2025\n\n" +
      "My background includes web technologies, Java, SQL databases, " +
      "and software development fundamentals."
    );
  }

  // Contact information
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("phone") ||
    q.includes("whatsapp") ||
    q.includes("get in touch")
  ) {
    return (
      "You can connect with me through my Contact page:\n\n" +
      "Email: krushnakantmhaske@gmail.com\n" +
      "GitHub: https://github.com/krushnakant01\n" +
      "LinkedIn: https://www.linkedin.com/in/krushnakant-mhaske-423061335/\n\n" +
      "Visit the Contact page for additional contact options."
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
      "I am Krushnakant Mhaske, the developer behind KPortWeb, " +
      "my personal portfolio project.\n\n" +
      "My professional experience includes working as a Database " +
      "Administrator at MachBizz Pvt. Ltd. and previously as a " +
      "Software Developer Intern at Hefshine Pvt. Ltd.\n\n" +
      "My technical interests include web development, Java, " +
      "Spring Boot, SQL, and database technologies."
    );
  }

  // Resume
  if (
    q.includes("resume") ||
    q.includes("cv")
  ) {
    return (
      "You can use the Download Resume button in the hero section " +
      "to access my resume, provided the resume PDF has been added " +
      "to the website."
    );
  }

  // Default response
  return (
    "I do not have that information in my demo knowledge base yet.\n\n" +
    "Try asking about my skills, education, projects, professional " +
    "experience, or contact information."
  );
}

// =========================
// Handle Visitor Questions
// =========================
function sendChatMessage(question) {
  const cleanQuestion = question.trim();

  if (!cleanQuestion || !chatMessages) return;

  addMessage(cleanQuestion, "user");

  const answer = getDemoReply(cleanQuestion);

  addMessage(answer, "bot");
}

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!chatInput) return;

  const question = chatInput.value.trim();

  if (!question) return;

  chatInput.value = "";
  sendChatMessage(question);
  chatInput.focus();
});

// =========================
// Quick Question Buttons
// =========================
document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.getAttribute("data-question");

    if (!question) return;

    if (chatPanel?.hidden) {
      openChat();
    }

    sendChatMessage(question);
  });
});

/* Glowing point that follows the cursor */
const cursorPoint = document.createElement("div");
cursorPoint.className = "cursor-point";
document.body.appendChild(cursorPoint);

document.addEventListener("mousemove", (event) => {
  cursorPoint.style.left = `${event.clientX}px`;
  cursorPoint.style.top = `${event.clientY}px`;
});

document.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];

  if (touch) {
    cursorPoint.style.left = `${touch.clientX}px`;
    cursorPoint.style.top = `${touch.clientY}px`;
  }
}, { passive: true });
