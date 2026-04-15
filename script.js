// ============================================
// AUTHENTICATION & SECURITY
// ============================================

// LOGIN FUNCTION
function login(event) {
  event.preventDefault();
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user);
    showToast("✓ Login successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);
  } else {
    let errorEl = document.getElementById("error");
    errorEl.innerText = "❌ Invalid credentials. Try admin / 1234";
    errorEl.style.animation = "shake 0.3s ease";
    setTimeout(() => {
      errorEl.style.animation = "";
    }, 300);
    document.getElementById("password").value = "";
  }
}

// LOGOUT FUNCTION
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    showToast("👋 Logged out successfully");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  }
}

// PROTECT DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// ============================================
// THEME MANAGEMENT
// ============================================

function toggleTheme() {
  let current = localStorage.getItem("theme") || "dark";
  let newTheme = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme();
  showToast(`✓ Theme switched to ${newTheme} mode`);
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

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ============================================
// TASK MANAGEMENT
// ============================================

let currentFilter = "all";
let searchQuery = "";
let editingTaskIndex = null;

// ADD TASK
function addTask() {
  let text = document.getElementById("taskInput").value.trim();
  let date = document.getElementById("deadline").value;
  let priority = document.getElementById("priority").value;

  if (!text) {
    showToast("⚠️ Please enter a task description", "warning");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    text,
    date,
    priority,
    done: false,
    created: new Date().toISOString(),
    id: Date.now()
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  
  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("deadline").value = "";
  document.getElementById("priority").value = "medium";
  
  showToast("✅ Task added successfully!");
  loadTasks();
}

// DELETE TASK
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let deletedTask = tasks[index];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast("🗑️ Task deleted");
    loadTasks();
  }
}

// TOGGLE TASK COMPLETION
function toggleDone(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks[index]) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast(tasks[index].done ? "✅ Task completed!" : "⏳ Task marked as pending");
    loadTasks();
  }
}

// OPEN EDIT MODAL
function openEditModal(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks[index]) {
    editingTaskIndex = index;
    document.getElementById("editTaskText").value = tasks[index].text;
    document.getElementById("editTaskDeadline").value = tasks[index].date || "";
    document.getElementById("editTaskPriority").value = tasks[index].priority || "medium";
    document.getElementById("editModal").classList.add("show");
    document.getElementById("editTaskText").focus();
  }
}

// CLOSE EDIT MODAL
function closeEditModal() {
  document.getElementById("editModal").classList.remove("show");
  editingTaskIndex = null;
}

// SAVE TASK EDIT
function saveTaskEdit() {
  if (editingTaskIndex === null) return;

  let text = document.getElementById("editTaskText").value.trim();
  let date = document.getElementById("editTaskDeadline").value;
  let priority = document.getElementById("editTaskPriority").value;

  if (!text) {
    showToast("⚠️ Task description cannot be empty", "warning");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[editingTaskIndex].text = text;
  tasks[editingTaskIndex].date = date;
  tasks[editingTaskIndex].priority = priority;
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeEditModal();
  showToast("✏️ Task updated successfully!");
  loadTasks();
}

// FILTER TASKS
function filterTasks(type) {
  currentFilter = type;
  searchQuery = ""; // Reset search when filtering
  document.getElementById("searchInput").value = "";
  
  // Update active button
  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  
  loadTasks();
}

// SEARCH TASKS
function searchTasks() {
  searchQuery = document.getElementById("searchInput").value.toLowerCase();
  loadTasks();
}

// HANDLE TASK INPUT KEYPRESS (Enter to add)
function handleTaskInputKeypress(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

// LOAD AND DISPLAY TASKS
function loadTasks() {
  applyTheme();

  let list = document.getElementById("taskList");
  if (!list) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  // Remove existing task items (but not the template)
  let items = list.querySelectorAll("li.show");
  items.forEach(item => item.remove());

  let completed = 0;
  let visible = 0;
  let highPriority = 0;

  tasks.forEach((t, i) => {
    if (t.done) completed++;
    if (t.priority === "high") highPriority++;

    // Apply filters
    let matchesFilter = true;
    if (currentFilter === "completed" && !t.done) matchesFilter = false;
    if (currentFilter === "pending" && t.done) matchesFilter = false;
    if (currentFilter === "high" && t.priority !== "high") matchesFilter = false;

    // Apply search
    let matchesSearch = searchQuery === "" || t.text.toLowerCase().includes(searchQuery);

    if (!matchesFilter || !matchesSearch) return;
    
    visible++;

    let li = document.createElement("li");
    li.className = `show priority-${t.priority || 'medium'}`;
    if (t.done) li.classList.add("completed");

    let formatDate = (dateStr) => {
      if (!dateStr) return "No deadline";
      let date = new Date(dateStr + "T00:00:00");
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    let priorityLabel = t.priority ? t.priority.charAt(0).toUpperCase() + t.priority.slice(1) : "Medium";

    li.innerHTML = `
      <div class="task-content">
        <div class="task-header">
          <span class="task-priority ${t.priority || 'medium'}">${priorityLabel}</span>
        </div>
        <div class="task-text ${t.done ? "completed" : ""}">${escapeHtml(t.text)}</div>
        <div class="task-deadline">📅 ${formatDate(t.date)}</div>
      </div>
      <div class="task-actions">
        <button class="btn-check" onclick="toggleDone(${i})" title="${t.done ? "Mark as pending" : "Mark as done"}">${t.done ? "✓" : "○"}</button>
        <button class="btn-edit" onclick="openEditModal(${i})" title="Edit task">✏️</button>
        <button class="btn-delete" onclick="deleteTask(${i})" title="Delete task">🗑️</button>
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

  // Update motivational message
  let motivationalMsg = document.getElementById("motivational-message");
  if (motivationalMsg) {
    let messages = [
      "✨ You're doing great!",
      "🎯 Stay focused!",
      "💪 Keep it up!",
      "🚀 Making progress!",
      "⭐ You got this!",
      "🏆 Almost there!"
    ];
    let randomMsg = messages[Math.floor(Math.random() * messages.length)];
    if (progressPercent === 100 && tasks.length > 0) {
      randomMsg = "🎉 All tasks completed! Amazing!";
    }
    motivationalMsg.innerText = randomMsg;
  }

  // Update stats
  let pending = tasks.length - completed;
  document.getElementById("stat-total").innerText = tasks.length;
  document.getElementById("stat-completed").innerText = completed;
  document.getElementById("stat-pending").innerText = pending;
  document.getElementById("stat-priority").innerText = highPriority;

  // Show/hide empty state
  let emptyState = list.querySelector(".empty-state");
  if (visible === 0) {
    if (!emptyState) {
      let emptyLi = document.createElement("li");
      emptyLi.className = "empty-state";
      if (tasks.length === 0) {
        emptyLi.innerHTML = "<p>✨ No tasks yet. Add one to get started!</p>";
      } else if (searchQuery !== "") {
        emptyLi.innerHTML = "<p>🔍 No tasks match your search</p>";
      } else {
        emptyLi.innerHTML = "<p>📭 No tasks in this filter</p>";
      }
      list.appendChild(emptyLi);
    }
  } else if (emptyState) {
    emptyState.remove();
  }
}

// ESCAPE HTML (XSS Prevention)
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

// ============================================
// DRAG AND DROP (Bonus Feature)
// ============================================

let draggedItem = null;

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("show")) {
    draggedItem = e.target;
    e.target.style.opacity = "0.5";
  }
});

document.addEventListener("dragend", (e) => {
  if (draggedItem) {
    draggedItem.style.opacity = "1";
    draggedItem = null;
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("show") && draggedItem && draggedItem !== e.target) {
    e.target.parentNode.insertBefore(draggedItem, e.target);
  }
});

// Save task order after drag
document.addEventListener("drop", () => {
  setTimeout(() => {
    let list = document.getElementById("taskList");
    if (!list) return;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let items = list.querySelectorAll("li.show");
    let newOrder = [];
    
    items.forEach(item => {
      let text = item.querySelector(".task-text").innerText;
      let matchedTask = tasks.find(t => escapeHtml(t.text) === text);
      if (matchedTask) newOrder.push(matchedTask);
    });
    
    if (newOrder.length === tasks.length) {
      localStorage.setItem("tasks", JSON.stringify(newOrder));
    }
  }, 10);
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

window.addEventListener("load", () => {
  applyTheme();
  if (document.getElementById("taskList")) {
    loadTasks();
    // Set min date to today
    let today = new Date().toISOString().split('T')[0];
    if (document.getElementById("deadline")) {
      document.getElementById("deadline").min = today;
    }
    if (document.getElementById("editTaskDeadline")) {
      document.getElementById("editTaskDeadline").min = today;
    }
  }
  
  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeEditModal();
    }
  });
});

// Listen for changes in other tabs/windows
window.addEventListener("storage", (e) => {
  if (e.key === "tasks" || e.key === "theme") {
    loadTasks();
  }
});
