# 🚀 Smart Productivity Web App

A modern, fully functional task management application built with **HTML, CSS, and JavaScript**. No backend required—everything runs in the browser using localStorage!

## ✨ Features

### 🔐 Authentication
- **Simple Login System**: Demo credentials (admin / 1234)
- **Route Protection**: Dashboard requires login
- **Persistent Sessions**: Stay logged in across page reloads
- **Secure Logout**: Clear session with confirmation

### 📋 Task Management
- ✅ **Add Tasks**: Create tasks with description, deadline, and priority
- ✏️ **Edit Tasks**: Click the edit button to modify any task
- 🗑️ **Delete Tasks**: Remove tasks with confirmation
- ✓ **Mark Complete**: Toggle task status
- 🔍 **Search**: Find tasks by keyword
- 🏷️ **Priority Levels**: Low (🟢), Medium (🟡), High (🔴)
- 📅 **Deadlines**: Date picker for task due dates

### 📊 Dashboard Features
- **Progress Tracker**: Visual progress circle showing completion percentage
- **Stats Cards**: Total, Completed, Pending, and High Priority task counts
- **Motivational Messages**: Dynamic messages based on progress
- **Empty States**: Helpful UI when no tasks exist

### 🎨 UI/UX
- **Dark/Light Mode**: Toggle theme, preference saved in localStorage
- **Glassmorphism Design**: Modern, clean aesthetic
- **Responsive Layout**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and fade-ins
- **Toast Notifications**: Visual feedback for all actions

### 🔤 Advanced Filtering
- **All Tasks**: Show all tasks
- **Pending**: Show incomplete tasks
- **Completed**: Show finished tasks
- **High Priority**: Show only high priority tasks
- **Real-time Search**: Filter results as you type

### 🎁 Bonus Features
- **Drag & Drop**: Reorder tasks (optional)
- **Keyboard Shortcuts**: Press Enter to add tasks, ESC to close modal
- **Cross-Tab Sync**: Changes sync across browser tabs
- **Data Persistence**: All data stored in localStorage
- **XSS Protection**: HTML escaping for security

## 🚀 How to Use

### Local Usage
1. Open `index.html` in your browser
2. Login with credentials: **admin / 1234**
3. Start managing your tasks!

### GitHub Pages
1. Create a new GitHub repository
2. Upload all files (index.html, dashboard.html, script.js, style.css)
3. Go to Settings → Pages → Select main branch
4. Access your app at: `https://yourusername.github.io/your-repo-name`

## 📁 File Structure

```
task-manager/
├── index.html        # Login page
├── dashboard.html    # Main dashboard with tasks
├── script.js         # All JavaScript logic
└── style.css         # Complete styling with themes
```

## 🔑 Key Technical Features

### Authentication Flow
```
Login Page (index.html) 
  ↓
  Validate credentials (script.js)
  ↓
  Store in localStorage
  ↓
  Dashboard (dashboard.html) - Protected route
```

### Data Storage (localStorage)
```javascript
{
  "loggedIn": "true",
  "theme": "dark",
  "username": "admin",
  "tasks": [
    {
      "id": 1234567890,
      "text": "Complete project",
      "date": "2026-04-20",
      "priority": "high",
      "done": false,
      "created": "2026-04-15T10:00:00.000Z"
    }
  ]
}
```

### CSS Variables (Easy Theme Customization)
```css
:root {
  --primary-color: #5e63f0;
  --secondary-color: #2ec4b6;
  --success-color: #26d06c;
  --danger-color: #f75555;
  --warning-color: #f7b844;
}
```

## 🎯 Responsive Breakpoints

- **Desktop**: 1024px+ (Full grid layout)
- **Tablet**: 768px-1023px (2-column stats)
- **Mobile**: Below 768px (Single column, optimized)
- **Small Mobile**: Below 480px (Compact everything)

## 🔒 Security Considerations

- ✅ **XSS Prevention**: HTML content is escaped
- ✅ **Session Management**: Login state validated on page load
- ✅ **Local Storage Only**: No sensitive data sent to servers
- ⚠️ **Note**: For production, use proper backend authentication

## 🌈 Theme System

### Dark Mode (Default)
- Background: #0f172a
- Cards: #1a2842
- Input: #2a3f5f

### Light Mode
- Background: #f8f9fa
- Cards: #ffffff
- Input: #f0f3f7

Toggle using the theme icon in navbar!

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #5e63f0 | Buttons, highlights |
| Secondary | #2ec4b6 | Accents |
| Success | #26d06c | Complete actions |
| Danger | #f75555 | Delete actions |
| Warning | #f7b844 | Medium priority |

## 📱 Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## 🛠️ Customization Guide

### Change Login Credentials
In `script.js`, find the login function:
```javascript
if (user === "admin" && pass === "1234") {
  // Change "admin" and "1234" to your preferred credentials
}
```

### Change App Name
Update in both HTML files:
```html
<h1 class="app-title">✓ Your App Name</h1>
```

### Change Theme Colors
Modify CSS variables in `style.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... etc */
}
```

## ⚡ Performance

- **Zero Dependencies**: No npm packages, no build tools
- **Fast Loading**: All files load instantly
- **Optimized CSS**: No unnecessary styles
- **Minimal JavaScript**: Efficient DOM manipulation

## 🐛 Known Limitations

- Tasks stored only in browser (not synced to cloud)
- Clearing browser storage will delete all data
- Single-user experience (no multi-user support)
- No offline synchronization

## 💡 Future Enhancement Ideas

- Cloud backup (Firebase, AWS)
- Multiple user accounts
- Task tags/categories
- Recurring tasks
- Time tracking
- Email reminders
- Export to CSV
- Collaborative features

## 📄 License

This project is free to use for personal and commercial purposes.

## 🎓 Learning Resources Used

- HTML5 semantic elements
- CSS3 Grid & Flexbox
- CSS Variables & Media Queries
- localStorage API
- Event handling
- DOM manipulation
- Form validation

## 🚀 Quick Start for GitHub Pages

```bash
# 1. Create a new GitHub repository
# 2. Clone it locally
# 3. Copy all files (index.html, dashboard.html, script.js, style.css)
# 4. Commit and push
git add .
git commit -m "Initial commit: Smart Productivity Web App"
git push origin main

# 5. Enable GitHub Pages in repository settings
# 6. Access your app at: https://username.github.io/repo-name
```

## 📧 Support

For issues or questions, feel free to reach out or create an issue in the repository.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

**Version**: 1.0.0  
**Last Updated**: April 15, 2026
