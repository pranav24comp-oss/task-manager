// LOGIN
function login(event) {
  event.preventDefault();
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    let errorEl = document.getElementById("error");
    errorEl.innerText = "Invalid credentials. Try admin / 1234";
    errorEl.style.animation = "shake 0.3s ease";
    setTimeout(() => {
      errorEl.style.animation = "";
    }, 300);
    document.getElementById("password").value = "";
  }
}

// LOGOUT
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  }
}

// PROTECT DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// THEME MANAGEMENT
function toggleTheme() {
  let current = localStorage.getItem("theme") || "dark";
  let newTheme = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme();
}

function applyTheme() {
  let theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    document.body.classList.add("light-theme");
    if (document.getElementById("theme-icon")) {
      document.getElementById("theme-icon").innerText = "🌞";
    }
  } else {
    document.body.classList.remove("light-theme");
    if (document.getElementById("theme-icon")) {
      document.getElementById("theme-icon").innerText = "🌙";
    }
  }
}

// TASK MANAGEMENT
let currentFilter = "all";

function addTask() {
  let text = document.getElementById("taskInput").value.trim();
  let date = document.getElementById("deadline").value;

  if (!text) {
    alert("Please enter a task description");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ 
    text, 
    date, 
    done: false, 
    created: new Date().toISOString() 
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskInput").value = "";
  document.getElementById("deadline").value = "";
  loadTasks();
}

function deleteTask(i) {
  if (confirm("Are you sure you want to delete this task?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function toggleDone(i) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[i].done = !tasks[i].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function filterTasks(type) {
  currentFilter = type;
  
  // Update active button
  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  
  loadTasks();
}

function loadTasks() {
  applyTheme();

  let list = document.getElementById("taskList");
  if (!list) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  // Clear list but keep empty state template
  let items = list.querySelectorAll("li.show");
  items.forEach(item => item.remove());

  let completed = 0;
  let visible = 0;

  tasks.forEach((t, i) => {
    if (t.done) completed++;

    // Filter logic
    if (currentFilter === "completed" && !t.done) return;
    if (currentFilter === "pending" && t.done) return;

    visible++;

    let li = document.createElement("li");
    li.className = `show ${t.done ? "completed" : ""}`;

    let formatDate = (dateStr) => {
      if (!dateStr) return "No deadline";
      let date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    li.innerHTML = `
      <div class="task-content">
        <div class="task-text ${t.done ? "completed" : ""}">${escapeHtml(t.text)}</div>
        <div class="task-deadline">📅 ${formatDate(t.date)}</div>
      </div>
      <div class="task-actions">
        <button class="btn-check" onclick="toggleDone(${i})" title="${t.done ? "Mark as pending" : "Mark as done"}">${t.done ? "✓" : "○"}</button>
        <button class="btn-delete" onclick="deleteTask(${i})" title="Delete task">🗑</button>
      </div>
    `;

    list.appendChild(li);
  });

  // Update progress display
  let progressPercent = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  document.getElementById("progress-percent").innerText = progressPercent + "%";
  
  let progressText = document.getElementById("progress-text");
  if (tasks.length === 0) {
    progressText.innerText = "No tasks yet. Create one to get started!";
  } else {
    progressText.innerText = `${completed} of ${tasks.length} tasks completed`;
  }

  // Show/hide empty state
  let emptyState = list.querySelector(".empty-state");
  if (visible === 0 && tasks.length > 0) {
    if (!emptyState) {
      let emptyLi = document.createElement("li");
      emptyLi.className = "empty-state";
      emptyLi.innerHTML = "<p>No tasks in this filter</p>";
      list.appendChild(emptyLi);
    }
  } else if (visible === 0 && tasks.length === 0) {
    if (!emptyState) {
      let emptyLi = document.createElement("li");
      emptyLi.className = "empty-state";
      emptyLi.innerHTML = "<p>No tasks yet. Add one to get started!</p>";
      list.appendChild(emptyLi);
    }
  } else if (emptyState) {
    emptyState.remove();
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  let map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Add shake animation
let style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener("load", () => {
  applyTheme();
  if (document.getElementById("taskList")) {
    loadTasks();
  }
});