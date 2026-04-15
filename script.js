// LOGIN (same)
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid login!";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// PROTECT DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// THEME
function toggleTheme() {
  let current = localStorage.getItem("theme") || "dark";
  let newTheme = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme();
}

function applyTheme() {
  let theme = localStorage.getItem("theme") || "dark";
  document.body.style.background = theme === "dark"
    ? "linear-gradient(135deg, #1a1a2e, #16213e)"
    : "#f4f4f4";
  document.body.style.color = theme === "dark" ? "white" : "black";
}

// TASKS
let currentFilter = "all";

function addTask() {
  let text = document.getElementById("taskInput").value;
  let date = document.getElementById("deadline").value;

  if (!text) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, date, done: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskInput").value = "";
  loadTasks();
}

function deleteTask(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function toggleDone(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[i].done = !tasks[i].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function filterTasks(type) {
  currentFilter = type;
  loadTasks();
}

function loadTasks() {
  applyTheme();

  let list = document.getElementById("taskList");
  if (!list) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((t, i) => {
    if (t.done) completed++;

    if (
      currentFilter === "completed" && !t.done ||
      currentFilter === "pending" && t.done
    ) return;

    let li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${t.done ? 'line-through' : 'none'}">
        ${t.text} (${t.date || "No deadline"})
      </span>
      <div>
        <button onclick="toggleDone(${i})">✔</button>
        <button onclick="deleteTask(${i})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("progress").innerText =
    `Progress: ${completed}/${tasks.length} completed`;
}

window.onload = loadTasks;