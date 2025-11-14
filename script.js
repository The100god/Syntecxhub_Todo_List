const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const filterBtns = document.querySelectorAll(".filter-btn");

// Typing animation dynamic text
const typingText = document.getElementById("typingText");
typingText.textContent = "My To-Do List";

// Load saved data
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((t) => createTask(t.text, t.completed));
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) document.body.classList.add("dark");
  updateThemeIcon();
};

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;
  createTask(text, false);
  saveTasks();
  taskInput.value = "";
});

// Create Task
function createTask(text, completed) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const complete = document.createElement("button");
  complete.textContent = "✅";
  complete.title = "Mark complete";
  complete.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const del = document.createElement("button");
  del.textContent = "🗑️";
  del.title = "Delete";
  del.onclick = () => {
    li.style.animation = "fadeOut .4s ease";
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 400);
  };

  actions.appendChild(complete);
  actions.appendChild(del);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  const tasks = [...document.querySelectorAll(".task")].map((t) => ({
    text: t.querySelector("span").textContent,
    completed: t.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  updateThemeIcon();
});
function updateThemeIcon() {
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}

// Filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    filterTasks(btn.dataset.filter);
  });
});

function filterTasks(type) {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((t) => {
    switch (type) {
      case "all":
        t.style.display = "flex";
        break;
      case "completed":
        t.style.display = t.classList.contains("completed") ? "flex" : "none";
        break;
      case "pending":
        t.style.display = !t.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}
